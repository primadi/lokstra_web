import { LitElement, html, css } from "lit"

/**
 * Lokstra App Root Component
 *
 * Main application wrapper that provides:
 * - Global event handling for all child components
 * - Application-wide state coordination
 * - Error boundary functionality
 */
class LsAppRoot extends LitElement {
  static properties = {
    initialized: { type: Boolean, state: true },
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 100%;
      --app-transition-duration: 0.3s;
      --app-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .app-container {
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .app-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--ls-bg-primary, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity var(--app-transition-duration)
        var(--app-transition-timing);
    }

    .app-loading.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .loading-spinner {
      width: 2rem;
      height: 2rem;
      border: 2px solid var(--ls-border-primary, #e5e7eb);
      border-top: 2px solid var(--ls-primary-600, #2563eb);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .app-content {
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: opacity var(--app-transition-duration)
        var(--app-transition-timing);
    }

    .app-content.visible {
      opacity: 1;
    }

    /* Global error boundary styles */
    .error-boundary {
      padding: 2rem;
      text-align: center;
      background: var(--ls-error-50, #fef2f2);
      color: var(--ls-error-700, #b91c1c);
      border: 1px solid var(--ls-error-200, #fecaca);
      border-radius: var(--ls-border-radius-lg, 0.5rem);
      margin: 1rem;
    }

    .error-boundary h2 {
      margin: 0 0 1rem 0;
      color: var(--ls-error-800, #991b1b);
    }

    .error-boundary pre {
      background: var(--ls-error-100, #fee2e2);
      padding: 1rem;
      border-radius: var(--ls-border-radius, 0.25rem);
      overflow: auto;
      text-align: left;
      font-size: 0.875rem;
    }
  `

  constructor() {
    super()
    this.initialized = false
    this.errorState = null

    // Bind methods
    this.handleGlobalError = this.handleGlobalError.bind(this)
    this.handleComponentError = this.handleComponentError.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()

    // Set up global event listeners
    this.setupGlobalEventListeners()

    // Initialize application
    this.initializeApp()

    console.log("🏠 LsAppRoot: Connected and initializing...")
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.cleanupGlobalEventListeners()
  }

  setupGlobalEventListeners() {
    // Global error handling
    window.addEventListener("error", this.handleGlobalError)
    window.addEventListener("unhandledrejection", this.handleGlobalError)

    // Component error events
    window.addEventListener("component-error", this.handleComponentError)

    console.log("🔧 LsAppRoot: Global event listeners setup complete")
  }

  cleanupGlobalEventListeners() {
    window.removeEventListener("error", this.handleGlobalError)
    window.removeEventListener("unhandledrejection", this.handleGlobalError)
    window.removeEventListener("component-error", this.handleComponentError)
  }

  async initializeApp() {
    try {
      console.log("🏠 LsAppRoot: Starting initialization...")

      // Wait for all components to be defined
      await this.waitForComponents()

      // Mark as initialized
      this.initialized = true

      // Dispatch app ready event
      this.dispatchEvent(
        new CustomEvent("app-ready", {
          bubbles: true,
          composed: true,
          detail: { timestamp: Date.now() },
        })
      )

      console.log("✅ LsAppRoot: Initialization complete")
    } catch (error) {
      console.error("❌ LsAppRoot: Initialization failed:", error)
      this.errorState = error
      this.requestUpdate()
    }
  }

  async waitForComponents() {
    const componentSelectors = [
      "ls-sidebar",
      "ls-navbar",
      "ls-button",
      "ls-icon",
      "ls-menu",
    ]

    const promises = componentSelectors.map(async (selector) => {
      try {
        return await customElements.whenDefined(selector)
      } catch {
        console.warn(`⚠️ Component ${selector} not found, skipping...`)
      }
    })

    await Promise.allSettled(promises)

    // Small delay to ensure components are fully initialized
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  handleGlobalError(event) {
    console.error("🚨 LsAppRoot: Global error:", event.error || event.reason)

    // In development, you might want to show error details
    if (process.env.NODE_ENV === "development") {
      this.errorState = event.error || event.reason
      this.requestUpdate()
    }

    // Dispatch error event for monitoring/logging
    this.dispatchEvent(
      new CustomEvent("app-error", {
        bubbles: true,
        composed: true,
        detail: { error: event.error || event.reason },
      })
    )
  }

  handleComponentError(event) {
    console.error("🚨 LsAppRoot: Component error:", event.detail)

    // Component errors are usually non-fatal, log but don't crash
    this.dispatchEvent(
      new CustomEvent("app-component-error", {
        bubbles: true,
        composed: true,
        detail: event.detail,
      })
    )
  }

  render() {
    if (this.errorState) {
      return this.renderErrorBoundary()
    }

    return html`
      <div class="app-container">
        ${!this.initialized ? this.renderLoadingScreen() : ""}

        <div class="app-content ${this.initialized ? "visible" : ""}">
          <slot></slot>
        </div>
      </div>
    `
  }

  renderLoadingScreen() {
    return html`
      <div class="app-loading ${this.initialized ? "hidden" : ""}">
        <div class="loading-spinner"></div>
      </div>
    `
  }

  renderErrorBoundary() {
    return html`
      <div class="error-boundary">
        <h2>Something went wrong</h2>
        <p>The application encountered an unexpected error.</p>
        <pre>${this.errorState?.message || "Unknown error"}</pre>
        <button @click=${() => window.location.reload()}>
          Reload Application
        </button>
      </div>
    `
  }
}

customElements.define("ls-app-root", LsAppRoot)

export { LsAppRoot }
