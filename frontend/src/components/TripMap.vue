<template>
  <!--<iframe
    v-if="startLocation.name"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
    class="card-img-top"
    width="100%"
    height="100%"
    frameborder="0"
    style="border: 0; min-height: 300px"
    allowfullscreen
  ></iframe>-->
  <GMapMap
    :center="center"
    :zoom="12"
    style="width: 100%; height: 100%; border: 0; min-height: 300px"
    ref="polyline2"
  >
    <GMapPolyline
      :path="path"
      ref="polyline"
      style="width: 100%; height: 100%; border: 0; min-height: 300px"
    />
  </GMapMap>
</template>

<script>
import axios from "axios";

import TheAppHeader from "./TheAppHeader.vue";
import TheAppSidebar from "./TheAppSidebar.vue";
import TheAppFooter from "./TheAppFooter.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
  },
  methods: {},
  data() {
    return {
      center: { lat: 1.38, lng: 103.8 },
      path: [
        { lat: 1.33, lng: 103.75 },
        { lat: 1.43, lng: 103.85 },
      ],
    };
  },
  computed: {
    /*center() {
      console.log("la this.refs:", this.$refs);

      /* console.log("la polyline is:", this.$refs.polyline);
      const bounds = this.$refs.polyline.$mapObject.getBounds();

      // var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.path.length; i++) {
        bounds.extend(path[i]);
      }
      re*turn bounds.getCenter();*/
    /*},*/
  },
  watch: {
    //...
  },
  mounted() {
    console.log("la refs is:", this.$refs);
    this.$refs.polyline.$mapPromise.then((a) => {
      console.log("a is ", a);
      /* console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
      console.log("la MAPPA IS", a);*/
      a.fitBounds();
    });
    //this.$refs.polyline.$map.
    /* console.log("la polyline is:", this.$refs.polyline2.value);
    const bounds = this.$refs.polyline.$mapObject.getBounds();

    // var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.path.length; i++) {
      bounds.extend(this.path[i]);
    }
    this.center = bounds.getCenter();*/
  },
};
</script>

<style scoped></style>
