<template>
  <div>
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
      <div style="line-height: 100%; font-size: 100%">100</div>
      <div class="text-muted" style="font-size: 40%; line-height: 90%">rpm</div>
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
    const options = {
      series: [69],
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

    var chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();
    let series = chart.series;
    // series[0].setData([70], false)
    console.log("le series[0] are: ", series);
    chart.updateSeries([0]);

    setTimeout(() => {
      this.num = 100;

      //THIS IS THE KEY METHOD!!!!
      chart.updateSeries([50]);
      //htmlBar.animate(0.3);
    }, 2000);
    setTimeout(() => {
      //htmlBar.animate(0.6);
      this.num += 20;
      chart.updateSeries([70]);
    }, 3000);
    setTimeout(() => {
      this.num -= 30;

      //htmlBar.animate(0.8);
    }, 4000);

    setInterval(function () {
      console.log("augmenting number!");
      this.num += 1;
    }, 1000);
  },
};
</script>

<style scoped></style>
