import { LitElement, html, css } from "lit"
import "/components/ui/ls-icon.js"
import "/components/ui/ls-menu.js"

export class LsSidebar extends LitElement {
  static styles = css`
    :host {
      /* 🎯 COMPONENT VARIABLES using DESIGN TOKENS */
      --sidebar-width: calc(var(--ls-spacing-2xl, 2rem) * 8); /* 16rem */
      --sidebar-collapsed-width: var(--ls-size-xl, 3rem); /* 3rem */
      --sidebar-padding: var(--ls-spacing-lg, 1rem); /* 1rem */
      --sidebar-item-padding: var(--ls-spacing-md, 0.75rem)
        var(--ls-spacing-lg, 1rem); /* 12px 16px */

      /* 🎨 THEMING using global color tokens with fallbacks */
      --sidebar-bg: var(--ls-gray-900, #111827);
      --sidebar-border: var(--ls-gray-800, #1f2937);
      --sidebar-text: var(--ls-gray-100, #f9fafb);
      --sidebar-text-muted: var(--ls-gray-400, #9ca3af);
      --sidebar-item-hover-bg: var(--ls-gray-800, #1f2937);
      --sidebar-item-active-bg: var(--ls-primary-600, #2563eb);
      --sidebar-item-active-border: var(--ls-primary-400, #60a5fa);

      /* 🏗️ HOST STYLING using design tokens */
      display: block;
      width: var(--sidebar-width); /* Default to full width */
      height: 100%;
      background-color: var(--sidebar-bg);
      color: var(--sidebar-text);

      /* ⏱️ ANIMATION using design tokens */
      transition: all var(--ls-duration-normal, 300ms)
        var(--ls-ease-in-out, cubic-bezier(0.4, 0, 0.2, 1));
      position: relative;

      /* 🔤 TYPOGRAPHY using design tokens */
      font-size: var(--ls-font-size-sm, 0.875rem);
      font-weight: var(--ls-font-weight-medium, 500);
      line-height: var(--ls-line-height-normal, 1.5);

      /* 🌀 BORDER using design tokens */
      border-right: 1px solid var(--sidebar-border);
    }

    /* 🌙 DARK THEME - component responds to global theme */
    :host([data-theme="dark"]) {
      --sidebar-bg: var(--ls-gray-800, #374151);
      --sidebar-text: var(--ls-gray-200, #e5e7eb);
      --sidebar-border: var(--ls-gray-700, #374151);
    }

    :host(.collapsed) {
      width: var(--sidebar-collapsed-width) !important;
      min-width: var(--sidebar-collapsed-width);
      max-width: var(--sidebar-collapsed-width);
      overflow-x: hidden; /* Prevent horizontal scroll */
    }

    .ls-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%; /* Take full width of host */
      overflow: hidden; /* Prevent content overflow when collapsed */
    }

    /* Collapsed state for inner div */
    .ls-sidebar.collapsed {
      /* Don't set width here, let host control it */
    }

    .ls-sidebar-header {
      padding: var(--ls-spacing-xl, 1.5rem);
      border-bottom: 1px solid var(--sidebar-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .ls-sidebar-logo {
      font-size: var(--ls-font-size-2xl, 1.5rem);
      font-weight: var(--ls-font-weight-bold, 700);
      color: var(--sidebar-text);
      text-decoration: none;
    }

    .ls-sidebar-toggle {
      background: none;
      border: none;
      color: var(--sidebar-text-muted);
      cursor: pointer;
      padding: var(--ls-spacing-sm, 0.5rem);
      border-radius: var(--ls-radius-sm, 0.25rem);
      transition: color var(--ls-duration-fast, 150ms)
        var(--ls-ease-in-out, cubic-bezier(0.4, 0, 0.2, 1));
      display: none;
    }

    .ls-sidebar-toggle:hover {
      color: var(--sidebar-text);
    }

    .ls-sidebar-body {
      flex: 1;
      padding: var(--sidebar-padding) 0;
      overflow-y: auto;
      /* Enhanced scrollbar for sidebar */
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .ls-sidebar-body::-webkit-scrollbar {
      width: 6px;
    }

    .ls-sidebar-body::-webkit-scrollbar-track {
      background: transparent;
    }

    .ls-sidebar-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      transition: background-color 0.2s ease;
    }

    .ls-sidebar-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .ls-sidebar-body::-webkit-scrollbar-thumb:active {
      background: rgba(255, 255, 255, 0.4);
    }

    .ls-sidebar-nav {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ls-sidebar-nav-group {
      margin-bottom: 1rem;
    }

    .ls-sidebar-nav-group-title {
      padding: 0.5rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--sidebar-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .ls-sidebar-nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--sidebar-text-muted);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      border-left: 3px solid transparent;
      cursor: pointer;
      gap: 0.75rem;
    }

    .ls-sidebar-nav-item:hover {
      background-color: var(--sidebar-item-hover-bg);
      color: var(--sidebar-text);
    }

    .ls-sidebar-nav-item.active {
      background-color: var(--sidebar-item-active-bg);
      color: #ffffff;
      border-left-color: var(--sidebar-item-active-border);
    }

    .ls-sidebar-nav-icon {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }

    .ls-sidebar-nav-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ls-sidebar-nav-badge {
      background-color: var(--ls-error-500);
      color: white;
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      margin-left: auto;
      flex-shrink: 0;
    }

    .ls-sidebar-submenu {
      background-color: var(--sidebar-item-hover-bg);
      overflow: hidden;
      transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
      max-height: 0;
      opacity: 0;
    }

    .ls-sidebar-submenu.expanded {
      max-height: 500px;
      opacity: 1;
    }

    .ls-sidebar-submenu-item {
      display: block;
      padding: 0.5rem 1.5rem 0.5rem 3.5rem;
      color: var(--sidebar-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    .ls-sidebar-submenu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--sidebar-text);
    }

    .ls-sidebar-submenu-item.active {
      background-color: var(--sidebar-item-active-bg);
      color: #ffffff;
    }

    .ls-sidebar-nav-expand {
      transition: transform 0.2s ease-in-out;
      margin-left: auto;
      flex-shrink: 0;
    }

    .ls-sidebar-nav-expand.expanded {
      transform: rotate(180deg);
    }

    /* Collapsed state */
    :host(.collapsed) .ls-sidebar-nav-text,
    :host(.collapsed) .ls-sidebar-nav-badge,
    :host(.collapsed) .ls-sidebar-logo,
    :host(.collapsed) .ls-sidebar-nav-group-title,
    :host(.collapsed) .ls-sidebar-nav-expand,
    :host(.collapsed) .ls-sidebar-submenu {
      display: none;
    }

    /* Add spacing between nav groups in collapsed state */
    :host(.collapsed) .ls-sidebar-nav-group {
      margin-bottom: 1.5rem;
    }

    /* Ensure sidebar body doesn't overflow in collapsed state */
    :host(.collapsed) .ls-sidebar-body {
      overflow-x: hidden; /* Prevent horizontal scroll */
      width: 100%;
    }

    /* Ensure nav list doesn't overflow */
    :host(.collapsed) .ls-sidebar-nav {
      width: 100%;
      overflow-x: hidden;
    }

    /* Collapsed state nav items - Combined rules */
    :host(.collapsed) .ls-sidebar-nav-item {
      justify-content: center;
      padding: 1rem 0; /* Increased vertical padding for better spacing */
      min-width: var(--sidebar-collapsed-width);
      width: var(--sidebar-collapsed-width); /* Fixed width */
      max-width: var(--sidebar-collapsed-width); /* Prevent expansion */
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem; /* Add space between items */
      box-sizing: border-box; /* Include padding in width calculation */
    }

    /* Show only icons in collapsed state */
    :host(.collapsed) .ls-sidebar-nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%); /* Perfect center */
    }

    /* Collapsed header */
    :host(.collapsed) .ls-sidebar-header {
      padding: var(--ls-spacing-md, 0.75rem) var(--ls-spacing-sm, 0.5rem);
      justify-content: center;
    }

    /* Collapsed toggle button position */
    :host(.collapsed) .ls-sidebar-toggle {
      display: none; /* Hide close button in collapsed mode */
    }

    /* Tooltip for collapsed items */

    :host(.collapsed) .ls-sidebar-nav-item:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--ls-gray-800, #1f2937);
      color: var(--ls-gray-100, #f9fafb);
      padding: 0.5rem 0.75rem;
      border-radius: var(--ls-radius-md, 0.375rem);
      font-size: var(--ls-font-size-sm, 0.875rem);
      white-space: nowrap;
      z-index: 1000;
      margin-left: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      pointer-events: none;
    }

    :host(.collapsed) .ls-sidebar-nav-item:hover::before {
      content: "";
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: var(--ls-gray-800, #1f2937);
      z-index: 1001;
      margin-left: -5px;
      pointer-events: none;
    }

    /* Floating submenu for collapsed state using ls-menu */
    :host(.collapsed) ls-menu.ls-sidebar-floating-submenu {
      position: absolute;
      left: 100%;
      top: 0;
      z-index: 1000;
      margin-left: 0.5rem;
    }

    /* Custom positioning for floating submenu, let ls-menu handle the rest */
    :host(.collapsed) ls-menu.ls-sidebar-floating-submenu .menu-container {
      position: static;
      margin-top: 0;
      min-width: 12rem;
      background-color: var(--ls-gray-800, #1f2937);
      border: 1px solid var(--ls-gray-700, #374151);
    }

    /* Center logo/brand in collapsed state */
    :host(.collapsed) .ls-sidebar-logo {
      text-align: center;
      width: 100%;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      :host {
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        z-index: 50;
      }

      :host(.open) {
        transform: translateX(0);
      }

      .ls-sidebar-toggle {
        display: block;
      }
    }

    /* Desktop styles */
    @media (min-width: 769px) {
      :host {
        position: relative;
        transform: translateX(0);
      }
    }
  `

