<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom">
    <div class="navbar-brand">
      <img
        src="@/assets/logo-vector-dark.svg"
        width="32"
        height="32"
        alt="logo"
        class="d-inline-block align-top mx-1"
      />
      CloudPlay
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar__collapse"
      aria-controls="navbar__collapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar__collapse">
      <ul class="navbar-nav mr-auto">
        <!-- Organization -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-decoration-none"
            href="#"
            id="navbar__master"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Master</a>
          <div class="dropdown-menu" aria-labelledby="navbar__master">
            <a class="dropdown-item" href="#/organization">Organization</a>
          </div>
        </li>
        <!-- User -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-decoration-none"
            href="#"
            id="navbar__user"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >User</a>
          <div class="dropdown-menu" aria-labelledby="navbar__user">
            <a class="dropdown-item" href="#/user/student/register">Student Registration</a>
            <a class="dropdown-item" href="#/user/teacher/register">Teacher Registration</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#/user/teacher/hod">HOD</a>
            <a class="dropdown-item" href="#/user/teacher/classteacher">Class Teacher</a>
          </div>
        </li>
        <!-- Class Teacher -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-decoration-none"
            href="#"
            id="navbar__classteacher"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Class Teacher</a>
          <div class="dropdown-menu" aria-labelledby="navbar__classteacher">
            <a class="dropdown-item" href="#/subject">Subjects</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped></style>
