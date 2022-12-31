<template>
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="bordered-justified-home"
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    <div class="card p-2 m-2" style="box-shadow: none">
      <div class="card-body">
        <!-- Accordion without outline borders -->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                <h1 style="font-size: 120%; font-family: Poppins, sans-serif">
                  Overview
                </h1>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <!-- could have used a v-for if using array instead of object for vehicle's properties-->
                <ul class="list-group list-group-flush">
                    <TripDetailItem
                      label="year"
                      :itemValue="overview.year"
                    ></TripDetailItem>

                    <TripDetailItem
                      label="make"
                      :itemValue="overview.make"
                    ></TripDetailItem>
                    <TripDetailItem
                      label="model"
                      :itemValue="overview.model"
                    ></TripDetailItem>

                    <TripDetailItem
                      label="cylinders"
                      :itemValue="overview.cylinders"
                    ></TripDetailItem>
                    <TripDetailItem
                      label="trany"
                      :itemValue="overview.trany"
                    ></TripDetailItem>

                    <TripDetailItem
                      label="drive"
                      :itemValue="overview.drive"
                    ></TripDetailItem>
                    <TripDetailItem
                      label="EPA vehicle size class"
                      :itemValue="overview.VClass"
                    ></TripDetailItem>

                    <TripDetailItem
                      label="startStop"
                      :itemValue="overview.startStop"
                    ></TripDetailItem>
                    <TripDetailItem
                      label="Vehicle identification number"
                      :itemValue="overview.vin"
                    ></TripDetailItem>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <div style="font-size: 120%" class="fw-bold">Fuel-related</div>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample2"
            >
              <ul class="list-group list-group-flush">
                <!--

                  this.overview.barrels08 = vehicleModel.barrels08; //for fuel type 1
        this.overview.comb08 = vehicleModel.comb08;
        this.overview.highway08 = vehicleModel.highway08;
        this.overview.city08 = vehicleModel.city08;
        this.overview.fuelType = vehicleModel.fuelType;
        this.overview.fuelCost08 = vehicleModel.fuelCost08; //annual (based on 15,000 miles) fuel cost (for fuel type 1)
        this.overview.youSaveSpend = vehicleModel.youSaveSpend;
                -->
                  <TripDetailItem
                    label="Combined Miles Per Gallon"
                    :itemValue="overview.comb08"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="Miles Per Gallon for highways"
                    :itemValue="overview.highway08"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="Miles Per Gallon for city"
                    :itemValue="overview.city08"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="fuel Type"
                    :itemValue="overview.fuelType"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="Estimated annual fuel cost"
                    :itemValue="overview.fuelCost08"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="startStop"
                    :itemValue="overview.startStop"
                  ></TripDetailItem>
                  <TripDetailItem
                    label="save/spend in 5 years compared to an average car ($)"
                    :itemValue="overview.youSaveSpend"
                  ></TripDetailItem>
              </ul>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                <div style="font-size: 120%" class="fw-bold">Emissions</div>
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample3"
            >
              <ul class="list-group list-group-flush">
                  <TripDetailItem
                    label="tailpipe CO2 in grams/mile"
                    :itemValue="overview.co2"
                  ></TripDetailItem>

                  <TripDetailItem
                    label="tailpipe CO2 in grams/mile"
                    :itemValue="overview.co2TailpipeGpm"
                  ></TripDetailItem>
              </ul>
              <!--end first col-->
            </div>
          </div>
        </div>
        <!-- End Accordion without outline borders -->
      </div>
      <!-- End of card body -->
    </div>
  </div>
</template>

<script>
import TripDetailItem from "./TripDetailItem.vue";
export default {
  inheritAttrs: false,
  components: { TripDetailItem },
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    overview: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
