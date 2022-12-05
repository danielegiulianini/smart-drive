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
          >
          </i>
        </h6>
        <div class="fw-bold text-center">
          {{ score }}
          <small style="font-size: 80%" class="text-muted">/100</small>
        </div>
      </div>
    </div>
    <AppHorizontalProgressBarVue
      :progressPercentage="score"
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

export default {
  props: {
    scoreTitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
    scoreToolTip: {
      type: String,
      required: true,
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
};
</script>

<style scoped></style>
