//THIS IS IMPORTANT

const moment = require("moment");
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
function addMinutes(date, minutes) {
  //return new Date(date.getTime() + minutes * 60000);
  return moment(date).add(minutes, "m").utcOffset(0, true).toDate(); //.toDate().toISOString();
}

function subtractMinutes(date, minutes) {
  return addMinutes(date, -minutes);
}

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
  intervalInMinutes
) => {
  //for (var i = dataset.length; i > 0; i -= intervalInMinutes) {
  for (var i = 0; i < dataset.length; i++) {
    //al primo tolgo molto, all'ultimo poco...
    const measurementTimestamp = subtractMinutes(
      upTo,
      (dataset.length - i) * intervalInMinutes
    );
    console.log("now subtracting:" + (dataset.length - i) * intervalInMinutes);
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
    it.only("should give a feedback for reducing them", async () => {
      console.log(
        "the date with utfOffset with true" +
          moment().utcOffset(0, true).toDate()
      );
      console.log(
        "the date with utfOffset with false" +
          moment().utcOffset(0, false).toDate()
      );

      let rpmExceedingTrip = await createFakeTripWithMeasurements(
        assignTimestampToMeasurementsUpTo(
          rpmFeedbackDeservingMeasurements(), //actual data
          moment()
            //THIS IS NEEDED OR NOT???
            .utcOffset(0, true)
            .toDate(),
          //.date(), //.format(),// new Date(), //ending date of measurements
          1 //1 minute
        )
      );
      rpmExceedingTrip = await TripsService.close(rpmExceedingTrip._id);

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
        rpmFeedbackDeservingMeasurements()
      );

      //getting advice
      const feedback = await DrivingAssistantService.getAndAssignFeedback(
        savedTrip._id,
        rpmFeedbackDeservingMeasurements()[0]
      );

      expect(savedTrip.feedbacks).toContain(feedback);
    });
  });

  describe("when rpm does NOT exceed threshold", () => {
    //service methods
    it("should NOT give feedback for them", async () => {
      const savedTrip = await createFakeTripWithMeasurements(
        rpmFeedbackNotDeservingMeasurements()
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
        const savedTrip = await createFakeTripWithMeasurements(idlingDataset);
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
          notIdlingDataset
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
      //todo
    });
  });
});
