<template>
  <!--<TheAppHeader></TheAppHeader>-->
  <TheAppSidebar></TheAppSidebar>
  <Spinner :show="isLoading"></Spinner>

  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Score page</h1>
    </div>
    <!-- End Page Title -->
    <!--FOR DEBUGGING ====-->
    <div class="d-flex">
      current active breakpoint:
      <div class="d-block d-sm-none">xs</div>
      <div class="d-none d-sm-block d-md-none">sm</div>
      <div class="d-none d-md-block d-lg-none">md</div>
      <div class="d-none d-lg-block d-xl-none">lg</div>
      <div class="d-none d-xl-block">xl</div>
    </div>
    <!--==================-->
    <!-- start of actual content:-->
    <section class="section dashboard">
      <div class="container-fluid">
        <div class="row g-2" v-if="isDefined(globalScore)">
          <!--or: v-if="xp>0"-->
          <div class="col-lg-6">
            <div class="card nested-card h-100 mb-2">
              <!-- padding between cards-->
              <div class="card-body">
                <div class="card-title">
                  Global Score
                  <i
                    class="bi bi-question-circle ps-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-html="true"
                    title="Your overall driving style score. It is the most general metrics 
                    assigned to you by the app and it summarizes all the following components, 
                    spanning from safety-related, eco-related indicators, as well as much others.
                    It is cumulatively gathered by you since you started using this app and states
                     your current level."
                    ref="info"
                  >
                  </i>
                </div>

                <div class="justify-content-center">
                  <AppCircularProgressBar
                    :progress="globalScore"
                  ></AppCircularProgressBar>
                </div>
              </div>
              <!-- end of crd body-->
              <!--opzione 4-->

              <!--<div class="card nested-card m-4 mt-0">
                <div class="card-body text-center">
                  <div class="card-title">Almost done!</div>
                  <div class="card-text">
                    Yout score is already good! try to improve
                  </div>
                </div>
              </div>-->
              <div class="m-4 mb-0 mt-0" v-html="scoreComment"></div>
              <!--<div class="card-footer">
                <div
                  class="text-center d-flex justify-content-around align-middle my-auto align-items-center"
                >
                  <div>
                    <div style="font-size: 100%; line-height: 90%">+10%</div>
                    <div class="text-muted">since last week</div>
                  </div>
                  <div>
                    <div style="font-size: 100%; line-height: 90%">+10%</div>
                    <div class="text-muted">since last month</div>
                  </div>
                </div>
              </div>-->
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card nested-card h-100 mb-2 d-flex">
              <!-- padding between cards-->
              <div class="card-body">
                <h5 class="card-title">Score components</h5>
                <!-- putting also textual score here:-->
                <ScoreComponentHorizontalBar
                  :score="aggressivenessScore"
                  scoreTitle="Aggressiveness score"
                  scoreToolTip="Aggressiveness score is computed taking into consideration Rounds Per Minute (RPM) 
                  engine readings coming from yours vehicle's control unit. By evaluating short term variance, this
                   measures penalizes abrupt engine's acceleration or de-celaration events while rewarding a 
                   driving style which is stable and conservative on the engine-load side. In this way, it act as an
                   eco-friendly indicator too. As well as the others, this metrics considers the data coming from all
                   the vehicles you registered to the app."
                ></ScoreComponentHorizontalBar>

                <ScoreComponentHorizontalBar
                  :score="safetyScore"
                  scoreTitle="Safety score"
                  scoreToolTip="Safety score is computed taking into consideration your vehicle's speed deviation from
                  speed limit set by authorities for the road you transited. To improve this measure you should start by 
                  being more careful to street signs. In this way, it act as an indicator of your 
                  predisposition to incur a road traffic offence too. As well as the others, this metrics considers the data coming from all
                   the vehicles you registered to the app."
                ></ScoreComponentHorizontalBar>

                <ScoreComponentHorizontalBar
                  :score="feedbackConsiderationScore"
                  scoreTitle="Feeback-consideration score"
                  scoreToolTip="Feeback-consideration score evaluates your attention to (and assimilation of) the tips and feedbacks
                  the app provides you at 360°. A low score marks a possible your weakness in listening, otherwise you are good 
                  improver. In this way, it act as an indicator of your skill in improving yourself. As well as the others, this
                   metrics considers the data coming from all the vehicles you registered to the app."
                ></ScoreComponentHorizontalBar>
                <!-- feedback cons score  -->
              </div>
            </div>
          </div>
          <!-- end of col with circluar progress bar -->

          <div class="col-lg-6">
            <div class="card nested-card mb-2">
              <div class="card-body">
                <h5 class="card-title pb-0 mb-0">Score trend</h5>
                <!-- score trend Chart -->

                <div id="scoresTrendChart" v-if="scoresTrend.length > 0"></div>
                <div
                  class="d-flex flex-column justify-content-center align-items-center text-center"
                  style="height: 300px"
                  v-else
                >
                  <h1 style="font-size: 110%">No scores trend</h1>
                  <p class="text-muted" style="font-size: 90%">
                    You seem to be an app beginner.
                  </p>
                </div>
                <!-- end of score trend Chart -->
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card nested-card mb-2">
              <div class="card-body">
                <h5 class="card-title pb-0 mb-0">Driving skills</h5>

                <!-- score composition Chart -->
                <div id="scoreComposition" class="echart text-center"></div>
                <!-- End score composition Chart -->
              </div>
            </div>
          </div>
          <!--good idea to use a carousel here to display some tips according to score:
          <div class="card nested-card">
          <div class="card-body">
            <div class="card-title">Tips</div>
            <div class="card-text"></div>
          </div>
        </div>-->
        </div>
        <div
          v-else
          class="d-flex flex-column justify-content-center align-items-center"
          style="height: 70vh"
        >
          <h1 style="font-size: 150%">Still no score</h1>
          <p class="text-muted">Drive with the app to see your score.</p>
        </div>
      </div>
    </section>
  </main>

  <TheAppFooter></TheAppFooter>
  <TheAppMobileNavbar></TheAppMobileNavbar>
