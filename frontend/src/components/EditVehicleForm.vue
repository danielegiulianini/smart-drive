<template>
  <VehicleForm
    submitButtonName="Edit"
    :overallError="overallError"
    :is-submitting="isSubmitting"
    @validatedFormSubmit="onValidFormSubmit"
  ></VehicleForm>
</template>

<script>
import VehicleForm from "./VehicleForm.vue";
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
    onValidFormSubmit(event, vehicle) {
      console.log("axios post");
      this.isSubmitting = true;
      const loggedInUser = this.$store.getters.getUser();
      axios
        .post(`vehicles/userVehicles/${vehicle._id}`, {
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
