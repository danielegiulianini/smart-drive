<template>
  <button
    @click="onButtonClicked"
    :class="{ clicked: clicked, notClicked: !clicked }"
    id="driveButton"
    type="button"
    class="acceso"
    style="font-size: 120%;
      border-radius: 100%;
      width: 100px;
      height: 100px;
      border-width: 2px;
      z-index: 99 !important;
      border: solid;
    "
  >
    <div class="d-flex justify-content-center align-middle">
      <span
        class="mt-2 spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="spin"
      ></span>
      <div class="fw-bold" style="margin-bottom: -8px">
        {{ driveButtonName }}
      </div>
    </div>
    <small style="font-size: 70%">drive</small>
  </button>
</template>

<style scoped>
#driveButton.notClicked {
  background-color: #efefef;
  border-color: #012970;
  color: #012970;
}
#driveButton.clicked {
  background-color: #012970;
  border-color: #efefef;
  color: #efefef;
}

#driveButton.clicked:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
#driveButton.notClicked:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>

<script>
export default {
  methods: {
    onButtonClicked() {
      this.clicked = true;
    },
  },
  data() {
    return {
      clicked: false,
    };
  },
  props: {
    driveButtonName: { required: true },
    spin: { default: false },
  },
};
</script>
