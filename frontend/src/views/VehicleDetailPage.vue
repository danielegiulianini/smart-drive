<template>
  <TheAppHeader></TheAppHeader>
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
    <!--FOR DEBUGGING ====-->
    current active breakpoint:
    <div class="d-block d-sm-none">xs</div>
    <div class="d-none d-sm-block d-md-none">sm</div>
    <div class="d-none d-md-block d-lg-none">md</div>
    <div class="d-none d-lg-block d-xl-none">lg</div>
    <div class="d-none d-xl-block">xl</div>
    <!--==================-->

    <div class="pagetitle">
      <h1>Vehicle Detail</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">My Trips</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <!--QUI INIZIA IL VERO CONTENUTO-->
    <section class="section dashboard">
      <ul
        class="nav nav-tabs nav-tabs-bordered d-flex"
        id="borderedTabJustified"
        role="tablist"
      >
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100 active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#bordered-justified-home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Overview
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#bordered-justified-profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Statistics
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#bordered-justified-contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Achievements
          </button>
        </li>
      </ul>
      <!-- QUI INIZIA CARD WRAPPING TABS-->
      <div class="card" style="box-shadow: none">
        <div class="card-title">CIAO</div>

        <div class="tab-content pt-2" id="borderedTabJustifiedContent">
          <!-- QUI INIZIA IL PRIMO TAB pane-->
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
              <img
                src="/src/assets/style/img/mercedes_1920.jpg"
                class="card-img-top"
                alt="..."
              />
              <div
                class="row d-flex"
                style="
                  background-image: url('/src/assets/style/img/mercedes_1920.jpg');
                  background-repeat: no-repeat;
                "
              >
                <div class="col-8 mx-auto">
                  <div class="col-lg-12 col-xl-4" style="border: 1px">
                    <div class="card text-center p-2 m-2">
                      <div class="card-body">
                        <div
                          class="d-flex justify-content-between align-middle"
                        >
                          <div>
                            <h1
                              class="card-title mb-0 pb-2"
                              style="font-size: 180%"
                            >
                              Fiat
                            </h1>
                            <h6 class="card-subtitle mb-2 text-muted">
                              <span style="font-size: 140%">Panda</span>
                              <span class="badge bg-secondary ms-2"
                                >Most used</span
                              >
                            </h6>
                          </div>
                          <div class="mt-3">
                            <img
                              src="https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg"
                              style="max-width: 65px; max-height: 65px"
                              alt="..."
                            />
                          </div>
                        </div>

                        <div
                          class="d-flex justify-content-between align-middle"
                        >
                          <div>
                            <span
                              class="card-text text-bf"
                              style="font-size: 110%"
                              >Diesel</span
                            >
                            <p
                              class="card-text text-muted text-end"
                              style="line-height: 90%; font-size: 90%"
                            >
                              fuel type
                            </p>
                          </div>

                          <div>
                            <span
                              class="card-text text-bf"
                              style="font-size: 110%"
                              >Automatic</span
                            >
                            <p
                              class="card-text text-muted text-end"
                              style="line-height: 80%; font-size: 90%"
                            >
                              trany
                            </p>
                          </div>
                        </div>
                        <div
                          class="d-flex justify-content-between align-middle mt-1"
                        >
                          <div>
                            <span
                              class="card-text text-bf"
                              style="font-size: 110%"
                              >2022</span
                            >
                            <p
                              class="card-text text-muted"
                              style="line-height: 80%; font-size: 90%"
                            >
                              year
                            </p>
                          </div>

                          <div>
                            <div class="d-flex">
                              <span
                                class="card-text text-bf text-end ms-auto"
                                style="font-size: 120%"
                                >32</span
                              >
                            </div>
                            <p
                              class="card-text text-muted text-end"
                              style="line-height: 50%; font-size: 90%"
                            >
                              combined mpg<i class="bi bi-question-circle"></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-8 border-primary">
                    <div
                      class="card text-center p-2 m-2"
                      style="box-shadow: none; border: 2px"
                    >
                      <!-- QUI CI VA LA NUOVA ROW DEVE ESSERE ANCHE UNA CARD??-->
                      <div class="row">
                        <div class="card-body">
                          <!--TITOLO BELLO MA NON SO COSA SCRIVERCI!
                            <h5 class="card-title">
                            Accordion without outline borders
                          </h5>-->

                          <!-- Accordion without outline borders -->
                          <div
                            class="accordion accordion-flush"
                            id="accordionFlushExample"
                          >
                            <div class="accordion-item">
                              <h2
                                class="accordion-header"
                                id="flush-headingOne"
                              >
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  <div style="font-size: 120%">Overview</div>
                                </button>
                              </h2>
                              <div
                                id="flush-collapseOne"
                                class="accordion-collapse collapse show"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="accordion-body text-le">
                                  <!--In quelli grandi va su due colonne-->
                                  <!-- List group With Icons -->
                                  <div
                                    class="py-1 d-flex justify-content-between"
                                  >
                                    <div class="fw-bold">Benzina</div>
                                    <div class="text-muted">ciao</div>
                                  </div>
                                  <hr class="mt-0 mb-0" />
                                  <div
                                    class="py-1 d-flex justify-content-between"
                                  >
                                    <div class="fw-bold">
                                      <i
                                        class="bi bi-exclamation-octagon me-1 text-warning"
                                      ></i
                                      ><span style="font-size: 100%"
                                        >Benzina</span
                                      >
                                    </div>
                                    <div class="text-muted">ciao</div>
                                  </div>
                                  <div class="py-1">
                                    <div class="fw-bold">Benzina</div>
                                    <div class="text-muted">ciao</div>
                                  </div>
                                  <hr class="mt-0 mb-0" />

                                  <div class="py-1">
                                    <div
                                      class="fw-bold"
                                      style="font-size: 120%"
                                    >
                                      Benzina
                                    </div>
                                    <div class="text-muted">ciao</div>
                                  </div>
                                  <div
                                    class="d-flex justify-content-between align-middle"
                                  >
                                    <div>
                                      <span
                                        class="card-text text-bf"
                                        style="font-size: 110%"
                                        >Diesel</span
                                      >
                                      <p
                                        class="card-text text-muted text-end"
                                        style="line-height: 90%; font-size: 90%"
                                      >
                                        fuel type
                                      </p>
                                    </div>

                                    <div>
                                      <span
                                        class="card-text text-bf"
                                        style="font-size: 110%"
                                        >Automatic</span
                                      >
                                      <p
                                        class="card-text text-muted text-end"
                                        style="line-height: 80%; font-size: 90%"
                                      >
                                        trany
                                      </p>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-lg-6">
                                      <div
                                        class="py-1 d-flex justify-content-between"
                                      >
                                        <div
                                          class="fw-bold"
                                          style="font-size: 100%"
                                        >
                                          Benzina
                                        </div>
                                        <div class="text-muted">ciao</div>
                                      </div>
                                      <hr class="mt-0 mb-0" />
                                      <div
                                        class="py-1 d-flex justify-content-between"
                                      >
                                        <div class="fw-bold">Benzina</div>
                                        <div class="text-muted">ciao</div>
                                      </div>
                                    </div>
                                    <div class="col-lg-6">
                                      <div
                                        class="py-1 d-flex justify-content-between"
                                      >
                                        <div class="fw-bold">Benzina</div>
                                        <div class="text-muted">ciao</div>
                                      </div>
                                      <hr class="mt-0 mb-0" />
                                      <div
                                        class="py-1 d-flex justify-content-between"
                                      >
                                        <div class="fw-bold">Benzina</div>
                                        <div class="text-muted">ciao</div>
                                      </div>
                                    </div>
                                  </div>
                                  <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                      <div
                                        class="d-flex justify-content-between align-middle"
                                      >
                                        <div>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >Diesel</span
                                          >
                                          <p
                                            class="card-text text-muted text-end"
                                            style="
                                              line-height: 90%;
                                              font-size: 90%;
                                            "
                                          >
                                            fuel type
                                          </p>
                                        </div>

                                        <div>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >Automatic</span
                                          >
                                          <p
                                            class="card-text text-muted text-end"
                                            style="
                                              line-height: 80%;
                                              font-size: 90%;
                                            "
                                          >
                                            trany
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item">
                                      <div
                                        class="d-flex justify-content-between align-middle"
                                      >
                                        <div>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >Diesel</span
                                          >
                                          <p
                                            class="card-text text-muted text-end"
                                            style="
                                              line-height: 90%;
                                              font-size: 90%;
                                            "
                                          >
                                            fuel type
                                          </p>
                                        </div>

                                        <div>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >Automatic</span
                                          >
                                          <p
                                            class="card-text text-muted text-end"
                                            style="
                                              line-height: 80%;
                                              font-size: 90%;
                                            "
                                          >
                                            trany
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item">
                                      <div
                                        class="d-flex justify-content-between align-middle"
                                      >
                                        <div>
                                          <span
                                            class="card-text text-muted"
                                            style="
                                              line-height: 50%;
                                              font-size: 90%;
                                            "
                                          >
                                            year
                                          </span>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >2020</span
                                          >
                                        </div>

                                        <div>
                                          <span
                                            class="card-text text-muted"
                                            style="
                                              line-height: 50%;
                                              font-size: 90%;
                                            "
                                          >
                                            trany
                                          </span>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 105%"
                                            >Automatic</span
                                          >
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item">
                                      <div
                                        class="d-flex justify-content-between align-middle"
                                      >
                                        <div>
                                          <span
                                            class="card-text text-muted"
                                            style="
                                              line-height: 50%;
                                              font-size: 90%;
                                            "
                                          >
                                            year
                                          </span>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 110%"
                                            >2020</span
                                          >
                                        </div>

                                        <div>
                                          <span
                                            class="card-text text-bf"
                                            style="font-size: 105%"
                                            >Automatic</span
                                          >
                                          <span
                                            class="card-text text-muted"
                                            style="
                                              line-height: 50%;
                                              font-size: 90%;
                                            "
                                          >
                                            trany
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                    <li class="list-group-item">
                                      A fourth item
                                    </li>
                                    <li class="list-group-item">
                                      A fourth item
                                    </li>
                                    <li
                                      class="list-group-item disabled"
                                      aria-disabled="true"
                                    >
                                      A disabled item
                                    </li>
                                  </ul>
                                  <!-- End List group With Icons -->
                                  <!-- Placeholder content for this accordion, which
                                  is intended to demonstrate the
                                  <code>.accordion-flush</code> class. This is
                                  the first item's accordion body.-->
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item">
                              <h2
                                class="accordion-header"
                                id="flush-headingTwo"
                              >
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseTwo"
                                >
                                  Emissions
                                </button>
                              </h2>
                              <div
                                id="flush-collapseTwo"
                                class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <!--<div class="row">
                                  <div class="col-md-6">-->
                                <ul class="list-group">
                                  <li class="list-group-item py-1">
                                    <i class="bi bi-star me-1 text-success"></i>
                                    <span class="text-muted">year </span
                                    ><span class="fw-bold">2022</span>
                                  </li>
                                  <li class="list-group-item py-1">
                                    <i
                                      class="bi bi-collection me-1 text-primary"
                                    ></i>
                                    model
                                  </li>
                                  <li class="list-group-item py-1">
                                    <i
                                      class="bi bi-check-circle me-1 text-danger"
                                    ></i>
                                    make
                                  </li>
                                  <li
                                    class="list-group-item align-items-center"
                                  >
                                    <i
                                      class="bi bi-exclamation-octagon me-1 text-warning"
                                    ></i>
                                    ecoscore
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END OF FIRST TAB PANE-->
          <div
            class="tab-pane fade"
            id="bordered-justified-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <!-- START OF CARD WRAPPed by tab-pane-->
            <div class="card p-2 m-3" style="box-shadow: none">
              <div class="row">
                <div class="col-lg-6">
                  <div class="card">
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
                <!-- end of first col-->
              </div>
              <!-- end of row-->
            </div>
            <!-- card wrapping row-->
          </div>
          <!-- end of first tab-pane-->

          <div
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
                      <h5 class="card-title">Radial Bar Chart</h5>

                      <!-- Radial Bar Chart -->
                      <div id="radialBarChart" style="max-height: 500px"></div>

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
          </div>
        </div>
        <!-- End Bordered Tabs Justified -->
      </div>
      <!-- end of card Wrapping tabs-->
    </section>
  </main>
  <!-- End #main -->

  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import VehicleCard from "../components/VehicleCard.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    VehicleCard,
  },
};
</script>
