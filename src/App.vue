<template>
  <div id="app" class="h-100">
    <Nav />
    <router-view />
  </div>
</template>

<style></style>

<script>
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: {
    Nav
  },
  mounted() {
  }
};
</script>
