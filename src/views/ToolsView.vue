<template>
  <div :class="{ 'dark-mode': ui.isDark }" class="p-2">
    <div v-if="authenticated" class="d-flex flex-column">
      <ZhTwConverter />
      <CurrencyConverter />
      <TimeZoneConverter />

      <div class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex" :class="{ 'bg-body': !ui.isDark }">
        <CurrentTime />
        <p class="ms-auto my-auto me-2">
          <a href="https://www.timeanddate.com/date/workdays.html">
            Business Day Calculator
          </a>
        </p>
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center justify-content-center vh-100">
      <div class="d-flex flex-column gap-2">
        <h4 class="mt-0">本页面为密码保护</h4>
        <input v-model="inputPassword" type="password" class="form-control" placeholder="输入密码" />
        <button class="btn btn-warning" @click="checkPassword" @enter="checkPassword">提交</button>
      </div>
      <p class="mt-3 text-center mb-5">收到密码使用此工具后，即表示您同意保守此页面的秘密，<br> 不得向任何人透露。本网站将撤销违反者的访问权限。</p>
    </div>
  </div>
</template>

<script setup>
import ZhTwConverter from '@/components/ZhTwConverter.vue';
import TimeZoneConverter from '@/components/TimeZoneConverter.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import CurrentTime from '@/components/CurrentTime.vue';
import { ref } from 'vue';
import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
const authenticated = ref(localStorage.getItem('authenticated') === 'true');
const inputPassword = ref('');

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_TOOLS_PASSWORD) {
    authenticated.value = true;
    localStorage.setItem('authenticated', 'true');
  } else {
    alert('Incorrect password. Please try again.');
  }
};
</script>

<style scoped>
.dark-mode {
  background-color: #191818;
  color: #e7dfdf;
}

.dark-mode textarea,
.dark-mode select,
.dark-mode button,
.dark-mode .form-control {
  background-color: #191818;
  color: #e7dfdf;
  border-color: #444;
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
</style>