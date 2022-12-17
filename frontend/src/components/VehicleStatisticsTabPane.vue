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
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="max total score"
                      :value="statistics.totalScore.max"
                    ></VehicleDetailItem>

                    <VehicleDetailItem
                      :right="true"
                      label="avg total score"
                      :value="statistics.totalScore.avg"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="min total score"
                      :value="statistics.totalScore.min"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="max safety score"
                      :value="statistics.speedScore.max"
                    ></VehicleDetailItem>

                    <VehicleDetailItem
                      :right="true"
                      label="avg safety score"
                      :value="statistics.speedScore.avg"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="min safety score"
                      :value="statistics.speedScore.min"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="max aggressiveness score"
                      :value="statistics.rpmScore.max"
                    ></VehicleDetailItem>

                    <VehicleDetailItem
                      :right="true"
                      label="avg aggressiveness score"
                      :value="statistics.rpmScore.avg"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="min aggressiveness score"
                      :value="statistics.rpmScore.min"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="max feedback score"
                      :value="statistics.feedbackConsiderationScore.max"
                    ></VehicleDetailItem>

                    <VehicleDetailItem
                      :right="true"
                      label="avg feedback score"
                      :value="statistics.feedbackConsiderationScore.avg"
                    ></VehicleDetailItem>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-middle"
                  >
                    <VehicleDetailItem
                      label="min feedback score"
                      :value="statistics.feedbackConsiderationScore.min"
                    ></VehicleDetailItem>
                  </li>
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
                <li
                  class="list-group-item d-flex justify-content-between align-middle"
                >
                  <VehicleDetailItem
                    label="max total score"
                    :value="statistics.tripDistance.max"
                  ></VehicleDetailItem>

                  <VehicleDetailItem
                    :right="true"
                    label="avg total score"
                    :value="statistics.tripDistance.avg"
                  ></VehicleDetailItem>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-middle"
                >
                  <VehicleDetailItem
                    label="max total score"
                    :value="statistics.tripDistance.max"
                  ></VehicleDetailItem>

                  <VehicleDetailItem
                    :right="true"
                    label="avg total score"
                    :value="statistics.tripDistance.avg"
                  ></VehicleDetailItem>
                </li>
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
                <li
                  class="list-group-item d-flex justify-content-between align-middle"
                >
                  <VehicleDetailItem
                    label="max total score"
                    :value="statistics.estimatedTripCost.max"
                  ></VehicleDetailItem>

                  <VehicleDetailItem
                    :right="true"
                    label="avg total score"
                    :value="statistics.estimatedTripCost.avg"
                  ></VehicleDetailItem>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-middle"
                >
                  <VehicleDetailItem
                    label="max total score"
                    :value="statistics.estimatedTripCost.max"
                  ></VehicleDetailItem>
                </li>
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
import VehicleDetailItem from "./VehicleDetailItem.vue";

export default {
  inheritAttrs: false,
  components: { VehicleDetailItem },
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
