<template>
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="bordered-justified-profile"
    role="tabpanel"
    aria-labelledby="profile-tab"
  >
    <!-- START OF CARD WRAPPed by tab-pane-->
    <div class="card p-2 m-2" style="box-shadow: none">
      <div class="card-body">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                <h1 style="font-size: 120%; font-family: Poppins, sans-serif">
                  Scores
                </h1>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <!-- could have used a v-for if using array instead of object for vehicle's properties-->
                <ul class="list-group list-group-flush">
                  <TripDetailItem
                    label="max total score"
                    :itemValue="statistics.totalScore.max"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="avg total score"
                    :itemValue="statistics.totalScore.avg"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="min total score"
                    :itemValue="statistics.totalScore.min"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="max safety score"
                    :itemValue="statistics.speedScore.max"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="avg safety score"
                    :itemValue="statistics.speedScore.avg"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="min safety score"
                    :itemValue="statistics.speedScore.min"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="max aggressiveness score"
                    :itemValue="statistics.rpmScore.max"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="avg aggressiveness score"
                    :itemValue="statistics.rpmScore.avg"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="min aggressiveness score"
                    :itemValue="statistics.rpmScore.min"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="max feedback score"
                    :itemValue="statistics.feedbackConsiderationScore.max"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="avg feedback score"
                    :itemValue="statistics.feedbackConsiderationScore.avg"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="min feedback score"
                    :itemValue="statistics.feedbackConsiderationScore.min"
                  ></TripDetailItem>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <div style="font-size: 120%" class="fw-bold">Trip Distance</div>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample2"
            >
              <ul class="list-group list-group-flush">
                <TripDetailItem
                  label="max trip distance (km)"
                  :itemValue="statistics.tripDistance.max"
                ></TripDetailItem>

                <TripDetailItem
                label="avg trip distance (km)"
                  :itemValue="statistics.tripDistance.avg"
                ></TripDetailItem>
                <TripDetailItem
                  label="max trip duration (')"
                  :itemValue="statistics.tripDistance.max"
                ></TripDetailItem>

                <TripDetailItem
                  label="avg trip duration (')"
                  :itemValue="statistics.tripDistance.avg"
                ></TripDetailItem>
              </ul>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                <div style="font-size: 120%" class="fw-bold">
                  Estimated trips costs
                </div>
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample3"
            >
              <ul class="list-group list-group-flush">
                <TripDetailItem
                  label="max total score"
                  :itemValue="statistics.estimatedTripCost.max"
                ></TripDetailItem>

                <TripDetailItem
                  label="avg total score"
                  :itemValue="statistics.estimatedTripCost.avg"
                ></TripDetailItem>
                <TripDetailItem
                  label="max total score"
                  :itemValue="statistics.estimatedTripCost.max"
                ></TripDetailItem>
              </ul>
              <!--end first col-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- card wrapping row-->
  </div>
</template>

<script>
import TripDetailItem from "./TripDetailItem.vue";

export default {
  inheritAttrs: false,
  components: { TripDetailItem },
  props: {
    isActive: {
      type: Boolean, // Number from 0.0 to 1.0
      required: true,
    },
    statistics: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
