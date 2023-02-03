<template>
  <div>
    <div style="font-size: 200%; line-height: 90%" class="pt-4 text-center">
      {{ tweened }}
    </div>
    <div class="text-muted text-center" style="font-size: 105%">km</div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  props: {
    odometer: {
      required: true,
    },
  },
  data() {
    return {
      tweened: this.odometer/1000,
    };
  },
  mounted() {},
  watch: {
    odometer(newOdometer) {
      gsap.to(this, { duration: 0.5, tweened: Number(newOdometer/1000) || 0 });
    },
  },
};
</script>

<style scoped></style>
