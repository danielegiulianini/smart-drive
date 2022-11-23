<template>
  <form @submit.prevent="onSubmit">
    <!--year -->
    <select name="cars" id="year">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
    <!--make -->
    <select name="cars" id="make">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
    <!--model -->
    <select name="cars" id="model">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
    <!--series -->
    <select name="cars" id="series">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  </form>
</template>

<script>
export default {
  methods: {
    submitForm: function (e) {
      e.prevent;
    },
  },
};
</script>
