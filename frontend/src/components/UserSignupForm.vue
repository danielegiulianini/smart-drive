<template>
  <UserForm
    submitButtonName="Create Account"
    :display-accept-terms="true"
    :display-login="true"
    :is-submitting="isSubmitting"
    :overallError="overallError"
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
      overallError: "",
    };
  },
  methods: {
    //axios' ajax call to 1. supabase and 2. users' microservice; (in sequence)
    onValidFormSubmit(user) {
      console.log("submitting to backend");
      console.log("lo user to submit is (in UsersignupForm): ", user);
      this.isSubmitting = true;
      this.$store
        .dispatch("register", {
          email: user.email,
          password: user.password,
        })
        .then(
          (
            supabaseUser //supabase user here
          ) =>
            axios.post(`users`, {
              tokenUserId: supabaseUser.id, //id is a supabase property

              name: user.firstName,
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
        .then(() => this.$router.push("/Profile"))
        .catch((err) => {
          console.log("error happened!");
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
