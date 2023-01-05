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

import badges from "../mixins/badges.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    UserBadge,
  },
  mixins: [badges],
};
</script>

<style scoped></style>
