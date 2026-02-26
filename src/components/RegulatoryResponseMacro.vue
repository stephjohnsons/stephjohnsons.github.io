<template>
  <div
    class="gap-3"
    :class="{ 'dark-mode': ui.isDark }"
  >
    <h5 class="fw-normal">
      Macro
    </h5>
    <p class="text-grey opacity-50">-ft, -ndp, -od, -ap, -rrr</p>
  </div>
  <div class="d-flex flex-col gap-2 mb-2">
    <div class="position-relative w-100 position-relative">
      <div class="macro-wrapper">
        <textarea
          ref="textarea"
          v-model="macro"
          class="form-control"
          rows="5"
          @input="onInput"
          @keydown="handleNumberSelect"
          @keydown.left.prevent="highlightPrev"
          @keydown.right.prevent="highlightNext"
          @keydown.enter.prevent="selectHighlighted"
          placeholder="Type - to see available macros"
        />

        <div
          v-if="showList"
          class="macro-bar"
        >
          <span
            v-for="(item, i) in filteredMacros"
            :key="item"
            :class="['macro-item', { active: i === highlightedIndex }]"
            @mousedown.prevent="insertMacro(item)"
          >
            {{ i + 1 }} {{ item }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
const macro = ref('')

const textarea = ref(null)
const showList = ref(false)
const highlightedIndex = ref(0)

const firstTouch = 'Hi ___name____,\n\nThis is Liam from Airbnb\'s specialized team. I hope this message finds you well.\n\nThank you for bringing this issue to our attention.\n\n____REVIEW_DISPUTE____\nWe understand that you are inquiring about the review for the reservation ____reso_code____.\n\n____NON_REVIEW_CASE____\nWe’re currently investigating your case and will reach out to you as soon as possible.\n\nOur department conducts all of its correspondence via email, since we deal with sensitive issues and written documentation of our communication is required. We have sent you a test email to the email address provided on your account to continue this correspondence over email. Before we close this message thread, could you please confirm within 24 hours that you have received the email sent to your email address?\n\nIf you need to make changes to the email address associated with your Airbnb account, you can find more information in our Help Center: airbnb.com/help/article/362\n\nPlease let me know if you have any further questions that we might address at this point.\n\nBest,\nLiam T.';
const zhFirstTouch = '___name___，您好！\n\n我是来自爱彼迎专业团队的 Liam T.。希望您一切安好。\n\n感谢您提醒我们留意此事。\n\n____NON_REVIEW_CASE____\n目前我们正在调查您的个案，并会尽快回复您。\n\n____REVIEW_DISPUTE____\n目前我们正在调查您提及订单 ____RESO_CODE____ 的评价，并会尽快回复您。\n\n我们部门的沟通交流均是通过电子邮件进行的，这是因为我们处理的是敏感问题，需要保存书面通讯记录。\n\n为了继续通过电子邮件与您通信，我们向您账号绑定的邮箱发送了一封测试邮件。请注意，该电子邮件可能会被错误地归入垃圾邮件文件夹中。烦请您在 24 小时内确认您已收到我们发送至您账号上绑定邮箱的邮件。\n\n我将关闭此邮件对话，并继续通过电子邮件与您沟通。请查看与您账号关联的邮箱，以便继续与我们交流。\n\n如果您需要更改与爱彼迎账号绑定的邮箱，请访问帮助中心，了解更多信息：\n __对于_中国_用户__\n airbnb.cn/help/article/362\n__对于_非中国_用户__\n airbnb.com/help/article/362\n\n如果您当前还有其他问题需要我们帮忙解决，请与我联系。\n\n谨致问候！';
const acknowledgement = 'Hi ___User__name___,\n\nThank you for taking the time to contact us. I\'m Liam T. from the customer support team that handles discrimination reports.\n\nI want to let you know that we have received your report and are here to provide support.\n\nWe take reports of discriminatory behavior seriously and have launched a comprehensive investigation under the Nondiscrimination Policy, which may include asking you and others for additional information. You can read more about our Nondiscrimination Policy at www.airbnb.com/help/article/2867.\n\n__IF_REASONABLE_ADJUSTMENT_OR_ACCESSIBILITY_ISSUE__\nFor more information about how Airbnb supports accessibility, visit our Help Center: www.airbnb.com/help/article/2166/.\n\n__IF_OPEN_DOORS__\nIn the meantime, please let me know if I can connect you with another support representative who will help you book a place in __city__. We\'re standing by to help.\n\nWe will reach out if we have any follow-up questions for you.\n\nPlease note that our investigation is related only to the report of discrimination. If you have additional concerns outside your discrimination report, these will be managed by a different customer support team that may separately reach out to you.\n\nAlso, feel free to add anything to your report by simply replying to this email. That can include sending us any information, documentation, or context that you\'d like us to review.\n\nBest regards,\nLiam T.';
const reporter = 'Hi ___user___name___,\n\nI\'m Liam from the customer support team that handles discrimination reports.\n\n____FIRST___TE___\nWe are following up on your report of discrimination.\n\nWe reviewed the details of your report and have a few questions. We kindly ask that you respond directly to this message within the next 72 hours.\n1.\n\nPlease let me know if we can assist you with anything else.\n\n___IF__FOLLOW__UP___TE____\nI\'m following up on our previous email requesting you to provide more information about the report that you made against ___accused____.\n\nAs a reminder, we have the following questions and would welcome hearing from you about them within the next ___24___48___ hours:\n1.\n\nI look forward to your reply. Any additional information that you can share will help us to investigate this matter further.\n\nBest,\nLiam T.';
const accused = 'Hi ___User__name___,\n\nI\'m Liam from Airbnb, a member of the Customer Support team that handles discrimination reports.\n\nWe are reaching out because we received a report of discriminatory behavior from __Host_Or_Guest__ regarding a __Homes_Service_Or_Experience__ with the reservation number: ____reso___. Specifically, it was reported that you __Insert_Action_Indicate_Whether_ROS__Discriminatory_language_or_object.\n\nWe take these types of reports seriously, and we have launched an investigation into whether our Nondiscrimination Policy was violated. You can read more about our Nondiscrimination Policy at: www.airbnb.com/help/article/2867.\n\n__IF_TAKING_INTERIM_ACTION_ON_LISTING_OR_REVIEW__\nWe are temporarily suspending your listing ____OR____ hiding the review while the issue is being investigated by us.\n\nAs part of our investigation, we want to hear from you and welcome any information, documentation, or context you think is relevant. We do ask that you please share any additional information within the next 72 hours. If we do not hear from you by that time, we will proceed with our investigation based on the information available to us.\n\nThank you for your cooperation.\n\nBest regards,\nLiam T.';
const refund = 'Thank you for your patience while our team carries out their review. Once this is complete, we\'ll follow up with you to confirm next steps regarding __CANCELLATIONS_OR_REFUNDS__.'
const accessibilityGuestRa = 'Hi ___user_name___,\n\nI\'m Liam T. from the customer support team that handles discrimination reports.\n\nThank you for your recent report related to reservation ___code___. We take these reports seriously because addressing them helps make Airbnb better for everyone.\n\nGenerally, a Host may not decline a reservation on the basis of a guest\'s Service Animal. Additionally, a Host may not request an additional fee in order to accommodate the Service Animal. These protections also apply to Emotional Support Animals in certain jurisdictions.\n\nYou can find out more about our Accessibility Policy in our Help Center:\nairbnb.com/help/article/1869\n\nOur team will investigate this matter and follow up with your ___Host__. We are committed to making the Airbnb community accessible to everyone.\n\n__IF_OPEN_DOORS_FOR_HOMES_ONLY_\nIn the meantime, please let me know if I can connect you with another support representative who will help you book a place in ___city___. We\'re standing by to help.\n\nPlease let me know how I can further assist and support you at this time.\n\nBest regards,\nLiam T.';
const accessibilityHostRa = 'Hi ___user__name___,\n\nMy name\'s Liam and I\'m a member of a specialized team that deals with reports of discrimination.\n\n___USL_ALREADY_ACKNOWLEDGED__\nI have read over the details which you have provided to my colleague of the incident and I\'m very sorry to hear that this happened to you.\n\nAirbnb takes reports of discrimination seriously. We\'re committed to fighting discrimination and working to make the Airbnb community accessible to everyone.\n\nFor more information about how Airbnb supports accessibility, visit our Help Center: www.airbnb.com/help/article/2166/\n\n___USL_NOT_ACKNOWLEDGED___\nThank you for telling us about the ___profile__message__etc. We take these reports seriously because addressing them helps make Airbnb better for everyone.\n\nYou can read more about our Accessibility Policy here:\nairbnb.com/help/article/1869\n\nOur team will investigate this matter and follow up with your ___Host_or___Guest___. We are committed to making the Airbnb community accessible to everyone.\n\n__IF_OPEN_DOORS_FOR_HOMES_ONLY__\nIn the meantime, please let me know if I can connect you with another support representative who will help you book a place in __city__. We\'re standing by to help.\n\nPlease let me know how I can further assist and support you at this time.\n\nBest regards,\nLiam T.';
const ndpFinalMapping = '———CASE SUMMARY 📝———\n • Reporter: ___G___\n • Accused: ___G___\n\nISSUE\n \nTE - R\nTE - A\n\n———INVESTIGATION 🔎———\nAccused’s Profile\n • Past NDP violations: ___Y___\n • LD violating content: ___Y___\n • MT violating content: ___Y___\n • Past MT content: ___Y___\n • CUs? Review?\n\n————MAPPING 🗺️————\n\n___Category___ > ___PCG___ > Standard of Proof ___met___ > Intent: ____intent___ > ___severity__ > ___action___\n\nOccurred at: ____where____';
const apFinalMapping = '———CASE SUMMARY 📝———\n• \n———INVESTIGATION 🔎———\n • Reporter: G\n • Accused: H\n\nACCUSED PROFILE\n• Exemption admin flag: ___Y___\n• Violation admin flag: ___Y___\n• Mitigation factor: ___Y__\n• LD Violation content: ___N___\n\nBURDEN OF PROOF\nDocumented proof of violation\n\n————MAPPING 🗺️————\n___Violation___ > No exemption/mit factor > __Burden_of_Proof__ > __Enforcement____\n\n———ACTIONS TAKEN ✍🏻———\nACCUSED\nREPORTER\n\n—————LINKS 🔗—————\n• RT: \nhttps://atrium.airbnb.tools/cases/';
const openDoors = '——💰 OPEN DOORS REFUND 💰——\n • NDP / Accessibility Investigation \n • Reporter: \n • SOP: \n • ___Stayed_in_reso___\n\n———ACTIONS TAKEN ✍🏻———\n\n • Reso will CBA \n • Full refund to G\n\nMACROS\nG > Regulatory Response:: Nondiscrimination policy:: Guest - Confirming refund\n\nH > Regulatory Response:: Nondiscrimination policy:: Host - Confirming adjustment';
const reviewFirstTouch = '🟢 Review Dispute (RR) 🟢\n\n———CASE SUMMARY 📝———\nReporter: ____H____\nSubject: ____G____\n\nISSUE\n\n❓ Esc. T2? ✅❌\n• DSA Form Notice: ___Y__or__N___\n• Subpoena, lawyer letter, court order: ___Y__or__N___\n• COR KR + pushback/KR laws violated: ___Y__or__N___\n• Edit name/pronouns: ___Y__or__N___\n\n❓ Should RR APAC handle? ✅❌\n• Words used: Defamation / Slander / Libel\n• Discrimination: ___Y__or__N___\n• IP violation w complete notice: ___Y__or__N___\n• Consumer body complaints: ___Y__or__N___\n• PII/AA/ESA in review: ___Y__or__N___';
const reviewOutcome = '———INVESTIGATION 🔎———\n\n🍀 1. Reso RRR WF passed? ✅❌\n• Not retaliatory: Y\nCriteria 1:\nCriteria 2:\nCriteria 3: \n• Relevance: Y\n• Not pressure of coercion: Y\nSignal Strength: High - Violation / Medium - No Violation / Low - No Violation\n• Not a competitor: Y\n• Not Content Policy violation: Y\n\n☘️ 2. 𝐃𝐞𝐟𝐚𝐦𝐚𝐭𝐢𝐨𝐧 𝐓𝐞𝐬𝐭\nReporter COR: ___COR___\n𝟭𝐬𝐭 𝐓𝐞𝐬𝐭 ✅❌\n• Criminal Activity: ___Y__or__N___\n• Contagious or Infectious disease: ___Y__or__N___\n• Sexual misconduct: ___Y__or__N___\n• Unqualified: ___Y__or__N___\n\nAdditional Question (EU/UK)\n• Factual circumstances? ___Y__or__N___\n• Verified / not contested? ___Y__or__N___\n\n𝟮𝐧𝐝 𝐓𝐞𝐬𝐭 (𝐄𝐔/𝐔𝐊) ✅❌ \nIntent to defame or ridicule: ___Y__or__N___\nPossibly false statement: ___Y__or__N___\n\n𝟮𝐧𝐝 𝐓𝐞𝐬𝐭 (𝐍𝐨𝐧-𝐄𝐔/𝐔𝐊) ✅❌\nPossibly false statement: ___Y__or__N___\nIntent to defame or ridicule: ___Y__or__N___\nClaimant expressed harmed: ___Y__or__N___\n———————————————————\n𝗩𝗲𝗿𝗱𝗶𝗰𝘁: Hide the review OR Educate the Reporter\n———————————————————\n\n———ACTIONS TAKEN ✍🏻———\n___HIDE___REVIEW____\n• Hide the review\n\nAuthor/__G__ > Regulatory Response:: Account:: Reviews:: Disputes:: Relevancy:: Review removed - Author\n\nSubject/___H___ > Account:: Reviews:: Disputes:: Relevancy:: Review removed - Subject\n\n• Leave a remark for initial RRR case\n___END___HIDE__REVIEW____\n___EDUCATE_REPORTER___\n→ Reporter \n/ Regulatory Response:: Defamation:: Reviews:: Reporter:: No violation- First\n___END_EDUCATE_REPORTER___';
const mistransfer = '***Mistransfer to RR***\nIssue outside RR scope\nRR is transferring back to: R1\n\n————USER ISSUE 📝————\n• \n\n———ACTIONS TAKEN ✍🏻———\n• \n\n————CASE NOTES ✏️————\n• \n\n————WORKFLOW ⚙️————\n• ';
const exemptionGiven = 'Hi ____name____,\n\nThank you for letting us know about your ___situation___or____qualifying_situation__.\n\nI’ve added a note on your account which exempts you from hosting guests with Service Animals or Emotional Support Animals at your listing ____listing____. This exemption under our Accessibility Policy is limited to this listing unless we approve an exemption for another listing as well.\n\nWhile Airbnb does not offer legal advice, it’s possible that applicable laws may require you to accept Service Animals or Emotional Support Animals. Please be aware that it is your responsibility to know and follow all laws that apply to you.\n\nAt this time, please make a note on your listing page that describes this exemption. We encourage you to make this change so that future guests with Service Animals or Emotional Support Animals are not surprised that their animals won’t be allowed at your listing.\n\nIn the future, if any reservations at this listing are booked by a guest with a Service Animals or Emotional Support Animals, please contact us and we will offer a penalty-free cancellation. Please also remember to always be polite and respectful when communicating with your guests.\n\nBest regards,\nLiam T.';
const reviewRemovedEEA = 'Hi ___name___,\n\nThis is Liam from Airbnb\'s specialized team. I hope this message finds you well.\n\nWe wanted to let you know that we received a report about your review for reservation __CODE__ about __USER__ and it has been removed for not following our Reviews Policy.\n\nThe review didn\'t have enough relevant information to help the Airbnb community make informed booking or hosting decisions.\n\nWe understand how important a trustworthy and reliable review system is.\n\nOur Reviews Policy is designed to help ensure that Hosts and guests provide reviews that are authentic, trustworthy, and useful to our community. You can find more information about our policy in our Help Center at: airbnb.com/help/article/548.\n\nYou can learn more about redress rights available to EU users in our Help Center article: \nairbnb.com/help/article/3508.\n\nBest,\nLiam T.';

const macroRegistry = {
  '-ft-en': firstTouch,
  '-ft-zh': zhFirstTouch,
  '-ft-rrr': reviewFirstTouch,
  '-de-esc': mistransfer,
  '-ra': acknowledgement,
  '-te-R': reporter,
  '-te-A': accused,
  '-refund': refund,
  '-aa-ra-G': accessibilityGuestRa,
  '-aa-ra-H': accessibilityHostRa,
  '-aa-exemption': exemptionGiven,
  '-rrr-removed-eea': reviewRemovedEEA,
  '-map-ndp': ndpFinalMapping,
  '-map-ap': apFinalMapping,
  '-map-od': openDoors,
  '-map-rrr': reviewOutcome,
}

const macros = Object.keys(macroRegistry)

watch(macro, (newVal) => {
  let val = newVal

  for (const key in macroRegistry) {
    val = val.replaceAll(key, macroRegistry[key])
  }

  if (val !== newVal) macro.value = val
})

const filteredMacros = computed(() => {
  const match = macro.value.slice(0, textarea.value?.selectionStart || 0)
    .match(/-([\w-]*)$/)

  if (!match) return macros

  const query = match[1].toLowerCase()

  return macros
    .map(m => ({
      value: m,
      score: fuzzyScore(query, m.slice(1)) // remove leading dash
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.value)
})

function fuzzyScore(query, target) {
  if (!query) return 1

  let score = 0
  let tIndex = 0

  for (const char of query) {
    const found = target.indexOf(char, tIndex)
    if (found === -1) return 0
    score += 2                  // matched character
    if (found === tIndex) score += 1  // consecutive bonus
    tIndex = found + 1
  }

  // shorter targets rank higher
  return score - target.length * 0.01
}

function onInput(e) {
  const cursor = e.target.selectionStart
  const textBefore = macro.value.slice(0, cursor)

  showList.value = /-\w*$/.test(textBefore)

  highlightedIndex.value = 0
}

function insertMacro(selected) {
  const el = textarea.value
  const start = el.selectionStart
  const before = macro.value.slice(0, start)
  const after = macro.value.slice(start)

  const newBefore = before.replace(/-[\w-]*$/, selected)

  macro.value = newBefore + after
  showList.value = false

  requestAnimationFrame(() => {
    const pos = newBefore.length
    el.setSelectionRange(pos, pos)
    el.focus()
  })
}

function handleNumberSelect(e) {
  if (!showList.value) return

  const num = parseInt(e.key)
  if (!isNaN(num) && num > 0 && num <= filteredMacros.value.length) {
    e.preventDefault()
    insertMacro(filteredMacros.value[num - 1])
  }
}

function highlightNext() {
  if (!showList.value) return
  highlightedIndex.value =
    (highlightedIndex.value + 1) % filteredMacros.value.length
}

function highlightPrev() {
  if (!showList.value) return
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredMacros.value.length) %
    filteredMacros.value.length
}

function selectHighlighted() {
  if (!showList.value) return
  insertMacro(filteredMacros.value[highlightedIndex.value])
}

</script>

<style scoped>
textarea {
  resize: none;
}

.macro-wrapper {
  position: relative;
}

.macro-popup {
  position: absolute;
  left: 0;
  bottom: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
  padding: 4px;
  margin: 6px 0;
  width: 180px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 1000;
}

.macro-popup li {
  padding: 6px 10px;
  cursor: pointer;
}

.macro-bar {
  margin-top: 6px;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  /* wraps if too many */
  align-items: center;
  z-index: 1000;
}

.macro-item {
  padding: 4px 8px;
  border-radius: 6px;
  background: #f4f4f4;
  cursor: pointer;
  font-size: 0.85rem;
  user-select: none;
}

.macro-item.active {
  background: #dbeafe;
}

.dark-mode .macro-bar {
  background: #2b2b2b;
  border-color: #444;
}

.dark-mode .macro-item {
  background: #3a3a3a;
}

.dark-mode .macro-item.active {
  background: #0e6efd;
  color: white;
}

.macro-popup li.active,
.macro-popup li:hover {
  background: #f2f2f2;
}
</style>