<template>
  <div>
    <div
      ref="container"
      class="d-flex my-auto"
      style="width: 70px; height: 70px"
    ></div>
    <div style="position: relative; top: -30px">
      <div style="line-height: 90%">100</div>
      <div style="font-size: 80%; line-height: 90%" class="text-muted">
        /100
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "progressbar.js";

export default {
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  mounted() {
    var htmlBar = this.$refs.container;
    console.log("la bar is",htmlBar )
    htmlBar = new ProgressBar.SemiCircle(htmlBar, {
      strokeWidth: 7,
      //easing: "easeInOut",
      duration: 1400,
      //color: "#FF0000",
      from: { color: "#FF0000" },
      to: { color: "#00FF00" },
      step: function (state, circle, attachment) {
        circle.path.setAttribute("stroke", state.color);
      },

      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: null,
      text: {
        style: {
          fontFamily: "Poppins",
          color: "#f00",
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: 0,
          margin: 0,
          // You can specify styles which will be browser prefixed
          transform: {
            prefix: true,
            value: "translate(-50%, -50%)",
          },
        },
      },
    });

    htmlBar.path.style.strokeLinecap = "round";

    htmlBar.animate(this.progressPercentage); // Number from 0.0 to 1.0  },
  },
};
</script>
