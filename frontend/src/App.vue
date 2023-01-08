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
  <TheAppHeader></TheAppHeader>
  <router-view></router-view>
</template>

<style scoped></style>
