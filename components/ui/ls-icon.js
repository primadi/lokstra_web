import { LitElement, html, css } from "lit"
import { createIconsManually, toPascalCase } from "/static/js/lucide-utils.js"

export class LsIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size, 1rem);
      height: var(--icon-size, 1rem);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: var(--icon-stroke-width, 2);
      stroke-linecap: round;
      stroke-linejoin: round;
      display: block;
    }
  `

  static get properties() {
    return {
      name: { type: String },
      size: { type: String },
      strokeWidth: { type: String, attribute: "stroke-width" },
    }
  }

  constructor() {
    super()
    this.name = ""
    this.size = "1rem"
    this.strokeWidth = "2"
  }

  connectedCallback() {
    super.connectedCallback()

    // Wait for Lucide to be available
    if (!window.lucide) {
      const checkLucide = () => {
        if (window.lucide) {
          this.requestUpdate()
        } else {
          setTimeout(checkLucide, 100)
        }
      }
      checkLucide()
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties)

    // Update CSS custom properties when attributes change
    if (changedProperties.has("size")) {
      this.style.setProperty("--icon-size", this.size)
    }
    if (changedProperties.has("strokeWidth")) {
      this.style.setProperty("--icon-stroke-width", this.strokeWidth)
    }

    // Convert icons after DOM update
    this.updateComplete.then(() => {
      if (this.shadowRoot && window.lucide) {
        if (changedProperties.has("name")) {
          // For name changes, we need to manually update the icon
          // because template already rendered with old name
          const existingSvg = this.shadowRoot.querySelector("svg[data-lucide]")
          if (existingSvg) {
            // Create new <i> with current name
            const newI = document.createElement("i")
            newI.setAttribute("data-lucide", this.name) // Use current name!
            newI.style.width = this.size
            newI.style.height = this.size

            // Replace SVG with new <i>
            existingSvg.parentNode.replaceChild(newI, existingSvg)
          }
        }

        // Convert any <i> elements to SVG
        createIconsManually(this.shadowRoot, window.lucide)
      }
    })
  }
  getIconData() {
    if (!this.name) {
      console.warn("ls-icon: No name provided")
      return null
    }

    if (!window.lucide) {
      console.warn("ls-icon: Lucide library not available")
      return null
    }

    const pascalName = toPascalCase(this.name)
    const iconData = window.lucide[this.name] || window.lucide[pascalName]

    if (!iconData) {
      console.warn(`ls-icon: Icon "${this.name}" not found in Lucide`)
    }

    return iconData
  }

  render() {
    if (!this.name) {
      console.log("ls-icon: No name provided, showing warning")
      return html`<span style="color: red;">⚠</span>`
    }

    return html`
      <i
        data-lucide="${this.name}"
        style="width: ${this.size}; height: ${this.size};"
      ></i>
    `
  }
}

// Register the custom element
customElements.define("ls-icon", LsIcon)
