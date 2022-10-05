//this file contains all the queries for unlocking achievements

const trips = require("../models/trips");

const getAchievements = (trip) => {
  //fetching trips
  //some achievements always
  //====all the queries searching for achievements:====
  //PRIMO giro con auto diversa
  //PRIMA auto elettrica aggiunta (o PRIMO viaggio con)
  //PRIMA auto a metano aggiunta (o viaggio)
  //PRIMO trip (completato)
  //badges derivanti dal confronto con soglie fisse
  //   >soglie fisse (anche su punti parziali, #guide con caratteristiche (es auto a metano), minuti, km, consecutive active days/weeks/months, active days in a year, in a month, in a week, in a day, since ever
  //     trips in a ... , scores..., x giri con auto elettrica, min/max (PRESTAZIONE ASSOLUTA in singolo trip) o media/somma (COSTANZA)
  //badges derivanti dal confronto con altri (revocabili, non lasciano traccia, MOLTO ONEROSI)
  //   >record di qualsiasi parametro (time, score, rpm medio, active days)
  //    > since when (last month, since your join, since ever)
  //badges derivanti dal confronto con te stesso (PB etc.) => QUESTO NON INTERESSANTE x badge user! è più una cosa da 1.assegnare al trip 2.da mettere nella pag records
  //   >punti conquistati in un giorno wrt tutti altri giorni                   COSTANZA
  //   >punti conquistati in un mese wrt tutti altri mesi                       COSTANZA
  //   >record di ecoscore in un trip wrt tutti altri trip                      PRESTAZIONE DI PICCO
  //   >record di ecoscore in un trip wrt tutti altri trip della stagione (SB)  PRESTAZIONE DI PICCO
  //   >record di ecoscore medio since ever wrt tutti altri (SB)                COSTANZA
  //   >record di ecoscore medio since this year wrt tutti altri (SB)           COSTANZA
  //   >record di ecoscore medio since this year wrt tutti altri (SB)           COSTANZA
  //anniversary (dal primo trip)
  //===================================================
};

//============encouraging app usage=================
/*const weeksDrivenInARow = (tripsOfUser) => {
  //not trivial: per ogni week controllo se quella prec è la sua precedente?
  groupBy(tripsOfUser, (trip) => getWeekNumber(new Date())).length;
};*/

const monthsDrivenInAYear = (userId) => {
  /*groupBy(
    groupBy(tripsOfUser, (trip) => [
      trip.startTimestamp.getMonth(),
      trip.startTimestamp.getYear(),
    ]),
    (monthAndYear) => monthAndYear[1]
  );*/

  //alternative with mongoose + tripId
  const tripId = 2;
  //group by month year
  //group by year
  const monthsDrivenInYears = Trip.aggregate([
    { $match: { userId: userId } }, //filter only data of requested trip
    //{ $match: { timestamp: { $gte: dateStart } } }, //filter only data inside sliding window
    {
      $group: {
        //1st grouping (in temporal window) for getting individual (window) metric
        _id: {
          year: { $year: "$startTimestamp" }, //group by expression
          month: { $year: "$startTimestamp" },
        },
        //summary fields
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        //2nd grouping for getting total (trip wrt window), specific metric
        _id: {
          year: { $year: "$startTimestamp" }, //group by expression
        },
        //summary fields
        activeMonths: { $sum: "$count" },
      },
    },
    { $sort: { activeMonths: -1 } },
  ]);

  return monthsDrivenInYears ? monthsDrivenInYears[0] : 0;
};

const tripsInAWeek = (userId) => {
  //filtro quelli da una settimana fa as ora... o tutti ?? posso fare anche tutti tanto i documents sono pochi...
  //raggruppo per week e per ognuna ho le drives
  //groupBy(trip.measurements, (trip) => getWeekNumber(trip.startTimestamp));

  const tripsPerWeek = Trip.aggregate([
    { $match: { userId: userId } }, //filter only data of requested trip
    //{ $match: { timestamp: { $gte: dateStart } } }, //filter only data inside sliding window
    {
      $group: {
        _id: {
          week: { $week: "$startTimestamp" }, //group by expression
        },
        //summary fields
        tripsPerWeek: { $sum: 1 },
      },
    },
    { $sort: { tripsPerWeek: -1 } },
  ]);

  return tripsPerWeek ? tripsPerWeek[0] : 0;
};

