import { LitElement, html, css } from "lit"

export class LsCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .hs-card {
      background-color: var(--ls-card-bg);
      border-radius: var(--ls-border-radius-xl);
      box-shadow: var(--ls-shadow-sm);
      border: 1px solid var(--ls-gray-200);
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    .hs-card:hover {
      box-shadow: var(--ls-shadow-md);
    }

    .hs-card.interactive {
      cursor: pointer;
    }

    .hs-card.interactive:hover {
      transform: translateY(-1px);
      box-shadow: var(--ls-shadow-lg);
    }

    /* Card sizes */
    .hs-card.sm {
      padding: 1rem;
    }

    .hs-card.md {
      padding: 1.5rem;
    }

    .hs-card.lg {
      padding: 2rem;
    }

    /* Card variants */
    .hs-card.outlined {
      border: 2px solid var(--ls-gray-200);
      box-shadow: none;
    }

    .hs-card.elevated {
      box-shadow: var(--ls-shadow-xl);
    }

    .hs-card.flat {
      box-shadow: none;
      border: none;
    }

    /* Card header */
    .hs-card-header {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--ls-gray-100);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .hs-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ls-gray-900);
      margin: 0;
    }

    .hs-card-subtitle {
      font-size: 0.875rem;
      color: var(--ls-gray-600);
      margin: 0.25rem 0 0 0;
    }

    .hs-card-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .hs-card-action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--ls-border-radius);
      color: var(--ls-gray-500);
      transition: all 0.2s ease-in-out;
    }

    .hs-card-action-btn:hover {
      background-color: var(--ls-gray-100);
      color: var(--ls-gray-700);
    }

    /* Card body */
    .hs-card-body {
      color: var(--ls-gray-700);
      line-height: 1.6;
    }

    .hs-card-body ::slotted(p:last-child) {
      margin-bottom: 0;
    }

    /* Card footer */
    .hs-card-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--ls-gray-100);
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    }

    .hs-card-footer.center {
      justify-content: center;
    }

    .hs-card-footer.left {
      justify-content: flex-start;
    }

    .hs-card-footer.right {
      justify-content: flex-end;
    }

    /* Card image */
    .hs-card-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .hs-card-image.rounded {
      border-radius: var(--ls-border-radius-lg);
    }

    /* Status indicators */
    .hs-card-status {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      z-index: 10;
    }

    .hs-card-status.active {
      background-color: var(--ls-success-500);
    }

    .hs-card-status.inactive {
      background-color: var(--ls-error-500);
    }

    .hs-card-status.pending {
      background-color: var(--ls-warning-500);
    }

    /* Expandable card */
    .hs-card-expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--ls-border-radius);
      color: var(--ls-gray-500);
      transition: all 0.2s ease-in-out;
    }

    .hs-card-expand-btn:hover {
      color: var(--ls-gray-700);
    }

    .hs-card-expand-icon {
      transition: transform 0.2s ease-in-out;
    }

    .hs-card-expand-icon.expanded {
      transform: rotate(180deg);
    }

    .hs-card-expandable-content {
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      max-height: 0;
      opacity: 0;
    }

    .hs-card-expandable-content.expanded {
      max-height: 500px;
      opacity: 1;
    }

    /* Loading state */
    .hs-card.loading {
      opacity: 0.7;
      pointer-events: none;
    }

    .hs-card-skeleton {
      background: linear-gradient(
        90deg,
        var(--ls-gray-100) 25%,
        var(--ls-gray-200) 50%,
        var(--ls-gray-100) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--ls-border-radius);
      height: 1rem;
      margin-bottom: 0.5rem;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .hs-card.lg {
        padding: 1.5rem;
      }

      .hs-card-footer {
        flex-direction: column;
        gap: 0.5rem;
        align-items: stretch;
      }

      .hs-card-actions {
        flex-wrap: wrap;
      }
    }

    /* Theme-aware styling using CSS custom properties */
    .hs-card {
      background-color: var(--ls-bg-primary);
      border-color: var(--ls-border-primary);
    }

    .hs-card-title {
      color: var(--ls-text-primary);
    }

    .hs-card-body {
      color: var(--ls-text-secondary);
    }

    .hs-card-header {
      border-color: var(--ls-border-primary);
    }

    .hs-card-footer {
      border-color: var(--ls-border-primary);
    }
  `

  constructor() {
    super()
    this.variant = "default"
    this.size = "md"
    this.title = ""
    this.subtitle = ""
    this.interactive = false
    this.loading = false
    this.expanded = false
    this.expandable = false
    this.status = ""
    this.imageSrc = ""
    this.imageAlt = ""
    this.showHeader = true
    this.showFooter = false
    this.footerAlign = "right"
    this.actions = []
  }

  static get properties() {
    return {
      variant: { type: String },
      size: { type: String },
      title: { type: String },
      subtitle: { type: String },
      interactive: { type: Boolean },
      loading: { type: Boolean },
      expanded: { type: Boolean, state: true },
      expandable: { type: Boolean },
      status: { type: String },
      imageSrc: { type: String },
      imageAlt: { type: String },
      showHeader: { type: Boolean },
      showFooter: { type: Boolean },
      footerAlign: { type: String },
      actions: { type: Array },
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties)

    // Icons will be initialized globally by dashboard.html
  }

  handleClick() {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent("card-click", {
          detail: { title: this.title, variant: this.variant },
          bubbles: true,
        })
      )
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded
    this.dispatchEvent(
      new CustomEvent("card-toggle", {
        detail: { expanded: this.expanded, title: this.title },
        bubbles: true,
      })
    )
  }

  handleAction(action) {
    this.dispatchEvent(
      new CustomEvent("card-action", {
        detail: { action, title: this.title },
        bubbles: true,
      })
    )

    // Handle confirmation
    if (action.confirm && !confirm(action.confirm)) {
      return
    }

    // Handle HTMX actions
    if (action.hxGet || action.hxPost) {
      const url = action.hxGet || action.hxPost
      const method = action.hxGet ? "GET" : "POST"

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, url, {
          target: action.hxTarget,
        })
      }
    }
  }

  renderSkeletonLoader() {
    return html`
      <div class="hs-card ${this.variant} ${this.size} loading">
        ${this.showHeader
          ? html`
              <div class="hs-card-header">
                <div style="flex: 1;">
                  <div
                    class="hs-card-skeleton"
                    style="width: 60%; height: 1.25rem;"
                  ></div>
                  <div
                    class="hs-card-skeleton"
                    style="width: 40%; height: 1rem; margin-top: 0.25rem;"
                  ></div>
                </div>
              </div>
            `
          : ""}

        <div class="hs-card-body">
          <div class="hs-card-skeleton" style="width: 100%;"></div>
          <div class="hs-card-skeleton" style="width: 80%;"></div>
          <div class="hs-card-skeleton" style="width: 90%;"></div>
        </div>
      </div>
    `
  }

  render() {
    if (this.loading) {
      return this.renderSkeletonLoader()
    }

    return html`
      <div
        class="hs-card ${this.variant} ${this.size} ${this.interactive
          ? "interactive"
          : ""}"
        @click="${this.handleClick}"
      >
        <!-- Status indicator -->
        ${this.status
          ? html` <div class="hs-card-status ${this.status}"></div> `
          : ""}

        <!-- Card image -->
        ${this.imageSrc
          ? html`
              <img
                src="${this.imageSrc}"
                alt="${this.imageAlt}"
                class="hs-card-image rounded"
                loading="lazy"
              />
            `
          : ""}

        <!-- Card header -->
        ${this.showHeader &&
        (this.title ||
          this.subtitle ||
          this.expandable ||
          this.actions.length > 0)
          ? html`
              <div class="hs-card-header">
                <div>
                  ${this.title
                    ? html` <h3 class="hs-card-title">${this.title}</h3> `
                    : ""}
                  ${this.subtitle
                    ? html` <p class="hs-card-subtitle">${this.subtitle}</p> `
                    : ""}
                </div>

                <div class="hs-card-actions">
                  ${this.expandable
                    ? html`
                        <button
                          class="hs-card-expand-btn"
                          @click="${this.toggleExpanded}"
                          type="button"
                        >
                          <i
                            data-lucide="chevron-down"
                            class="hs-card-expand-icon ${this.expanded
                              ? "expanded"
                              : ""}"
                            style="width: 1.25rem; height: 1.25rem;"
                          ></i>
                        </button>
                      `
                    : ""}
                  ${this.actions.map(
                    (action) => html`
                      <button
                        class="hs-card-action-btn"
                        type="button"
                        title="${action.title}"
                        @click="${(e) => {
                          e.stopPropagation()
                          this.handleAction(action)
                        }}"
                      >
                        ${action.icon
                          ? html`
                              <i
                                data-lucide="${action.icon}"
                                style="width: 1.25rem; height: 1.25rem;"
                              ></i>
                            `
                          : action.title}
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          : ""}

        <!-- Card body -->
        <div class="hs-card-body">
          <slot></slot>
        </div>

        <!-- Expandable content -->
        ${this.expandable
          ? html`
              <div
                class="hs-card-expandable-content ${this.expanded
                  ? "expanded"
                  : ""}"
              >
                <div class="hs-card-body">
                  <slot name="expandable"></slot>
                </div>
              </div>
            `
          : ""}

        <!-- Card footer -->
        ${this.showFooter
          ? html`
              <div class="hs-card-footer ${this.footerAlign}">
                <slot name="footer-left"></slot>
                <slot name="footer"></slot>
                <slot name="footer-right"></slot>
              </div>
            `
          : ""}
      </div>
    `
  }
}

customElements.define("ls-card", LsCard)
