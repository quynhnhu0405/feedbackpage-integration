// Language data for feedback cards
const feedbackData = {
  en: [
    {
      header: 'U444 <em>appreciates</em> all your feelings',
      questionLabel: 'Question 1',
      question: 'May we ask how our service this evening met your expectations?',
      emojis: [
        { icon: 'bad', label: 'Bad' },
        { icon: 'not-good', label: 'Not Good' },
        { icon: 'okay', label: 'Okay' },
        { icon: 'good', label: 'Good' },
        { icon: 'wow', label: 'Wow' }
      ],
      footer: '© 2025 - U444 - All rights reserved',
      selectEmojiNote: 'Please select an emoji to continue'
    },
    {
      header: 'U444 <em>appreciates</em> all your feelings',
      questionLabel: 'Question 2',
      question: 'How did you find the cuisine prepared for you tonight?',
      emojis: [
        { icon: 'bad', label: 'Bad' },
        { icon: 'not-good', label: 'Not Good' },
        { icon: 'okay', label: 'Okay' },
        { icon: 'good', label: 'Good' },
        { icon: 'wow', label: 'Wow' }
      ],
      footer: '© 2025 - U444 - All rights reserved',
      selectEmojiNote: 'Please select an emoji to submit your feedback'
    }
  ],
  vi: [
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'Câu hỏi 1',
      question: 'Xin quý khách đánh giá dịch vụ của chúng tôi tối nay.',
      emojis: [
        { icon: 'bad', label: 'Tệ' },
        { icon: 'not-good', label: 'Không tốt' },
        { icon: 'okay', label: 'Ổn' },
        { icon: 'good', label: 'Tốt' },
        { icon: 'wow', label: 'Tuyệt' }
      ],
      footer: '© 2025 - U444 - All rights reserved',
      selectEmojiNote: 'Vui lòng chọn một biểu tượng cảm xúc để tiếp tục'
    },
    {
      header: 'U444 trân trọng mọi <em>cảm nhận</em> của bạn',
      questionLabel: 'Câu hỏi 2',
      question: 'Xin quý khách đánh giá chất lượng món ăn được phục vụ trong buổi tối nay.',
      emojis: [
        { icon: 'bad', label: 'Tệ' },
        { icon: 'not-good', label: 'Không tốt' },
        { icon: 'okay', label: 'Ổn' },
        { icon: 'good', label: 'Tốt' },
        { icon: 'wow', label: 'Tuyệt' }
      ],
      footer: '© 2025 - U444 - All rights reserved',
      selectEmojiNote: 'Vui lòng chọn một biểu tượng cảm xúc để gửi phản hồi'
    }
  ]
};

let currentStep = 1;
let currentLang = 'en';

function showStep(stepIdx) {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.classList.toggle('step-active', i === stepIdx - 1);
  });
  
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    langSwitch.style.display = (stepIdx === 3 && window._thankYouShown) ? 'none' : '';
  }
  
  renderFeedbackCard(stepIdx, currentLang);
  
  if (stepIdx === 1 || stepIdx === 2) {
    updateNextButtonState();
    setupEmojiSelection();
    setupStepNavigation();
  }
  
  if (stepIdx === 2) {
    setupSubmitFeedback();
  }
}

function renderFeedbackCard(stepIdx, lang) {
  const steps = document.querySelectorAll('.step');
  const step = steps[stepIdx - 1];
  if (!step) return;
  
  const card = step.querySelector('.feedback-card');
  if (!card) return;
  
  const data = feedbackData[lang][stepIdx - 1];
  if (!data) return;
  
  if (stepIdx === 1 || stepIdx === 2) {
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
      <div class="emoji-notification" style="text-align: center; color: #c04421; font-size: 0.9rem; min-height: 1.5rem; opacity: 0; transition: all 0.3s ease; transform: scale(1);">
        ${data.selectEmojiNote}
      </div>
      <div class="step-nav">
        <button class="${stepIdx === 2 ? 'submit-feedback' : 'next-step'}">${stepIdx === 2 ? 'Submit Feedback' : 'Next'}</button>
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
  const langSwitch = document.querySelector('.lang-switch');
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
  const currentStepElement = document.querySelector('.step.step-active');
  if (!currentStepElement) return;
  
  const nextBtn = currentStepElement.querySelector('.next-step');
  const notification = currentStepElement.querySelector('.emoji-notification');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      const anySelected = currentStepElement.querySelector('.emoji-item.selected');
      
      if (!anySelected) {
        // Show notification with pulse effect when clicked without selection
        if (notification) {
          notification.style.opacity = '1';
          notification.style.transform = 'scale(1.05)';
          setTimeout(() => {
            notification.style.transform = 'scale(1)';
          }, 200);
        }
        e.preventDefault();
        return false;
      }
      
      if (currentStep === 1) {
        currentStep = 2;
        showStep(currentStep);
      }
    });
  }
}

