/**
 * Lokstra Theme Manager - Single Source of Truth for Theme Management
 * Manages theme state across all components with consistent CSS variables
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = "lokstra-theme";
    this.DEFAULT_THEME = "dark";
    this.THEME_CLASS_PREFIX = "theme-";
    this.callbacks = [];
    this.isInitialized = false;

    // Wait for DOM to be ready before initializing
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      // DOM is already ready
      this.init();
    }
  }

  /**
   * Initialize theme system
   */
  init() {
    if (this.isInitialized) return;

    this.setupCSSVariables();
    const savedTheme = this.getStoredTheme();
    this.setTheme(savedTheme, false); // Don't trigger callbacks on init
    this.isInitialized = true;
  }

  /**
   * Setup CSS custom properties for consistent theming
   */
  setupCSSVariables() {
    const style = document.createElement("style");
    style.id = "lokstra-theme-variables";
    style.textContent = `
            :root {
                /* Light theme (default) */
                --lokstra-bg-primary: #ffffff;
                --lokstra-bg-secondary: #f9fafb;
                --lokstra-bg-tertiary: #f3f4f6;
                --lokstra-text-primary: #111827;
                --lokstra-text-secondary: #374151;
                --lokstra-text-muted: #6b7280;
                --lokstra-border-primary: #e5e7eb;
                --lokstra-border-secondary: #d1d5db;
                --lokstra-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                --lokstra-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                --lokstra-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            [data-theme="dark"],
            .theme-dark {
                /* Dark theme */
                --lokstra-bg-primary: #111827;
                --lokstra-bg-secondary: #1f2937;
                --lokstra-bg-tertiary: #374151;
                --lokstra-text-primary: #f3f4f6;
                --lokstra-text-secondary: #d1d5db;
                --lokstra-text-muted: #9ca3af;
                --lokstra-border-primary: #374151;
                --lokstra-border-secondary: #4b5563;
                --lokstra-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
                --lokstra-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
                --lokstra-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            }

            /* Base styles using theme variables */
            body {
                background-color: var(--lokstra-bg-primary);
                color: var(--lokstra-text-primary);
                transition: background-color 0.3s ease, color 0.3s ease;
            }
        `;

    // Remove existing theme variables if any
    const existing = document.getElementById("lokstra-theme-variables");
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(style);
  }

  /**
   * Get current theme from storage or return default
   */
  getStoredTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_THEME;
  }

  /**
   * Store theme preference
   */
  setStoredTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Get current active theme
   */
  getCurrentTheme() {
    if (!document.body) {
      // Fallback to stored theme if body not available
      return this.getStoredTheme();
    }
    return document.body.classList.contains("theme-dark") ? "dark" : "light";
  }

  /**
   * Set theme and update all components
   */
  setTheme(theme, triggerCallbacks = true) {
    // Safety check: ensure body exists
    if (!document.body) {
      console.warn(
        "ThemeManager: document.body not available, deferring theme application"
      );
      // Retry after a short delay
      setTimeout(() => this.setTheme(theme, triggerCallbacks), 10);
      return;
    }

    // Remove all theme classes
    document.body.classList.remove("theme-light", "theme-dark");

    // Add new theme class
    document.body.classList.add(`theme-${theme}`);

    // Set data attribute for CSS selectors
    document.body.setAttribute("data-theme", theme);

    // Store preference
    this.setStoredTheme(theme);

    // Trigger callbacks for components that need to know about theme changes
    if (triggerCallbacks) {
      this.notifyComponents(theme);
    }

    console.log(`Theme changed to: ${theme}`);
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Subscribe to theme changes
   */
  onThemeChange(callback) {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Notify all subscribed components about theme change
   */
  notifyComponents(theme) {
    this.callbacks.forEach((callback) => {
      try {
        callback(theme);
      } catch (error) {
        console.error("Error in theme change callback:", error);
      }
    });
  }

  /**
   * Get CSS variable value for current theme
   */
  getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--lokstra-${variableName}`)
      .trim();
  }

  /**
   * Check if dark theme is active
   */
  isDarkTheme() {
    return this.getCurrentTheme() === "dark";
  }

  /**
   * Check if light theme is active
   */
  isLightTheme() {
    return this.getCurrentTheme() === "light";
  }
}

// Create global instance
window.LokstraTheme = new ThemeManager();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
