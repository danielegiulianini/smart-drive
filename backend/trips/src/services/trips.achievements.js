//this file contains all the queries for unlocking achievements

const Trip = require("../models/trips");

//const getAchievements = (trip) => {
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
//# of emissions-free sundays
//===================================================
//};

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
  /*console.log("the match stage:");
  console.log({ $match: userIdAsKeyValueObject }); //{ userId: userId } }, //filter only data of requested user
  //i risultati vanno poi ordinati secondo la prospettiva scelta
  console.log("the group stage:");
  console.log({
    $group: {
      _id: Object.assign({ userId: "$_id" }, IntervalAsKeyValueObject),
      //aggregate values
      totalTrips: { $sum: 1 },

      totalEcoScore: { $sum: "$totalScore" },
      totalSpeedEcoScore: { $sum: "$speedScore" },
      totalRpmEcoScore: { $sum: "$rpmScore" },
      totalFeedbackConsiderationEcoScore: {
        $sum: "$feedbackConsiderationScore",
      },
      //totalKmPerTrip: { $max: "odometer" },
      totalTripMinutesDuration: {
        $sum: { $subtract: ["$endTimestamp", "$startTimestamp"] },
      },

      maxEcoScorePerTrip: { $max: "$totalScore" },
      maxSpeedEcoScorePerTrip: { $max: "$speedScore" },
      maxRpmEcoScorePerTrip: { $max: "$rpmScore" },
      maxFeedbackConsiderationEcoScorePerTrip: {
        $max: "$feedbackConsiderationScore",
      },
      /*maxKmPerTrip: { $max: "odometer" },*/
  /*maxTripMinutesDuration: {
        $max: {
          $sum: { $subtract: ["$endTimestamp", "$startTimestamp"] },
        },
      },
    },
  });
  console.log("i filtered trips:");
  console.log(await Trip.aggregate([{ $match: userIdAsKeyValueObject }]));
  console.log("i filtered trips by findOne:");

  console.log(await Trip.find({ userIdAsKeyValueObject }));*/

  return await Trip.aggregate([
    { $match: userIdAsKeyValueObject }, //{ userId: userId } }, //filter only data of requested user
    {
      $group: {
        _id: Object.assign({ userId: "$userId" }, IntervalAsKeyValueObject),
        //aggregate values
        totalTrips: { $sum: 1 },

        totalEcoScore: { $sum: "$totalScore" },
        totalSpeedEcoScore: { $sum: "$speedScore" },
        totalRpmEcoScore: { $sum: "$rpmScore" },
        totalFeedbackConsiderationEcoScore: {
          $sum: "$feedbackConsiderationScore",
        },
        //totalKmPerTrip: { $max: "odometer" },
        totalTripMinutesDuration: {
          $sum: { $subtract: ["$endTimestamp", "$startTimestamp"] },
        },

        maxEcoScorePerTrip: { $max: "$totalScore" },
        maxSpeedEcoScorePerTrip: { $max: "$speedScore" },
        maxRpmEcoScorePerTrip: { $max: "$rpmScore" },
        maxFeedbackConsiderationEcoScorePerTrip: {
          $max: "$feedbackConsiderationScore",
        },
        /*maxKmPerTrip: { $max: "odometer" },*/
        maxTripMinutesDuration: {
          $max: {
            $sum: { $subtract: ["$endTimestamp", "$startTimestamp"] },
          },
        },
      },
    },
  ]);
};

const performancesInADay = async (userId) => {
  return await performancesInInterval(
    { userId: userId },
    //{ $dateToString: { date: "$startTimestamp", format: "%Y-%m-%d" } }
    {
      year: { $year: "$startTimestamp" },
      month: { $month: "$startTimestamp" },
      day: { $day: "$startTimestamp" },
    }
  );
};

const performancesInAMonth = async (userId) => {
  return await performancesInInterval(
    { userId: userId },
    /*{
      interval: { $dateToString: { date: "$startTimestamp", format: "%Y-%m" } },
    }*/
    { year: { $year: "$startTimestamp" }, month: { $month: "$startTimestamp" } }
  );
};

//milestones
const performancesSinceJoined = async (userId) => {
  return await performancesInInterval({ userId: userId });
};

