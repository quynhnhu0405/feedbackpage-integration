// Language data for feedback cards
const feedbackData = {
  en: [
    {
      header: 'U444 <em>appreciates</em> all your feelings ',
      questionLabel: 'QUESTION 1',
      question: 'HOW WAS YOUR <strong>EXPERIENCE</strong> AT U444 TODAY?',
      emojis: [
        { icon: 'bad', label: 'BAD' },
        { icon: 'not-good', label: 'NOT GOOD' },
        { icon: 'okay', label: 'OKAY' },
        { icon: 'good', label: 'GOOD' },
        { icon: 'wow', label: 'WOW' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings ',
      questionLabel: 'QUESTION 2',
      question: 'HOW SATISFYING WAS <strong>THE FLAVOR</strong> OF YOUR MEAL?',
      emojis: [
        { icon: 'bad', label: 'BAD' },
        { icon: 'not-good', label: 'NOT GOOD' },
        { icon: 'okay', label: 'OKAY' },
        { icon: 'good', label: 'GOOD' },
        { icon: 'wow', label: 'WOW' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings ',
      questionLabel: 'QUESTION 3',
      question: 'ANY ADDITIONAL <strong>SUGGESTIONS</strong>?',
      placeholder: 'Type your opinion here...',
      footer: '© 2025 - U444 - All rights reserved'
    }
  ],
  vi: [
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'CÂU HỎI 1',
      question: '<strong>TRẢI NGHIỆM </strong> CỦA BẠN TẠI U444 HÔM NAY THẾ NÀO?',
      emojis: [
        { icon: 'bad', label: 'TỆ' },
        { icon: 'not-good', label: 'KHÔNG TỐT' },
        { icon: 'okay', label: 'ỔN' },
        { icon: 'good', label: 'TỐT' },
        { icon: 'wow', label: 'TUYỆT' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'CÂU HỎI 2',
      question: 'MỨC ĐỘ HÀI LÒNG CỦA BẠN VỀ <strong>BỮA ĂN</strong> HÔM NAY',
      emojis: [
        { icon: 'bad', label: 'TỆ' },
        { icon: 'not-good', label: 'KHÔNG TỐT' },
        { icon: 'okay', label: 'ỔN' },
        { icon: 'good', label: 'TỐT' },
        { icon: 'wow', label: 'TUYỆT' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'CÂU HỎI 3',
      question: 'BẠN <strong>ĐỀ XUẤT GÌ THÊM</strong> KHÔNG?',
      placeholder: 'Nhập ý kiến của bạn ở đây...',
      footer: '© 2025 - U444 - All rights reserved'
    }
  ]
};

let currentStep = 0;
let currentLang = 'en';

function showStep(stepIdx) {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.classList.toggle('step-active', i === stepIdx);
  });
  // Show lang-switch for steps 0, 1, 2
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    langSwitch.style.display = (stepIdx === 2 && window._thankYouShown) ? 'none' : '';
  }
  renderFeedbackCard(stepIdx, currentLang);
  if (stepIdx === 0 || stepIdx === 1) {
    updateNextButtonState();
    setupEmojiSelection();
    setupStepNavigation();
  } else if (stepIdx === 2) {
    setupSubmitFeedback();
  }
}

function renderFeedbackCard(stepIdx, lang) {
  const step = document.querySelectorAll('.step')[stepIdx];
  const card = step.querySelector('.feedback-card');
  const data = feedbackData[lang][stepIdx];
  if (!data) return;

  if (stepIdx === 0 || stepIdx === 1) {
    card.innerHTML = `
      <header class="feedback-header">
        <h2>${data.header}</h2>
      </header>
      <div class="feedback-logo">
        <img src="assets/images/logo.png" alt="The BBQ House Logo" />
      </div>
      <div class="feedback-question">
        <span class="question-label">${data.questionLabel}</span>
        <h3>${data.question}</h3>
      </div>
      <div class="feedback-emojis">
        <div class="emoji-group">
          ${data.emojis.map((emoji, i) => `
            <div class="emoji-item">
              <span class="emoji"><img src="assets/images/${emoji.icon}-light.png" alt="${emoji.label}" /></span>
              <span class="emoji-label">${emoji.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="step-nav">
        <button class="next-step">Next</button>
      </div>
      <footer class="feedback-footer">
        <p>${data.footer}</p>
      </footer>
    `;
  } else if (stepIdx === 2) {
    card.innerHTML = `
      <header class="feedback-header">
        <h2>${data.header}</h2>
      </header>
      <div class="feedback-logo">
        <img src="assets/images/logo.png" alt="The BBQ House Logo" />
      </div>
      <div class="feedback-question">
        <span class="question-label">${data.questionLabel}</span>
        <h3>${data.question}</h3>
      </div>
      <div class="feedback-question">
        <textarea class="user-opinion" placeholder="${data.placeholder}"></textarea>
      </div>
      <div class="step-nav">
        <button class="submit-feedback">Submit Feedback</button>
      </div>
      <footer class="feedback-footer">
        <p>${data.footer}</p>
      </footer>
    `;
  }
}

function setActiveLangBtn(lang) {
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setupLanguageSwitcher() {
  let langSwitch = document.querySelector('.lang-switch');
  langSwitch.addEventListener('click', function(e) {
    if (e.target.classList.contains('lang-btn')) {
      const lang = e.target.dataset.lang;
      setActiveLangBtn(lang);
      currentLang = lang;
      showStep(currentStep);
    }
  });
}

function setupStepNavigation() {
  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', function() {
      currentStep = Math.min(currentStep + 1, 2);
      showStep(currentStep);
    });
  });
}

function setupSubmitFeedback() {
  document.querySelectorAll('.submit-feedback').forEach(btn => {
    btn.addEventListener('click', function() {
      if (currentStep === 2) {
        const step = document.querySelectorAll('.step')[currentStep];
        const card = step.querySelector('.feedback-card');
        const opinion = card.querySelector('.user-opinion').value;
        console.log('User opinion:', opinion);
        // Thank you message by language
        const thankYou = currentLang === 'vi'
          ? `<h2>Cảm ơn bạn đã phản hồi!</h2><p>Ý kiến của bạn đã được ghi nhận.</p>`
          : `<h2>Thank you for your feedback!</h2><p>Your response has been recorded.</p>`;
        card.innerHTML = `<div class="feedback-logo"> 
                            <img src="assets/images/logo.png" alt="The BBQ House Logo" /> 
                          </div>
                          <div style="text-align:center;padding:2rem 1rem;">
                            ${thankYou}
                          </div>
                          <footer class="feedback-footer">
                            <p>© 2025 - U444 - All rights reserved</p>
                          </footer>`;
        // Hide lang-switch
        const langSwitch = document.querySelector('.lang-switch');
        if (langSwitch) langSwitch.style.display = 'none';
        // Mark thank you as shown
        window._thankYouShown = true;
      }
    });
  });
}

function updateNextButtonState() {
  const step = document.querySelector('.step.step-active');
  if (!step) return;
  const card = step.querySelector('.feedback-card');
  const nextBtn = step.querySelector('.next-step');
  if (!nextBtn) return;
  const anySelected = card.querySelector('.emoji-item.selected');
  nextBtn.disabled = !anySelected;
  if (nextBtn.disabled) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

function setupEmojiSelection() {
  const step = document.querySelector('.step.step-active');
  const emojiItems = step.querySelectorAll('.emoji-item');

  emojiItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
  });

  const refreshedItems = step.querySelectorAll('.emoji-item');

  refreshedItems.forEach((item, idx) => {
    item.addEventListener('click', function () {
      refreshedItems.forEach((i, j) => {
        i.classList.remove('selected');
        const emoji = feedbackData[currentLang][currentStep].emojis[j];
        const img = i.querySelector('img');
        img.src = `assets/images/${emoji.icon}-light.png`;
      });

      item.classList.add('selected');

      const emoji = feedbackData[currentLang][currentStep].emojis[idx];
      const img = item.querySelector('img');
      img.src = `assets/images/${emoji.icon}-dark.png`;

      updateNextButtonState();
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupLanguageSwitcher();
  setupStepNavigation();
  showStep(0);
  setupSubmitFeedback();
}); 