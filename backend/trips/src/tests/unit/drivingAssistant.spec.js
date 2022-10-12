//THIS IS IMPORTANT

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

const DrivingAssistantService = require("../../services/trips.drivingAssistant");
const TripsService = require("../../services/trips.dataAcquisition");

//fixtures
const fakeVin = "JH4DA3450HS011682";
const fakeTripData = {
  sensorId: "fakeSensorId",
  vehicleIdentificationNumber: fakeVin,
  //startTimestamp
  //endTimestamp
  userId: "fakeUserId",
};

/*
const fakeMeasurementData = {
  rpm: fakeRpm,
  kph: fakeKph,
  odometer: fakeOdometer,
};*/

const rpmFeedbackDeservingMeasurements = () => {
  rpmMeasurements = [];
  for (let i = 0; i < 10; i++) {
    rpmMeasurements.push({ rpm: 4000 });
  }
  return rpmMeasurements;
  /*[...Array(10)].map((_, i) => {
    return { rpm: 4000 };
  });*/
};

const rpmFeedbacknNotDeservingMeasurements = () => {
  rpmMeasurements = [];

  for (let i = 0; i < 10; i++) {
    rpmMeasurements.push({ rpm: 2000 });
  }

  return rpmMeasurements;
  /*[...Array(10)].map((_, i) => {
    return { rpm: 2000 };
  });*/
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

describe("a driving assistant", () => {
  describe("when rpm exceeds thresholds", () => {
    //service methods
    it("should give a feedback for reducing them", async () => {
      const rpmFeedbackDeservingMeasurementsArray =
        rpmFeedbackDeservingMeasurements();

      const rpmExceedingTrip = createTripWithMeasurements(
        rpmFeedbackDeservingMeasurementsArray
      );

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        rpmExceedingTrip._id,
        rpmFeedbackDeservingMeasurementsArray[0]
      );

      validateStringEquality(feedback.text, "Be smoother with the throttle.");
    });

    it("should persist the feedback given", async () => {
      
      const rpmFeedbackDeservingMeasurementsArray =
        rpmFeedbackDeservingMeasurements();

      const rpmExceedingTrip = createTripWithMeasurements(
        rpmFeedbackDeservingMeasurementsArray
      );

      //getting advice
      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        rpmFeedbackDeservingMeasurementsArray[0]
      );

      expect(savedTrip.feedbacks).toContain(feedback);
    });
  });

  describe("when rpm does NOT exceed threshold", () => {
    //service methods
    it("should NOT give feedback for them", async () => {
      console.log("testing with data:");
      console.log(rpmFeedbackDeservingMeasurementsArray);
      //todo
      let savedTrip = await TripsService.addTrip(fakeTripData);
      await TripsService.close(savedTrip._id);
      let fetchedTrip = await TripsService.get(savedTrip._id);
      validateNotEmpty(fetchedTrip.endTimestamp);
    });
  });

  describe("when vehicle is idling", () => {
    //service methods
    it("should give a feedback for switching off the engine", async () => {
      savedTrip = await TripsService.addTrip(fakeTripData);

      validateNotEmpty(savedTrip);

      validateStringEquality(savedTrip.sensorId, fakeTripData.sensorId);
      validateStringEquality(
        savedTrip.vehicleIdentificationNumber,
        fakeTripData.vehicleIdentificationNumber
      );
      validateNotEmpty(savedTrip.startTimestamp);
      validateStringEquality(savedTrip.userId, fakeTripData.userId);
    });
  });

  describe("when vehicle is NOT idling", () => {
    //service methods
    it("should NOT give a feedback for switch off the engin", async () => {
      //todo
      let savedTrip = await TripsService.addTrip(fakeTripData);
      await TripsService.close(savedTrip._id);
      let fetchedTrip = await TripsService.get(savedTrip._id);
      validateNotEmpty(fetchedTrip.endTimestamp);
    });
  });
});
