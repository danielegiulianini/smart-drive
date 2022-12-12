<template>
  <section
    class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
  >
    <!--FOR DEBUGGING ====-->
    current active breakpoint:
    <div class="d-block d-sm-none">xs</div>
    <div class="d-none d-sm-block d-md-none">sm</div>
    <div class="d-none d-md-block d-lg-none">md</div>
    <div class="d-none d-lg-block d-xl-none">lg</div>
    <div class="d-none d-xl-block">xl</div>
    <!--==================-->

    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center"
        >
          <div class="card mb-3" style="z-index: 10">
            <!-- editing z-index for display spinner that would lies on the bottom of the card, otherwise-->
            <div class="card-body">
              <div class="pt-4 pb-2">
                <h5 class="card-title text-center pb-0 fs-4">
                  Login to your account
                </h5>
                <p class="text-center small">
                  Enter your username and password to start using the web app
                </p>
              </div>

              <!-- start user info-->
              <div class="p-lg-5 p-4" style="padding-bottom: 20%">
                <!-- Error alert -->
                <div
                  class="alert alert-danger alert-dismissible fade show"
                  v-if="overallError"
                  role="alert"
                >
                  <h4 class="alert-heading">Error happened!</h4>
                  <p>
                    {{ overallError }}
                  </p>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <!-- END Error alert -->

                <!-- user info form -->
                <form
                  class="row g-3 needs-validation"
                  ref="userLoginForm"
                  novalidate
                >
                  <div class="col-12">
                    <label for="yourEmail" class="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="yourEmail"
                      required
                      v-model="user.email"
                      :disabled="isSubmitting"
                    />
                    <div class="invalid-feedback">
                      Please enter a valid Email address!
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="yourPassword" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      id="yourPassword"
                      required
                      v-model="user.password"
                      :disabled="isSubmitting"
                    />
                    <div class="invalid-feedback">
                      Please enter your password!
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="remember"
                        value="true"
                        id="rememberMe"
                        v-model="user.remember"
                        :disabled="isSubmitting"
                      />
                      <label class="form-check-label" for="rememberMe"
                        >Remember me</label
                      >
                    </div>
                  </div>
                  <div class="col-12">
                    <button
                      class="btn btn-primary w-100"
                      type="submit"
                      @click.prevent="onFormSubmit"
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        v-if="isSubmitting"
                      ></span>
                      {{ isSubmitting ? "Loading ..." : "Login" }}
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Don't have account?
                      <router-link to="/signup">Create a new one!</router-link>
                    </p>
                  </div>
                </form>
                <!--end of user ifno form-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import axios from "axios";

export default {
  components: { UserForm },
  data() {
    return {
      isSubmitting: false,
      overallError: "",
      user: {
        email: "",
        password: "",
        remember: false,
      },
    };
  },
  methods: {
    clientSideValidateForm() {
      //triggering bootstrap validation here
      const form = this.$refs.userLoginForm;
      const isValid = form.checkValidity();
      form.classList.add("was-validated");
      return isValid;
    },
    //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
    onFormSubmit() {
      if (this.clientSideValidateForm()) {
        console.log("submitting to backend");
        this.isSubmitting = true;

        //putting (with this.$store.users.login) token in header for subsequent calls to backend
        this.$store
          .dispatch("login", {
            email: this.user.email,
            password: this.user.password,
          })
          .then(() => this.$router.push("/Profile"))
          .catch((err) => {
            //a mapping (to a more user-friendly error) could be added here (leveraging status codes returned by servers)
            //possible errors: network-related
            this.overallError = err;
          })
          .finally(() => {
            this.isSubmitting = false;
          });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
