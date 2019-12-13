<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header">HOD</div>

      <div class="row no-gutters">
        <div class="col-12 col-md-4 border-md-right">
          <!-- Loading -->
          <div v-if="loading.list" class="d-flex justify-content-center p-4">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
          </div>

          <!-- Empty list -->
          <div class="d-flex justify-content-center p-3" v-else-if="departments.length === 0">
            <img src="@/assets/empty.png" width="180" />
          </div>

          <div class="list-group list-group-flush" v-else>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              v-for="department in departments"
              v-bind:class="{ active: department._id == selected.department._id }"
              :key="department._id"
              v-text="department.name"
              @click="department__select(department)"
            />
          </div>
        </div>

        <div class="col-12 col-md-8">
          <!-- Autocomplete -->
          <div class="card-header" v-if="selected.department._id !== -1">
            <div class="form-group">
              <label>Select user</label>
              <Autocomplete get="user/teacher/autocomplete" @update="user__select" />
            </div>
            <!-- Register -->
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                @click="update"
                :disabled="loading.update"
                data-toggle="tooltip"
                title="Set this user as HOD"
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

          <div v-if="!loading.list && selected.department._id !== -1">
            <!-- Loading -->
            <div v-if="loading.get" class="d-flex justify-content-center p-4">
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
            </div>

            <div class="card-body" v-else>
              <div class="d-flex justify-content-center p-3" v-if="hod._id === -1">
                <img src="@/assets/empty.png" width="180" />
              </div>

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
                <h3
                  class="text-center font-weight-normal mt-2"
                >{{firstcap(hod.user.fname)}} {{firstcap(hod.user.mname)}} {{firstcap(hod.user.lname)}}</h3>
                <h5 class="text-center font-weight-normal mt-2" v-text="selected.department.name" />
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
import Autocomplete from "@/components/Autocomplete.vue";

export default {
  name: "HOD",
  components: {
    Autocomplete
  },
  data() {
    return {
      departments: [],
      hod: {
        _id: -1
      },
      loading: {
        list: false,
        update: false,
        get: false
      },
      selected: {
        user: {
          _id: -1
        },
        department: {
          _id: -1
        }
      }
    };
  },

  mounted() {
    this.popper();
    this.list();
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

    user__select: function(user) {
      this.selected.user = user;
    },

    department__select: function(department) {
      this.selected.department = department;
      this.get();
    },

    get: function() {
      if (this.selected.department._id !== -1) {
        this.loading.get = true;
        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/hod/get`, {
            department: this.selected.department._id
          })
          .then(response => {
            this.hod = response.data.prototype;
            this.loading.get = false;
          })
          .catch(error => {
            console.error(error);
            this.loading.get = false;
          });
      }
    },

    update: function() {
      if (
        this.selected.user._id !== -1 &&
        this.selected.department._id !== -1
      ) {
        this.loading.update = true;
        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/hod/update`, {
            user: this.selected.user._id,
            department: this.selected.department._id
          })
          .then(response => {
            console.log(response.data);
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
