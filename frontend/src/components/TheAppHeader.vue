<template>
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="/src/assets/style/img/webappLogo/favicon-32x32.png" alt="" />
        <!--<span class="d-none d-sm-block ps-2">DriveSmart</span>-->
        <span class="ps-2">DriveSmart</span>
      </a>
    </div>
    <!-- End Logo -->
    <Spinner :show="isLoading"></Spinner>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown">
          <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-bell"></i>
            <span
              class="badge bg-primary badge-number"
              v-if="unreadNotificationsCount > 0"
              >{{ unreadNotificationsCount }}</span
            > </a
          ><!-- End Notification Icon -->

          <!-- notification list -->
          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
            style="overflow-y: scroll; height: 500px"
          >
            <li class="dropdown-header">
              You have {{ unreadNotificationsCount }} new notifications
              <a href="#"
                ><span class="badge rounded-pill bg-primary p-2 ms-2"
                  >View all</span
                ></a
              >
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <!-- notification -->
            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <!-- notification -->
            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <!-- notification -->
            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <!-- notification -->
            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <li class="notification-item">
              <i class="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>

            <li class="notification-item">
              <i class="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider" />
            </li>
            <li class="dropdown-footer">
              <a href="#">Show all notifications</a>
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
            <img
              :src="actualPictureUri"
              alt="Profile"
              class="rounded-circle"
            />
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

            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                @click="this.$router.push('/profile/')"
              >
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
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
            </li>
            <!-- maybe other things here... -->
            <li @click.prevent="$store.dispatch('logout')">
              <a
                class="dropdown-item d-flex align-items-center"
                @click="this.$router.push('/')"
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
  <TheAppSidebar></TheAppSidebar>
</template>

<script>
import TheAppSidebar from "../components/TheAppSidebar.vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
const defaultAvatarUri = "/src/assets/img/driverAvatar.png";

export default {
  components: { TheAppSidebar, Spinner },
  data() {
    return {
      unreadNotificationsCount: 0,
      isLoading: false,

      //already sorted by backend
      allNotifications: [], //could have had only lastNotifications (as data)

      //====================== user-related======================

      userFirstName: "",
      userSurname: "",
      userCountry: "",
      profilePictureUri: "",
      //=========================================================
    };
  },
  computed: {
    lastNotifications() {
      const countOfNotificationsToDisplay = 10;
      //taking the first (=>slice) (most recent) countOfNotificationsToDisplay
      return this.allNotifications.slice(0, countOfNotificationsToDisplay);
    },
    //====================== user-related======================
    firstNameInitial() {
      return this.userFirstName ? this.userFirstName.charAt(0) : "";
    },
    actualPictureUri() {
      return this.profilePictureUri ? this.profilePictureUri : defaultAvatarUri;
    },
    //=========================================================
  },
  methods: {
    //hook when a notification is received!
    onNewNotification(notification) {
      //here notification mirrors mongoose database structure

      this.unreadNotificationsCount++;
      this.notifications.push(notification);

      //only the real-time-upcoming notification displays a popup
      this.$notification.show(
        notification.subject, //title
        {
          body: notification.body, //html-5 notification content goes in body
        },
        {}
      );
    },
    onNotificationIconPressed() {
      this.unreadNotificationsCount = 0;
    },
    onSignout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/")); //redirecting to home (or login module) after logout
    },
  },
  mounted() {
    console.log(
      "the socket from header comp is: ",
      this.$store.state.users.socket
    );
    console.log("the users from header comp is: ", this.$store.state.users);

    //fetching with axios some user detail
    const loggedInUserId = 6; // this.$store.getters.getUser.id; //6; //this.$store.getters.getUser.id; //questa è corretta
    axios
      .get(`users/${loggedInUserId}`)
      .then((userRes) => {
        console.log("data coming from users", userRes);

        const userDetail = userRes.data;
        this.userFirstName = userDetail.name;
        this.userSurname = userDetail.surname;
        this.country = userDetail.country;
        this.profilePictureUri = userDetail.profilePictureUri;
      })
      .catch((err) => console.error(err)) //a more user-friendly message here...
      .finally(() => (this.isLoading = false));

    //fetching with axios notifications

    //this.$socketio. add onNewNotification handler
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

.header-nav .notifications .notification-item {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  transition: 0.3s;
}

.header-nav .notifications .notification-item i {
  margin: 0 20px 0 10px;
  font-size: 24px;
}

.header-nav .notifications .notification-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.header-nav .notifications .notification-item p {
  font-size: 13px;
  margin-bottom: 3px;
  color: #919191;
}

.header-nav .notifications .notification-item:hover {
  background-color: #f6f9ff;
}

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
</style>
