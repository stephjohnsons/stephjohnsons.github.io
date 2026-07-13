<template>
  <div class="col-12 d-none d-lg-block">
    <div class="d-flex gap-4">
      <div class="col-6">
        <StudentList mode="admin" />
      </div>
      <div class="col-6 pe-5">
        <LessonList mode="admin" />
      </div>
    </div>
    <RepertoireList mode="admin" />

    <div class="border-top pt-4">
      Class policy is only available on student view.
    </div>
  </div>
  <div class="d-block d-lg-none">
    <StudentList mode="admin" />
    <LessonList mode="admin" />
    <RepertoireList mode="admin" />
  </div>
</template>


<script setup>
import StudentList from "../StudentList.vue";
import LessonList from "../LessonList.vue";
import RepertoireList from "../RepertoireList.vue";
</script>