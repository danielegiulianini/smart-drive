<script>
export default {
  data() {
    return {
      badges: [
        //feedback consideration
        {
          id: "feedbackConsiderationScore_single_trip_95",
          name: "Gold improver",
          description:
            "Get a feedback consideration score of at least 95 for a trip.",
          pictureUri: "/src/assets/img/badges/goldFeedback.png",
        },
        {
          id: "feedbackConsiderationScore_single_trip_92",

          name: "Silver improver",
          description:
            "Get a feedback consideration score of at least 92 for a trip.",
          pictureUri: "/src/assets/img/badges/silverFeedback.png",
        },
        {
          id: "feedbackConsiderationScore_single_trip_85",

          name: "Bronze improver",
          description:
            "Get a feedback consideration score of at least 85 for a trip.",
          pictureUri: "/src/assets/img/badges/bronzeFeedback.png",
        },
        //rpm
        {
          id: "rpmScore_single_trip_95",

          name: "Gold throttle-goose",
          description: "Get an aggressiveness score of at least 95 for a trip.",
          pictureUri: "/src/assets/img/badges/goldSmoothness.png",
        },
        {
          id: "rpmScore_single_trip_92",

          name: "Silver throttle-goose",
          description: "Get an aggressiveness score of at least 92 for a trip.",
          pictureUri: "/src/assets/img/badges/silverSmoothness.png",
        },

        {
          id: "rpmScore_single_trip_85",

          name: "Bronze throttle-goose",
          description: "Get an aggressiveness score of at least 85 for a trip.",
          pictureUri: "/src/assets/img/badges/bronzeSmoothness.png",
        },
        //speed
        {
          id: "speedScore_single_trip_95",

          name: "Gold speed Obsedient",
          description: "Get a safety score of at least 95 for a trip.",
          pictureUri: "/src/assets/img/badges/goldSpeed.png",
        },
        {
          id: "speedScore_single_trip_92",

          name: "Silver speed Obsedient",
          description: "Get a safety score of at least 92 for a trip.",
          pictureUri: "/src/assets/img/badges/silverSpeed.png",
        },
        {
          id: "speedScore_single_trip_85",

          name: "Bronze speed Obsedient",
          description: "Get a safety score of at least 85 for a trip.",
          pictureUri: "/src/assets/img/badges/bronzeSpeed.png",
        },
        //trips length
        {
          id: "restingScore_single_trip_95",

          name: "Gold rester",
          description: "Get a resting score of at least 95 for a trip.",
          pictureUri: "/src/assets/img/badges/goldRester.png",
        },
        {
          id: "restingScore_single_trip_92",

          name: "Silver rester",
          description: "Get a resting score of at least 92 for a trip.",
          pictureUri: "/src/assets/img/badges/silverRester.png",
        },
        {
          id: "restingScore_single_trip_85",

          name: "Bronze rester",
          description: "Get a resting score of at least 85 for a trip.",
          pictureUri: "/src/assets/img/badges/bronzeRester.png",
        },

        //trips
        {
            id: "trips_100",

          name: "Gold traveller",
          description: "Perform 100 trips.",
          pictureUri: "/src/assets/img/badges/goldTrips.png",
        },
        {
            id: "trips_5",

          name: "Silver traveller",
          description: "Perform 5 trips.",
          pictureUri: "/src/assets/img/badges/silverTrips.png",
        },

        {
            id: "trips_1",

          name: "Bronze traveller",
          description: "Perform your first trip.",
          pictureUri: "/src/assets/img/badges/bronzeTrips.png",
        },
        //vehicle category
        {
          id: "hybrid_power",

          name: "Hybrid power",
          description: "Add a vehicle with hybrid fuel type.",
          pictureUri: "/src/assets/img/badges/hybridCar.png",
        },
        {
          id: "electric_power",

          name: "Electric power",
          description: "Add a vehicle with electric fuel type.",
          pictureUri: "/src/assets/img/badges/electricCar.png",
        },
      ],
    };
  },
};
</script>
