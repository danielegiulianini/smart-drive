<template>
  <TheAppHeader></TheAppHeader>
  <TheAppSidebar></TheAppSidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Sabato, 12/5/22</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Fiat Panda 100</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->
    <div>ciao come stai ???</div>
    <div class="card"></div>
  </main>
  <TheAppFooter></TheAppFooter>
</template>

<script>
import TheAppHeader from "../components/TheAppHeader.vue";
import TheAppSidebar from "../components/TheAppSidebar.vue";
import TheAppFooter from "../components/TheAppFooter.vue";

export default {
  components: { TheAppHeader, TheAppSidebar, TheAppFooter },
};
</script>
