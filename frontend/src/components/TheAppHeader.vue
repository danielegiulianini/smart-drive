<template>
  <!-- ======= Header ======= -->
  <header
    id="header"
    class="header fixed-top d-flex align-items-center"
    v-if="
      /* old:
      !$route.name ||
      !(
        $route.name == '' ||  //to remove if adapting home page
        $route.name == 'signup' ||
        $route.name == 'login' ||
        $route.name == 'not-found'
      )*/
      !(
        $route.name == 'home' ||
        $route.name == 'signup' ||
        $route.name == 'login' ||
        $route.name == 'not-found'
      )
    "
  >
    <div class="d-flex align-items-center justify-content-between">
      <a href="#" class="logo d-flex align-items-center">
        <img src="/src/assets/style/img/webappLogo/favicon-32x32.png" alt="" />
        <!--to remove title in xs: <span class="d-none d-sm-block ps-2">DriveSmart</span>-->
        <span class="ps-2">DriveSmart</span>
      </a>
    </div>
    <!-- End Logo -->
    <Spinner :show="isLoading"></Spinner>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown">
          <a
            class="nav-link nav-icon"
            href="#"
            data-bs-toggle="dropdown"
            @click="onNotificationIconPressed"
          >
            <i class="bi bi-bell"></i>
            <span
              class="badge bg-primary badge-number"
              v-if="unreadNotificationsCount > 0"
              >{{ unreadNotificationsCount }}</span
            > </a
          ><!-- End Notification Icon -->

          <!-- notification list -->
          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications pb-1"
            style="overflow-y: scroll; max-height: 500px; min-width: 300px"
          >
            <!--<li class="dropdown-header text-muted" style="font-size:95%">
              You have {{ unreadNotificationsCount }} new notifications
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>-->

            <!-- ===================== START OF NOTIFICATIONS HERE ======================== -->
            <template
              v-for="notification in lastNotifications"
              :key="notification._id"
              :notification="notification"
            >
              <DropdownNotification
                :notification="notification"
              ></DropdownNotification>
              <li>
                <hr class="dropdown-divider" /></li
            ></template>

            <!-- ===================== END OF NOTIFICATIONS HERE ======================== -->

            <li class="dropdown-footer py-1">
              <span
                href="#"
                class="text-muted"
                style="font-size: 95%"
                id="show-all"
                @click="$router.push('/notifications')"
                >Show all</span
              >
            </li>
          </ul>
          <!-- End Notification Dropdown Items -->
        </li>
        <!-- End Notification Nav -->

        <!-- nav profile -->
        <li class="nav-item dropdown pe-3">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
          >
            <img :src="actualPictureUri" alt="Profile" class="rounded-circle" />
            <span class="d-none d-md-block dropdown-toggle ps-2"
              >{{ firstNameInitial }}. {{ userSurname }}</span
            > </a
          ><!-- End Profile Iamge Icon -->

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
          >
            <li class="dropdown-header">
              <h6>{{ userFirstName }} {{ userSurname }}</h6>
              <span>{{ userCountry }}</span>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li @click="this.$router.push('/profile')">
              <a class="dropdown-item d-flex align-items-center">
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <!-- removed with home page: <li @click="this.$router.push('/')">
              <a
                class="dropdown-item d-flex align-items-center"
                @click="this.$router.push('/')"
              >
                <i class="bi bi-question-circle"></i>
                <span>Need Help?</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>-->
            <!-- maybe other things here... -->
            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                @click="onSignout"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>
  <!-- End Header -->
</template>

<script>
import axios from "axios";

import Spinner from "../components/Spinner.vue";
import DropdownNotification from "./DropdownNotification.vue";
const defaultAvatarUri = "/src/assets/img/driverAvatar.png";
import { mapGetters } from "vuex";
const countOfNotificationsToDisplay = 10;
const notificationRestEndpoint = "http://localhost:8088/api/v1/notifications";

