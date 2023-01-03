<template>
  <div>
    <span
      class="card-text text-muted pe-1"
      style="line-height: 50%; font-size: 90%"
      v-if="!right"
    >
      {{ label }}
    </span>
    <span class="card-text text-bf" style="font-size: 110%">{{ value }}</span>
    <span
      class="card-text text-muted ps-1"
      style="line-height: 50%; font-size: 90%"
      v-if="right"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: { required: true },
    value: { required: true }, //assumptions all default values are set to zero
    right: { default: false },
  },
};
</script>
