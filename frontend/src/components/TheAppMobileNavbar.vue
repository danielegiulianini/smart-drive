<template>
  <nav class="mobile-nav">
    <!--with home:
      <a class="bloc-icon" @click="this.$router.push('/')">
      <i style="font-size: 30px" class="fa fa-home"></i>
    </a>-->
    <a class="bloc-icon" @click="this.$router.push('/profile')">
      <i style="font-size: 30px" class="bi bi-person-circle"></i>
    </a>
    <a class="bloc-icon" @click="this.$router.push('/score')">
      <i style="font-size: 30px" class="bi bi-speedometer"></i>
    </a>
    <!-- steering-wheel-->
    <a id="steering-wheel-icon" class="bloc-icon" @click="this.$router.push('/drive')">
      <!-- taken from: "https://www.svgrepo.com/svg/232240/steering-wheel-car"--><svg
        fill="currentColor"
        width="30"
        height="30"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M437.02,74.981C388.668,26.628,324.38,0,256,0S123.333,26.628,74.98,74.981C26.628,123.333,0,187.62,0,256
			s26.628,132.667,74.98,181.019C123.333,485.372,187.62,512,256,512s132.667-26.628,181.02-74.981
			C485.372,388.668,512,324.38,512,256S485.372,123.333,437.02,74.981z M256,57.263c100.782,0,184.276,75.409,197.04,172.765
			L329.849,218.03c-13.813-26.755-41.72-45.102-73.849-45.102s-60.036,18.347-73.849,45.102L58.96,230.028
			C71.724,132.672,155.218,57.263,256,57.263z M58.889,281.375l121.731,9.484c7.69,16.55,20.669,30.166,36.76,38.655l7.978,122.859
			C138.513,438.875,70.099,368.943,58.889,281.375z M256,281.809c-14.232,0-25.809-11.578-25.809-25.809S241.77,230.191,256,230.191
			S281.809,241.77,281.809,256S270.232,281.809,256,281.809z M286.644,452.373l7.978-122.859
			c16.091-8.488,29.069-22.105,36.76-38.655l121.731-9.484C441.901,368.943,373.487,438.875,286.644,452.373z"
            />
          </g>
        </g>
      </svg>
    </a>
    <a href="#" class="bloc-icon" @click="this.$router.push('/garage')">
      <i style="font-size: 30px" class="bi bi-car-front"> </i
    ></a>
    <a href="#" class="bloc-icon" @click="this.$router.push('/trips')">
      <i style="font-size: 30px" class="fa fa-road" aria-hidden="true"></i>
    </a>
  </nav>
</template>

<style scoped>
.mobile-nav {
  background: #f1f1f1;
  position: fixed;
  bottom: 0;
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.mobile-nav a {
  cursor: pointer;
}

.bloc-icon {
  color: #012970;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bloc-icon img {
  width: 30px;
}

/*
sidebar (equivalent to this navbar) is to be shown in xxl, xl (1200px).
this navbar in: xs, sm, md, lg.
(could also use bootstrap class for this.)
*/
@media screen and (min-width: 1200px) { /*600px) {*/
  .mobile-nav {
    display: none;
  }
}

/* hiding driving mode in lg because it must be used in mobile (xs) only (sm is from 576)*/
@media screen and (min-width: 576px) { 
  #steering-wheel-icon {
    display: none;
  }
}
</style>

<script></script>
