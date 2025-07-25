// Language data for feedback cards
const feedbackData = {
  en: [
    {
      header: 'U444 <em>appreciates</em> your support',
      questionLabel: 'Table Number',
      question: 'Please enter the <em>table number</em> before starting feedback.',
      placeholder: 'Enter table number...',
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings',
      questionLabel: 'Question 1',
      question: 'How was your <em>experience</em> at U444 today?',
      emojis: [
        { icon: 'bad', label: 'Bad' },
        { icon: 'not-good', label: 'Not Good' },
        { icon: 'okay', label: 'Okay' },
        { icon: 'good', label: 'Good' },
        { icon: 'wow', label: 'Wow' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings',
      questionLabel: 'Question 2',
      question: 'How satisfying was <em>the flavor</em> of your meal?',
      emojis: [
        { icon: 'bad', label: 'Bad' },
        { icon: 'not-good', label: 'Not Good' },
        { icon: 'okay', label: 'Okay' },
        { icon: 'good', label: 'Good' },
        { icon: 'wow', label: 'Wow' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings',
      questionLabel: 'Question 3',
      question: 'Any additional <em>suggestions</em>?',
      placeholder: 'Type your opinion here...',
      footer: '© 2025 - U444 - All rights reserved'
    }
  ],
  vi: [
    {
      header: 'U444 trân trọng sự hỗ trợ của bạn',
      questionLabel: 'Số bàn',
      question: 'Vui lòng nhập <em>số bàn</em> trước khi bắt đầu phản hồi.',
      placeholder: 'Nhập số bàn...',
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'Câu hỏi 1',
      question: '<em>Trải nghiệm</em> của bạn tại U444 hôm nay thế nào?',
      emojis: [
        { icon: 'bad', label: 'Tệ' },
        { icon: 'not-good', label: 'Không tốt' },
        { icon: 'okay', label: 'Ổn' },
        { icon: 'good', label: 'Tốt' },
        { icon: 'wow', label: 'Tuyệt' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'Câu hỏi 2',
      question: 'Mức độ hài lòng của bạn về <em>bữa ăn</em> hôm nay',
      emojis: [
        { icon: 'bad', label: 'Tệ' },
        { icon: 'not-good', label: 'Không tốt' },
        { icon: 'okay', label: 'Ổn' },
        { icon: 'good', label: 'Tốt' },
        { icon: 'wow', label: 'Tuyệt' }
      ],
      footer: '© 2025 - U444 - All rights reserved'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'Câu hỏi 3',
      question: 'Bạn <em>đề xuất</em> gì thêm không?',
      placeholder: 'Nhập ý kiến của bạn ở đây...',
      footer: '© 2025 - U444 - All rights reserved'
    }
  ]
};

let currentStep = 0;
let currentLang = 'en';
let tableNumber = '';

function showStep(stepIdx) {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.classList.toggle('step-active', i === stepIdx);
  });
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    langSwitch.style.display = (stepIdx === 3 && window._thankYouShown) ? 'none' : '';
  }
  renderFeedbackCard(stepIdx, currentLang);
  if (stepIdx === 0) {
    setupTableNumberInput();
  } else if (stepIdx === 1 || stepIdx === 2) {
    updateNextButtonState();
    setupEmojiSelection();
    setupStepNavigation();
  } else if (stepIdx === 3) {
    setupSubmitFeedback();
  }
}

function renderFeedbackCard(stepIdx, lang) {
  const step = document.querySelectorAll('.step')[stepIdx];
  const card = step.querySelector('.feedback-card');
  const data = feedbackData[lang][stepIdx];
  if (!data) return;

  if (stepIdx === 0) {
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
        <input class="table-number-input" type="text" placeholder="${data.placeholder}" value="${tableNumber}" />
      </div>
      <div class="step-nav">
        <button class="next-step">Next</button>
      </div>
      <footer class="feedback-footer">
        <p>${data.footer}</p>
      </footer>
    `;
  } else if (stepIdx === 1 || stepIdx === 2) {
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
  } else if (stepIdx === 3) {
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

function setupTableNumberInput() {
  const step = document.querySelector('.step.step-active');
  const input = step.querySelector('.table-number-input');
  const nextBtn = step.querySelector('.next-step');
  if (!input || !nextBtn) return;
  input.addEventListener('input', function() {
    tableNumber = input.value.trim();
    nextBtn.disabled = !tableNumber;
    if (nextBtn.disabled) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  });
  nextBtn.disabled = !tableNumber;
  if (nextBtn.disabled) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
  nextBtn.addEventListener('click', function() {
    if (tableNumber) {
      currentStep = 1;
      showStep(currentStep);
    }
  });
}

function setupStepNavigation() {
  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', function() {
      currentStep = Math.min(currentStep + 1, 3);
      showStep(currentStep);
    });
  });
}

function renderEmoji(emoji) {
  switch (emoji) {
    case 1:
      return 'Bad';
    case 2:
      return 'Not Good';
    case 3:
      return 'Okay';
    case 4:
      return 'Good';
    case 5:
      return 'Wow';
  }
  }
function setupSubmitFeedback() {
  document.querySelectorAll('.submit-feedback').forEach(btn => {
    btn.addEventListener('click', async function () {
      if (currentStep === 3) {
        const step = document.querySelectorAll('.step')[currentStep];
        const card = step.querySelector('.feedback-card');
        const opinion = card.querySelector('.user-opinion').value.trim();

        const feedback = {
          tableNumber,
          experience: (typeof window._step1Emoji === 'number') ? window._step1Emoji + 1 : null,
          flavor: (typeof window._step2Emoji === 'number') ? window._step2Emoji + 1 : null,
          suggestion: opinion || undefined
        };

        if (!feedback.tableNumber) {
          alert(currentLang === 'vi'
            ? 'Vui lòng nhập số bàn trước khi gửi.'
            : 'Please enter the table number before submitting.');
          return;
        }
        try {
          if (!window.feedbackService || !window.feedbackService.submitCustomerInfo) {
            console.error("feedbackService chưa được khởi tạo đúng.");
            return;
        }        
          await window.feedbackService.submitCustomerInfo(feedback);

          const thankYou = currentLang === 'vi'
            ? `<h2>Cảm ơn bạn đã phản hồi!</h2><p>Ý kiến của bạn đã được ghi nhận.</p>`
            : `<h2>Thank you for your feedback!</h2><p>Your response has been recorded.</p>`;
          const feedbackSummary = currentLang === 'vi'
            ? `<h3>Tóm tắt phản hồi</h3><table><tr><td><b>Trải nghiệm</b></td><td>${renderEmoji(feedback.experience)}</td></tr><tr><td><b>Mùi vị</b></td><td>${renderEmoji(feedback.flavor)}</td></tr><tr><td><b>Đề xuất</b></td><td>${feedback.suggestion || 'None'}</td></tr></table>`
            : `<h3>Feedback Summary</h3><table><tr><td><b>Experience</b></td><td>${renderEmoji(feedback.experience)}</td></tr><tr><td><b>Flavor</b></td><td>${renderEmoji(feedback.flavor)}</td></tr><tr><td><b>Suggestion</b></td><td>${feedback.suggestion || 'None'}</td></tr></table>`;
          card.innerHTML = `
            <div class="feedback-logo">
              <img src="assets/images/logo.png" alt="The BBQ House Logo" />
            </div>
            <div style="text-align:center;padding:2rem 1rem 1rem 1rem;">
              ${thankYou}
            </div>
            <div class="feedback-answer">
              ${feedbackSummary}
            </div>
            <footer class="feedback-footer">
              <p>© 2025 - U444 - All rights reserved</p>
            </footer>`;

          const langSwitch = document.querySelector('.lang-switch');
          if (langSwitch) langSwitch.style.display = 'none';
          window._thankYouShown = true;
        } catch (err) {
          console.error("Error submitting feedback:", err);
          card.innerHTML += `<div style='color:red;text-align:center;margin-top:1rem;'>
            ${currentLang === 'vi' ? 'Gửi phản hồi thất bại. Vui lòng thử lại.' : 'Failed to submit feedback. Please try again.'}
          </div>`;
        }
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
      if (currentStep === 1) window._step1Emoji = idx;
      if (currentStep === 2) window._step2Emoji = idx;
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupLanguageSwitcher();
  showStep(0);
  setupSubmitFeedback();
}); 