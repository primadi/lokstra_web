import { LitElement, html, css } from "lit";

export class LsLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--ls-gray-50);
    }

    .hs-layout-container {
      display: flex;
      min-height: 100vh;
    }

    .hs-layout-sidebar {
      flex-shrink: 0;
    }

    .hs-layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    .hs-layout-header {
      flex-shrink: 0;
    }

    .hs-layout-content {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }

    .hs-layout-content-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .hs-layout-breadcrumb {
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--ls-gray-600);
    }

    .hs-layout-breadcrumb-item {
      color: var(--ls-gray-600);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      padding: 0.25rem 0.5rem;
      border-radius: var(--ls-border-radius);
    }

    .hs-layout-breadcrumb-item:hover {
      color: var(--ls-gray-900);
      background-color: var(--ls-gray-100);
    }

    .hs-layout-breadcrumb-item.active {
      color: var(--ls-gray-900);
      font-weight: 500;
    }

    .hs-layout-breadcrumb-separator {
      color: var(--ls-gray-400);
    }

    .hs-layout-page-header {
      margin-bottom: 2rem;
    }

    .hs-layout-page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--ls-gray-900);
      margin-bottom: 0.5rem;
    }

    .hs-layout-page-subtitle {
      color: var(--ls-gray-600);
      font-size: 1rem;
      line-height: 1.5;
    }

    .hs-layout-page-actions {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .hs-layout-footer {
      margin-top: 2rem;
      padding: 1.5rem;
      border-top: 1px solid var(--ls-gray-200);
      background-color: var(--ls-card-bg);
      text-align: center;
      color: var(--ls-gray-600);
      font-size: 0.875rem;
    }

    .hs-layout-mobile-toggle {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1000;
      padding: 0.75rem;
      background-color: var(--ls-primary-600);
      color: white;
      border: none;
      border-radius: 50%;
      box-shadow: var(--ls-shadow-lg);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .hs-layout-mobile-toggle:hover {
      background-color: var(--ls-primary-700);
      transform: scale(1.05);
    }

    .hs-layout-mobile-toggle:active {
      transform: scale(0.95);
    }

    /* Responsive */
    @media (max-width: 767px) {
      .hs-layout-content {
        padding: 1rem;
      }

      .hs-layout-page-title {
        font-size: 1.5rem;
      }

      .hs-layout-page-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .hs-layout-breadcrumb {
        flex-wrap: wrap;
      }
    }

    @media (min-width: 768px) {
      .hs-layout-mobile-toggle {
        display: none;
      }
    }

    /* Dark theme */
    :host(.theme-dark) {
      background-color: var(--ls-gray-900);
    }

    :host(.theme-dark) .hs-layout-page-title {
      color: var(--ls-gray-100);
    }

    :host(.theme-dark) .hs-layout-page-subtitle {
      color: var(--ls-gray-400);
    }

    :host(.theme-dark) .hs-layout-footer {
      background-color: var(--ls-gray-800);
      border-color: var(--ls-gray-700);
      color: var(--ls-gray-400);
    }

    :host(.theme-dark) .hs-layout-breadcrumb-item {
      color: var(--ls-gray-400);
    }

    :host(.theme-dark) .hs-layout-breadcrumb-item:hover {
      color: var(--ls-gray-100);
      background-color: var(--ls-gray-700);
    }

    :host(.theme-dark) .hs-layout-breadcrumb-item.active {
      color: var(--ls-gray-100);
    }
  `;

  constructor() {
    super();
    this.pageTitle = "";
    this.pageSubtitle = "";
    this.showBreadcrumb = true;
    this.showFooter = true;
    this.footerText = "© 2024 Lokstra Framework. All rights reserved.";
    this.breadcrumb = [];
    this.pageActions = [];
    this.sidebarOpen = false;
    this.maxWidth = "1200px";
  }

  static get properties() {
    return {
      pageTitle: { type: String },
      pageSubtitle: { type: String },
      showBreadcrumb: { type: Boolean },
      showFooter: { type: Boolean },
      footerText: { type: String },
      breadcrumb: { type: Array },
      pageActions: { type: Array },
      sidebarOpen: { type: Boolean, state: true },
      maxWidth: { type: String },
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("maxWidth")) {
      this.style.setProperty("--layout-max-width", this.maxWidth);
    }

    // Icons will be initialized globally by dashboard.html
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { open: this.sidebarOpen },
        bubbles: true,
      })
    );
  }

  handleBreadcrumbClick(item, index) {
    this.dispatchEvent(
      new CustomEvent("breadcrumb-click", {
        detail: { item, index },
        bubbles: true,
      })
    );

    // Handle HTMX navigation
    if (item.hxGet || item.hxPost) {
      const url = item.hxGet || item.hxPost;
      const method = item.hxGet ? "GET" : "POST";

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, url, {
          target: item.hxTarget || "body",
        });
      }
    }
  }

  handlePageAction(action) {
    this.dispatchEvent(
      new CustomEvent("page-action", {
        detail: { action },
        bubbles: true,
      })
    );

    // Handle confirmation
    if (action.confirm && !confirm(action.confirm)) {
      return;
    }

    // Handle HTMX actions
    if (action.hxGet || action.hxPost) {
      const url = action.hxGet || action.hxPost;
      const method = action.hxGet ? "GET" : "POST";

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, url, {
          target: action.hxTarget || "body",
        });
      }
    }
  }

  render() {
    return html`
      <div class="hs-layout-container">
        <!-- Sidebar slot -->
        <div class="hs-layout-sidebar">
          <slot name="sidebar"></slot>
        </div>

        <!-- Main content area -->
        <div class="hs-layout-main">
          <!-- Header/Navbar slot -->
          <div class="hs-layout-header">
            <slot name="header"></slot>
          </div>

          <!-- Content -->
          <div class="hs-layout-content">
            <div
              class="hs-layout-content-container"
              style="max-width: ${this.maxWidth};"
            >
              <!-- Breadcrumb -->
              ${this.showBreadcrumb &&
              this.breadcrumb &&
              this.breadcrumb.length > 0
                ? html`
                    <nav class="hs-layout-breadcrumb">
                      ${this.breadcrumb.map(
                        (item, index) => html`
                          ${index > 0
                            ? html`
                                <span class="hs-layout-breadcrumb-separator">
                                  <i
                                    data-lucide="chevron-right"
                                    style="width: 1rem; height: 1rem;"
                                  ></i>
                                </span>
                              `
                            : ""}
                          ${item.url
                            ? html`
                                <a
                                  href="${item.url}"
                                  class="hs-layout-breadcrumb-item ${item.active
                                    ? "active"
                                    : ""}"
                                  @click="${(e) => {
                                    e.preventDefault();
                                    this.handleBreadcrumbClick(item, index);
                                  }}"
                                >
                                  ${item.title}
                                </a>
                              `
                            : html`
                                <span class="hs-layout-breadcrumb-item active">
                                  ${item.title}
                                </span>
                              `}
                        `
                      )}
                    </nav>
                  `
                : ""}

              <!-- Page header -->
              ${this.pageTitle
                ? html`
                    <div class="hs-layout-page-header">
                      <h1 class="hs-layout-page-title">${this.pageTitle}</h1>
                      ${this.pageSubtitle
                        ? html`
                            <p class="hs-layout-page-subtitle">
                              ${this.pageSubtitle}
                            </p>
                          `
                        : ""}
                      ${this.pageActions && this.pageActions.length > 0
                        ? html`
                            <div class="hs-layout-page-actions">
                              ${this.pageActions.map(
                                (action) => html`
                                  ${action.type === "button"
                                    ? html`
                                        <ls-button
                                          text="${action.text}"
                                          variant="${action.variant ||
                                          "primary"}"
                                          size="${action.size || "md"}"
                                          icon="${action.icon || ""}"
                                          ?disabled="${action.disabled}"
                                          @click="${() =>
                                            this.handlePageAction(action)}"
                                        ></ls-button>
                                      `
                                    : html`
                                        <a
                                          href="${action.url}"
                                          class="text-blue-600 hover:text-blue-800 underline"
                                          @click="${(e) => {
                                            e.preventDefault();
                                            this.handlePageAction(action);
                                          }}"
                                        >
                                          ${action.text}
                                        </a>
                                      `}
                                `
                              )}
                            </div>
                          `
                        : ""}
                    </div>
                  `
                : ""}

              <!-- Main content slot -->
              <div class="hs-layout-main-content">
                <slot></slot>
              </div>
            </div>
          </div>

          <!-- Footer -->
          ${this.showFooter
            ? html`
                <div class="hs-layout-footer">
                  <slot name="footer"> ${this.footerText} </slot>
                </div>
              `
            : ""}
        </div>
      </div>

      <!-- Mobile sidebar toggle -->
      <button
        class="hs-layout-mobile-toggle"
        @click="${this.toggleSidebar}"
        style="display: ${this.sidebarOpen ? "none" : "block"};"
        title="Toggle sidebar"
      >
        <i data-lucide="menu" style="width: 1.5rem; height: 1.5rem;"></i>
      </button>
    `;
  }
}

customElements.define("ls-layout", LsLayout);
