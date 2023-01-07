<template>
  <!--<TheAppHeader></TheAppHeader>-->
  <TheAppSidebar></TheAppSidebar>
  <Spinner :show="isLoading"></Spinner>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>My Profile</h1>
      <!--<nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Fiat Panda 100</li>
        </ol>
      </nav>-->
    </div>
    <!-- End Page Title -->
    <!--FOR DEBUGGING ====-->
    current active breakpoint:
    <div class="d-block d-sm-none">xs</div>
    <div class="d-none d-sm-block d-md-none">sm</div>
    <div class="d-none d-md-block d-lg-none">md</div>
    <div class="d-none d-lg-block d-xl-none">lg</div>
    <div class="d-none d-xl-block">xl</div>
    <!--==================-->
    <!-- start of actual content:-->
    <section class="section dashboard">
      <ul
        class="nav nav-tabs nav-tabs-bordered d-flex"
        id="borderedTabJustified"
        role="tablist"
      >
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100"
            id="home-tab"
            @click.prevent="setActive('overview')"
            :class="{ active: isActive('overview') }"
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
            @click.prevent="setActive('badges')"
            :class="{ active: isActive('badges') }"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Badges
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button
            class="nav-link w-100"
            id="contact-tab"
            @click.prevent="setActive('leaderboard')"
            :class="{ active: isActive('leaderboard') }"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Leaderboard
          </button>
        </li>
      </ul>

      <!-- QUI INIZIA CARD WRAPPING TABS-->
      <!--      <div class="card pt-2" style="box-shadow: none">
                <div class="tab-content pt-2" id="bordered-justified-contactssss">-->
      <div class="card" style="box-shadow: none">
        <div class="tab-content pt-0" id="bordered-justified-contactssss">
          <UserOverviewTabPaneVue
            :isActive="isActive('overview')"
            :email="email"
            :firstName="firstName"
            :surname="surname"
            :city="city"
            :country="country"
            :actualPictureUri="actualPictureUri"
            :createdAt="createdAt"
            :xp="xp"
            :level="level"
          ></UserOverviewTabPaneVue>
          <BadgesTabPane
            :isActive="isActive('badges')"
            :myBadges="achievements"
          ></BadgesTabPane>
          <LeaderboardTabPane
            :isActive="isActive('leaderboard')"
            :actual-picture-uri="actualPictureUri"
            :score="{
              totalScore: totalScore,
              rpmScore: rpmScore,
              feedbackConsiderationScore: feedbackConsiderationScore,
              speedScore: speedScore,
            }"
            :level="level"
            :scores-trend="scoresTrend"
            :users="users"
            :firstName="firstName"
            :surname="surname"
            :country="country"
          ></LeaderboardTabPane>
        </div>
        <!--</div>-->
      </div>
      <!-- end of card Wrapping tabs-->
    </section>
  </main>
  <TheAppHeader></TheAppHeader>
  <TheAppFooter></TheAppFooter>
  <TheAppMobileNavbar></TheAppMobileNavbar>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import LeaderboardTabPane from "../components/LeaderboardTabPane.vue";
import UserOverviewTabPaneVue from "../components/UserOverviewTabPane.vue";
import BadgesTabPane from "../components/UserBadgesTabPane.vue";
import Spinner from "../components/Spinner.vue";
import axios from "axios";
const defaultAvatarUri = "/src/assets/img/driverAvatar.png";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    LeaderboardTabPane,
    UserOverviewTabPaneVue,
    BadgesTabPane,
    Spinner,
  },
  data() {
    return {
      //tabs-related---
      isLoading: true,
      activeItem: "overview",
      //---------------
      //overview:
      email: "",
      firstName: "",
      surname: "",
      city: "",
      country: "",
      profilePictureUri: "",
      createdAt: "",
      xp: "",
      level: "",
      scoresTrend: [],
      totalScore: "",
      rpmScore: "",
      speedScore: "",
      feedbackConsiderationScore: "",
      //badges:
      achievements: [],

      //leaderboard:
      users: [],
    };
  },
  computed: {
    levelPictureUri() {
      return this.level;
    },
    actualPictureUri() {
      return this.profilePictureUri ? this.profilePictureUri : defaultAvatarUri;
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    periodicallyRefreshLeaderboard() {
      const leaderboardRefreshPeriodInMilliseconds = 15000;
      //refreshing leaderboard (its actual real-time update (with socket.io) would ruin leaderboard vision
      //because of too high frequency)
      setInterval(() => {
        console.log("refreshing leaderboard...");
        return axios
          .get(`users`)
          .then((usersRes) => (this.users = usersRes.data));
      }, leaderboardRefreshPeriodInMilliseconds); //refreshing leaderboard every 5 seconds},
    },
  },
  created() {
    /*window.addEventListener("beforeunload", function (e) {
      window.alert("test");
      e.preventDefault();
      e.returnValue = "";
    });*/
    /*
    window.addEventListener("beforeunload", (e) => {
    e.preventDefault()
    // chrome requires returnValue to be set
    const message = "You have unsaved changes. Are you sure you wish to leave?"
    e.returnValue = message
    return message
})*/
  },
  mounted() {
    //manually joining here
    const loggedInUserId = this.$store.getters.getUser.id; //6; //this.$store.getters.getUser.id; //questa è corretta
    //1. fetching user vehicle
    axios
      .get(`users/${loggedInUserId}`)
      .then((userRes) => {
        console.log("data coming from users micro", userRes);

        const userDetail = userRes.data;
        this.totalScore = userDetail.ecoScore;
        this.speedScore = userDetail.speedScore;
        this.rpmScore = userDetail.rpmScore;
        this.feedbackConsiderationScore = userDetail.feedbackConsiderationScore;

        this.email = userDetail.email;
        this.firstName = userDetail.name;
        this.surname = userDetail.surname;
        this.city = userDetail.city;
        this.country = userDetail.country;
        this.profilePictureUri = userDetail.profilePictureUri;
        this.xp = userDetail.xp;
        this.level = userDetail.level;
        this.createdAt = userDetail.createdAt; // new Date(userDetail.createdAt)
        /* .toUTCString()
          .split(" ")
          .slice(0, 3)
          .join(" "); //pretty-printing date*/
        this.unlockedAchievements = userDetail.unlockedAchievements;
        this.scoresTrend = userDetail.scoresTrend;
        console.log("now this xp is", this.xp);
        return userRes;
      })
      //2. fetching users (for leaderboard)
      .then((result) => {
        console.log("data coming from users (for single user)", result);
        return axios.get(`users`);
      })
      .then((usersRes) => {
        const users = usersRes.data;
        console.log("data coming from users (for leaderboard)", usersRes);

        this.users = users;

        this.isLoading = false;
      })
      /*.then(() => {
          //3. fetching user-vehicle trips data
          return axios.get(`trips?vehicleIdentificationNumber=${this._id}`);
        })*/
      .catch((err) => console.error(err))
      .finally(() => {
        this.isLoading = false;
      });
    this.periodicallyRefreshLeaderboard();
  },
  watch: {
    $route(to, from) {
      /*window.alert("test");*/
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        // chrome requires returnValue to be set
        const message =
          "You have unsaved changes. Are you sure you wish to leave?";
        e.returnValue = message;
        return message;
      });
    },
  },
};
</script>
