<template>
  <!-- applico confizionalmente uno stile se fra i primi 3!-->
  <tr :class="rowClassObject">
    <td class="text-muted text-center">
      {{ rank
      }}<i
        class="bi bi-trophy"
        style="color: silver"
        v-if="rank < 4"
        :class="trophyClass"
      ></i>
    </td>
    <th scope="row align-text-center">
      <div class="d-flex">
        <a href="#" class="d-flex"
          ><img
            :src="profilePictureUri"
            class="rounded-circle my-auto"
            style="max-width: 50px"
            alt=""
        /></a>
        <div class="ps-3 my-auto" style="font-size: 95%">
          {{name surname}}
          <div class="text-muted" style="font-size: 95%">level {{ level }}</div>
        </div>
      </div>
    </th>
    <!-- <td class="d-none d-sm-table-cell text-center km">15</td>-->
    <td class="d-none d-sm-table-cell text-center xp">{{ xp }}</td>
    <td class="d-none d-sm-table-cell text-center badgesCount">
      {{ badgesCount }}
    </td>
    <td class="fw-bold my-auto text-center">
      <AppSemiCircularProgressBar
        :progressPercentage=score
      ></AppSemiCircularProgressBar>
    </td>
  </tr>
</template>

<script>
import AppSemiCircularProgressBar from "./AppSemiCircularProgressBar.vue";

export default {
  components: {
    AppSemiCircularProgressBar,
  },
  props: {
    score: { required: true }, //either total, speed, rpm, feedback-consideration ...
    rank: { required: true },
    firstName: { required: true },
    surname: { required: true },
    profilePictureUri: { required: true },
    xp: { required: true },
    level: { required: true },
    badges: { required: true },
  },
  computed: {
    badgesCount() {
      return this.badges.length;
    },
    rowClassObject() {
      return {
        "gold-row": rank == 1,
        "silver-row": rank == 2,
        "bronze-row": rank == 3,
      };
    },
    trophyClassObject() {
      return {
        "gold-trophy": rank == 1,
        "silver-trophy": rank == 2,
        "bronze-trophy": rank == 3,
      };
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
};
</script>

<style scoped>
.gold-trophy {
  color: gold;
}
.silver-trophy {
  color: silver;
}

.bronze-trophy {
  color: bronze;
}

.silver-row {
  border-color: gold;
  border-width: 1px 1px;
}

.silver-row {
  border-color: silver;
  border-width: 1px 1px;
}
.silver-row {
  border-color: bronze;
  border-width: 1px 1px;
}
</style>
