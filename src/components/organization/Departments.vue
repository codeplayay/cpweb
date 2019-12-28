<template>
  <div class="departments">
    <div class="card w-100 mb-2">
      <!-- Header -->
      <div
        class="card-header d-flex justify-content-between align-items-center py-2"
      >
        <span>Departments</span>

        <!-- Create button -->
        <ButtonAsync
          tooltip="Add a new department to your organization"
          text="Add"
          :loading="loading.createDepartment"
          @click.native="createDepartment()"
        />
      </div>

      <!-- List -->
      <ul class="list-group list-group-flush">
        <!-- Loading -->
        <li
          class="d-flex justify-content-center p-3"
          v-if="loading.listDepartments"
        >
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading</span>
          </div>
        </li>

        <!-- Empty list -->
        <li class="list-group-item" v-else-if="departments.length === 0">
          <EmptyResponse text="Create a department" />
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
              @click="selectDepartment(department, index)"
            />
            <label
              class="custom-control-label"
              :for="department._id"
              v-text="department.name"
            />
          </div>

          <!-- Edit -->
          <div
            v-if="department._id === selectedDepartment.data._id"
            class="card mt-2"
          >
            <div class="card-header py-2">Edit {{ department.name }}</div>
            <div class="card-body">
              <!-- Form -->
              <form id="updateDepartment" class="was-validated" novalidate>
                <!-- Department name -->
                <div class="form-group">
                  <label>Department name</label>
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="department.name"
                      v-model="selectedDepartment.data.name"
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
                      <ButtonAsync
                        tooltip="Save changes made to the selected department"
                        text="Update"
                        :loading="loading.updateDepartment"
                        @click.native="updateDepartment()"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonAsync from "@/components/ButtonAsync";
import EmptyResponse from "@/components/EmptyResponse";
import axios from "axios";
import $ from "jquery";

export default {
  name: "Departments",
  components: {
    ButtonAsync,
    EmptyResponse
  },
  data() {
    return {
      loading: {
        createDepartment: false,
        listDepartments: false,
        updateDepartment: false
      },
      departments: [],
      selectedDepartment: {
        index: -1,
        data: {
          _id: -1
        }
      }
    };
  },

  mounted() {
    this.listDepartments();
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

    selectDepartment: function(department, index) {
      this.selectedDepartment.data = { ...department };
      this.selectedDepartment.index = index;
      this.$emit("update", department);
    },

    listDepartments: async function() {
      this.loading.listDepartments = true;
      axios
        .post(`${this.api.host}:${this.api.port}/department/list`)
        .then(response => {
          this.departments = response.data.prototype;
          this.loading.listDepartments = false;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else {
            // No Internet
          }
          this.loading.listDepartments = false;
        });
    },

    createDepartment: function() {
      this.loading.createDepartment = true;

      axios
        .post(`${this.api.host}:${this.api.port}/department/create`, {
          name: "New Department"
        })
        .then(response => {
          this.departments.push(response.data.prototype);
          this.loading.createDepartment = false;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else {
            // No Internet
          }
          this.loading.createDepartment = false;
        });
    },

    updateDepartment: function() {
      if (document.getElementById("updateDepartment").checkValidity()) {
        this.loading.updateDepartment = true;

        axios
          .post(`${this.api.host}:${this.api.port}/department/update`, {
            department: this.selectedDepartment.data._id,
            name: this.selectedDepartment.data.name
          })
          .then(response => {
            this.departments[this.selectedDepartment.index] =
              response.data.prototype;
            this.loading.updateDepartment = false;
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.status);
            } else {
              // No Internet
            }
            this.loading.updateDepartment = false;
          });
      }
    }
  }
};
</script>
