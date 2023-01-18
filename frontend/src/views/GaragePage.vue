<template>
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
   
    <Spinner :show="isLoading"></Spinner>

    <div class="d-flex justify-content-between">
      <div class="pagetitle">
        <h1>My Garage</h1>
      </div>
      <!-- End Page Title -->
    </div>

    <!-- garage summary -->
    <div class="card p-1 mb-3">
      <div class="d-flex justify-content-between m-2 px-2">
        <div class="my-auto">
          <span> {{ userVehicles.length }}</span>
          <small class="text-muted"> vehicles </small>
        </div>
        <div class="my-auto">
          <span> {{ activeUserVehicles.length }}</span>
          <small class="text-muted"> active </small>
        </div>
        <div class="my-auto">
          <span> {{ ritiredUserVehicles.length }}</span>
          <small class="text-muted"> ritired </small>
        </div>
        <div>
          <AddVehicleModal></AddVehicleModal>
        </div>
      </div>
    </div>
    <!-- end of garage summary -->

    <!-- start of card with accordion-->
    <div class="card">
      <div class="card-body">
        <!-- version 3-->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header d-flex" id="flush-headingOne">
              <button
                class="accordion-button collapsed card-title"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                Active
              </button>
            </h2>

            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div
                  class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xxl-3 g-4"
                >
                  <!-- :key is a low-level hint for Vue -->
                  <!-- _id is the _id of userVehicle (not of vehicleModel)-->
                  <VehicleCard
                    v-for="(vehicle, index) in activeUserVehicles"
                    :key="vehicle._id"
                    :_id="vehicle._id"
                    :createdAt="vehicle.createdAt"
                    :make="vehicle.make"
                    :model="vehicle.model"
                    :pictureUri="vehicle.pictureUri"
                    :makeLogoImgUrl="makeLogoImgUrlByMake[vehicle.make]"
                    :year="vehicle.year"
                    :comb08="vehicle.comb08"
                    :fuelType="vehicle.fuelType"
                    :trany="vehicle.trany"
                  ></VehicleCard>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed card-title"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Retired
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div
                  class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4"
                >
                  <VehicleCard
                    v-for="(vehicle, index) in ritiredUserVehicles"
                    :key="vehicle._id"
                    :_id="vehicle._id"
                    :createdAt="vehicle.createdAt"
                    :make="vehicle.make"
                    :model="vehicle.model"
                    :pictureUri="vehicle.pictureUri"
                    :makeLogoImgUrl="makeLogoImgUrlByMake[vehicle.make]"
                    :year="vehicle.year"
                    :comb08="vehicle.comb08"
                    :fuelType="vehicle.fuelType"
                    :trany="vehicle.trany"
                  ></VehicleCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import VehicleCard from "../components/VehicleCard.vue";
import Spinner from "../components/Spinner.vue";
import axios from "axios";
import makesLogosData from "../assets/data.json"; //vehicle-make's logos
import AddVehicleModal from "../components/AddVehicleModal.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    VehicleCard,
    Spinner,
    AddVehicleModal,
  },
  data() {
    return {
      showModalNow: false,
      isLoading: true,
      userVehicles: [],
      //not reactive data:
      makeLogoImgUrlByMake: makesLogosData //reduce creates a data structure optimized for access (more efficient than makesLogosData)
        .reduce(function (result, item, index, array) {
          result[item.name] = item.image.source;
          return result;
        }, {}),
    };
  },
  computed: {
    activeUserVehicles() {
      return this.userVehicles.filter((vehicle) => !vehicle.retired);
    },
    ritiredUserVehicles() {
      return this.userVehicles.filter((vehicle) => vehicle.retired);
    },
    activeUserVehiclesCount() {
      return this.userVehicles.length;
    },
    ritiredUserVehiclesCount() {
      return this.ritiredUserVehicles.length;
    },
  },
  methods: {},
  mounted() {
    //fetch all the vehicles of the user from vehicles microservice and pass as props to vehicle cards!
    //manually joining userVehicles and vehicleModels here
    const loggedInUserId = this.$store.state.users.user.id; //or with vuex getter
    axios
      .get(`vehicles/userVehicles?userId=${loggedInUserId}`)
      .then((result) => {
        if (result.data && result.data.length > 0) {
          //fetching (in parallel) all uservehicles details
          const userVehicles = result.data;
          console.log("data from userVehicles:", result.data);

          const richUserVehicles = userVehicles.map((userVehicle) =>
            axios
              .get(
                `vehicles/vehiclesModels/vehicleDetails/${userVehicle.vehicleModelId}`
              ) //retrieving vehicles details
              .then((res) => {
                console.log("vehicle detail for this vehicle:", res.data);
                //could merge with object.assign
                res.data._id = userVehicle._id;
                res.data.pictureUri = userVehicle.pictureUri;
                res.data.createdAt = userVehicle.createdAt;

                return res.data;
              })
              .catch((error) => console.log(error))
          );

          return Promise.all(richUserVehicles)
            //assigning make url
            .then((usersVehiclesWithModelDetails) =>
              usersVehiclesWithModelDetails.map((userVehicle) => {
                userVehicle.makeLogoImgUrl =
                  this.makeLogoImgUrlByMake[userVehicle.make];
                return userVehicle;
              })
            )
            //assigning to data for displaying in view
            .then((usersVehiclesWithModelDetails) => {
              console.log(usersVehiclesWithModelDetails);
              this.userVehicles = usersVehiclesWithModelDetails;
            })
            .catch((err) => {
              throw err; //re-throwing a error
            });
        } else return Promise.resolve();
      })
      .catch((err) => console.error(err)) //communicate something to user (with a mre user-friendly mapping?)
      .finally(() => (this.isLoading = false));
  },
};
</script>
