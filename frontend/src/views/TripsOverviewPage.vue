<template>
  <Spinner :show="isLoading"></Spinner>

  <TheAppHeader></TheAppHeader>
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>My Trips</h1>
      <!--<nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">My Trips</li>
        </ol>
      </nav>-->
    </div>
    <!-- End Page Title -->
    <section class="section">
      <!--        :key="trip._id"
-->
      <TripOverviewCard
        v-for="(trip, index) in trips"
        :globalScore="trip.globalScore"
        :startTimestamp="trip.startTimestamp"
        :endTimestamp="trip.endTimestamp"
        :date="trip.date"
        :vehicleModel="trip.vehicleModel"
        :vehicleMake="trip.vehicleMake"
        :startLocation="trip.startLocation"
        :endLocation="trip.endLocation"
        :positions="trip.positions"
      ></TripOverviewCard>
    </section>
  </main>
  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import TripOverviewCard from "../components/TripOverviewCard.vue";
import Spinner from "../components/Spinner.vue";
import axios from "axios";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    TripOverviewCard,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
      trips: [],
    };
  },
  methods: {
    //return a promise with location name...
    async getLocationName(latitude, longitude) {
      new Promise((resolve, reject) => {
        if (latitude && longitude) {
          resolve(""); //to be callend inside callback
        } else {
          console.log(
            "no latitude or longitude => so, not performing geocoding"
          );
          resolve("");
        }
      });
    },
  },
  async mounted() {
    //must fetch only closed trip (for statistics to be computed)
    console.log("getting trip info...");

    const loggedInUserId = 12; //this.$store.state.user.id; or with vuex getter

    //manually joining (trips/vehicles) backend info as trips model doesn't contain all trip's info to show
    //The { item : null } query matches documents that either contain
    //the item field whose value is null or that do not contain the item field.
    const aPromise = axios
      .get(`trips?userId=${loggedInUserId}`)
      .then((trips) => {
        console.log("data returned by trips micro is", trips.data);
        return Promise.all(
          trips.data.map((trip) => {
            //============================= overview =============================

            let startDate = new Date(trip.startTimestamp);
            trip.startTimestamp = startDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            trip.endTimestamp = new Date(trip.endTimestamp).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            );

            //pretty printing date
            var month = startDate.toLocaleString("default", { month: "short" });
            var day = startDate.getUTCDate();
            var year = startDate.getUTCFullYear();
            trip.date = day + " " + month + " " + year;

            //mapping measurements to google maps format: here, in express or directly in arduino?
            trip.positions = trip.measurements.map(
              (measurement) => measurement.position
            );
            //CAUTION: Array.at does not return error if passed index is null but undefined
            trip.startLocation = {};
            trip.endLocation = {};
            trip.startLocation.latitude = trip.positions.at(0)?.lat;
            trip.startLocation.longitude = trip.positions.at(0)?.lng;
            trip.endLocation.latitude = trip.positions.at(
              trip.positions.length - 1
            )?.lat;
            trip.endLocation.longitude = trip.positions.at(
              trip.positions.length - 1
            )?.lng;

            //scores
            trip.globalScore = trip.totalScore;

            //============================= vehicles info =============================
            return (
              axios
                .get(
                  `vehicles/userVehicles/${trip.vehicleIdentificationNumber}`
                )
                .then((userVehicleRes) => {
                  console.log(
                    "data returned by userVehicles micro is",
                    userVehicleRes.data
                  );
                  return axios
                    .get(
                      `vehicles/vehiclesModels/vehicleDetails/${userVehicleRes.data.vehicleModelId}`
                    )
                    .then((vehicleRes) => {
                      console.log(
                        "data coming from vehiclesModels",
                        vehicleRes.data
                      );
                      const vehicleData = vehicleRes.data;

                      trip.vehicleMake = vehicleData.make;
                      trip.vehicleModel = vehicleData.model;

                      return trip;
                    });
                })
                //============================= reverse geoconding =============================
                .then(() => {
                  trip.startLocation.name = this.getLocationName(
                    trip.startLocation.latitude,
                    trip.startLocation.longitude
                  );
                  return trip;
                })

                .then(() => {
                  trip.endLocation.name = this.getLocationName(
                    trip.endLocation.latitude,
                    trip.endLocation.longitude
                  );
                  return trip;
                })
            );
          })
        );
      })
      .catch((err) => {
        console.log("exceotion received");
        console.error(err);
        //maybe communicate something to user (with a mre user-friendly mapping?)
      })
      .finally(() => {
        console.log("nel finally");
        this.isLoading = false;
      });

    const a = await aPromise;
    //this.trips = a;
    console.log("i trips raffianti: ", a);
  },
  watch: {
    trips(newVal, oldVal) {
      console.log("trips updated inside watcher!");
    },
  },
};
</script>
