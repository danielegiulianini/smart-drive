<template>
  <!--this is the modal used by the app (no header, title and footer)-->
  <button
    id="desktop-button"
    type="button"
    class="btn btn-light ms-2"
    data-bs-toggle="modal"
    data-bs-target="#addVehicleModal"
  >
    Edit
  </button>
  <i
    id="mobile-button"
    class="mybtn bi bi-pencil ps-2"
    style="font-size: 150%; color: #aab7cf"
    data-bs-target="#addVehicleModal"
    data-bs-toggle="modal"
  ></i>


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
          <div class="modal-body"><EditVehicleForm></EditVehicleForm></div>
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
import EditVehicleForm from "./EditVehicleForm.vue";

export default {
  components: { EditVehicleForm },
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
}
</style>
