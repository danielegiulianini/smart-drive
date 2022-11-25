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

        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">My Trips</li>
          </ol>
        </nav>
      </div>
      <!-- End Page Title -->
    </div>

    <!-- garage summary -->
    <div class="card p-1 mb-3">
      <div class="d-flex justify-content-between m-2">
        <div class="d-flex my-auto">
          <span><i class="bi bi-speedometer2"></i> 3 vehicles</span>
          <small class="text-muted"> | </small>
          <span><i class="bi bi-car-front"></i> 3 km </span>
          <small class="text-muted"> | </small>
          <span><i class="bi bi-clock"></i>1h22 mins</span>

          <!--<div>Total: 3 vehicles</div>-->
        </div>
        <div>
          <button
            class="btn btn-light d-none d-lg-block"
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
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Active
              </button>
            </h2>

            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div
                  class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 g-4"
                >
                  <VehicleCard></VehicleCard>
                  <VehicleCard></VehicleCard>
                  <VehicleCard></VehicleCard>
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
                Rtirati
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
                  <VehicleCard></VehicleCard>
                  <VehicleCard></VehicleCard>
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
import MobileAddVehicleButton from "../MobileAddVehicleButton.vue";

export default {
  components: {
    TheAppHeader,
    TheAppSidebar,
    TheAppFooter,
    TheAppMobileNavbar,
    VehicleCard,
  },
};
</script>

<style>
.btn-circle.btn-md {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
.page-header {
  padding: 20px;
  background-color: white; /* ghostwhite;*/
  border-radius: 10px;
}
</style>
