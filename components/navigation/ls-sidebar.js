import { LitElement, html, css } from "lit"
import { createIconsManually } from "/static/js/lucide-utils.js"

export class LsSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--ls-sidebar-bg);
      color: var(--ls-sidebar-text);
      transition: all 0.3s ease-in-out;
      position: relative;
      /* Remove overflow-y and positioning from host, let container handle it */
    }

    :host(.collapsed) {
      width: var(--ls-sidebar-collapsed-width);
    }

    .ls-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ls-sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--ls-sidebar-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .ls-sidebar-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--ls-sidebar-text);
      text-decoration: none;
    }

    .ls-sidebar-toggle {
      background: none;
      border: none;
      color: var(--ls-sidebar-text-muted);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--ls-border-radius-sm);
      transition: color 0.2s ease-in-out;
      display: none;
    }

    .ls-sidebar-toggle:hover {
      color: var(--ls-sidebar-text);
    }

    .ls-sidebar-body {
      flex: 1;
      padding: 1rem 0;
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
      color: var(--ls-sidebar-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .ls-sidebar-nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--ls-sidebar-text-muted);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      border-left: 3px solid transparent;
      cursor: pointer;
      gap: 0.75rem;
    }

    .ls-sidebar-nav-item:hover {
      background-color: var(--ls-sidebar-item-hover-bg);
      color: var(--ls-sidebar-text);
    }

    .ls-sidebar-nav-item.active {
      background-color: var(--ls-sidebar-item-active-bg);
      color: #ffffff;
      border-left-color: var(--ls-sidebar-item-active-border);
    }

    .ls-sidebar-nav-icon {
      width: 1.25rem;
      height: 1.25rem;
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
      background-color: var(--ls-sidebar-item-hover-bg);
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
      color: var(--ls-sidebar-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    .ls-sidebar-submenu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--ls-sidebar-text);
    }

    .ls-sidebar-submenu-item.active {
      background-color: var(--ls-sidebar-item-active-bg);
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
    :host(.collapsed) .ls-sidebar-nav-expand {
      display: none;
    }

    :host(.collapsed) .ls-sidebar-nav-item {
      justify-content: center;
      padding: 0.75rem;
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
    this.collapsed = false
    this.menuItems = []
    this.activeItem = ""
    this.expandedGroups = []
  }

  static get properties() {
    return {
      collapsed: { type: Boolean },
      menuItems: { type: Array },
      activeItem: { type: String },
      expandedGroups: { type: Array },
    }
  }

  connectedCallback() {
    super.connectedCallback()
    // Initialize icons after the component is connected and rendered
    this.updateComplete.then(() => {
      this.initializeLucideIcons()
    })
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    // Re-initialize icons when content changes
    this.initializeLucideIcons()
  }

  initializeLucideIcons() {
    setTimeout(() => {
      createIconsManually(this.shadowRoot)
    }, 50)
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed
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
    // Using Lucide icons
    return html`<i data-lucide="${iconName}" class="nav-icon"></i>`
  }

  render() {
    console.log("Rendering sidebar with menuItems:", this.menuItems)
    return html`
      <div class="ls-sidebar">
        <div class="ls-sidebar-header">
          <a href="/" class="ls-sidebar-logo">Lokstra</a>
          <button class="ls-sidebar-toggle" @click="${this.toggleCollapse}">
            <i data-lucide="x" style="width: 1.25rem; height: 1.25rem;"></i>
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
                                @click="${() => this.toggleGroup(item.key)}"
                              >
                                <i
                                  data-lucide="${item.icon || "folder"}"
                                  class="ls-sidebar-nav-icon"
                                ></i>
                                <span class="ls-sidebar-nav-text"
                                  >${item.title}</span
                                >
                                ${item.badge
                                  ? html`<span class="ls-sidebar-nav-badge"
                                      >${item.badge}</span
                                    >`
                                  : ""}
                                <i
                                  data-lucide="chevron-down"
                                  class="ls-sidebar-nav-expand ${this.expandedGroups.includes(
                                    item.key
                                  )
                                    ? "expanded"
                                    : ""}"
                                  style="width: 1rem; height: 1rem;"
                                ></i>
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
                              ${item.hxGet ? `hx-get="${item.hxGet}"` : ""}
                              ${item.hxTarget
                                ? `hx-target="${item.hxTarget}"`
                                : ""}
                            >
                              <i
                                data-lucide="${item.icon || "circle"}"
                                class="ls-sidebar-nav-icon"
                              ></i>
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
