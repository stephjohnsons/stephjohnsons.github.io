<template>
  <div class="col-12 col-lg-10 d-none d-lg-block">
    <div class="d-flex g-2">
      <div
        class="col-6 me-2"
        id="students"
      >
        <StudentList mode="student" />
      </div>
      <div
        class="col-6"
        id="lessons"
      >
        <LessonList mode="student" />
      </div>
    </div>
    <RepertoireList
      id="repertoire"
      mode="student"
    />
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
      mode="student"
      v-if="!studentAuthenticated"
    />
    <LessonList
      id="lessons"
      mode="student"
    />
    <RepertoireList
      id="repertoire"
      mode="student"
    />
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ClassPolicy from "../ClassPolicy.vue";
import StudentList from "../StudentList.vue";
import LessonList from "../LessonList.vue";
import RepertoireList from "../RepertoireList.vue";
import { useStudentStore } from "@/stores/students";

const navItems = computed(() => {
  const items = [];

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

const studentStore = useStudentStore();
onMounted(async () => {
  await studentStore.fetchStudents();
});
</script>