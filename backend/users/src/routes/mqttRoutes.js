const AchievementsService = require("../services/achievements");
const LevelsService = require("../services/levels");

const publisher = require("../utils/publishSubscribe");

//handles mqtt routing based on topics (topic-based routing)
//to be read from (global (with other micros)) config (constants) file
const notificationsTopicPrefix = "notifications/";

const achievementEventsTopicPrefix = "achievementsEvents/";
const achievementEventsRegex = new RegExp(
  "^" + achievementEventsTopicPrefix + "[^/]+$"
);
const achievementEventsTopics = achievementEventsTopicPrefix + "+";

const scoreUpdatedEventsTopicPrefix = "scoreUpdatedEvents/";
const scoreUpdatedEventsRegex = new RegExp(
  "^" + scoreUpdatedEventsTopicPrefix + "[^/]+$"
);
const scoreUpdatedEventsTopics = scoreUpdatedEventsRegex + "+";

const setupRoutes = () => {
  publisher.subscribe(
    [achievementEventsTopics, scoreUpdatedEventsTopics],
    () => {
      console.log(
        `Subscribed to topic '${achievementEventsTopics} and '${scoreUpdatedEventsTopics}'`
      );
    }
  );

  publisher.onConnect(() => {
    //every time car is turn off and turn on: a connect event is triggered
    //ignoring connection event
    console.log("mqtt client connected");
  });
  publisher.onMessage(async (topic, payload) => {
    const payloadAsObject = JSON.parse(payload);

    if (achievementEventsRegex.test(topic)) {
      try {
        const userId = topic.substring(
          topic,
          achievementEventsTopicPrefix.length
        );
        const achievementsUnlocked = await AchievementsService.unlockAchievements(
          [userId],
          payloadAsObject.badgesIds
        );

        publisher.publish(
          notificationsTopicPrefix + userId,
          achievementsUnlocked.map((achievementName) => ({
            subject: "New achievements unlocked",
            body: "You unlocked badge: " + achievementName,
          }))
        );
      } catch {
        console.log(
          "error in processing message with payload: " + payload + "at users"
        ); //log the error (cannot respond to client)
      }
    } else if (scoreUpdatedEventsRegex.test(topic)) {
      try {
        const userId = topic.substring(
          topic,
          scoreUpdatedEventsTopicPrefix.length
        );

        LevelsService.scoresChanged(
          userId,
          payloadAsObject.totalScoreDelta
        ).then((resObj) => {
          publisher.publish(notificationsTopicPrefix + userId, {
            subject: "New level achieved!",
            body: "You reached level: " + resObj.updatedUser.level,
          });
        });
      } catch {
        //possible errors in deserializing...
        console.log(
          "error in processing message with payload: " + payload + "at trips"
        ); //log the error only (cannot respond to client)
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
