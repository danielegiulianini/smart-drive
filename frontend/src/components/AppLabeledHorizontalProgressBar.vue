<template>
  <div class="progress mx-5" style="height: 3px; width: 50px">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated bg-info"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      :aria-valuemax="max"
      :style="{ width: textualProgressPercentage }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["progress", "max"],
  computed: {
    progressPercentage() {
      return Math.round(this.progress / this.max * 100) ;
    },
    textualProgressPercentage() {
      return this.progressPercentage + "%";
    },
  },
};
</script>
