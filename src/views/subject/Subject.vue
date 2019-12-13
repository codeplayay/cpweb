<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <!-- Header -->
      <div class="card-header">
        <span>Subjects</span>
      </div>
      <!-- Autocomplete -->
      <div class="card-header">
        <code>Autocomplete</code>
      </div>

      <div class="card-body">
        <!-- List -->
        <div class="d-flex justify-content-center p-3" v-if="loading.list">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading</span>
          </div>
        </div>

        <div class="row" v-else-if="subjects.length">
          <div class="col-12 col-md-6 col-lg-4" v-for="subject in subjects" :key="subject._id">
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between border-0">
                <code v-text="subject.code" />
                <code v-text="subject.pattern" />
              </div>
              <div class="card-body">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" :id="subject._id" />
                  <label class="custom-control-label" :for="subject._id" v-text="subject.name" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty list -->
        <div v-else class="px-3">
          <div class="d-flex justify-content-center">
            <img src="@/assets/empty.png" width="180" />
          </div>
        </div>

        <!-- Class subjects -->
        <div class="card">
          <div class="card-header">
            <span>Class subjects</span>
          </div>
          <div class="card-body">
            <!-- Form -->
            <form id="subjects__local" class="was-validated" novalidate>
              <div class="form-row">
                <!-- Subject name -->
                <div class="form-group col-12 col-md-4">
                  <label>Subject name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Subject name"
                    v-model="subject.name"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Subject name"
                    pattern="^([A-Za-z0-9\s]{1,64})$"
                    data-content="Subject name can contain only alphanumeric characters"
                    required
                  />
                </div>
                <!-- Subject code -->
                <div class="form-group col-12 col-md-4">
                  <label>Subject code</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Subject code"
                    v-model="subject.code"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Subject code"
                    pattern="^([A-Z0-9]{1,8})$"
                    data-content="Subject code can contain only uppercase alphanumeric characters"
                    required
                  />
                </div>
                <!-- Pattern -->
                <div class="form-group col-12 col-md-4">
                  <label>Pattern</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Pattern"
                    v-model="subject.pattern"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-placement="top"
                    title="Pattern"
                    pattern="^([A-Z0-9]{1,8})$"
                    data-content="Pattern can contain only uppercase alphanumeric characters"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group d-flex justify-content-end col-12">
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    data-toggle="tooltip"
                    :disabled="loading.create"
                    @click="create()"
                    title="Add a new class specific subject to your class"
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
  name: "Subject",
  data() {
    return {
      loading: {
        list: false,
        create: false
      },
      subjects: [],
      subject: {
        name: "",
        code: "",
        pattern: ""
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
        .post(`${this.api.host}:${this.api.port}/subject/list`)
        .then(response => {
          this.loading.list = false;
          this.subjects = response.data.prototype;
        })
        .catch(error => {
          console.error(error);
          this.loading.list = false;
        });
    },

    create: function() {
      if (document.getElementById("subjects__local").checkValidity()) {
        this.loading.create = true;

        axios
          .post(`${this.api.host}:${this.api.port}/subject/create/local`, {
            name: this.subject.name,
            code: this.subject.code,
            pattern: this.subject.pattern
          })
          .then(response => {
            this.loading.create = false;
            this.subjects.push(response.data.prototype);
          })
          .catch(error => {
            console.error(error);
            this.loading.create = false;
          });
      }
    }
  }
};
</script>
