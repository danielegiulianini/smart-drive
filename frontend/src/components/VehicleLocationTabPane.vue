<template>
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="bordered-justified-contact"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <!--src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"-->

    <!-- if there is a location...-->
    <!-- <div class="container-fluid" v-if="isThereALocation">
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
        width="100%"
        height="100%"
        frameborder="0"
        style="border: 0; min-height: 300px"
        allowfullscreen
      ></iframe>
    </div>
    <div
      v-else
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 300px"
    >
      <h1 style="font-size: 150%">Still no locations</h1>
      <p class="text-muted">Drive with the app to see your locations.</p>
    </div>-->
    <div class="container-fluid" v-if="isThereALocation">
      <div>
        <!-- correct format (working): src="https://maps.google.com/maps?q=53.3381768,-6.2613077&z=15&output=embed"-->
        <iframe
          src="https://maps.google.com/maps?q={{lastLocationLat}},{{lastLocationLng}}}&z=15&output=embed"
          width="100%"
          height="100%"
          frameborder="0"
          style="border: 0; min-height: 300px"
        ></iframe>
      </div>
      <div class="text-muted text-center" v-if="lastLocationTimestamp">
        {{ prettyPrintedDate }}
      </div>
    </div>
    <div
      v-else
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 300px"
    >
      <h1 style="font-size: 150%">Still no locations</h1>
      <p class="text-muted">Drive with the app to see your locations.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  inheritAttrs: false,
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    lastLocationLat: {
      type: String,
      default: "",
    },
    lastLocationLng: {
      type: String,
      default: "",
    },
    lastLocationTimestamp: { type: String, default: "" },
  },
  computed: {
    isThereALocation() {
      return !(this.lastLocationLat == "" || this.lastLocationLng == "");
    },
    prettyPrintedDate() {
      return this.lastLocationTimestamp
        ? new Date(this.lastLocationTimestamp).toUTCString()
        : "";
    },
  },

  mounted() {
    //init map...
  },
};
</script>

<style scoped>
.place-name {
  content: "iao";
}
</style>