</template>

<style scoped></style>

<script>
import axios from "axios";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";

import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import LeaderboardTabPane from "../components/LeaderboardTabPane.vue";
import UserOverviewTabPaneVue from "../components/UserOverviewTabPane.vue";
import AppSemiCircularProgressBarVue from "../components/AppSemiCircularProgressBar.vue";
import AppCircularProgressBar from "../components/AppCircularProgressBar.vue";
import ScoreComponentHorizontalBar from "../components/ScoreComponentHorizontalBar.vue";
import Spinner from "../components/Spinner.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    LeaderboardTabPane,
    UserOverviewTabPaneVue,
    AppSemiCircularProgressBarVue,
    AppCircularProgressBar,
    ScoreComponentHorizontalBar,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
      globalScore: 0,
      aggressivenessScore: 0,
      feedbackConsiderationScore: 0,

      safetyScore: 0,
      idlingScore: 0,
      scoresTrend: [
        /*
        { score: 98, referredTo: "2022-12-06T11:16:47.012Z" },
        { score: 84, referredTo: "2022-12-07T11:16:47.012Z" },
        { score: 99, referredTo: "2022-12-08T11:16:47.012Z" },
        { score: 98, referredTo: "2022-12-09T11:16:47.012Z" },
        { score: 84, referredTo: "2022-12-10T11:16:47.012Z" },
        { score: 99, referredTo: "2022-12-11T11:16:47.012Z" },*/
      ], //for testing here, in production replace this array with []
      /*
      progresses: {
        progressWithRespectToLastMonth: {
          globalScore: "",
          safetyScore: "",
          aggressivenessScore: "",
          restingScore: "",
          feedbackConsiderationScore: "",
        },
        progressWithRespectToLastWeek: {
          globalScore: "",
          safetyScore: "",
          aggressivenessScore: "",
          restingScore: "",
          feedbackConsiderationScore: "",
        },
      },*/
    };
  },
  computed: {
    scoreComment() {
      return this.globalScore >= 95
        ? `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Success Heading</h4>
                <p>"You are a perfect driver! Keep it up!"</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`
        : this.globalScore >= 70
        ? `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Almost done!</h4>
                <p>You are close to becoming a perfect driver! You only need to work on details!</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`
        : this.globalScore >= 40
        ? `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">A little more practice!</h4>
                <p>Don't worry and keep improving!</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`
        : `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Still far to goal!</h4>
                <p>Maybe you should attend some driving course!</p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`;
    },
  },
  methods: {
    initCharts() {
      console.log("initializing charts");
      new ApexCharts(document.querySelector("#scoresTrendChart"), {
        series: [
          {
            name: "Global score",
            data: this.scoresTrend.map(
              (scoreAndTimestamp) => scoreAndTimestamp.score
            ),
          },
        ],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        subtitle: {
          text: "Scores Trend",
          align: "left",
        },
        labels: this.scoresTrend.map(
          (scoreAndTimestamp) => scoreAndTimestamp.referredTo
        ),
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: "left",
        },
      }).render();

      // ====== radar chart apex =============
      new ApexCharts(document.querySelector("#scoreComposition"), {
        series: [
          {
            name: "Scores composition",
            data: [
              this.aggressivenessScore,
              this.feedbackConsiderationScore,
              this.safetyScore,

              this.idlingScore,
            ], //hardcoded here
          },
        ],
        chart: {
          height: 350,
          type: "radar",
        },
        xaxis: {
          categories: [
            "Aggressiveness",
            "FeedbackConsideration",
            "Safety",

            "Idling",
          ], //hardcoded-here
        },
      }).render();
    },
    isDefined(variable) {
      return !(typeof variable === "undefined" || variable === null);
    },
  },
  mounted() {
    const loggedInUserId = this.$store.getters.getUser.id; //if I 'm here the user is authenticated for sure thanks to router redirecting (see router/index.js) => no need of: this.$store.getters.getUser()?.id;
    axios
      .get(`users/${loggedInUserId}`)
      .then((res) => {
        console.log("data coming from users (for scorepage)", res.data);

        const user = res.data;
        //fields re-mapping here
        this.globalScore = user.ecoScore;
        this.aggressivenessScore = user.rpmScore;
        this.feedbackConsiderationScore = user.feedbackConsiderationScore;

        this.scoreTrend = user.scoresTrend;

        if (
          this.isDefined(this.globalScore) &&
          this.isDefined(this.aggressivenessScore) &&
          this.isDefined(this.safetyScore) &&
          this.isDefined(this.feedbackConsiderationScore) &&
          this.isDefined(this.idlingScore)
        ) {
          //init tooltip
          new Tooltip(this.$refs.info);
          this.initCharts();
        }
        this.isLoading = false;
      })
      .catch((err) => console.error(err)); //communicate something to user in a more user friendly way?
  },
};

