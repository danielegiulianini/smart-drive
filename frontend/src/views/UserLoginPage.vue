<template>
  <spinner :show1="true"></spinner>
  <!-- <div class="container">
    <section
      class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-12 d-flex flex-column align-items-center justify-content-center"
          >
            <UserLoginForm></UserLoginForm>
          </div>
        </div>
      </div>
    </section>
  </div>-->
  <UserLoginForm></UserLoginForm>
</template>

<script>
import UserLoginForm from "../components/UserLoginForm.vue";
import Spinner from "../components/Spinner.vue";

export default {
  components: { UserLoginForm, Spinner },
};
</script>

<style></style>
