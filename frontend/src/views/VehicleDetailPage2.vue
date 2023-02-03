<template>
  <!-- this template resembles vehicleCard, but more in detail...-->
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
    <Spinner :show="isLoading"></Spinner>

    <div class="pagetitle">
      <h1>Vehicle Detail</h1>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">
        <!-- start of col containing card-->
        <div class="col-12 col-md-5 col-lg-5">
          <div class="col">
            <div class="card mb-2">
              <img :src="actualPictureUri" class="card-img-top" alt="..." />
              <div class="card-body">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <h1
                      class="card-title mb-0 pb-2 text-start"
                      style="font-size: 180%"
                    >
                      {{ overview.make }}
                    </h1>
                    <h6 class="card-subtitle mb-2 text-muted">
                      <span style="font-size: 140%">{{ overview.model }}</span>
                      <!--<span class="badge bg-secondary ms-2">Most used</span>-->
                    </h6>
                  </div>
                  <div class="mt-3 d-flex">
                    <img
                      :src="overview.makeLogoImgUrl"
                      class="my-auto"
                      style="max-width: 65px; max-height: 65px"
                      alt="car make logo"
                    />
                  </div>
                </div>

                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%">{{
                      overview.createdAt
                    }}</span>
                    <p
                      class="card-text text-muted text-start"
                      style="line-height: 90%; font-size: 90%"
                    >
                      registration
                    </p>
                  </div>

                  <div class="text-end">
                    <span class="card-text text-end" style="font-size: 110%">{{
                      statistics.tripsCount
                    }}</span>
                    <p
                      class="card-text text-muted text-end"
                      style="line-height: 80%; font-size: 90%"
                    >
                      # trips
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="card-footer text-center d-flex justify-content-between my-auto"
              >
                <small
                  class="text-muted my-auto"
                  v-if="statistics.tripsCount > 0"
                  >Last trip 3 mins ago</small
                >
                <small class="text-muted my-auto" v-else
                  >No trips recorded yet</small
                >
                <div>
                  <DeleteVehicleModal
                    @vehicleRemovalConfirmed="vehicleRemovalConfirmed"
                  ></DeleteVehicleModal>
                  <EditVehicleModal
                    :initialVehicle="overview"
                  ></EditVehicleModal>
                </div>
              </div>
            </div>
          </div>
          <!-- end of col wrapping card-->
        </div>
        <!-- start of col containing data-->
        <div class="col-12 col-md-7 col-lg-7">
          <!-- the complementary of the other col-->
          <!-- here the tabs-->
          <ul
            class="nav nav-tabs nav-tabs-bordered d-flex"
            id="borderedTabJustified"
            role="tablist"
          >
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="home-tab"
                @click.prevent="setActive('overview')"
                :class="{ active: isActive('overview') }"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Overview
              </button>
            </li>
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="profile-tab"
                @click.prevent="setActive('statistics')"
                :class="{ active: isActive('statistics') }"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Statistics
              </button>
            </li>
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="contact-tab"
                @click.prevent="setActive('lastLocation')"
                :class="{ active: isActive('lastLocation') }"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Last location
              </button>
            </li>
          </ul>
          <div class="card" style="box-shadow: none">
            <div class="tab-content pt-2" id="borderedTabJustifiedContent">
              <VehicleOverviewTabPane
                :isActive="isActive('overview')"
                :overview="overview"
              ></VehicleOverviewTabPane>
              <VehicleStatisticsTabPane
                :isActive="isActive('statistics')"
                :statistics="statistics"
              ></VehicleStatisticsTabPane>
              <VehicleLocationTabPane
                :isActive="isActive('lastLocation')"
                :lastLocationLat="lastLocation.lat"
                :lastLocationLng="lastLocation.lng"
                :lastLocationTimestamp="lastLocation.timestamp"
              ></VehicleLocationTabPane>
            </div>
            <!-- End Bordered Tabs Justified -->
          </div>
        </div>
      </div>
      <!-- end of card Wrapping tabs-->
    </section>
  </main>
  <!-- End #main -->

  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import axios from "axios";
