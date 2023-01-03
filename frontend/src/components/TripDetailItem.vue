<template>
  <li class="list-group-item d-flex justify-content-between align-middle">
    <div class="mx-auto">
      <span
        class="card-text text-muted pe-1 text-center"
        style="line-height: 50%; font-size: 90%"
        >{{ label }}</span
      ><span class="card-text text-bf" style="font-size: 110%">{{
        itemValue
      }}</span
      ><!--v-if-->
    </div>
  </li>
</template>

<script>
export default {
  props: {
    label: { required: true },
    itemValue: { required: true },
  },
};
</script>
