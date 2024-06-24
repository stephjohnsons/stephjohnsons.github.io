<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="example">
    <div class="offcanvas-header">
      <h4 class="offcanvas-title">{{ props.works.name }}</h4>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div class="offcanvas-body pt-0">
      <p class="fs-custom mb-1">
        {{ props.works.desc }}
      </p>

      <p class="m-0 fs-7 fst-normal">front-end</p>

      <h6 class="mt-2 fw-light" id="hightlighted-title">
        objectives
      </h6>
      <p>aim, goal</p>
      <h6 class="mt-2 fw-light" id="hightlighted-title">
        resources
      </h6>
      <p>HTML, CSS, JavaScript, Bootstrap</p>
      <h6 class="mt-2 fw-light" id="hightlighted-title">
        solution
      </h6>
      <p>list down what was done</p>
      <p class="mt-2 text-muted">
        <a :href="props.works.link" target="_blank">
          Link to project
        </a>
      </p>
    </div>
  </div>

  <!-- <p class="mb-0 fs-custom">
      {{ site.desc }}
    </p> -->
  <!-- <div>
      <ul>
        <li>role</li>
        <li>objectives: aim, goal</li>
        <li>resources: physical, design</li>
        <li>solution: list down what was done</li>
      </ul>
    </div> -->
</template>

<script setup>
const props = defineProps({
  works: {
    type: Object,
    required: true
  }
})
</script>