/**
 * Lokstra Theme Switcher Component
 * Provides UI for switching themes using ThemeManager
 */

class LokstraThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    this.unsubscribeTheme = null;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();

    // Subscribe to theme changes
    if (window.LokstraTheme) {
      this.unsubscribeTheme = window.LokstraTheme.onThemeChange((theme) => {
        this.updateUI(theme);
      });

      // Initial UI update
      this.updateUI(window.LokstraTheme.getCurrentTheme());
    }
  }

  disconnectedCallback() {
    // Cleanup subscription
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
    }
  }

  render() {
    this.innerHTML = `
            <button id="themeToggle" class="theme-switcher-btn">
                <i id="themeIcon" data-lucide="moon"></i>
                <span id="themeText">Dark</span>
            </button>
        `;

    // Add styles
    if (!document.getElementById("theme-switcher-styles")) {
      const style = document.createElement("style");
      style.id = "theme-switcher-styles";
      style.textContent = `
                .theme-switcher-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: var(--lokstra-bg-secondary);
                    color: var(--lokstra-text-primary);
                    border: 1px solid var(--lokstra-border-primary);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                .theme-switcher-btn:hover {
                    background: var(--lokstra-bg-tertiary);
                    border-color: var(--lokstra-border-secondary);
                    box-shadow: var(--lokstra-shadow-sm);
                }

                .theme-switcher-btn:active {
                    transform: translateY(1px);
                }

                .theme-switcher-btn i {
                    width: 1rem;
                    height: 1rem;
                }
            `;
      document.head.appendChild(style);
    }
  }

  attachEventListeners() {
    const toggleBtn = this.querySelector("#themeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (window.LokstraTheme) {
          window.LokstraTheme.toggleTheme();
        }
      });
    }
  }

  updateUI(theme) {
    const themeIcon = this.querySelector("#themeIcon");
    const themeText = this.querySelector("#themeText");

    if (themeIcon && themeText) {
      if (theme === "dark") {
        themeIcon.setAttribute("data-lucide", "sun");
        themeText.textContent = "Light";
      } else {
        themeIcon.setAttribute("data-lucide", "moon");
        themeText.textContent = "Dark";
      }

      // Refresh lucide icons if available
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    }
  }
}

// Register the custom element
customElements.define("lokstra-theme-switcher", LokstraThemeSwitcher);
