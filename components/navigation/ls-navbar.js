import { LitElement, html, css } from "lit";

export class LsNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--lokstra-bg-primary);
      border-bottom: 1px solid var(--lokstra-border-primary);
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
      color: var(--lokstra-text-secondary);
      transition: all 0.2s ease-in-out;
    }

    .menu-toggle:hover {
      background-color: var(--lokstra-bg-secondary);
      color: var(--lokstra-text-primary);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--lokstra-text-muted);
    }

    .breadcrumb-item {
      color: var(--lokstra-text-muted);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
    }

    .breadcrumb-item:hover {
      color: var(--lokstra-text-primary);
    }

    .breadcrumb-item.active {
      color: var(--lokstra-text-primary);
      font-weight: 500;
    }

    .breadcrumb-separator {
      color: var(--lokstra-text-muted);
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
      color: var(--lokstra-text-secondary);
      transition: all 0.2s ease-in-out;
    }

    .notification-btn:hover {
      background-color: var(--lokstra-bg-secondary);
      color: var(--lokstra-text-primary);
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
      background-color: var(--lokstra-bg-secondary);
    }

    .user-avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--lokstra-bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--lokstra-text-primary);
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
      color: var(--lokstra-text-primary);
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--lokstra-text-muted);
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
      color: var(--lokstra-text-secondary);
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-switcher:hover {
      background-color: var(--lokstra-bg-secondary);
      color: var(--lokstra-text-primary);
    }

    .hidden {
      display: none;
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
    this.currentTheme = this.getCurrentTheme();
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
    console.log("Toggle theme called");
    console.log("LokstraTheme available:", !!window.LokstraTheme);
    console.log("Current theme:", this.currentTheme);

    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    console.log("Setting new theme:", newTheme);

    if (window.LokstraTheme) {
      window.LokstraTheme.setTheme(newTheme);
    } else {
      console.warn("LokstraTheme not available, using fallback");
      // Fallback manual theme switch
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.classList.toggle(
        "theme-dark",
        newTheme === "dark"
      );
      localStorage.setItem("lokstra-theme", newTheme);

      // Manually trigger CSS variables update
      this.updateCSSVariables(newTheme);
    }

    this.currentTheme = newTheme;
    this.requestUpdate();
  }

  updateCSSVariables(theme) {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--lokstra-bg-primary", "#0f172a");
      root.style.setProperty("--lokstra-bg-secondary", "#1e293b");
      root.style.setProperty("--lokstra-bg-tertiary", "#334155");
      root.style.setProperty("--lokstra-text-primary", "#f1f5f9");
      root.style.setProperty("--lokstra-text-secondary", "#cbd5e1");
      root.style.setProperty("--lokstra-text-muted", "#94a3b8");
      root.style.setProperty("--lokstra-border-primary", "#334155");
      root.style.setProperty("--lokstra-border-secondary", "#475569");
    } else {
      root.style.setProperty("--lokstra-bg-primary", "#ffffff");
      root.style.setProperty("--lokstra-bg-secondary", "#f8fafc");
      root.style.setProperty("--lokstra-bg-tertiary", "#e2e8f0");
      root.style.setProperty("--lokstra-text-primary", "#0f172a");
      root.style.setProperty("--lokstra-text-secondary", "#334155");
      root.style.setProperty("--lokstra-text-muted", "#64748b");
      root.style.setProperty("--lokstra-border-primary", "#cbd5e1");
      root.style.setProperty("--lokstra-border-secondary", "#94a3b8");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleClickOutside.bind(this));

    // Listen for theme changes
    document.addEventListener("lokstra-theme-changed", (e) => {
      this.currentTheme = e.detail.theme;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleClickOutside.bind(this));
    document.removeEventListener(
      "lokstra-theme-changed",
      this.handleThemeChange
    );
  }

  renderBreadcrumb() {
    if (!this.breadcrumb.length) return "";

    return html`
      <div class="breadcrumb">
        ${this.breadcrumb.map(
          (item, index) => html`
            ${index > 0
              ? html`
                  <i
                    data-lucide="chevron-right"
                    class="breadcrumb-separator"
                    style="width: 1rem; height: 1rem;"
                  ></i>
                `
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
            <i data-lucide="menu" style="width: 1.25rem; height: 1.25rem;"></i>
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
              style="width: 1.25rem; height: 1.25rem;"
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
                    <i
                      data-lucide="bell"
                      style="width: 1.25rem; height: 1.25rem;"
                    ></i>
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
                      <i data-lucide="info" class="dropdown-icon"></i>
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
                style="width: 1rem; height: 1rem; color: var(--ls-gray-500);"
              ></i>
            </button>

            <div class="user-dropdown ${this.userMenuOpen ? "" : "hidden"}">
              <a href="/profile" class="dropdown-item">
                <i data-lucide="user" class="dropdown-icon"></i>
                Profile
              </a>
              <a href="/settings" class="dropdown-item">
                <i data-lucide="settings" class="dropdown-icon"></i>
                Settings
              </a>
              <a href="/logout" class="dropdown-item">
                <i data-lucide="log-out" class="dropdown-icon"></i>
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
