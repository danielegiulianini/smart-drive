<template>
  <!-- desktop button-->
  <button
    id="desktop-button"
    type="button"
    class="btn bg-light"
    data-bs-toggle="modal"
    data-bs-target="#deleteVehicleModal"
  >
    Delete
  </button>
  <!-- mobile button-->
  <i
    id="mobile-button"
    class="mybtn bi bi-trash3-fill"
    style="font-size: 150%; color: #aab7cf"
    data-bs-target="#deleteVehicleModal"
    data-bs-toggle="modal"
  ></i>

  <!-- Modal -->
  <teleport to="body">
    <div
      class="modal fade"
      id="deleteVehicleModal"
      tabindex="-1"
      aria-labelledby="deleteVehicleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Deleting vehicle</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete the vehicle?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  method: {
    deleteVehicle: function () {
      console.log("ciao");
      //ajax call for removing vehicle...
    },
  },
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
</style>
