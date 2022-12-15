<template>
  <div
    class="tab-pane fade"
    id="bordered-justified-profile"
    role="tabpanel"
    aria-labelledby="profile-tab"
  >
    <!-- START OF CARD WRAPPed by tab-pane-->
    <div class="card p-2 m-2" style="box-shadow: none">
      <div class="row row-cols-1 g-3">
        <div class="col">
          <div class="card nested-card">
            <div class="card-body">
              <h5 class="card-title">Line Chart</h5>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-middle"
                >
                  <div>
                    <span
                      class="card-text text-muted"
                      style="line-height: 50%; font-size: 90%"
                    >
                      year
                    </span>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >2020</span
                    >
                  </div>

                  <div>
                    <span class="card-text text-bf" style="font-size: 105%"
                      >Automatic</span
                    >
                    <span
                      class="card-text text-muted"
                      style="line-height: 50%; font-size: 90%"
                    >
                      trany
                    </span>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex justify-content-between align-middle">
                    <div>
                      <span
                        class="card-text text-muted"
                        style="line-height: 50%; font-size: 90%"
                      >
                        year
                      </span>
                      <span class="card-text text-bf" style="font-size: 110%"
                        >2020</span
                      >
                    </div>

                    <div>
                      <span class="card-text text-bf" style="font-size: 105%"
                        >Automatic</span
                      >
                      <span
                        class="card-text text-muted"
                        style="line-height: 50%; font-size: 90%"
                      >
                        trany
                      </span>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- End Line Chart -->
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card nested-card">
            <div class="card-body">
              <h5 class="card-title">Line Chart</h5>

              <!-- Line Chart -->
              <div
                id="lineChart"
                style="
                  min-height: 400px;
                  user-select: none;
                  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                "
                class="echart"
                _echarts_instance_="ec_1667726733869"
              >
                <div
                  style="
                    position: relative;
                    width: 450px;
                    height: 400px;
                    padding: 0px;
                    margin: 0px;
                    border-width: 0px;
                    cursor: default;
                  "
                >
                  <canvas
                    data-zr-dom-id="zr_0"
                    width="562"
                    height="500"
                    style="
                      position: absolute;
                      left: 0px;
                      top: 0px;
                      width: 450px;
                      height: 400px;
                      user-select: none;
                      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                      padding: 0px;
                      margin: 0px;
                      border-width: 0px;
                    "
                  ></canvas>
                </div>
              </div>

              <!-- End Line Chart -->
            </div>
          </div>
        </div>
        <!-- end of col with line chart-->
      </div>
      <!-- end of row of cards with chart-->
    </div>
    <!-- card wrapping row-->
  </div>
</template>

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

<style>
.btn-circle.btn-md {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
.page-header {
  padding: 20px;
  background-color: white; /* ghostwhite;*/
  border-radius: 10px;
}
</style>
