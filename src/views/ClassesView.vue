<template>
  <div
    v-if="adminAuthenticated"
    class="d-flex m-4"
  >
    <div class="col-12 col-lg-10 d-none d-lg-block">
      <div class="d-flex g-2">
        <div
          class="col-6 me-2"
          id="students"
        >
          <StudentList />
        </div>
        <div
          class="col-6"
          id="lessons"
        >
          <LessonList />
        </div>
      </div>
      <RepertoireList id="repertoire" />
      <div class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex d-lg-none bg-warning">
        <div class="d-flex flex-row mb-2">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div class="border-top pt-4">
        <ClassPolicy />
      </div>
    </div>
    <div class="d-block d-lg-none">
      <StudentList
        id="students"
        v-if="!studentAuthenticated"
      />
      <LessonList id="lessons" />
      <RepertoireList id="repertoire" />
      <div
        class="border-top pt-4"
        id="policy"
      >
        <ClassPolicy />
      </div>
      <div class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex d-lg-none bg-warning">
        <div class="d-flex flex-row mb-2">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </button>

        </div>
      </div>
    </div>
    <div class="position-fixed top-25 end-0 me-4 pe-1 text-end d-none d-lg-block">
      <h5>Sitemap</h5>
      <div class="d-flex flex-column">
        <button
          v-if="!studentAuthenticated"
          class="btn btn-sm btn-warning my-1"
          @click="scrollToSection('students')"
        >
          Students
        </button>
        <button
          class="btn btn-sm btn-warning my-1"
          @click="scrollToSection('lessons')"
        >
          Classes
        </button>
        <button
          class="btn btn-sm btn-warning my-1"
          @click="scrollToSection('repertoire')"
        >
          Rep
        </button>
        <button
          class="btn btn-sm btn-warning my-1"
          @click="scrollToSection('policy')"
        >
          Policy
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="studentAuthenticated"
    class="d-flex m-4"
  >
    <StudentPermission />
  </div>
  <div
    v-if="coTeacherAuthenticated"
    class="d-flex m-4"
  >
    <CoTeacherPermission />
  </div>
  <!-- <div
    v-if="!selectedStudentId && !adminAuthenticated && !studentAuthenticated"
    class="p-6 d-flex flex-column align-items-center justify-content-center vh-75"
  >
    <h4>Who are you?</h4>
    <select
      v-model="selectedStudentId"
      class="form-select w-50"
      @change="selectStudent(selectedStudentId)"
    >
      <option
        disabled
        value=""
      >
        Select your name
      </option>

      <option
        v-for="student in studentStore.students"
        :key="student"
        :value="student"
      >
        {{ student.student }}
      </option>
    </select>
  </div> -->

  <!-- Password page -->
  <div
    v-if="!adminAuthenticated && !studentAuthenticated && !coTeacherAuthenticated"
    class="d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <div class="d-flex flex-column gap-2">
      <h4 class="mt-0">This page is password protected</h4>
      <input
        v-model="inputPassword"
        type="password"
        class="form-control"
        placeholder="Password"
        @keyup.enter="checkPassword"
      />
      <button
        class="btn btn-warning"
        @click="checkPassword"
      >Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ClassPolicy from "../components/ClassPolicy.vue";
import StudentList from "../components/StudentList.vue";
import LessonList from "../components/LessonList.vue";
import RepertoireList from "../components/RepertoireList.vue";
import StudentPermission from "../components/classes/StudentPermission.vue";
import CoTeacherPermission from "../components/classes/CoTeacherPermission.vue";
import { useStudentStore } from "@/stores/students";

const adminAuthenticated = ref(
  localStorage.getItem("studio_admin_authenticated") === "true"
);

const studentAuthenticated = ref(
  localStorage.getItem("studio_student_authenticated") === "true"
);

const coTeacherAuthenticated = ref(
  localStorage.getItem("studio_co_teacher_authenticated") === "true"
)

const selectedStudentId = ref(
  localStorage.getItem("studio_student_id")
)

const inputPassword = ref("");

const navItems = computed(() => {
  const items = [];

  if (adminAuthenticated.value) {
    items.push({
      label: "Students",
      id: "students",
    });
  }

  items.push(
    {
      label: "Classes",
      id: "lessons",
    },
    {
      label: "Rep",
      id: "repertoire",
    },
    {
      label: "Policy",
      id: "policy",
    }
  );

  return items;
});

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
};

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_STUDIO_PASSWORD) {
    adminAuthenticated.value = true;
    localStorage.setItem("studio_admin_authenticated", "true");
  } else if (inputPassword.value === import.meta.env.VITE_STUDENT_PASSWORD) {
    studentAuthenticated.value = true;
    localStorage.setItem("studio_student_authenticated", "true");
  } else if (inputPassword.value === import.meta.env.VITE_STUDIO_COTEACHER_PASSWORD) {
    coTeacherAuthenticated.value = true;
    localStorage.setItem("studio_co_teacher_authenticated", "true");
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const studentStore = useStudentStore();
// console.log(studentStore.students)
onMounted(async () => {
  await studentStore.fetchStudents();
});

const selectStudent = (id) => {
  selectedStudentId.value = id

  localStorage.setItem(
    'studio_student_id',
    id
  )
}

const switchStudent = () => {
  selectedStudentId.value = null

  localStorage.removeItem(
    'studio_student_id'
  )
}
</script>