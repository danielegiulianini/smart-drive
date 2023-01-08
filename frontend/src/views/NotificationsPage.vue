<template>
  <Spinner :show="isLoading"></Spinner>

  <main id="main">
    <div class="pagetitle">
      <h1>Notifications</h1>
    </div>
    <div v-if="notifications.length > 0">
      <div class="card my-2" v-for="notification in notifications">
        <DropdownNotificationVue
          :key="notification._id"
          :notification="notification"
        ></DropdownNotificationVue>
      </div>
      <!--<div class="card">
      <DropdownNotificationVue
        :notification="{
          class: 'success',
          subject: 'ciaooo',
          body: 'ciaooo',
        }"
      ></DropdownNotificationVue>
    </div>-->
      <div class="btn btn-light text-center d-flex justify-content-center">
        Load more notifications
      </div>
    </div>
    <div
      v-else
      class="d-flex flex-column justify-content-center align-items-center"
      style="height: 70vh"
    >
      <h1 style="font-size: 150%">Still no notifications</h1>
      <p class="text-muted">Use the app to gather notifications.</p>
    </div>
  </main>
</template>

<script>
import DropdownNotificationVue from "../components/DropdownNotification.vue";
import Spinner from "../components/Spinner.vue";
const notificationRestEndpoint = "http://localhost:8088/api/v1/notifications";

export default {
  data() {
    return {
      isLoading: true,
      notifications: [],
    };
  },
  components: { DropdownNotificationVue, Spinner },
  mounted() {
    const loggedInUserId = this.$store.getters.getUser.id;
    //fetching notifications
    axios
      .get(`${notificationRestEndpoint}?userId=${loggedInUserId}`)
      .then((result) => {
        console.log(
          "data coming from notifications (in NotificationPage)",
          result
        );
        this.notifications = result.data;
      })
      .catch((err) => console.error(err)) //a more user-friendly message here...
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
.section-50 {
  padding: 50px 0;
}

.m-b-50 {
  margin-bottom: 50px;
}

.dark-link {
  color: #333;
}

.heading-line {
  position: relative;
  padding-bottom: 5px;
}

.heading-line:after {
  content: "";
  height: 4px;
  width: 75px;
  background-color: #29b6f6;
  position: absolute;
  bottom: 0;
  left: 0;
}

.notification-ui_dd-content {
  margin-bottom: 30px;
}

.notification-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 7px;
  background: #fff;
  -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
}

.notification-list--unread {
  border-left: 2px solid #29b6f6;
}

.notification-list .notification-list_content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.notification-list .notification-list_content .notification-list_img img {
  height: 48px;
  width: 48px;
  border-radius: 50px;
  margin-right: 20px;
}

.notification-list .notification-list_content .notification-list_detail p {
  margin-bottom: 5px;
  line-height: 1.2;
}

.notification-list .notification-list_feature-img img {
  height: 48px;
  width: 48px;
  border-radius: 5px;
  margin-left: 20px;
}
</style>
