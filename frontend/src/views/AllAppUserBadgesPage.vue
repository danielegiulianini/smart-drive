<template>
  <TheAppHeader></TheAppHeader>

  <main id="main" class="main">
    <div class="pagetitle">
      <h1>All SmartDrive badges</h1>
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
    <section class="section">
      <div class="row row-cols-2 row-cols-md-4 g-2">
        <div class="col" v-for="(badge, index) in badges">
          <UserBadge
            :key="badge.name"
            :name="badge.name"
            :description="badge.description"
            :pictureUri="badge.pictureUri"
          ></UserBadge>
        </div>
      </div>
    </section>
  </main>
  <TheAppSidebar></TheAppSidebar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import UserBadge from "../components/UserBadge.vue";

const userBadges = [
  //feedback consideration
  {
    name: "Gold improver",
    description:
      "Get a feedback consideration score of at least 95 for a trip.",
    pictureUri: "/src/assets/img/badges/goldFeedback.png",
  },
  {
    name: "Silver improver",
    description:
      "Get a feedback consideration score of at least 92 for a trip.",
    pictureUri: "/src/assets/img/badges/silverFeedback.png",
  },
  {
    name: "Bronze improver",
    description:
      "Get a feedback consideration score of at least 85 for a trip.",
    pictureUri: "/src/assets/img/badges/bronzeFeedback.png",
  },
  //rpm
  {
    name: "Gold throttle-goose",
    description: "Get an aggressiveness score of at least 95 for a trip.",
    pictureUri: "/src/assets/img/badges/goldSmoothness.png",
  },
  {
    name: "Silver throttle-goose",
    description: "Get an aggressiveness score of at least 92 for a trip.",
    pictureUri: "/src/assets/img/badges/silverSmoothness.png",
  },

  {
    name: "Bronze throttle-goose",
    description: "Get an aggressiveness score of at least 85 for a trip.",
    pictureUri: "/src/assets/img/badges/bronzeSmoothness.png",
  },
  //speed
  {
    name: "Gold speed Obsedient",
    description: "Get a safety score of at least 95 for a trip.",
    pictureUri: "/src/assets/img/badges/goldSpeed.png",
  },
  {
    name: "Silver speed Obsedient",
    description: "Get a safety score of at least 92 for a trip.",
    pictureUri: "/src/assets/img/badges/silverSpeed.png",
  },
  {
    name: "Bronze speed Obsedient",
    description: "Get a safety score of at least 85 for a trip.",
    pictureUri: "/src/assets/img/badges/bronzeSpeed.png",
  },
  //trips length
  {
    name: "Gold rester",
    description: "Get a resting score of at least 95 for a trip.",
    pictureUri: "/src/assets/img/badges/goldRester.png",
  },
  {
    name: "Silver rester",
    description: "Get a resting score of at least 92 for a trip.",
    pictureUri: "/src/assets/img/badges/silverRester.png",
  },
  {
    name: "Bronze rester",
    description: "Get a resting score of at least 85 for a trip.",
    pictureUri: "/src/assets/img/badges/bronzeRester.png",
  },

  //trips
  {
    name: "Gold traveller",
    description: "Perform 100 trips.",
    pictureUri: "/src/assets/img/badges/goldTrips.png",
  },
  {
    name: "Silver traveller",
    description: "Perform 5 trips.",
    pictureUri: "/src/assets/img/badges/silverTrips.png",
  },

  {
    name: "Bronze traveller",
    description: "Perform your first trip.",
    pictureUri: "/src/assets/img/badges/bronzeTrips.png",
  },
  //vehicle category
  {
    name: "Hybrid power",
    description: "Add a vehicle with hybrid fuel type.",
    pictureUri: "/src/assets/img/badges/hybridCar.png",
  },
  {
    name: "Electric power",
    description: "Add a vehicle with electric fuel type.",
    pictureUri: "/src/assets/img/badges/electricCar.png",
  },
];

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    UserBadge,
  },
  data() {
    //this cannot be a field because every instance of this component must have its own state
    return {
      badges: userBadges,
    };
  },
};
</script>

<style scoped></style>
