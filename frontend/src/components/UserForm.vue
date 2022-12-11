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
                    <label for="yourImage" class="form-label">Your Image</label>
                  </div>
                  <ImageUploader2
                    :initial-image="user.profilePictureUri"
                    @imageUploaded="onImageInput"
                  ></ImageUploader2>

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
                    <label for="yourCity" class="form-label">Your city</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourCity"
                      required
                    />
                    <div class="invalid-feedback">Please, enter your city!</div>
                  </div>
                  <div class="col-12">
                    <label for="yourCountry" class="form-label"
                      >Your country</label
                    >
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourCountry"
                      required
                    />

                    <div class="invalid-feedback">
                      Please, enter your country!
                    </div>
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

                  <div
                    class="col-12 d-flex justify-content-center"
                    v-if="displayAcceptTerms"
                  >
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
                  <div class="col-12" v-if="displayLogin">
                    <p class="small mb-0">
                      Already have an account?
                      <a href="pages-login.html">Log in</a>
                    </p>
                  </div>
                  <!--</div>-->
                  <div class="btn btn-primary" @click="onFormSubmit">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      v-if="isSubmitting"
                    ></span
                    >{{ submitButtonName }}
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
import Spinner from "../components/Spinner.vue";

export default {
  components: { ImageUploader2, Spinner },
  props: {
    submitButtonName: {
      type: String,
      default: "submit",
    },
    displayLogin: {
      type: Boolean,
      default: false,
    },
    displayAcceptTerms: {
      type: Boolean,
      default: false,
    },
    initialUser: Object, //this is an object
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      overallError: "",
      //================form-related data ========================
      user: {
        email: this.initialUser?.email, //this returns undefined instead of throwing error
        name: this.initialUser?.name,
        surname: this.initialUser?.surname,

        password: this.initialUser?.password,
        city: this.initialUser?.city,
        country: this.initialUser?.country,
        profilePictureUri: this.initialUser
          ? this.initialUser.profilePictureUri
            ? this.initialImage.profilePictureUri
            : "https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45"
          : "https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45",

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
      const form = this.$refs.userSignupForm;
      form.checkValidity();
      form.classList.add("was-validated");
      return isValid;
    },
    onImageInput: function ({ formData, imageUrl }) {
      this.vehicle.pictureUri = imageUrl;
    },
    onFormSubmit(event) {
      console.log("submitting to backend");

      //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
      console.log("submitting to backend");
      const isValid = this.clientSideValidateForm();
      if (isValid) {
        //this.isSubmitting = true; //move isSubmitting to parent!
        this.$emit("validatedFormSubmit", {
          user: this.user,
        });
      }
    },
  },
  emits: ["validatedFormSubmit"],
};
</script>

<style scoped></style>
