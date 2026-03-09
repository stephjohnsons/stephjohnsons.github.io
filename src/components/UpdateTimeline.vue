<template>
  <div class="timeline">
    <div
      v-for="(event, index) in events"
      :key="event.id"
      class="timeline-item"
    >
      <!-- marker -->
      <div class="timeline-marker">
        <div class="dot"></div>

        <div
          v-if="index !== events.length - 1"
          class="line"
        />
      </div>

      <!-- content -->
      <div class="timeline-content">
        <div class="timeline-title">
          {{ event.type }}
        </div>

        <div class="timeline-body">
          <div
            v-for="(line, i) in parseBody(event.body)"
            :key="i"
          >
            {{ line }}
          </div>
        </div>

        <div class="timeline-time">
          {{ event.timestamp }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

function parseBody(body) {
  if (!body) return []
  return body.split("\n")
}
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.timeline-item {
  display: flex;
  gap: 12px;
}

.timeline-marker {
  width: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background: #c7c7c7;
  border-radius: 50%;
}

.line {
  width: 2px;
  flex: 1;
  background: #e2e2e2;
  margin-top: 4px;
}

.timeline-content {
  flex: 1;
  font-size: 14px;
}

.timeline-title {
  font-weight: 600;
}

.timeline-body {
  margin-top: 4px;
  color: #333;
}

.timeline-time {
  margin-top: 6px;
  font-size: 12px;
  color: #777;
}
</style>