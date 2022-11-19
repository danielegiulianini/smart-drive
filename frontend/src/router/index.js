import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import TheAppProfilePage from "../views/TheAppProfilePage.vue";
import TripsOverviewPage from "../views/TripsOverviewPage.vue";
import TripDetailPage from "../views/TripDetailPage.vue";
import TripDetailPage2 from "../views/TripDetailPage2.vue";

import DashboardPage from "../views/DashboardPage.vue";
import GaragePage from "../views/GaragePage.vue";
import VehicleDetailPage from "../views/VehicleDetailPage.vue";
import VehicleDetailPage2 from "../views/VehicleDetailPage2.vue";
import ScorePage from "../views/ScorePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    //props:true,
    component: TheAppProfilePage,
  },
  {
    path: "/trips",
    name: "Trips",
    //props:true,
    component: TripsOverviewPage,
  },
  { path: "/trips/:id", component: TripDetailPage },
  { path: "/trips2/:id", component: TripDetailPage2 },
  { path: "/dashboard", component: DashboardPage },
  { path: "/garage", component: GaragePage }, //or vehicles...
  { path: "/vehicle/:id", component: VehicleDetailPage }, //or vehicles...
  { path: "/vehicle2/:id", component: VehicleDetailPage2 }, //or vehicles...
  { path: "/scores/:id", component: ScorePage }, //or vehicles...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
