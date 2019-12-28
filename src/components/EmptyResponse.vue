<template>
  <div class="empty-response">
    <div class="d-flex justify-content-center w-100">
      <img src="@/assets/logo-vector-light.svg" width="180" />
    </div>
    <div class="d-flex justify-content-center pb-4">
      <code class="text-muted" v-text="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyResponse",
  props: {
    text: String
  }
};
</script>
