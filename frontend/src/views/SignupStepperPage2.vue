<template>
  <section
    class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center"
        >
          <div class="card mb-3">
            <div class="card-body">
              <div class="pt-4 pb-2">
                <h5 class="card-title text-center pb-0 fs-4">
                  Create an Account
                </h5>
                <p class="text-center small">
                  Enter your personal details to create account
                </p>
              </div>

              <!-- start of stepper here-->
              <div class="wrapper option-1 option-1-1">
                <div class="c-stepper">
                  <li class="c-stepper__item active">
                    <h3 class="c-stepper__title mb-0">User info</h3>
                    <p class="c-stepper__desc" style="font-size: 90%">
                      Some desc text
                    </p>
                    <div id="r"></div>
                  </li>
                  <li class="c-stepper__item inactive">
                    <h3 class="c-stepper__title mb-0">Vehicle info</h3>
                    <p class="c-stepper__desc" style="font-size: 90%">
                      Some desc text
                    </p>
                  </li>
                  <li class="c-stepper__item inactive">
                    <h3 class="c-stepper__title mb-0">Summary</h3>
                    <p class="c-stepper__desc" style="font-size: 90%">
                      Some desc text
                    </p>
                  </li>
                </div>
              </div>

              <div class="p-lg-5 p-4" style="padding-bottom: 20%">
                <!-- user image-->
                <div class="d-flex justify-content-between align-items-center">
                  <label for="yourName" class="form-label">Your Image</label>
                  <div
                    class="btn"
                    style="border-color: grey; border-width: 2px"
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </div>
                </div>
                <div class="drag-area mt-1 responsive-height">
                  <!--style="height: 40vw"-->
                  <div class="icon">
                    <i class="fas fa-images"></i>
                  </div>

                  <span class="header">Drag & Drop</span>
                  <span class="header"
                    >or <span class="button">browse</span></span
                  >
                  <input type="file" hidden />
                  <span class="support">Supports: JPEG, JPG, PNG</span>
                </div>
                <!-- user info form -->

                <form class="row g-3 needs-validation" novalidate>
                  <!--<div class="col-lg-10">-->
                  <div class="col-12">
                    <label for="yourName" class="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="yourName"
                      required
                    />
                    <div class="invalid-feedback">Please, enter your name!</div>
                  </div>

                  <div class="col-12">
                    <label for="yourEmail" class="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      class="form-control"
                      id="yourEmail"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter a valid Email adddress!
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="yourUsername" class="form-label"
                      >Username</label
                    >
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend"
                        >@</span
                      >
                      <input
                        type="text"
                        name="username"
                        class="form-control"
                        id="yourUsername"
                        required
                      />
                      <div class="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="yourPassword" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      id="yourPassword"
                      required
                    />
                    <div class="invalid-feedback">
                      Please enter your password!
                    </div>
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
                      />
                      <label class="form-check-label" for="acceptTerms"
                        >I agree and accept the
                        <a href="#">terms and conditions</a></label
                      >
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <!--<div class="col-12 pt-4">
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-primary btn-lg" type="submit">
                        Back
                      </button>
                      <button class="btn btn-primary btn-lg" type="submit">
                        Next
                      </button>
                    </div>
                  </div>-->
                  <div class="pt-3 d-grid gap-2 d-flex justify-content-between">
                    <button class="btn btn-primary w-50" type="button">
                      <!--style="width:100px"-->
                      Button
                    </button>
                    <button class="btn btn-primary w-50" type="button">
                      <!--style="width:100px"-->
                      Button
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Already have an account?
                      <a href="pages-login.html">Log in</a>
                    </p>
                  </div>
                  <!--</div>-->
                </form>

                <!-- vehicle detail form-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.drag-area {
  height: 400px;
  border: 3px dashed #e0eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
}

h3 {
  margin-bottom: 20px;
  font-weight: 500;
}

.drag-area .icon {
  font-size: 50px;
  color: #1683ff;
}

.drag-area .header {
  font-size: 20px;
  font-weight: 500;
  color: #34495e;
}

.drag-area .support {
  font-size: 12px;
  color: gray;
  margin: 10px 0 15px 0;
}

.drag-area .button {
  font-size: 20px;
  font-weight: 500;
  color: #1683ff;
  cursor: pointer;
}

.drag-area.active {
  border: 2px solid #1683ff;
}

.drag-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:root {
  --circle-size: clamp(1.5rem, 5vw, 2rem);
  --spacing: clamp(0.25rem, 2vw, 0.5rem);
  font-family: "Poppins, sans-serif";
}

.c-stepper {
  display: flex;
}

#r {
  content: "";
  width: 45px;
  background: #ccc;
}
.c-stepper__item {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;

  &:before {
    --size: 3rem;
    content: "";
    display: block;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
    //background-color: lightgrey;
    // background-color: blue;
    opacity: 0.5;
    margin: 0 auto 1rem;
  }

  &:not(:last-child) {
    &:after {
      content: "";
      position: relative;
      top: calc(var(--circle-size) / 2);
      width: calc(100% - var(--circle-size) - calc(var(--spacing) * 2));
      left: calc(50% + calc(var(--circle-size) / 2 + var(--spacing)));
      height: 2px;
      background-color: #e0e0e0;
      order: -1;
    }
  }
}

.c-stepper__item.active {
  &:before {
    background-color: blue;
  }
}

.c-stepper__item.inactive {
  &:before {
    background-color: lightgrey;
  }
}

.c-stepper__item.error {
  &:before {
    background-color: red;
  }
}

.c-stepper__title {
  font-weight: bold;
  font-size: clamp(1rem, 4vw, 1.25rem);
  margin-bottom: 0.5rem;
}

//============ adjust drag area size based on screen size ========
//xs
@media (max-width: 576px) {
  .responsive-height {
    height: 40vw;
  }
}
//sm
@media (min-width: 576px) {
  .responsive-height {
    height: 30vw;
  }
}
//md
@media (min-width: 768px) {
  .responsive-height {
    height: 30vw;
  }
}
/*
.c-stepper__desc {
  color: grey;
  font-size: clamp(0.85rem, 2vw, 1rem);
  padding-left: var(--spacing);
  padding-right: var(--spacing);
}*/
</style>
