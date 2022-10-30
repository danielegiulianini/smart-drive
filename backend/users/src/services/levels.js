const Profile = require("../models/users");

//callback chiamata con l'aumento di punti
const scoresChanged = async (userId, scoreDelta) => {
  //not reusing general edit function (in theory it should appply a filter for safety reason!)
  //fetching previous score...
  /*return Profile.findOneAndUpdate(
    {
      _id: userId,
    },
    { ecoScore: newTotalScore, level: getLevel(newTotalScore) },
    {
      new: true, //returning the new version
    }
  );*/

  //let possible exceptions bubble up
  const user = await Profile.findById(userId);
  if (user) {
    const oldLevel = user.level;
    console.log("scoreDelta: " + scoreDelta);
    user.ecoScore += scoreDelta;
    user.level = getLevel(user.ecoScore);
    return {
      updatedUser: await user.save(),
      levelChanged: oldLevel != user.level,
    };
  } else throw TypeError("Cannot updateScore for not-existing user");
};

//contains the logic for scores-levels mapping
const getLevel = (score) => {
  //return an integer
  //one trip gives 100 points
  //assume 3 trips for week
  //after 3 trips (week) level up
  const scorePerLevel = 300;
  return Math.round(score / scorePerLevel);
};

module.exports = {
  scoresChanged,
};
