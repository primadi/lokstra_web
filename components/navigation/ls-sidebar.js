import { LitElement, html, css } from "lit";

export class LsSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: var(--ls-sidebar-width);
      height: 100vh;
      background-color: var(--ls-sidebar-bg);
      color: var(--ls-sidebar-text);
      border-right: 1px solid var(--ls-sidebar-border);
      transition: all 0.3s ease-in-out;
      position: relative;
      z-index: 40;
      overflow-y: auto;
    }

    :host(.collapsed) {
      width: var(--ls-sidebar-collapsed-width);
    }

    .hs-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .hs-sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--ls-sidebar-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .hs-sidebar-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--ls-sidebar-text);
      text-decoration: none;
    }

    .hs-sidebar-toggle {
      background: none;
      border: none;
      color: var(--ls-sidebar-text-muted);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--ls-border-radius-sm);
      transition: color 0.2s ease-in-out;
      display: none;
    }

    .hs-sidebar-toggle:hover {
      color: var(--ls-sidebar-text);
    }

    .hs-sidebar-body {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }

    .hs-sidebar-nav {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .hs-sidebar-nav-group {
      margin-bottom: 1rem;
    }

    .hs-sidebar-nav-group-title {
      padding: 0.5rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ls-sidebar-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .hs-sidebar-nav-item {
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

    .hs-sidebar-nav-item:hover {
      background-color: var(--ls-sidebar-item-hover-bg);
      color: var(--ls-sidebar-text);
    }

    .hs-sidebar-nav-item.active {
      background-color: var(--ls-sidebar-item-active-bg);
      color: #ffffff;
      border-left-color: var(--ls-sidebar-item-active-border);
    }

    .hs-sidebar-nav-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .hs-sidebar-nav-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hs-sidebar-nav-badge {
      background-color: var(--ls-error-500);
      color: white;
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      margin-left: auto;
      flex-shrink: 0;
    }

    .hs-sidebar-submenu {
      background-color: var(--ls-sidebar-item-hover-bg);
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      max-height: 0;
    }

    .hs-sidebar-submenu.expanded {
      max-height: 500px;
    }

    .hs-sidebar-submenu-item {
      display: block;
      padding: 0.5rem 1.5rem 0.5rem 3.5rem;
      color: var(--ls-sidebar-text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease-in-out;
    }

    .hs-sidebar-submenu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--ls-sidebar-text);
    }

    .hs-sidebar-submenu-item.active {
      background-color: var(--ls-sidebar-item-active-bg);
      color: #ffffff;
    }

    .hs-sidebar-nav-expand {
      transition: transform 0.2s ease-in-out;
      margin-left: auto;
      flex-shrink: 0;
    }

    .hs-sidebar-nav-expand.expanded {
      transform: rotate(180deg);
    }

    /* Collapsed state */
    :host(.collapsed) .hs-sidebar-nav-text,
    :host(.collapsed) .hs-sidebar-nav-badge,
    :host(.collapsed) .hs-sidebar-logo,
    :host(.collapsed) .hs-sidebar-nav-group-title,
    :host(.collapsed) .hs-sidebar-nav-expand {
      display: none;
    }

    :host(.collapsed) .hs-sidebar-nav-item {
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

      .hs-sidebar-toggle {
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
  `;

  constructor() {
    super();
    this.collapsed = false;
    this.menuItems = [];
    this.activeItem = "";
    this.expandedGroups = [];
  }

  static get properties() {
    return {
      collapsed: { type: Boolean },
      menuItems: { type: Array },
      activeItem: { type: String },
      expandedGroups: { type: Array },
    };
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { collapsed: this.collapsed },
        bubbles: true,
      })
    );
  }

  toggleGroup(groupKey) {
    if (this.expandedGroups.includes(groupKey)) {
      this.expandedGroups = this.expandedGroups.filter((g) => g !== groupKey);
    } else {
      this.expandedGroups = [...this.expandedGroups, groupKey];
    }
  }

  handleItemClick(item) {
    this.activeItem = item.key;
    this.dispatchEvent(
      new CustomEvent("nav-item-click", {
        detail: { item },
        bubbles: true,
      })
    );
  }

  renderIcon(iconName) {
    // Using Lucide icons
    return html`<i data-lucide="${iconName}" class="nav-icon"></i>`;
  }

  render() {
    return html`
      <div class="hs-sidebar">
        <div class="hs-sidebar-header">
          <a href="/" class="hs-sidebar-logo">Lokstra</a>
          <button class="hs-sidebar-toggle" @click="${this.toggleCollapse}">
            <i data-lucide="x" style="width: 1.25rem; height: 1.25rem;"></i>
          </button>
        </div>

        <div class="hs-sidebar-body">
          <ul class="hs-sidebar-nav">
            ${this.menuItems.map(
              (group) => html`
                <li class="hs-sidebar-nav-group">
                  ${group.title
                    ? html`
                        <div class="hs-sidebar-nav-group-title">
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
                                class="hs-sidebar-nav-item ${this.activeItem ===
                                item.key
                                  ? "active"
                                  : ""}"
                                @click="${() => this.toggleGroup(item.key)}"
                              >
                                <i
                                  data-lucide="${item.icon || "folder"}"
                                  class="hs-sidebar-nav-icon"
                                ></i>
                                <span class="hs-sidebar-nav-text"
                                  >${item.title}</span
                                >
                                ${item.badge
                                  ? html`<span class="hs-sidebar-nav-badge"
                                      >${item.badge}</span
                                    >`
                                  : ""}
                                <i
                                  data-lucide="chevron-down"
                                  class="hs-sidebar-nav-expand ${this.expandedGroups.includes(
                                    item.key
                                  )
                                    ? "expanded"
                                    : ""}"
                                  style="width: 1rem; height: 1rem;"
                                ></i>
                              </div>

                              <div
                                class="hs-sidebar-submenu ${this.expandedGroups.includes(
                                  item.key
                                )
                                  ? "expanded"
                                  : ""}"
                              >
                                ${item.submenu.map(
                                  (subItem) => html`
                                    <a
                                      href="${subItem.url}"
                                      class="hs-sidebar-submenu-item ${this
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
                                            class="hs-sidebar-nav-badge"
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
                              class="hs-sidebar-nav-item ${this.activeItem ===
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
                                class="hs-sidebar-nav-icon"
                              ></i>
                              <span class="hs-sidebar-nav-text"
                                >${item.title}</span
                              >
                              ${item.badge
                                ? html`<span class="hs-sidebar-nav-badge"
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
    `;
  }
}
