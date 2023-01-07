<template>
  <main>
    <div class="container">
      <section
        class="section error-404 min-vh-50 d-flex flex-column align-items-center justify-content-center"
      >
        <h1 style="color: #012970">404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <div
          class="btn btn-light"
          @click="this.$router.push('/')"
          style="background-color: #012970"
        >
          Back to home
        </div>
        <img
          src="/src/assets/img/dead-end.png"
          class="img-fluid py-5"
          alt="Page Not Found"
          style="max-height: 500px"
        />
      </section>
    </div>
  </main>
</template>
