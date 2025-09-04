/**
 * Lokstra Theme Manager - Single Source of Truth for Theme Management
 * Manages theme state across all components with consistent CSS variables
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = "lokstra-theme";
    this.DEFAULT_THEME = "light";
    this.THEME_CLASS_PREFIX = "theme-";
    this.callbacks = [];
    this.isInitialized = false;

    // Apply theme immediately to prevent FOUC
    this.applyInitialTheme();

    // Wait for DOM to be ready before full initialization
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      // DOM is already ready
      this.init();
    }
  }

  /**
   * Apply theme immediately to prevent FOUC
   */
  applyInitialTheme() {
    const savedTheme =
      localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_THEME;

    // Apply data-theme attribute immediately
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Apply basic CSS variables immediately
    if (savedTheme === "dark") {
      document.documentElement.style.setProperty("--initial-bg", "#111827");
      document.documentElement.style.setProperty("--initial-text", "#f9fafb");
    } else {
      document.documentElement.style.setProperty("--initial-bg", "#fafafa");
      document.documentElement.style.setProperty("--initial-text", "#374151");
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
    // CSS variables are now defined in dashboard.html template
    // This method is kept for potential future extensions

    // Just ensure the theme attribute is applied
    const currentTheme = this.getStoredTheme();
    document.documentElement.setAttribute("data-theme", currentTheme);
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
    if (!document.documentElement) {
      // Fallback to stored theme if documentElement not available
      return this.getStoredTheme();
    }
    const dataTheme = document.documentElement.getAttribute("data-theme");
    return dataTheme || this.getStoredTheme();
  }

  /**
   * Set theme and update all components
   */
  setTheme(theme, triggerCallbacks = true) {
    // Safety check: ensure documentElement exists
    if (!document.documentElement) {
      console.warn(
        "ThemeManager: document.documentElement not available, deferring theme application"
      );
      // Retry after a short delay
      setTimeout(() => this.setTheme(theme, triggerCallbacks), 10);
      return;
    }

    // Set data attribute for CSS selectors - this is the main theme control
    document.documentElement.setAttribute("data-theme", theme);

    // Update initial CSS variables to prevent FOUC
    if (theme === "dark") {
      document.documentElement.style.setProperty("--initial-bg", "#111827");
      document.documentElement.style.setProperty("--initial-text", "#f9fafb");
    } else {
      document.documentElement.style.setProperty("--initial-bg", "#fafafa");
      document.documentElement.style.setProperty("--initial-text", "#374151");
    }

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
