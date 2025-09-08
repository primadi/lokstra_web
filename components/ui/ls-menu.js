import { LitElement, html, css } from "lit"
import "./ls-icon.js"

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

    /* Floating mode - fixed position to escape sidebar container */
    :host([floating]) .menu-container {
      position: fixed;
      z-index: 1000;
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

    /* Icon Styling */
    .menu-item-icon,
    .menu-item-check {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0;
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
    this.floating = false
    this.position = "right" // right, left, center
    this.title = ""
    this.subtitle = ""
    this.footer = ""
    this.items = []
    this.sections = []
    this.iconTimeout = null
    this.isUpdatingIcons = false
    this.portalContainer = null // For floating menus
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      floating: { type: Boolean, reflect: true },
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
  }

  updated(changedProperties) {
    super.updated(changedProperties)

    // Handle floating positioning
    if (this.floating && changedProperties.has("open")) {
      if (this.open) {
        this.createPortalMenu()
      } else {
        this.destroyPortalMenu()
      }
    }
  }

  createPortalMenu() {
    if (!this.floating) return

    // Create portal container di document body
    this.portalContainer = document.createElement("div")
    this.portalContainer.className = "ls-menu-portal"
    this.portalContainer.style.cssText = `
      position: fixed;
      z-index: 1000;
      pointer-events: auto;
    `

    // Get host position
    const hostRect = this.getBoundingClientRect()

    // Create menu content
    const menuHtml = this.renderMenuContent()
    this.portalContainer.innerHTML = menuHtml

    // Position portal - closer to icon with no gap
    this.portalContainer.style.left = `${hostRect.right - 5}px` // Overlap slightly
    this.portalContainer.style.top = `${hostRect.top - 4}px` // Slight vertical overlap

    // Add to document body
    document.body.appendChild(this.portalContainer)

    // Add event listeners
    this.addPortalEventListeners()
  }

  destroyPortalMenu() {
    if (this.portalContainer) {
      document.body.removeChild(this.portalContainer)
      this.portalContainer = null
    }
  }

  addPortalEventListeners() {
    if (!this.portalContainer) return

    // Handle clicks
    this.portalContainer.addEventListener("click", (e) => {
      e.stopPropagation()
      const target = e.target.closest("[data-item-key]")
      if (target) {
        const itemKey = target.dataset.itemKey
        const item = this.items.find((item) => item.key === itemKey)
        if (item) {
          this.handleItemClick(item)
          // Close menu after click
          this.open = false
        }
      }
    })

    // Handle mouse leave - close menu when mouse exits
    this.portalContainer.addEventListener("mouseleave", () => {
      console.log("Portal: Mouse left menu area, closing")
      this.open = false
    })

    // Prevent portal from closing when mouse enters
    this.portalContainer.addEventListener("mouseenter", () => {
      console.log("Portal: Mouse entered menu area")
    })
  }

  renderMenuContent() {
    return `
      <div class="menu-container" style="
        position: static;
        background: var(--ls-gray-800, #1f2937);
        border: 1px solid var(--ls-gray-700, #374151);
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        min-width: 10rem;
        padding: 0.25rem 0;
        transform: scale(1) translateY(0);
        opacity: 1;
        margin: 0;
      ">
        ${this.items
          .map(
            (item) => `
          <a 
            href="${item.href || "#"}" 
            data-item-key="${item.key}"
            style="
              display: block;
              padding: 0.5rem 1rem;
              color: var(--ls-gray-300, #d1d5db);
              text-decoration: none;
              font-size: 0.875rem;
              transition: all 0.2s ease-in-out;
              white-space: nowrap;
              ${
                item.active
                  ? "background-color: var(--ls-primary-600, #2563eb); color: #ffffff;"
                  : ""
              }
            "
            onmouseover="this.style.backgroundColor = 'var(--ls-gray-700, #374151)'; this.style.color = 'var(--ls-gray-100, #f9fafb)';"
            onmouseout="this.style.backgroundColor = '${
              item.active ? "var(--ls-primary-600, #2563eb)" : "transparent"
            }'; this.style.color = '${
              item.active ? "#ffffff" : "var(--ls-gray-300, #d1d5db)"
            }';"
          >
            ${item.label}
            ${
              item.badge
                ? `<span style="background-color: var(--ls-error-500); color: white; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 9999px; margin-left: auto;">${item.badge}</span>`
                : ""
            }
          </a>
        `
          )
          .join("")}
      </div>
    `
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // Clean up portal when component is removed
    this.destroyPortalMenu()
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
        @click=${(e) => this.handleItemClick(item, e)}
        ?disabled=${item.disabled}
      >
        ${item.icon
          ? html`
              <ls-icon
                name=${item.icon}
                size="1rem"
                class="menu-item-icon"
              ></ls-icon>
            `
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
            ? html`
                <ls-icon
                  name="check"
                  size="1rem"
                  class="menu-item-check"
                ></ls-icon>
              `
            : ""}
        </div>
      </button>
    `
  }

  render() {
    // For floating menus, don't render in shadow DOM - use portal instead
    if (this.floating) {
      return html``
    }

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
