<template>              <div
  class="tab-pane fade"
  id="bordered-justified-contact"
  role="tabpanel"
  aria-labelledby="contact-tab"
>
  <!--<div class="map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
    frameborder="0"
    allowfullscreen=""
  ></iframe>
</div>-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="map-responsive">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
              width="600"
              height="450"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <!-- stepper vertical-->
          <div class="card-body">
            <div class="stepper d-flex flex-column mt-4 ml-2">
              <div class="d-flex mb-1">
                <div
                  class="d-flex flex-column pe-4 align-items-center"
                >
                  <div
                    class="rounded-circle py-2 px-3 bg-primary text-white mb-1"
                  >
                    2
                  </div>
                  <div class="line h-100"></div>
                </div>
                <div>
                  <h5 class="text-dark mb-0">Cesenatico</h5>
                  <p class="lead text-muted pb-3 mb-0">18.54</p>
                </div>
              </div>
              <div class="d-flex mb-1">
                <div
                  class="d-flex flex-column pe-4 align-items-center"
                >
                  <div
                    class="rounded-circle py-2 px-3 bg-primary text-white"
                  >
                    3
                  </div>
                  <div class="line h-100 d-none"></div>
                </div>
                <div>
                  <h5 class="text-dark mb-0">Cesena</h5>
                  <p class="lead text-muted mb-0">21.10</p>
                </div>
              </div>
              <!-- end of vertical stepper-->
            </div>
          </div>
          <!-- end of card with vertical stepper-->
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Current Location</h5>
            <p class="card-text">
              <i class="bi bi-geo-alt"></i> Cesenatico
            </p>
            <!-- Radial Bar Chart -->
            <div
              id="radialBarChart"
              style="max-height: 500px"
            ></div>

            <!-- End Radial Bar Chart -->
          </div>
        </div>
      </div>
      <!-- end of col with Radial Bar Chart -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Score components</h5>
            <h7 class="fw-bold">Speed score</h7>

            <!-- Default Progress Bars-->
            <div class="progress" style="height: 8px">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 15%"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div class="mt-2">
              <h7 class="fw-bold">rpm score</h7>
              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 15%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="mt-2">
              <h7 class="fw-bold"
                >feedback consideration score</h7
              >

              <div class="progress" style="height: 8px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 15%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of col with circluar progress bar -->
      <div class="col-lg-6">
        <!--<div class="card">
        <div class="card-body">
          <h5 class="card-title">Score components</h5>
          <h7 class="fw-bold">Speed score</h7>

          <div class="progress" style="height: 8px">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 15%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div class="mt-2">
            <h7 class="fw-bold">rpm score</h7>
            <div class="progress" style="height: 8px">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 15%"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="mt-2">
            <h7 class="fw-bold">feedback consideration score</h7>

            <div class="progress" style="height: 8px">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 15%"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>-->
        <div class="bg-white rounded-lg p-5 shadow">
          <h2 class="h6 font-weight-bold text-center mb-4">
            Overall progress
          </h2>

          <!-- Progress bar 1 -->
          <div class="progress mx-auto" data-value="80">
            <span class="progress-left">
              <span class="progress-bar border-primary"></span>
            </span>
            <span class="progress-right">
              <span class="progress-bar border-primary"></span>
            </span>
            <div
              class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
            >
              <div class="h2 font-weight-bold">
                80<sup class="small">%</sup>
              </div>
            </div>
          </div>
          <!-- END -->

          <!-- Demo info -->
          <div class="row text-center mt-4">
            <div class="col-6 border-right">
              <div class="h4 font-weight-bold mb-0">28%</div>
              <span class="small text-gray">Last week</span>
            </div>
            <div class="col-6">
              <div class="h4 font-weight-bold mb-0">60%</div>
              <span class="small text-gray">Last month</span>
            </div>
          </div>
          <!-- END -->
        </div>
      </div>
    </div>
  </div>
</div></template>

<script>
import axios from "axios";

import TheAppHeader from "./TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
  },
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  data() {
    //this cannot be a field because every instance of this component must have its own state
    return {
      author: {
        name: "John Doe",
        books: [
          "Vue 2 - Advanced Guide",
          "Vue 3 - Basic Guide",
          "Vue 4 - The Mystery",
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>
