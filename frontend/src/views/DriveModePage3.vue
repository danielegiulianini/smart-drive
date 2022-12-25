<template>
  <TheAppHeader></TheAppHeader>

  <main
    id="outer-container"
    style="height: 100vh; overflow-y: hidden; overflow-x: hidden"
  >
    <div class="mt-5 pt-5 pb-0 mb-0">
      <Speedometer></Speedometer>
    </div>

    <div class="row p-3 pt-0 mt-0 pb-1" data-v-13fae52c="">
      <div class="col" data-v-13fae52c="">
        <RpmMeter></RpmMeter>
      </div>
      <div class="col d-flex justify-content-center" data-v-13fae52c="">
        <div class="d-flex" data-v-13fae52c="">
          <div class="my-auto" style="font-family: 'Open Sans'">
            <FuelTankLevelMeter></FuelTankLevelMeter>
            <Odometer></Odometer>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-element"></div>

    <!-- end of row-->
    <div class="button-row p-3 text-center">
      <AppDriveButton></AppDriveButton>
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
</style>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import Speedometer from "../components/Speedometer.vue";
import RpmMeter from "../components/RpmMeter.vue";
import FuelTankLevelMeter from "../components/FuelTankLevelMeter.vue";
import Odometer from "../components/Odometer.vue";
import AppDriveButton from "../components/AppDriveButton.vue";

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
      rpm: "",
      kph: "",
      odometer: "",
      fuelTankLevel: "",
    };
  },
  mounted() {
    //here it comes data from io
    this.$store.state.socket.on("measurement", function (data) {
      this.rpm = data.rpm;
      this.kph = data.kph;
      this.odometer = data.odometer;
      this.fuelTankLevel = data.fuelTankLevel;
    });
  },
};
</script>
