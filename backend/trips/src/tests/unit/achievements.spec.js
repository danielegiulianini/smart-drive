////not all are unit tests (ex. eletric vehicles!)
//total
//max
//no checking for persistance
//I know the requirements for every achievements ...
//it suffices having one for month, one for global...
//no need for measurements, but for scores only!

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
  now,
  addMinutes,
  subtractMinutes,
  subtractSeconds,
} = require("../../utils/time.utils.js");

//to-test data
const Trip = require("../../models/trips");
const TripsService = require("../../services/trips.dataAcquisition");
const AchievementsService = require("../../services/trips.achievements");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//fixtures
function fakeTripData(
  sensorId = "fakeSensorId",
  vehicleIdentificationNumber = "JH4DA3450HS011682",
  userId = "fakeUserId",
  startTimestamp = now(),
  endTimestamp = now(),
  totalScore = 0,
  speedScore = 0,
  rpmScore = 0,
  feedbackConsiderationScore = 0
) {
  return {
    sensorId: sensorId,
    vehicleIdentificationNumber: vehicleIdentificationNumber,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp,
    userId: userId,
    totalScore: totalScore,
    speedScore: speedScore,
    rpmScore: rpmScore,
    feedbackConsiderationScore: feedbackConsiderationScore,
  };
}

describe("An achievements calculator", () => {
  //==================== global achievements ====================
  //# of trips
  describe("when a user performs its first trip", () => {
    it("should assign a total-trips achievement", async () => {
      const userId = "userId";
      await TripsService.addTrip(fakeTripData((userId = userId)));
      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );
      expect(assignedAchievements).toContain("trip_first");
    });
  });

  describe("when a user performs 5 five trips since joined", () => {
    it("", async () => {
      const userId = "userId";
      await TripsService.addTrip(fakeTripData((userId = userId)));
      await TripsService.addTrip(fakeTripData((userId = userId)));
      await TripsService.addTrip(fakeTripData((userId = userId)));
      await TripsService.addTrip(fakeTripData((userId = userId)));
      await TripsService.addTrip(fakeTripData((userId = userId)));
      //await TripsService.close(savedTrip._id);
      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );

      expect(assignedAchievements).toContain("trips_5");
    });
  });

  //rpm
  describe("when a user gathers a rpm score of 500 since joined", () => {
    it("should assign a total-rpm-score achievement", async () => {
      const userId = "userId";
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 100))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 100))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 50))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 50))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 100))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 100))
      );
      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );
      expect(assignedAchievements).toContain("rpmScore_total_500");
    });
  });

  //feedback consideration
  describe("when a user gathers a rpm score of 100 since joined", () => {
    it("should assign a total-feedbackConsideration-score achievement", async () => {
      const userId = "userId";
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 50))
      );
      await TripsService.addTrip(
        fakeTripData((userId = userId), (rpmScore = 50))
      );

      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );
      expect(assignedAchievements).toContain("feedbackConsiderationScore_total_100");
    });
  });

  //==================== peak performance achievements ====================
  //rpm
  describe("when a user gathers a rpm score of 95 in a single trip", () => {
    it("should assign a max-rpm-score achievement", async () => {
      await TripsService.addTrip(
        fakeTripData(((userId = userId), (rpmScore = 96)))
      );
      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );
      expect(assignedAchievements).toContain("ecoscore_single_trip_95");
    });
  });

  //global
  describe("when a user gathers a total score of 95 in a single trip", () => {
    it("should assign a max-total-score achievement", async () => {
      await TripsService.addTrip(
        fakeTripData(((userId = userId), (totalScore = 96)))
      );
      const assignedAchievements = await AchievementsService.getAchievements(
        userId
      );
      expect(assignedAchievements).toContain("ecoscore_single_trip_95");
    });
  });
});
