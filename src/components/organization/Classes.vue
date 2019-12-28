<template>
  <div class="classes">
    <div class="card w-100 mb-2">
      <!-- Header -->
      <div
        class="card-header d-flex justify-content-between align-items-center py-2"
      >
        <span>Classes of {{ department.name }}</span>

        <!-- Create button -->
        <ButtonAsync
          tooltip="Add a new class to your organization"
          text="Add"
          :loading="loading.createClass"
          @click.native="createClass()"
        />
      </div>

      <!-- List -->
      <ul class="list-group list-group-flush">
        <!-- Loading -->
        <li
          class="d-flex justify-content-center p-3"
          v-if="loading.listClasses"
        >
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading</span>
          </div>
        </li>

        <!-- Empty list -->
        <li class="list-group-item" v-else-if="classes.length === 0">
          <EmptyResponse text="Create a class" />
        </li>

        <!-- List loaded -->
        <li
          v-else
          class="list-group-item"
          v-for="(_class, index) in classes"
          :key="_class._id"
        >
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
            <label
              class="custom-control-label"
              :for="_class._id"
              v-text="_class.name"
            />
          </div>

          <!-- Edit -->
          <div v-if="_class._id === selectedClass.data._id" class="card mt-2">
            <div class="card-header py-2">Edit {{ _class.name }}</div>
            <div class="card-body">
              <!-- Form -->
              <form id="updateClass" class="was-validated" novalidate>
                <!-- Class name -->
                <div class="form-group">
                  <label>Class name</label>
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="_class.name"
                      v-model="selectedClass.data.name"
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
                      <ButtonAsync
                        tooltip="Save changes made to the selected department"
                        text="Update"
                        :loading="loading.updateClass"
                        @click.native="updateClass()"
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
  name: "Classes",
  props: {
    department: Object
  },
  components: {
    ButtonAsync,
    EmptyResponse
  },
  data() {
    return {
      loading: {
        createClass: false,
        listClasses: false,
        updateClass: false
      },
      classes: [],
      selectedClass: {
        index: -1,
        data: {
          _id: -1
        }
      }
    };
  },

  watch: {
    department: function() {
      this.listClasses();
    }
  },

  mounted() {
    this.listClasses();
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
      this.selectedClass.data = { ..._class };
      this.selectedClass.index = index;
    },

    createClass: function() {
      this.loading.createClass = true;

      axios
        .post(`${this.api.host}:${this.api.port}/class/create`, {
          name: "New Class",
          department: this.department._id
        })
        .then(response => {
          this.classes.push(response.data.prototype);
          this.loading.createClass = false;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else {
            // No Internet
          }
          this.loading.createClass = false;
        });
    },

    listClasses: function() {
      this.loading.listClasses = true;

      axios
        .post(`${this.api.host}:${this.api.port}/class/list`, {
          department: this.department._id
        })
        .then(response => {
          this.classes = response.data.prototype;
          this.loading.listClasses = false;
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.status);
          } else {
            // No Internet
          }
          this.loading.listClasses = false;
        });
    },

    updateClass: function() {
      if (document.getElementById("updateClass").checkValidity()) {
        this.loading.updateClass = true;

        axios
          .post(`${this.api.host}:${this.api.port}/class/update`, {
            _class: this.selectedClass.data._id,
            name: this.selectedClass.data.name
          })
          .then(response => {
            this.classes[this.selectedClass.index] = response.data.prototype;
            this.loading.updateClass = false;
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.status);
            } else {
              // No Internet
            }
            this.loading.updateClass = false;
          });
      }
    }
  }
};
</script>
