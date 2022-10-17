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
  assignTimestampToMeasurementsUpTo,
} = require("../../utils/trip.utils");

const {
  now,
  addMinutes,
  subtractMinutes,
  subtractSeconds,
} = require("../../utils/time.utils.js");

const {
  arrayFilledWith,
  makeRepeated,
} = require("../../utils/arrays.utils.js");

//to-test data
const Trip = require("../../models/trips");
const ScoresService = require("../../services/trips.scores");

//fixture
datasets = [
  arrayFilledWith({ rpm: 1000 }, 20), //20*5" = 100"(2 windows)
  makeRepeated([{ rpm: 1000 }, { rpm: 3000 }, { rpm: 10000 }], 7), //3*7*5" = 105"(2 windows)
];

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

/*
//THIS IS IMPORTANT (for demo: actually not) 


//notes:
//one specification for score type...
//ripropongo la formula con js ... (qui posso riusare la funzione che scrive su db o no ...)
//check persistance too
//dati per almeno 2 finestre temporali...

//speed

//rpm

//feedback consideration
*/

//adapted from: https://stackoverflow.com/questions/7343890/standard-deviation-javascript
function getStandardDeviation(numbersArr) {
  // CALCULATE AVERAGE
  var total = 0;
  for (var key in numbersArr) total += numbersArr[key];
  var meanVal = total / numbersArr.length;
  // CALCULATE AVERAGE

  // CALCULATE STANDARD DEVIATION
  var SDprep = 0;
  for (var key in numbersArr)
    SDprep += Math.pow(parseFloat(numbersArr[key]) - meanVal, 2);
  var SDresult = Math.sqrt(SDprep / numbersArr.length);
  // CALCULATE STANDARD DEVIATION

  return SDresult;
}

describe("A score calculator", () => {
  //rpm
  describe("when computing rpm score", () => {
    it("should compute it correctly", async () => {
      //prepare trip with timestamps FOR AT LEAST 2 WINDOWS (each window is 60s)

      for (dataset of datasets) {
        //assigning timestamps to measurements
        const savedTrip = await createFakeTripWithMeasurements(
          assignTimestampToMeasurementsUpTo(
            dataset,
            now(),
            5 //5 seconds
          )
        );

        const scores = await ScoresService.computeScores(savedTrip._id);

        expect(scores.rpmScore).toBeDefined();
        expect(scores.rpmScore).toBeGreaterThanOrEqual(0);
        expect(scores.rpmScore).toBeCloseTo(
          100 -
            (getStandardDeviation(
              savedTrip.measurements.map((measurement) => measurement.rpm)
            ) /
              6000) *
              100,
          0
        );
      }
    });
  });

  //feedback consideration
  describe("when computing feedback-consideration's score", () => {
    it("should compute it correctly", async () => {
      //>window is 60" wide
      let scores;
      //0 window, 0 duplicates
      /*const tripWithoutFeedbacks = await createFakeTripWithMeasurements([]); //measurements are not needed
      let scores = await ScoresService.computeScores(tripWithoutFeedbacks._id);

      //istanzio la formula per il caso specifico
      expect(scores.feedbackConsiderationScore).toBeDefined();
      expect(scores.feedbackConsiderationScore).toBeGreaterThanOrEqual(0);
      expect(scores.feedbackConsiderationScore).toBeCloseTo(
        0,
        0 //digits
      );*/

      //========= 2 window, 0 duplicates =========
      const tripWithoutRepeatedFeedbacks = await createFakeTripWithMeasurements(
        [] //measurements are not needed
      );
      tripWithoutRepeatedFeedbacks.feedbacks.push({
        text: "Be smoother with the throttle",
        timestamp: subtractSeconds(now(), 100),
      });
      tripWithoutRepeatedFeedbacks.feedbacks.push({
        text: "Turn the engine off to avoid unnecessary emissions.",
        timestamp: subtractSeconds(now(), 200),
      });
      tripWithoutRepeatedFeedbacksSaved =
        await tripWithoutRepeatedFeedbacks.save();

      scores = await ScoresService.computeFeedbackConsiderationScoreOffline(
        tripWithoutRepeatedFeedbacksSaved._id
      );

      expect(scores.feedbackConsiderationScore).toBeDefined();
      expect(scores.feedbackConsiderationScore).toBeGreaterThanOrEqual(0);
      expect(scores.feedbackConsiderationScore).toBeCloseTo(
        100,
        0 //digits
      );

      //========= 1 windows, 1 duplicate =========
      const tripWithRepeatedFeedbacks = await createFakeTripWithMeasurements(
        []
      );
      tripWithRepeatedFeedbacks.feedbacks.push({
        text: "Be smoother with the throttle",
        timestamp: subtractSeconds(now(), 25),
      });
      tripWithRepeatedFeedbacks.feedbacks.push({
        text: "Be smoother with the throttle",
        timestamp: subtractSeconds(now(), 20),
      });
      const tripWithRepeatedFeedbacksSaved =
        await tripWithRepeatedFeedbacks.save();

      scores = await ScoresService.computeFeedbackConsiderationScoreOffline(
        tripWithRepeatedFeedbacksSaved._id
      );

      expect(scores.feedbackConsiderationScore).toBeDefined();
      expect(scores.feedbackConsiderationScore).toBeGreaterThanOrEqual(0);
      expect(scores.feedbackConsiderationScore).toBeCloseTo(
        50,
        0 //digits
      );
    });
  });

  //speed

  //general
  describe("when computing scores", () => {
    it("should persist them assigning them to the trip", async () => {
      for (dataset of datasets) {
        //assigning timestamps to measurements
        const savedTrip = await createFakeTripWithMeasurements(
          assignTimestampToMeasurementsUpTo(
            dataset,
            now(),
            5 //5 seconds
          )
        );

        const scores = await ScoresService.computeAndAssignScores(
          savedTrip._id
        );

        const fetchedTrip = await Trip.findById(savedTrip._id);

        expect(fetchedTrip.rpmScore).toBeDefined();
        expect(fetchedTrip.feedbackConsiderationScore).toBeDefined();

        expect(fetchedTrip.rpmScore).toBeCloseTo(scores.rpmScore, 0);
        expect(fetchedTrip.feedbackConsiderationScore).toBeCloseTo(
          scores.feedbackConsiderationScore,
          0
        );

        /*expect(ScoresService.feedbackConsiderationScore).toBeCloseTo(
          scores.feedbackConsiderationScore
        );*/
      }
    });
  });
});