//ENTRY POINT (this could be invoked by an independent route too)
const getAchievements = async (userId) => {

  
  console.log("searching for assignments...")
  const achievementsEvents = []; //array of strings

  //============= eco-friendly behaviour ======================
  /*electricTripsPerformedBy(userId)
    .then((electricTripsCount) => {
      if (electricTripsCount >= 10) {
        achievementsEvents.push("electric_trips_100");
      } else if (electricTripsCount >= 5) {
        achievementsEvents.push("electric_trips_5");
      } else if (electricTripsCount >= 1) {
        achievementsEvents.push("electric_trips_1");
      }
    })
    .catch((err) => console.log("error during electricTrips"));*/

  const performances = await performancesInAMonth(userId);
  console.log("le performances (for badges assignment) are:", performances);
  //max => peak performance
  const maxEcoScorePerTrip = Math.max(
    ...performances.map((o) => o.maxEcoScorePerTrip)
  );
  /*removing because of lacking time to draw the badge 
  if (maxEcoScorePerTrip >= 95) {
    achievementsEvents.push("ecoscore_single_trip_95");
  } else if (maxEcoScorePerTrip >= 92) {
    achievementsEvents.push("ecoscore_single_trip_92");
  } else if (maxEcoScorePerTrip >= 85) {
    achievementsEvents.push("ecoscore_single_trip_85");
  }*/
  const maxRpmScorePerTrip = Math.max(
    ...performances.map((o) => o.maxRpmEcoScorePerTrip)
  );
  if (maxRpmScorePerTrip >= 95) {
    achievementsEvents.push("rpmScore_single_trip_95");
  } else if (maxRpmScorePerTrip >= 92) {
    achievementsEvents.push("rpmScore_single_trip_92");
  } else if (maxRpmScorePerTrip >= 85) {
    achievementsEvents.push("rpmScore_single_trip_85");
  }

  const maxSpeedScorePerTrip = Math.max(
    ...performances.map((o) => o.maxSpeedScorePerTrip)
  );
  if (maxSpeedScorePerTrip > 95) {
    achievementsEvents.push("speedScore_single_trip_95");
  } else if (maxSpeedScorePerTrip > 92) {
    achievementsEvents.push("speedScore_single_trip_92");
  } else if (maxSpeedScorePerTrip > 85) {
    achievementsEvents.push("speedScore_single_trip_85");
  }

  const maxFeedbackConsiderationScorePerTrip = Math.max(
    ...performances.map((o) => o.maxFeedbackConsiderationEcoScorePerTrip)
  );
  if (maxFeedbackConsiderationScorePerTrip > 95) {
    achievementsEvents.push("feedbackConsiderationScore_single_trip_95");
  } else if (maxFeedbackConsiderationScorePerTrip > 92) {
    achievementsEvents.push("feedbackConsiderationScore_single_trip_92");
  } else if (maxFeedbackConsiderationScorePerTrip > 85) {
    achievementsEvents.push("feedbackConsiderationScore_single_trip_85");
  }

  //total => perseverance (milestones) (not used actually by frontend (future developments))
  //removing those because of lacking time to draw the badge
  /*const totalEcoScore = Math.max(...performances.map((o) => o.totalEcoScore));
  if (totalEcoScore >= 2000) {
    achievementsEvents.push("ecoscore_total_2000");
  } else if (totalEcoScore >= 500) {
    achievementsEvents.push("ecoscore_total_500");
  } else if (totalEcoScore >= 100) {
    achievementsEvents.push("ecoscore_total_100");
  }
  const totalRpmScore = Math.max(
    ...performances.map((o) => o.totalRpmEcoScore)
  );
  if (totalRpmScore >= 2000) {
    achievementsEvents.push("rpmScore_total_2000");
  } else if (totalRpmScore >= 500) {
    achievementsEvents.push("rpmScore_total_500");
  } else if (totalRpmScore >= 100) {
    achievementsEvents.push("rpmScore_total_100");
  }
  const totalFeedbackConsiderationScore = Math.max(
    ...performances.map((o) => o.totalFeedbackConsiderationEcoScore)
  );
  if (totalFeedbackConsiderationScore >= 2000) {
    achievementsEvents.push("feedbackConsiderationScore_total_2000");
  } else if (totalFeedbackConsiderationScore >= 500) {
    achievementsEvents.push("feedbackConsiderationScore_total_500");
  } else if (totalFeedbackConsiderationScore >= 100) {
    achievementsEvents.push("feedbackConsiderationScore_total_100");
  }
  /*const totalSpeedEcoScore = Math.max(
    ...performances.map((o) => o.totalSpeedEcoScore)
  );
  if (totalSpeedEcoScore > 2000) {
    achievementsEvents.push("speedScore_total_95");
  } else if (totalSpeedEcoScore > 500) {
    achievementsEvents.push("speedScore_total_95");
  } else if (totalSpeedEcoScore > 100) {
    achievementsEvents.push("speedScore_total_95");
  }*/

  //============= app usage ======================

  const totalTrips = Math.max(...performances.map((o) => o.totalTrips));
  if (totalTrips >= 100) {
    achievementsEvents.push("trips_100");
  } else if (totalTrips >= 5) {
    achievementsEvents.push("trips_5");
  } else if (totalTrips == 1) {
    achievementsEvents.push("trip_first");
  }

  return achievementsEvents;
};

//============encouraging eco-driving =================
const electricTripsPerformedBy = async (userId) => {
  //db.collection.find(selectionObj,projectionObj)
  const vins = await Trip.find(
    { userId: userId },
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
  getAchievements,
};