export default {
  components: { Spinner, DropdownNotification },
  data() {
    return {
      isLoading: false,
      lastNotifications: [], //already sorted by backend      //allNotifications: [], //could have had only lastNotifications (as data)
      //====================== user-related======================
      userFirstName: "",
      userSurname: "",
      userCountry: "",
      profilePictureUri: "",
      //=========================================================
    };
  },
  computed: {
    unreadNotificationsCount() {
      console.log(
        "updating unreadNotificationsCount, that is:",
        this.lastUnreadNotifications.length
      );
      return this.lastUnreadNotifications.length;
    },
    lastUnreadNotifications() {
      console.log(
        "updating lastUnreadNotifications, that are:",
        this.lastNotifications
      );
      return this.lastNotifications.filter(
        (notification) => !notification.isRead
      );
    },
    //====================== user-related======================
    firstNameInitial() {
      return this.userFirstName ? this.userFirstName.charAt(0) : "";
    },
    actualPictureUri() {
      return this.profilePictureUri ? this.profilePictureUri : defaultAvatarUri;
    },
    //================= notifications-related =================
    ...mapGetters(["getUser"]),
    ...mapGetters(["getSocket"]),
  },
  methods: {
    //hook when a notification is received!
    onNewNotification(notification) {
      //here notification mirrors mongoose database structure
      console.log("in app header a new notification arrived!", notification);
      notification.isRead = false;
      this.lastNotifications.unshift(notification); //inserting at the start

      //only the real-time-upcoming notification displays a popup
      this.$notification.show(
        notification.subject, //title
        {
          body: notification.body, //html-5 notification content goes in body
        },
        {}
      );
    },
    async onNotificationIconPressed() {
      console.log(
        "onNotificationIconPressed, marking lastNotifications as read"
      );
      //1. must mark current unseen notifications as seen on backend => unreadNotificationsCount=0
      this.lastNotifications.forEach(
        (notification) => (notification.isRead = true)
      );
      Promise.all(
        this.lastNotifications.map((notification) => {
          return axios.post(`${notificationRestEndpoint}/${notification._id}`, {
            isRead: "true",
          });
        })
      ).catch(() => console.log("error happened")); //maybe a more user-friendly msg here
    },
    onSignout() {
      this.$store.dispatch("logout").then(() => {
        return this.$router.push("login");
      }); //redirecting to home (or login module) after logout
    },

    delay(t, val) {
      return new Promise(function (resolve) {
        if (t <= 0) {
          resolve(val);
        } else {
          setTimeout(resolve.bind(null, val), t);
        }
      });
    },
  },
  mounted() {console.log("il this.route.name: " + this.$route.name)},
  watch: {
    getUser(newValue) {
      //must not trigger watcher if a modification to getUser is due to logout
      if (this.getUser) {
        //1.fetching some user details with axios
        const loggedInUserId = this.$store.getters.getUser.id;
        axios
          .get(`users/${loggedInUserId}`)
          .then((userRes) => this.delay(100, userRes)) //wait for user to be added to users micro after supabase signup
          .then((userRes) => {
            console.log("data coming from users (in header)", userRes);

            const userDetail = userRes.data;
            this.userFirstName = userDetail.name;
            this.userSurname = userDetail.surname;
            this.country = userDetail.country;
            this.profilePictureUri = userDetail.profilePictureUri;
          })
          //2.fetching unseen notifications with axios
          .then(() =>
            axios.get(
              `${notificationRestEndpoint}?userId=${loggedInUserId}&isRead=false&limit=${countOfNotificationsToDisplay}`
            )
          ) //filtering and sorting
          .then((notificationRes) => {
            console.log(
              "data coming from notifications (in header)",
              notificationRes.data
            );
            this.lastNotifications = notificationRes.data;
          })
          .catch((err) => console.error(err)) //a more user-friendly message here...
          .finally(() => {
            console.log("nel finally");
            this.isLoading = false;
          });
      }
    },
    getSocket(newValue) {
      if (this.getSocket) {
        //I must wait for the socket to be ready before binding observer to it
        newValue.on("notification", this.onNewNotification);
      }
    },
  },
};
</script>

<style scoped>
/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
.logo {
  line-height: 1;
}

