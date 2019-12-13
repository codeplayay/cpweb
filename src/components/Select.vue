<template>
  <div class="dropdown">
    <input
      type="text"
      class="form-control"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      v-model="selected.label"
      readonly
    />
    <div class="dropdown-menu mt-2 w-100">
      <span class="dropdown-menu-arrow"></span>

      <div v-if="loading.fetch" class="px-3">
        <code>Loading</code>
      </div>

      <div v-else-if="options.length">
        <div
          class="dropdown-item"
          v-for="option in options"
          :key="option._id"
          v-text="option.label"
          @click="select(option)"
        />
      </div>

      <!-- Empty list -->
      <div v-else class="px-3">
        <div class="d-flex justify-content-center">
          <img src="@/assets/empty.png" width="180" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Select",
  props: {
    get: String
  },
  data() {
    return {
      loading: {
        fetch: false
      },
      selected: {
        _id: -1,
        label: null
      },

      options: []
    };
  },
  mounted() {
    if (this.get) this.fetch();
  },
  methods: {
    select: function(option) {
      this.selected._id = option._id;
      this.selected.label = option.label;
      this.$emit("update", this.selected);
    },
    fetch: function() {
      this.loading.fetch = true;
      // Implement api call
      axios
        .post(`${this.api.host}:${this.api.port}/${this.get}`)
        .then(response => {
          this.loading.fetch = false;
          this.options = response.data.prototype;
          this.select(this.options[0]);
        })
        .catch(error => {
          this.loading.fetch = false;
          console.error(error);
        });
    }
  },
  watch: {
    get: function(current, old) {
      if (current !== old) this.fetch();
    }
  }
};
</script>

<style scoped>
input {
  background-color: white !important;
}
</style>


