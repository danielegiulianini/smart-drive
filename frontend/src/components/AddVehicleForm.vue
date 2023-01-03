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
      console.log("the vehicle in onValidFormSubmit of add vehicle form")
      console.log("axios post");
      this.isSubmitting = true;
      const loggedInUser = this.$store.getters.getUser;
      axios
        .post(`vehicles/userVehicles/`, {
          _id: vehicle._id, //the so-called vin
          pictureUri: vehicle.pictureUri,
          vehicleModelId: vehicle.series,
          userId: loggedInUser,
        })
        //redirect to vehicle detail page TODO
        //.then(() => this.$router.push({ name: "VehicleDetail" }))
        //.then(() => (this.success = true))
        .catch((err) => {
          //maybe a mapping (to a more user-friendly error) could be added here
          //possible errors: network-related
          this.overallError = err;
        })
        .finally(() => (this.isSubmitting = false));
    },
  },
};
</script>

<style scoped></style>
