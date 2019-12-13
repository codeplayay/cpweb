<template>
  <div class="dropdown">
    <input
      type="text"
      class="form-control"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @keyup="input__change"
      v-model="selected.label"
    />
    <div class="dropdown-menu mt-2 w-100">
      <span class="dropdown-menu-arrow"></span>

      <div v-if="loading.fetch" class="px-3">
        <code>Loading</code>
      </div>

      <!-- Empty list -->
      <div v-else-if="options.length === 0" class="px-3">
        <code>No results</code>
      </div>

      <div v-else>
        <div
          class="dropdown-item"
          v-for="option in options"
          :key="option._id"
          @click="select(option)"
        >{{firstcap(option.fname)}} {{firstcap(option.mname)}} {{first(option.lname)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Autocomplete",
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

      options: [],

      query: null
    };
  },

  methods: {
    firstcap: function(param) {
      return param.charAt(0).toUpperCase() + param.slice(1);
    },

    select: function(option) {
      this.selected._id = option._id;
      this.selected.label = `${this.firstcap(option.fname)} ${this.firstcap(
        option.mname
      )} ${this.firstcap(option.lname)}`;
      this.$emit("update", this.selected);
    },

    input__change: function(event) {
      // 32 : Whitespace
      // 13 :  Carriage return
      if (event.keyCode == 32 || event.keyCode == 13) {
        if (this.query != this.selected.label.trim()) {
          this.query = this.selected.label.trim();
          this.fetch();
        }
      }
    },

    fetch: function() {
      this.loading.fetch = true;
      // Implement api call
      axios
        .post(`${this.api.host}:${this.api.port}/${this.get}`, {
          query: this.query
        })
        .then(response => {
          this.loading.fetch = false;
          this.options = response.data.prototype;
        })
        .catch(error => {
          this.loading.fetch = false;
          console.error(error);
        });
    }
  }
};
</script>