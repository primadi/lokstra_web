import { LitElement, html, css } from "lit";

export class LsNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--ls-bg-primary);
      border-bottom: 1px solid var(--ls-border-primary);
      padding: 0 1rem;
      position: sticky;
      top: 0;
      z-index: 30;
      height: 4rem;
      transition: all 0.3s ease;
    }

    .navbar-container {
      max-width: none;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      color: var(--ls-text-secondary);
      transition: all 0.2s ease-in-out;
    }

    .menu-toggle:hover {
      background-color: var(--ls-bg-secondary);
      color: var(--ls-text-primary);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--ls-text-muted);
    }

    .breadcrumb-item {
      color: var(--ls-text-muted);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
    }

    .breadcrumb-item:hover {
      color: var(--ls-text-primary);
    }

    .breadcrumb-item.active {
      color: var(--ls-text-primary);
      font-weight: 500;
    }

    .breadcrumb-separator {
      color: var(--ls-text-muted);
      opacity: 0.5;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .search-container {
      position: relative;
      display: none;
    }

    .search-input {
      width: 320px;
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      border: 1px solid var(--ls-gray-300);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background-color: var(--ls-navbar-search-bg, white);
      color: var(--ls-navbar-search-text, var(--ls-gray-700));
      transition: all 0.2s ease-in-out;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--ls-primary-500);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--ls-gray-400);
      width: 1rem;
      height: 1rem;
    }

    .notification-container {
      position: relative;
    }

    .notification-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      position: relative;
      color: var(--ls-text-secondary);
      transition: all 0.2s ease-in-out;
    }

    .notification-btn:hover {
      background-color: var(--ls-bg-secondary);
      color: var(--ls-text-primary);
    }

    .notification-badge {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--ls-error-500);
      border-radius: 50%;
    }

    .notification-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 320px;
      background-color: var(--ls-navbar-dropdown-bg, white);
      border: 1px solid var(--ls-gray-200);
      border-radius: 0.5rem;
      box-shadow: var(--ls-shadow-lg);
      margin-top: 0.5rem;
      z-index: 50;
      max-height: 400px;
      overflow-y: auto;
    }

    .user-container {
      position: relative;
    }

    .user-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease-in-out;
    }

    .user-btn:hover {
      background-color: var(--ls-bg-secondary);
    }

    .user-avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--ls-bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--ls-text-primary);
      font-size: 0.875rem;
    }

    .user-info {
      display: none;
      flex-direction: column;
      align-items: flex-start;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ls-text-primary);
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--ls-text-muted);
    }

    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      width: 200px;
      background-color: var(--ls-navbar-dropdown-bg, white);
      border: 1px solid var(--ls-gray-200);
      border-radius: 0.5rem;
      box-shadow: var(--ls-shadow-lg);
      margin-top: 0.5rem;
      z-index: 50;
    }

    .dropdown-item {
      display: block;
      padding: 0.75rem 1rem;
      color: var(--ls-gray-700);
      text-decoration: none;
      font-size: 0.875rem;
      transition: background-color 0.2s ease-in-out;
      border-bottom: 1px solid var(--ls-gray-100);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dropdown-item:last-child {
      border-bottom: none;
    }

    .dropdown-item:hover {
      background-color: var(--ls-gray-50);
    }

    .dropdown-icon {
      width: 1rem;
      height: 1rem;
      color: var(--ls-gray-500);
    }

    .theme-switcher {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      color: var(--ls-text-secondary);
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-switcher:hover {
      background-color: var(--ls-bg-secondary);
      color: var(--ls-text-primary);
    }

    .hidden {
      display: none;
    }

    /* Lucide Icons Styling within Shadow DOM */
    svg[data-lucide] {
      display: inline-block !important;
      width: inherit !important;
      height: inherit !important;
      stroke-width: 2 !important;
      fill: none !important;
      stroke: currentColor !important;
    }

    i[data-lucide] {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 1rem;
      height: 1rem;
    }

    /* Responsive */
    @media (min-width: 768px) {
      .search-container {
        display: block;
      }

      .user-info {
        display: flex;
      }
    }
  `;

  constructor() {
    super();
    this.breadcrumb = [];
    this.user = {};
    this.showNotifications = true;
    this.notificationCount = 0;
    this.userMenuOpen = false;
    this.notificationOpen = false;
    this.currentTheme = "light"; // Default value
    this.unsubscribeTheme = null;
    this.iconTimeout = null;
    this.isUpdatingIcons = false;
  }

  static get properties() {
    return {
      breadcrumb: { type: Array },
      user: { type: Object },
      showNotifications: { type: Boolean },
      notificationCount: { type: Number },
      userMenuOpen: { type: Boolean },
      notificationOpen: { type: Boolean },
      currentTheme: { type: String },
    };
  }

  toggleSidebar() {
    this.dispatchEvent(
      new CustomEvent("toggle-sidebar", {
        bubbles: true,
      })
    );
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.notificationOpen = false;
  }

  toggleNotifications() {
    this.notificationOpen = !this.notificationOpen;
    this.userMenuOpen = false;
  }

  handleSearch(e) {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { query: e.target.value },
        bubbles: true,
      })
    );
  }

  handleClickOutside(e) {
    if (!e.composedPath().includes(this)) {
      this.userMenuOpen = false;
      this.notificationOpen = false;
    }
  }

  getCurrentTheme() {
    return window.LokstraTheme?.getCurrentTheme() || "light";
  }

  toggleTheme() {
    console.log("Navbar: Toggle theme called");
    console.log("Navbar: LokstraTheme available:", !!window.LokstraTheme);
    console.log("Navbar: Current theme:", this.currentTheme);

    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    console.log("Navbar: Setting new theme:", newTheme);

    if (window.LokstraTheme) {
      window.LokstraTheme.setTheme(newTheme);
    } else {
      console.warn("Navbar: LokstraTheme not available, using fallback");
      // Fallback manual theme switch
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.classList.toggle(
        "theme-dark",
        newTheme === "dark"
      );
      localStorage.setItem("lokstra-theme", newTheme);

      // Manually trigger CSS variables update
      this.updateCSSVariables(newTheme);

      // Manual theme update for fallback
      this.currentTheme = newTheme;
      this.requestUpdate();
      this.updateThemeIcon(newTheme);
    }

    // Icons will be re-initialized automatically in theme change handler
  }

  updateCSSVariables(theme) {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--ls-bg-primary", "#0f172a");
      root.style.setProperty("--ls-bg-secondary", "#1e293b");
      root.style.setProperty("--ls-bg-tertiary", "#334155");
      root.style.setProperty("--ls-text-primary", "#f1f5f9");
      root.style.setProperty("--ls-text-secondary", "#cbd5e1");
      root.style.setProperty("--ls-text-muted", "#94a3b8");
      root.style.setProperty("--ls-border-primary", "#334155");
      root.style.setProperty("--ls-border-secondary", "#475569");
    } else {
      root.style.setProperty("--ls-bg-primary", "#ffffff");
      root.style.setProperty("--ls-bg-secondary", "#f8fafc");
      root.style.setProperty("--ls-bg-tertiary", "#e2e8f0");
      root.style.setProperty("--ls-text-primary", "#0f172a");
      root.style.setProperty("--ls-text-secondary", "#334155");
      root.style.setProperty("--ls-text-muted", "#64748b");
      root.style.setProperty("--ls-border-primary", "#cbd5e1");
      root.style.setProperty("--ls-border-secondary", "#94a3b8");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleClickOutside.bind(this));

    // Only listen to ThemeManager - remove duplicate event listeners
    if (window.LokstraTheme) {
      this.unsubscribeTheme = window.LokstraTheme.onThemeChange((theme) => {
        console.log("Navbar: Theme changed to:", theme);
        this.currentTheme = theme;
        this.requestUpdate();

        // Debounced icon refresh to prevent multiple calls
        this.scheduleIconRefresh();

        // Update theme icon manually since Lit won't re-render SVG
        this.updateThemeIcon(theme);
      });
    }

    // Initialize current theme
    this.currentTheme = this.getCurrentTheme();

    // Initialize icons after the component is connected and rendered
    this.updateComplete.then(() => {
      this.initializeLucideIcons();
    });
  }
  updated(changedProperties) {
    super.updated(changedProperties);

    // Only initialize icons if currentTheme changed and no icons refresh is pending
    if (changedProperties.has("currentTheme") && !this.iconTimeout) {
      this.scheduleIconRefresh();
    }
  }

  scheduleIconRefresh() {
    // Prevent multiple simultaneous icon refreshes
    if (this.isUpdatingIcons) return;

    // Clear any pending timeout
    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout);
    }

    this.iconTimeout = setTimeout(() => {
      this.initializeLucideIcons();
      this.iconTimeout = null;
    }, 150);
  }

  updateThemeIcon(theme) {
    // Manually update the theme switcher icon since it's conditional
    setTimeout(() => {
      const themeButton = this.shadowRoot?.querySelector(".theme-switcher");
      if (themeButton) {
        // Find the theme icon (either <i> or <svg>)
        let themeIcon = themeButton.querySelector(
          "i[data-lucide], svg[data-lucide]"
        );

        if (themeIcon) {
          const newIconName = theme === "dark" ? "sun" : "moon";
          const currentIconName = themeIcon.getAttribute("data-lucide");

          console.log(
            `Navbar: Updating theme icon from ${currentIconName} to ${newIconName}`
          );

          // If it's an SVG, replace it completely
          if (themeIcon.tagName === "SVG") {
            // Create new i element with new icon name
            const newIconElement = document.createElement("i");
            newIconElement.setAttribute("data-lucide", newIconName);

            // Replace SVG with new i element
            themeIcon.parentNode.replaceChild(newIconElement, themeIcon);

            // Create new SVG for the new icon
            this.createSingleIcon(newIconElement, newIconName);
          } else {
            // If it's still an i element, just update the attribute
            themeIcon.setAttribute("data-lucide", newIconName);
            this.createSingleIcon(themeIcon, newIconName);
          }
        }
      }
    }, 50);
  }

  createSingleIcon(iconElement, iconName) {
    if (!window.lucide) return;

    const pascalName = this.toPascalCase(iconName);
    const iconData = window.lucide[iconName] || window.lucide[pascalName];

    if (iconData) {
      try {
        // Create SVG manually
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("data-lucide", iconName);

        // Set icon paths
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

        // Replace the i element
        iconElement.parentNode.replaceChild(svg, iconElement);
        console.log(`Navbar: Successfully created theme icon ${iconName}`);
      } catch (error) {
        console.error(
          `Navbar: Failed to create theme icon ${iconName}:`,
          error
        );
      }
    }
  }
  initializeLucideIcons() {
    // Prevent multiple simultaneous calls
    if (this.isUpdatingIcons) return;
    this.isUpdatingIcons = true;

    // Add delay to ensure DOM is ready and Lucide is loaded
    setTimeout(() => {
      console.log("Navbar: Attempting to initialize Lucide icons");

      if (this.shadowRoot && window.lucide) {
        // Use MANUAL CREATION method (proven to work in icon-test)
        this.createIconsManually();
      } else {
        console.warn(
          "Navbar: Lucide or Shadow DOM not available for icon initialization"
        );
      }

      this.isUpdatingIcons = false;
    }, 50);
  }

  createIconsManually() {
    if (!this.shadowRoot || !window.lucide) return;

    // Find only i elements that need to be processed - more efficient
    const iconsToCreate = this.shadowRoot.querySelectorAll("i[data-lucide]");
    console.log("Navbar: Found icons to process:", iconsToCreate.length);

    iconsToCreate.forEach((iconElement) => {
      const iconName = iconElement.getAttribute("data-lucide");

      // Skip if already processed and is an SVG
      if (iconElement.tagName === "SVG") return;

      // Check if icon exists in lucide library (try both kebab-case and PascalCase)
      const pascalName = this.toPascalCase(iconName);
      const iconData = window.lucide[iconName] || window.lucide[pascalName];

      if (iconData) {
        try {
          // Create SVG manually
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          svg.setAttribute("width", "20");
          svg.setAttribute("height", "20");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");
          svg.setAttribute("stroke-linecap", "round");
          svg.setAttribute("stroke-linejoin", "round");
          svg.setAttribute("data-lucide", iconName);

          // Set icon paths
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

          // Replace the i element
          iconElement.parentNode.replaceChild(svg, iconElement);
          console.log(`Navbar: Successfully created SVG for ${iconName}`);
        } catch (error) {
          console.error(`Navbar: Failed to create ${iconName}:`, error);
        }
      }
    });
  }

  // Helper function to convert kebab-case to PascalCase
  toPascalCase(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleClickOutside.bind(this));

    // Clean up theme subscription
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
    }

    // Clear any pending timeouts
    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout);
    }
  }

  renderBreadcrumb() {
    if (!this.breadcrumb.length) return "";

    return html`
      <div class="breadcrumb">
        ${this.breadcrumb.map(
          (item, index) => html`
            ${index > 0
              ? html`<i
                  data-lucide="chevron-right"
                  style="width: 1rem; height: 1rem;"
                ></i>`
              : ""}
            <a
              href="${item.url}"
              class="breadcrumb-item ${item.active ? "active" : ""}"
              ${item.hxGet ? `hx-get="${item.hxGet}"` : ""}
              ${item.hxTarget ? `hx-target="${item.hxTarget}"` : ""}
            >
              ${item.title}
            </a>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="navbar-container">
        <!-- Left section -->
        <div class="navbar-left">
          <button class="menu-toggle" @click="${this.toggleSidebar}">
            <i data-lucide="menu"></i>
          </button>

          ${this.renderBreadcrumb()}
        </div>

        <!-- Right section -->
        <div class="navbar-right">
          <!-- Theme Switcher -->
          <button
            class="theme-switcher"
            @click="${this.toggleTheme}"
            title="Toggle theme"
          >
            <i
              data-lucide="${this.currentTheme === "dark" ? "sun" : "moon"}"
            ></i>
          </button>

          <!-- Notifications -->
          ${this.showNotifications
            ? html`
                <div class="notification-container">
                  <button
                    class="notification-btn"
                    @click="${this.toggleNotifications}"
                  >
                    <i data-lucide="bell"></i>
                    ${this.notificationCount > 0
                      ? html` <span class="notification-badge"></span> `
                      : ""}
                  </button>

                  <div
                    class="notification-dropdown ${this.notificationOpen
                      ? ""
                      : "hidden"}"
                  >
                    <div class="dropdown-item">
                      <i
                        data-lucide="info"
                        style="width: 1rem; height: 1rem;"
                      ></i>
                      No new notifications
                    </div>
                  </div>
                </div>
              `
            : ""}

          <!-- User menu -->
          <div class="user-container">
            <button class="user-btn" @click="${this.toggleUserMenu}">
              <div class="user-avatar">
                ${this.user.avatar
                  ? html`
                      <img
                        src="${this.user.avatar}"
                        alt="${this.user.name}"
                        style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"
                      />
                    `
                  : html`
                      ${this.user.name
                        ? this.user.name.charAt(0).toUpperCase()
                        : "U"}
                    `}
              </div>
              <div class="user-info">
                <span class="user-name">${this.user.name || "User"}</span>
                <span class="user-role">${this.user.role || "Member"}</span>
              </div>
              <i
                data-lucide="chevron-down"
                style="width: 1rem; height: 1rem;"
              ></i>
            </button>

            <div class="user-dropdown ${this.userMenuOpen ? "" : "hidden"}">
              <a href="/profile" class="dropdown-item">
                <i data-lucide="user" style="width: 1rem; height: 1rem;"></i>
                Profile
              </a>
              <a href="/settings" class="dropdown-item">
                <i
                  data-lucide="settings"
                  style="width: 1rem; height: 1rem;"
                ></i>
                Settings
              </a>
              <a href="/logout" class="dropdown-item">
                <i data-lucide="log-out" style="width: 1rem; height: 1rem;"></i>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Register the custom element
customElements.define("ls-navbar", LsNavbar);
