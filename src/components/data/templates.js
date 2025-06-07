import { ref } from 'vue'

const simplified = ref('')

export const allTemplates = {
  direct: ['noPickup', 'pickup', 'symbols', 'resoG', 'resoH', 'multipleReso'],
  parametric: {
    opening: ['st', 'kx', 'jf', 'ly', 'quick'],
    english: [
      'st',
      'kx',
      'jf',
      'ly',
      'resoG',
      'resoH',
      'nova',
      'hc',
      'thanks',
      'instantBook',
      'closing',
      'aircoverG',
      'aircoverh',
      'noPickup',
      'ghosted',
      'coupon',
      'refund',
      'report',
      'international'
    ],
    educate: [
      'aircoverHost',
      'rTwo',
      'rebooking',
      'aircoverGuest',
      'robotCBG',
      'sorry',
      'delay',
      'defender',
      'payout',
      'search',
      'followup',
      'feedback',
      'help',
      'lead',
      'meantime',
      'report',
      'listingViews',
      'ghost',
      'probe',
      'fapiao',
      'views',
      'listingViews',
      'waiting',
      'international',
      'specify',
      'noReply',
      'instantBook',
      'upcomingTrip',
      'duplicate',
      'repeat',
      'refundDisabled',
      'coupon',
      'refund',
      'photography',
      'bug'
    ],
    reso: [
      'G',
      'H',
      'M',
      'waitingResponse',
      'checkpointGuest',
      'checkpointHost',
      'loss',
      'checkEmail',
      'register',
      'consoleHost',
      'consoleGuest',
      'complimentHost'
    ],
    res2: ['gConsole', 'requestDocs', 'hSolution', 'gSolution', 'notQualified', 'reviews'],
    closing: ['p', 'zh1', 'zh2', 'tw1', 'tw2']
  }
}

export const symbol = () => {
  simplified.value =
    '「__xx__」>「__xx__」>「__xx__」>「__xx__」\n『__xx__』 ＜__action__＞\n▼幫助中心 ▲ ‣ ◆ Between ・ VISA ••••1234 \n※ Translation\n✓ ⛌'
}

export const numbering = () => {
  simplified.value = '（1）\n（2）\n（3）\n（4）\n（5）\n（6）\n（7）\n（8）'
}

export const double = () => {
  simplified.value = 'UI\nInitiator (G/H?): _who_\nShort Summary of Outcome/Next Steps:'
}
