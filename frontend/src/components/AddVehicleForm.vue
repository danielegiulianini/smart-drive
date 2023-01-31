<template>
  <VehicleForm
    submitButtonName="Add"
    :overallError="overallError"
    :is-submitting="isSubmitting"
    @validatedFormSubmit="onValidFormSubmit"
  ></VehicleForm>
</template>

<script>
import VehicleForm from "../components/VehicleForm.vue";
import axios from "axios";

export default {
  components: { VehicleForm },
  data() {
    return {
      isSubmitting: false,
      overallError: "",
    };
  },
  methods: {
    //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
    onValidFormSubmit(vehicle) {
      this.isSubmitting = true;
      const loggedInUserId = this.$store.getters.getUser.id;
      const requestObj = {
        _id: vehicle._id, //the so-called vin
        pictureUri: vehicle.pictureUri,
        vehicleModelId: vehicle.series,
        userId: loggedInUserId,
      };
      axios
        .post(`vehicles/userVehicles/`, requestObj)
        .then(() => this.$router.push(`/vehicle/${vehicle._id}`))
        .then(() => (this.success = true))
        .catch((err) => {
          //maybe a mapping (to a more user-friendly error) could be added here
          //possible errors: network-related
          console.log("error happened while posting new vehicle");
          this.overallError = err;
        })
        .finally(() => (this.isSubmitting = false));
    },
  },
};
</script>

<style scoped></style>
