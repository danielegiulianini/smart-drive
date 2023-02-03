<template>
  <div id="chart2"></div>
  <div
    style="
      position: relative;
      top: -100px;
      margin-bottom: -60px;
      font-size: 250%;
    "
    class="text-center"
  >
    <div style="line-height: 100%; font-size: 100%">{{ tweened }}</div>
    <div class="text-muted" style="font-size: 40%; line-height: 90%">rpm</div>
  </div>
</template>

<script>
import gsap from "gsap";

//apex charts wants values between 0 and 100 only
const maxRpm = 7000;

export default {
  props: {
    rpm: {
      required: true,
    },
  },
  data() {
    return {
      tweened: this.rpm,
    };
  },
  computed: {
    rpmInPercentage() {
      let percentage = (this.rpm / maxRpm) * 100;
      if (percentage > 100) {
        percentage = 100;
      }
    },
  },
  mounted() {
    const options = {
      series: [this.rpmInPercentage],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        height: 220,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            value: {
              //offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val) {
                return "";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: [""],
    };

    this.chart = new ApexCharts(document.querySelector("#chart2"), options);
    this.chart.render();
    let series = this.chart.series;
    // series[0].setData([70], false)
    console.log("le series[0] are: ", series);

    //this call is needed to refresh the chart
    //this.chart.updateSeries([0]);
  },
  watch: {
    rpm(newRpm, oldRpm) {
      const a = this;
      const TEXTUAL_UPDATE_DURATION_IN_SECONDS = 3;
      this.chart.updateSeries([this.rpmInPercentage]);
      var zero = { val: oldRpm };
      //from, to
      gsap.to(zero, {
        duration: TEXTUAL_UPDATE_DURATION_IN_SECONDS,
        val: newRpm,
        onUpdate: countNumber,
      });

      //removing decimals
      function countNumber() {
        var final = gsap.utils.snap(1, zero.val);
        a.tweened = final;
      }
    },
  },
};
</script>

<style scoped></style>
