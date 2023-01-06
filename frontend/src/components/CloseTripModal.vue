<template>
  <div>
    <p>Do you want <a href="#" @click="modalToggle">now</a></p>
    <div>
      <button type="button" class="btn btn-primary" @click="modalToggle">
        My Modal
      </button>
      <div
        ref="modal"
        class="modal fade fade-in-modal"
        :class="{ show: active, 'd-block': active }"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                @click="modalToggle"
              ></button>
            </div>
            <div class="modal-body">
              <p></p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="$emit('tripCloseConfirmed')"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
                <!--Save changes-->
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<style scoped>
.fade-in-modal {
  animation: fadeIn 0.5s;
  -webkit-animation: fadeIn 0.5s;
  -moz-animation: fadeIn 0.5s;
  -o-animation: fadeIn 0.5s;
  -ms-animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    modalToggle() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
    },
  },
  emits: ["tripCloseConfirmed"],
};
</script>
