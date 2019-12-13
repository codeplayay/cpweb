<template>
  <div class="card w-100 mb-2">
    <!-- Header -->
    <div class="card-header d-flex justify-content-between align-items-center py-2">
      <span>Classes of {{department.name}}</span>

      <!-- Create button -->
      <button
        class="btn btn-primary btn-sm"
        type="button"
        @click="create()"
        :disabled="loading.create"
        data-toggle="tooltip"
        title="Add a new class to your organization"
      >
        Create
        <!-- Loading -->
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
          v-if="loading.create"
        />
      </button>
    </div>

    <!-- List -->
    <ul class="list-group list-group-flush">
      <!-- Loading -->
      <li class="d-flex justify-content-center p-3" v-if="loading.list">
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading</span>
        </div>
      </li>

      <!-- Empty list -->
      <li class="list-group-item" v-else-if="classes.length === 0">
        <div class="d-flex justify-content-center">
          <img src="@/assets/empty.png" width="180" />
        </div>
      </li>

      <!-- List loaded -->
      <li v-else class="list-group-item" v-for="(_class, index) in classes" :key="_class._id">
        <div
          class="custom-control custom-radio custom-control-inline"
          data-toggle="tooltip"
          title="Edit class"
        >
          <input
            type="radio"
            :id="_class._id"
            name="_class"
            class="custom-control-input"
            @click="select(_class, index)"
          />
          <label class="custom-control-label" :for="_class._id" v-text="_class.name" />
        </div>

        <!-- Edit -->
        <div v-if="_class._id === selected._class._id" class="card mt-2">
          <div class="card-header py-2">Edit {{ _class.name }}</div>
          <div class="card-body">
            <!-- Form -->
            <form id="class__update" class="was-validated" novalidate>
              <!-- Class name -->
              <div class="form-group">
                <label>Class name</label>
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="_class.name"
                    v-model="selected._class.name"
                    aria-describedby="button-edit"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Class name"
                    pattern="^([A-Za-z0-9\s]{1,128})$"
                    data-content="Class name can contain only alphanumeric characters"
                    required
                  />
                  <div class="input-group-append">
                    <!-- Class update -->
                    <button
                      class="btn btn-secondary"
                      type="button"
                      id="button-edit"
                      :disabled="loading.update"
                      @click="update()"
                      data-toggle="tooltip"
                      title="Save changes made to selected class"
                    >
                      Update
                      <!-- Loading -->
                      <span
                        class="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                        v-if="loading.update"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "Classes",
  props: {
    department: Object
  },
  data() {
    return {
      loading: {
        create: false,
        list: false,
        update: false
      },
      classes: [],
      selected: {
        index: -1,
        _class: {
          _id: -1
        }
      }
    };
  },

  watch: {
    department: function() {
      this.list();
    }
  },

  mounted() {
    this.list();
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
    },

    select: function(_class, index) {
      this.selected._class = { ..._class };
      this.selected.index = index;
    },

    create: function() {
      this.loading.create = true;

      axios
        .post(`${this.api.host}:${this.api.port}/class/create`, {
          name: "New Class",
          department: this.department._id
        })
        .then(response => {
          this.classes.push(response.data.prototype);
          this.loading.create = false;
        })
        .catch(error => {
          console.error(error);
          this.loading.create = false;
        });
    },

    list: function() {
      this.loading.list = true;

      axios
        .post(`${this.api.host}:${this.api.port}/class/list`, {
          department: this.department._id
        })
        .then(response => {
          this.classes = response.data.prototype;
          this.loading.list = false;
        })
        .catch(error => {
          console.error(error);
          this.loading.list = false;
        });
    },

    update: function() {
      if (document.getElementById("class__update").checkValidity()) {
        this.loading.update = true;

        axios
          .post(`${this.api.host}:${this.api.port}/class/update`, {
            _id: this.selected._class._id,
            name: this.selected._class.name
          })
          .then(response => {
            this.classes[this.selected.index] = response.data.prototype;
            this.loading.update = false;
          })
          .catch(error => {
            console.error(error);
            this.loading.update = false;
          });
      }
    }
  }
};
</script>
