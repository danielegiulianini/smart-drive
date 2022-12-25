<template>
  <div>
    <div style="font-size: 200%; line-height: 90%" class="pt-4">
      <div class="progress" style="height: 3px">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 10%; background-color: red !important"
        ></div>
      </div>
    </div>
    <div class="text-muted text-center pt-2" style="font-size: 105%">
      fuel tank level
    </div>
  </div>
</template>

<script>
import axios from "axios";

import TheAppHeader from "./TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
  },
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  data() {
    //this cannot be a field because every instance of this component must have its own state
    return {
      author: {
        name: "John Doe",
        books: [
          "Vue 2 - Advanced Guide",
          "Vue 3 - Basic Guide",
          "Vue 4 - The Mystery",
        ],
      },
    };
  },
};
</script>

<style scoped>
.btn-circle.btn-md {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
.page-header {
  padding: 20px;
  background-color: white; /* ghostwhite;*/
  border-radius: 10px;
}
</style>
