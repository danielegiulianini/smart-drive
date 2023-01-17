<template>
  <div
    class="tab-pane p-1 pb-4"
    :class="{ active: isActive }"
    id="badgesPane"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="container-fluid">
      <div class="card-body pb-0 mb-0 ps-1">
        <!-- could have used accordion too-->
        <div class="filter">
          <a
            class="icon"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            ><i class="bi bi-question-circle"></i
          ></a>
          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
            style=""
          >
            <li>
              <a class="dropdown-item" href="#" route>
                <router-link to="allBadges">See all</router-link>
              </a>
            </li>
            <!--<li><a class="dropdown-item" href="#">This Month</a></li>
              <li><a class="dropdown-item" href="#">This Year</a></li>-->
          </ul>
        </div>
        <div v-if="myBadges.length > 0">
          <div class="d-flex justify-content-between">
            <div class="card-title pb-0 mb-0 ms-2 mt-0">Achieved</div>
          </div>

          <div class="row row-cols-2 row-cols-md-4 g-1">
            <div class="col" v-for="(badge, index) in myBadges">
              <UserBadge
                :key="badge.id"
                :name="
                  badges.find((badgeDetail) => badgeDetail.id == badge.id)
                    .name
                "
                :description="
                  badges.find((badgeDetail) => badgeDetail.id == badge.id)
                    .description
                "
                :pictureUri="
                  badges.find((badgeDetail) => badgeDetail.id == badge.id)
                    .pictureUri
                "
                :earnedAt="badge.earnedAt"
              ></UserBadge>
            </div>
            <!--<div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>
          <div class="col"><UserBadge></UserBadge></div>-->
          </div>
          <div class="card-title pb-0 mb-0 ms-2 mt-0">Achieving</div>
        </div>
        <div
          v-else
          class="d-flex flex-column justify-content-center align-items-center"
          style="height: 300px"
        >
          <h1 style="font-size: 150%">Still no achievements</h1>
          <p class="text-muted">Use the app to gain badges.</p>
        </div>
      </div>
    </div>
  </div>
  <!-- end of card rapping tabs-->
</template>

<style scoped></style>

<script>
import UserBadge from "./UserBadge.vue";
//mapping from badge's id to: badge's name, picture and description!
//(this info could also have been store at server side)
import badges from "../mixins/badges.vue";

export default {
  components: { UserBadge },
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    myBadges: { required: true },
  },
  mixins: [badges],
  mounted() {},
  watch:{
    myBadges: {
      deep: true,
      handler(myBadges) {
        console.log("myBadges changed, now it is:", myBadges);
      }
    }
  }
};
</script>