function setupSubmitFeedback() {
  const currentStepElement = document.querySelector('.step.step-active');
  if (!currentStepElement) return;
  
  const submitBtn = currentStepElement.querySelector('.submit-feedback');
  const notification = currentStepElement.querySelector('.emoji-notification');
  
  if (submitBtn) {
    submitBtn.addEventListener('click', async function (e) {
      const anySelected = currentStepElement.querySelector('.emoji-item.selected');
      
      if (!anySelected) {
        // Show notification with pulse effect when clicked without selection
        if (notification) {
          notification.style.opacity = '1';
          notification.style.transform = 'scale(1.05)';
          setTimeout(() => {
            notification.style.transform = 'scale(1)';
          }, 200);
        }
        e.preventDefault();
        return false;
      }
      
      if (currentStep === 2) {
        const steps = document.querySelectorAll('.step');
        const step = steps[currentStep - 1];
        if (!step) return;
        
        const card = step.querySelector('.feedback-card');
        if (!card) return;
        const feedback = {
          experience: (typeof window._step1Emoji === 'number') ? window._step1Emoji + 1 : null,
          flavor: (typeof window._step2Emoji === 'number') ? window._step2Emoji + 1 : null,
        };
        
        try {
          if (!window.feedbackService || !window.feedbackService.submitCustomerInfo) {
            console.error("feedbackService not properly initialized.");
            return;
          }
          
          await window.feedbackService.submitCustomerInfo(feedback);

          const thankYou = currentLang === 'vi'
            ? `<h2>Cảm ơn bạn đã phản hồi!</h2>
            <p>Ý kiến của bạn đã được ghi nhận.</p>
            <p></p>Nếu có bất kỳ điều gì khiến bạn không hài lòng, chúng tôi rất mong bạn 
            <a href="tel:0989672344" style="color: green; text-decoration: underline;">nhấn vào đây</a> để chia sẻ ý kiến quý báu của mình.
            `
            : `<h2>Thank you for your feedback!</h2>
            <p>Your response has been recorded.</p>
            <p>Should there be any aspect in which we fell short of your satisfaction, we would be most grateful if you would   
            <a href="tel:0989672344" style="color: green; text-decoration: underline;">tap here</a> 
            to share your invaluable feedback.</p>`;
               
          card.innerHTML = `
            <div class="feedback-logo">
              <img src="assets/images/logo.png" alt="The BBQ House Logo" />
            </div>
            <div style="text-align:center;padding:2rem 1rem 1rem 1rem;">
              ${thankYou}
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
  }
}

function updateNextButtonState() {
  const step = document.querySelector('.step.step-active');
  if (!step) return;
  
  const card = step.querySelector('.feedback-card');
  const nextBtn = step.querySelector('.next-step') || step.querySelector('.submit-feedback');
  const notification = step.querySelector('.emoji-notification');
  
  if (!nextBtn) return;
  
  const anySelected = card.querySelector('.emoji-item.selected');
  nextBtn.disabled = !anySelected;
  nextBtn.classList.toggle('disabled', nextBtn.disabled);
  
  // Show/hide notification based on selection state
  if (notification) {
    notification.style.opacity = anySelected ? '0' : '1';
  }
}

function setupEmojiSelection() {
  const step = document.querySelector('.step.step-active');
  if (!step) return;
  
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
        const emoji = feedbackData[currentLang][currentStep - 1].emojis[j]; // Adjust index
        const img = i.querySelector('img');
        if (img && emoji) {
          img.src = `assets/images/${emoji.icon}-light.png`;
        }
      });

      item.classList.add('selected');

      const emoji = feedbackData[currentLang][currentStep - 1].emojis[idx]; // Adjust index
      const img = item.querySelector('img');
      if (img && emoji) {
        img.src = `assets/images/${emoji.icon}-dark.png`;
      }

      updateNextButtonState();
      if (currentStep === 1) window._step1Emoji = idx;
      if (currentStep === 2) window._step2Emoji = idx;
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupLanguageSwitcher();
  showStep(1);
}); 