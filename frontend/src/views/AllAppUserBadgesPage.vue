<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>All SmartDrive badges</h1>
    </div>
    <!-- End Page Title -->

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
  <TheAppMobileNavbar></TheAppMobileNavbar>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import UserBadge from "../components/UserBadge.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";

import badges from "../mixins/badges.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    UserBadge,
    TheAppMobileNavbar,
  },
  mixins: [badges],
};
</script>

<style scoped></style>
