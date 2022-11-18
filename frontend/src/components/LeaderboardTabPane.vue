<template>
  <div
    class="tab-pane fade"
    id="bordered-justified-contact"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <!--my row (leaderboard)-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
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

          <div class="card-body pb-0">
            <h5 class="card-title">Top Gainers <span>| Today</span></h5>

            <div class="row row-cols-1 row-cols-md-3 g-4">
              <!-- top-ranking user card-->
              <div class="col mb-2">
                <div
                  class="card nested-card text-center d-flex flex-column align-items-center"
                >
                  <img
                    class="card-img-top badge-image rounded-circle mt-4"
                    src="/src/assets/style/img/profile-img.jpg"
                    style="width: 60px"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0 pb-2">Daniele Giulianini</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Cesenatico</h6>
                    <div class="d-flex justify-content-between">
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >1</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          ranking
                        </p>
                      </div>
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >98</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >98</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last active 3 mins ago</small>
                  </div>
                </div>
              </div>
              <!-- end top ranking user card-->
              <!-- top-ranking user card-->
              <div class="col mb-2">
                <div
                  class="card nested-card text-center d-flex flex-column align-items-center"
                >
                  <img
                    class="card-img-top badge-image rounded-circle mt-4"
                    src="assets/img/profile-img.jpg"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
              <!-- end top ranking user card-->
              <!-- top-ranking user card-->
              <div class="col mb-4">
                <div
                  class="card nested-card text-center d-flex flex-column align-items-center"
                >
                  <img
                    class="card-img-top badge-image rounded-circle mt-4"
                    src="assets/img/profile-img.jpg"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
              <!-- end top ranking user card-->
            </div>
            <h5 class="card-title pt-1 pb-0">All users</h5>

            <AppCenteredSearchBarVue></AppCenteredSearchBarVue>

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col text-center">#</th>
                  <th scope="col text-center d-xs-table">User</th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    km
                  </th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    # Badges
                  </th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    XP
                  </th>
                  <th scope="col" class="text-center" style="min-width: 80px">
                    score<i
                      class="fa fa-solid fa-envira d-inline-block fa-xs"
                    ></i>
                    <!-- style used here for not letting the icon in its own line-->
                  </th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr>
                  <td class="text-muted text-center">1</td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/profile-img.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">98</td>
                </tr>
                <tr>
                  <td class="text-muted text-center d-flex align-items-center">
                    <div>1</div>
                  </td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/product-1.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">
                    <div
                      class="col-4 d-flex mx-auto my-auto justify-content-center text-center"
                    >
                      <div
                        id="container"
                        class="d-flex mx-auto my-auto justify-content-center text-center"
                        style="width: 50px; height: 50px"
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted text-center">1</td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/product-1.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">
                    <!-- Default Progress Bars-->
                    <div>100</div>
                    <div class="progress" style="height: 4px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 15%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                </tr>
                <!--<tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-2.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Exercitationem similique doloremque</a
                      >
                    </td>
                    <td>$46</td>
                    <td class="fw-bold">98</td>
                    <td>$4,508</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-3.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Doloribus nisi exercitationem</a
                      >
                    </td>
                    <td>$59</td>
                    <td class="fw-bold">74</td>
                    <td>$4,366</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-4.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Officiis quaerat sint rerum error</a
                      >
                    </td>
                    <td>$32</td>
                    <td class="fw-bold">63</td>
                    <td>$2,016</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-5.jpg" alt=""
                      /></a>
                    </th>
                    <td class="d-none">
                      <a href="#" class="text-primary fw-bold"
                        >Sit unde debitis delectus repellendus</a
                      >
                    </td>
                    <td class="d-none">$79</td>
                    <td class="fw-bold">41</td>
                    <td>$3,239</td>
                  </tr>-->
              </tbody>
            </table>
          </div>
          <div class="card-body pb-0">
            <h5 class="card-title">You <span>| Today</span></h5>

            <div class="row row-cols-1 row-cols-md-3 g-4">
              <!-- top-ranking user card-->
              <div class="col mb-2"></div>
              <!-- end top ranking user card-->
              <div class="col mb-2">
                <div
                  class="card nested-card text-center d-flex flex-column align-items-center"
                >
                  <img
                    class="card-img-top badge-image rounded-circle mt-4"
                    src="/src/assets/style/img/profile-img.jpg"
                    style="width: 60px"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0 pb-2">Daniele Giulianini</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Cesenatico</h6>
                    <div class="d-flex justify-content-between align-middle">
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >1</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          ranking
                        </p>
                      </div>
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >98</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>
                      <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >98</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last active 3 mins ago</small>
                  </div>
                </div>
              </div>
              <!-- top-ranking user card-->
              <div class="col mb-4 col-xl-3"></div>
              <!-- end top ranking user col-->
            </div>
            <h5 class="card-title pt-1 pb-0">All users <span>| Today</span></h5>
            <AppCenteredSearchBarVue></AppCenteredSearchBarVue>

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col text-center">#</th>
                  <th scope="col text-center d-xs-table">User</th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    km
                  </th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    # Badges
                  </th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    XP
                  </th>
                  <th scope="col" class="text-center">Ecoscore</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr>
                  <td class="text-muted text-center">
                    1<i class="bi bi-trophy" style="color: gold"></i>
                  </td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/profile-img.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">98</td>
                </tr>
                <tr>
                  <td class="text-muted text-center">
                    1<i class="bi bi-trophy" style="color: silver"></i>
                  </td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/profile-img.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">98</td>
                </tr>
                <tr style="background-color: gold; opacity: 0.4">
                  <td class="text-muted text-center">
                    1<i class="bi bi-trophy"></i>
                  </td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/profile-img.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">98</td>
                </tr>
                <tr style="border-color: gold; border-width: 1px 1px">
                  <td class="text-muted text-center">
                    1<i class="bi bi-trophy"></i>
                  </td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/profile-img.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">98</td>
                </tr>

                <tr>
                  <td class="text-muted text-center">1</td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/product-1.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">
                    <div
                      class="col-4 d-flex mx-auto my-auto justify-content-center text-center"
                    >
                      <div
                        id="container"
                        class="d-flex mx-auto my-auto justify-content-center text-center"
                        style="width: 50px; height: 50px"
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted text-center">1</td>
                  <th scope="row align-text-center">
                    <div class="d-flex">
                      <a href="#" class="d-flex"
                        ><img
                          src="/src/assets/style/img/product-1.jpg"
                          class="rounded-circle my-auto"
                          style="max-width: 50px"
                          alt=""
                      /></a>
                      <div class="ps-3 my-auto" style="font-size: 95%">
                        Daniele Giulianini
                        <div class="text-muted" style="font-size: 95%">
                          level 5
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="d-none d-sm-table-cell text-center">15</td>
                  <td class="d-none d-sm-table-cell text-center">52</td>
                  <td class="d-none d-sm-table-cell text-center">22</td>
                  <td class="fw-bold my-auto text-center">
                    <!-- Default Progress Bars-->
                    <div>100</div>
                    <div class="progress" style="height: 4px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 15%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                </tr>
                <!--<tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-2.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Exercitationem similique doloremque</a
                      >
                    </td>
                    <td>$46</td>
                    <td class="fw-bold">98</td>
                    <td>$4,508</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-3.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Doloribus nisi exercitationem</a
                      >
                    </td>
                    <td>$59</td>
                    <td class="fw-bold">74</td>
                    <td>$4,366</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-4.jpg" alt=""
                      /></a>
                    </th>
                    <td>
                      <a href="#" class="text-primary fw-bold"
                        >Officiis quaerat sint rerum error</a
                      >
                    </td>
                    <td>$32</td>
                    <td class="fw-bold">63</td>
                    <td>$2,016</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#"
                        ><img src="assets/img/product-5.jpg" alt=""
                      /></a>
                    </th>
                    <td class="d-none">
                      <a href="#" class="text-primary fw-bold"
                        >Sit unde debitis delectus repellendus</a
                      >
                    </td>
                    <td class="d-none">$79</td>
                    <td class="fw-bold">41</td>
                    <td>$3,239</td>
                  </tr>-->
              </tbody>
            </table>
          </div>
        </div>
        <!-- End leaderboard -->
      </div>
      <!--end leaderboard row-->
    </div>
  </div>
</template>

<script>
import ProgressBar from "progressbar.js";
import AppCenteredSearchBarVue from "./AppCenteredSearchBar.vue";

export default {
  components: { AppCenteredSearchBarVue },
  mounted() {
    var bar = new ProgressBar.SemiCircle("#container", {
      strokeWidth: 6,
      //easing: "easeInOut",
      duration: 1400,
      color: "#0d6efd", // "#FF0000",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: null,
    });

    bar.animate(1.0); // Number from 0.0 to 1.0
    bar.setText(100);
  },
};
</script>

<style scoped></style>
