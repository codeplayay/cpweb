<template>
  <button
    class="btn btn-primary btn-sm"
    type="button"
    :disabled="loading"
    data-toggle="tooltip"
    :title="tooltip"
  >
    {{ text }}
    <!-- Loading -->
    <span
      class="spinner-grow spinner-grow-sm"
      role="status"
      aria-hidden="true"
      v-if="loading"
    />
  </button>
</template>

<script>
import $ from "jquery";

export default {
  name: "ButtonAsync",
  props: {
    loading: Boolean,
    text: String,
    tooltip: String
  },

  mounted() {
    this.popper();
  },

  updated() {
    this.popper();
  },

  methods: {
    popper: function() {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      $(".popover-dismiss").popover({
        trigger: "focus"
      });
    }
  }
};
</script>
