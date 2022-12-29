<template>
  <TheAppHeader></TheAppHeader>

  <main
    id="outer-container"
    style="height: 100vh; overflow-y: hidden; overflow-x: hidden"
  >
    <div class="vehicle-dashboard tooltip" :class="{ tooltipShow: started }">
      <div class="mt-5 pt-5 pb-0 mb-0">
        <Speedometer :kph="kph"></Speedometer>
      </div>

      <div class="row p-3 pt-0 mt-0 pb-1" data-v-13fae52c="">
        <div class="col" data-v-13fae52c="">
          <RpmMeter :rpm="rpm"></RpmMeter>
        </div>
        <div class="col d-flex justify-content-center" data-v-13fae52c="">
          <div class="d-flex" data-v-13fae52c="">
            <div class="my-auto" style="font-family: 'Open Sans'">
              <FuelTankLevelMeter
                :fuelTankLevel="fuelTankLevel"
              ></FuelTankLevelMeter>
              <Odometer :odometer="odometer"></Odometer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-element"></div>
    <!-- end of row-->
    <div class="button-row p-3 text-center">
      {{ started }}
      <AppDriveButton
        @click="ciao"
        :driveButtonName="driveButtonName"
      ></AppDriveButton>
      <!--<button
        id="driveButton"
        type="button"
        class="acceso"
        style="
          font-size: 120%;
          border-radius: 100%;
          width: 100px;
          height: 100px;
          border-width: 2px;
          z-index: 99 !important;
          border: solid;
        "
      >
        <div class="fw-bold" style="margin-bottom: -8px">Start</div>
        <small style="font-size: 70%">drive</small>
      </button>-->
    </div>
  </main>

  <TheAppMobileNavbar></TheAppMobileNavbar>
</template>

<style lang="css" scoped>
#outer-container {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
/*main {
  height: 85vh; /*[or 700 px] for 1. Containing the image but 2. Not force user to scroll*/
/*  background-image: url(/src/assets/img/road.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}*/

/*for thin screen bigger bottom margin*/
@media screen and (max-width: 300px) {
  .button-row {
    margin-bottom: 5%;
  }
}
@media only screen and (max-width: 600px) {
  body {
    background-color: red;
  }
}
/*for thin screen bigger bottom margin*/
@media screen and (min-width: 300px) {
  body {
    background-color: red !important;
  }
  .button-row {
    margin-bottom: 30%;
  }
}

/* for schowing dashboard only if trip started */
.tooltip {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  transition: transform 0.35s, opacity 0.25s;
}

.tooltipShow {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import Speedometer from "../components/Speedometer.vue";
import RpmMeter from "../components/RpmMeter.vue";
import FuelTankLevelMeter from "../components/FuelTankLevelMeter.vue";
import Odometer from "../components/Odometer.vue";
import AppDriveButton from "../components/AppDriveButton.vue";
import axios from "axios";

export default {
  components: {
    TheAppHeader,
    TheAppMobileNavbar,
    AppDriveButton,
    Speedometer,
    RpmMeter,
    Odometer,
    FuelTankLevelMeter,
  },
  data() {
    return {
      //mirroring backend's mongoose trips'measurement schema
      started: false,
      rpm: "0", //or to be replaced by "" and some logic for hiding charts if not measurement are still
      kph: "0",
      odometer: "0",
      fuelTankLevel: "0",
      _id: "", //future Trip's ID
    };
  },
  computed: {
    driveButtonName() {
      return started ? "End" : "Start";
    },
  },
  methods: {
    ciao() {
      console.log("ciao");
    },
    onDriveButtonClicked() {
      if (!started) {
        axios
          .post("trips")
          .then((newTripRes) => {
            this._id = newTripRes.data._id;
            started = true; //putting here for not allowing to close (from the view) a trip not actually posted to backend
          })
          .catch((err) => console.error(err)); //maybe a more user-friendly message here
      } else {
        //close axios call and redirect
        axios
          .post(`trips/${this._id}`)
          .catch((err) => console.error(err)) //maybe a more user-friendly message here
          .then(() =>
            this.$router.push({ name: "TripDetail", params: this._id })
          );
      }
    },
  },
  mounted() {
    //here it comes data from io
    console.log("this.store.state is ", this.store.state);
    this.$store.state.socket.on("measurement", function (data) {
      this.rpm = data.rpm;
      this.kph = data.kph;
      this.odometer = data.odometer;
      this.fuelTankLevel = data.fuelTankLevel;
    });
    this.$store.state.socket.on("drivingFeedback", function (data) {
      console.log("feedback arrived");
    });
  },
};
</script>
