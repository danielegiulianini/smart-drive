<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="pt-4 pb-2">
        <h5 class="card-title text-center pb-0 fs-4">
          Add a vehicle to your garage
        </h5>
        <p class="text-center small">
          Enter your personal details to create account
        </p>
      </div>
      <div class="p-lg-5 p-4" style="padding-bottom: 20%">
        <!-- image uploader-->
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <label for="yourName" class="form-label">Your Image</label>
            <div class="btn" style="border-color: grey; border-width: 2px">
              <i class="bi bi-trash3-fill"></i
              ><!-- to be displayed only when a image is upload-->
            </div>
          </div>
          <div class="drag-area mt-1 responsive-height">
            <!--style=&quot;height: 40vw&quot;-->
            <div class="icon"><i class="fas fa-images"></i></div>
            <span class="header">Drag &amp; Drop</span
            ><span class="header">or <span class="button">browse</span></span
            ><input type="file" hidden /><span class="support"
              >Supports: JPEG, JPG, PNG</span
            >
          </div>
        </div>
        <!-- end of image uploader-->

        <!-- vehicle info form -->
        <form class="row g-3 needs-validation" novalidate>
          <!--&lt;div class=&quot;col-lg-10&quot;&gt;-->
          <div class="col-12">
            <label for="yourName" class="form-label"
              >Your Vehicle year of made</label
            ><select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div class="invalid-feedback">Please, enter your name!</div>
          </div>
          <div class="col-12">
            <label for="yourEmail" class="form-label">Your vehicle make</label
            ><select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div class="invalid-feedback">
              Please enter a valid Email adddress!
            </div>
          </div>
          <div class="col-12">
            <label for="yourUsername" class="form-label"
              >Your vehicle Model</label
            >
            <div class="input-group has-validation">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-12">
            <label for="yourPassword" class="form-label"
              >Your vehicle Series</label
            ><select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div class="invalid-feedback">Please enter your password!</div>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <div class="form-check">
              <input
                class="form-check-input"
                name="terms"
                type="checkbox"
                value=""
                id="acceptTerms"
                required
              /><label class="form-check-label" for="acceptTerms"
                >Mark a the default selected vehicle for future trips
              </label>
              <div class="invalid-feedback">
                Mark a the default selected vehicle for future trips
              </div>
            </div>
          </div>
          <div class="pt-3 d-grid gap-2 d-flex justify-content-between">
            <button
              class="btn btn-secondary w-50"
              type="button"
              data-bs-dismiss="modal"
            >
              Close</button
            ><button class="btn btn-primary w-50" type="button">
              Button
            </button>
          </div>
        </form>
        <!-- vehicle detail form-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: {
    /* forse i vehicles per fare un po di client side validation altrimenti la faccio con axios*/
  },
  data() {
    //this cannot be a field because every instance of this component must have its own state
    return {
      domain: {
        years: [],
        makes: [],
        models: [],
        series: [],
        vid: "",
      },
      vehicle: {
        _id: "", //the so-called vin
        pictureUri: "",
        userId: "",
        //retired,  //not needed as default in mongoose
      },
    };
  },
};
</script>

<style scoped></style>
