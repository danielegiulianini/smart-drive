const { now } = require("../../utils/time.utils");

//tests utils
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require("../../utils/validators.utils");
const {
  dbConnect,
  dbDisconnect,
  dropCollections,
} = require("../../utils/dbHandler.utils");

const {
  loadMeasurementsToTrip,
  createFakeTripWithMeasurements: createTripWithMeasurements,
} = require("../../utils/trip.utils");

//to-test data
const Trip = require("../../models/trips");
const TripsService = require("../../services/trips.dataAcquisition");
const TripsStatsService = require("../../services/trips.stats");

//fixture
const constantRpmValues = [...Array(10)].map((_, i) => {
  return { rpm: 2000 };
});
const nonConstantRpmValues = [
  { rpm: 1000, kph: 9000 },
  { rpm: 3000, kph: 9000 },
  { rpm: 10000 },
  { rpm: 7000 },
  { rpm: 1000 },
];
const rpmDatasets = [/*constantRpmValues,*/ nonConstantRpmValues];

const constantKphValues = [...Array(10)].map((_, i) => {
  return { kph: 50.0 };
});
const nonConstantKphValues = [
  { kph: 100.2 },
  { kph: 100.0 },
  { kph: 0.0 },
  { kph: 70.1 },
  { kph: 108.6 },
];
const kphDatasets = [constantKphValues, nonConstantKphValues];

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//test utils
function average(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(1, 6);

//actual tests
describe("a stats calculator", () => {
  //rpm
  describe("when asked for the average of rpm values associated to a trip", () => {
    //service methods: computeAndUpdateStats

    it("should return the actual average value", async () => {
      for (dataset of rpmDatasets) {
        let savedTrip = await createTripWithMeasurements(dataset);
        //closing it (stats are computed only when trip is finished)
        await TripsService.close(savedTrip._id);

        let stats = await TripsStatsService.computeEngineStats(savedTrip._id); //AndUpdateStats(savedTrip._id);

        console.log("stats obtained:");
        console.log(stats);

        //number, numDigits?
        expect(stats.avgRpm).toBeCloseTo(
          average(savedTrip.measurements.map((measurement) => measurement.rpm)),
          3
        );
      }
    });

    it("should persist it", async () => {
      let savedTrip = await createTripWithMeasurements(constantRpmValues);
      //closing it (stats are computed only when trip is finished)
      await TripsService.close(savedTrip._id);
      const stats = await TripsStatsService.computeAndUpdateStats(
        savedTrip._id
      );
      console.log(stats);
      const fetchedTrip = await Trip.findById(savedTrip._id);
      expect(fetchedTrip.avgRpm).toBeCloseTo(
        stats.avgRpm, //average(savedTrip.measurements.map((measurement) => measurement.rpm)),
        3
      );
    });
  });

  describe("when asked for the maximum of rpm values associated to a trip", () => {
    //service methods: computeAndUpdateStats
    it("should return the actual maximum value", async () => {
      for (dataset of rpmDatasets) {
        let savedTrip = await createTripWithMeasurements(dataset);
        //closing it (stats are computed only when trip is finished)
        await TripsService.close(savedTrip._id);

        let stats = await TripsStatsService.computeEngineStats(savedTrip._id); //AndUpdateStats(savedTrip._id);

        console.log("stats obtained:");
        console.log(stats);

        //number, numDigits?
        expect(stats.maxRpm).toBeCloseTo(
          Math.max(...dataset.map((measurement) => measurement.rpm)),
          3
        );
      }
    });

    it("should persist it", async () => {
      let savedTrip = await createTripWithMeasurements(constantRpmValues);
      //closing it (stats are computed only when trip is finished)
      await TripsService.close(savedTrip._id);
      const stats = await TripsStatsService.computeAndUpdateStats(
        savedTrip._id
      );
      console.log(stats);
      const fetchedTrip = await Trip.findById(savedTrip._id);
      expect(fetchedTrip.maxRpm).toBeCloseTo(
        stats.maxRpm, //average(savedTrip.measurements.map((measurement) => measurement.rpm)),
        3
      );
    });
  });

  //kph
  describe("when asking for the average of trips' kph values", () => {
    //service methods
    it("should return the actual average value", async () => {
      for (dataset of kphDatasets) {
        console.log("testing with data:");
        console.log(dataset);

        let savedTrip = await createTripWithMeasurements(dataset);
        //closing it (stats are computed only when trip is finished)
        await TripsService.close(savedTrip._id);

        let stats = await TripsStatsService.computeEngineStats(savedTrip._id); //AndUpdateStats(savedTrip._id);

        console.log("stats obtained:");
        console.log(stats);

        //number, numDigits?
        expect(stats.avgKph).toBeCloseTo(
          average(savedTrip.measurements.map((measurement) => measurement.kph)),
          3
        );
      }
    });
  });

  describe("when asked for the maximum of kph values associated to a trip", () => {
    //service methods: computeAndUpdateStats
    it("should return the actual maximum value", async () => {
      for (dataset of kphDatasets) {
        let savedTrip = await createTripWithMeasurements(dataset);
        //closing it (stats are computed only when trip is finished)
        await TripsService.close(savedTrip._id);

        let stats = await TripsStatsService.computeEngineStats(savedTrip._id); //AndUpdateStats(savedTrip._id);

        console.log("stats obtained:");
        console.log(stats);

        //number, numDigits?
        expect(stats.maxKph).toBeCloseTo(
          Math.max(...dataset.map((measurement) => measurement.kph)),
          3
        );
      }
    });

    it("should persist it", async () => {
      let savedTrip = await createTripWithMeasurements(constantKphValues);
      //closing it (stats are computed only when trip is finished)
      await TripsService.close(savedTrip._id);
      const stats = await TripsStatsService.computeAndUpdateStats(
        savedTrip._id
      );
      console.log(stats);
      const fetchedTrip = await Trip.findById(savedTrip._id);
      expect(fetchedTrip.maxKph).toBeCloseTo(
        stats.maxKph, //average(savedTrip.measurements.map((measurement) => measurement.rpm)),
        3
      );
    });
  });

  //duration
  describe("when asked for the duration of a trip", () => {
    //service methods
    it("should consider its starting and ending timestamp", async () => {
      const tripApproximateDuration = 1000; //milliseconds
      const savedTrip = await createTripWithMeasurements(constantRpmValues);
      await sleep(tripApproximateDuration);
      await TripsService.close(savedTrip._id);
      const stats = await TripsStatsService.computeAndUpdateStats(
        savedTrip._id
      );
      expect(stats.duration).toBeCloseTo(
        tripApproximateDuration / 1000 / 60,
        0
      );
    });
  });

  //distance
  describe("when asked for the distance traveled during a trip", () => {
    //service methods
    it("should consider its starting and ending odometer measured value", async () => {
      const durationTraveled = 10;
      const startingOdometer = 14280;

      var dataset = [];
      for (
        var i = startingOdometer;
        i <= startingOdometer + durationTraveled;
        i++
      ) {
        dataset.push({ odometer: i });
      }

      const savedTrip = await createTripWithMeasurements(dataset);
      await TripsService.close(savedTrip._id);
      const stats = await TripsStatsService.computeDistanceAndTimeTraveledStats(
        savedTrip._id
      );
      expect(stats.distance).toBeCloseTo(durationTraveled, 0);
    });
  });

  //general
  describe("when specifing a timestamp from which to compute the average rpm", () => {
    //service methods
    it("should consider only the ones after it", async () => {
      //manually assigning timestamps to measurements

      for (dataset of rpmDatasets) {
        const sleepBetweenMeasurementsInMillis = 50;
        for (var i = 0; i < dataset.length; i++) {
          dataset[i].timestamp = now(); //moment().toDate(); // new Date(); //try here with moment
          await sleep(sleepBetweenMeasurementsInMillis);
        }
        //randomly choose the timestamp from which to consider data
        const randomIndex = randomIntFromInterval(0, dataset.length - 2);
        const timestampFromWhichToCompute = dataset[randomIndex].timestamp;
        console.log(
          "the random index:" +
            randomIndex +
            ", so the timestampFromWhichToCompute:" +
            timestampFromWhichToCompute
        );
        //saving trip
        let savedTrip = await createTripWithMeasurements(dataset);
        await TripsService.close(savedTrip._id); //closing it (stats are computed only when trip is finished)

        //comouting stats
        let stats = await TripsStatsService.computeEngineStats(
          savedTrip._id,
          timestampFromWhichToCompute
        );

        const avgValue = average(
          savedTrip.measurements
            .filter(
              (measurement) =>
                measurement.timestamp >= timestampFromWhichToCompute
            )
            .map((measurement) => measurement.rpm)
        );

        console.log("i tiemstam filtered by js: ");
        console.log(
          savedTrip.measurements
            .filter(
              (measurement) =>
                measurement.timestamp >= timestampFromWhichToCompute
            )
            .map((measurement) => measurement.rpm)
        );

        //number, numDigits?
        expect(stats.avgRpm).toBeCloseTo(avgValue, 3);
      }
    });
  });
});

/*this should be refactored in another test:
      ("stats for empty (no measurement) trips should be null")
      let emptyTrip = await createTripWithMeasurements([]);
      await TripsService.close(emptyTrip._id);
      let stats = await TripsStatsService.computeEngineStats(emptyTrip._id); //AndUpdateStats(savedTrip._id);

      console.log("stats obtained for empty trip:");
      console.log(stats);*/
