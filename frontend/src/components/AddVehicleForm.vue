<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="pt-4 pb-2">
        <h5 class="card-title text-center pb-0 fs-4">
          Add a vehicle to your garage
        </h5>
        <p class="text-center small">
          Enter some details and our servers will fetch many other info
          automatically
        </p>
      </div>
      <div class="p-lg-5 p-4" style="padding-bottom: 20%">
        <!-- image uploader-->
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <label for="yourName" class="form-label">Your Image</label>
            <div class="btn" style="border-color: grey; border-width: 2px">
              <i class="bi bi-trash3-fill"></i
              ><!-- to be displayed only when a image is upload-->
            </div>
          </div>
          <div class="drag-area mt-1 responsive-height">
            <!--style=&quot;height: 40vw&quot;-->
            <div class="icon"><i class="fas fa-images"></i></div>
            <span class="header">Drag &amp; Drop</span
            ><span class="header">or <span class="button">browse</span></span
            ><input type="file" hidden /><span class="support"
              >Supports: JPEG, JPG, PNG</span
            >
          </div>
        </div>
        <!-- end of image uploader-->

        <!-- vehicle info form -->
        <form class="row g-3 needs-validation" ref="addVehicleForm" novalidate>
          <div class="col-12">
            <label for="yourName" class="form-label"
              >Your Vehicle year of made</label
            ><select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              required
              v-model="vehicle.year"
              @input="onYearInput"
            >
              <option selected disabled value="">Choose...</option>
              <option
                v-for="(item, index) in domain.years"
                :key="item.value"
                :value="item.value"
              >
                {{ item.text }}
              </option>
            </select>
            <div class="invalid-feedback">Please, enter your name!</div>
          </div>
          <div class="col-12">
            <label for="yourEmail" class="form-label">Your vehicle make</label
            ><select
              class="form-select"
              id="floatingSelect3"
              aria-label="Floating label select example"
              :disabled="makeDisabled"
              @input="onMakeInput"
              v-model="vehicle.make"
            >
              <option selected disabled value="">Choose...</option>
              <option
                v-for="(item, index) in domain.makes"
                :key="item.value"
                :value="item.value"
              >
                {{ item.value }}
              </option>
            </select>
            <div class="invalid-feedback">
              Please enter a valid Email address!
            </div>
          </div>
          <div class="col-12">
            <label for="yourUsername" class="form-label"
              >Your vehicle Model</label
            >
            <div class="input-group has-validation">
              <select
                class="form-select"
                id="floatingSelect4"
                aria-label="Floating label select example"
                :disabled="modelDisabled"
                @input="onModelInput"
                v-model="vehicle.model"
              >
                <option selected disabled value="">Choose...</option>
                <option
                  v-for="(item, index) in domain.models"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </select>
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourUsername" class="form-label"
              >Your vehicle Series</label
            >
            <div class="input-group has-validation">
              <select
                class="form-select"
                id="floatingSelect4"
                aria-label="Floating label select example"
                :disabled="seriesDisabled"
                @input="onSeriesInput"
                v-model="vehicle.series"
              >
                <option selected disabled value="">Choose...</option>
                <option
                  v-for="(item, index) in domain.series"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </select>
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourPassword" class="form-label"
              >Your vehicle Identification Number (VIN)</label
            >
            <div class="input-group has-validation">
              <input
                type="text"
                name="username"
                class="form-control"
                id="yourUsername"
                required
                :disabled="vinDisabled"
                v-model="vehicle._id"
              />
              <div class="invalid-feedback">
                Please specify your vehicle' VIN.
              </div>
            </div>
          </div>
          <div class="pt-3 d-grid gap-2 d-flex justify-content-between">
            <button
              class="btn btn-secondary w-50"
              type="button"
              data-bs-dismiss="modal"
            >
              Close</button
            ><button
              class="btn btn-primary w-50"
              type="button"
              @click.prevent="onNewVehicleSubmitted"
            >
              Submit
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

//function needed because vehicles backend returns a non-standard format (array if size>1 and object if size == 1)
function convertToArrayIfNotAlready(possibleArray) {
  return !Array.isArray(possibleArray) ? [possibleArray] : possibleArray;
}

