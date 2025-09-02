import { LitElement, html, css } from "lit";

export class LsModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    :host([hidden]) {
      display: none !important;
    }

    .hs-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }

    .hs-modal {
      position: relative;
      background-color: var(--ls-card-bg);
      border-radius: var(--ls-border-radius-xl);
      box-shadow: var(--ls-shadow-2xl);
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      width: 100%;
      transform: scale(0.95);
      transition: transform 0.3s ease-out;
      border: 1px solid var(--ls-gray-200);
    }

    :host(.show) .hs-modal {
      transform: scale(1);
    }

    /* Modal sizes */
    .hs-modal.sm {
      max-width: 400px;
    }

    .hs-modal.md {
      max-width: 600px;
    }

    .hs-modal.lg {
      max-width: 800px;
    }

    .hs-modal.xl {
      max-width: 1200px;
    }

    .hs-modal.full {
      max-width: 95vw;
      max-height: 95vh;
    }

    .hs-modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--ls-gray-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--ls-card-bg);
    }

    .hs-modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ls-gray-900);
      margin: 0;
    }

    .hs-modal-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--ls-border-radius);
      color: var(--ls-gray-500);
      transition: all 0.2s ease-in-out;
    }

    .hs-modal-close:hover {
      background-color: var(--ls-gray-100);
      color: var(--ls-gray-700);
    }

    .hs-modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      max-height: 70vh;
      color: var(--ls-gray-700);
    }

    .hs-modal-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--ls-gray-200);
      background-color: var(--ls-gray-50);
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      align-items: center;
    }

    .hs-modal-footer.center {
      justify-content: center;
    }

    .hs-modal-footer.left {
      justify-content: flex-start;
    }

    .hs-modal-footer.between {
      justify-content: space-between;
    }

    /* Animation */
    :host(.animate-in) {
      animation: modalFadeIn 0.3s ease-out;
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      :host {
        padding: 0.5rem;
        align-items: flex-end;
      }

      .hs-modal {
        border-radius: var(--ls-border-radius-xl) var(--ls-border-radius-xl) 0 0;
        max-height: 90vh;
      }

      .hs-modal-body {
        max-height: 60vh;
      }

      .hs-modal-footer {
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    /* Dark theme */
    :host(.theme-dark) .hs-modal {
      background-color: var(--ls-gray-800);
      border-color: var(--ls-gray-700);
    }

    :host(.theme-dark) .hs-modal-header {
      border-color: var(--ls-gray-700);
      background-color: var(--ls-gray-800);
    }

    :host(.theme-dark) .hs-modal-title {
      color: var(--ls-gray-100);
    }

    :host(.theme-dark) .hs-modal-body {
      color: var(--ls-gray-300);
    }

    :host(.theme-dark) .hs-modal-footer {
      background-color: var(--ls-gray-700);
      border-color: var(--ls-gray-600);
    }

    :host(.theme-dark) .hs-modal-close:hover {
      background-color: var(--ls-gray-700);
      color: var(--ls-gray-300);
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.size = "md";
    this.title = "";
    this.showHeader = true;
    this.showCloseButton = true;
    this.showFooter = false;
    this.footerAlign = "right";
    this.actions = [];
    this.dismissOnOverlay = true;
    this.dismissOnEscape = true;
    this.animateIn = true;
  }

  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      size: { type: String },
      title: { type: String },
      showHeader: { type: Boolean },
      showCloseButton: { type: Boolean },
      showFooter: { type: Boolean },
      footerAlign: { type: String },
      actions: { type: Array },
      dismissOnOverlay: { type: Boolean },
      dismissOnEscape: { type: Boolean },
      animateIn: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.dismissOnEscape) {
      document.addEventListener("keydown", this.handleEscape.bind(this));
    }

    // Add to modal stack for proper z-index management
    this.style.zIndex =
      9999 + document.querySelectorAll("ls-modal[open]").length;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleEscape.bind(this));
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("open")) {
      if (this.open) {
        document.body.style.overflow = "hidden";
        if (this.animateIn) {
          this.classList.add("animate-in");
          this.classList.add("show");
        }
      } else {
        document.body.style.overflow = "";
        this.classList.remove("animate-in");
        this.classList.remove("show");
      }
    }

    // Initialize Lucide icons
    setTimeout(() => {
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }, 0);
  }

  handleEscape(event) {
    if (event.key === "Escape" && this.open) {
      this.close();
    }
  }

  handleOverlayClick() {
    if (this.dismissOnOverlay) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("modal-close", {
        detail: { title: this.title },
        bubbles: true,
      })
    );
  }

  show() {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent("modal-open", {
        detail: { title: this.title },
        bubbles: true,
      })
    );
  }

  handleAction(action) {
    this.dispatchEvent(
      new CustomEvent("modal-action", {
        detail: { action, title: this.title },
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

    // Auto-close after action if specified
    if (action.autoClose !== false) {
      this.close();
    }
  }

  render() {
    if (!this.open) {
      return html``;
    }

    return html`
      <!-- Modal overlay -->
      <div class="hs-overlay" @click="${this.handleOverlayClick}"></div>

      <!-- Modal container -->
      <div class="hs-modal ${this.size}" @click="${(e) => e.stopPropagation()}">
        <!-- Header -->
        ${this.showHeader
          ? html`
              <div class="hs-modal-header">
                <h3 class="hs-modal-title">${this.title}</h3>
                ${this.showCloseButton
                  ? html`
                      <button
                        class="hs-modal-close"
                        @click="${this.close}"
                        type="button"
                      >
                        <i
                          data-lucide="x"
                          style="width: 1.25rem; height: 1.25rem;"
                        ></i>
                      </button>
                    `
                  : ""}
              </div>
            `
          : ""}

        <!-- Body -->
        <div class="hs-modal-body">
          <slot></slot>
        </div>

        <!-- Footer -->
        ${this.showFooter
          ? html`
              <div class="hs-modal-footer ${this.footerAlign}">
                ${this.actions && this.actions.length > 0
                  ? html`
                      ${this.actions.map(
                        (action) => html`
                          <ls-button
                            text="${action.text}"
                            variant="${action.variant || "primary"}"
                            size="${action.size || "md"}"
                            ?disabled="${action.disabled}"
                            @click="${() => this.handleAction(action)}"
                          ></ls-button>
                        `
                      )}
                    `
                  : html`
                      <!-- Default footer buttons -->
                      <ls-button
                        text="Cancel"
                        variant="outline"
                        @click="${this.close}"
                      ></ls-button>
                      <ls-button
                        text="Confirm"
                        variant="primary"
                        @click="${() =>
                          this.handleAction({
                            text: "Confirm",
                            action: "confirm",
                          })}"
                      ></ls-button>
                    `}
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("ls-modal", LsModal);
