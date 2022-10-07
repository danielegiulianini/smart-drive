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

const monthsDrivenInAYear = (userId) => {
  const monthsDrivenInYears = Trip.aggregate([
    { $match: { userId: userId } }, //filter only data of requested trip
    //{ $match: { timestamp: { $gte: dateStart } } }, //filter only data inside sliding window
    {
      $group: {
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

const fetchFuelType = async (vin) => {
  userVehiclesUrl = "http://vehicles:8087/api/v1/userVehicles/" + vin; //read from config files
  const response = await axios.get(userVehiclesUrl, {});
  vehiclesModelUrl =
    "http://vehicles:8087/api/v1/vehiclesModels/vehicleDetails/" +
    response.data.vehicleId;
  const vehicleDetails = await axios.get(vehiclesModelUrl, {});
  return vehicleDetails.fuelType + vehicleDetails.fuelType1;
};

const performancesInInterval = async (
  userIdAsKeyValueObject,
  IntervalAsKeyValueObject
) => {
  //i risultati vanno poi ordinati secondo la prospettiva scelta

  return Trip.aggregate([
    { $match: { userId: userId } }, //filter only data of requested user
    {
      $group: {
        _id: Object.assign(userIdAsKeyValueObject, IntervalAsKeyValueObject),
        totalTrips: { $sum: 1 },

        totalEcoScore: { $sum: "totalScore" },
        totalSpeedEcoScore: { $sum: "speedScore" },
        totalRpmEcoScore: { $sum: "rpmScore" },
        totalFeedbackConsiderationEcoScore: {
          $sum: "feedbackConsiderationScore",
        },
        //totalKmPerTrip: { $max: "odometer" },
        totalTripMinutesDuration: {
          $sum: { $subtract: ["endTimestamp", "startTimestamp"] },
        },

        maxEcoScorePerTrip: { $max: "totalScore" },
        maxSpeedEcoScorePerTrip: { $max: "speedScore" },
        maxRpmEcoScorePerTrip: { $max: "rpmScore" },
        maxFeedbackConsiderationEcoScorePerTrip: {
          $max: "feedbackConsiderationScore",
        },
        /*maxKmPerTrip: { $max: "odometer" },*/
        maxTripMinutesDuration: {
          $max: {
            $sum: { $subtract: ["endTimestamp", "startTimestamp"] },
          },
        },
      },
    },
  ]);
};

const performancesInADay = async (userId) => {
  performancesInInterval(
    { userId: userId },
    { $dateToString: { format: "%Y-%m-%d", date: "$at" } }
  );
};

const performancesInAMonth = async (userId) => {
  performancesInInterval(
    { userId: userId },
    { $dateToString: { format: "%Y-%m-%d", date: "$at" } }
  );
};

//milestone
const performancesSinceJoined = (userId) => {
  performancesInInterval({ userId: userId });
};

//ENTRY POINT (this could be invoked by an independent route too)
const assignAchievements = async (userId) => {
  achievementsEvents = []; //array of strings

  //============= eco-friendly behaviour ======================
  electricTrips(userId)
    .then((electricTripsCount) => {
      if (electricTripsCount > 10) {
        achievementsEvents.push("electric_10");
      } else if (electricTripsCount > 5) {
        achievementsEvents.push("electric_5");
      } else if (electricTripsCount > 1) {
        achievementsEvents.push("electric_1");
      }
    })
    .catch((err) => console.log("error during electricTrips"));

  const performances = await performancesInAMonth(userId);

  const maxEcoScorePerTrip = Math.max(
    ...performances.map((o) => o.maxEcoScorePerTrip)
  );
  if (maxEcoScorePerTrip > 10) {
    achievementsEvents.push("electric_10");
  } else if (maxEcoScorePerTrip > 5) {
    achievementsEvents.push("electric_5");
  } else if (maxEcoScorePerTrip > 1) {
    achievementsEvents.push("electric_1");
  }
  const maxSpeedScorePerTrip = Math.max(
    ...performances.map((o) => o.maxSpeedScorePerTrip)
  );
  if (maxSpeedScorePerTrip > 10) {
    achievementsEvents.push("electric_10");
  } else if (maxSpeedScorePerTrip > 5) {
    achievementsEvents.push("electric_5");
  } else if (maxSpeedScorePerTrip > 1) {
    achievementsEvents.push("electric_1");
  }
  const maxRpmScorePerTrip = Math.max(
    ...performances.map((o) => o.maxRpmScorePerTrip)
  );
  if (maxRpmScorePerTrip > 10) {
    achievementsEvents.push("electric_10");
  } else if (maxRpmScorePerTrip > 5) {
    achievementsEvents.push("electric_5");
  } else if (maxRpmScorePerTrip > 1) {
    achievementsEvents.push("electric_1");
  }
  const totalEcoScore = Math.max(...performances.map((o) => o.totalEcoScore));
  if (totalEcoScore > 10) {
    achievementsEvents.push("electric_10");
  } else if (totalEcoScore > 5) {
    achievementsEvents.push("electric_5");
  } else if (totalEcoScore > 1) {
    achievementsEvents.push("electric_1");
  }
  const totalSpeedEcoScore = Math.max(
    ...performances.map((o) => o.totalSpeedEcoScore)
  );
  if (totalSpeedEcoScore > 10) {
    achievementsEvents.push("electric_10");
  } else if (totalSpeedEcoScore > 5) {
    achievementsEvents.push("electric_5");
  } else if (totalSpeedEcoScore > 1) {
    achievementsEvents.push("electric_1");
  }

  //============= app usage ======================
  const totalTrips = Math.max(...performances.map((o) => o.totalTrips));
  if (totalTrips > 10) {
    achievementsEvents.push("electric_10");
  } else if (totalTrips > 5) {
    achievementsEvents.push("electric_5");
  } else if (trtotalTripsips > 1) {
    achievementsEvents.push("electric_1");
  }

  return achievementsEvents;
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

//const gplDrives = (trip) => {

module.exports = {
  assignAchievements,
};
