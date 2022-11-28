<template>
  <div>
    <!--<div class="d-flex justify-content-between align-items-center">
      <label for="yourName" class="form-label">Your Image</label>
      <div class="filter">
        <a
          class="icon"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ><i class="bi bi-pencil"></i
        ></a>
      </div>
    </div>-->
    <!--to be displayed only when a image is upload- -->
    <!--style="border-color: grey; border-width: 2px"-->

    <div class="drag-area mt-1 responsive-height" style="position: relative">
      <div
        class="filter"
        style="
          font-size: 50%;
          position: absolute;
          top: -15%;
          right: 1%;
          z-index: 1000;
        "
      >
        <a
          class="icon"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ><i class="bi bi-pencil" style="font-size: 35%"></i
        ></a>
      </div>
      <!--style="height: 40vw"-->
      <div class="icon">
        <i class="fas fa-images"></i>
      </div>

      <span class="header">Drag & Drop</span>
      <span class="header">or <span class="button">browse</span></span>
      <input type="file" hidden />
      <span class="support">Supports: JPEG, JPG, PNG</span>
    </div>
  </div>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
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
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
};
</script>

<style>
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