/* for showing how to use:
// ====== area chart apex =============
    const series = {
      monthDataSeries1: {
        prices: [
          8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3,
          8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9,
          8496.25, 8600.65, 8881.1, 9340.85,
        ],
        dates: [
          "13 Nov 2017",
          "14 Nov 2017",
          "15 Nov 2017",
          "16 Nov 2017",
          "17 Nov 2017",
          "20 Nov 2017",
          "21 Nov 2017",
          "22 Nov 2017",
          "23 Nov 2017",
          "24 Nov 2017",
          "27 Nov 2017",
          "28 Nov 2017",
          "29 Nov 2017",
          "30 Nov 2017",
          "01 Dec 2017",
          "04 Dec 2017",
          "05 Dec 2017",
          "06 Dec 2017",
          "07 Dec 2017",
          "08 Dec 2017",
        ],
      },
    };
    new ApexCharts(document.querySelector("#areaChartApex"), {
      series: [
        {
          name: "STOCK ABC",
          data: series.monthDataSeries1.prices,
        },
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    }).render();

    // ====== radar chart apex =============
    new ApexCharts(document.querySelector("#radarChartApex"), {
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40],
        },
      ],
      chart: {
        height: 350,
        type: "radar",
      },
      xaxis: {
        categories: ["January", "February", "March", "April"],
      },
    }).render();
  }, */
</script>
