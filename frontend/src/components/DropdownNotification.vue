<template>
  <li class="notification-item" @click="onNotificationClicked">
    <i class="bi" :class="contextualClass"></i>
    <!--bi-exclamation-circle text-warning"></i>-->
    <div>
      <h4 style="font-size: 100%">{{ notification.subject }}</h4>
      <p style="font-size: 90%">{{ notification.body }}</p>
      <p style="font-size: 80%">{{ timeSinceCreation }} ago</p>
    </div>
  </li>
</template>

<script>
export default {
  //here i imagine to have all the props ... to avoid to destructure them in appheader...
  props: ["notification"],
  /*props: {
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
  },*/
  computed: {
    timeSinceCreation() {
      return this.timeSince(new Date(this.notification.createdAt));
    },
    contextualClass() {
      //responsible of the icon / color pairs based on notification's class
      return {
        "bi-exclamation-circle text-warning":
          this.notification.class == "warning",
        "bi-x-circle text-danger": this.notification.class == "error",
        "bi-check-circle text-success": this.notification.class == "success",
        "bi-info-circle text-primary": this.notification.class == "info",
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
    onNotificationClicked() {
      console.log("otif clicked")
      if (this.notification.subject.includes("achievement")){
        this.$router.push({path:"/profile/newBadge" });
      }
    }
  },
};
</script>

<style scoped>
/*for single notification */
.notification-item {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  transition: 0.3s;
}

.notification-item i {
  margin: 0 20px 0 10px;
  font-size: 24px;
}

.notification-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.notification-item p {
  font-size: 13px;
  margin-bottom: 3px;
  color: #919191;
}

.notification-item:hover {
  background-color: #f6f9ff;
}
</style>
