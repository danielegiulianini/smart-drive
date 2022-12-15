<template>
  <div
    class="tab-pane fade show active"
    id="bordered-justified-home"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="card p-2 m-2" style="box-shadow: none">
      <!-- QUI CI VA LA NUOVA ROW DEVE ESSERE ANCHE UNA CARD??-->
      <div class="card-body">
        <!--TITOLO BELLO MA NON SO COSA SCRIVERCI!
                            <h5 class="card-title">
                            Accordion without outline borders
                          </h5>-->

        <!-- Accordion without outline borders -->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <h1 style="font-size: 120%; font-family: Poppins, sans-serif">
                  Overview
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
                <!--In quelli grandi va su due colonne-->
                <!-- List group With Icons -->
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
                <div style="font-size: 120%" class="fw-bold">Emissions</div>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
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
              <!--</div>-->
              <!--end first col-->
              <!--<div class="col-md-6">
                                    <ul class="list-group">
                                      <li class="list-group-item">
                                        <i
                                          class="bi bi-star me-1 text-success"
                                        ></i>
                                        <span class="text-muted">year </span
                                        ><span class="fw-bold">2022</span>
                                      </li>
                                      <li class="list-group-item">
                                        <i
                                          class="bi bi-collection me-1 text-primary"
                                        ></i>
                                        model
                                      </li>
                                      <li class="list-group-item">
                                        <i
                                          class="bi bi-check-circle me-1 text-danger"
                                        ></i>
                                        make
                                      </li>
                                      <li class="list-group-item">
                                        <i
                                          class="bi bi-exclamation-octagon me-1 text-warning"
                                        ></i>
                                        ecoscore 8/10
                                      </li>
                                    </ul>
                                  </div>-->
              <!--end first col-->
            </div>
          </div>
        </div>
      </div>
      <!-- End Accordion without outline borders -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

import TheAppHeader from "./TheAppHeader.vue";
import TheAppSidebar from "./TheAppSidebar.vue";
import TheAppFooter from "./TheAppFooter.vue";

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
