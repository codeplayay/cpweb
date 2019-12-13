<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center py-2">
        <span>Teacher Registration Form</span>
        <!-- Register -->
        <button
          class="btn btn-primary btn-sm"
          type="button"
          @click="register()"
          :disabled="loading.register"
          data-toggle="tooltip"
          title="Register this user"
        >
          Register
          <!-- Loading -->
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
            v-if="loading.create"
          />
        </button>
      </div>

      <div class="row">
        <div class="col-12 col-md-3 border-md-right">
          <!-- Profile -->
        </div>
        <div class="col-12 col-md-9">
          <div class="card-body">
            <!-- Form -->
            <form id="teacher__register" class="was-validated" novalidate>
              <div class="form-row">
                <!-- First name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="First Name"
                    v-model="user.fname"
                    pattern="^([A-Za-z]{1,24})$"
                    data-content="First name can contain only alphabets"
                    required
                  />
                </div>
                <!-- Middle name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Middle Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Middle Name"
                    v-model="user.mname"
                    pattern="^([A-Za-z]{1,24})$"
                    data-content="Middle name can contain only alphabets"
                    required
                  />
                </div>
                <!-- Last name -->
                <div class="form-group col-12 col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Last Name"
                    data-content="Last name can contain only alphabets"
                    v-model="user.lname"
                    pattern="^([A-Za-z]{1,24})$"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "Register",
  data() {
    return {
      loading: {
        register: false
      },
      user: {
        fname: "",
        mname: "",
        lname: ""
      },
    };
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
    },

    register: function() {
      if (document.getElementById("teacher__register").checkValidity()) {
        this.loading.register = true;

        axios
          .post(`${this.api.host}:${this.api.port}/user/teacher/register`, {
            fname: this.user.fname,
            mname: this.user.mname,
            lname: this.user.lname
          })
          .then(() => {
            this.loading.register = false;
          })
          .catch(error => {
            console.error(error);
            this.loading.register = false;
          });
      }
    },
  }
};
</script>
