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
      tweened: this.odometer,
    };
  },
  mounted() {},
  watch: {
    odometer(newOdometer, oldOdometer) {
      const a = this;

      var zero = { val: oldOdometer/1000 };

      gsap.to(zero, {
        duration: 0.5,
        val: newOdometer/1000,
        onUpdate: countNumber,
      });

      //removing decimals
      function countNumber() {
        var final = gsap.utils.snap(1, zero.val);
        a.tweened = final;
      }
    },
  },
};
</script>

<style scoped></style>
