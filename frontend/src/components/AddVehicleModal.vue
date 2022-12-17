<template>
  <!--desktop button-->
  <button
    type="button"
    class="btn btn-light"
    id="desktop-button"
    data-bs-toggle="modal"
    data-bs-target="#addVehicleModal"
  >
    Add Vehicle
  </button>
  <!-- mobile button-->
  <!--<i
    id="mobile-button"
    class="mybtn bi bi-plus-circle"
    style="font-size: 250%; color: #aab7cf"
    data-bs-target="#addVehicleModal"
    data-bs-toggle="modal"
  ></i>-->

  
  <!--<button id="btndisclaimer" class="btn btn-light btn-circle btn-circle-xl m-1">
    <i class="fa fa-plus" style="font-size:150%"></i>
  </button>-->
  <button id="btndisclaimer" class="btn btn-light btn-circle btn-circle-xl m-1">
    <i class="fa fa-plus"></i>
  </button>
  <!-- Modal -->
  <teleport to="body">
    <div
      class="modal fade"
      id="addVehicleModal"
      tabindex="-1"
      aria-labelledby="addVehicleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!--<div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>-->
          <div class="modal-body"><AddVehicleForm></AddVehicleForm></div>
          <!--<div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>-->
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import AddVehicleForm from "./AddVehicleForm.vue";

export default {
  components: { AddVehicleForm },
};
</script>

<style scoped>
/*on screens that are 600 px or less*/
@media screen and (max-width: 600px) {
  #desktop-button {
    display: none;
  }
}
/*on screens that are 600 px or more*/
@media screen and (min-width: 600px) {
  #mobile-button {
    display: none;
  }
}

.mybtn:hover {
  cursor: pointer;
}

.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

.btn-circle i {
  position: relative;
  top: -1px;
  color: #012970;

}

.btn-circle-sm {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 0.9rem;
}

.btn-circle-lg {
  width: 55px;
  height: 55px;
  line-height: 55px;
  font-size: 1.1rem;
}

.btn-circle-xl {
  width: 70px;
  height: 70px;
  line-height: 70px;
  font-size: 1.3rem;
}
/*
.btn-circle i {
  position: relative;
  top: 3px;
}

.btn-circle-xl {
  width: 85px;
  height: 85px;
  line-height: 85px;
  font-size: 1.3rem;
  z-index:100000;
}

#btndisclaimer {
  position: fixed;
  right: 10px;
  bottom: 70px;
}*/
#btndisclaimer {
  position: fixed;
  right: 10px;
  bottom: 70px;
  z-index:1000;
  border-color:   #012970;
border-width: 2px;
}
</style>
