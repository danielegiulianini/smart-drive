<template>
  <i
    class="bi bi-question-circle ps-2"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    data-html="true"
    :title="content"
    ref="info"
  >
  </i>
</template>

<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  props: ["content"],
  mounted() {
    new Tooltip(this.$refs.info);
  },
};
</script>
