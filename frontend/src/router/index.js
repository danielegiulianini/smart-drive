import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import TheAppProfilePage from "../views/TheAppProfilePage.vue";
import TripsOverviewPage from "../views/TripsOverviewPage.vue";
import TripDetailPage from "../views/TripDetailPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import GaragePage from "../views/GaragePage.vue";
import VehicleDetailPage from "../views/VehicleDetailPage.vue";
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
  { path: "/dashboard", component: DashboardPage },
  { path: "/garage", component: GaragePage }, //or vehicles...
  { path: "/vehicle/:id", component: VehicleDetailPage }, //or vehicles...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
