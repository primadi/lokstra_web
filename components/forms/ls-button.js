import { LitElement, html, css, nothing } from "lit";

export class LsButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .ls-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: var(--ls-btn-padding-y) var(--ls-btn-padding-x);
      font-size: var(--ls-btn-font-size);
      font-weight: var(--ls-btn-font-weight);
      line-height: 1.25;
      border-radius: var(--ls-btn-border-radius);
      border: 1px solid transparent;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease-in-out;
      position: relative;
      overflow: hidden;
    }

    .ls-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Size variants */
    .ls-btn-sm {
      --ls-btn-padding-y: 0.375rem;
      --ls-btn-padding-x: 0.75rem;
      --ls-btn-font-size: 0.75rem;
    }

    .ls-btn-lg {
      --ls-btn-padding-y: 0.75rem;
      --ls-btn-padding-x: 1.5rem;
      --ls-btn-font-size: 1rem;
    }

    /* Color variants */
    .ls-btn-primary {
      color: var(--ls-btn-primary-color);
      background-color: var(--ls-btn-primary-bg);
      border-color: var(--ls-btn-primary-border);
    }

    .ls-btn-primary:hover:not(:disabled) {
      background-color: var(--ls-btn-primary-hover-bg);
      border-color: var(--ls-btn-primary-hover-border);
    }

    .ls-btn-secondary {
      color: var(--ls-btn-secondary-color);
      background-color: var(--ls-btn-secondary-bg);
      border-color: var(--ls-btn-secondary-border);
    }

    .ls-btn-secondary:hover:not(:disabled) {
      background-color: var(--ls-btn-secondary-hover-bg);
      border-color: var(--ls-btn-secondary-hover-border);
    }

    .ls-btn-outline {
      color: var(--ls-btn-outline-color);
      background-color: var(--ls-btn-outline-bg);
      border-color: var(--ls-btn-outline-border);
    }

    .ls-btn-outline:hover:not(:disabled) {
      background-color: var(--ls-btn-outline-hover-bg);
      border-color: var(--ls-btn-outline-hover-border);
    }

    .ls-btn-danger {
      color: var(--ls-btn-danger-color);
      background-color: var(--ls-btn-danger-bg);
      border-color: var(--ls-btn-danger-border);
    }

    .ls-btn-danger:hover:not(:disabled) {
      background-color: var(--ls-btn-danger-hover-bg);
      border-color: var(--ls-btn-danger-hover-border);
    }

    .ls-btn-success {
      color: var(--ls-btn-success-color);
      background-color: var(--ls-btn-success-bg);
      border-color: var(--ls-btn-success-border);
    }

    .ls-btn-success:hover:not(:disabled) {
      background-color: var(--ls-btn-success-hover-bg);
      border-color: var(--ls-btn-success-hover-border);
    }

    /* Loading state */
    .ls-btn-loading-icon {
      animation: spin 1s linear infinite;
      width: 1rem;
      height: 1rem;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .ls-btn-icon {
      width: 1rem;
      height: 1rem;
    }

    .button-text {
      display: inline-block;
      font-weight: inherit;
      font-size: inherit;
      color: inherit;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  constructor() {
    super();
    this.text = "";
    this.type = "button";
    this.variant = "primary"; // primary, secondary, outline, danger, success
    this.size = ""; // sm, lg (empty for default)
    this.disabled = false;
    this.loading = false;
    this.icon = "";
    this.iconPosition = "left"; // left, right
    this.hxPost = "";
    this.hxGet = "";
    this.hxTrigger = "";
    this.hxTarget = "";
    this.hxSwap = "";
    this.hxInclude = "";
    this.isLoading = false;
  }

  static get properties() {
    return {
      text: { type: String },
      type: { type: String },
      variant: { type: String },
      size: { type: String },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      icon: { type: String },
      iconPosition: { type: String },
      hxPost: { type: String },
      hxGet: { type: String },
      hxTrigger: { type: String },
      hxTarget: { type: String },
      hxSwap: { type: String },
      hxInclude: { type: String },
      isLoading: { type: Boolean, state: true },
    };
  }

  handleClick() {
    if (this.disabled || this.loading) return;

    if (this.hxPost || this.hxGet) {
      this.isLoading = true;
      // HTMX will handle the loading state
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    }

    this.dispatchEvent(new CustomEvent("click", { bubbles: true }));
  }

  render() {
    const buttonClasses = [
      "ls-btn",
      `ls-btn-${this.variant}`,
      this.size ? `ls-btn-${this.size}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const showLoading = this.loading || this.isLoading;
    const showIcon = this.icon && !showLoading;

    const renderIcon = (position) => {
      if (showLoading && position === this.iconPosition) {
        return html`
          <i data-lucide="loader-2" class="ls-btn-loading-icon"></i>
        `;
      }

      if (showIcon && position === this.iconPosition) {
        return html` <i data-lucide="${this.icon}" class="ls-btn-icon"></i> `;
      }

      return "";
    };

    const htmxAttributes = {};
    if (this.hxPost) htmxAttributes["hx-post"] = this.hxPost;
    if (this.hxGet) htmxAttributes["hx-get"] = this.hxGet;
    if (this.hxTrigger) htmxAttributes["hx-trigger"] = this.hxTrigger;
    if (this.hxTarget) htmxAttributes["hx-target"] = this.hxTarget;
    if (this.hxSwap) htmxAttributes["hx-swap"] = this.hxSwap;
    if (this.hxInclude) htmxAttributes["hx-include"] = this.hxInclude;

    return html`
      <button
        type="${this.type}"
        class="${buttonClasses}"
        ?disabled="${this.disabled || showLoading}"
        @click="${this.handleClick}"
        .hxPost="${this.hxPost || nothing}"
        .hxGet="${this.hxGet || nothing}"
        .hxTrigger="${this.hxTrigger || nothing}"
        .hxTarget="${this.hxTarget || nothing}"
        .hxSwap="${this.hxSwap || nothing}"
        .hxInclude="${this.hxInclude || nothing}"
      >
        ${this.iconPosition === "left" ? renderIcon("left") : ""}
        ${this.text ? html`<span class="button-text">${this.text}</span>` : ""}
        <slot></slot>
        ${this.iconPosition === "right" ? renderIcon("right") : ""}
      </button>
    `;
  }
}

// Register the custom element
customElements.define("ls-button", LsButton);