  constructor() {
    super()
    console.log("Sidebar: Constructor called")
    this._collapsed = false
    this._sidebarOpen = false // For mobile mode
    this.menuItems = []
    this.activeItem = ""
    this.expandedGroups = []
    console.log("Sidebar: Constructor finished, collapsed =", this._collapsed)
  }

  get collapsed() {
    return this._collapsed
  }

  set collapsed(value) {
    console.log(
      "Sidebar: collapsed setter called with value:",
      value,
      "current:",
      this._collapsed
    )
    console.trace("Sidebar: collapsed setter stack trace")
    const oldValue = this._collapsed
    this._collapsed = value
    this.requestUpdate("collapsed", oldValue)
  }

  get sidebarOpen() {
    return this._sidebarOpen
  }

  set sidebarOpen(value) {
    console.log(
      "Sidebar: sidebarOpen setter called with value:",
      value,
      "current:",
      this._sidebarOpen
    )
    const oldValue = this._sidebarOpen
    this._sidebarOpen = value
    this.requestUpdate("sidebarOpen", oldValue)
  }

  static get properties() {
    return {
      collapsed: { type: Boolean, reflect: true },
      sidebarOpen: { type: Boolean, reflect: true },
      menuItems: { type: Array },
      activeItem: { type: String },
      expandedGroups: { type: Array },
    }
  }

