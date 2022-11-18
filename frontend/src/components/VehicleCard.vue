<template>
  <div class="col">
    <div class="card">
      <img
        src="/src/assets/style/img/mercedes_1920.jpg"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div class="d-flex justify-content-between align-middle">
          <div>
            <h1 class="card-title mb-0 pb-2" style="font-size: 180%">Fiat</h1>
            <h6 class="card-subtitle mb-2 text-muted">
              <span style="font-size: 140%">Panda</span>
              <span class="badge bg-secondary ms-2">Most used</span>
            </h6>
          </div>
          <div class="mt-3">
            <img
              src="https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg"
              style="max-width: 65px; max-height: 65px"
              alt="..."
            />
          </div>
        </div>

        <div class="d-flex justify-content-between align-middle">
          <div>
            <span class="card-text text-bf" style="font-size: 110%"
              >Diesel</span
            >
            <p
              class="card-text text-muted text-end"
              style="line-height: 90%; font-size: 90%"
            >
              fuel type
            </p>
          </div>

          <div>
            <span class="card-text text-bf" style="font-size: 110%"
              >Automatic</span
            >
            <p
              class="card-text text-muted text-end"
              style="line-height: 80%; font-size: 90%"
            >
              trany
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-middle mt-1">
          <div>
            <span class="card-text text-bf" style="font-size: 110%">2022</span>
            <p
              class="card-text text-muted"
              style="line-height: 80%; font-size: 90%"
            >
              year
            </p>
          </div>

          <div>
            <div class="d-flex">
              <span
                class="card-text text-bf text-end ms-auto"
                style="font-size: 120%"
                >32</span
              >
            </div>
            <p
              class="card-text text-muted text-end"
              style="line-height: 50%; font-size: 90%"
            >
              combined mpg<i class="bi bi-question-circle"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <small class="text-muted">Last trip 3 mins ago</small>
      </div>
    </div>
  </div>
  <!-- end of col wrapping card-->
</template>

<script>
export default {};
</script>
