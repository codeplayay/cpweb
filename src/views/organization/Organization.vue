<template>
  <div class="container my-4">
    <div class="card shadow-sm">
      <div class="card-header">Organization</div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-6">
            <Departments @update="department__select" />
          </div>
          <div class="col-12 col-md-6">
            <div v-if="department._id === -1" class="d-flex justify-content-center">
              <img src="@/assets/empty.png" width="180" />
            </div>
            <Classes v-else :department="department" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Departments from "@/components/organization/Departments.vue";
import Classes from "@/components/organization/Classes.vue";

export default {
  name: "Organization",
  components: {
    Departments,
    Classes
  },
  data() {
    return {
      department: {
        _id: -1
      }
    };
  },
  methods: {
    department__select: function(department) {
      this.department = department;
    }
  }
};
</script>