  connectedCallback() {
    super.connectedCallback()
    console.log(
      "Sidebar: connectedCallback called, collapsed =",
      this.collapsed
    )
    // Listen for toggle events from navbar
    document.addEventListener(
      "toggle-sidebar",
      this.handleToggleFromNavbar.bind(this)
    )
    console.log("Sidebar: Event listener added")
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // Remove event listener
    document.removeEventListener(
      "toggle-sidebar",
      this.handleToggleFromNavbar.bind(this)
    )
  }

  handleToggleFromNavbar() {
    console.log("Sidebar: Received toggle event from navbar")
    this.toggleCollapse()
  }

  handleSubmenuClick(item) {
    if (this.collapsed) {
      // In collapsed state, don't toggle - let CSS hover handle floating submenu
      console.log("Sidebar: Submenu click in collapsed state, ignoring toggle")
      return
    } else {
      // In expanded state, normal toggle behavior
      this.toggleGroup(item.key)
    }
  }

  showFloatingSubmenu(itemKey) {
    if (this.collapsed) {
      console.log("Sidebar: Showing floating submenu for", itemKey)
      // Add active class to trigger CSS
      const item = this.shadowRoot.querySelector(
        `[data-submenu-key="${itemKey}"]`
      )
      if (item) {
        item.classList.add("floating-active")
        // Show ls-menu using open property with small delay
        setTimeout(() => {
          const menu = item.querySelector("ls-menu.ls-sidebar-floating-submenu")
          if (menu) {
            console.log("Sidebar: Found ls-menu, setting open = true")
            menu.open = true
            // Also try toggle method as backup
            // menu.toggle()
          } else {
            console.log("Sidebar: ls-menu not found!")
          }
        }, 10)
      }
    }
  }

