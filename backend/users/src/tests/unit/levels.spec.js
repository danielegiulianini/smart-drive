const {
  dbConnect,
  dbDisconnect,
  dropCollections,
} = require("../../utils/dbHandler.utils");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//add a user
//change its score
//verify it has actually changed
//const scoresChanged = async (userId, scoreDelta) => {

const LevelsService = require("../../services/levels");
const Profile = require("../../models/users");

const fakeUserData = {
  _id: "fakeUserId",
  name: "Max",
  surname: "Verstappen",
  gender: "M",
  language: "IT",
  email: "verstappen@fakeEmail.com",
  city: "Monaco",
  country: "Belgium",
};

const fakeUserData2 = {
  _id: "fakeUserId2",
  name: "Charles",
  surname: "Leclerc",
  gender: "M",
  language: "IT",
  email: "leclerc@fakeEmail.com",
  city: "Monaco",
  country: "Monte Carlo",
};

describe("A Levels service", () => {
  describe("when a user has its score updated", () => {
    it("should return the correctly updated user", async () => {
      //check return value
      const savedUser = Profile.create(fakeUserData);
      const { updatedUser, isScoreChanged } = await LevelsService.scoresChanged(
        fakeUserData._id,
        100
      );

      expect(savedTrip._id).toBe(fakeUserData);
      expect(savedTrip.name).toBe(fakeUserData.name);
      expect(savedTrip.surname).toBe(fakeUserData);
      expect(savedTrip.gender).toBe(fakeUserData);
      expect(savedTrip.language).toBe(fakeUserData);
      expect(savedTrip.email).toBe(fakeUserData);
      expect(savedTrip.city).toBe(fakeUserData);
      expect(savedTrip.country).toBe(fakeUserData);

      //the most important
      expect(savedTrip.totalScore).toBe(100);
    });
  });

  it("should update its level too if a new level is reached", async () => {
    //check return value
    const savedUser = Profile.create(fakeUserData);
    const { updatedUser, isScoreChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      100
    );

    //the most important
    expect(savedTrip.totalScore).toBe(100);
  });

  it("should communicate if level is changed", async () => {
    //check return value
    const savedUser = Profile.create(fakeUserData);
    const { updatedUser, isScoreChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      100
    );

    expect(savedTrip._id).toBe(fakeUserData);
  });

  it("should persist the score updated", async () => {
    //aggiungo user e me lo ritrovo come lo ho aggiunto

    //check persistance
    await ProfileService.add(fakeUserData);

    const fetchedTrip = await Profile.findById(savedProfile._id);
  });

  it("should persist the new level", async () => {
    await ProfileService.add(fakeUserData);

    const fetchedTrip = await Profile.findById(savedProfile._id);
  });
  
  //other tests:
  //...
});
