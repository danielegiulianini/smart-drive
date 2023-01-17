const { now } = require("mongoose");
const Profile = require("../models/users");

//callback chiamata con l'aumento di punti
const scoresChanged = async (
  userId,
  totalScore,
  rpmScore,
  speedScore,
  feedbackConsiderationScore
) => {
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
    console.log("trip's total score: " + totalScore);
    console.log("trip's speed score: " + speedScore);
    console.log("trip's rpm score: " + rpmScore);
    console.log("trip's feedback cons score: " + feedbackConsiderationScore);

    user.xp += totalScore + 1;

    //user's score after one trip should be the trip score, otherwise: previous score too is taken into consideration
    user.ecoScore =
      user.ecoScore == 0 ? totalScore : (user.ecoScore + totalScore) / 2;
    user.rpmScore =
      user.ecoScore == 0 ? rpmScore : (user.rpmScore + rpmScore) / 2;
    user.speedScore =
      user.ecoScore == 0 ? speedScore : (user.speedScore + speedScore) / 2;
    user.feedbackConsiderationScore =
      user.ecoScore == 0
        ? feedbackConsiderationScore
        : (user.feedbackConsiderationScore + feedbackConsiderationScore) / 2;

    user.level = getLevel(user.xp);
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

const trackUsersScores = async () => {
  console.log("tracking users scores");
  const lastDaysCountOfTrackedScore = 14;
  //for each user push to scores its current score
  for await (const user of Profile.find()) {
    user.scoresTrend.push({ score: user.ecoScore }); //createdAt defaults to current timestamp
    //take only at most 14-days-old score
    user.scoresTrend = user.scoresTrend.slice(-lastDaysCountOfTrackedScore); //user.scoresTrend.filter((score) => score.createdAt > subtractDays(now(), 14)
    await user.save();
  }
};

module.exports = {
  scoresChanged,
  trackUsersScores,
};
