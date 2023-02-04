<template>
  <section
    class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
  >
    <!--<div class="container">
      <div class="row justify-content-center">
        <div
          class="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center"
        >-->
    <div class="card mb-3" style="z-index: 10">
      <!-- editing z-index for display spinner that would lies on the bottom of the card, otherwise-->
      <div class="card-body">
        <div class="pt-4 pb-2">
          <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
          <p class="text-center small">
            Enter your personal details to create account
          </p>
        </div>

        <!-- start user info-->
        <div class="py-lg-5 p-4" style="padding-bottom: 20%">
          <!-- old spacing: class="p-lg-5 p-4"-->
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
            <div class="d-flex justify-content-between align-items-center">
              <label for="yourImage" class="form-label">Your Image</label>
            </div>
            <ImageUploader2
              :initial-image="getUserImage"
              @imageUploaded="onImageInput"
              @imageRemoved="onImageRemoved"
            ></ImageUploader2>

            <!--<div class="col-lg-10">-->
            <div class="col-12">
              <label for="yourName" class="form-label">Your Name</label>
              <input
                type="text"
                name="firstName"
                class="form-control"
                id="yourName"
                required
                v-model="user.firstName"
              />
              <div class="invalid-feedback">Please, enter your name!</div>
            </div>
            <div class="col-12">
              <label for="yourSurname" class="form-label">Your Surname</label>
              <input
                type="text"
                name="surname"
                class="form-control"
                id="yourSurname"
                required
                v-model="user.surname"
              />
              <div class="invalid-feedback">Please, enter your surname!</div>
            </div>
            <div class="col-12">
              <label for="yourCity" class="form-label">Your city</label>
              <input
                type="text"
                name="city"
                class="form-control"
                id="yourCity"
                required
                v-model="user.city"
              />
              <div class="invalid-feedback">Please, enter your city!</div>
            </div>
            <div class="col-12">
              <label for="yourCountry" class="form-label">Your country</label>
              <input
                type="text"
                name="country"
                class="form-control"
                id="yourCountry"
                required
                v-model="user.country"
              />

              <div class="invalid-feedback">Please, enter your country!</div>
            </div>
            <!-- no possibility to edit password (v-if)-->
            <div class="col-12" v-if="!email">
              <label for="yourEmail" class="form-label">Your Email</label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="yourEmail"
                required
                v-model="user.email"
              />
              <div class="invalid-feedback">
                Please enter a valid Email address!
              </div>
            </div>

            <!-- no possibility to edit password-->
            <div class="col-12" v-if="!email">
              <label for="yourPassword" class="form-label">Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                id="yourPassword"
                required
                pattern=".{5,}"
                v-model="user.password"
                autocomplete="on"
              />
              <div class="invalid-feedback">Please enter a valid password!</div>
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
                <router-link to="/login">Log in</router-link>
              </p>
            </div>
            <!--</div>-->
            <div class="pt-3 d-grid gap-2 d-flex justify-content-between text-center">
              <!-- this closes wrapping modal!-->
              <button
                class="btn btn-secondary"
                :class="{'w-50': !displayLogin, 'w-100': displayLogin}"

                type="button"
                data-bs-dismiss="modal"
                v-if="!displayLogin"
              >
                Close
              </button>
              <div
                class="btn btn-primary"
                :class="{'w-50': !displayLogin, 'w-100': displayLogin}"

                @click="onFormSubmit"
                data-bs-dismiss="modal"
              >
                <!--data-bs-dismiss="modal" CAN BE REMOVED IF WANT TO SHOW A SPINNER-->
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="isSubmitting"
                ></span
                >{{ submitButtonName }}
              </div>
            </div>
          </form>
          <!--end of user ifno form-->
        </div>
      </div>
    </div>
    <!--</div>
      </div>
    </div>-->
  </section>
</template>

<script>
import ImageUploader2 from "../components/ImageUploader2.vue";
import Spinner from "../components/Spinner.vue";

const defaultAvatarPath = "/src/assets/img/driverAvatar.png";

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
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    //cannot edit email and pw but must be sumbitted as well when editing...!
    email: { required: false },
    firstName: { required: false },
    surname: { required: false },
    country: { required: false },
    city: { required: false },
    profilePictureUri: { required: false },
    overallError: { required: false },
  },
  computed: {
    getUserImage() {
      return this.user.profilePictureUri
        ? this.user.profilePictureUri
        : defaultAvatarPath;
    },
  },
  data() {
    return {
      //================form-related data ========================
      user: {
        firstName: this.firstName,
        surname: this.surname,
        city: this.city,
        country: this.country,
        profilePictureUri: this.profilePictureUri,
        password: "",
        email: this.email,

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
      const isValid = form.checkValidity();
      form.classList.add("was-validated");
      return isValid;
    },
    onImageInput: function ({ formData, imageUrl }) {
      console.log("image inputted with url", imageUrl)
      this.user.profilePictureUri = imageUrl;
    },
    onImageRemoved: function () {
      this.user.pictureUri = "";
    },
    onFormSubmit(event) {
      console.log("submitting to backend");
      console.log("useris: ", this.user);
      const isValid = this.clientSideValidateForm();
      this.user.name = this.user.firstName; //mapping to real (as epected from backend) name
      if (isValid) {
        this.$emit("validatedFormSubmit", this.user);
      } else console.log("form is not valid!");
    },
  },
  emits: ["validatedFormSubmit"],
  //this watchers are neede to keep props reactive when using form for editing user
  watch: {
    email: function (value) {
      //here the prop
      this.user.email = value;
    },
    password: function (value) {
      //here the prop
      this.user.password = value;
    },
    firstName: function (value) {
      //here the prop
      this.user.firstName = value;
    },
    surname: function (value) {
      //here the prop
      this.user.surname = value;
    },
    profilePictureUri: function (value) {
      //here the prop
      console.log("setting profile image!!0===000000000>")
      this.user.profilePictureUri = value;
    },
    city: function (value) {
      //here the prop
      this.user.city = value;
    },
    country: function (value) {
      //here the prop
      this.user.country = value;
    },
  },
};
</script>

<style scoped></style>
