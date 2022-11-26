<template>
  <div
    class="tab-pane fade p-1"
    id="badgesPane"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="container-fluid">
      <div class="card-body pb-0 mb-0 ps-1">
        <div class="card-title pb-0 mb-0 ms-2 mt-0">Achieved</div>
        <div class="row row-cols-2 row-cols-md-4 g-1">
          <div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>
        </div>
        <div class="card-title pb-0 mb-0 ms-2 mt-0">Achieving</div>
        <div class="row row-cols-2 row-cols-md-4 g-1">
          <div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>
        </div>
      </div>
    </div>
  </div>
  <!-- end of card rapping tabs-->
</template>

<style scoped></style>

<script>
import UserBadge from "./UserBadge.vue";

export default {
  components: { UserBadge },
  mounted() {},
};
</script>
