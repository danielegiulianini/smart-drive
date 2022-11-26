<template>
  <div class="card nested-card text-center align-items-center m-2">
    <img
      class="card-img-top badge-image rounded-circle mt-4"
      src="/src/assets/style/img/profile-img.jpg"
      style="width: 100px"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title mb-0 pb-2">Daniele Giulianini</h5>
      <!--<h6 class="card-subtitle mb-2 text-muted">Cesenatico</h6>-->
      <small class="card-text text-muted">Drive 100 km. </small>
    </div>
    <div class="card-footer lh-sm">
      <small class="text-muted lh-sm">Otained one year ago</small>
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
</style>

<script></script>
