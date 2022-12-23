<template>
  <!-- applico confizionalmente uno stile se fra i primi 3!-->
  <tr :class="rowClass">
    <td class="text-muted text-center">
      rank<i
        class="bi bi-trophy"
        style="color: silver"
        v-if="rank < 4"
        :class="podiumTrophyClass"
      ></i>
    </td>
    <th scope="row align-text-center">
      <div class="d-flex">
        <a href="#" class="d-flex"
          ><img
            src="/src/assets/style/img/product-1.jpg"
            class="rounded-circle my-auto"
            style="max-width: 50px"
            alt=""
        /></a>
        <div class="ps-3 my-auto" style="font-size: 95%">
          Daniele Giulianini
          <div class="text-muted" style="font-size: 95%">level 5</div>
        </div>
      </div>
    </th>
    <td class="d-none d-sm-table-cell text-center">15</td>
    <td class="d-none d-sm-table-cell text-center">52</td>
    <td class="d-none d-sm-table-cell text-center">22</td>
    <td class="fw-bold my-auto text-center">
      <AppSemiCircularProgressBar
        progressPercentage="0.8"
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
    rank: { required: true },
    firstName: { required: true },
    surname: { required: true },
    profilePictureUri: { required: true },
    xp: { required: true },
    level: { required: true },
    scoresTrend: { required: true }, //for: active ... ago
    badges: { required: true },
  },
  computed: {
    lastUserTrip() {
      const lastScoreUpdate = this.scoresTrend[this.scoresTrend.length - 1];
      const lastScoreUpdateDate = lastScoreUpdate.referredTo;
      return this.timeSince(lastScoreUpdateDate);
    },
    lastUserActivity() {
      if (this.scoresTrend.length > 0) {
        return lastScoreTrip();
      } else {
        return "no trips yet.";
      }
    },
    rowClass() {
      return {
        "gold-row": rank == 1,
        "silver-row": rank == 2,
        "bronze-row": rank == 3,
      };
    },
    podiumTrophyClass() {
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
  data() {},
};
</script>

<style scoped>
.btn-circle.btn-md {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
.page-header {
  padding: 20px;
  background-color: white; /* ghostwhite;*/
  border-radius: 10px;
}

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
  border-color: gold;
  border-width: 1px 1px;
}
.silver-row {
  border-color: gold;
  border-width: 1px 1px;
}
</style>
