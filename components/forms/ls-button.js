import { LitElement, html, css, nothing } from "lit"
import "/components/ui/ls-icon.js"

export class LsButton extends LitElement {
  static styles = css`
    :host {
      /* Default mode: shrink to fit content */
      display: inline-block;
    }

    /* Full width mode: stretch to parent width */
    :host([fullwidth]),
    :host([block]) {
      display: block;
      width: 100%;
    }

    /* Stretch the inner button when host is fullwidth or block */
    :host([fullwidth]) .ls-btn,
    :host([block]) .ls-btn {
      width: 100%;
      box-sizing: border-box;
    }

    /* Fixed width mode: when host has explicit width style */
    :host([style*="width"]) .ls-btn {
      width: 100%;
      box-sizing: border-box;
    }

    /* Optional: allow external classes + 'stretch' attribute */
    :host([stretch]) .ls-btn {
      width: 100%;
      box-sizing: border-box;
    }

    /* Base style for the inner button */
    .ls-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ls-button-gap, 0.5rem);
      padding: var(--ls-button-padding-y, 0.5rem)
        var(--ls-button-padding-x, 1rem);
      font-size: var(--ls-button-font-size, 0.875rem);
      font-weight: var(--ls-button-font-weight, 500);
      line-height: var(--ls-button-line-height, 1.25);
      border-radius: var(--ls-button-border-radius, 0.375rem);
      border: 1px solid transparent;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease-in-out;
      box-sizing: border-box;
      white-space: nowrap;
      background: transparent;
    }

    /* Size variants - sm, md (default), lg */
    .ls-btn-sm {
      --ls-button-padding-y: 0.375rem;
      --ls-button-padding-x: 0.75rem;
      --ls-button-font-size: 0.75rem;
      --ls-button-gap: 0.375rem;
    }

    .ls-btn-md {
      --ls-button-padding-y: 0.5rem;
      --ls-button-padding-x: 1rem;
      --ls-button-font-size: 0.875rem;
      --ls-button-gap: 0.5rem;
    }

    .ls-btn-lg {
      --ls-button-padding-y: 0.75rem;
      --ls-button-padding-x: 1.5rem;
      --ls-button-font-size: 1rem;
      --ls-button-gap: 0.625rem;
    }

    /* Primary variant */
    .ls-btn-primary {
      color: var(--ls-primary-foreground, white);
      background-color: var(--ls-primary-600, #3b82f6);
      border-color: var(--ls-primary-600, #3b82f6);
    }

    .ls-btn-primary:hover:not(:disabled) {
      background-color: var(--ls-primary-700, #2563eb);
      border-color: var(--ls-primary-700, #2563eb);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px var(--ls-primary-shadow, rgba(59, 130, 246, 0.3));
    }

    .ls-btn-primary:active:not(:disabled) {
      background-color: var(--ls-primary-800, #1d4ed8);
      border-color: var(--ls-primary-800, #1d4ed8);
      transform: translateY(0);
    }

    /* Secondary variant */
    .ls-btn-secondary {
      color: var(--ls-text-primary);
      background-color: var(--ls-bg-secondary);
      border-color: var(--ls-border-primary);
    }

    .ls-btn-secondary:hover:not(:disabled) {
      background-color: var(--ls-bg-tertiary);
      border-color: var(--ls-border-secondary);
      transform: translateY(-1px);
    }

    /* Outline variant */
    .ls-btn-outline {
      color: var(--ls-text-secondary);
      background-color: transparent;
      border-color: var(--ls-border-secondary);
    }

    .ls-btn-outline:hover:not(:disabled) {
      background-color: var(--ls-bg-secondary);
      border-color: var(--ls-text-muted);
      color: var(--ls-text-primary);
      transform: translateY(-1px);
    }

    /* Success variant */
    .ls-btn-success {
      color: var(--ls-success-foreground, white);
      background-color: var(--ls-success-600, #10b981);
      border-color: var(--ls-success-600, #10b981);
    }

    .ls-btn-success:hover:not(:disabled) {
      background-color: var(--ls-success-700, #059669);
      border-color: var(--ls-success-700, #059669);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px var(--ls-success-shadow, rgba(16, 185, 129, 0.3));
    }

    /* Danger variant */
    .ls-btn-danger {
      color: var(--ls-error-foreground, white);
      background-color: var(--ls-error-600, #ef4444);
      border-color: var(--ls-error-600, #ef4444);
    }

    .ls-btn-danger:hover:not(:disabled) {
      background-color: var(--ls-error-700, #dc2626);
      border-color: var(--ls-error-700, #dc2626);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px var(--ls-error-shadow, rgba(239, 68, 68, 0.3));
    }

    /* Warning variant */
    .ls-btn-warning {
      color: var(--ls-warning-foreground, white);
      background-color: var(--ls-warning-600, #f59e0b);
      border-color: var(--ls-warning-600, #f59e0b);
    }

    .ls-btn-warning:hover:not(:disabled) {
      background-color: var(--ls-warning-700, #d97706);
      border-color: var(--ls-warning-700, #d97706);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px var(--ls-warning-shadow, rgba(245, 158, 11, 0.3));
    }

    /* Disabled state */
    .ls-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Loading state */
    .ls-btn-loading-icon {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Icon styling */
    .ls-btn-icon,
    .ls-btn-loading-icon {
      width: 1rem;
      height: 1rem;
      stroke: currentColor;
      flex-shrink: 0;
    }

    /* Button text */
    .button-text {
      flex-shrink: 0;
    }
  `

