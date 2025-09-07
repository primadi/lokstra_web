import { LitElement, html, css, nothing } from "lit"
import { createIconsManually } from "/static/js/lucide-utils.js"

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
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25;
      border-radius: 0.375rem;
      border: 1px solid transparent;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease-in-out;
      box-sizing: border-box;
      white-space: nowrap;
      background: transparent;
    }

    /* Size variants */
    .ls-btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    .ls-btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    /* Primary variant */
    .ls-btn-primary {
      color: white;
      background-color: #3b82f6;
      border-color: #3b82f6;
    }

    .ls-btn-primary:hover:not(:disabled) {
      background-color: #2563eb;
      border-color: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    }

    .ls-btn-primary:active:not(:disabled) {
      background-color: #1d4ed8;
      border-color: #1d4ed8;
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
      color: white;
      background-color: var(--ls-success-600);
      border-color: var(--ls-success-600);
    }

    .ls-btn-success:hover:not(:disabled) {
      background-color: #059669;
      border-color: #059669;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }

    /* Danger variant */
    .ls-btn-danger {
      color: white;
      background-color: var(--ls-error-600);
      border-color: var(--ls-error-600);
    }

    .ls-btn-danger:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
    }

    /* Warning variant */
    .ls-btn-warning {
      color: white;
      background-color: var(--ls-warning-600);
      border-color: var(--ls-warning-600);
    }

    .ls-btn-warning:hover:not(:disabled) {
      background-color: #d97706;
      border-color: #d97706;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
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
    this.variant = "primary" // primary, secondary, outline, danger, success
    this.size = "" // sm, lg (empty for default)
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
      isLoading: { type: Boolean, state: true },
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
    // Re-initialize icons when properties change
    this.initializeLucideIcons()
  }

  initializeLucideIcons() {
    setTimeout(() => {
      createIconsManually(this.shadowRoot)
    }, 50)
  }

  handleClick() {
    if (this.disabled || this.loading) return

    if (this.hxPost || this.hxGet) {
      this.isLoading = true
      // HTMX will handle the loading state
      setTimeout(() => {
        this.isLoading = false
      }, 100)
    }

    this.dispatchEvent(new CustomEvent("click", { bubbles: true }))
  }

  render() {
    const buttonClasses = [
      "ls-btn",
      `ls-btn-${this.variant}`,
      this.size ? `ls-btn-${this.size}` : "",
    ]
      .filter(Boolean)
      .join(" ")

    const showLoading = this.loading || this.isLoading
    const showIcon = this.icon && !showLoading

    const renderIcon = (position) => {
      if (showLoading && position === this.iconPosition) {
        return html`
          <i data-lucide="loader-2" class="ls-btn-loading-icon"></i>
        `
      }

      if (showIcon && position === this.iconPosition) {
        return html` <i data-lucide="${this.icon}" class="ls-btn-icon"></i> `
      }

      return ""
    }

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
    `
  }
}

// Register the custom element
customElements.define("ls-button", LsButton)
