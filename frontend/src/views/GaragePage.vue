<template>
  <TheAppHeader></TheAppHeader>
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
    <!--FOR DEBUGGING ====-->
    current active breakpoint:
    <div class="d-block d-sm-none">xs</div>
    <div class="d-none d-sm-block d-md-none">sm</div>
    <div class="d-none d-md-block d-lg-none">md</div>
    <div class="d-none d-lg-block d-xl-none">lg</div>
    <div class="d-none d-xl-block">xl</div>
    <!--==================-->
    <div class="d-flex justify-content-between">
      <div class="pagetitle">
        <h1>My Garage</h1>

        <!--  <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">My Trips</li>
          </ol>
        </nav>-->
      </div>
      <!-- End Page Title -->
    </div>

    <!-- garage summary -->
    <div class="card p-1 mb-3">
      <div class="d-flex justify-content-between m-2">
        <div class="d-flex my-auto">
          <span
            ><i class="bi bi-speedometer2"></i>
            {{ userVehicles.length }} vehicles</span
          >
          <small class="text-muted"> | </small>
          <span><i class="bi bi-car-front"></i> 3 km </span>
          <small class="text-muted"> | </small>
          <span><i class="bi bi-clock"></i>1h22 mins</span>
        </div>
        <div>
          <!-- desktop add vehicle button-->
          <button
            class="btn btn-light d-none d-sm-block"
            type="button"
            style="border-color: gray"
          >
            Add a vehicle
          </button>
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
                  class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4"
                >
                  <!-- :key is a low-level hint for Vue -->
                  <!-- _id is the _id of userVehicle (not of vehicleModel)-->
                  <VehicleCard
                    v-for="(vehicle, index) in activeUserVehicles"
                    :key="vehicle._id"
                    :_id="vehicle._id"
                    :make="vehicle.make"
                    :model="vehicle.model"
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
                    :make="vehicle.make"
                    :model="vehicle.model"
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
  <MobileAddVehicleButton></MobileAddVehicleButton>
  <TheAppMobileNavbar></TheAppMobileNavbar>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import VehicleCard from "../components/VehicleCard.vue";
import MobileAddVehicleButton from "../components/MobileAddVehicleButton.vue";
import axios from "axios";

import makesLogosData from "../assets/data.json"; //vehicle-make's logos

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    VehicleCard,
    MobileAddVehicleButton,
  },
  data() {
    return {
      userVehicles: [
        {
          _id: "ciao",
          make: "Fiat",
          model: "panda",
          makeLogoImgUrl: "",
          comb08: "89",
          fuelType: "diesel",
          trany: "Automatic",
        },
      ],
      //not reactive data:
      makeLogoImgUrlByMake: makesLogosData //reducing creates a data structure optimized for access (more efficient than makesLogosData)
        .reduce(function (result, item, index, array) {
          result[item.name] = item.image.source;
          return result;
        }, {}),
    };
  },
  computed: {
    /* this works? :
    activeUserVehicles: userVehicles.filter((vehicle) => !vehicle.retired),
    ritiredUserVehicles: userVehicles.filter((vehicle) => vehicle.retired),
    vehiclesCount: userVehicles.length,*/
    activeUserVehicles() {
      return this.userVehicles.filter((vehicle) => !vehicle.retired);
    },
    ritiredUserVehicles() {
      return this.userVehicles.filter((vehicle) => vehicle.retired);
    },
    activeUserVehiclesCount() {
      return this.userVehicles().length;
    },
    ritiredUserVehiclesCount() {
      return this.ritiredUserVehicles().length;
    },
  },
  methods: {
    onNewVehicleSubmit(event) {
      //maybe to move in separate form/modal component
      //-----client-side validation (could also be made on input event)-----------
      //cannot add same vin twice
      //--------------------------------------
      //-----server-side validation-----------
      //--------------------------------------
      const loggedInUserId = 12; //this.$store.state.user.id; TODO
      axios
        .get(`vehicles/userVehicles?userId=${loggedInUserId}`)
        .then((result) => {
          const userVehicles = result.data;
          const promises = userVehicles.map((userVehicle) => {
            return axios
              .get(
                `vehicles/vehiclesModels/vehicleDetails/${userVehicle.vehicleModelId}`
              ) //retrieving vehicles details
              .then((res) => {
                res.data;
              });
          });
          /*Promise.all(promises)
            .then((usersVehicleWithModelDetails) => {
              console.log(usersVehicleWithModelDetails);
              this.userVehicles = usersVehicleWithModelDetails;
            })
            .catch((err) => {
              throw err; //rethrowing a error
            });*/
        })
        .catch((err) => console.error(err)); //communicate something to user?
    },
  },
  mounted() {
    console.log("makes logo data is: ", this.makeLogoImgUrlByMake);
    console.log("l'url della fiat is:", this.makeLogoImgUrlByMake["Fiat"]);
    //fetch all the vehicles of the user from vehicles microservice and pass as props to vehicle cards!
    //manually joining userVehicles and vehicleModels here
    const loggedInUserId = 12; //this.$store.state.user.id;
    axios
      .get(`vehicles/userVehicles?userId=${loggedInUserId}`)
      .then((result) => {
        //fetching (in parallel) all uservehicles details
        const userVehicles = result.data;
        console.log("cio che mi riorna il backend is: ", result.data);
        const promises = userVehicles.map((userVehicle) =>
          axios
            .get(
              `vehicles/vehiclesModels/vehicleDetails/${userVehicle.vehicleModelId}`
            ) //retrieving vehicles details
            .then((res) => res.data)
            .catch((error) => console.log(error))
        );
        Promise.all(promises)
          //assigning make url
          .then((usersVehiclesWithModelDetails) =>
            usersVehiclesWithModelDetails.map(
              (userVehicle) =>
                (userVehicle.makeLogoImgUrl =
                  this.makeLogoImgUrlByMake[userVehicle.make])
            )
          )
          //assigning to data
          .then((usersVehiclesWithModelDetails) => {
            console.log(usersVehiclesWithModelDetails);
            this.userVehicles = usersVehiclesWithModelDetails;
          })
          .catch((err) => {
            throw err; //re-throwing a error
          });
      })
      .catch((err) => console.error(err)); //communicate something to user (with a mre user-friendly mapping?)*/
  },
};
</script>

<style scoped></style>
