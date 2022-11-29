<template>
  <div
    class="p-3 d-grid gap-2 d-flex justify-content-between step-wrapper"
    :class="stepWrapperClass"
  >
    <button
      class="btn btn-primary w-50"
      type="button"
      @click="lastStep"
      :disabled="firststep"
    >
      <!--style="width:100px"-->
      Back
    </button>
    <button
      class="btn btn-primary w-50"
      type="button"
      @click="nextStep"
      v-if="!laststep"
    >
      <!--style="width:100px"-->
      Next
    </button>
    <button type="submit" class="btn btn-primary w-50" v-if="laststep">
      Submit
    </button>
  </div>

  <!--
  <div class="step-wrapper" :class="stepWrapperClass">
    <button
      type="button"
      class="btn btn-primary"
      @click="lastStep"
      :disabled="firststep"
    >
      Back
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="nextStep"
      :disabled="laststep"
    >
      Next
    </button>
    <button type="submit" class="btn btn-primary" v-if="laststep">
      Submit
    </button>
  </div>
  -->
</template>

<script>
export default {
  props: ["step", "stepcount", "currentstep"],

  computed: {
    active() {
      return this.step.id == this.currentstep;
    },

    firststep() {
      return this.currentstep == 1;
    },

    laststep() {
      return this.currentstep == this.stepcount;
    },

    stepWrapperClass() {
      return {
        active: this.active,
      };
    },
  },

  methods: {
    nextStep() {
      this.$emit("step-change", this.currentstep + 1);
    },

    lastStep() {
      this.$emit("step-change", this.currentstep - 1);
    },
  },
};
</script>
