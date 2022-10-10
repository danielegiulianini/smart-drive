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

const loadMeasurementsToTrip = require("../../utils/trip.utils");

//to-test data
const Trip = require("../../models/trips");
const TripsStatsService = require("../../services/trips.stats");
const trips = require("../../models/trips");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

describe("a stats calculator", () => {
  describe("when asked for the average of rpm values associated to a trip", () => {
    //service methods
    it("should return the actual average value", async () => {
      const constantRpmValues = [...Array(10)].map((_, i) => {
        return { rpm: 2000 };
      });

      console.log("testing with data:");
      console.log(rpmData);

      let savedTrip = await loadMeasurementsToTrip.createTripWithMeasurements(
        constantRpmValues
      );
      let stats = await TripsStatsService.computeAndUpdateStats(
        savedTrip.tripId
      );
      
      //number, numDigits?
      expect(stats.rpm).toBeCloseTo(0.3, 3);

      const nonConstantRpmValues = [
        { rpm: 1000 },
        { rpm: 3000 },
        { rpm: 10000 },
        { rpm: 7000 },
        { rpm: 1000 },
      ];
      savedTrip = await loadMeasurementsToTrip.createTripWithMeasurements(
        nonConstantRpmValues
      );
      stats = await TripsStatsService.computeAndUpdateStats(savedTrip.tripId);
      expect(stats.rpm).toBeCloseTo(0.3, 3);
    });

    it("should persist it", async () => {
      const savedTrip = await TripsService.addTrip(fakeTripData);

      const rpmFeedbackDeservingMeasurementsArray =
        rpmFeedbackDeservingMeasurements();
      console.log("testing with data:");
      console.log(rpmFeedbackDeservingMeasurementsArray);

      savedTrip.measurements.concat(rpmFeedbackDeservingMeasurementsArray);
      await savedTrip.save();

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        rpmFeedbackDeservingMeasurementsArray[0]
      );

      // await Trip.findById(savedTrip._id);
      expect(savedTrip.feedbacks).toContain(feedback);
    });
  });

  describe("when asking for the average of trips' rpm values", () => {
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

  describe("when specifing a timestamp from which to compute the average", () => {
    //service methods
    it("should consider only the ones after it", async () => {
      //carico più dati di quel che serve e vediamo se li trascura
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
});
