<template>
  <div
    class="tab-pane fade show active"
    id="bordered-justified-home"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card mb-2">
            <!-- padding between cards-->
            <div class="card-body">
              <div class="card-title">22 Novembre 2022</div>

              <div class="map-responsive">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border: 0"
                  allowfullscreen
                ></iframe>
              </div>
              <!-- start of stepper -->
              <div class="stepper d-flex flex-column ml-2 mt-3">
                <div class="d-flex mb-1">
                  <div class="d-flex flex-column pe-4 align-items-center">
                    <!--<div
                              class="rounded-circle py-2 px-3 bg-primary text-white mb-1"
                            >
                              2
                            </div>-->
                    <i class="bi bi-1-circle"></i>

                    <div class="line h-100"></div>
                  </div>
                  <div class="d-flex">
                    <div class="text-dark mb-0 pe-2">Cesenatico</div>
                    <div class="text-muted pb-0 mb-0">18.54</div>
                  </div>
                </div>
                <div class="d-flex mb-1">
                  <div class="d-flex flex-column pe-4 align-items-center">
                    <!--<div
                              class="rounded-circle py-2 px-3 bg-primary text-white"
                            >
                              3
                            </div>-->
                    <i class="bi bi-1-circle"></i>

                    <div class="line h-100 d-none"></div>
                  </div>
                  <div class="d-flex">
                    <div class="text-dark mb-0 pe-2">Cesena</div>
                    <div></div>
                    <div class="text-muted mb-0">21.10</div>
                  </div>
                </div>
              </div>
              <!-- end of vertical stepper-->
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card mb-2">
            <!-- padding between cards-->
            <!-- stepper vertical-->
            <div class="card-body">
              <div class="card-title mb-1">22 Novembre 2022</div>
              <div class="stepper d-flex flex-column ml-2">
                <div class="d-flex mb-1">
                  <div class="d-flex flex-column pe-4 align-items-center">
                    <div
                      class="rounded-circle py-2 px-3 bg-primary text-white mb-1"
                    >
                      2
                    </div>
                    <div class="line h-100"></div>
                  </div>
                  <div>
                    <div class="text-dark mb-0">Cesenatico</div>
                    <div class="text-muted pb-0 mb-0">18.54</div>
                  </div>
                </div>
                <div class="d-flex mb-1">
                  <div class="d-flex flex-column pe-4 align-items-center">
                    <div class="rounded-circle py-2 px-3 bg-primary text-white">
                      3
                    </div>
                    <div class="line h-100 d-none"></div>
                  </div>
                  <div>
                    <div class="text-dark mb-0">Cesena</div>
                    <div class="text-muted mb-0">21.10</div>
                  </div>
                </div>
                <!-- end of vertical stepper-->
              </div>
            </div>
            <!-- end of card with vertical stepper-->
          </div>
        </div>
        <!-- end of col with card with stepper-->
        <div class="col-lg-6">
          <div class="card mb-2">
            <!-- padding between cards-->
            <!-- stepper vertical-->
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="card-title mb-1">22 Novembre 2022</div>
                  <div class="stepper d-flex flex-column ml-2">
                    <div class="d-flex mb-1">
                      <div class="d-flex flex-column pe-4 align-items-center">
                        <div
                          class="rounded-circle py-2 px-3 bg-primary text-white mb-1"
                        >
                          2
                        </div>
                        <div class="line h-100"></div>
                      </div>
                      <div>
                        <div class="text-dark mb-0">Cesenatico</div>
                        <div class="text-muted pb-0 mb-0">18.54</div>
                      </div>
                    </div>
                    <div class="d-flex mb-1">
                      <div class="d-flex flex-column pe-4 align-items-center">
                        <div
                          class="rounded-circle py-2 px-3 bg-primary text-white"
                        >
                          3
                        </div>
                        <div class="line h-100 d-none"></div>
                      </div>
                      <div>
                        <div class="text-dark mb-0">Cesena</div>
                        <div class="text-muted mb-0">21.10</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class=""></div>
                <div class="col-lg-6">
                  <div class="card h-100">
                    <img
                      src="/src/assets/style/img/logo.png"
                      class="card-img-top"
                      alt="..."
                      style="max-width: 50px; max-height: 50px"
                    />
                    <div class="card-header">Veicolo</div>
                    <div class="card-body">
                      <h5 class="card-title">Fiat Panda II</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of card with vertical stepper-->
          </div>
        </div>
        <!-- end of col with card with stepper and vehicle-->
        <div class="col-lg-6">
          <div class="card h-100 mb-2">
            <!-- padding between cards-->
            <div class="card-body">
              <div class="card-title">Score</div>
              <div class="justify-content-center">
                <div id="container" class="mx-auto"></div>
              </div>
              <div class="card-text text-center">GREAT!</div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card h-100 mb-2">
            <!-- padding between cards-->
            <div class="card-body">
              <h5 class="card-title">Score components</h5>
              <h6 class="fw-bold">
                Speed score<i
                  class="bi bi-question-circle ps-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-html="true"
                  title="ciao"
                >
                </i>
              </h6>

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
                <h6 class="fw-bold">rpm score</h6>
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
                <h6 class="fw-bold">feedback consideration score</h6>

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
          <div class="card h-100 mb-2">
            <div class="card-body">
              <div class="card-title">Trip data</div>
              <ul class="list-group">
                <li class="list-group-item py-1">
                  <i class="bi bi-star me-1 text-success"></i>
                  <span class="text-muted">durata </span
                  ><span class="fw-bold">2022</span>
                </li>
                <li class="list-group-item py-1">
                  <i class="bi bi-collection me-1 text-primary"></i>
                  distanza
                </li>
                <li class="list-group-item py-1">
                  <i class="bi bi-check-circle me-1 text-danger"></i>
                  velocità media
                </li>
                <li class="list-group-item py-1">
                  <i class="bi bi-check-circle me-1 text-danger"></i>
                  velocità max
                </li>
                <li class="list-group-item py-1">
                  <i class="bi bi-check-circle me-1 text-danger"></i>
                  rpm max
                </li>
                <li class="list-group-item align-items-center">
                  <i class="bi bi-exclamation-octagon me-1 text-warning"></i>
                  rpm medio
                  <i
                    class="progress"
                    style="display: inline-block; width: 50px"
                  >
                    <i
                      class="progress-bar"
                      role="progressbar"
                      style="width: 10%"
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></i>
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- end of trip data col-->

        <div class="col-sm-9">
          <div class="card h-100 mb-2">
            <div class="card-body">
              <div class="card-title">Trip data</div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="py-1 d-flex justify-content-between">
                    <div style="font-size: 100%">durata</div>
                    <!--<div class="fw-bold" style="font-size: 100%">
                              Benzina
                            </div>-->
                    <div class="text-muted">15'</div>
                  </div>
                  <hr class="mt-0 mb-0" />
                  <div class="py-1 d-flex justify-content-between">
                    <div class="fw-bold">distanza</div>
                    <div class="text-muted">20 km</div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="py-1 d-flex justify-content-between">
                    <div class="fw-bold">velocità media</div>
                    <div class="text-muted">54.00</div>
                  </div>
                  <hr class="mt-0 mb-0" />
                  <div class="py-1 d-flex justify-content-between">
                    <div class="fw-bold">rpm medio</div>
                    <div class="text-muted">2500</div>
                  </div>
                  <hr class="mt-0 mb-0" />
                  <div class="py-1 d-flex justify-content-between">
                    <div class="fw-bold">consumo stimato</div>
                    <div class="text-muted">2500</div>
                  </div>
                  <div class="py-1 d-flex justify-content-between">
                    <div class="fw-bold">costo stimato</div>
                    <div class="text-muted">2500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="card h-100 mb-2">
            <div class="card-body">
              <div class="card-title">Vehicle</div>
              <img
                src="/src/assets/style/img/logo.png"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-footer text-muted">Vai al veicolo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END OF FIRST TAB PANE-->
