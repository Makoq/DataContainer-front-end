<template>
  <div class="footer">
    <div class="footer-content copyright">
      <h2 class="copyright-title">Data Container - Open Geographic Modeling and Simulation</h2>
      <span>Copyright © 2013-2019 OpenGMS. All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-footer"
};
</script>

<style scoped>
.footer {
  padding: 30px 10px 10px;
  color: white;
  line-height: 2;
}

.footer-content {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  max-width: 1200px;
  min-width: 320px;
  margin: auto;
}

.copyright {
  margin-top: 20px;
  border-top: solid 1px #c8c8ca;
  color: #16161b;
}

.copyright span {
  display: inline-block;
}

.copyright-title {
  margin-top: 40px;
  margin-bottom: 15px;
  font-style: italic;
}
</style>
