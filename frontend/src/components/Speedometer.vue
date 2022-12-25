<template>
  <div>
    <!--<div
        ref="container"
        class="d-flex my-auto mx-auto"
        style="width: 230px; height: 230px"
      ></div>-->
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
      <div style="line-height: 100%; font-size: 150%">100</div>
      <div class="text-muted" style="font-size: 70%; line-height: 90%">mph</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  mounted() {
    var options = {
      series: [100],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        height: 330,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            /*name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },*/
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
};
</script>

<style scoped></style>
