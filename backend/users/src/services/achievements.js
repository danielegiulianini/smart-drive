//invoked by rabbitmq or rest...
//and invoking notification

const User = require("../models/users");

//qui ho un db in memory che mantiene mapping id_achievement - achievements 8che poi
//salvo ridondato e non normalizzato in un db per fornirlo più
//facilmente al frontend. potrei normalizzare visto che sono ripetuti, ma poi mi serve un
//join... (retrieve un po' più complicato)

//funzione che aggiunge un achievement alla lista dello user

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
