import { LitElement, html, css } from "lit"
import { createIconsManually, toPascalCase } from "/static/js/lucide-utils.js"

export class LsMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .menu-container {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--ls-bg-primary);
      border: 1px solid var(--ls-border-primary);
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05);
      margin-top: 0.5rem;
      z-index: 50;
      min-width: 200px;
      max-height: 400px;
      overflow: hidden;
      transform: scale(0.95) translateY(-8px);
      opacity: 0;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(8px);
    }

    :host([open]) .menu-container {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    :host([position="left"]) .menu-container {
      right: auto;
      left: 0;
    }

    :host([position="center"]) .menu-container {
      right: auto;
      left: 50%;
      transform: translateX(-50%) scale(0.95) translateY(-8px);
    }

    :host([position="center"][open]) .menu-container {
      transform: translateX(-50%) scale(1) translateY(0);
    }

    .menu-header {
      padding: 0.875rem 1rem 0.75rem;
      border-bottom: 1px solid var(--ls-border-secondary);
      background: var(--ls-bg-secondary);
      border-radius: 0.75rem 0.75rem 0 0;
    }

    .menu-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ls-text-primary);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .menu-subtitle {
      font-size: 0.75rem;
      color: var(--ls-text-muted);
      margin: 0.25rem 0 0;
    }

    .menu-content {
      max-height: 320px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--ls-border-secondary) transparent;
    }

    .menu-content::-webkit-scrollbar {
      width: 6px;
    }

    .menu-content::-webkit-scrollbar-track {
      background: transparent;
    }

    .menu-content::-webkit-scrollbar-thumb {
      background: var(--ls-border-secondary);
      border-radius: 3px;
    }

    .menu-content::-webkit-scrollbar-thumb:hover {
      background: var(--ls-text-muted);
    }

    .menu-section {
      border-bottom: 1px solid var(--ls-border-secondary);
    }

    .menu-section:last-child {
      border-bottom: none;
    }

    .menu-section-header {
      padding: 0.625rem 1rem 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--ls-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--ls-bg-tertiary);
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: var(--ls-text-secondary);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      background: none;
      width: 100%;
      cursor: pointer;
      text-align: left;
      position: relative;
      overflow: hidden;
    }

    .menu-item::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }

    .menu-item:hover::before {
      left: 100%;
    }

    .menu-item:hover {
      background: var(--ls-bg-secondary);
      color: var(--ls-text-primary);
      transform: translateX(2px);
    }

    .menu-item:active {
      transform: translateX(1px) scale(0.98);
    }

    .menu-item.active {
      background: var(--ls-primary-50, rgba(59, 130, 246, 0.1));
      color: var(--ls-primary-700, #1d4ed8);
      border-left: 3px solid var(--ls-primary-500, #3b82f6);
    }

    .menu-item.danger:hover {
      background: var(--ls-error-50, rgba(239, 68, 68, 0.1));
      color: var(--ls-error-700, #b91c1c);
    }

    .menu-item-icon {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ls-text-muted);
      flex-shrink: 0;
      transition: color 0.15s ease;
    }

    .menu-item:hover .menu-item-icon,
    .menu-item.active .menu-item-icon {
      color: currentColor;
    }

    .menu-item-content {
      flex: 1;
      min-width: 0;
    }

    .menu-item-label {
      font-weight: 500;
      display: block;
      line-height: 1.2;
    }

    .menu-item-description {
      font-size: 0.75rem;
      color: var(--ls-text-muted);
      margin-top: 0.125rem;
      line-height: 1.3;
    }

    .menu-item-meta {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      flex-shrink: 0;
    }

    .menu-item-badge {
      background: var(--ls-primary-100, rgba(59, 130, 246, 0.2));
      color: var(--ls-primary-700, #1d4ed8);
      font-size: 0.6875rem;
      font-weight: 600;
      padding: 0.125rem 0.375rem;
      border-radius: 0.375rem;
      line-height: 1;
    }

    .menu-item-shortcut {
      font-size: 0.6875rem;
      color: var(--ls-text-muted);
      background: var(--ls-bg-tertiary);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: monospace;
    }

    .menu-item-check {
      width: 0.875rem;
      height: 0.875rem;
      color: var(--ls-primary-600, #2563eb);
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    .menu-item.active .menu-item-check {
      opacity: 1;
    }

    .menu-footer {
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--ls-border-secondary);
      background: var(--ls-bg-secondary);
      border-radius: 0 0 0.75rem 0.75rem;
      font-size: 0.75rem;
      color: var(--ls-text-muted);
      text-align: center;
    }

    .menu-divider {
      height: 1px;
      background: var(--ls-border-secondary);
      margin: 0.25rem 0;
    }

    /* Lucide Icons Styling */
    svg[data-lucide] {
      display: inline-block !important;
      stroke-width: 2 !important;
      fill: none !important;
      stroke: currentColor !important;
    }

    .menu-item-icon svg[data-lucide] {
      width: 0.875rem !important;
      height: 0.875rem !important;
    }

    .menu-item-check svg[data-lucide] {
      width: 0.875rem !important;
      height: 0.875rem !important;
    }

    i[data-lucide] {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 0.875rem;
      height: 0.875rem;
    }

    /* Dark theme enhancements */
    [data-theme="dark"] :host {
      --menu-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.2);
    }

    /* Animation keyframes */
    @keyframes menuSlideIn {
      from {
        transform: scale(0.95) translateY(-8px);
        opacity: 0;
      }
      to {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    @keyframes menuSlideOut {
      from {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
      to {
        transform: scale(0.95) translateY(-8px);
        opacity: 0;
      }
    }

    /* Mobile responsive */
    @media (max-width: 640px) {
      .menu-container {
        position: fixed;
        top: auto !important;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        margin: 0;
        border-radius: 1rem;
        max-height: 60vh;
      }

      :host([position="center"]) .menu-container {
        transform: scale(0.95) translateY(8px);
      }

      :host([position="center"][open]) .menu-container {
        transform: scale(1) translateY(0);
      }
    }
  `

  constructor() {
    super()
    this.open = false
    this.position = "right" // right, left, center
    this.title = ""
    this.subtitle = ""
    this.footer = ""
    this.items = []
    this.sections = []
    this.iconTimeout = null
    this.isUpdatingIcons = false
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      position: { type: String, reflect: true },
      title: { type: String },
      subtitle: { type: String },
      footer: { type: String },
      items: { type: Array },
      sections: { type: Array },
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

    // Initialize icons when content changes
    if (
      changedProperties.has("items") ||
      changedProperties.has("sections") ||
      changedProperties.has("open")
    ) {
      this.scheduleIconRefresh()
    }
  }

  scheduleIconRefresh() {
    // Prevent multiple simultaneous icon refreshes
    if (this.isUpdatingIcons) return

    // Clear any pending timeout
    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout)
    }

    this.iconTimeout = setTimeout(() => {
      this.initializeLucideIcons()
      this.iconTimeout = null
    }, 50)
  }

  initializeLucideIcons() {
    // Prevent multiple simultaneous calls
    if (this.isUpdatingIcons) return
    this.isUpdatingIcons = true

    setTimeout(() => {
      if (this.shadowRoot && window.lucide) {
        // Use utility function from lucide-utils.js
        createIconsManually(this.shadowRoot, window.lucide)
      }
      this.isUpdatingIcons = false
    }, 10)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this.iconTimeout) {
      clearTimeout(this.iconTimeout)
    }
  }

  toggle() {
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent("menu-toggle", {
        detail: { open: this.open },
        bubbles: true,
      })
    )
  }

  close() {
    this.open = false
    this.dispatchEvent(
      new CustomEvent("menu-close", {
        bubbles: true,
      })
    )
  }

  handleItemClick(item, event) {
    event.stopPropagation()

    // Dispatch item selection event
    this.dispatchEvent(
      new CustomEvent("menu-item-select", {
        detail: { item, value: item.value },
        bubbles: true,
      })
    )

    // Close menu unless specified otherwise
    if (item.keepOpen !== true) {
      this.close()
    }
  }

  renderHeader() {
    if (!this.title && !this.subtitle) return ""

    return html`
      <div class="menu-header">
        <h3 class="menu-title">${this.title}</h3>
        ${this.subtitle
          ? html`<p class="menu-subtitle">${this.subtitle}</p>`
          : ""}
      </div>
    `
  }

  renderFooter() {
    if (!this.footer) return ""

    return html` <div class="menu-footer">${this.footer}</div> `
  }

  renderSections() {
    if (!this.sections.length) return ""

    return html`
      ${this.sections.map(
        (section) => html`
          <div class="menu-section">
            ${section.title
              ? html` <div class="menu-section-header">${section.title}</div> `
              : ""}
            ${section.items.map((item) => this.renderItem(item))}
          </div>
        `
      )}
    `
  }

  renderItems() {
    if (!this.items.length) return ""

    return html`
      <div class="menu-section">
        ${this.items.map((item) => this.renderItem(item))}
      </div>
    `
  }

  renderItem(item) {
    if (item.type === "divider") {
      return html`<div class="menu-divider"></div>`
    }

    const classes = [
      "menu-item",
      item.active ? "active" : "",
      item.danger ? "danger" : "",
    ]
      .filter(Boolean)
      .join(" ")

    return html`
      <button
        class="${classes}"
        @click="${(e) => this.handleItemClick(item, e)}"
        ?disabled="${item.disabled}"
      >
        ${item.icon
          ? html` <i class="menu-item-icon" data-lucide="${item.icon}"></i> `
          : ""}

        <div class="menu-item-content">
          <span class="menu-item-label">${item.label}</span>
          ${item.description
            ? html`
                <div class="menu-item-description">${item.description}</div>
              `
            : ""}
        </div>

        <div class="menu-item-meta">
          ${item.badge
            ? html` <span class="menu-item-badge">${item.badge}</span> `
            : ""}
          ${item.shortcut
            ? html` <span class="menu-item-shortcut">${item.shortcut}</span> `
            : ""}
          ${item.showCheck
            ? html` <i class="menu-item-check" data-lucide="check"></i> `
            : ""}
        </div>
      </button>
    `
  }

  render() {
    if (!this.open) return ""

    return html`
      <div class="menu-container">
        ${this.renderHeader()}

        <div class="menu-content">
          ${this.renderSections()} ${this.renderItems()}
        </div>

        ${this.renderFooter()}
      </div>
    `
  }
}

// Register the custom element
customElements.define("ls-menu", LsMenu)
