<template>
  <div>
    <div
      ref="container"
      class="d-flex my-auto mx-auto"
      style="width: 230px; height: 230px"
    ></div>
    <div
      style="
        position: relative;
        top: -142px;
        margin-bottom: -60px;
        font-size: 250%;
      "
      class="text-center"
    >
      <div style="line-height: 100%">{{ formattedValue }}</div>
      <div class="text-muted" style="font-size: 70%; line-height: 90%">
        /100
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "progressbar.js";

export default {
  props: {
    outOf: {
      default: 100,
    },
    progress: {
      required: true,
    },
  },
  data() {
    return {
      htmlBar: "",
    };
  },
  computed: {
    progressPercentage() {
      return this.progress ? this.progress / this.outOf : this.progress; // Number from 0.0 to 1.0
    },
    formattedValue() {
      const decimalDigitsCount = 2;
      return this.progress
        ? this.progress.toFixed(decimalDigitsCount)
        : this.progress;
    },
  },
  methods: {
    isDefined(variable) {
      return !(typeof variable === "undefined" || variable === null);
    },
    initBar() {
      if (this.isDefined(this.progressPercentage)) {
        var htmlBar = this.$refs.container;
        console.log("la bar is", htmlBar);
        this.htmlBar = new ProgressBar.Circle(htmlBar, {
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

        this.htmlBar.path.style.strokeLinecap = "round";
      }
    },
  },
  mounted() {
    this.initBar();
    this.htmlBar.animate(this.progressPercentage); // Number from 0.0 to 1.0
  },
  watch: {
    progressPercentage(newVal) {
      this.htmlBar.animate(newVal); // Number from 0.0 to 1.0
    },
  },
};
</script>
