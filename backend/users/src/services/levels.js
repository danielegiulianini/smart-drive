//callback chiamata con l'aumento di punti
const scoresChanged = async (userId, newTotalScore) => {
  //not reusing general edit function (in theory it should appply a filter for safety reason!)
  return Profile.findOneAndUpdate(
    {
      _id: userId,
    },
    { totalScore: newTotalScore, level: getLevel(newTotalScore) },
    {
      new: true, //returning the new version
    }
  );
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
