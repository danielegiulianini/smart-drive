<template>
  <div
    class="tab-pane p-4 pb-0"
    :class="{ active: isActive }"
    id="bordered-justified-home"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="row">
      <div class="col-md-4 col-lg-4 B pb-4">
        <div class="card nested-card text-center h-100">
          <div class="card-body profile-card pt-4 text-center">
            <div class="filter">
              <UserEditModal
                :initialUser="{
                  firstName: this.firstName,
                  surname: this.surname,
                  city: this.city,
                  country: this.country,
                  email: this.email,
                  profilePictureUri: this.actualPictureUri,
                }"
              ></UserEditModal>
            </div>

            <img
              :src="actualPictureUri"
              alt="Profile"
              class="rounded-circle mb-3 mt-3"
            />
            <div
              class="card-body d-flex align-items-center justify-content-center"
            >
              <div>
                <h2 class="card-title" style="font-size: 150%">
                  {{ firstName }} {{ surname }}
                </h2>
                <h6>{{ email }}</h6>
                <span class="text-muted small pt-2 ps-1" v-if="country">
                  <i class="bi bi-geo-alt"></i>{{ city }}, {{ country }}</span
                >
              </div>
            </div>
            <div class="card-footer p-2">
              member since {{ timeSince(new Date(createdAt)) }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4">
        <div class="row h-50">
          <div class="col-md-12 h-100 pb-4">
            <div class="card d-flex nested-card h-100 mb-5">
              <div class="card-body profile-card pb-1">
                <h6 class="card-title mb-0">XP</h6>

                <div
                  class="text-center d-flex justify-content-center align-items-center"
                >
                  <div>
                    <div class="filter">
                      <a class="icon">
                        <AppTooltip
                          content="Experience Points (XP) are gained by performing trips."
                        ></AppTooltip
                      ></a>
                    </div>
                    <h4 style="font-size: 200%">{{ formattedXp }}</h4>
                    <!---->
                    <div class="text-center">
                      <span class="text-muted small ps-1"
                        >{{ formattedXpGatheredDuringThisLevel }}/300 to level
                        {{ level + 1 }}</span
                      >
                      <AppLabeledHorizontalProgressBar
                        :progress="xpGatheredDuringThisLevel"
                        max="300"
                      ></AppLabeledHorizontalProgressBar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row h-50">
          <div class="col-md-12 h-100 pb-4">
            <div class="card nested-card mb-2 my-auto h-100">
              <div class="card-body profile-card pb-1">
                <div class="mb-5 mb-sm-0">
                  <div class="filter">
                    <a class="icon"
                      ><AppTooltip
                        content="A given level is reached by gathering XPs. The higher the level the better your reputation and available features are. Each level corresponds to a category, a nice characterization of user experience."
                      ></AppTooltip
                    ></a>
                  </div>
                  <h1 class="card-title mb-0">Level</h1>
                  <div class="d-flex justify-content-around">
                    <div>
                      <img
                        :src="category.pictureUri"
                        alt="Profile"
                        style="width: 69px; height: 69px"
                      />
                    </div>
                    <div class="mb-0 pb-0 text-center">
                      <div
                        class="d-flex my-auto align-middle justify-content-center"
                      >
                        <div style="font-size: 200%">{{ level }}</div>
                        <small
                          class="text-muted align-middle mt-3 ps-1"
                          style="font-size: 80%"
                          >| {{ category.name }}</small
                        >
                      </div>
                      <div class="text-center">
                        <!--  very interesting! (abandoned because of lack of time) 
                          <span class="text-muted small ps-1"
                          >80/150 to category 10</span
                        >
                        <AppLabeledHorizontalProgressBar
                          progress=""
                          max=""
                        ></AppLabeledHorizontalProgressBar>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 pb-4">
        <div class="card nested-card my-auto h-100">
          <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"
              ><i class="bi bi-three-dots"></i
            ></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li class="dropdown-header text-start">
                <h6>Filter</h6>
              </li>

              <li><a class="dropdown-item" href="#">Trips</a></li>
              <li><a class="dropdown-item" href="#">Badges</a></li>
            </ul>
          </div>

          <div class="card-body">
            <h5 class="card-title">Recent Activity <span>| Trips</span></h5>
            <div
              class="d-flex flex-column justify-content-center align-items-center text-center"
              style="height: 300px"
            >
              <h1 style="font-size: 110%">No activities</h1>
              <p class="text-muted" style="font-size: 90%">
                You seem to be an app beginner.
              </p>
            </div>
            <!--
            <div class="activity">
              <div class="activity-item d-flex">
                <div class="activite-label">32 min</div>
                <i
                  class="bi bi-circle-fill activity-badge text-success align-self-start"
                ></i>
                <div class="activity-content">
                  Quia quae rerum
                  <a href="#" class="fw-bold text-dark">explicabo officiis</a>
                  beatae
                </div>
              </div>-->
            <!-- End activity item-->
            <!--
              <div class="activity-item d-flex">
                <div class="activite-label">56 min</div>
                <i
                  class="bi bi-circle-fill activity-badge text-danger align-self-start"
                ></i>
                <div class="activity-content">
                  Voluptatem blanditiis blanditiis eveniet
                </div>
              </div>-->
            <!-- End activity item-->
            <!--
              <div class="activity-item d-flex">
                <div class="activite-label">2 hrs</div>
                <i
                  class="bi bi-circle-fill activity-badge text-primary align-self-start"
                ></i>
                <div class="activity-content">
                  Voluptates corrupti molestias voluptatem
                </div>
              </div>-->
            <!-- End activity item-->
            <!--
              <div class="activity-item d-flex">
                <div class="activite-label">1 day</div>
                <i
                  class="bi bi-circle-fill activity-badge text-info align-self-start"
                ></i>
                <div class="activity-content">
                  Tempore autem saepe
                  <a href="#" class="fw-bold text-dark">occaecati voluptatem</a>
                </div>
              </div>-->
            <!-- End activity item-->
          </div>
        </div>
      </div>
      <!-- start of real content -->
    </div>
  </div>
  <!-- End Bordered Tabs Justified -->
</template>

<script>
import AppTooltip from "./AppTooltip.vue";
import AppLabeledHorizontalProgressBar from "./AppLabeledHorizontalProgressBar.vue";
import UserEditModal from "./UserEditModal.vue";
import timeSinceComputer from "../mixins/timeSinceComputer.vue";

const categories = [
  {
    name: "tricycle",
    pictureUri: "/src/assets/img/levels/tricycle.png",
  },
  {
    name: "threewheeler",
    pictureUri: "/src/assets/img/levels/threeWheeler.png",
  },
  {
    name: "car",
    pictureUri: "/src/assets/img/levels/car.png",
  },
  {
    name: "sport-car",
    pictureUri: "/src/assets/img/levels/sport-car.png",
  },
  {
    name: "formula",
    pictureUri: "/src/assets/img/levels/formula.png",
  },
];

export default {
  components: { AppLabeledHorizontalProgressBar, AppTooltip, UserEditModal },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    firstName: { required: true },
    surname: { required: true },
    email: { required: true },
    city: { required: true },
    country: { required: true },
    actualPictureUri: { required: true },
    createdAt: { required: true }, //this is already a date (not a string)

    xp: { required: true },
    level: { required: true },
  },
  computed: {
    xpGatheredDuringThisLevel() {
      console.log("this.xp: ", this.xp);
      console.log("this.level: ", this.level);

      return this.xp - this.level * 300;
    },
    formattedXp() {
      return this.xp.toFixed(2);
    },
    formattedXpGatheredDuringThisLevel() {
      return this.xpGatheredDuringThisLevel.toFixed(2);
    },
    nextCategory() {
      let nextCategoryIndex =
        this.scale(
          this.level,
          0,
          10, //max level
          0,
          categories.length
        ) + 1;
      if (nextCategoryIndex > lastCategoryIndex) {
        categoryIndex = lastCategoryIndex;
      }
      console.log("il mio category index: ", categoryIndex);
      return categories[categoryIndex];
    },
    category() {
      let categoryIndex = Math.round(
        this.scale(
          this.level,
          0,
          100, //max level
          0,
          categories.length
        )
      );
      console.log("il category index,", categoryIndex);

      const lastCategoryIndex = categories.length - 1;
      //if mroe than x levels => return last category
      if (categoryIndex > lastCategoryIndex) {
        categoryIndex = lastCategoryIndex;
      }
      return categories[categoryIndex];
    },
  },
  mixins: [timeSinceComputer],

  methods: {
    scale(number, inMin, inMax, outMin, outMax) {
      return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },
  },
  watch: {
    category: {
      deep: true,
      handler(category) {
        console.log("category changed, now it is:", category);
      },
    },
  },
};
</script>

<style scoped>
img {
  object-fit: contain;
  max-height: 105px;
}
</style>
