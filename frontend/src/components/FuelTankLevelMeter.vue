<template>
  <div>
    <div style="font-size: 200%; line-height: 90%" class="pt-4">
      <!--<div class="progress" style="height: 3px">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 10%; background-color: red !important"
        ></div>
      </div>-->
      <AppHorizontalProgressBarVue
        height="3px"
        :progressPercentage="0.5"
      ></AppHorizontalProgressBarVue>
    </div>
    <div class="text-muted text-center pt-2" style="font-size: 105%">
      fuel tank level
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import AppHorizontalProgressBarVue from "./AppHorizontalProgressBar.vue";

export default {
  components: {
    AppHorizontalProgressBarVue,
  },
  props: {
    fuelTankLevel: {
      required: true,
    },
  },
  data() {
    //this cannot be a field because every instance of this component must have its own state
    return {
      tweened: this.fuelTankLevel,
    };
  },
  /*watch: {
    fuelTankLevel(newFuelTankLevel) {
      gsap.to(this, { duration: 0.5, tweened: Number(newFuelTankLevel) || 0 });
    },
  },*/
};
</script>

<style scoped></style>
