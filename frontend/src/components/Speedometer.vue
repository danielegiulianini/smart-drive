<template>
  <div id="chart"></div>
  <div
    style="
      position: relative;
      top: -142px;
      margin-bottom: -60px;
      font-size: 250%;
    "
    class="text-center"
  >
    <div style="line-height: 100%; font-size: 150%">{{ tweened }}</div>
    <div class="text-muted" style="font-size: 70%; line-height: 90%">kph</div>
  </div>
</template>

<script>
import gsap from "gsap";

//apex charts wants values between 0 and 100 only
const maxKph = 250;

export default {
  props: {
    kph: {
      required: true,
    },
  },
  data() {
    return {
      tweened: this.kph,
    };
  },
  computed: {
    kphInPercentage() {
      return (this.kph / maxKph) * 100;
    },
  },
  mounted() {
    const options = {
      series: [this.kphInPercentage],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        height: 300,
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

    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  },
  watch: {
    kph(newKph, oldKph) {
      const a = this;

     /* if (newKph > 200) {
        this.kph = 200;
      }*/
      let fixedKph = newKph;
      if (fixedKph > 200) {
        fixedKph = 200;
      }

      const TEXTUAL_UPDATE_DURATION_IN_SECONDS = 3;
      
      //this call is needed to refresh the chart
      this.chart.updateSeries([fixedKph / maxKph * 100]);
      //[this.kphInPercentage]);
      var zero = { val: oldKph };


      //from, to
      gsap.to(zero, {
        duration: TEXTUAL_UPDATE_DURATION_IN_SECONDS,
        val: fixedKph,
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
/*
export default {
  props: {
    kph: {
      required: true,
    },
  },
  data() {
    return {
      tweened: this.kph,
    };
  },
  mounted() {
    var options = {
      series: [this.kph],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        height: 300,
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

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  },
  watch: {
    number(newKph) {
      gsap.to(this, { duration: 0.5, tweened: Number(newKph) || 0 });
    },
  },
};*/
</script>

<style scoped></style>
