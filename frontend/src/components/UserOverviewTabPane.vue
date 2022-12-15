<template>
  <div
    class="tab-pane fade show p-4 pb-0"
    :class="{ active: isActive }"
    id="bordered-justified-home"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <!--Sunt est soluta temporibus accusantium neque nam maiores cumque
          temporibus. Tempora libero non est unde veniam est qui dolor. Ut
          sunt iure rerum quae quisquam autem eveniet perspiciatis odit.
          Fuga sequi sed ea saepe at unde.-->

    <div class="row">
      <div class="col-md-4 col-lg-4 B pb-4">
        <div class="card nested-card text-center h-100">
          <div class="card-body profile-card pt-4 text-center">
            <div class="filter">
              <a
                class="icon"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><i class="bi bi-pencil"></i
              ></a>
            </div>
            <!--<div class="d-flex flex-row-reverse bd-highlight">-->
            <!--<a class="btn btn-secondary rounded-pill btn-sm" id="edit-badge" style="color: #999999">Edit</a>-->
            <!--<a class="badge rounded-pill bg-light" id="edit-badge">Edit</a>-->
            <!--</div>-->

            <img
              src="/src/assets/style/img/profile-img.jpg"
              alt="Profile"
              class="rounded-circle mb-3 mt-3"
            />
            <div
              class="card-body d-flex align-items-center justify-content-center"
            >
              <div>
                <h2 class="card-title" style="font-size: 150%">
                  Kevin Anderson
                </h2>
                <h6>danigiulio7@gmail.com</h6>
                <span class="text-muted small pt-2 ps-1">
                  <i class="bi bi-geo-alt"></i> Cesenatico, Italia</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4">
        <div class="row h-50">
          <!--<div class="col-md-6 col-lg-6 B h-50 pb-3">
                    <div class="card card-inverse card-success h-100"></div>
                  </div>
                  <div class="col-md-6 col-lg-6 B h-50 pb-3">
                    <div class="card card-inverse bg-success h-100"></div>
                  </div>-->
          <div class="col-md-12 h-100 pb-4">
            <!--<div class="card card-inverse bg-danger h-100"></div>-->
            <div class="card d-flex nested-card h-100 mb-5">
              <div class="card-body profile-card pb-1">
                <h6 class="card-title mb-0">XP</h6>

                <div
                  class="text-center d-flex justify-content-center align-items-center"
                >
                  <!--<div class="card-title">XP</div>-->
                  <div>
                    <div class="filter">
                      <a
                        class="icon"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        ><i class="bi bi-question-circle"></i
                      ></a>
                    </div>
                    <!--<div class="d-flex flex-row-reverse bd-highlight">-->
                    <!--<a class="btn btn-secondary rounded-pill btn-sm" id="edit-badge" style="color: #999999">Edit</a>-->
                    <!--<a class="badge rounded-pill bg-light" id="edit-badge">Edit</a>-->
                    <!--</div>-->

                    <h4 style="font-size: 200%">500</h4>
                    <!---->
                    <span class="text-muted small pt-2 ps-1 mb-0"
                      ><span class="fw-bold"
                        ><i class="bi bi-arrow-up"></i> +10%</span
                      >
                      since last month</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row h-50">
          <div class="col-md-12 h-100 pb-4">
            <div class="card nested-card mb-2 my-auto h-100">
              <div class="card-body profile-card pb-1">
                <div class="mb-5 mb-sm-0">
                  <div class="filter">
                    <a
                      class="icon"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      ><i class="bi bi-question-circle"></i
                    ></a>
                  </div>
                  <h1 class="card-title mb-0">Level</h1>

                  <div class="d-flex justify-content-around">
                    <div>
                      <img
                        src="/src/assets/style/img/badges/threeWheeler.png"
                        alt="Profile"
                        style="width: 69px; height: 69px"
                      />
                    </div>
                    <div class="mb-0 pb-0 text-center">
                      <div class="d-flex my-auto align-middle">
                        <div style="font-size: 200%">15</div>
                        <small
                          class="text-muted align-middle mt-3 ps-1"
                          style="font-size: 80%"
                          >| threeweheeler</small
                        >
                      </div>
                      <div class="text-center">
                        <span class="text-muted small ps-1"
                          >80/150 to level 10</span
                        >
                        <div
                          class="progress mx-5"
                          style="height: 3px; width: 50px"
                        >
                          <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                            role="progressbar"
                            aria-valuenow="85"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 85%"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="d-flex flex-row-reverse bd-highlight">-->
                  <!--<a class="btn btn-secondary rounded-pill btn-sm" id="edit-badge" style="color: #999999">Edit</a>-->
                  <!--<a class="badge rounded-pill bg-light" id="edit-badge">Edit</a>-->
                  <!--</div>-->

                  <!--
                  <h4 class="d-inline-block">5</h4>
                  <small class="text-muted"> | starter</small>
                  <h6>Level</h6>-->
                </div>
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 pb-4">
        <div class="card nested-card my-auto h-100">
          <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"
              ><i class="bi bi-three-dots"></i
            ></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li class="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a class="dropdown-item" href="#">Today</a></li>
              <li><a class="dropdown-item" href="#">This Month</a></li>
              <li><a class="dropdown-item" href="#">This Year</a></li>
            </ul>
          </div>

          <div class="card-body">
            <h5 class="card-title">Recent Activity <span>| Today</span></h5>

            <div class="activity">
              <div class="activity-item d-flex">
                <div class="activite-label">32 min</div>
                <i
                  class="bi bi-circle-fill activity-badge text-success align-self-start"
                ></i>
                <div class="activity-content">
                  Quia quae rerum
                  <a href="#" class="fw-bold text-dark">explicabo officiis</a>
                  beatae
                </div>
              </div>
              <!-- End activity item-->

              <div class="activity-item d-flex">
                <div class="activite-label">56 min</div>
                <i
                  class="bi bi-circle-fill activity-badge text-danger align-self-start"
                ></i>
                <div class="activity-content">
                  Voluptatem blanditiis blanditiis eveniet
                </div>
              </div>
              <!-- End activity item-->

              <div class="activity-item d-flex">
                <div class="activite-label">2 hrs</div>
                <i
                  class="bi bi-circle-fill activity-badge text-primary align-self-start"
                ></i>
                <div class="activity-content">
                  Voluptates corrupti molestias voluptatem
                </div>
              </div>
              <!-- End activity item-->

              <div class="activity-item d-flex">
                <div class="activite-label">1 day</div>
                <i
                  class="bi bi-circle-fill activity-badge text-info align-self-start"
                ></i>
                <div class="activity-content">
                  Tempore autem saepe
                  <a href="#" class="fw-bold text-dark">occaecati voluptatem</a>
                </div>
              </div>
              <!-- End activity item-->
            </div>
          </div>
        </div>
      </div>
      <!-- start of real content -->
    </div>
  </div>
  <!-- End Bordered Tabs Justified -->
</template>

<script>
export default {
  /* components: {
  },*/
  props: {
    isActive: {
      type: Boolean, // Number from 0.0 to 1.0
      default: false,
    },
  },
  mounted() {},
};
</script>
