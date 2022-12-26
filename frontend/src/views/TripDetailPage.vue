<template>
  <!-- con header sopra (map + info) + tab sotto (quando clicki in events ti evidenzia i pin)-->
  <div class="col-12">
    <div class="card">
      <div class="row">
        <div class="col-12 col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
            class="card-img-top"
            width="100%"
            height="100%"
            frameborder="0"
            style="border: 0; min-height: 300px"
            allowfullscreen
          ></iframe>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card-body">
            <div class="d-flex justify-content-between align-middle">
              <div>
                <h1 class="card-title mb-0 pb-2" style="font-size: 180%">
                  12 Nov 2022
                </h1>
                <h6 class="card-subtitle mb-2 text-muted">
                  <span style="font-size: 140%">Opel corsa 5a serie</span>
                </h6>
              </div>
              <div class="mt-3"></div>
            </div>
            <div class="row">
              <!--rimovibile visto che uso 12 -->
              <div class="col-12">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <!--<span class="card-text text-bf" style="font-size: 110%"
                      >Cesentico, FC, Italia</span
                    >-->
                    <!--<p
                      class="card-text text-muted text-start"
                      style="line-height: 90%; font-size: 90%"
                    >
                      from
                    </p>-->
                    <i class="bi bi-geo-alt"></i>

                    <div
                      class="d-flex justify-content-between align-middle mt-1"
                    >
                      <div>
                        <span class="card-text text-bf" style="font-size: 110%"
                          >Cesena, FC, Italia</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 80%; font-size: 90%"
                        >
                          12.56
                        </p>
                      </div>

                      <div></div>
                    </div>
                  </div>

                  <div></div>
                </div>
                <div class="d-flex align-items-center">
                  <i class="bi bi-geo-alt"></i>

                  <div class="d-flex justify-content-between align-middle mt-1">
                    <div>
                      <span class="card-text text-bf" style="font-size: 110%"
                        >Cesena, FC, Italia</span
                      >
                      <p
                        class="card-text text-muted"
                        style="line-height: 80%; font-size: 90%"
                      >
                        12.56
                      </p>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
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
                    <span class="card-text text-bf" style="font-size: 110%"
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
                <div class="d-flex justify-content-between align-middle mt-1">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
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
          <!-- here goes tabs-->
        </div>
      </div>
      <ul
        class="nav nav-tabs nav-tabs-bordered d-flex"
        id="borderedTabJustified"
        role="tablist"
      >
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100 active"
            id="home-tab"
            @click.prevent="setActive('scores')"
            :class="{ active: isActive('scores') }"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Scores
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100"
            id="profile-tab"
            @click.prevent="setActive('statistics')"
            :class="{ active: isActive('statistics') }"
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
            @click.prevent="setActive('events')"
            :class="{ active: isActive('events') }"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Events
          </button>
        </li>
      </ul>

      <div class="card" style="box-shadow: none">
        <!-- first tab-pane-->
        <TripScoreTabPane
          :isActive="isActive('scores')"
          :overview="overview"
        ></TripScoreTabPane>
        <TripStatisticsTabPane
          :isActive="isActive('statistics')"
          :overview="overview"
        ></TripStatisticsTabPane>
        <TripEventsTabPane
          :isActive="isActive('events')"
          :overview="overview"
        ></TripEventsTabPane>
      </div>
      <!-- <div class="card-footer text-center">
        <small class="text-muted">Last trip 3 mins ago</small>
      </div>-->
    </div>
  </div>
</template>

<script>
import TripScoreTabPane from "../components/TripScoreTabPane.vue";
import TripStatisticsTabPane from "../components/TripStatisticsTabPane.vue";
import TripEventsTabPane from "../components/TripEventsTabPane.vue";

export default {
  components: {
    TripScoreTabPane,
    TripStatisticsTabPane,
    TripEventsTabPane,
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
};
</script>
