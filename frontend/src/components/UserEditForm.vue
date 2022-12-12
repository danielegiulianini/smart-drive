<template>
  <UserForm
    submitButtonName="Edit profile"
    :display-accept-terms="false"
    :display-login="false"
    @validatedFormSubmit="onValidFormSubmit"
    :is-submitting="isSubmitting"
  ></UserForm>
</template>

<script>
import UserForm from "./UserForm.vue";
import axios from "axios";

export default {
  components: { UserForm },
  props: { initialUser: Object },
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    onValidFormSubmit(event, user) {
      console.log("submitting to backend");
      this.isSubmitting = true;

      axios
        .post(`users/${this.$store.user.id}`, {
          name: user.name,
          surname: user.surname,
          email: user.email,

          city: user.city,
          country: user.country,
          profilePictureUri: user.profilePictureUri,

          //^^^optional^^^
          gender: user.gender,
          language: user.language,
          //^^^^^^^^^^^^^^^^^
        })
        //.then(() => this.$router.push("/Profile"))
        .catch((err) => {
          //a mapping (to a more user-friendly error) could be added here (leveraging status codes returned by servers)
          //possible errors: network-related
          this.overallError = err;
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>

<style scoped></style>
