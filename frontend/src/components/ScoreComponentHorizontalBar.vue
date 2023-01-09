<template>
  <div>
    <div class="mt-2">
      <div class="d-flex justify-content-between">
        <h6 class="fw-bold">
          {{ scoreTitle
          }}<i
            class="bi bi-question-circle ps-2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-html="true"
            :title="scoreToolTip"
            ref="info"
          >
          </i>
        </h6>
        <div class="fw-bold text-center">
          {{ formattedValue }}
          <small style="font-size: 80%" class="text-muted">/100</small>
        </div>
      </div>
    </div>
    <AppHorizontalProgressBarVue
      :progressPercentage="progressPercentage"
    ></AppHorizontalProgressBarVue>
    <!--<div class="d-flex justify-content-center">
      <small style="font-size: 80%" class="d-flex ps-2 text-muted text-center">
        {{ progressWithRespectToLastMonth }}% wrt last month</small
      >
    </div>-->
  </div>
</template>

<script>
import AppHorizontalProgressBarVue from "../components/AppHorizontalProgressBar.vue";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  props: {
    scoreTitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    scoreToolTip: {
      type: String,
      required: true,
    },
    outOf: {
      default: 100,
    },
  },
  computed: {
    progressPercentage() {
      // Number from 0.0 to 1.0
      return this.score ? this.score / this.outOf : this.score; // Number from 0.0 to 1.0
    },
    formattedValue() {
      const decimalDigitsCount = 2;
      return this.score ? this.score.toFixed(decimalDigitsCount) : this.score;
    },
    /*progressWithRespectToLastMonth: {
      type: String,
      required: true,
    },
    progressWithRespectToLastWeek: {
      type: String,
      required: true,
    },*/
  },
  components: {
    AppHorizontalProgressBarVue,
  },
  mounted() {
    new Tooltip(this.$refs.info);
  },
};
</script>

<style scoped></style>
