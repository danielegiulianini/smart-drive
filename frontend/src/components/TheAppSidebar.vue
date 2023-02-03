<!-- ======= Sidebar ======= -->
<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-heading">Pages</li>

      <!--with home page:
        <li class="nav-item">
        <a class="nav-link" @click="this.$router.push('/')">
          <i class="fa fa-home"></i>
          <span>Home</span>
        </a>
      </li>-->
      <!-- End Home Page Nav -->

      <li class="nav-item">
        <a class="nav-link" @click="this.$router.push('/profile') " :class="{ collapsed: $route.name != 'Profile' }">
          <i class="bi bi-person-circle"></i>
          <span>Profile</span>
        </a>
      </li>
      <!-- End Profile Page Nav -->

      <li class="nav-item">
        <a class="nav-link" @click="this.$router.push('/score') " :class="{ collapsed: $route.name != 'Score' }">
          <i class="bi bi-speedometer"></i>
          <span>Driving Score</span>
        </a>
      </li>
      <!-- End score Page Nav -->

      <li class="nav-item">
        <a class="nav-link" @click="this.$router.push('/garage')" :class="{ collapsed: $route.name != 'Garage' }">
          <i class="bi bi-car-front"></i>
          <span>Garage</span>
        </a>
      </li>
      <!-- End Garage Page Nav -->

      <li class="nav-item">
        <a class="nav-link" @click="this.$router.push('/trips')" :class="{ collapsed: $route.name != 'Trips' }">
          <i class="fa fa-road" aria-hidden="true"></i>
          <span>Trips</span>
        </a>
      </li>
      <!-- End Trips Page Nav -->
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>

<script></script>

<!-- not scoped because it influences main too-->
<style>
/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 996;
  transition: all 0.3s;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
}

.sidebar-nav a {
  cursor: pointer;
}

@media (max-width: 1199px) {
  .sidebar {
    left: -300px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

/*
sidebar (equivalent to TheAppMobileNavbar) is to be shown in xxl, xl.
this navbar in: xs, sm, md, lg.
(could also use bootstrap class for this.)
*/
@media (min-width: 1200px) {
  #main,
  #footer {
    margin-left: 300px;
  }
}

@media (max-width: 1199px) {
  .toggle-sidebar .sidebar {
    left: 0;
  }
}

@media (min-width: 1200px) {
  .toggle-sidebar #main,
  .toggle-sidebar #footer {
    margin-left: 0;
  }

  .toggle-sidebar .sidebar {
    left: -300px;
  }
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-item {
  margin-bottom: 5px;
}

.sidebar-nav .nav-heading {
  font-size: 11px;
  text-transform: uppercase;
  color: #899bbd;
  font-weight: 600;
  margin: 10px 0 5px 15px;
}

/*me */
.nav-link.activated {
  background: #f6f9ff;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #4154f1;
  transition: 0.3;
  background: #f6f9ff;
  padding: 10px 15px;
  border-radius: 4px;
}

.sidebar-nav .nav-link i {
  font-size: 16px;
  margin-right: 10px;
  color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
  color: #012970;
  background: #fff;
}

.sidebar-nav .nav-link.collapsed i {
  color: #899bbd;
}

.sidebar-nav .nav-link:hover {
  color: #4154f1;
  background: #f6f9ff;
}

.sidebar-nav .nav-link:hover i {
  color: #4154f1;
}

.sidebar-nav .nav-link .bi-chevron-down {
  margin-right: 0;
  transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
  transform: rotate(180deg);
}

.sidebar-nav .nav-content {
  padding: 5px 0 0 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-content a {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #012970;
  transition: 0.3;
  padding: 10px 0 10px 40px;
  transition: 0.3s;
}

.sidebar-nav .nav-content a i {
  font-size: 6px;
  margin-right: 8px;
  line-height: 0;
  border-radius: 50%;
}

.sidebar-nav .nav-content a:hover:not(#edit-badge),
.sidebar-nav .nav-content a.active {
  color: #4154f1;
}

.sidebar-nav .nav-content a.active i {
  background-color: #4154f1;
}
</style>
