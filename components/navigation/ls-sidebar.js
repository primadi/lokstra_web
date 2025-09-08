import { LitElement, html, css, nothing } from "lit"
import "/components/ui/ls-icon.js"
import "/components/ui/ls-menu.js"

export class LsSidebar extends LitElement {
  static styles = css`
    :host {
      /* 🎯 INTERNAL CSS VARIABLES - Two-layer system for external override */
      --_sidebar-width: var(
        --sidebar-width,
        calc(var(--ls-spacing-2xl) * 8)
      ); /* External: --sidebar-width, Internal: --_sidebar-width */
      --_sidebar-collapsed-width: var(
        --sidebar-collapsed-width,
        var(--ls-size-xl)
      ); /* External: --sidebar-collapsed-width, Internal: --_sidebar-collapsed-width */
      --_sidebar-padding: var(
        --sidebar-padding,
        var(--ls-spacing-lg)
      ); /* External: --sidebar-padding, Internal: --_sidebar-padding */

      /* 🎨 THEMING - Internal variables for external override */
      --_sidebar-bg: var(--sidebar-bg, var(--ls-gray-900));
      --_sidebar-border: var(--sidebar-border, var(--ls-gray-800));
      --_sidebar-text: var(--sidebar-text, var(--ls-gray-100));
      --_sidebar-text-muted: var(--sidebar-text-muted, var(--ls-gray-400));
      --_sidebar-item-hover-bg: var(
        --sidebar-item-hover-bg,
        var(--ls-gray-800)
      );
      --_sidebar-item-active-bg: var(
        --sidebar-item-active-bg,
        var(--ls-primary-600)
      );
      --_sidebar-item-active-border: var(
        --sidebar-item-active-border,
        var(--ls-primary-400)
      );
      --_sidebar-group-title-bg: var(
        --sidebar-group-title-bg,
        var(--ls-gray-800)
      ); /* Slightly lighter than sidebar bg for visual separation */

      /* 🏗️ HOST STYLING using internal variables */
      display: block;
      width: var(--_sidebar-width);
      height: 100%;
      background-color: var(--_sidebar-bg);
      color: var(--_sidebar-text);

      /* ⏱️ ANIMATION using design tokens */
      transition: all var(--ls-duration-normal) var(--ls-ease-in-out);
      position: relative;

      /* 🔤 TYPOGRAPHY using design tokens */
      font-size: var(--ls-font-size-sm);
      font-weight: var(--ls-font-weight-medium);
      line-height: var(--ls-line-height-normal);

      /* 🌀 BORDER using internal variables */
      border-right: 1px solid var(--_sidebar-border);
    }

    :host(.collapsed) {
      width: var(--_sidebar-collapsed-width) !important;
      min-width: var(--_sidebar-collapsed-width);
      max-width: var(--_sidebar-collapsed-width);
      overflow-x: hidden; /* Prevent horizontal scroll */
    }

    .ls-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: var(--_sidebar-width);
      overflow: hidden; /* Prevent content overflow when collapsed */
    }

    /* Collapsed state for inner div */
    .ls-sidebar.collapsed {
      width: var(--_sidebar-collapsed-width); /* Use internal variable */
    }

    .ls-sidebar-header {
      padding: var(--_sidebar-padding);
      border-bottom: 1px solid var(--_sidebar-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .ls-sidebar-logo {
      font-size: var(--ls-font-size-2xl);
      font-weight: var(--ls-font-weight-bold);
      color: var(--_sidebar-text);
      text-decoration: none;
    }

    .ls-sidebar-toggle {
      background: none;
      border: none;
      color: var(--_sidebar-text-muted);
      cursor: pointer;
      padding: var(--ls-spacing-sm);
      border-radius: var(--ls-radius-sm);
      transition: color var(--ls-duration-fast) var(--ls-ease-in-out);
      display: none;
    }

    .ls-sidebar-toggle:hover {
      color: var(--_sidebar-text);
    }

    .ls-sidebar-body {
      flex: 1;
      padding: var(--_sidebar-padding) 0;
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
      padding: 0.75rem 1.5rem 0.5rem 1.5rem; /* Slightly more padding */
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--_sidebar-text-muted);
      background-color: var(--_sidebar-group-title-bg); /* Subtle background */
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
      border-left: 3px solid transparent; /* Consistent with nav items */
      position: relative;
    }

    /* Add subtle visual separator for group titles */
    .ls-sidebar-nav-group-title::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 1.5rem;
      right: 1.5rem;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        var(--_sidebar-border),
        transparent
      );
      opacity: 0.5;
    }

    .ls-sidebar-nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--_sidebar-text-muted);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      border-left: 3px solid transparent;
      cursor: pointer;
      gap: 0.75rem;
    }

    .ls-sidebar-nav-item:hover {
      background-color: var(--_sidebar-item-hover-bg);
      color: var(--_sidebar-text);
    }

    .ls-sidebar-nav-item.active {
      background-color: var(--_sidebar-item-active-bg);
      color: #ffffff;
      border-left-color: var(--_sidebar-item-active-border);
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
      background-color: var(--_sidebar-item-hover-bg);
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
      color: var(--_sidebar-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    .ls-sidebar-submenu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--_sidebar-text);
    }

    .ls-sidebar-submenu-item.active {
      background-color: var(--_sidebar-item-active-bg);
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
      min-width: var(--_sidebar-collapsed-width);
      width: var(--_sidebar-collapsed-width); /* Fixed width */
      max-width: var(--_sidebar-collapsed-width); /* Prevent expansion */
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
      padding: var(--ls-spacing-md) var(--ls-spacing-sm);
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
      background-color: var(--ls-gray-800);
      color: var(--ls-gray-100);
      padding: 0.5rem 0.75rem;
      border-radius: var(--ls-radius-md);
      font-size: var(--ls-font-size-sm);
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
      border-right-color: var(--ls-gray-800);
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
      background-color: var(--ls-gray-800);
      border: 1px solid var(--ls-gray-700);
    }

    /* Center logo/brand in collapsed state */
    :host(.collapsed) .ls-sidebar-logo {
      text-align: center;
      width: 100%;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
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
      activeItem: { type: String, reflect: true },
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

    // Listen for window resize to handle mobile/desktop transitions
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener("resize", this.handleResize)

    console.log("Sidebar: Event listeners added")
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // Remove event listeners
    document.removeEventListener(
      "toggle-sidebar",
      this.handleToggleFromNavbar.bind(this)
    )
    window.removeEventListener("resize", this.handleResize)
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768

    if (!isMobile && this.sidebarOpen) {
      // When switching from mobile to desktop, close mobile sidebar
      console.log("Sidebar: Switching to desktop, closing mobile sidebar")
      const sidebarContainer = document.getElementById("sidebarContainer")
      const mobileOverlay = document.getElementById("mobileOverlay")

      if (sidebarContainer && mobileOverlay) {
        sidebarContainer.classList.remove("open")
        mobileOverlay.classList.remove("show")
      }

      this.sidebarOpen = false
    }
  }

  isMobileMode() {
    return window.innerWidth <= 768
  }

  handleToggleFromNavbar() {
    console.log("Sidebar: Received toggle event from navbar")

    // Check if we're in mobile mode
    const isMobile = this.isMobileMode()

    if (isMobile) {
      // Mobile mode: toggle the external sidebar container and mobile overlay
      console.log("Sidebar: Mobile mode - toggling sidebar container")
      const sidebarContainer = document.getElementById("sidebarContainer")
      const mobileOverlay = document.getElementById("mobileOverlay")

      if (sidebarContainer && mobileOverlay) {
        const isOpen = sidebarContainer.classList.contains("open")

        if (isOpen) {
          // Close mobile sidebar
          sidebarContainer.classList.remove("open")
          mobileOverlay.classList.remove("show")
          this.sidebarOpen = false
        } else {
          // Open mobile sidebar
          sidebarContainer.classList.add("open")
          mobileOverlay.classList.add("show")
          this.sidebarOpen = true
        }

        console.log("Sidebar: Mobile sidebar toggled to:", !isOpen)
      } else {
        console.warn("Sidebar: Mobile elements not found, using fallback")
        // Fallback to component-based toggle
        this.sidebarOpen = !this.sidebarOpen
      }
    } else {
      // Desktop mode: use collapse/expand
      console.log("Sidebar: Desktop mode - toggling collapse")
      this.toggleCollapse()
    }
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

    // Apply open class to host element for mobile CSS targeting
    if (changedProperties.has("sidebarOpen")) {
      console.log("Sidebar: sidebarOpen state changed to:", this.sidebarOpen)
      // Note: Mobile positioning is handled by sidebarContainer in dashboard.css
      // We don't need to add 'open' class to host element anymore
      console.log("Sidebar: Host classList:", this.classList.toString())
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

  handleSidebarToggleClick() {
    console.log("Sidebar: Toggle button clicked")

    if (this.isMobileMode()) {
      // Mobile mode: close the sidebar
      console.log("Sidebar: Mobile mode - closing sidebar")
      const sidebarContainer = document.getElementById("sidebarContainer")
      const mobileOverlay = document.getElementById("mobileOverlay")

      if (sidebarContainer && mobileOverlay) {
        sidebarContainer.classList.remove("open")
        mobileOverlay.classList.remove("show")
        this.sidebarOpen = false
        console.log("Sidebar: Mobile sidebar closed")
      }
    } else {
      // Desktop mode: toggle collapse
      console.log("Sidebar: Desktop mode - toggling collapse")
      this.toggleCollapse()
    }
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
          <button
            class="ls-sidebar-toggle"
            @click="${this.handleSidebarToggleClick}"
          >
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
                                      @click=${() =>
                                        this.handleItemClick(subItem)}
                                      hx-get=${subItem.hxGet || nothing}
                                      hx-target=${subItem.hxTarget || nothing}
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
                              hx-get=${item.hxGet || nothing}
                              hx-target=${item.hxTarget || nothing}
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
