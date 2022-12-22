<template>
  <li class="notification-item">
    <i class="bi bi-exclamation-circle text-warning"></i>
    <div>
      <h4>{{ title }}</h4>
      <p>{{ content }}</p>
      <p>{{ timeSinceCreation }}</p>
    </div>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    class: {
      default: "success",
    },
    title: {
      required: true,
    },
    content: {
      required: true,
    },
    createdAt: {
      required: true,
    },
  },
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  computed: {
    timeSinceCreation() {
      return this.timeSince(this.createdAt);
    },
    contextualClass() {
      //responsible of the icon / color pairs based on notification's class
      return {
        "bi-exclamation-circle text-warning": this.class == "warning",
        "bi-x-circle text-danger": this.class == "error",
        "bi-check-circle text-success": this.class == "success",
        "bi-info-circle text-primary": this.class == "info",
      };
    },
  },
  methods: {
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
  },
};
</script>

<style scoped></style>
