const User = require("../models/users");

//it returns the achievements unlocked
async function unlockAchievements(userIds, achievements) {
  let newUnlockedAchievements = [];

  try {
    console.log("achievements to unlock: ", achievements);
    if (userIds.length > 0) {
      let users = await User.find({
        _id: { $in: userIds },
      });
      for (let user of users) {
        for (let achievement of achievements) {
          if (
            !user.unlockedAchievements
              .map((achiev) => achiev.id)
              .includes(achievement)
          ) {
            newUnlockedAchievements.push({ id: achievement });
          }
        }
        user.unlockedAchievements.push(...newUnlockedAchievements); //push doesn't take array as argument, but only variable length arg (leveraging spread operator for this)
        await user.save();
      }
      //not putting publish here but at higher level to ease testing (no mocking needed)
    }
  } catch (error) {
    console.log("error at achievements of users is: ", error);
  }
  return newUnlockedAchievements;
}

module.exports = {
  unlockAchievements,
};
