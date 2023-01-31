<template>
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="bordered-justified-contact2"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <div class="card pt-3" style="box-shadow: none">
      <div class="card-body text-center d-flex justify-content-center" style="min-height:200px"><!--same of no events tab pane's card-->
        <ul class="list-group list-group-flush my-auto">
          <template v-for="(staticsticsValue, staticsticsKey) in tripStatistics"
            ><TripDetailItem
              :label="tripStatisticsLabels[staticsticsKey]"
              :itemValue="staticsticsValue"
              v-if="staticsticsValue != undefined"
            ></TripDetailItem
          ></template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TripDetailItem from "../components/TripDetailItem.vue";

export default {
  components: {
    TripDetailItem,
  },
  data() {
    return {
      //non-reactive data
      tripStatisticsLabels: {
        distanceTraveled: "distanceTraveled (km)",
        duration: "duration (')",
        //fuelConsumption: "avg RPM",
        avgRpm: "avg RPM",
        avgKph: "avg KPH",
        maxRpm: "max RPM",
        maxKph: "max RPM",
      },
    };
  },
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    distanceTraveled: { required: true },
    duration: { required: true },
    //fuelConsumption: { required: true },
    avgRpm: { required: true },
    avgKph: { required: true },
    maxRpm: { required: true },
    maxKph: { required: true },
  },
  methods: {
    //adapted form https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
    filterObjectPreserving(initialObject, allowedKeys) {
      return Object.keys(initialObject)
        .filter((key) => allowedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = initialObject[key];
          return obj;
        }, {});
    },
  },
  computed: {
    //returning only the staticstics of trip
    tripStatistics() {
      console.log("tripStatisticsLabels is", this.tripStatisticsLabels);
      return this.filterObjectPreserving(
        this.$props,
        Object.keys(this.tripStatisticsLabels)
      );
    },
  },
  mounted() {},
};
</script>
