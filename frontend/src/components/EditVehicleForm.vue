<template>
  <VehicleForm
    submitButtonName="Edit"
    :overallError="overallError"
    :is-submitting="isSubmitting"
    :make="initialVehicle.make"
    :year="initialVehicle.year"
    :pictureUri="initialVehicle.pictureUri"
    :_id="initialVehicle._id"
    :retired="initialVehicle.retired"
    :model="initialVehicle.model"
    :series="initialVehicle.series"
    :edit="true"
    @validatedFormSubmit="onValidFormSubmit"
  ></VehicleForm>
</template>

<script>
import VehicleForm from "./VehicleForm.vue";
import axios from "axios";

export default {
  components: { VehicleForm },
  props: {
    initialVehicle: {
      type: Object,
    },
    year: {
      type: String,
    },
  },
  data() {
    return {
      isSubmitting: false,
      overallError: "",
    };
  },
  methods: {
    //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
    onValidFormSubmit(vehicle) {
      console.log("axios post in user edit");
      this.isSubmitting = true;
      const loggedInUser = this.$store.getters.getUser;
      axios
        .post(`vehicles/userVehicles/${vehicle._id}`, {
          pictureUri: vehicle.pictureUri,
          vehicleModelId: vehicle.series,
          userId: loggedInUser,
        })
        .then(() => {
          //display notification or infobox
          this.$notification.show(
            //this.success = true;
            "Success",
            {
              body: "Vehicle correctly updated!",
            },
            {}
          );
        })
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          //maybe a mapping (to a more user-friendly error) could be added here
          //possible errors: network-related
          //display notification or infobox
          this.$notification.show(
            "Error",
            {
              body: "Errors in vehicle edit!",
            },
            {}
          );
          this.overallError = err;
        })
        .finally(() => (this.isSubmitting = false));
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
