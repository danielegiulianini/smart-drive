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
          <div class="card mb-3">
            <div class="card-body">
              <div class="pt-4 pb-2">
                <h5 class="card-title text-center pb-0 fs-4">
                  Create an Account
                </h5>
                <p class="text-center small">
                  Enter your personal details to create account
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
                  ref="userSignupForm"
                  novalidate
                >
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label for="yourName" class="form-label">Your Image</label>
                  </div>
                  <ImageUploader2></ImageUploader2>

                  <!--<div class="col-lg-10">-->
                  <div class="col-12">
                    <label for="yourName" class="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourName"
                      required
                    />
                    <div class="invalid-feedback">Please, enter your name!</div>
                  </div>
                  <div class="col-12">
                    <label for="yourName" class="form-label">Your city</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourName"
                      required
                    />
                    <div class="invalid-feedback">Please, enter your name!</div>
                  </div>
                  <div class="col-12">
                    <label for="yourName" class="form-label"
                      >Your country</label
                    >
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourName"
                      required
                    />
                    <div class="invalid-feedback">Please, enter your name!</div>
                  </div>

                  <div class="col-12">
                    <label for="yourEmail" class="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="yourEmail"
                      required
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
                    />
                    <div class="invalid-feedback">
                      Please enter your password!
                    </div>
                  </div>

                  <div class="col-12 d-flex justify-content-center">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        name="terms"
                        type="checkbox"
                        value=""
                        id="acceptTerms"
                        required
                      />
                      <label class="form-check-label" for="acceptTerms"
                        >I agree and accept the
                        <a href="#">terms and conditions</a></label
                      >
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Already have an account?
                      <a href="pages-login.html">Log in</a>
                    </p>
                  </div>
                  <!--</div>-->
                  <div class="btn btn-primary" @click="changeInvalidFeedback">
                    Create Account
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
import ImageUploader2 from "../components/ImageUploader2.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  components: { ImageUploader2 },
  data() {
    return {
      isLoading: false,
      overallError: "",
      //================form-related data ========================
      user: {
        email: "",
        name: "",
        surname: "",

        password: "",
        city: "",
        country: "",
        profilePictureUri: "",

        //^^^optional^^^
        gender: "none",
        language: "en",
        //^^^^^^^^^^^^^^^^^
      },
    };
  },
  methods: {
    clientSideValidateForm() {
      //also as computed property
      const isValid = this.$refs.userSignupForm.checkValidity();
      this.$refs.addVehicleForm.classList.add("was-validated");
      return isValid;
    },
    onFormSubmit(event) {
      console.log("submitting to backend");

      //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
      console.log("submitting to backend");
      const isValid = clientSideValidateForm();
      if (isValid) {
        this.isLoading = true;

        //-- server side validation ------
        this.$store
          .register({
            email: this.user.email,
            password: this.user.password,
          })
          .then(
            (
              user //supabase user here
            ) =>
              axios.post(`users/${loggedInUser.uid}`, {
                tokenUserId: user.id, //taking from store or from user retur

                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,

                city: this.user.city,
                country: this.user.country,
                profilePictureUri: this.user.profilePictureUri,

                //^^^optional^^^
                gender: this.user.gender,
                language: this.user.language,
                //^^^^^^^^^^^^^^^^^

                name: this.user.name,
                gender: this.user.gender,
                language: this.user.language,
                city: this.user.city,
                country: this.user.country,
              })
          )
          .then(() => this.$router.push("/Profile"))
          .catch((err) => {
            //a mapping (to a more user-friendly error) could be added here (leveraging status codes returned by servers)
            //possible errors: network-related
            this.overallError = err;
          })
          .finally(() => {
            this.isLoading = false;
          });
        //----------------------------
      }
    },
  },
};
</script>

<style></style>
