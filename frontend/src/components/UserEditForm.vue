<template>
  <UserForm
    submitButtonName="Edit profile"
    :display-accept-terms="false"
    :display-login="false"
    @validatedFormSubmit="onValidFormSubmit"
    :is-submitting="isSubmitting"
    :surname="initialUser.firstName"
    :email="initialUser.email"
    :first-name="initialUser.surname"
    :profilePictureUri="initialUser.profilePictureUri"
    :city="initialUser.city"
    :country="initialUser.country"
  ></UserForm>
</template>

<script>
import UserForm from "./UserForm.vue";
import axios from "axios";

export default {
  components: { UserForm },
  props: {
    initialUser: Object,
    //must use singular props here
  },
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    onValidFormSubmit(user) {
      this.isSubmitting = true;
      axios
        .post(`users/${this.$store.getters.getUser.id}`, {
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
        .then(() => {
          //display notification or infobox
          this.$notification.show(
            //this.success = true;
            "Success",
            {
              body: "Profile correctly updated!",
            },
            {}
          );
          //this.$router.push("Profile").then(() => this.$router.go()) 
          //pro of this: it updates profile page data (otherwise not updated)
          //cons: it requires authentication
        })
        .catch((err) => {
          //a mapping (to a more user-friendly error) could be added here (leveraging status codes returned by servers)
          //possible errors: network-related
          //display notification or infobox
          this.$notification.show(
            "Error",
            {
              body: "Errors in profile update!",
            },
            {}
          );
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
