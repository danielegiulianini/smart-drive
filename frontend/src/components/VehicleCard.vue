<template>
  <!-- this is the vehicle overview card (wrt. vehicle detail card)-->
  <div class="col">
    <div class="card nested-card" @click="$router.push(`/vehicle/${_id}`)">
      <!--src="/src/assets/style/img/mercedes_1920.jpg"-->
      <img :src="actualPictureUri" class="card-img-top" alt="..." />
      <div class="card-body">
        <div class="d-flex justify-content-between align-middle">
          <div>
            <h1 class="card-title mb-0 pb-2" style="font-size: 180%">
              {{ make }}
            </h1>
            <h6 class="card-subtitle mb-2 text-muted">
              <span style="font-size: 140%">{{ model }}</span>
              <!--<span class="badge bg-secondary ms-2">Most used</span>-->
            </h6>
          </div>
          <div class="my-auto">
            <!--src="https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg"-->
            <img
              :src="makeLogoImgUrl"
              style="max-width: 65px; max-height: 65px"
              alt="..."
            />
          </div>
        </div>

        <div class="d-flex justify-content-between align-middle">
          <div>
            <span class="card-text text-bf" style="font-size: 110%">{{
              fuelType
            }}</span>
            <p
              class="card-text text-muted text-start"
              style="line-height: 90%; font-size: 90%"
            >
              fuel type
            </p>
          </div>

          <div>
            <span class="card-text text-bf" style="font-size: 110%">{{
              trany
            }}</span>
            <p
              class="card-text text-muted text-end"
              style="line-height: 80%; font-size: 90%"
            >
              trany
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-middle mt-1">
          <div>
            <span class="card-text text-bf" style="font-size: 110%">{{
              year
            }}</span>
            <p
              class="card-text text-muted"
              style="line-height: 80%; font-size: 90%"
            >
              year
            </p>
          </div>

          <div>
            <div class="d-flex">
              <span
                class="card-text text-bf text-end ms-auto"
                style="font-size: 120%"
                >{{ comb08 }}</span
              >
            </div>
            <p
              class="card-text text-muted text-end"
              style="line-height: 50%; font-size: 90%"
            >
              combined mpg<i class="bi bi-question-circle"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <small class="text-muted"
          >registered {{ timeSince(new Date(createdAt)) }} ago</small
        >
      </div>
    </div>
  </div>
  <!-- end of col wrapping card-->
</template>

<script>
const defaultAvatarUri = "/src/assets/img/carAvatar.png";

export default {
  props: {
    _id: {
      type: String,
      required: true,
    },
    createdAt: {
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    pictureUri: {
      type: String,
      required: true,
    },
    makeLogoImgUrl: {
      type: String,
      required: true,
    },
    comb08: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    trany: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("my pictureUri is", this.pictureUri);
    console.log("il createAt: ", this.createdAt);
  },
  computed: {
    actualPictureUri() {
      return this.pictureUri ? this.pictureUri : defaultAvatarUri;
    },
  },
  methods: {
    timeSince(date) {
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
};
</script>

<style scoped>
.card-img-top {
  height: 25vh;
  object-fit: contain;  /*or contain*/
}
.card {
  transition: transform 0.2s ease;
  /*box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18);
    border-radius: 0;
    border: 0;
    margin-bottom: 1.5em;*/
  cursor: pointer;
}
.card:hover {
  transform: scale(1.05);
}
</style>
