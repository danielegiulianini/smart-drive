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

//general notes on testing:
//all the if-else branches
//edge cases
//check:
//- return values
//- side effects
//- exceptions to be thrown

//unlock achievements
//unlock multiple achievements
//not unlock what must not be unlocked

const AchievementsService = require("../../services/achievements");
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

describe("A achievements service", () => {
  describe("when a user unlocks an achievement", () => {
    it("should persist the unlocked achievement", async () => {
      const achievement = "simpleAchievement";
      await Profile.create(fakeUserData);
      await AchievementsService.unlockAchievements(
        [fakeUserData._id],
        [achievement]
      );

      const fetchedUser = await Profile.findById(fakeUserData._id);
      console.log("il fetched user: ", fetchedUser)
      expect(
        fetchedUser.unlockedAchievements.map((achievement) => achievement.id)
      ).toContain(achievement);
    });
  });

  describe("when a user unlocks many achievements", () => {
    it("should persist all of them", async () => {
      const achievements = ["firstAchievement", "secondAchievement"];
      await Profile.create(fakeUserData);
      await AchievementsService.unlockAchievements(
        [fakeUserData._id],
        [achievements[0], achievements[1]]
      );

      const fetchedUser = await Profile.findById(fakeUserData._id);
      console.log("il fetched user: ", fetchedUser)

      expect(
        fetchedUser.unlockedAchievements.map((achievement) => achievement.id)
      ).toEqual(
        expect.arrayContaining(
          achievements
        )
      );
    });
  });

  //to test: 
  //don't unlock two times the same achievement...
});
