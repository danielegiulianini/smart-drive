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
  { rpm: 1000 },
  { rpm: 3000 },
  { rpm: 10000 },
  { rpm: 7000 },
  { rpm: 1000 },
];
const rpmDatasets = [constantRpmValues, nonConstantRpmValues];

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

//actual tests
describe("a stats calculator", () => {
  //rpm
  describe("when asked for the average of rpm values associated to a trip", () => {
    //service methods: computeAndUpdateStats
    it("should return the actual average value", async () => {
      for (dataset of rpmDatasets) {
        console.log("testing with data:");
        console.log(dataset);

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

  //kph
  /*describe("when asking for the average of trips' kph values", () => {
    //service methods
    it("should persist it", async () => {
      const rpmExceedingTrip = await TripsService.addTrip(fakeTripData);

      const rpmFeedbackDeservingMeasurementsArray =
        rpmFeedbackDeservingMeasurements();
      console.log("testing with data:");
      console.log(rpmFeedbackDeservingMeasurementsArray);

      //adding measurements to trip
      rpmExceedingTrip.measurements.concat(
        rpmFeedbackDeservingMeasurementsArray
      );
      await rpmExceedingTrip.save();

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        rpmExceedingTrip._id,
        rpmFeedbackDeservingMeasurementsArray[0]
      );

      validateStringEquality(feedback.text, "Be smoother with the throttle.");
    });
  });

  //distance traveled
  describe("when asking for the distance traveled of trip' kph values", () => {
    //service methods
    it("should persist it", async () => {
      const rpmExceedingTrip = await TripsService.addTrip(fakeTripData);

      const rpmFeedbackDeservingMeasurementsArray =
        rpmFeedbackDeservingMeasurements();
      console.log("testing with data:");
      console.log(rpmFeedbackDeservingMeasurementsArray);

      //adding measurements to trip
      rpmExceedingTrip.measurements.concat(
        rpmFeedbackDeservingMeasurementsArray
      );
      await rpmExceedingTrip.save();

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        rpmExceedingTrip._id,
        rpmFeedbackDeservingMeasurementsArray[0]
      );

      validateStringEquality(feedback.text, "Be smoother with the throttle.");
    });
  });*/

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
      console.log("the duration computed is " + stats.duration);
      expect(stats.duration).toBeCloseTo(tripApproximateDuration / 1000, 0);
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
  describe("when specifing a timestamp from which to compute the average", () => {
    //service methods
    it("should consider only the ones after it", async () => {
      //assigning timestamps to measurements
      const dataset = constantRpmValues;
      let timestampFromWhichToCompute;
      for (var i = 0; i < dataset.length; i++) {
        dataset[i].timestamp = new Date();
        console.log("assigning timestamp:" + dataset[i].timestamp);

        await sleep(50);
        if (i == dataset.length / 2) {
          console.log("assigninf time");
          timestampFromWhichToCompute = dataset[i].timestamp;
        }
      }
      /*const startingTimestamp = new Date("2017-10-25T12:00:00Z");
      for (var i = 0; i < dataset.length; i++) {
        const measurementTimestamp = new Date(
          startingTimestamp.getTime() + i * 1000 * 60
        );
        console.log("assigning timestamp:" + measurementTimestamp);
        dataset[i].timestamp = measurementTimestamp; //1 measurement for every minute
      }
      const timestampFromWhichToCompute =
        startingTimestamp + dataset.length / 2; //consider only half of values for stats
        */

      //saving trip
      let savedTrip = await createTripWithMeasurements(dataset);
      await TripsService.close(savedTrip._id); //closing it (stats are computed only when trip is finished)

      //comouting stats
      let stats = await TripsStatsService.computeEngineStats(
        savedTrip._id,
        timestampFromWhichToCompute
      );

      console.log("stats obtained:");
      console.log(stats);

      const avgValue = average(
        savedTrip.measurements
          .filter(
            (measurement) =>
              measurement.timestamp >= timestampFromWhichToCompute
          )
          .map((measurement) => measurement.rpm)
      );
      console.log("i values per lavgvalues: ");
      console.log(savedTrip.measurements);
      console.log("i valuesfiltered: ");
      console.log(
        savedTrip.measurements.filter(
          (measurement) => measurement.timestamp >= timestampFromWhichToCompute
        )
      );
      console.log("avgvalue is:" + avgValue);
      //number, numDigits?
      expect(stats.avgRpm).toBeCloseTo(avgValue, 3);
    });
  });
});
