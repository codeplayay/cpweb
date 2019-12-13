<template>
  <div class="card w-100 mb-2">
    <!-- Header -->
    <div class="card-header d-flex justify-content-between align-items-center py-2">
      <span>Departments</span>

      <!-- Create button -->
      <button
        class="btn btn-primary btn-sm"
        type="button"
        @click="create()"
        :disabled="loading.create"
        data-toggle="tooltip"
        title="Add a new department to your organization"
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
      <li class="list-group-item" v-else-if="departments.length === 0">
        <div class="d-flex justify-content-center">
          <img src="@/assets/empty.png" width="180" />
        </div>
      </li>

      <!-- List loaded -->
      <li
        v-else
        class="list-group-item"
        v-for="(department, index) in departments"
        :key="department._id"
      >
        <div
          class="custom-control custom-radio custom-control-inline"
          data-toggle="tooltip"
          title="Edit department"
        >
          <input
            type="radio"
            :id="department._id"
            name="department"
            class="custom-control-input"
            @click="select(department, index)"
          />
          <label class="custom-control-label" :for="department._id" v-text="department.name" />
        </div>

        <!-- Edit -->
        <div v-if="department._id === selected.department._id" class="card mt-2">
          <div class="card-header py-2">Edit {{ department.name }}</div>
          <div class="card-body">
            <!-- Form -->
            <form id="department__update" class="was-validated" novalidate>
              <!-- Department name -->
              <div class="form-group">
                <label>Department name</label>
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="department.name"
                    v-model="selected.department.name"
                    aria-describedby="button-edit"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Department name"
                    pattern="^([A-Za-z0-9\s]{1,128})$"
                    data-content="Department name can contain only alphanumeric characters"
                    required
                  />
                  <div class="input-group-append">
                    <!-- Department update -->
                    <button
                      class="btn btn-secondary"
                      type="button"
                      id="button-edit"
                      :disabled="loading.update"
                      @click="update()"
                      data-toggle="tooltip"
                      title="Save changes made to selected department"
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
  name: "Departments",
  data() {
    return {
      loading: {
        create: false,
        list: false,
        update: false
      },
      departments: [],
      selected: {
        index: -1,
        department: {
          _id: -1
        }
      }
    };
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

    select: function(department, index) {
      this.selected.department = { ...department };
      this.selected.index = index;
      this.$emit("update", department);
    },

    list: function() {
      this.loading.list = true;

      axios
        .post(`${this.api.host}:${this.api.port}/department/list`)
        .then(response => {
          this.departments = response.data.prototype;
          this.loading.list = false;
        })
        .catch(error => {
          console.error(error);
          this.loading.list = false;
        });
    },

    create: function() {
      this.loading.create = true;

      axios
        .post(`${this.api.host}:${this.api.port}/department/create`, {
          name: "New Department"
        })
        .then(response => {
          this.departments.push(response.data.prototype);
          this.loading.create = false;
        })
        .catch(error => {
          console.error(error);
          this.loading.create = false;
        });
    },

    update: function() {
      if (document.getElementById("department__update").checkValidity()) {
        this.loading.update = true;

        axios
          .post(`${this.api.host}:${this.api.port}/department/update`, {
            _id: this.selected.department._id,
            name: this.selected.department.name
          })
          .then(response => {
            this.departments[this.selected.index] = response.data.prototype;
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
