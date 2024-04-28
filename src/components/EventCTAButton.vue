<template>
  <a :href="link" target="_blank">
    <button :class="buttonClass" :link="link">
      <component :is="iconComponent" class="me-2" />
      {{ buttonText }}
    </button>
  </a>
</template>

<script setup>
import { computed } from 'vue';
import Ticket from '@/assets/ticket-perforated.svg';
import Info from '@/assets/info.svg';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  buttonType: {
    type: String,
    default: 'primary'
  }
});

const iconComponent = computed(() => {
  return props.type.includes('ticket') ? Ticket : Info;
});

const buttonText = computed(() => {
  switch (props.type) {
    case 'ticket':
      return 'Tickets';
    case 'info':
      return 'Info';
    case 'ticket-disabled':
      return 'Coming soon';
    default:
      return '';
  }
});

const buttonClass = computed(() => {
  const variableButtonType = [];

  if (props.type === 'ticket-disabled') {
    variableButtonType.push('btn-dark');
    variableButtonType.push('disabled');
  } else if (props.buttonType === 'primary') {
    variableButtonType.push('btn-warning');
  } else {
    variableButtonType.push('btn-outline-dark');
  }

  return [
    'btn',
    'btn-sm',
    'fw-normal',
    'd-flex',
    'flex-row',
    'align-items-center',
    ...variableButtonType,
  ]
});
</script>

<style scoped>
a {
  text-decoration-line: none;
}
</style>