@media (min-width: 1200px) {
  .logo {
    width: 280px;
  }
}

.logo img {
  max-height: 26px;
  margin-right: 6px;
}

.logo span {
  font-size: 26px;
  font-weight: 700;
  color: #012970;
  font-family: "Nunito", sans-serif;
}

.header {
  transition: all 0.5s;
  z-index: 997;
  height: 60px;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
  padding-left: 20px;
  /* Toggle Sidebar Button */
  /* Search Bar */
}

.header .toggle-sidebar-btn {
  font-size: 32px;
  padding-left: 10px;
  cursor: pointer;
  color: #012970;
}

.header .search-bar {
  min-width: 360px;
  padding: 0 20px;
}

@media (max-width: 1199px) {
  .header .search-bar {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    padding: 20px;
    box-shadow: 0px 0px 15px 0px rgba(1, 41, 112, 0.1);
    background: white;
    z-index: 9999;
    transition: 0.3s;
    visibility: hidden;
    opacity: 0;
  }

  .header .search-bar-show {
    top: 60px;
    visibility: visible;
    opacity: 1;
  }
}

.header .search-form {
  width: 100%;
}

.header .search-form input {
  border: 0;
  font-size: 14px;
  color: #012970;
  border: 1px solid rgba(1, 41, 112, 0.2);
  padding: 7px 38px 7px 8px;
  border-radius: 3px;
  transition: 0.3s;
  width: 100%;
}

.header .search-form input:focus,
.header .search-form input:hover {
  outline: none;
  box-shadow: 0 0 10px 0 rgba(1, 41, 112, 0.15);
  border: 1px solid rgba(1, 41, 112, 0.3);
}

.header .search-form button {
  border: 0;
  padding: 0;
  margin-left: -30px;
  background: none;
}

.header .search-form button i {
  color: #012970;
}

/*--------------------------------------------------------------
# Header Nav
--------------------------------------------------------------*/
.header-nav ul {
  list-style: none;
}

.header-nav > ul {
  margin: 0;
  padding: 0;
}

.header-nav .nav-icon {
  font-size: 22px;
  color: #012970;
  margin-right: 25px;
  position: relative;
}

.header-nav .nav-profile {
  color: #012970;
}

.header-nav .nav-profile img {
  max-height: 36px;
}

.header-nav .nav-profile span {
  font-size: 14px;
  font-weight: 600;
}

.header-nav .badge-number {
  position: absolute;
  inset: -2px -5px auto auto;
  font-weight: normal;
  font-size: 12px;
  padding: 3px 6px;
}

.header-nav .notifications {
  inset: 8px -15px auto auto !important;
}

/* Messages (not used yet) */
.header-nav .messages {
  inset: 8px -15px auto auto !important;
}

.header-nav .messages .message-item {
  padding: 15px 10px;
  transition: 0.3s;
}

.header-nav .messages .message-item a {
  display: flex;
}

.header-nav .messages .message-item img {
  margin: 0 20px 0 10px;
  max-height: 40px;
}

.header-nav .messages .message-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #444444;
}

.header-nav .messages .message-item p {
  font-size: 13px;
  margin-bottom: 3px;
  color: #919191;
}

.header-nav .messages .message-item:hover {
  background-color: #f6f9ff;
}

/* for profile  */
.header-nav .profile {
  min-width: 240px;
  padding-bottom: 0;
  top: 8px !important;
}

.header-nav .profile .dropdown-header h6 {
  font-size: 18px;
  margin-bottom: 0;
  font-weight: 600;
  color: #444444;
}

.header-nav .profile .dropdown-header span {
  font-size: 14px;
}

.header-nav .profile .dropdown-item {
  font-size: 14px;
  padding: 10px 15px;
  transition: 0.3s;
}

.header-nav .profile .dropdown-item i {
  margin-right: 10px;
  font-size: 18px;
  line-height: 0;
}

.header-nav .profile .dropdown-item:hover {
  background-color: #f6f9ff;
}

.header-nav a {
  cursor: pointer;
}

#show-all:hover {
  cursor: pointer;
}
</style>