  hideFloatingSubmenu(itemKey) {
    if (this.collapsed) {
      console.log("Sidebar: Hiding floating submenu for", itemKey)

      // Add delay to prevent immediate hide when mouse moves to menu
      setTimeout(() => {
        const item = this.shadowRoot.querySelector(
          `[data-submenu-key="${itemKey}"]`
        )
        if (item) {
          // Check if mouse is over the menu portal
          const portal = document.querySelector(".ls-menu-portal")
          if (portal && portal.matches(":hover")) {
            console.log("Sidebar: Mouse over portal, keeping menu open")
            return
          }

          item.classList.remove("floating-active")
          // Hide ls-menu using open property
          const menu = item.querySelector("ls-menu.ls-sidebar-floating-submenu")
          if (menu) {
            console.log("Sidebar: Found ls-menu, setting open = false")
            menu.open = false
          }
        }
      }, 150) // 150ms delay
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    // Apply collapsed class to host element for CSS targeting
    if (changedProperties.has("collapsed")) {
      console.log("Sidebar: collapsed state changed to:", this.collapsed)
      if (this.collapsed) {
        this.classList.add("collapsed")
        console.log("Sidebar: Added 'collapsed' class to host element")
        console.log("Sidebar: Host classList:", this.classList.toString())
      } else {
        this.classList.remove("collapsed")
        console.log("Sidebar: Removed 'collapsed' class from host element")
        console.log("Sidebar: Host classList:", this.classList.toString())
      }
    }
  }

  toggleCollapse() {
    console.log(
      "Sidebar: toggleCollapse called, current state:",
      this.collapsed
    )
    this.collapsed = !this.collapsed
    console.log("Sidebar: new collapsed state:", this.collapsed)
    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { collapsed: this.collapsed },
        bubbles: true,
      })
    )
  }

  toggleGroup(groupKey) {
    console.log(
      "Toggling group:",
      groupKey,
      "Current expanded:",
      this.expandedGroups
    )
    if (this.expandedGroups.includes(groupKey)) {
      this.expandedGroups = this.expandedGroups.filter((g) => g !== groupKey)
    } else {
      this.expandedGroups = [...this.expandedGroups, groupKey]
    }
    console.log("New expanded groups:", this.expandedGroups)
    this.requestUpdate()
  }

  handleItemClick(item) {
    this.activeItem = item.key
    this.dispatchEvent(
      new CustomEvent("nav-item-click", {
        detail: { item },
        bubbles: true,
      })
    )
  }

  renderIcon(iconName) {
    // Using ls-icon component
    return html`<ls-icon
      name="${iconName}"
      size="1.25rem"
      class="nav-icon"
    ></ls-icon>`
  }

  render() {
    console.log("Rendering sidebar with menuItems:", this.menuItems)

    return html`
      <div class="ls-sidebar">
        <div class="ls-sidebar-header">
          <a href="/" class="ls-sidebar-logo">Lokstra</a>
          <button class="ls-sidebar-toggle" @click="${this.toggleCollapse}">
            <ls-icon name="x" size="1.25rem"></ls-icon>
          </button>
        </div>

        <div class="ls-sidebar-body">
          <ul class="ls-sidebar-nav">
            ${this.menuItems.map(
              (group) => html`
                <li class="ls-sidebar-nav-group">
                  ${group.title
                    ? html`
                        <div class="ls-sidebar-nav-group-title">
                          ${group.title}
                        </div>
                      `
                    : ""}
                  ${group.items.map(
                    (item) => html`
                      ${item.submenu
                        ? html`
                            <!-- Menu with submenu -->
                            <div>
                              <div
                                class="ls-sidebar-nav-item ${this.activeItem ===
                                item.key
                                  ? "active"
                                  : ""}"
                                @click="${() => this.handleSubmenuClick(item)}"
                                @mouseenter="${() =>
                                  this.showFloatingSubmenu(item.key)}"
                                @mouseleave="${() =>
                                  this.hideFloatingSubmenu(item.key)}"
                                data-tooltip="${item.title}"
                                data-has-submenu="true"
                                data-submenu-key="${item.key}"
                              >
                                <ls-icon
                                  name="${item.icon || "folder"}"
                                  size="1.5rem"
                                  class="ls-sidebar-nav-icon"
                                ></ls-icon>
                                <span class="ls-sidebar-nav-text"
                                  >${item.title}</span
                                >
                                ${item.badge
                                  ? html`<span class="ls-sidebar-nav-badge"
                                      >${item.badge}</span
                                    >`
                                  : ""}
                                <ls-icon
                                  name="chevron-down"
                                  size="1rem"
                                  class="ls-sidebar-nav-expand ${this.expandedGroups.includes(
                                    item.key
                                  )
                                    ? "expanded"
                                    : ""}"
                                ></ls-icon>

                                <!-- Floating submenu for collapsed state ONLY -->
                                ${this.collapsed
                                  ? html`
                                      <ls-menu
                                        class="ls-sidebar-floating-submenu"
                                        floating
                                        .items="${item.submenu.map(
                                          (subItem) => ({
                                            key: subItem.key,
                                            label: subItem.title,
                                            href: subItem.url,
                                            badge: subItem.badge,
                                            active:
                                              this.activeItem === subItem.key,
                                            hxGet: subItem.hxGet,
                                            hxTarget: subItem.hxTarget,
                                          })
                                        )}"
                                        @menu-item-click="${(e) =>
                                          this.handleItemClick(e.detail.item)}"
                                      ></ls-menu>
                                    `
                                  : ""}
                              </div>

                              <div
                                class="ls-sidebar-submenu ${this.expandedGroups.includes(
                                  item.key
                                )
                                  ? "expanded"
                                  : ""}"
                              >
                                ${item.submenu.map(
                                  (subItem) => html`
                                    <a
                                      href="${subItem.url}"
                                      class="ls-sidebar-submenu-item ${this
                                        .activeItem === subItem.key
                                        ? "active"
                                        : ""}"
                                      @click="${() =>
                                        this.handleItemClick(subItem)}"
                                      ${subItem.hxGet
                                        ? `hx-get="${subItem.hxGet}"`
                                        : ""}
                                      ${subItem.hxTarget
                                        ? `hx-target="${subItem.hxTarget}"`
                                        : ""}
                                    >
                                      ${subItem.title}
                                      ${subItem.badge
                                        ? html`<span
                                            class="ls-sidebar-nav-badge"
                                            >${subItem.badge}</span
                                          >`
                                        : ""}
                                    </a>
                                  `
                                )}
                              </div>
                            </div>
                          `
                        : html`
                            <!-- Regular menu item -->
                            <a
                              href="${item.url}"
                              class="ls-sidebar-nav-item ${this.activeItem ===
                              item.key
                                ? "active"
                                : ""}"
                              @click="${() => this.handleItemClick(item)}"
                              data-tooltip="${item.title}"
                              ${item.hxGet ? `hx-get="${item.hxGet}"` : ""}
                              ${item.hxTarget
                                ? `hx-target="${item.hxTarget}"`
                                : ""}
                            >
                              <ls-icon
                                name="${item.icon || "circle"}"
                                size="1.5rem"
                                class="ls-sidebar-nav-icon"
                              ></ls-icon>
                              <span class="ls-sidebar-nav-text"
                                >${item.title}</span
                              >
                              ${item.badge
                                ? html`<span class="ls-sidebar-nav-badge"
                                    >${item.badge}</span
                                  >`
                                : ""}
                            </a>
                          `}
                    `
                  )}
                </li>
              `
            )}
          </ul>
        </div>
      </div>
    `
  }
}

// Register the custom element
customElements.define("ls-sidebar", LsSidebar)
