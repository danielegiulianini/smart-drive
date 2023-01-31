<template>
  <!-- QUI INIZIA IL secondo (graph) TAB pane-->
  <div
    class="tab-pane"
    :class="{ active: isActive }"
    id="trips-score"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <div class="container-fluid">
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="card nested-card h-100 mb-2">
            <!-- padding between cards-->
            <div class="card-body">
              <div class="card-title">
                Global Score
                <i
                  class="bi bi-question-circle ps-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-html="true"
                  title="Your overall driving style score. It is the most general metrics 
                    assigned to you by the app and it summarizes all the following components, 
                    spanning from safety-related, eco-related indicators, as well as much others.
                    It is cumulatively gathered by you since you started using this app and states
                     your current level."
                  ref="info"
                >
                </i>
              </div>

              <div class="justify-content-center">
                <AppCircularProgressBar
                  :progress="totalScore"
                ></AppCircularProgressBar>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card nested-card h-100 mb-2 d-flex">
            <!-- padding between cards-->
            <div class="card-body">
              <h5 class="card-title">Score components</h5>
              <!-- putting also textual score here:-->
              <ScoreComponentHorizontalBar
                :score="aggressivenessScore"
                scoreTitle="Aggressiveness score"
                scoreToolTip="Aggressiveness score is computed taking into consideration Rounds Per Minute (RPM) 
                  engine readings coming from yours vehicle's control unit. By evaluating short term variance, this
                   measures penalizes abrupt engine's acceleration or de-celaration events while rewarding a 
                   driving style which is stable and conservative on the engine-load side. In this way, it act as an
                   eco-friendly indicator too. As well as the others, this metrics considers the data coming from all
                   the vehicles you registered to the app."
              ></ScoreComponentHorizontalBar>

              <ScoreComponentHorizontalBar
                :score="safetyScore"
                scoreTitle="Safety score"
                scoreToolTip="Safety score is computed taking into consideration your vehicle's speed deviation from
                  speed limit set by authorities for the road you transited. To improve this measure you should start by 
                  being more careful to street signs. In this way, it act as an indicator of your 
                  predisposition to incur a road traffic offence too. As well as the others, this metrics considers the data coming from all
                   the vehicles you registered to the app."
              ></ScoreComponentHorizontalBar>

              <ScoreComponentHorizontalBar
                :score="feedbackConsiderationScore"
                scoreTitle="Feeback-consideration score"
                scoreToolTip="Feeback-consideration score evaluates your attention to (and assimilation of) the tips and feedbacks
                  the app provides you at 360°. A low score marks a possible your weakness in listening, otherwise you are good 
                  improver. In this way, it act as an indicator of your skill in improving yourself. As well as the others, this
                   metrics considers the data coming from all the vehicles you registered to the app."
              ></ScoreComponentHorizontalBar>
              <!-- feedback cons score  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCircularProgressBar from "../components/AppCircularProgressBar.vue";
import ScoreComponentHorizontalBar from "../components/ScoreComponentHorizontalBar.vue";

export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    totalScore: { required: true },
    aggressivenessScore: { required: true },
    safetyScore: { required: true },
    feedbackConsiderationScore: { required: true },
  },
  components: {
    AppCircularProgressBar,
    ScoreComponentHorizontalBar,
  },
  mounted() {
    console.log("tripscore tab pane's is Active is", this.isActive);
  },
  watch: {
    totalScore(newVal, oldVal) {
      console.log("ZZZZZZZZZZZZZZZZZZZZZZold val: ", oldVal, ", new val:", newVal);
    },
    aggressivenessScore(newVal, oldVal) {
      console.log("ZZZZZZZZZZZZZZZZZZZZZZold val: ", oldVal, ", new val:", newVal);
    },
  },
};
</script>
