<template>
  <div class="card" style="box-shadow: none">
    <div class="tab-content pt-2" id="borderedTabJustifiedContent">
      <div
        class="tab-pane fade show active"
        id="bordered-justified-home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="card p-2 m-3" style="box-shadow: none">
          <!--Sunt est soluta temporibus accusantium neque nam maiores cumque
          temporibus. Tempora libero non est unde veniam est qui dolor. Ut
          sunt iure rerum quae quisquam autem eveniet perspiciatis odit.
          Fuga sequi sed ea saepe at unde.-->

          <div class="row">
            <div class="col-md-4 col-lg-4 B">
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
                    class="rounded-circle mb-5 mt-5"
                  />
                  <h4>Kevin Anderson</h4>
                  <h6>danigiulio7@gmail.com</h6>
                  <span class="text-muted small pt-2 ps-1"
                    >Cesenatico, Italia</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 G">
              <div class="row h-50">
                <!--<div class="col-md-6 col-lg-6 B h-50 pb-3">
                    <div class="card card-inverse card-success h-100"></div>
                  </div>
                  <div class="col-md-6 col-lg-6 B h-50 pb-3">
                    <div class="card card-inverse bg-success h-100"></div>
                  </div>-->
                <div class="col-md-12 h-100">
                  <!--<div class="card card-inverse bg-danger h-100"></div>-->
                  <div class="card d-flex text-center nested-card h-100 mb-5">
                    <div
                      class="card-body profile-card pt-4 text-center d-flex justify-content-center align-items-center"
                    >
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

                        <h4>500</h4>
                        <!---->
                        <h6>XP</h6>
                        <span class="text-muted small pt-2 ps-1 mt-5"
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
              <div class="row h-50">
                <div class="col-md-12 h-100">
                  <div class="card text-center nested-card mb-4 my-auto h-100">
                    <div
                      class="card-body profile-card pt-4 pb-1 text-center d-flex justify-content-center align-items-center"
                    >
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

                        <h4 class="d-inline-block">5</h4>
                        <small class="text-muted"> | starter</small>
                        <h6>Level</h6>
                        <div>
                          <span class="text-muted small pt-2 ps-1 mt-5"
                            >80/150 to level 10</span
                          >

                          <div class="progress mx-5 mb-4" style="height: 3px">
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
                      <!--</div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 G">
              <div class="card nested-card my-auto h-100">
                <div class="filter">
                  <a class="icon" href="#" data-bs-toggle="dropdown"
                    ><i class="bi bi-three-dots"></i
                  ></a>
                  <ul
                    class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                  >
                    <li class="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li><a class="dropdown-item" href="#">Today</a></li>
                    <li><a class="dropdown-item" href="#">This Month</a></li>
                    <li><a class="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>

                <div class="card-body">
                  <h5 class="card-title">
                    Recent Activity <span>| Today</span>
                  </h5>

                  <div class="activity">
                    <div class="activity-item d-flex">
                      <div class="activite-label">32 min</div>
                      <i
                        class="bi bi-circle-fill activity-badge text-success align-self-start"
                      ></i>
                      <div class="activity-content">
                        Quia quae rerum
                        <a href="#" class="fw-bold text-dark"
                          >explicabo officiis</a
                        >
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
                        <a href="#" class="fw-bold text-dark"
                          >occaecati voluptatem</a
                        >
                        tempore
                      </div>
                    </div>
                    <!-- End activity item-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- start of real content -->
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="bordered-justified-profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        Nesciunt totam et. Consequuntur magnam aliquid eos nulla dolor iure eos
        quia. Accusantium distinctio omnis et atque fugiat. Itaque doloremque
        aliquid sint quasi quia distinctio similique. Voluptate nihil recusandae
        mollitia dolores. Ut laboriosam voluptatum dicta.
      </div>
      <div
        class="tab-pane fade"
        id="bordered-justified-contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        Saepe animi et soluta ad odit soluta sunt. Nihil quos omnis animi
        debitis cumque. Accusantium quibusdam perspiciatis qui qui omnis magnam.
        Officiis accusamus impedit molestias nostrum veniam. Qui amet ipsum
        iure. Dignissimos fuga tempore dolor.
      </div>
    </div>
    <!-- End Bordered Tabs Justified -->
  </div>
  <!-- end of card rapping tabs-->
</template>

<script>
export default {
  /* components: {
  },*/
  mounted() {
    //==============FOR FIRST GRAPH=========================
    var budgetChart = echarts
      .init(document.querySelector("#budgetChart"))
      .setOption({
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {
              name: "Sales",
              max: 6500,
            },
            {
              name: "Administration",
              max: 16000,
            },
            {
              name: "Information Technology",
              max: 30000,
            },
            {
              name: "Customer Support",
              max: 38000,
            },
            {
              name: "Development",
              max: 52000,
            },
            {
              name: "Marketing",
              max: 25000,
            },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      });
  },
};
</script>