//layout------
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import Spinner from "../components/Spinner.vue";
//end layout--
import VehicleStatisticsTabPane from "../components/VehicleStatisticsTabPane.vue";
import VehicleOverviewTabPane from "../components/VehicleOverviewTabPane.vue";
import VehicleLocationTabPane from "../components/VehicleLocationTabPane.vue";
import DeleteVehicleModal from "../components/DeleteVehicleModal.vue";
import EditVehicleModal from "../components/EditVehicleModal.vue";
import makesLogosData from "../assets/data.json"; //vehicle-make's logos
const defaultAvatarPath = "/src/assets/img/carAvatar.png";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    Spinner,
    VehicleStatisticsTabPane,
    VehicleOverviewTabPane,
    VehicleLocationTabPane,
    DeleteVehicleModal,
    EditVehicleModal,
  },
  props: ["_id"], //uservehicleid (vin)
  data() {
    return {
      makeLogoImgUrlByMake: makesLogosData //reducing creates a data structure optimized for access (more efficient than makesLogosData)
        .reduce(function (result, item, index, array) {
          result[item.name] = item.image.source;
          return result;
        }, {}),
      isLoading: true,
      activeItem: "overview",
      //splitting in sub-objects so to ease passing...
      //could have used array here!
      overview: {
        vin: this._id,
        vehicleModelId: "",
        year: "",
        createdAt: "",
        timeSinceLastTrip: "",
        make: "",
        model: "",
        series: "",
        pictureUri: "",
        makeLogoImgUrl: "",

        //from fueleconomy:
        startStop: "",
        trany: "",
        drive: "",
        VClass: "",
        cylinders: "",

        //>fuel-related
        barrels08: "", //for fuel type 1,
        comb08: "",
        highway08: "",
        city08: "",
        fuelType: "",
        fuelCost08: "",
        youSaveSpend: "",

        //>emissions:
        co2TailpipeGpm: "", //for fuel type 1
        co2: "", //for fuel type 1
        //many others...
      },
      //it's better ('cause covered by spinner) to compute statistics here than
      //in computed properties of vehicleStatisticsTabPane (and passing only trips here)
      //I could also have used a second spinner only for statistics tab pane (narrower scope)
      statistics: {
        totalScore: {
          max: "",
          min: "",
          avg: "",
          sum: "",
        },
        rpmScore: { max: "", min: "", avg: "", sum: "" },
        speedScore: { max: "", min: "", avg: "", sum: "" },
        feedbackConsiderationScore: { max: "", min: "", avg: "", sum: "" },
        tripsCount: 0,
        tripDistance: {
          max: "",
          min: "",
          sum: "",
          avg: "",
        },
        tripDuration: {
          max: "",
          min: "",
          sum: "",
          avg: "",
        },
        estimatedTripCost: {
          //mileage => cost
          max: "",
          min: "",
          sum: "",
          avg: "",
        },
        //... for charts
      },
      lastLocation: {
        lat: "",
        lng: "",
        timestamp: "",
      },
    };
  },
  computed: {
    actualPictureUri() {
      return this.overview.pictureUri
        ? this.overview.pictureUri
        : defaultAvatarPath;
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    getTripCostFromAnnualCost(annualCost, tripKm) {
      const oneKmCost = annualCost / 25000;
      return oneKmCost * tripKm;
    },
    computeMinMaxAvgSum(array) {
      const average = (array) => array.reduce((a, b) => a + b) / array.length;
      const sum = (arr) => arr.reduce((a, b) => a + b, 0);
      return {
        avg: average(array),
        sum: sum(array),
        min: Math.min(array),
        max: Math.max(array),
      };
    },
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    vehicleRemovalConfirmed() {
      axios
        .delete(`vehicles/userVehicles/${this._id}`)
        .then((res) => {
          //display success or show notification
          this.$notification.show(
            "Success",
            {
              body: "Vehicle correctly deleted!",
            },
            {}
          );
          this.$router.push("/garage");
        })
        .catch((err) => {
          //display error or show notification
          this.$notification.show(
            "Error",
            {
              body: "Something went wrong during vehicle removal!",
            },
            {}
          );
          console.error(err);
        });
    },
  },
  mounted() {
    //manually joining userVehicles and vehicleModels here assigning to data properties

    //1. fetching user vehicle
    axios
      .get(`vehicles/userVehicles/${this._id}`)
      .then((userVehicleRes) => {
        console.log("data coming from userVehicles", userVehicleRes);
        const userVehicleData = userVehicleRes.data;

        this.overview = {};
        this.overview.pictureUri = userVehicleData.pictureUri;
        this.overview._id = userVehicleData._id;
        this.overview.createdAt = new Date(userVehicleData.createdAt)
          .toUTCString()
          .split(" ")
          .slice(0, 3)
          .join(" ");

        this.overview.retired = userVehicleData.retired;
        return userVehicleRes;
      })
      //2. fetching user-vehicle details
      .then((result) => {
        const userVehicle = result.data;
        return axios.get(
          `vehicles/vehiclesModels/vehicleDetails/${userVehicle.vehicleModelId}`
        );
      })
      .then((vehicleModelRes) => {
        const vehicleModel = vehicleModelRes.data;
        console.log("data coming from vehicleModels", vehicleModel);

        //fueleconomy-related
        this.overview.year = vehicleModel.year;
        this.overview.make = vehicleModel.make;
        this.overview.model = vehicleModel.model;
        this.overview.series = vehicleModel.id;
        this.overview.makeLogoImgUrl =
          this.makeLogoImgUrlByMake[vehicleModel.make];
        /*this.overview.year = vehicleModel.year;
        this.overview.make = vehicleModel.make;
        this.overview.model = vehicleModel.model;
        this.overview.series = vehicleModel.series;
        this.overview.makeLogoImgUrl =
          this.makeLogoImgUrlByMake[vehicleModel.make];*/

        this.overview.startStop = vehicleModel.startStop;
        this.overview.trany = vehicleModel.trany;
        this.overview.drive = vehicleModel.drive;
        this.overview.VClass = vehicleModel.VClass;
        this.overview.cylinders = vehicleModel.cylinders;

        //>fuel-related
        this.overview.barrels08 = vehicleModel.barrels08; //for fuel type 1
        this.overview.comb08 = vehicleModel.comb08;
        this.overview.highway08 = vehicleModel.highway08;
        this.overview.city08 = vehicleModel.city08;
        this.overview.fuelType = vehicleModel.fuelType;
        this.overview.fuelCost08 = vehicleModel.fuelCost08; //annual (based on 15,000 miles) fuel cost (for fuel type 1)
        this.overview.youSaveSpend = vehicleModel.youSaveSpend;
        //>emissions:
        this.overview.co2TailpipeGpm = vehicleModel.co2TailpipeGpm; //for fuel type 1
        this.overview.co2 = vehicleModel.co2; //for fuel type 1
      })
      .then(() => {
        //3. fetching user-vehicle trips data
        return axios.get(`trips?vehicleIdentificationNumber=${this._id}`);
      })
      .then((tripsRes) => {
        console.log("i trips for this vehicle", tripsRes.data);

        //taking ended trips only
        const vehicleTripsSortedByTimestamp = tripsRes.data.filter(
          (trip) => trip.endTimestamp
        );

        //1.a. computing statistics (could re-sort operations by computing before some ajax calls to improve reduce latency )
        this.statistics.tripsCount = vehicleTripsSortedByTimestamp.length;

        if (vehicleTripsSortedByTimestamp.length > 0) {
          const lastTrip =
            vehicleTripsSortedByTimestamp[
              vehicleTripsSortedByTimestamp.length - 1
            ];

          this.timeSinceLastTrip = this.timeSince(
            new Date(lastTrip.endTimestamp)
          );
          //1.b. computing remaining statistics (could improve efficiency by computing all the metrics in a single loop)
          //assuming all data is present (no holes)
          this.statistics.totalScore = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) => trip.totalScore)
          );
          this.statistics.speedScore = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) => trip.speedScore)
          );
          this.statistics.rpm = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) => trip.rpmScore)
          );
          this.statistics.speedScore = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map(
              (trip) => trip.feedbackConsiderationScore
            )
          );
          this.statistics.tripDistance = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) => trip.distanceTraveled)
          );
          this.statistics.tripDuration = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) => trip.duration)
          );
          const thisRef = this;
          this.statistics.estimatedTripCost = this.computeMinMaxAvgSum(
            vehicleTripsSortedByTimestamp.map((trip) =>
              thisRef.getTripCostFromAnnualCost(
                thisRef.overview.fuelCost08,
                trip.distanceTraveled
              )
            )
          );

          if (lastTrip.measurements.length > 0) {
            //2. take the last location of trips
            const lastMeasurement =
              lastTrip.measurements[lastTrip.measurements.length - 1];
            this.lastLocation.lat = lastMeasurement.position.latitude;
            this.lastLocation.lng = lastMeasurement.position.longitude;
            this.lastLocation.timestamp = lastMeasurement.timestamp;
          }
        }
      })
      .catch((err) => {
        console.error(err);
      }) //communicate something to user (with a mre user-friendly mapping?)
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped></style>
