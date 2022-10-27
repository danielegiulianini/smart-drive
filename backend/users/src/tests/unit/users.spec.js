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
      const savedTrip = await ProfileService.add(fakeUserData);

      expect(savedTrip._id).toBe(fakeUserData._id);
      expect(savedTrip.name).toBe(fakeUserData.name);
      expect(savedTrip.surname).toBe(fakeUserData.surname);
      expect(savedTrip.gender).toBe(fakeUserData.gender);
      expect(savedTrip.language).toBe(fakeUserData.language);
      expect(savedTrip.email).toBe(fakeUserData.email);
      expect(savedTrip.city).toBe(fakeUserData.city);
      expect(savedTrip.country).toBe(fakeUserData.country);
      //level, score and achievements
    });

    it("should persist it correctly", async () => {
      //aggiungo user e me lo ritrovo come lo ho aggiunto
      await ProfileService.add(fakeUserData);

      const fetchedTrip = await Profile.findById(fakeUserData._id);

      expect(fetchedTrip._id).toBe(fakeUserData._id);
      expect(fetchedTrip.name).toBe(fakeUserData.name);
      expect(fetchedTrip.surname).toBe(fakeUserData.surname);
      expect(fetchedTrip.gender).toBe(fakeUserData.gender);
      expect(fetchedTrip.language).toBe(fakeUserData.language);
      expect(fetchedTrip.email).toBe(fakeUserData.email);
      expect(fetchedTrip.city).toBe(fakeUserData.city);
      expect(fetchedTrip.country).toBe(fakeUserData.country);
      //level, score and achievements
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

      const fetchedTrip = await Profile.findById(fakeUserData._id);

      //changes what to be changed
      expect(fetchedTrip.name).toBe(updatedName);

      //no-changes what to be not changed
      expect(fetchedTrip._id).toBe(fakeUserData._id);
      expect(fetchedTrip.surname).toBe(fakeUserData.surname);
      expect(fetchedTrip.gender).toBe(fakeUserData.gender);
      expect(fetchedTrip.language).toBe(fakeUserData.language);
      expect(fetchedTrip.email).toBe(fakeUserData.email);
      expect(fetchedTrip.city).toBe(fakeUserData.city);
      expect(fetchedTrip.country).toBe(fakeUserData.country);
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

      /*expect(async () => {
        await ProfileService.get(fakeUserData._id);
      });*/
      //todo NULL or undefined??

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
        (await ProfileService.list({
          order_by_column: "ecoScore",
          order_by_direction: "desc",
        })).map((user) => user._id)
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
  //- check default values are applied (in particular, for: scores levels, achievements)
  //- check users listing (getAll)
  //- check pagination
  //...
});
