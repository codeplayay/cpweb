<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center py-2">
        <span>Student Registration Form</span>
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
            <form id="student__register" class="was-validated" novalidate>
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
              <div class="form-row">
                <div class="form-group col-12 col-md-4">
                  <Select get="department/options" @update="department__select" />
                </div>
                <div class="form-group col-12 col-md-4">
                  <Select :get="class__get" @update="class__select" />
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
import Select from "@/components/Select.vue";

export default {
  name: "Register",
  components: {
    Select
  },
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
      selected: {
        department: {
          _id: -1
        },
        _class: {
          _id: -1
        }
      },

      // Sent along when fetching options for classes
      class__get: ""
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
      if (document.getElementById("student__register").checkValidity()) {
        if (
          this.selected.department._id !== -1 &&
          this.selected._class._id !== -1
        ) {
          this.loading.register = true;

          axios
            .post(`${this.api.host}:${this.api.port}/user/student/register`, {
              fname: this.user.fname,
              mname: this.user.mname,
              lname: this.user.lname,
              department: this.selected.department._id,
              _class: this.selected._class._id
            })
            .then(() => {
              this.loading.register = false;
            })
            .catch(error => {
              console.error(error);
              this.loading.register = false;
            });
        }
      }
    },

    department__select: function(department) {
      this.selected.department = department;
      this.class__get = "class/options/" + department._id;
    },

    class__select: function(_class) {
      this.selected._class = _class;
    }
  }
};
</script>
