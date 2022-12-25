<template>
  <div>
    <div style="font-size: 200%; line-height: 90%" class="pt-4">10000.00</div>
    <div class="text-muted text-center" style="font-size: 105%">km</div>
    <!--&lt;Vue3Odometer :value=&quot;num&quot; /&gt;-->
  </div>
</template>

<script>
export default {
  props: {
    rpm: {
      required: true,
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
