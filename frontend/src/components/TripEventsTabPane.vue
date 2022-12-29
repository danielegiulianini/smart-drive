<template>
  <!-- QUI INIZIA IL secondo (graph) TAB pane-->
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="bordered-justified-contact2"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <div class="card pt-2" style="box-shadow: none">
      <div class="card-body text-center">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
          style="height: 300px"
        >
          <h1 style="font-size: 150%">No events recorded for this trip</h1>
          <p class="text-muted">Drive with the app to see your events.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {},
};
</script>
