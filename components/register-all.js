// Lokstra Web Components Registration
// Import and register all web components

// Forms
import "./forms/ls-input.js"
import "./forms/ls-button.js"

// Data
import "./data/ls-table.js"

// Navigation
import "./navigation/ls-sidebar.js"
import "./navigation/ls-navbar.js"

// Layout
import "./layout/ls-card.js"
import "./layout/ls-layout.js"

// UI Components
import "./ui/ls-icon.js"
import "./ui/ls-menu.js"

// Feedback
import "./feedback/ls-alert.js"
import "./feedback/ls-modal.js"

// Initialize icons will be handled globally by dashboard.html
document.addEventListener("DOMContentLoaded", () => {
  console.log("Lokstra Web Components loaded successfully")
})
