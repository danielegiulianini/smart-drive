<template>
  <Spinner :show="isLoading"></Spinner>

  <div
    class="card pt-2"
    style="box-shadow: none"
    v-if="!hasUserRegisteredAVehicle"
  >
    <div class="card-body text-center">
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        style="height: 90vh"
      >
        <h1 style="font-size: 150%">
          You can't start trip without registering vehicles first.
        </h1>
        <p class="text-muted">Add one to your garage!</p>
        <div
          class="btn btn-light"
          @click="this.$router.push('/garage')"
          style="background-color: #012970; color: white"
        >
          Register a vehicle
        </div>
      </div>
    </div>
  </div>
  <main
    id="outer-container"
    style="height: 100vh; overflow-y: hidden; overflow-x: hidden"
    v-else
  >
    <div class="vehicle-dashboard tooltip" :class="{ tooltipShow: started }">
      <!-- show dashboard only if trip is started!-->
      <div class="mt-5 pt-5 pb-0 mb-0">
        <Speedometer :kph="kph"></Speedometer>
      </div>

      <div class="row p-3 pt-0 mt-0 pb-1">
        <div class="col">
          <RpmMeter :rpm="rpm"></RpmMeter>
        </div>
        <div class="col d-flex justify-content-center">
          <div class="d-flex" data-v-13fae52c="">
            <div class="my-auto" style="font-family: 'Open Sans'">
              <FuelTankLevelMeter
                :fuelTankLevel="fuelTankLevel"
              ></FuelTankLevelMeter>
              <Odometer :odometer="odometer"></Odometer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-element mx-auto">
      <div class="form-check form-switch px-3" style="z-index: 10000">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          v-model="acousticFeedbackEnabled"
          :disabled="!acousticFeedbackSupported"
        />
        <label
          class="form-check-label text-muted"
          style="font-size: 90%"
          for="flexSwitchCheckDefault"
          >Acoustic feedback
          <span :class="{ 'text-primary': acousticFeedbackEnabled }">{{
            acousticFeedbackEnabledText
          }}</span></label
        >
      </div>
    </div>
    <!-- end of row-->

    <div class="button-row p-3 text-center">
      <AppDriveButton
        @click="onDriveButtonClicked"
        :spin="isStarting"
        :driveButtonName="driveButtonName"
      ></AppDriveButton>
    </div>
  </main>

  <CloseTripModalVue
    ref="closeTripModal"
    @tripCloseConfirmed="onTripCloseConfirmed"
  ></CloseTripModalVue>

  <TheAppMobileNavbar></TheAppMobileNavbar>
</template>

<script>
import CloseTripModalVue from "../components/CloseTripModal.vue";
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppMobileNavbar from "../components/TheAppMobileNavbar.vue";
import Speedometer from "../components/Speedometer.vue";
import RpmMeter from "../components/RpmMeter.vue";
import FuelTankLevelMeter from "../components/FuelTankLevelMeter.vue";
import Odometer from "../components/Odometer.vue";
import AppDriveButton from "../components/AppDriveButton.vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import EasySpeech from "easy-speech";

