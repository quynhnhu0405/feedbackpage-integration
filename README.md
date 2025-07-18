# Feedback Page Integration

A modern, responsive customer feedback page for collecting user opinions in both English and Vietnamese. Supports emoji-based ratings, open-ended suggestions, and multi-step navigation.

## Features
- Multi-step feedback form (emoji ratings, suggestions)
- Language switcher (English & Vietnamese)
- Responsive design for desktop and mobile
- Custom emoji icons (light/dark states)
- Thank you page with localized message
- Easy to customize questions and appearance

## Folder Structure
```
feedbackpage-integration/
├── assets/
│   └── images/           # Emoji icons, logo, favicon
├── css/
│   └── style.css         # Main stylesheet
├── js/
│   └── main.js           # Main JavaScript logic
├── index.html            # Main HTML file
└── README.md             # This file
```

## Setup & Usage
1. **Clone or copy this folder to your web server or local machine.**
2. **Open `index.html` in your browser.**
   - No build step or backend required for demo/testing.
3. **Customize:**
   - Edit `js/main.js` to change questions, emoji, or language text.
   - Replace images in `assets/images/` for your own branding.
   - Edit `css/style.css` for design tweaks.

## Customization
- **Questions & Language:**
  - Update the `feedbackData` object in `js/main.js` for your own questions, emoji, and translations.
- **Emoji Icons:**
  - Place your emoji images in `assets/images/` using the naming convention: `bad-light.png`, `bad-dark.png`, etc.
- **Thank You Page:**
  - The thank you message is localized and can be edited in `js/main.js`.

