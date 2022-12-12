<template>
  <UserForm
    submitButtonName="Create Account"
    :display-accept-terms="true"
    :display-login="true"
    :is-submitting="isSubmitting"
    @validatedFormSubmit="onValidFormSubmit"
  ></UserForm>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import axios from "axios";

export default {
  components: { UserForm },
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {      //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)

    onValidFormSubmit(event, user) {
      console.log("submitting to backend");
      this.isSubmitting = true;
      this.$store
        .register({
          email: user.email,
          password: user.password,
        })
        .then(
          (
            user //supabase user here
          ) =>
            axios.post(`users`, {
              tokenUserId: user.id, //id is a supabase property

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
        )
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
  mounted() {},
};
</script>

<style scoped></style>