</template>

<script>
import ProgressBar from "progressbar.js";
import { resolveDirective } from "vue";

export default {
  mounted() {
    //==========FOR score PROGRESS BAR:=====================
    var container = document.getElementById("container");
    var bar = new ProgressBar.Circle(container, {
      color: "red",
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      text: {
        value: "ciao",
        className: "progressbar__label",

        autoStyleContainer: true,
        style: {
          display: "block",
          width: "100%",
          color: "red",
          fontFamily: "Poppins, sans-serif",
          fontSize: "50px",
        },
      },
      from: { color: "#aaa", width: 1 },
      to: { color: "#333", width: 4 },
      // Set default step function for all animate calls
      step: function (state, circle, attachment) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText("");
        } else {
          circle.setText(value);
        }
      },
    });
    /* bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = "2rem";*/

    bar.animate(1.0); // Number from 0.0 to 1.0

    //==============FOR FIRST GRAPH=========================

    //============= FOR TOOLTIP: ============================
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
};
</script>

<style scoped lang="scss">
.progressbar__label {
  color: red;
}
.progressbar-text {
  color: green;
}
#container {
  margin: 20px;
  /*width: 200px;
  height: 200px;*/
  max-width: 200px;
  max-height: 200px;
  position: relative;
}

/*===========for  vertical stepper================0*/
.c-timeline__item {
  position: relative;
  display: flex;
  gap: 1.5rem;
  //outline: solid 1px;

  &:last-child {
    .c-timeline__content {
      &:before {
        display: none;
      }
    }
  }
}

.c-timeline__content {
  flex: 1;
  position: relative;
  order: 1;
  padding-left: 1.5rem;
  padding-bottom: 3rem;

  &:before {
    content: "";
    position: absolute;
    right: 100%;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: lightgrey;
  }

  &:after {
    content: "";
    position: absolute;
    left: calc(0px - 11px);
    top: 0;
    width: 20px;
    height: 20px;
    background-color: #fff;
    z-index: 1;
    border: 2px solid lightgrey;
    border-radius: 50%;
  }
}

.c-timeline__title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.c-timeline__desc {
  color: grey;
}

time {
  text-align: end;
  flex: 0 0 100px;
  min-width: 0;
  overflow-wrap: break-word;
  padding-bottom: 1rem;
}

/*** Non-demo CSS ***/

.wrapper {
  max-width: 1000px;
  margin: 2rem auto 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 1rem;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
/*======end of vertical stepper==============0 */
</style>