export default {
  components: {},
  props: {
    /* forse i vehicles per fare un po di client side validation altrimenti la faccio con axios
    in autonomia da qui*/
  },
  data() {
    return {
      yearDisabled: true,
      makeDisabled: true,
      modelDisabled: true,
      seriesDisabled: true,
      vinDisabled: true,
      isValid: true,
      domain: {
        years: [],
        makes: [],
        models: [],
        series: [],
        vid: "",
      },
      vehicle: {
        year: "",
        make: "",
        model: "",
        series: "",
        //---------actually used by backend------------
        _id: "", //the so-called vin
        pictureUri: "",
        userId: "",
        //retired,  //not needed as default in mongoose
        //---------------------------------------------
      },
    };
  },
  methods: {
    getYears: async function () {
      console.log("getting years in vehicle registration form");
      //axios.get(url, options)
      axios
        .get(`vehicles/vehiclesModels/productionYears`)
        .then((result) => {
          console.log("data arrived (for years):", result.data);
          this.domain.years = result.data.menuItem;

          console.log("years arrived:", this.domain.years);
        })
        .catch((err) => console.error(err));
    },
    getMakesOfYear: async function (year) {
      console.log("getting makes in vehicle registration form");
      //axios.get(url, options)
      axios
        .get(`vehicles/vehiclesModels/makes`, {
          params: {
            year: year,
          },
        })
        .then((result) => {
          console.log("data arrived (for makes):", result.data);
          this.domain.makes = convertToArrayIfNotAlready(result.data.menuItem);
          /*console.log("makes arrived2 :", this.domain.makes);
          console.log(
            "type of result.data.menuitem is",
            Array.isArray(result.data.menuItem)
          );*/
        })
        .catch((err) => console.error(err));
      //handle error by replying it to user in alert or year field
    },
    getModelsOfYearAndMake: async function (year, make) {
      console.log("getting models in vehicle registration form");
      //axios.get(url, options)
      axios
        .get(`vehicles/vehiclesModels/models`, {
          params: {
            year: year,
            make: make,
          },
        })
        .then((result) => {
          console.log("data arrived (for models):", result.data);
          this.domain.models = convertToArrayIfNotAlready(result.data.menuItem);
          console.log("mdoels arrived:", this.domain.models);
        })
        .catch((err) => console.error(err));
      //handle error by replying it to user in alert or year field
    },
    getSeriesOfYearMakeAndModel: async function (year, make, model) {
      console.log("getting series in vehicle registration form");
      //axios.get(url, options)
      axios
        .get(`vehicles/vehiclesModels/series`, {
          params: { year: year, make: make, model: model },
        })
        .then((result) => {
          this.domain.series = convertToArrayIfNotAlready(result.data.menuItem);
          console.log("series arrived:", this.domain.series);
        })
        .catch((err) => console.error(err));
    },
    //------------ event handlers ----------------
    onYearInput: function (e) {
      this.getMakesOfYear(e.target.value); //use e.target.value because this.vehicle.year is not assigned yet as my input handler is called before the input handler of v-model
      this.makeDisabled = false; //enable next option
    },
    onMakeInput: function (e) {
      console.log(
        "searching models with year:",
        this.vehicle.year,
        "and make:",
        this.vehicle.make
      );
      this.getModelsOfYearAndMake(this.vehicle.year, e.target.value);
      this.modelDisabled = false;
    },
    onModelInput: function (e) {
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
      this.seriesDisabled = false;
    },
    onSeriesInput: function (e) {
      this.vinDisabled = false;
    },
    onNewVehicleSubmitted: function (e) {
      console.log("submitting to backend");
      //-----client-side validation (could also be made on input event)-----------
      //this.isValid = this.refs.addVehicleForm.checkValidity();
      //if ()
      //cannot add same vin twice
      //--------------------------------------
      //-----server-side validation-----------
      //--------------------------------------
      //sending only the userId-vehicleModelId pair
    },
  },
  mounted() {
    console.log("ciao");
    this.getYears();
  },
};

/*getDetailsOfVehicleId: async function (vehicleId) {
      console.log("getting vehicle details in vehicle registration form");
      //axios.get(url, options)
      axios
        .get(`vehicles/vehiclesModels/vehicleDetails/${vehicleId}`)
        .then((result) => {
          this.domain.makes = result.data.menuItem.map(
            (textValue) => textValue.value
          );
          console.log("vehicle details arrived:", years);
        })
        .catch((err) => console.error(err));*/
</script>

<style scoped></style>
