<template>
  <spinner :show1="true"></spinner>
  <div class="container">
    <div class="row justify-content-center">
      <div
        class="col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center"
      >
        <UserSignupForm></UserSignupForm>
      </div>
    </div>
  </div>
</template>

<script>
import UserSignupForm from "../components/UserSignupForm.vue";
import Spinner from "../components/Spinner.vue";

export default {
  components: {
    UserSignupForm,
    Spinner,
  },
};
</script>

<style scoped></style>
