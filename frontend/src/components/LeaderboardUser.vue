<template>
  <!-- applico confizionalmente uno stile se fra i primi 3!-->
  <tr :class="rowClassObject">
    <td class="text-muted text-center">
      {{ rank
      }}<i class="bi bi-trophy" v-if="rank < 4" :class="trophyClassObject"></i>
      <!--         style="color: silver"-->
    </td>
    <th scope="row align-text-center">
      <div class="d-flex">
        <a href="#" class="d-flex"
          ><img
            :src="actualPictureUri"
            class="rounded-circle my-auto"
            style="max-width: 50px"
            alt=""
        /></a>
        <div class="ps-3 my-auto" style="font-size: 95%">
          {{ firstName }} {{ surname }}
          <div class="text-muted" style="font-size: 95%">level {{ level }}</div>
        </div>
      </div>
    </th>
    <!-- <td class="d-none d-sm-table-cell text-center km">15</td>-->
    <td class="d-none d-sm-table-cell text-center xp">{{ xp ? xp.toFixed(2) : xp }}</td>
    <td class="d-none d-sm-table-cell text-center badgesCount">
      {{ badgesCount }}
    </td>
    <td class="fw-bold my-auto text-center">
      <AppSemiCircularProgressBar
        :progress="score"
      ></AppSemiCircularProgressBar>
    </td>
  </tr>
</template>

<script>
import AppSemiCircularProgressBar from "./AppSemiCircularProgressBar.vue";
const defaultAvatarUri = "/src/assets/img/driverAvatar.png";

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
    actualPictureUri() {
      return this.profilePictureUri ? this.profilePictureUri : defaultAvatarUri;
    },
    badgesCount() {
      return this.badges.length;
    },
    rowClassObject() {
      return {
        "gold-row": this.rank == 1,
        "silver-row": this.rank == 2,
        "bronze-row": this.rank == 3,
      };
    },
    trophyClassObject() {
      return {
        "gold-trophy": this.rank == 1,
        "silver-trophy": this.rank == 2,
        "bronze-trophy": this.rank == 3,
      };
    },
  },
  methods: {},
  watcher: {
    profilePictureUri(newUri, oldUri) {
      console.log("il mio profilePictureUri", newUri);
    },
  },
  mounted() {},
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
  color: #cd7f32;
}

.gold-row {
  border-color: gold;
  border-width: 1px 1px;
  z-index: 3;
}

.silver-row {
  border-color: silver;
  border-width: 1px 1px;
  z-index: 2;
}
.bronze-row {
  border-color: #cd7f32;
  border-width: 1px 1px;
  border-bottom: 0.5px solid #cd7f32;
  z-index: 1;
}
</style>