  constructor() {
    super()
    this.text = ""
    this.type = "button"
    this.variant = "primary" // primary, secondary, outline, danger, success, warning
    this.size = "md" // sm, md (default), lg
    this.disabled = false
    this.loading = false
    this.icon = ""
    this.iconPosition = "left" // left, right
    this.hxPost = ""
    this.hxGet = ""
    this.hxTrigger = ""
    this.hxTarget = ""
    this.hxSwap = ""
    this.hxInclude = ""
    this.isLoading = false
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

      // Internal state to track HTMX loading
      isLoading: { type: Boolean, state: true },
    }
  }

  connectedCallback() {
    super.connectedCallback()
    // Listen to HTMX events for proper loading state
    this.addEventListener("htmx:beforeRequest", this.handleHtmxStart.bind(this))
    this.addEventListener("htmx:afterRequest", this.handleHtmxEnd.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener(
      "htmx:beforeRequest",
      this.handleHtmxStart.bind(this)
    )
    this.removeEventListener("htmx:afterRequest", this.handleHtmxEnd.bind(this))
  }

  handleHtmxStart() {
    this.isLoading = true
  }

  handleHtmxEnd() {
    this.isLoading = false
  }

  render() {
    const buttonClasses = [
      "ls-btn",
      `ls-btn-${this.variant}`,
      `ls-btn-${this.size || "md"}`, // Default to md if no size specified
    ]
      .filter(Boolean)
      .join(" ")

    const showLoading = this.loading || this.isLoading
    const showIcon = this.icon && !showLoading

    const renderIcon = (position) => {
      if (showLoading && position === this.iconPosition) {
        return html`
          <ls-icon
            name="loader-2"
            size="1rem"
            class="ls-btn-loading-icon"
          ></ls-icon>
        `
      }

      if (showIcon && position === this.iconPosition) {
        return html`<ls-icon
          name="${this.icon}"
          size="1rem"
          class="ls-btn-icon"
        ></ls-icon>`
      }

      return ""
    }

    return html`
      <button
        type=${this.type}
        class=${buttonClasses}
        ?disabled=${this.disabled || showLoading}
        .hxPost=${this.hxPost || nothing}
        .hxGet=${this.hxGet || nothing}
        .hxTrigger=${this.hxTrigger || nothing}
        .hxTarget=${this.hxTarget || nothing}
        .hxSwap=${this.hxSwap || nothing}
        .hxInclude=${this.hxInclude || nothing}
      >
        ${this.iconPosition === "left" ? renderIcon("left") : ""}
        ${this.text ? html`<span class="button-text">${this.text}</span>` : ""}
        <slot></slot>
        ${this.iconPosition === "right" ? renderIcon("right") : ""}
      </button>
    `
  }
}

// Register the custom element
customElements.define("ls-button", LsButton)
