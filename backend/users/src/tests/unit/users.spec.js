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

//to-test services
const ProfileService = require("../../services/users");
const Profile = require("../../models/users");

//fixtures
/*
    _id: req.body.tokenUserId,
    surname: req.body.surname,
    name: req.body.name,
    gender: req.body.gender,
    language: req.body.language,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
*/
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

describe("A Profile service", () => {
  describe("when a user is added for the first time", () => {
    it("should return it correctly", async () => {
      const savedUser = await ProfileService.add(fakeUserData);

      expect(savedUser._id).toBe(fakeUserData._id);
      expect(savedUser.name).toBe(fakeUserData.name);
      expect(savedUser.surname).toBe(fakeUserData.surname);
      expect(savedUser.gender).toBe(fakeUserData.gender);
      expect(savedUser.language).toBe(fakeUserData.language);
      expect(savedUser.email).toBe(fakeUserData.email);
      expect(savedUser.city).toBe(fakeUserData.city);
      expect(savedUser.country).toBe(fakeUserData.country);

      //level, score and achievements
      expect(savedUser.scoresTrend).toEqual([]);
      expect(savedUser.ecoScore).toBe(0);
      expect(savedUser.level).toBe(0);
      expect(savedUser.unlockedAchievements).toEqual([]);
    });

    it("should persist it correctly", async () => {
      //aggiungo user e me lo ritrovo come lo ho aggiunto
      await ProfileService.add(fakeUserData);

      const fetchedUser = await Profile.findById(fakeUserData._id);

      expect(fetchedUser._id).toBe(fakeUserData._id);
      expect(fetchedUser.name).toBe(fakeUserData.name);
      expect(fetchedUser.surname).toBe(fakeUserData.surname);
      expect(fetchedUser.gender).toBe(fakeUserData.gender);
      expect(fetchedUser.language).toBe(fakeUserData.language);
      expect(fetchedUser.email).toBe(fakeUserData.email);
      expect(fetchedUser.city).toBe(fakeUserData.city);
      expect(fetchedUser.country).toBe(fakeUserData.country);

      //level, score and achievements
      expect(fetchedUser.scoresTrend).toEqual([]);
      expect(fetchedUser.ecoScore).toBe(0);
      expect(fetchedUser.level).toBe(0);
      expect(fetchedUser.unlockedAchievements).toEqual([]);
    });
  });

  describe("when a user is added twice", () => {
    it("should throw an error", async () => {
      await ProfileService.add(fakeUserData);

      expect(async () => {
        await ProfileService.add(fakeUserData);
      }).rejects.toThrow(Error);
    });
  });
  describe("when a user is edited", () => {
    it("should persist the changes", async () => {
      const updatedName = "Fernando";

      await ProfileService.add(fakeUserData);

      await ProfileService.edit(fakeUserData._id, {
        name: updatedName,
      });

      const fetchedUser = await Profile.findById(fakeUserData._id);

      //changes what to be changed
      expect(fetchedUser.name).toBe(updatedName);

      //no-changes what to be not changed
      expect(fetchedUser._id).toBe(fakeUserData._id);
      expect(fetchedUser.surname).toBe(fakeUserData.surname);
      expect(fetchedUser.gender).toBe(fakeUserData.gender);
      expect(fetchedUser.language).toBe(fakeUserData.language);
      expect(fetchedUser.email).toBe(fakeUserData.email);
      expect(fetchedUser.city).toBe(fakeUserData.city);
      expect(fetchedUser.country).toBe(fakeUserData.country);
    });

    it("should throw an error if new user' email is already taken", async () => {
      await ProfileService.add(fakeUserData);
      await ProfileService.add(fakeUserData2);

      expect(async () => {
        await ProfileService.edit(fakeUserData2._id, {
          email: fakeUserData.email,
        });
      }).rejects.toThrow(Error);
    });
  });

  describe("when a user's removed", () => {
    it("should not list it anymore if asked", async () => {
      await ProfileService.add(fakeUserData);
      await ProfileService.remove(fakeUserData._id);

      expect(await ProfileService.get(fakeUserData._id)).toBeNull();
    });
  });

  describe("when retrieving users sorted by ecoscore and ordered by desc", () => {
    it("should list them correctly", async () => {
      const firstInRankingEcoscores = await ProfileService.add(fakeUserData);
      const secondInRankingEcoscores = await ProfileService.add(fakeUserData2);

      const unsortedUsers = [secondInRankingEcoscores, firstInRankingEcoscores];

      firstInRankingEcoscores.ecoScore = 100;
      secondInRankingEcoscores.ecoScore = 150;
      await firstInRankingEcoscores.save();
      await secondInRankingEcoscores.save();

      expect(
        (
          await ProfileService.list({
            order_by_column: "ecoScore",
            order_by_direction: "desc",
          })
        ).map((user) => user._id)
      ).toStrictEqual(
        unsortedUsers.sort((user) => user.ecoScore).map((user) => user._id)
      );
    });
  });

  describe("when retrieving users sorted by ecoscore and ordered by desc", () => {
    it("should list them correctly", async () => {
      const firstInRankingEcoscores = await ProfileService.add(fakeUserData2);
      const secondInRankingEcoscores = await ProfileService.add(fakeUserData);

      const unsortedUsers = [secondInRankingEcoscores, firstInRankingEcoscores];

      firstInRankingEcoscores.ecoScore = 100;
      secondInRankingEcoscores.ecoScore = 150;
      await firstInRankingEcoscores.save();
      await secondInRankingEcoscores.save();

      expect(
        (
          await ProfileService.list({
            order_by_column: "ecoScore",
            order_by_direction: "asc",
          })
        ).map((user) => user._id)
      ).toStrictEqual(
        unsortedUsers
          .sort((user) => user.ecoScore)
          .reverse()
          .map((user) => user._id)
      );
    });
  });

  //other tests:
  //- non deve ritornare users che non ho inserito
  //- removing a not-existing user triggers error...
  //- check remaining default values are applied
  //- check users listing (getAll)
  //- check pagination
  //...
});
