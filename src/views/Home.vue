<template>
  <div class="container centered">
    <div class="rounded shadowX justify-content-center bg-light m-5 p-3" style="width: 500px">
      <h3>Contact us</h3>
      <p>contact with the office</p>
      <Form/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Form from '@/components/Form';

export default {
  name: 'Home',
  components: {
    Form
  }
}
</script>
<style scoped>
.form-holder {
  color: #999;
}

.form-holder h3 {
  color: #000;
  font-weight: 900;
}

.shadowX {
  background: #ffffff;
  box-shadow:  -20px -20px 60px #d9d9d9,
  20px 20px 60px #ffffff;
}

.centered{
  text-align: -webkit-center;
}
</style>
