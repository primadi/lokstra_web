import { LitElement, html, css } from "lit"
import "/components/ui/ls-menu.js"
import "/components/ui/ls-icon.js"

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
      position: relative;
    }

    .theme-switcher-btn {
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

    .theme-switcher-btn:hover {
      background-color: var(--ls-bg-secondary);
      color: var(--ls-text-primary);
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
  `

  constructor() {
    super()
    this.breadcrumb = []
    this.user = {}
    this.showNotifications = true
    this.notificationCount = 0
    this.userMenuOpen = false
    this.notificationOpen = false
    this.currentTheme = "light" // Default value
    this.unsubscribeTheme = null

    // Available themes configuration
    this.availableThemes = {
      base: [
        {
          value: "light",
          label: "Light",
          icon: "sun",
          description: "Classic light theme",
        },
        {
          value: "dark",
          label: "Dark",
          icon: "moon",
          description: "Classic dark theme",
        },
      ],
      colors: [
        {
          value: "ocean",
          label: "Ocean",
          icon: "waves",
          description: "Cyan-based theme",
        },
        {
          value: "forest",
          label: "Forest",
          icon: "tree-pine",
          description: "Green-based theme",
        },
        {
          value: "sunset",
          label: "Sunset",
          icon: "sunrise",
          description: "Orange-based theme",
        },
        {
          value: "royal",
          label: "Royal",
          icon: "crown",
          description: "Purple-based theme",
        },
      ],
      spacing: [
        {
          value: "compact",
          label: "Compact",
          icon: "minimize-2",
          description: "Tighter spacing",
        },
        {
          value: "spacious",
          label: "Spacious",
          icon: "maximize-2",
          description: "More breathing room",
        },
      ],
      accessibility: [
        {
          value: "high-contrast",
          label: "High Contrast",
          icon: "contrast",
          description: "Enhanced visibility",
        },
        {
          value: "large-text",
          label: "Large Text",
          icon: "type",
          description: "Bigger fonts",
        },
      ],
    }
  }

  static get properties() {
    return {
      breadcrumb: { type: Array },
      user: { type: Object },
      showNotifications: { type: Boolean },
      notificationCount: { type: Number },
      userMenuOpen: { type: Boolean },
      notificationOpen: { type: Boolean },
      currentTheme: { type: String, reflect: true },
    }
  }

  toggleSidebar() {
    console.log("Navbar: Dispatching toggle-sidebar event")
    this.dispatchEvent(
      new CustomEvent("toggle-sidebar", {
        bubbles: true,
      })
    )
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen
    this.notificationOpen = false
    // Close theme menu
    const themeMenu = this.shadowRoot?.querySelector("ls-menu")
    if (themeMenu) {
      themeMenu.close()
    }
  }

  toggleNotifications() {
    this.notificationOpen = !this.notificationOpen
    this.userMenuOpen = false
    // Close theme menu
    const themeMenu = this.shadowRoot?.querySelector("ls-menu")
    if (themeMenu) {
      themeMenu.close()
    }
  }

  toggleThemeMenu() {
    this.notificationOpen = false
    const themeMenu = this.shadowRoot.querySelector("ls-menu")
    if (themeMenu) {
      themeMenu.toggle()
    }
  }

  handleThemeMenuItemSelect(event) {
    const { value } = event.detail
    this.setTheme(value)
  }

  getThemeMenuSections() {
    return Object.entries(this.availableThemes).map(
      ([categoryKey, themes]) => ({
        title:
          categoryKey === "base"
            ? "Base Themes"
            : categoryKey === "colors"
            ? "Color Themes"
            : categoryKey === "spacing"
            ? "Spacing Themes"
            : "Accessibility",
        items: themes.map((theme) => ({
          value: theme.value,
          label: theme.label,
          // description: theme.description,
          icon: theme.icon,
          active: this.currentTheme === theme.value,
          showCheck: this.currentTheme === theme.value,
        })),
      })
    )
  }

  handleSearch(e) {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { query: e.target.value },
        bubbles: true,
      })
    )
  }

  handleClickOutside(e) {
    if (!e.composedPath().includes(this)) {
      this.userMenuOpen = false
      this.notificationOpen = false
      // Close theme menu
      const themeMenu = this.shadowRoot?.querySelector("ls-menu")
      if (themeMenu) {
        themeMenu.close()
      }
    }
  }

  getCurrentTheme() {
    return window.LokstraTheme?.getCurrentTheme() || "light"
  }

  setTheme(themeName) {
    console.log("Navbar: Setting theme:", themeName)

    if (window.LokstraTheme) {
      window.LokstraTheme.setTheme(themeName)
    } else {
      console.warn("Navbar: LokstraTheme not available, using fallback")
      // Fallback manual theme switch
      document.documentElement.setAttribute("data-theme", themeName)
      localStorage.setItem("lokstra-theme", themeName)

      // Manual theme update for fallback
      this.currentTheme = themeName
      this.requestUpdate()
    }

    // Update menu sections to reflect new active theme
    this.requestUpdate()
  }

  toggleTheme() {
    console.log("Navbar: Toggle theme called")
    const currentTheme = this.currentTheme
    const newTheme = currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  getThemeIcon(themeName) {
    const allThemes = [
      ...this.availableThemes.base,
      ...this.availableThemes.colors,
      ...this.availableThemes.spacing,
      ...this.availableThemes.accessibility,
    ]

    const theme = allThemes.find((t) => t.value === themeName)
    return theme ? theme.icon : "palette"
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("click", this.handleClickOutside.bind(this))

    // Only listen to ThemeManager
    if (window.LokstraTheme) {
      this.unsubscribeTheme = window.LokstraTheme.onThemeChange((theme) => {
        console.log("Navbar: Theme changed to:", theme)
        this.currentTheme = theme
        // With ls-icon, automatic re-rendering happens!
        this.requestUpdate()
      })
    }

    // Initialize current theme
    this.currentTheme = this.getCurrentTheme()
  }

  updated(changedProperties) {
    super.updated(changedProperties)

    // With ls-icon, no manual icon management needed!
    if (changedProperties.has("currentTheme")) {
      console.log("Navbar: Theme changed to:", this.currentTheme)
      // ls-icon will automatically re-render when reactive properties change
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this.handleClickOutside.bind(this))

    // Clean up theme subscription
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme()
    }
  }

  renderBreadcrumb() {
    if (!this.breadcrumb.length) return ""

    return html`
      <div class="breadcrumb">
        ${this.breadcrumb.map(
          (item, index) => html`
            ${index > 0
              ? html`<ls-icon name="chevron-right" size="1rem"></ls-icon>`
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
    `
  }

  render() {
    return html`
      <div class="navbar-container">
        <!-- Left section -->
        <div class="navbar-left">
          <button class="menu-toggle" @click="${this.toggleSidebar}">
            <ls-icon name="menu" size="1.5rem"></ls-icon>
          </button>

          ${this.renderBreadcrumb()}
        </div>

        <!-- Right section -->
        <div class="navbar-right">
          <!-- Theme Switcher -->
          <div class="theme-switcher">
            <button
              class="theme-switcher-btn"
              @click="${this.toggleThemeMenu}"
              title="Choose theme"
            >
              <ls-icon
                name="${this.getThemeIcon(this.currentTheme)}"
                size="1.5rem"
              ></ls-icon>
            </button>

            <ls-menu
              title="🎨 Choose Theme"
              subtitle="Customize your experience"
              position="right"
              .sections="${this.getThemeMenuSections()}"
              @menu-item-select="${this.handleThemeMenuItemSelect}"
            ></ls-menu>
          </div>

          <!-- Notifications -->
          ${this.showNotifications
            ? html`
                <div class="notification-container">
                  <button
                    class="notification-btn"
                    @click="${this.toggleNotifications}"
                  >
                    <ls-icon name="bell" size="1.5rem"></ls-icon>
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
                      <ls-icon name="info" size="1rem"></ls-icon>
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
              <ls-icon name="chevron-down" size="1rem"></ls-icon>
            </button>

            <div class="user-dropdown ${this.userMenuOpen ? "" : "hidden"}">
              <a href="/profile" class="dropdown-item">
                <ls-icon name="user" size="1rem"></ls-icon>
                Profile
              </a>
              <a href="/settings" class="dropdown-item">
                <ls-icon name="settings" size="1rem"></ls-icon>
                Settings
              </a>
              <a href="/logout" class="dropdown-item">
                <ls-icon name="log-out" size="1rem"></ls-icon>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

// Register the custom element
customElements.define("ls-navbar", LsNavbar)
