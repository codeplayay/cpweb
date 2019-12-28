<template>
  <div class="hod">
    <div class="card shadow-sm">
      <div class="card-header">HOD</div>

      <div class="row no-gutters">
        <div class="col-12 col-md-4 border-md-right">
          <!-- Loading -->
          <div
            v-if="loading.listDepartments"
            class="d-flex justify-content-center p-4"
          >
            <span
              class="spinner-border text-secondary"
              role="status"
              aria-hidden="true"
            />
          </div>

          <!-- Empty list -->
          <EmptyResponse
            text="Empty list"
            v-else-if="departments.length === 0"
          />

          <!-- Loaded -->
          <div class="list-group list-group-flush" v-else>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              v-for="department in departments"
              v-bind:class="{
                active: department._id == selected.department._id
              }"
              :key="department._id"
              v-text="department.name"
              @click="selectDepartment(department)"
            />
          </div>
        </div>

        <div class="col-12 col-md-8">
          <!-- AutocompleteUser -->
          <div class="card-header" v-if="selected.department._id !== -1">
            <div class="form-group">
              <label>Select user</label>
              <AutocompleteUser
                get="user/teacher/autocomplete"
                @update="selectUser"
              />
            </div>
            <!-- Register -->
            <div class="d-flex justify-content-end">
              <!-- Update HOD button -->
              <ButtonAsync
                tooltip="Set this user as HOD"
                text="Update HOD"
                :loading="loading.updateHOD"
                @click.native="updateHOD()"
              />
            </div>
          </div>

          <div
            v-if="!loading.listDepartments && selected.department._id !== -1"
          >
            <!-- Loading -->
            <div
              v-if="loading.getHOD"
              class="d-flex justify-content-center p-4"
            >
              <span
                class="spinner-border text-secondary"
                role="status"
                aria-hidden="true"
              />
            </div>

            <div class="card-body" v-else>
              <EmptyResponse
                text="No HOD allocated"
                v-if="selected.hod._id === -1"
              />

              <!-- Profile -->
              <div v-else>
                <div class="d-flex justify-content-center">
                  <img
                    src="@/assets/avatars/elyse.png"
                    alt="profile"
                    class="img-thumbnail"
                    width="180"
                  />
                </div>
                <h3 class="text-center font-weight-normal mt-2">
                  {{ firstcap(selected.hod.user.fname) }}
                  {{ firstcap(selected.hod.user.mname) }}
                  {{ firstcap(selected.hod.user.lname) }}
                </h3>
                <h5
                  class="text-center font-weight-normal mt-2"
                  v-text="selected.department.name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import AutocompleteUser from "@/components/AutocompleteUser.vue";
import EmptyResponse from "@/components/EmptyResponse.vue";
import ButtonAsync from "@/components/ButtonAsync.vue";

export default {
  name: "HOD",
  components: {
    AutocompleteUser,
    EmptyResponse,
    ButtonAsync
  },
  data() {
    return {
      departments: [],
      loading: {
        listDepartments: false,
        updateHOD: false,
        getHOD: false
      },
      selected: {
        user: {
          _id: -1
        },
        department: {
          _id: -1
        },
        hod: {
          _id: -1
        }
      }
    };
  },

  mounted() {
    this.popper();
    this.listDepartments();
  },

  updated() {
    this.popper();
  },

  methods: {
    firstcap: function(param) {
      return param.charAt(0).toUpperCase() + param.slice(1);
    },

    popper: function() {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      $(".popover-dismiss").popover({
        trigger: "focus"
      });
    },

    listDepartments: function() {
      this.loading.listDepartments = true;

      axios
        .post(`${this.api.host}:${this.api.port}/department/list`)
        .then(response => {
          this.departments = response.data.prototype;
          this.loading.listDepartments = false;
        })
        .catch(error => {
          console.error(error);
          this.loading.list = false;
        });
    },

    selectUser: function(user) {
      this.selected.user = user;
    },

    selectDepartment: function(department) {
      this.selected.department = department;
      this.getHOD();
    },

    getHOD: function() {
      if (this.selected.department._id !== -1) {
        this.loading.getHOD = true;
        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/hod/get`, {
            department: this.selected.department._id
          })
          .then(response => {
            this.selected.hod = response.data.prototype;
            this.loading.getHOD = false;
          })
          .catch(error => {
            console.error(error);
            this.loading.getHOD = false;
          });
      }
    },

    updateHOD: function() {
      if (
        this.selected.user._id !== -1 &&
        this.selected.department._id !== -1
      ) {
        this.loading.updateHOD = true;
        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/hod/update`, {
            newHODId: this.selected.user._id,
            department: this.selected.department._id,
            oldHODPrototype: this.selected.hod._id
          })
          .then(() => {
            this.getHOD();
            this.loading.updateHOD = false;
          })
          .catch(error => {
            console.error(error);
            this.loading.updateHOD = false;
          });
      }
    }
  }
};
</script>
