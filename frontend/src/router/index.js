import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import TheAppProfilePage from "../views/TheAppProfilePage.vue";
import TripsOverviewPage from "../views/TripsOverviewPage.vue";
import TripDetailPage from "../views/TripDetailPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/profile",
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
