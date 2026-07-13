<template>
  <div class="col-12 d-none d-lg-block">
    <div class="d-flex gap-4">
      <div class="col-6">
        <StudentList mode="student" />
      </div>
      <div class="col-6 pe-5">
        <LessonList mode="student" />
      </div>
    </div>
    <RepertoireList mode="student" />
    <div class="border-top pt-4">
      <ClassPolicy />
    </div>
  </div>
  <div class="d-block d-lg-none">
    <StudentList
      mode="student"
      v-if="!studentAuthenticated"
    />
    <LessonList mode="student" />
    <RepertoireList mode="student" />
    <div class="border-top pt-4">
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
</template>

<script setup>
import { onMounted } from "vue";
import ClassPolicy from "../ClassPolicy.vue";
import StudentList from "../StudentList.vue";
import LessonList from "../LessonList.vue";
import RepertoireList from "../RepertoireList.vue";
import { useStudentStore } from "@/stores/students";

const props = defineProps({
  mode: {
    type: String,
    default: null
  }
})

const studentStore = useStudentStore();
onMounted(async () => {
  await studentStore.fetchStudents();
});
</script>