export default {
  components: {
    TheAppHeader,
    TheAppMobileNavbar,
    AppDriveButton,
    Speedometer,
    RpmMeter,
    Odometer,
    Spinner,
    FuelTankLevelMeter,
    CloseTripModalVue,
  },
  data() {
    return {
      showModal: false,
      //mirroring backend's mongoose trips'measurement schema
      acousticFeedbackEnabled: true,
      acousticFeedbackSupported: true,
      isLoading: true,
      started: false,
      isStarting: false,
      isEnded: false,
      rpm: 0, //or to be replaced by "" and some logic for hiding charts if not measurement are still
      kph: 0,
      odometer: 0,
      fuelTankLevel: 0,
      _id: "", //future Trip's ID
      hasUserRegisteredAVehicle: false,
      voice: "",
      //for navigation
      to: "",
    };
  },
  computed: {
    driveButtonName() {
      return this.started ? "End" : "Start";
    },
    acousticFeedbackEnabledText() {
      return this.acousticFeedbackEnabled ? "enabled" : "disabled";
    },
    acousticFeedbackClassObject() {
      return this.acousticFeedbackEnabled ? "text-primary" : "text-muted";
    },
  },
  methods: {
    onDriveButtonClicked() {
      if (!this.started) {
        console.log("starting trip");
        const loggedInUserId = this.$store.getters.getUser.id;
        axios
          .post("trips", {
            userId: loggedInUserId,
          })
          .then((newTripRes) => {
            this._id = newTripRes.data._id;
            this.started = true; //putting this here for not allowing to close (from the view) a trip not actually posted to backend
            this.isStarting = false;
          })
          .catch((err) => console.error(err)); //maybe a more user-friendly message here
      } else {
        //close axios call and redirect
        this.displayTripCloseConfirmationModal();
      }
    },
    onNewMeasurement(data) {
      //decoding data
      var buffer = new Uint8Array(data);
      var fileString = String.fromCharCode.apply(null, buffer);
      var measurement = JSON.parse(fileString).measurement;

      console.log(
        "measurement arrived, with rpm:",
        measurement.rpm,
        " kph:",
        measurement.kph,
        "odometer:",
        measurement.odometer,
        "fuelTankLevel: ",
        measurement.fuelTankLevel
      );

      this.rpm = measurement.rpm;
      this.kph = measurement.kph;
      this.odometer = measurement.odometer;
      this.fuelTankLevel = measurement.fuelTankLevel;
    },
    onNewDrivingFeedback(drivingFeedback) {
      console.log("feedback arrived");

      if (this.acousticFeedbackEnabled) {
        this.speak(drivingFeedback.feedback.text);
      } else {
        console.log("not speaking as acoustic feedback disabled");
      }
    },
    speak(text) {
      console.log("speaking!");
      console.log("lo status: ", EasySpeech.status());
      if (
        EasySpeech.status().status == "speak complete" ||
        EasySpeech.status().status == "init complete" ||
        EasySpeech.status().startsWith("voices loaded")
      ) //with this I can increase frequency of sending by nodemcu...
        EasySpeech.speak({ text: text, voice: this.voice });
    },
    displayTripCloseConfirmationModal() {
      this.$refs.closeTripModal.modalToggle(); //bad quality code (using refs to call method) for lack of time to refactor all modals
    },
    onTripCloseConfirmed() {
      console.log("redirecting to", {
        name: "TripDetail",
        params: { _id: this._id },
      });

      this.started = false;

      axios
        .post(`trips/${this._id}`)
        .catch((err) => console.error(err)) //maybe a more user-friendly message here
        .then(() => {
          //deciding if arriving here from close button or after moving to other pages
          let destination = { name: "TripDetail", params: { _id: this._id } };
          if (this.to) {
            destination = this.to;
          }
          this.$router.push(destination);
        });
    },
  },
  mounted() {
    EasySpeech.detect();
    EasySpeech.init()
      .then(() => {
        this.voice = EasySpeech.voices()[104]; //choosing UK voice
        if (this.acousticFeedbackEnabled) {
          this.speak("welcome");
        }
      })
      .catch((e) => console.error("no speech synthesis:", e.message));

    if ("speechSynthesis" in window) {
      console.log("speech supported");
    } else {
      console.log("speech not supported");
      //display error notification
      this.acousticFeedbackSupported = false;
      this.acousticFeedbackEnabled = false;
    }

    this.$store.state.users.socket.on("measurement", this.onNewMeasurement);
    this.$store.state.users.socket.on(
      "drivingNotification",
      this.onNewDrivingFeedback
    );

    const loggedInUser = this.$store.getters.getUser.id; //12, { questa è corretta
    //check if at least a vehicle is present!
    axios
      .get(`vehicles/userVehicles?userId=${loggedInUser}`)
      .then((vehiclesRes) => {
        if (vehiclesRes.data.length > 0) {
          this.hasUserRegisteredAVehicle = true;
        }
      })
      .finally(() => (this.isLoading = false));
  },
  // called when the route that renders this component is about to
  // be navigated away from. It has access to `this` component instance.
  // with window.addEventListener("beforeunload", callback) I could
  // intercept browser closing too (so it would be better)
  beforeRouteLeave(to, from, next) {
    //if there is a trip started must ask to close it or to remain here
    if (this.started) {
      this.to = to;
      this.displayTripCloseConfirmationModal();
    } else {
      next();
    }
    // bad practice to use alert if (window.confirm("Are you sure you want to leave the page?")) {},
    // so displaying a custom modal instead
  },
};
</script>

<style lang="css" scoped>
#outer-container {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
/*main {
  height: 85vh; /*[or 700 px] for 1. Containing the image but 2. Not force user to scroll
  background-image: url(/src/assets/img/road.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}*/

/*for thin screen bigger bottom margin*/
@media screen and (max-width: 300px) {
  .button-row {
    margin-bottom: 5%;
  }
}
@media only screen and (max-width: 600px) {
  body {
    background-color: red;
  }
}
/*for thin screen bigger bottom margin*/
@media screen and (min-width: 300px) {
  body {
    background-color: red !important;
  }
  .button-row {
    margin-bottom: 30%;
  }
}

/* for scowing dashboard only if when started, with a transition effect*/
.tooltip {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  transition: transform 0.35s, opacity 0.25s;
}

.tooltipShow {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
