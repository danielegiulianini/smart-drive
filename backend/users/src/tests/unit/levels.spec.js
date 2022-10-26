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
      await Profile.create(fakeUserData);
      const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
        fakeUserData._id,
        100
      );

      expect(updatedUser._id).toBe(fakeUserData._id);
      expect(updatedUser.name).toBe(fakeUserData.name);
      expect(updatedUser.surname).toBe(fakeUserData.surname);
      expect(updatedUser.gender).toBe(fakeUserData.gender);
      expect(updatedUser.language).toBe(fakeUserData.language);
      expect(updatedUser.email).toBe(fakeUserData.email);
      expect(updatedUser.city).toBe(fakeUserData.city);
      expect(updatedUser.country).toBe(fakeUserData.country);

      //the most important
      expect(updatedUser.ecoScore).toBe(100);
    });
  });

  it("should update its level too if a new level is reached", async () => {
    //check return value
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      300
    );

    //the most important
    expect(updatedUser.level).toBe(1);
  });

  it("should communicate if level is changed", async () => {
    //check return value
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      300 //the mimimum for raising user level
    );
    expect(levelChanged).toBe(true);
  });

  it("should communicate level is NOT changed if it did NOT actually change", async () => {
    //check return value
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      100 //less than the mimimum for raising user level
    );

    expect(levelChanged).toBe(false);
  });

  it("should NOT update its level if enough score is NOT gained", async () => {
    //check return value
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      100
    );

    //the most important
    expect(levelChanged).toBe(false);
    expect(updatedUser.level).toBe(0);
  });

  it("should persist the score updated", async () => {
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      100
    );
    const fetchedTrip = await Profile.findById(fakeUserData._id);
    expect(updatedUser.level).toBe(fetchedTrip.level);
  });

  it("should persist the new level", async () => {
    await Profile.create(fakeUserData);
    const { updatedUser, levelChanged } = await LevelsService.scoresChanged(
      fakeUserData._id,
      300 //the mimimum for raising user level
    );
    const fetchedTrip = await Profile.findById(fakeUserData._id);
    expect(updatedUser.level).toBe(fetchedTrip.level);
  });

  //other tests:
  //...
});
