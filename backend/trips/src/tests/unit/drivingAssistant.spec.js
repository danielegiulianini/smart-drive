//THIS IS IMPORTANT

//const moment = require("moment");

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
  createFakeTripWithMeasurements,
} = require("../../utils/trip.utils");

const { arrayFilledWith } = require("../../utils/arrays.utils.js");

//test utils
const {
  now,
  addMinutes,
  subtractMinutes,
  subtractSeconds,
} = require("../../utils/time.utils.js");

const assignTimestampToMeasurementsFrom = (
  dataset,
  from,
  intervalInMinutes
) => {
  for (var i = 0; i < dataset.length; i += intervalInMinutes) {
    const measurementTimestamp = addMinutes(from, i);
    console.log("assigning timestamp:" + measurementTimestamp);
    dataset[i].timestamp = measurementTimestamp; //1 measurement for every minute
  }
  return dataset;
};

const assignTimestampToMeasurementsUpTo = (
  dataset,
  upTo,
  intervalBetweenMeasurementsInSeconds
) => {
  //for (var i = dataset.length; i > 0; i -= intervalInMinutes) {
  for (var i = 0; i < dataset.length; i++) {
    //al primo tolgo molto, all'ultimo poco...
    const measurementTimestamp = subtractSeconds(
      upTo,
      (dataset.length - i) * intervalBetweenMeasurementsInSeconds
    );
    console.log(
      "now subtracting:" +
        (dataset.length - i) * intervalBetweenMeasurementsInSeconds
    );
    console.log("assigning timestamp:" + measurementTimestamp);
    console.log("to measurement:");
    console.log(dataset[i]);

    dataset[i].timestamp = measurementTimestamp; //1 measurement for every minute
  }
  return dataset;
};

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

//rpm fixtures
const rpmFeedbackDeservingMeasurements = () => {
  rpmMeasurements = [];
  for (let i = 0; i < 10; i++) {
    rpmMeasurements.push({ rpm: 4000 });
  }
  return rpmMeasurements;

  /*const sleepBetweenMeasurementsInMillis = 50;
  const dataset = constantRpmValues;
  let timestampFromWhichToCompute;
  for (var i = 0; i < dataset.length; i++) {
    dataset[i].timestamp = new Date();
    await sleep(sleepBetweenMeasurementsInMillis);
    if (i == dataset.length / 2) {
      timestampFromWhichToCompute = dataset[i].timestamp;
    }
  }*/
  /*[...Array(10)].map((_, i) => {
    return { rpm: 4000 };
  });*/
};

const rpmFeedbackNotDeservingMeasurements = () => {
  rpmMeasurements = [];

  for (let i = 0; i < 10; i++) {
    rpmMeasurements.push({ rpm: 2000 });
  }

  return rpmMeasurements;
  /*[...Array(10)].map((_, i) => {
    return { rpm: 2000 };
  });*/
};

//kph-related fixtures
const idlingMeasurementsDatasets = [
  arrayFilledWith({ kph: 0 }, 10),
  arrayFilledWith({ kph: 1 }, 3).concat(arrayFilledWith({ kph: 0 }, 20)),
];

const notIdlingMeasurementsDatasets = [
  [{ kph: 1 }, { kph: 2 }, { kph: 3 }, { kph: 4 }, { kph: 0 }],
];

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

describe("a driving assistant", () => {
  describe("when rpm exceeds thresholds", () => {
    //service methods
    it("should give a feedback for reducing them", async () => {
      let rpmExceedingTrip = await createFakeTripWithMeasurements(
        assignTimestampToMeasurementsUpTo(
          rpmFeedbackDeservingMeasurements(), //actual data
          now(),
          1 //1 seconds
        )
      );
      //rpmExceedingTrip = await TripsService.close(rpmExceedingTrip._id);

      console.log("il trip created:");
      console.log(rpmExceedingTrip);

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        rpmExceedingTrip._id,
        rpmFeedbackDeservingMeasurements()[0]
      );

      validateStringEquality(feedback.text, "Be smoother with the throttle.");
    });

    it("should persist the feedback given", async () => {
      const savedTrip = await createFakeTripWithMeasurements(
        assignTimestampToMeasurementsUpTo(
          rpmFeedbackDeservingMeasurements(),
          now(), // moment().utcOffset(0, false).toDate(),
          1 //1 seconds
        )
      );

      //getting advice
      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        rpmFeedbackDeservingMeasurements()[0]
      );

      const fetchedTrip = await Trip.findById(savedTrip._id); //.exec();
      console.log("il fetched trip: ");
      console.log(fetchedTrip);
      /*expect(fetchedTrip.feedbacks).toContain(
        expect.objectContaining({ text: "Be smoother with the throttle." })
      );*/

      expect(fetchedTrip.feedbacks).toEqual(
        // 1
        expect.arrayContaining([
          // 2
          expect.objectContaining(
            // 3
            { text: "Be smoother with the throttle." } // 4
          ),
        ])
      );
    });
  });

  describe("when rpm does NOT exceed threshold", () => {
    //service methods
    it("should NOT give feedback for them", async () => {
      const savedTrip = await createFakeTripWithMeasurements(
        assignTimestampToMeasurementsUpTo(
          rpmFeedbackNotDeservingMeasurements(),
          now(), //moment().utcOffset(0, false).toDate(),
          1 //1 minute
        )
      );
      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        rpmFeedbackNotDeservingMeasurements()[0]
      );

      expect(feedback).not.toEqual(
        expect.objectContaining({ text: "Be smoother with the throttle." })
      );
    });
  });

  describe("when vehicle is idling too much", () => {
    //service methods
    it("should give a feedback for switching off the engine", async () => {
      for (idlingDataset of idlingMeasurementsDatasets) {
        const savedTrip = await createFakeTripWithMeasurements(
          assignTimestampToMeasurementsUpTo(
            idlingDataset,
            now(), //moment().utcOffset(0, false).toDate(),
            1 //1 minute
          )
        );
        const feedback = await DrivingAssistantService.getAndAssignFeedback(
          savedTrip._id,
          idlingDataset[0]
        );
        validateStringEquality(
          feedback.text,
          "Turn the engine off to avoid unnecessary emissions."
        );
      }
    });
  });

  describe("when vehicle is NOT idling", () => {
    //service methods
    it("should NOT give a feedback for switching off the engine", async () => {
      for (notIdlingDataset of notIdlingMeasurementsDatasets) {
        const savedTrip = await createFakeTripWithMeasurements(
          assignTimestampToMeasurementsUpTo(
            notIdlingDataset,
            now(),
            1 //seconds
          )
        );
        const feedback = await DrivingAssistantService.getAndAssignFeedback(
          savedTrip._id,
          notIdlingDataset[0]
        );
        expect(feedback).not.toEqual(
          expect.objectContaining({
            text: "Turn the engine off to avoid unnecessary emissions.",
          })
        );
      }
    });
  });

  describe("when trip is eligible for more than one feedback", () => {
    //service methods
    it("should give the one with most priority", async () => {
      const idlingAndRpmExceedingDataset = idlingDataset.concat(
        rpmFeedbackDeservingMeasurements()
      );

      const savedTrip = await createFakeTripWithMeasurements(
        assignTimestampToMeasurementsUpTo(
          idlingAndRpmExceedingDataset,
          now(),
          1 //seconds
        )
      );

      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        idlingAndRpmExceedingDataset[0]
      );
      validateStringEquality(feedback.text, "Be smoother with the throttle."); //(rpm exceeding has higher priority than idling feedback)
    });
  });
});
