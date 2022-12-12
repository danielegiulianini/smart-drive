<template>
  <spinner :show1="true"></spinner>

  <UserLoginForm></UserLoginForm>
</template>

<script>
import axios from "axios";
import UserLoginForm from "../components/UserLoginForm.vue";
import Spinner from "../components/Spinner.vue";

export default {
  components: { UserLoginForm, Spinner},

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

<style></style>
