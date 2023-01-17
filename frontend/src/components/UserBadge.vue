<template>
  <div class="card nested-card text-center align-items-center m-2 h-100">
    <img
      class="card-img-top badge-image mt-4"
      :src="pictureUri"
      style="width: 100px"
      alt="..."
    /><!--      src="/src/assets/style/img/badges/bronzeSmoothness.png"--> <!--goldTrips-->
    <div class="card-body">
      <h5 class="card-title mb-0 pb-2">{{ name }}</h5>
      <small class="card-text text-muted">{{ description }}</small>
    </div>
    <div class="card-footer lh-sm" v-if="earnedAt">
      <small style="font-size:80%" class="text-muted lh-sm"
        >Obtained {{ timeSince(earnedAt) }} ago</small
      >
    </div>
  </div>
</template>

<style scoped>
/*for animating a new badge when achieving it!  (posso anche aumentare la size)*/
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.75);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}

.animate {
  animation: heartbeat 1s;
}


.card:hover {
  transform: scale(1.05);
}
.card {
  transition: transform 0.2s ease;
}
</style>

<script>
export default {
  props: {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
    pictureUri: {
      required: true,
    },
    earnedAt: {
      required: false,
    },
  },
  methods: {
    timeSince(date) {
      console.log("la date to whuch say timeSince", date);
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
  watch:{

  }
};
</script>
