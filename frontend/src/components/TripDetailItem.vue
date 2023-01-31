<template>
  <li class="list-group-item d-flex justify-content-between align-middle">
    <div class="mx-auto text-center">
      <span class="card-text text-bf" style="font-size: 110%">{{
        itemValue
      }}</span>
      <div class="card-text text-muted text-center" style="font-size: 90%; line-height:95%">
        {{ label }}
      </div>
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
