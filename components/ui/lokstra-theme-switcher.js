/**
 * Lokstra Theme Switcher Component
 * Provides UI for switching themes using ThemeManager
 */

class LokstraThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    this.unsubscribeTheme = null;
    this.iconTimeout = null;
    this.isUpdating = false;
    this.themeIcon = null;
    this.themeText = null;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();

    // Cache DOM elements
    this.themeIcon = this.querySelector("#themeIcon");
    this.themeText = this.querySelector("#themeText");

    // Subscribe to theme changes
    if (window.LokstraTheme) {
      this.unsubscribeTheme = window.LokstraTheme.onThemeChange((theme) => {
        this.updateUI(theme);
      });

      // Initial UI update
      this.updateUI(window.LokstraTheme.getCurrentTheme());
    }

    // Initialize icons once after render - no need for manual creation for regular DOM
    this.initializeIcons();
  }

  disconnectedCallback() {
    // Cleanup subscription
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
    }

    // Clear any pending timeouts
    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout);
    }

    // Clear cached references
    this.themeIcon = null;
    this.themeText = null;
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
                    background: var(--ls-bg-secondary);
                    color: var(--ls-text-primary);
                    border: 1px solid var(--ls-border-primary);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 0.875rem;
                    font-weight: 500;
                    position: relative;
                    overflow: hidden;
                }

                .theme-switcher-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .theme-switcher-btn:hover::before {
                    left: 100%;
                }

                .theme-switcher-btn:hover {
                    background: var(--ls-bg-tertiary);
                    border-color: var(--ls-border-secondary);
                    box-shadow: var(--ls-shadow-sm);
                    transform: translateY(-1px);
                }

                .theme-switcher-btn:active {
                    transform: translateY(0) scale(0.98);
                }

                .theme-switcher-btn i {
                    width: 1rem;
                    height: 1rem;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .theme-switcher-btn:hover i {
                    transform: rotate(15deg);
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
          // Prevent multiple clicks during transition
          if (window.LokstraTheme.isThemeTransitioning()) {
            return;
          }

          // Add visual feedback
          toggleBtn.style.transform = "scale(0.95)";
          setTimeout(() => {
            toggleBtn.style.transform = "";
          }, 150);

          window.LokstraTheme.toggleTheme();
        }
      });
    }
  }

  updateUI(theme) {
    // Prevent multiple simultaneous updates
    if (this.isUpdating) return;
    this.isUpdating = true;

    // Re-query DOM elements in case they were replaced
    this.themeIcon = this.querySelector("#themeIcon");
    this.themeText = this.querySelector("#themeText");

    if (this.themeIcon && this.themeText) {
      if (theme === "dark") {
        this.themeIcon.setAttribute("data-lucide", "sun");
        this.themeText.textContent = "Light";
      } else {
        this.themeIcon.setAttribute("data-lucide", "moon");
        this.themeText.textContent = "Dark";
      }

      // Debounced icon refresh - clear previous timeout
      if (this.iconTimeout) {
        clearTimeout(this.iconTimeout);
      }

      this.iconTimeout = setTimeout(() => {
        this.refreshIcon();
        this.isUpdating = false;
      }, 50); // Faster response
    } else {
      this.isUpdating = false;
    }
  }

  initializeIcons() {
    // Use the global lucide.createIcons() for regular DOM (not Shadow DOM)
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      // Target only this component's icons
      window.lucide.createIcons({
        nameAttr: "data-lucide",
        attrs: {
          "stroke-width": 2,
        },
      });
    }
  }

  refreshIcon() {
    if (!window.lucide || !this.themeIcon) return;

    // Get the current icon name
    const iconName = this.themeIcon.getAttribute("data-lucide");

    // Try to get icon data (check both kebab-case and PascalCase)
    const pascalName = this.toPascalCase(iconName);
    const iconData = window.lucide[iconName] || window.lucide[pascalName];

    if (iconData) {
      try {
        // Find existing SVG created by lucide
        let existingSvg = this.themeIcon.nextElementSibling;
        if (existingSvg && existingSvg.tagName === "SVG") {
          existingSvg.remove();
        }

        // Also check if the icon element itself was replaced by SVG
        if (this.themeIcon.tagName === "SVG") {
          // The i element was replaced, find it by ID
          const svgElement = this.querySelector("#themeIcon");
          if (svgElement) {
            svgElement.remove();
          }
        }

        // Create new SVG manually
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("data-lucide", iconName);
        svg.id = "themeIcon";

        // Set icon paths from lucide data
        if (iconData && iconData.length >= 3) {
          const svgContent = iconData[2]
            .map((child) => {
              if (Array.isArray(child)) {
                return `<${child[0]} ${Object.entries(child[1] || {})
                  .map(([k, v]) => `${k}="${v}"`)
                  .join(" ")}>${child[2] || ""}</${child[0]}>`;
              }
              return child;
            })
            .join("");
          svg.innerHTML = svgContent;
        }

        // Insert the new SVG
        if (this.themeIcon.parentNode) {
          this.themeIcon.parentNode.insertBefore(svg, this.themeIcon);
          this.themeIcon.remove();

          // Update reference to the new SVG
          this.themeIcon = svg;
        }
      } catch (error) {
        console.warn(
          `Theme Switcher: Failed to refresh icon ${iconName}:`,
          error
        );

        // Fallback: try global lucide.createIcons
        if (typeof window.lucide.createIcons === "function") {
          window.lucide.createIcons();
        }
      }
    }
  }

  // Helper function to convert kebab-case to PascalCase
  toPascalCase(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }
}

// Register the custom element
customElements.define("lokstra-theme-switcher", LokstraThemeSwitcher);
