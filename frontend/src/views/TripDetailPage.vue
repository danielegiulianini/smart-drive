<template>
  <TheAppSidebar></TheAppSidebar>
  <Spinner :show="isLoading"></Spinner>

  <main id="main" class="main">
   
    <div class="pagetitle">
      <h1>Trip detail</h1>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="col-12">
        <div class="card">
          <!-- start of overview row -->
          <div class="row">
            <div class="col-12 col-lg-6">
              <!--<TripMap v-if="!startLocation.name"></TripMap>-->
              <!--    seems to be useless:             width="100%"
                height="100%"--><!--</iframe
              >-->
              <iframe
                v-if="startLocation.name"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                class="card-img-top"
                frameborder="0"
                style="border: 0; min-height: 300px; width: 100%; height: 100%"
                allowfullscreen
              ></iframe>
              <div
                v-else
                class="d-flex flex-column justify-content-center align-items-center"
                style="height: 300px"
              >
                <h1 style="font-size: 150%">No GPS data for this trip</h1>
                <p class="text-muted">
                  Drive with the app to see your locations.
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="card-body ps-lg-1">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <h1 class="card-title mb-0 pb-2" style="font-size: 180%">
                      {{ date }}
                    </h1>
                    <h6 class="card-subtitle mb-2 text-muted">
                      <span style="font-size: 140%"
                        >{{ vehicleMake }} {{ vehicleModel }}</span
                      >
                    </h6>
                  </div>
                  <div class="mt-3 text-center">
                    <AppSemiCircularProgressBar
                      :progress="globalScore"
                    ></AppSemiCircularProgressBar>
                    <div
                      class="text-muted"
                      style="
                        margin-top: -20px;
                        font-size: 90%;
                        line-height: 85%;
                      "
                    >
                      Total score
                    </div>
                  </div>
                </div>
                <div class="row">
                  <!--removable since using col-12 -->
                  <div class="col-12">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-geo-alt"></i>

                      <div
                        class="d-flex justify-content-between align-middle mt-1"
                      >
                        <div>
                          <span
                            v-if="startLocation.latitude"
                            class="card-text text-bf"
                            style="font-size: 110%"
                            >{{ startLocation.name }}</span
                          >
                          <p
                            class="card-text text-muted"
                            style="line-height: 80%; font-size: 90%"
                          >
                            {{ startTimestamp }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-geo-alt"></i>

                      <div
                        class="d-flex justify-content-between align-middle mt-1"
                      >
                        <div>
                          <span
                            v-if="startLocation.latitude"
                            class="card-text text-bf"
                            style="font-size: 110%"
                            >{{ endLocation.name }}</span
                          >
                          <p
                            class="card-text text-muted"
                            style="line-height: 80%; font-size: 90%"
                          >
                            {{ endTimestamp }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--some overview info: 
                  <div class="row mt-2">
              <div class="col-12">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >Diesel</span
                    >
                    <p
                      class="card-text text-muted text-end"
                      style="line-height: 90%; font-size: 90%"
                    >
                      fuel type
                    </p>
                  </div>

                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >Automatic</span
                    >
                    <p
                      class="card-text text-muted text-end"
                      style="line-height: 80%; font-size: 90%"
                    >
                      trany
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-middle mt-1">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >2022</span
                    >
                    <p
                      class="card-text text-muted"
                      style="line-height: 80%; font-size: 90%"
                    >
                      year
                    </p>
                  </div>

                  <div>
                    <div class="d-flex">
                      <span
                        class="card-text text-bf text-end ms-auto"
                        style="font-size: 120%"
                        >32</span
                      >
                    </div>
                    <p
                      class="card-text text-muted text-end"
                      style="line-height: 50%; font-size: 90%"
                    >
                      combined mpg<i class="bi bi-question-circle"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>-->
              </div>
            </div>
          </div>
          <!-- end of overview row -->

          <!-- <div class="card-footer text-center">
        <small class="text-muted">Last trip 3 mins ago</small>
      </div>-->
          <!-- start of tabs row-->
          <ul
            class="nav nav-tabs nav-tabs-bordered d-flex"
            id="borderedTabJustified"
            role="tablist"
          >
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="home-tab2"
                @click.prevent="setActive('scores')"
                :class="{ active: isActive('scores') }"
                type="button"
                role="tab"
                aria-controls="home2"
                aria-selected="true"
              >
                Scores
              </button>
            </li>
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="profile-tab2"
                @click.prevent="setActive('statistics')"
                :class="{ active: isActive('statistics') }"
                type="button"
                role="tab"
                aria-controls="profile2"
                aria-selected="false"
              >
                Statistics
              </button>
            </li>
            <li class="nav-item flex-fill" role="presentation">
              <button
                class="nav-link w-100"
                id="contact-tab2"
                @click.prevent="setActive('events')"
                :class="{ active: isActive('events') }"
                type="button"
                role="tab"
                aria-controls="contact2"
                aria-selected="false"
              >
                Events
              </button>
            </li>
          </ul>
          <!-- end of tabs row-->

          <div class="card" style="box-shadow: none">
            <div class="tab-content pt-3" id="borderedTabJustifiedContent">
              <!-- first tab-pane-->
              <TripScoreTabPane
                :isActive="isActive('scores')"
                :totalScore="globalScore"
                :aggressivenessScore="aggressivenessScore"
                :safetyScore="safetyScore"
                :feedbackConsiderationScore="feedbackConsiderationScore"
              ></TripScoreTabPane>
              <TripStatisticsTabPane
                :isActive="isActive('statistics')"
                :distanceTraveled="distanceTraveled"
                :duration="duration"
                :fuelConsumption="fuelConsumption"
                :avgRpm="avgRpm"
                :avgKph="avgKph"
                :maxRpm="maxRpm"
                :maxKph="maxKph"
              ></TripStatisticsTabPane>
              <TripEventsTabPane
                :isActive="isActive('events')"
              ></TripEventsTabPane>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import axios from "axios";
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import TripScoreTabPane from "../components/TripScoreTabPane.vue";
import TripStatisticsTabPane from "../components/TripStatisticsTabPane.vue";
import TripEventsTabPane from "../components/TripEventsTabPane.vue";
import Spinner from "../components/Spinner.vue";
import AppSemiCircularProgressBar from "../components/AppSemiCircularProgressBar.vue";
import TripMap from "../components/TripMap.vue";

export default {
  components: {
    TripScoreTabPane,
    TripStatisticsTabPane,
    TripEventsTabPane,
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    Spinner,
    AppSemiCircularProgressBar,
    TripMap,
  },
  props: ["_id"], //uservehicleid (vin)
  data() {
    return {
      //tabs-related
      isLoading: true,
      activeItem: "scores",
      //overview
      startTimestamp: "",
      endTimestamp: "",
      date: "",
      startLocation: {
        name: "",
        latitude: "",
        longitude: "",
      },
      endLocation: {
        name: "",
        latitude: "",
        longitude: "",
      },
      vehicleMake: "",
      vehicleModel: "",
      positions: [],
      //scores
      globalScore: 0,
      aggressivenessScore: 0,
      safetyScore: 0,
      feedbackConsiderationScore: 0,
      idlingScore: 0,
      //statistics
      distanceTraveled: "",
      duration: "",
      fuelConsumption: "",
      avgRpm: "",
      avgKph: "",
      maxRpm: "",
      maxKph: "",
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
  mounted() {
    console.log("getting trip info...");
    //manually joining backend info and assigning to data properties
    axios
      .get(`trips/${this._id}`)
      .then((tripRes) => {
        console.log("data coming from trips", tripRes.data);
        const tripData = tripRes.data;

        //could directly assign  tripRes.data to sub-object
        let startDate = new Date(tripData.startTimestamp);
        this.startTimestamp = startDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        this.endTimestamp = new Date(tripData.endTimestamp).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        );

        var month = startDate.toLocaleString("default", { month: "short" });
        var day = startDate.getUTCDate();
        var year = startDate.getUTCFullYear();
        this.date =
          day +
          " " +
          month +
          " " +
          year; //new Date(tripData.startTimestamp).toLocaleString().split(",")[0];

        //mapping measurements to google maps format: here, in express or directly in arduino?
        this.positions = tripData.measurements.map(
          (measurement) => measurement.position
        );

        //CAUTION: Array.at does not return error  but undefined if passed index is null
        this.startLocation.latitude = this.positions.at(0)?.lat; 
        this.startLocation.longitude = this.positions.at(0)?.lng; 
        this.endLocation.latitude = this.positions.at(
          this.positions.length - 1
        )?.lat; 
        this.endLocation.longitude = this.positions.at(
          this.positions.length - 1
        )?.lng; 
        
        //statistics
        this.distanceTraveled = tripData.distanceTraveled;
        this.duration = tripData.duration.toFixed(2);
        //this.fuelConsumption = tripData.fuelConsumption;
        this.avgRpm = tripData.avgRpm;
        this.avgKph = tripData.avgKph;
        this.maxRpm = tripData.maxRpm;
        this.maxKph = tripData.maxKph;

        //scores
        this.globalScore = tripData.totalScore;
        this.aggressivenessScore = tripData.rpmScore;
        this.safetyScore = tripData.speedScore ? tripData.speedScore : 0;
        this.feedbackConsiderationScore = tripData.feedbackConsiderationScore;

        return tripData.vehicleIdentificationNumber;
      })
      //2. fetching vehicleModelId from userVehicles
      .then((vehicleIdentificationNumber) => {
        this.vehicleIdentificationNumber = vehicleIdentificationNumber;

        if (vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)

          return axios.get(
            `vehicles/userVehicles/${vehicleIdentificationNumber}`
          );
        }
      })
      .then((userVehicleRes) => {
        if (this.vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)

          console.log("data coming from userVehicles", userVehicleRes);
          const userVehicleData = userVehicleRes.data;

          return userVehicleData.vehicleModelId;
        }
      })
      //3. fetching vehicle make and name from vehicle Models (and cost, possibly)
      .then((vehicleModelId) => {
        if (this.vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)

          return axios.get(
            `vehicles/vehiclesModels/vehicleDetails/${vehicleModelId}`
          );
        }
      })
      .then((vehicleRes) => {
        if (this.vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)
          console.log("data coming from vehiclesModels", vehicleRes.data);
          const vehicleData = vehicleRes.data;

          this.vehicleMake = vehicleData.make;
          this.vehicleModel = vehicleData.model;

          return vehicleRes;
        }
      })
      //4. fetching latitude with google maps API
      .then(() => {
        if (this.vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)
          return axios.get(`trips?vehicleIdentificationNumber=${this._id}`);
        }
      })
      .then((googleMapsRes) => {
        if (this.vehicleIdentificationNumber) {
          //redundant if used for testing (when a trip could not have its vin)

          console.log("data coming from google maps", googleMapsRes.data);
          const tripData = googleMapsRes.data;

          this.startLocation.name = "";
          this.endLocation.name = "";

          return googleMapsRes;
        }
      })
      .catch((err) => {
        console.error(err);
        //maybe communicate something to user (with a mre user-friendly mapping?)
      })
      .finally(() => {
        console.log("trips' startLocation is", this.startLocation);
        this.isLoading = false;
      });
  },
};
</script>
