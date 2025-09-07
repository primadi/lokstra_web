import { LitElement, html, css } from "lit";

export class LsAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    :host([hidden]) {
      display: none !important;
    }

    .hs-alert {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: var(--ls-border-radius-lg);
      border: 1px solid;
      transition: all 0.3s ease-in-out;
      position: relative;
      overflow: hidden;
    }

    .hs-alert-icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
    }

    .hs-alert-content {
      flex: 1;
      min-width: 0;
    }

    .hs-alert-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }

    .hs-alert-message {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .hs-alert-actions {
      margin-top: 0.75rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .hs-alert-action-btn {
      font-size: 0.75rem;
      text-decoration: underline;
      background: none;
      border: none;
      cursor: pointer;
      color: currentColor;
      padding: 0.25rem 0.5rem;
      border-radius: var(--ls-border-radius);
      transition: all 0.15s ease-in-out;
    }

    .hs-alert-action-btn:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .hs-alert-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--ls-border-radius);
      transition: background-color 0.2s ease-in-out;
      flex-shrink: 0;
      color: currentColor;
    }

    .hs-alert-close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    /* Alert variants */
    .hs-alert.info {
      background-color: var(--ls-info-100);
      border-color: var(--ls-info-300);
      color: var(--ls-info-700);
    }

    .hs-alert.success {
      background-color: var(--ls-success-100);
      border-color: var(--ls-success-300);
      color: var(--ls-success-700);
    }

    .hs-alert.warning {
      background-color: var(--ls-warning-100);
      border-color: var(--ls-warning-300);
      color: var(--ls-warning-700);
    }

    .hs-alert.error {
      background-color: var(--ls-error-100);
      border-color: var(--ls-error-300);
      color: var(--ls-error-700);
    }

    /* Alert sizes */
    .hs-alert.sm {
      padding: 0.75rem;
    }

    .hs-alert.sm .hs-alert-icon {
      width: 1rem;
      height: 1rem;
    }

    .hs-alert.sm .hs-alert-title,
    .hs-alert.sm .hs-alert-message {
      font-size: 0.75rem;
    }

    .hs-alert.lg {
      padding: 1.5rem;
    }

    .hs-alert.lg .hs-alert-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .hs-alert.lg .hs-alert-title {
      font-size: 1rem;
    }

    .hs-alert.lg .hs-alert-message {
      font-size: 1rem;
    }

    /* Progress bar for auto-hide */
    .hs-alert-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: currentColor;
      opacity: 0.3;
      animation: progressShrink var(--duration, 5s) linear;
    }

    @keyframes progressShrink {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    /* Slide in animation */
    :host(.animate-in) .hs-alert {
      animation: alertSlideIn 0.3s ease-out;
    }

    @keyframes alertSlideIn {
      from {
        opacity: 0;
        transform: translateY(-1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Dark theme */
    :host(.theme-dark) .hs-alert.info {
      background-color: var(--ls-info-900);
      border-color: var(--ls-info-600);
      color: var(--ls-info-100);
    }

    :host(.theme-dark) .hs-alert.success {
      background-color: var(--ls-success-900);
      border-color: var(--ls-success-600);
      color: var(--ls-success-100);
    }

    :host(.theme-dark) .hs-alert.warning {
      background-color: var(--ls-warning-900);
      border-color: var(--ls-warning-600);
      color: var(--ls-warning-100);
    }

    :host(.theme-dark) .hs-alert.error {
      background-color: var(--ls-error-900);
      border-color: var(--ls-error-600);
      color: var(--ls-error-100);
    }
  `;

  constructor() {
    super();
    this.variant = "info";
    this.size = "md";
    this.title = "";
    this.message = "";
    this.dismissible = true;
    this.autoHide = false;
    this.autoHideDuration = 5000;
    this.icon = "";
    this.actions = [];
    this.show = true;
    this.animateIn = false;
  }

  static get properties() {
    return {
      variant: { type: String },
      size: { type: String },
      title: { type: String },
      message: { type: String },
      dismissible: { type: Boolean },
      autoHide: { type: Boolean },
      autoHideDuration: { type: Number },
      icon: { type: String },
      actions: { type: Array },
      show: { type: Boolean, state: true },
      animateIn: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.autoHide) {
      setTimeout(() => {
        this.hide();
      }, this.autoHideDuration);
    }

    if (this.animateIn) {
      this.classList.add("animate-in");
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Icons will be initialized globally by dashboard.html
  }

  hide() {
    this.show = false;
    this.dispatchEvent(
      new CustomEvent("alert-dismissed", {
        detail: {
          variant: this.variant,
          title: this.title,
          message: this.message,
        },
        bubbles: true,
      })
    );
  }

  handleAction(action) {
    this.dispatchEvent(
      new CustomEvent("alert-action", {
        detail: { action, variant: this.variant },
        bubbles: true,
      })
    );

    // Handle HTMX actions
    if (action.hxGet || action.hxPost) {
      const url = action.hxGet || action.hxPost;
      const method = action.hxGet ? "GET" : "POST";

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, url, {
          target: action.hxTarget,
        });
      }
    }

    // Auto-dismiss after action if specified
    if (action.autoDismiss !== false) {
      this.hide();
    }
  }

  getVariantIcon() {
    if (this.icon) {
      return this.icon;
    }

    const icons = {
      info: "info",
      success: "check-circle",
      warning: "alert-triangle",
      error: "x-circle",
    };

    return icons[this.variant] || "info";
  }

  render() {
    if (!this.show) {
      return html``;
    }

    return html`
      <div class="hs-alert ${this.variant} ${this.size}">
        <!-- Alert icon -->
        <div class="hs-alert-icon">
          <i data-lucide="${this.getVariantIcon()}"></i>
        </div>

        <!-- Alert content -->
        <div class="hs-alert-content">
          ${this.title
            ? html` <div class="hs-alert-title">${this.title}</div> `
            : ""}

          <div class="hs-alert-message">${this.message}</div>

          ${this.actions && this.actions.length > 0
            ? html`
                <div class="hs-alert-actions">
                  ${this.actions.map(
                    (action) => html`
                      <button
                        type="button"
                        class="hs-alert-action-btn"
                        @click="${() => this.handleAction(action)}"
                      >
                        ${action.text}
                      </button>
                    `
                  )}
                </div>
              `
            : ""}
        </div>

        <!-- Close button -->
        ${this.dismissible
          ? html`
              <button
                class="hs-alert-close"
                @click="${this.hide}"
                type="button"
              >
                <i data-lucide="x" style="width: 1rem; height: 1rem;"></i>
              </button>
            `
          : ""}

        <!-- Progress bar for auto-hide -->
        ${this.autoHide
          ? html`
              <div
                class="hs-alert-progress"
                style="--duration: ${this.autoHideDuration}ms;"
              ></div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("ls-alert", LsAlert);
