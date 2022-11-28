<template>
  <div ref="container" style="height: 8px"></div>
</template>

<style scoped></style>

<script>
import ProgressBar from "progressbar.js";

export default {
  props: {
    progressPercentage: {
      type: Number, // Number from 0.0 to 1.0
      required: true,
    },
  },
  //using mounted instead of created here (need to access to html elements)
  //(from https://www.telerik.com/blogs/how-to-target-the-dom-in-vue: "you will NOT
  // be able to use $refs on hooks that happen before render is
  //called, for example on created(); you will however have it available on mounted()."
  mounted() {
    var htmlBar = this.$refs.container;
    var htmlBar = new ProgressBar.Line(htmlBar, {
      strokeWidth: 1,
      //easing: "easeInOut",
      duration: 1400,
      //color: "#FF0000",
      svgStyle: {
        display: "block",
        // Important: make sure that your container has same
        // aspect ratio as the SVG canvas. See SVG canvas sizes above.
        width: "100%",
        height: "100%",
      },
      from: { color: "#FF0000" },
      to: { color: "#00FF00" },
      step: function (state, circle, attachment) {
        circle.path.setAttribute("stroke", state.color);
      },

      trailColor: "#eee",
      trailWidth: 1,
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

    htmlBar.animate(this.progressPercentage); // Number from 0.0 to 1.0
  },
};
</script>
