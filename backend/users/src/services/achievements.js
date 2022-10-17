//invoked by rabbitmq or rest...
//and invoking notification

const User = require("../services/users");

//qui ho un db in memory che mantiene mapping id_achievement - achievements 8che poi
//salvo ridondato e non normalizzato in un db per fornirlo più
//facilmente al frontend. potrei normalizzare visto che sono ripetuti, ma poi mi serve un
//join... (retrieve un po' più complicato)

//funzione che aggiunge un achievement alla lista dello user
async function unlockAchievements(userIds, ...achievements) {
  if (userIds.length == 0) {
    return;
  }

  let users = await User.find({
    _id: { $in: userIds },
  });
  for (let user of users) {
    for (let achievement of achievements) {
      if (!user.unlockedAchievements.includes(achievement)) {
        user.unlockedAchievements.push(achievement);
      }
    }
    await user.save();
  }
  //not putting publish here but at higher level to ease testing (no mocking needed)
}
module.exports = {
  unlockAchievements,
};
