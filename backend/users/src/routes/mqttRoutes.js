const AchievementsService = require("../services/achievements");
const LevelsService = require("../services/levels");

const publisher = require("../utils/publishSubscribe");

//handles mqtt routing based on topics (topic-based routing)
//to be read from (global (with other micros)) config (constants) file

const achievementEventsTopicPrefix = "achievementsEvents/";
const achievementEventsRegex = new RegExp(
  "^" + achievementEventsTopicPrefix + "[^/]+$"
);
const achievementEventsTopics = achievementEventsTopicPrefix + "+";

const scoreUpdatedEventsTopicPrefix = "scoreUpdatedEvents/";
const scoreUpdatedEventsRegex = new RegExp(
  "^" + scoreUpdatedEventsTopicPrefix + "[^/]+$"
);
const scoreUpdatedEventsTopics = scoreUpdatedEventsTopicPrefix + "+";

const notificationsTopicPrefix = "notifications/";

const setupRoutes = () => {
  publisher.subscribe(
    [achievementEventsTopics, scoreUpdatedEventsTopics],
    () => {
      console.log(
        `Subscribed to topic ${achievementEventsTopics} and ${scoreUpdatedEventsTopics}`
      );
    }
  );

  publisher.onConnect(() => {
    //every time car is turn off and turn on: a connect event is triggered
    //ignoring connection event
    console.log("mqtt client connected");
  });
  publisher.onMessage(async (topic, payload) => {
    console.log(
      `received msg at users server of topic '${topic}' with content '${payload.toString()}'`
    );
    const payloadAsObject = JSON.parse(payload);

    if (achievementEventsRegex.test(topic)) {
      try {
        const userId = topic.substring(achievementEventsTopicPrefix.length);

        const achievementsUnlocked =
          await AchievementsService.unlockAchievements(
            [userId],
            payloadAsObject.badgesIds //before accessing like this a message-format check should be done
          );

        publisher.publish(
          notificationsTopicPrefix + userId,
          achievementsUnlocked.map((achievementName) => ({
            subject: "New achievements unlocked",
            body: "You unlocked badge: " + achievementName,
          }))
        );
      } catch (err) {
        console.log(
          "error in processing message with payload: " + payload + " at users"
        ); //log the error (cannot respond to client)
        console.log(err);

      }
    } else if (scoreUpdatedEventsRegex.test(topic)) {
      try {
        const userId = topic.substring(scoreUpdatedEventsTopicPrefix.length);

        LevelsService.scoresChanged(
          userId,
          payloadAsObject.totalScoreDelta
        ).then((resObj) => {
          if (resObj.levelChanged) {
            publisher.publish(notificationsTopicPrefix + userId, {
              subject: "New level achieved!",
              body: "You reached level: " + resObj.updatedUser.level,
            });
          }
        });
      } catch (err) {
        //possible errors in deserializing...
        console.log(
          "error in processing message with payload: " + payload + "at users"
        ); //log the error only (cannot respond to client)
        console.log(err);
      }
    } else {
      console.log("users mqtt client ignoring message");
    }

    console.log("Received Message:", topic, payload.toString());
  });
};

module.exports = {
  setupRoutes,
};
