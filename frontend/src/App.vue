<script>
import TheAppHeader from "./components/TheAppHeader.vue";
import TheAppFooter from "./components/TheAppFooter.vue";

export default {
  components: {
    TheAppHeader,
    TheAppFooter,
  },
};
</script>

<template>
  <!-- including a singleton header (in all pages excepting signup and login,
   for not deceiving replicated notifications)-->
  <AppHeader
    class="mt-5"
    v-if="
      !$route.name ||
      !(
        $route.name == '' ||
        $route.name == 'signup' ||
        $route.name == 'login' ||
        $route.name == 'not-found'
      )
    "
  >
  </AppHeader>
  <router-view></router-view>
</template>

<style scoped></style>
