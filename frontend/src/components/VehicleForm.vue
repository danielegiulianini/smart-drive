<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="pt-4 pb-2 mb-2">
        <h5 class="card-title text-center pb-0 fs-4">
          {{ submitButtonName }} a vehicle
          {{ submitButtonName == "Add" ? "to" : "of" }} your garage
        </h5>
        <p class="text-center small">
          Enter some details and our servers will fetch many other info
          automatically
        </p>
      </div>

      <div class="p-lg-5 p-4 pt-0" style="padding-bottom: 20%">
        <!-- Error alert -->
        <div class="alert alert-danger alert-dismissible fade show" v-if="myOverallError" role="alert">
          <h4 class="alert-heading">Error happened!</h4>
          <p>
            {{ myOverallError }}
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <!-- END Error alert -->

        <!-- vehicle info form -->
        <form class="row g-3 needs-validation" ref="addVehicleForm" novalidate>
          <div class="d-flex justify-content-between align-items-center">
            <label for="yourName" class="form-label">Your vehicle Image</label>
          </div>
          <ImageUploader2 :initial-image="getUserImage" @imageUploaded="onImageInput" @imageRemoved="onImageRemoved">
          </ImageUploader2>

          <div class="col-12">
            <label for="yourName" class="form-label">Your Vehicle year of made</label>
            <div class="is-loading">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                v-model="vehicle.year" @input="onYearInput" required>
                <option selected :value="this.vehicle.year">
                  {{ this.vehicle.year ? this.vehicle.year : "Choose..." }}
                </option>

                <option v-for="(item, index) in domain.years" :key="item.value" :value="item.value">
                  {{ item.text }}
                </option>
              </select>
              <div class="invalid-feedback">Please, enter your year!</div>
              <div v-if="isLoading.years" class="spinner-border spinner-border-sm input-spinner"></div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourMake" class="form-label">Your vehicle make</label>
            <div class="is-loading">
              <select class="form-select" id="floatingSelect3" aria-label="Floating label select example"
                :class="{ disabled: !vehicle.year }" @input="onMakeInput" v-model="vehicle.make" required>
                <option selected :value="vehicle.make">
                  {{ vehicle.make ? vehicle.make : "Choose..." }}
                </option>
                <option v-for="(item, index) in domain.makes" :key="item.value" :value="item.value">
                  {{ item.value }}
                </option>
              </select>
              <div class="invalid-feedback">Please choose a valid make.</div>
              <div v-if="isLoading.makes" class="spinner-border spinner-border-sm input-spinner"></div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourUsername" class="form-label">Your vehicle Model</label>
            <div class="is-loading">
              <select class="form-select" id="floatingSelect4" aria-label="Floating label select example"
                @input="onModelInput" v-model="vehicle.model" :class="{ disabled: !vehicle.make }" required>
                <option selected :value="vehicle.model">
                  {{ vehicle.model ? vehicle.model : "Choose..." }}
                </option>
                <option v-for="(item, index) in domain.models" :value="item.value">
                  {{ item.text }}
                </option>
              </select>
              <div class="invalid-feedback">Please choose a vehicle model.</div>
              <div v-if="isLoading.models" class="spinner-border spinner-border-sm input-spinner"></div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourUsername" class="form-label">Your vehicle Series</label>
            <div class="is-loading">
              <select class="form-select" id="floatingSelect4" aria-label="Floating label select example"
                :class="{ disabled: !vehicle.model }" @input="onSeriesInput" v-model="vehicle.series" required>
                <option selected :value="vehicle.series">
                  {{ this.vehicle.series ? getSeriesFromModelId : "Choose..." }}
                </option>
                <!-- no disabled as it would disable (required) validation!-->
                <option v-for="(item, index) in domain.series" :value="item.value">
                  {{ item.text }}
                </option>
              </select>
              <div class="invalid-feedback">
                Please choose some other vehicle details.
              </div>

              <div v-if="isLoading.series" class="spinner-border spinner-border-sm input-spinner"></div>
            </div>
          </div>
          <div class="col-12" v-if="!edit">
            <!-- v-if="!vehicle._id"> in edit form you cannot edit your vin since it's the key in DB-->
            <label for="yourPassword" class="form-label">Your vehicle Identification Number (VIN)</label>
            <div class="input-group has-validation">
              <input type="text" name="username" class="form-control" id="yourVin" :class="{ disabled: !vehicle._id }"
                v-model="vehicle._id" required pattern="[a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6}" />
              <div class="invalid-feedback">
                Please specify your vehicle' VIN.
              </div>
            </div>
          </div>
          <div class="pt-3 d-grid gap-2 d-flex justify-content-between">
            <!-- this closes wrapping modal!-->
            <button class="btn btn-secondary w-50" type="button" data-bs-dismiss="modal">
              Close</button><button class="btn btn-primary w-50" data-bs-dismiss="modal" type="button"
              @click.prevent="onNewVehicleSubmit">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="false"></span>
              {{ submitButtonName }}
            </button>
          </div>
        </form>
        <!-- vehicle detail form-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ImageUploader2 from "./ImageUploader2.vue";
