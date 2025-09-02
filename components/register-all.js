// Lokstra Web Components Registration
// Import and register all web components

// Forms
import "./forms/ls-input.js";
import "./forms/ls-button.js";

// Data
import "./data/ls-table.js";

// Navigation
import "./navigation/ls-sidebar.js";
import "./navigation/ls-navbar.js";

// Layout
import "./layout/ls-card.js";
import "./layout/ls-layout.js";

// UI Components
import "./ui/lokstra-theme-switcher.js";

// Feedback
import "./feedback/ls-alert.js";
import "./feedback/ls-modal.js";

// Initialize Lucide icons after components are loaded
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// Initialize Preline components
document.addEventListener("DOMContentLoaded", () => {
  if (typeof HSStaticMethods !== "undefined") {
    HSStaticMethods.autoInit();
  }
});

console.log("Lokstra Web Components loaded successfully");
