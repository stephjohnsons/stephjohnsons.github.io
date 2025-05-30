<template>
  <div :class="{ 'dark-mode': ui.isDark }" class="p-2">
    <div v-if="authenticated" class="d-flex flex-column">
      <div class="d-flex flex-row">
        <div>
          <ZhTwConverter />

          <h5 class="fw-normal mt-3">Alarms</h5>
          <div class="mb-2">
            <div class="d-flex gap-2 align-items-center">
              <input v-model="newAlarmTime" type="time" class="form-control" />
              <input
                v-model="newAlarmLabel"
                type="text"
                placeholder="Label"
                class="form-control"
              />
              <button
                @click="addNewAlarm"
                class="btn btn-dark w-auto text-nowrap"
              >
                Add Alarm
              </button>
              <label class="ms-2 d-flex align-items-center gap-1">
                <input type="checkbox" v-model="repeat" /> Repeat
              </label>
            </div>
          </div>

          <ul class="list-group">
            <li
              class="list-group-item d-flex align-items-center"
              v-for="(alarm, index) in alarmStore.alarms"
              :key="index"
            >
              {{ alarm.time }} • {{ alarm.label || "No label" }}
              <span class="ms-2" v-if="alarm.repeat">🔁 recurring</span>
              <button
                @click="alarmStore.removeAlarm(index)"
                class="ms-auto btn btn-sm btn-danger ms-2"
              >
                Remove
              </button>
            </li>
          </ul>

          <CurrencyConverter />
          <TimeZoneConverter />
        </div>
        <div>
          <Changelog />
        </div>
      </div>

      <div
        class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex"
        :class="{ 'bg-body': !ui.isDark }"
      >
        <CurrentTime />
        <p class="ms-auto my-auto me-2">
          <a href="https://www.timeanddate.com/date/workdays.html">
            Business Day Calculator
          </a>
        </p>
      </div>
    </div>
    <div
      v-else
      class="d-flex flex-column align-items-center justify-content-center vh-100"
    >
      <div class="d-flex flex-column gap-2">
        <h4 class="mt-0">本页面为密码保护</h4>
        <input
          v-model="inputPassword"
          type="password"
          class="form-control"
          placeholder="输入密码"
        />
        <button
          class="btn btn-warning"
          @click="checkPassword"
          @enter="checkPassword"
        >
          提交
        </button>
      </div>
      <p class="mt-3 text-center mb-5">
        收到密码使用此工具后，即表示您同意保守此页面的秘密，<br />
        不得向任何人透露。本网站将撤销违反者的访问权限。
      </p>
    </div>
  </div>
</template>

<script setup>
import ZhTwConverter from "@/components/ZhTwConverter.vue";
import TimeZoneConverter from "@/components/TimeZoneConverter.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import CurrentTime from "@/components/CurrentTime.vue";
import Changelog from "@/components/Changelog.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useUIStore } from "@/stores/ui";
import { useAlarmStore } from "@/stores/alarm";
import moment from "moment";

const ui = useUIStore();
const authenticated = ref(localStorage.getItem("authenticated") === "true");
const inputPassword = ref("");

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_TOOLS_PASSWORD) {
    authenticated.value = true;
    localStorage.setItem("authenticated", "true");
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const alarmStore = useAlarmStore();
const newAlarmTime = ref("");
const newAlarmLabel = ref("");
const repeat = ref(false);

const addNewAlarm = () => {
  if (!newAlarmTime.value) return;
  alarmStore.addAlarm(
    newAlarmTime.value,
    repeat.value,
    newAlarmLabel.value.trim()
  );
  newAlarmTime.value = "";
  newAlarmLabel.value = "";
  repeat.value = false;
};

const alarmSound = new Audio("/sounds/alarm.wav");

const checkAlarms = () => {
  const now = moment().format("HH:mm");
  alarmStore.alarms.forEach((alarm) => {
    if (!alarm.triggered && alarm.time === now) {
      alarmSound.play();
      alarm.triggered = true;
      setTimeout(() => {
        if (confirm(`⏰ Alarm for ${alarm.time} triggered!`)) {
          alarmSound.pause();
          alarmSound.currentTime = 0;
        }
      }, 1500);
    }
  });
};

let interval;
onMounted(() => {
  setInterval(() => {
    checkAlarms();
  }, 1000);
});
onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
.dark-mode {
  background-color: #191818;
  color: #e7dfdf;
}

.dark-mode textarea,
.dark-mode select,
.dark-mode button,
.dark-mode .form-control,
.dark-mode .list-group-item {
  background-color: #191818;
  color: #e7dfdf;
  border-color: #444;
}

.dark-mode .btn {
  background-color: #333;
  color: #e7dfdf;
}

.dark-mode .btn-danger {
  background-color: rgb(168, 46, 46);
  color: #e7dfdf;
}

.dark-mode .btn-outline-secondary {
  border-color: #888;
  color: #e7dfdf;
}

.dark-mode .btn-outline-secondary:hover {
  background-color: #333;
}

.dark-mode .footer {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.dark-mode p>a {
  color: #aaa !important;
}

.list-group-item {
  font-family: monospace;
}
</style>
