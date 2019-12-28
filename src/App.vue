<template>
  <main id="app" class="h-100">
    <Nav />
    <div class="container my-4 h-100">
      <router-view />
    </div>
  </main>
</template>

<style></style>

<script>
import Nav from "@/components/Nav";

export default {
  name: "App",
  components: {
    Nav
  },
  mounted() {}
};
</script>