const defaultAvatarUri = "/src/assets/img/carAvatar.png";

//function needed because vehicles backend returns a non-standard format (array if size>1 and object if size == 1)
function convertToArrayIfNotAlready(possibleArray) {
  return !Array.isArray(possibleArray) ? [possibleArray] : possibleArray;
}

export default {
  components: { ImageUploader2 },
  props: {
    edit: { default: false },
    submitButtonName: {
      type: String,
    },
    _id: { required: false }, //the so-called "vin"
    year: { required: false },
    make: { required: false },
    model: { required: false },
    series: { required: false },
    pictureUri: { required: false },
    retired: { required: false },
    isSubmitting: {
      //used for disabling input while submitting to prevent incoeherent behaviour
      type: Boolean,
      default: false,
    },
    overallError: { required: false },
  },
  data() {
    return {
      yearDisabled: true,
      makeDisabled: true,
      modelDisabled: true,
      seriesDisabled: true,
      vinDisabled: true,
      myOverallError: this.overallError,
      domain: {
        years: [],
        makes: [],
        models: [],
        series: [],
        vid: "",
      },
      vehicle: {
        _id: "", //this._id, //the so-called "vin"
        year: "", //this.year, //this.initialVehicle.year,
        make: "", // this.make,
        model: "", //this.model,
        series: "", // this.series,
        pictureUri: "", // this.pictureUri, //default picture uri
        retired: false, // this.retired, //not needed as default in mongoose
        //---------------------------------------------
      },
      isLoading: {
        years: false,
        makes: false,
        models: false,
        series: false,
      },
    };
  },
  computed: {
    getUserImage() {
      return this.vehicle.pictureUri
        ? this.vehicle.pictureUri
        : defaultAvatarUri;
    },
    getSeriesFromModelId() {
      /* console.log(
        "la textual series:",
        this.domain.series.filter(
          //getting the textual version of this value
          (item) => item.value == this.vehicle.series
        )[0].text
      );
      console.log(
        "filtered series:",
        this.domain.series.filter(
          //getting the textual version of this value
          (item) => item.value == this.vehicle.series
        )
      );
      this.domain.series.filter(
        //getting the textual version of this value
        (item) => item.value == this.vehicle.series
      )[0].text;*/

      return this.domain.series.length > 0 && this.vehicle.series
        ? this.domain.series.filter(
          //getting the textual version of this value
          (item) => item.value == this.vehicle.series
        )[0].text
        : "";
    },
  },
  methods: {
    getYears: async function () {
      this.isLoading.years = true;
      console.log("getting years in vehicle registration form");
      axios
        .get(`vehicles/vehiclesModels/productionYears`) //axios.get(url, options)
        .then((result) => {
          console.log("data arrived (for years):", result.data);
          this.domain.years = result.data.menuItem;

          console.log("years arrived:", this.domain.years);
        })
        .catch((err) => {
          console.error(err);
          this.myOverallError = err;
        })
        .finally(() => (this.isLoading.years = false));
    },
    getMakesOfYear: async function (year) {
      console.log("getting makes in vehicle registration form");
      this.isLoading.makes = true;

      axios
        .get(`vehicles/vehiclesModels/makes`, {
          params: {
            year: year,
          },
        }) //axios.get(url, options)
        .then((result) => {
          console.log("data arrived (for makes):", result.data);
          this.domain.makes = convertToArrayIfNotAlready(result.data.menuItem);
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading.makes = false));

      //handle error by replying it to user in alert or year field
    },
    getModelsOfYearAndMake: async function (year, make) {
      this.isLoading.models = true;

      console.log("getting models in vehicle registration form");
      axios
        .get(`vehicles/vehiclesModels/models`, {
          params: {
            year: year,
            make: make,
          },
        }) //axios.get(url, options)
        .then((result) => {
          console.log("data arrived (for models):", result.data);
          this.domain.models = convertToArrayIfNotAlready(result.data.menuItem);
          console.log("mdoels arrived:", this.domain.models);
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading.models = false));

      //handle error by replying it to user in alert or year field
    },
    getSeriesOfYearMakeAndModel: async function (year, make, model) {
      this.isLoading.series = true;

      console.log("getting series in vehicle registration form");
      axios
        .get(`vehicles/vehiclesModels/series`, {
          params: { year: year, make: make, model: model },
        }) //axios.get(url, options)
        .then((result) => {
          console.log("il result arrived for series: ", result);
          this.domain.series = convertToArrayIfNotAlready(result.data.menuItem);
          console.log("series arrived:", this.domain.series);
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading.series = false));
    },
    //------------ event handlers ----------------
    onImageInput: function ({ formData, imageUrl }) {
      console.log("lo imageUrl in vehicleorm: ", imageUrl);
      this.vehicle.pictureUri = imageUrl;
    },
    onImageRemoved: function () {
      this.vehicle.pictureUri = "";
    },
    onYearInput: function (e) {
      this.getMakesOfYear(e.target.value); //use e.target.value because this.vehicle.year is not assigned yet as my input handler is called before the input handler of v-model
      //this.makeDisabled = false; //enable next option
      this.$refs.addVehicleForm.classList.remove("was-validated");
    },
    onMakeInput: function (e) {
      console.log(
        "searching models with year:",
        this.vehicle.year,
        "and make:",
        this.vehicle.make
      );
      this.getModelsOfYearAndMake(this.vehicle.year, e.target.value);
      //this.modelDisabled = false;
      this.$refs.addVehicleForm.classList.remove("was-validated");
    },
    onModelInput: function (e) {
      this.vehicle.series = ""; //if editing, old series is to be thrown away
      console.log(
        "searching series with year:",
        this.vehicle.year,
        "and make:",
        this.vehicle.make,
        "and model:",
        e.target.value
      );
      this.getSeriesOfYearMakeAndModel(
        this.vehicle.year,
        this.vehicle.make,
        e.target.value
      );
      //this.seriesDisabled = false;
      this.$refs.addVehicleForm.classList.remove("was-validated");
    },
    onSeriesInput: function (e) {
      //this.vinDisabled = false;
      this.$refs.addVehicleForm.classList.remove("was-validated");
    },
    clientSideValidateForm: function () {
      //also as computed property
      const isValid = this.$refs.addVehicleForm.checkValidity();
      this.$refs.addVehicleForm.classList.add("was-validated");
      return isValid;
    },
    onNewVehicleSubmit: function (e) {
      //======= VALIDATION ON SUBMIT (could also be on input or on key-press event) =========
      console.log("submitting to backend vehicle", this.vehicle);
      const isValid = this.clientSideValidateForm();
      if (isValid) {
        this.$emit("validatedFormSubmit", this.vehicle);
      } else console.log("form is not valid!");
    },
  },
  //this watchers
  watch: {
    _id: function (value) {
      //here the prop
      this.vehicle._id = value;
      console.log("invoking... watcher with _id", this.vehicle._id);
    },
    year: function (value) {
      //here the prop
      this.vehicle.year = value;
    },
    make: function (value) {
      //here the prop
      this.vehicle.make = value;
    },
    model: function (value) {
      if (this.year) {
        //otherwise watch is called with year, make and model undefined
        //here the prop
        this.vehicle.model = value;
        //series is the only info is not retrievable by vehiclemodels (when a initial vehicle is provided)
        console.log(
          "invoking... watcher with triple",
          this.year,
          this.make,
          this.model
        );
        this.getSeriesOfYearMakeAndModel(this.year, this.make, this.model);
      }
    },
    series: function (value) {
      //here the prop
      this.vehicle.series = value;
      console.log("invoking... watcher with series", this.vehicle.series);
    },
    pictureUri: function (value) {
      //here the prop
      this.vehicle.pictureUri = value;
    },
    retired: function (value) {
      //here the prop
      this.vehicle.retired = value;
    },
    overallError: function (value) {
      //here the prop
      this.myOverallError = value;
    },
  },
  mounted() {
    this.getYears();
  },
};
</script>

<style scoped>
.is-loading {
  position: relative;
}

.spinner-border.input-spinner {
  position: absolute;
  right: calc(0.375em + 2rem);
  z-index: 4;
  top: calc((0.375em + 0.1875rem) + 2px);
}

.form-select.disabled {
  background-color: #e9ecef;
}

select.disabled {
  opacity: 1;
  /*pointer-events: none;*/
}

select>option.disabled {
  color: -internal-light-dark(graytext, rgb(170, 170, 170));
}
</style>