const tripsInADay = (trip) => {
  const tripsPerDay = Trip.aggregate([
    { $match: { userId: userId } }, //filter only data of requested trip
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$at" } },
        tripsPerDay: { $sum: 1 },
      },
    },
    {
      $sort: { tripsPerDay: -1 },
    },
  ]);

  return tripsPerDay ? tripsPerDay[0] : 0;
};

//============encouraging eco-driving=================
const electricTrips = async (userId) => {
  //db.collection.find(selectionObj,projectionObj)
  const vins = await Trip.find(
    { userId: "userId" },
    { vehicleIdentificationNumber: 1 }
  );
  //axios call to map vins to engine type
  // try { //letting exception bubble up
  let electricTripsCount = 0;
  //for every vin retrieve its engine type
  for (v of vins) {
    //todo check if array contains vins only!
    if ((await fetchFuelType(v)).includes("Electricity")) {
      //todo check both engineType key and value!
      electricTripsCount++;
    }
  }

  return electricTripsCount;
  // } catch (err) {
  //   console.log(err); //or next(err) to log errors only in one place
  // }
};

const fetchFuelType = async (vin) => {
  userVehiclesUrl = "http://vehicles:8087/api/v1/userVehicles/" + vin; //read from config files
  const response = await axios.get(userVehiclesUrl, {});
  vehiclesModelUrl =
    "http://vehicles:8087/api/v1/vehiclesModels/vehicleDetails/" +
    response.data.vehicleId;
  const vehicleDetails = await axios.get(vehiclesModelUrl, {});
  return vehicleDetails.fuelType + vehicleDetails.fuelType1;
};

/*
const gplDrives = (trip) => {
  //trip.measurements.filter((date) => date.toDateString()).length;
};*/

//all the scores for performance reason
const scoresGatheredInAMonth = (trip) => {};

const scoresGatheredInADay = (trip) => {};

//milestone
const scoresGatheredSinceJoined = (trip) => {};

const personalBestsSinceJoined = (userId) => {
  //parziali, totale, min, max di km, score, minuti,
  const tripsPerDay = Trip.aggregate([
    //{ $match: { userId: userId } }, //filter only data of requested trip
    {
      $group: {
        _id: { userId: userId },
        totalTrips: { $sum: 1 },

        totalEcoScore: { $sum: "totalScore" },
        totalSpeedEcoScore: { $sum: "speedScore" },
        totalRpmEcoScore: { $sum: 1 },
        totalFeedbackConsiderationEcoScore: { $sum: 1 },

        maxEcoScorePerTrip: { $max: 1 },
        maxSpeedEcoScorePerTrip: { $max: 1 },
        maxRpmEcoScorePerTrip: { $max: 1 },
        maxFeedbackConsiderationEcoScorePerTrip: { $max: 1 },
        maxKmPerTrip: { $sum: 1 },
        maxTripMinutesDuration: { $sum: 1 },
      },
    },
    {
      $sort: { tripsPerDay: -1 },
    },
  ]);
};

//this could be invoked by an independent route too
const assignAchievements = async (userId) => {
  achievementsEvents = []; //array of strings

  const achievementsEvents = getAchievements();
  //publish dell'evento... allo user service
  bus.publish(userId, achievementsEvents); //assign badges to user micro  //or by rest //USE MQTT CLIENT HERE
};

module.exports = {
  assignAchievements,
};

//const userRankingFrom = (userId, fromDate) => {};

/*const checkUseDaysInARow = (trip) => {
  //segnalo l'achievement più alto (acheivements non cumulativi: quello più alto non determina quello/i più basso/i)
  //uso il trip tanto ce l'ho in memoria... al limite posso ri-fetching it" qui
  groupBy(trip.measurements, (date) => date.getYear());
};

const checkUseDays = (trip) => {
  groupBy(trip.measurements, (date) => date.toDateString()).length;
};*/

/*
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};*/

//from https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

var result = getWeekNumber(new Date());

function consecutive(array) {
  var i = 2,
    d;
  while (i < array.length) {
    d = array[i - 1] - array[i - 2];
    if (Math.abs(d) === 1 && d === array[i] - array[i - 1]) {
      return false;
    }
    i++;
  }
  return true;
}

function groupByAndSum() {
  var result = [];
  array.reduce(function (res, value) {
    if (!res[value.Id]) {
      res[value.Id] = { Id: value.Id, qty: 0 };
      result.push(res[value.Id]);
    }
    res[value.Id].qty += value.qty;
    return res;
  }, {});
}
