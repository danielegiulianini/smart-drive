<template>
  <div
    class="tab-pane p-1 pb-0"
    :class="{ active: isActive }"
    id="bordered-justified-contact"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"
              ><i class="bi bi-three-dots"></i
            ></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li class="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="scoreSorting = 'totalScore'"
                  >Total score</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="scoreSorting = 'rpmScore'"
                  >Rpm score</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="scoreSorting = 'feedbackConsiderationScore'"
                  >Feedback Consideration score</a
                >
              </li>
            </ul>
          </div>

          <div class="card-body pb-0">
            <h5 class="card-title mb-0">
              You <span>| {{ scoreSorting }}</span>
            </h5>

            <div class="row row-cols-1 row-cols-md-3 g-4 mb-2">
              <div class="col d-none d-md-block"></div>
              <div class="col mb-2">
                <div
                  class="card nested-card text-center d-flex align-items-center"
                >
                  <img
                    class="card-img-top badge-image rounded-circle mt-4"
                    :src="actualPictureUri"
                    style="width: 60px"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0 pb-2">
                      {{ firstName }} {{ surname }}
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ country }}</h6>
                    <div class="d-flex justify-content-between align-middle">
                      <!--or: justify-content-around -->
                      <div class="me-4">
                        <span
                          class="card-text text-bf"
                          style="font-size: 300%"
                          >{{ myRank }}</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          ranking
                        </p>
                      </div>
                      <!--before; there were 3 of these (with on grandparent): <div>
                        <span class="card-text text-bf" style="font-size: 200%"
                          >98</span
                        >
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>-->
                      <div>
                        <span
                          class="card-text text-bf"
                          style="font-size: 300%"
                          >{{ score[scoreSorting] ? score[scoreSorting].toFixed(2) : "" }}</span
                        ><!-- to be added: .toFixed(2) -->
                        <p
                          class="card-text text-muted"
                          style="line-height: 50%; font-size: 85%"
                        >
                          score
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">{{ lastUserActivity }}</small>
                  </div>
                </div>
              </div>
            </div>
            <h5 class="card-title pt-1 pb-0">
              All users <span>| {{ scoreSorting }}</span>
            </h5>
            <!-- to delete... for lack of time... -->
            <AppCenteredSearchBarVue></AppCenteredSearchBarVue>

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col text-center">#</th>
                  <th scope="col text-center d-xs-table">User</th>
                  <!--<th class="d-none d-sm-table-cell text-center" scope="col">
                    km
                  </th> VERY INTERESTING THIS!-->
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    # Badges
                  </th>
                  <th class="d-none d-sm-table-cell text-center" scope="col">
                    XP
                  </th>
                  <th scope="col" class="text-center">score</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <LeaderboardUser
                  v-for="(user, index) in sortedUsersToDisplay"
                  :key="user._id"
                  :firstName="user.name"
                  :score="
                    scoreSorting == 'totalScore'
                      ? user.ecoScore
                      : scoreSorting == 'rpmScore'
                      ? user.rpmScore
                      : scoreSorting == 'speedScore'
                      ? user.speedScore
                      : user.feedbackConsiderationScore
                  "
                  :rank="rankOf(sortedUsersToDisplay, user._id)"
                  :surname="user.surname"
                  :profilePictureUri="user.profilePictureUri"
                  :xp="user.xp"
                  :level="user.level"
                  :badges="user.unlockedAchievements"
                ></LeaderboardUser>
              </tbody>
            </table>
          </div>
        </div>
        <!-- End leaderboard -->
      </div>
      <!--end leaderboard row-->
    </div>
  </div>
</template>

<script>
import AppCenteredSearchBarVue from "./AppCenteredSearchBar.vue";
import AppSemiCircularProgressBar from "./AppSemiCircularProgressBar.vue";
import LeaderboardUser from "./LeaderboardUser.vue";

export default {
  components: {
    LeaderboardUser,
    AppCenteredSearchBarVue,
    AppSemiCircularProgressBar,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    //me
    firstName: { required: true },
    surname: { required: true },
    country: { required: true },

    actualPictureUri: { required: true },
    level: { required: true },
    score: { required: true },
    scoresTrend: { required: true, default: [] },
    //all users
    users: { required: true, default: [] },
  },
  data() {
    return { scoreSorting: "totalScore" };
  },
  computed: {
    usersOtherThanMe() {
      //for second pane
      this.sortedUsersToDisplay.filter(function (user) {
        return user._id != this.$store.getters.getUser.id;
      });
    },
    sortedUsersToDisplay() {
      //mapping filter from string to function
      let sortBy = {};
      sortBy["totalScore"] = (a, b) => a.ecoScore - b.ecoScore;
      sortBy["rpmScore"] = (a, b) => a.rpmScore - b.rpmScore;
      sortBy["speedScore"] = (a, b) => a.speedScore - b.speedScore;
      sortBy["feedbackConsiderationScore"] = (a, b) =>
        a.feedbackConsiderationScore - b.feedbackConsiderationScore;
      //const sortByXp = (a, b) => a.feedbackConsiderationScore - b.feedbackConsiderationScore;

      return this.users.sort(sortBy[this.scoreSorting]);
    },
    lastUserTrip() {
      const lastScoreUpdate = this.scoresTrend[this.scoresTrend.length - 1];
      const lastScoreUpdateDate = new Date(lastScoreUpdate.referredTo);
      return "last active " + this.timeSince(lastScoreUpdateDate) + " ago";
    },
    lastUserActivity() {
      if (this.scoresTrend.length > 0) {
        return this.lastUserTrip;
      } else {
        return "no trips yet.";
      }
    },
    myRank() {
      //preventing to trigger chnge when logging out with ternary operator
      return this.$store.getters.getUser
        ? this.rankOf(this.sortedUsersToDisplay, this.$store.getters.getUser.id)
        : "";
    },

  },
  methods: {
    rankOf(users, userId) {
      const rank = users.map((aUser) => aUser._id).indexOf(userId) + 1; //+1 for array zero-indexing
      return rank;
    },
    timeSince(date) {
      console.log("la date to which say timeSince", date);
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
  },
  mounted() {},
  watch:{
    score: {
      deep: true,
      handler(score) {
        console.log("score changed, now it is:", score);
      }
    }
  }
};
</script>

<style scoped></style>
