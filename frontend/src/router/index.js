import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import ProfilePage from "../views/ProfilePage.vue";
import TripDetailPage from "../views/TripDetailPage.vue";

import GaragePage from "../views/GaragePage.vue";
import VehicleDetailPage2 from "../views/VehicleDetailPage2.vue";
import ScorePage from "../views/ScorePage.vue";
import DriveModePage3 from "../views/DriveModePage3.vue";

import UserSignupFormPage from "../views/UserSignupFormPage.vue";
import UserLoginFormPage from "../views/UserLoginPage.vue";
import AllAppBadgesPage from "../views/AllAppUserBadgesPage.vue";
import TripsOverviewPage from "../views/TripsOverviewPage.vue";
import PageNotFound from "../views/PageNotFound.vue";
import NotificationsPage from "../views/NotificationsPage.vue";

const routes = [
  {
    path: "/profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    component: ProfilePage,
  },
  {
    path: "/garage",
    name: "Garage",
    meta: {
      requiresAuth: true,
    },
    component: GaragePage,
  },
  {
    path: "/vehicle/:_id",
    name: "VehicleDetail",

    meta: {
      requiresAuth: true,
    },
    component: VehicleDetailPage2,
    props: true,
  },
  {
    path: "/score",
    name: "Score",

    meta: {
      requiresAuth: true,
    },
    component: ScorePage,
  },

  //==============trips-related=========================
  {
    path: "/trips/:_id",
    props: true,

    name: "TripDetail",
    meta: {
      requiresAuth: true,
    },
    component: TripDetailPage,
  },
  {
    path: "/trips",
    name: "Trips",

    meta: {
      requiresAuth: true,
    },
    component: TripsOverviewPage,
  },
  //====================================================
  { path: "/signup", name: "signup", component: UserSignupFormPage },
  { path: "/login", name: "login", component: UserLoginFormPage },
  {
    path: "/allBadges",
    meta: {
      requiresAuth: true,
    },
    name: "allBadges",
    component: AllAppBadgesPage,
  },
  {
    path: "/drive",
    meta: {
      requiresAuth: true,
    },
    component: DriveModePage3,
  },
  {
    path: "/notifications",
    name: "Notifications",
    meta: {
      requiresAuth: true,
    },
    component: NotificationsPage,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//from: https://stackoverflow.com/questions/52653337/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("store.getters.getUser returns ", store.getters.getUser);

    console.log("store.getters.isLoggedIn returns ", store.getters.isLoggedIn);
    if (!store.getters.isLoggedIn || !store.getters.getSocket) {
      console.log("user not logged in");
      next({ name: "login" });  //could save destination in login page (for not restarting each time from profile)
    } else {
      console.log("user logged in");

      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
