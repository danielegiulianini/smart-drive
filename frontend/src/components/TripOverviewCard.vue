<template>
  <div class="card" @click="$router.push(`/trips/${_id}`)">
    <!-- start of overview row -->
    <div class="row">
      <div class="col-12 col-lg-6">
        <!--<TripMap v-if="!startLocation.name" :positions="positions"></TripMap>-->
        <!--    seems to be useless:            
          width="100%"
          height="100%"--><!--</iframe
        >-->
        <iframe
          v-if="startLocation?.name"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
          class="card-img-top"
          frameborder="0"
          style="border: 0; min-height: 300px; width: 100%; height: 100%"
          allowfullscreen
        ></iframe>
        <div
          v-else
          class="d-flex flex-column justify-content-center align-items-center"
          style="height: 300px"
        >
          <h1 style="font-size: 150%">No GPS data for this trip</h1>
          <p class="text-muted">Drive with the app to see your locations.</p>
        </div>
      </div>
      <!-- start of "textual" overview col-->
      <div class="col-12 col-lg-6">
        <div class="card-body">
          <div class="d-flex justify-content-between align-middle">
            <div>
              <h1 class="card-title mb-0 pb-2" style="font-size: 180%">
                {{ date }}
              </h1>
              <h6 class="card-subtitle mb-2 text-muted">
                <span style="font-size: 140%"
                  >{{ vehicleMake }} {{ vehicleModel }}</span
                >
              </h6>
            </div>
            <div class="mt-3 text-center">
              <AppSemiCircularProgressBar
                :progress="globalScore"
              ></AppSemiCircularProgressBar>
              <div
                class="text-muted"
                style="margin-top: -20px; font-size: 90%; line-height: 85%"
              >
                Total score
              </div>
            </div>
          </div>
          <!-- start of timeline row-->
          <div class="row">
            <!--can remove col-12 since always using 12 (and div is block element) -->
            <div class="col-12">
              <div class="d-flex align-items-center">
                <i class="bi bi-geo-alt"></i>

                <div class="d-flex justify-content-between align-middle mt-1">
                  <div>
                    <span
                      v-if="startLocation?.latitude"
                      class="card-text text-bf"
                      style="font-size: 110%"
                      >{{ startLocation.name }}</span
                    >
                    <p
                      class="card-text text-muted"
                      style="line-height: 80%; font-size: 90%"
                    >
                      {{ startTimestamp }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-geo-alt"></i>

                <div class="d-flex justify-content-between align-middle mt-1">
                  <div>
                    <span
                      v-if="startLocation?.latitude"
                      class="card-text text-bf"
                      style="font-size: 110%"
                      >{{ endLocation.name }}</span
                    >
                    <p
                      class="card-text text-muted"
                      style="line-height: 80%; font-size: 90%"
                    >
                      {{ endTimestamp }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end of timeline row-->
          <!--<div class="row mt-2">
              <div class="col-12">
                <div class="d-flex justify-content-between align-middle">
                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >Diesel</span
                    >
                    <p
                      class="card-text text-muted text-end"
                      style="line-height: 90%; font-size: 90%"
                    >
                      fuel type
                    </p>
                  </div>

                  <div>
                    <span class="card-text text-bf" style="font-size: 110%"
                      >Automatic</span
                    >
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
                    <span class="card-text text-bf" style="font-size: 110%"
                      >2022</span
                    >
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
                        >32</span
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
            </div>-->
        </div>
      </div>
      <!-- end of "textual" overview col-->
    </div>
    <!-- end of overview row -->
    <div class="card-footer text-center" v-if="distanceTraveled">
      <small class="text-muted">{{ distanceTraveled }} km long</small>
    </div>
  </div>
</template>

<script>
import AppSemiCircularProgressBar from "../components/AppSemiCircularProgressBar.vue";

export default {
  components: { AppSemiCircularProgressBar },
  props: {
    _id: { required: true },
    globalScore: { required: true },
    startTimestamp: { required: true },
    endTimestamp: { required: true },
    date: { required: true },
    startLocation: { required: true },
    endLocation: { required: true },
    positions: { required: true },
    vehicleMake: { required: true },
    vehicleModel: { required: true },
    distanceTraveled: { required: true },
  },
  mounted() {
    console.log("il mio startLocation (vehcle card)", this.startLocation);

    console.log("il mio startTimestamp (vehcle card)", this.startTimestamp);
    console.log("il mio id (vehcle card)", this._id);
  },
  watch: {
    startTimestamp(newVal, oldVal) {
      console.log(
        "UPATE TIP OVERVIEW CARD: old startTimestamp",
        oldVal,
        "new:",
        newVal
      );
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
  /*box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18);
    border-radius: 0;
    border: 0;
    margin-bottom: 1.5em;*/
  cursor: pointer;
}
.card:hover {
  transform: scale(1.02);
}
</style>
