import { LitElement, html, css } from "lit";

export class LsInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .ls-form-group {
      margin-bottom: 1rem;
    }

    .ls-form-label {
      display: inline-block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ls-input-text, #374151);
    }

    .ls-form-label.required::after {
      content: "*";
      color: var(--ls-error-500);
      margin-left: 0.25rem;
    }

    .ls-input {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25;
      color: var(--ls-input-text);
      background-color: var(--ls-input-bg);
      background-clip: padding-box;
      border: 1px solid var(--ls-input-border);
      border-radius: var(--ls-border-radius);
      box-shadow: var(--ls-shadow-sm);
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .ls-input::placeholder {
      color: var(--ls-input-placeholder);
    }

    .ls-input:focus {
      outline: 0;
      border-color: var(--ls-input-focus-border);
      box-shadow: 0 0 0 0.2rem var(--ls-input-focus-ring);
    }

    .ls-input:disabled {
      background-color: var(--ls-input-disabled-bg);
      opacity: 0.6;
      cursor: not-allowed;
    }

    .ls-input.is-invalid {
      border-color: var(--ls-input-error-border);
    }

    .ls-input.is-invalid:focus {
      border-color: var(--ls-input-error-border);
      box-shadow: 0 0 0 0.2rem var(--ls-input-error-ring);
    }

    .ls-input.is-valid {
      border-color: var(--ls-success-500);
    }

    .ls-input.is-valid:focus {
      border-color: var(--ls-success-500);
      box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.1);
    }

    .ls-form-text {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: var(--ls-gray-600);
    }

    .ls-invalid-feedback {
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: var(--ls-error-600);
    }

    .ls-valid-feedback {
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: var(--ls-success-600);
    }

    /* Size variants */
    .ls-input-sm {
      padding: 0.375rem 0.5rem;
      font-size: 0.75rem;
    }

    .ls-input-lg {
      padding: 0.75rem 1rem;
      font-size: 1rem;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.placeholder = "";
    this.type = "text";
    this.value = "";
    this.name = "";
    this.helperText = "";
    this.errorText = "";
    this.validText = "";
    this.required = false;
    this.disabled = false;
    this.invalid = false;
    this.valid = false;
    this.size = ""; // sm, lg
    this.showLabel = true;
    this.hxPost = "";
    this.hxGet = "";
    this.hxTrigger = "";
    this.hxTarget = "";
    this.hxInclude = "";
    this.focused = false;
  }

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      type: { type: String },
      value: { type: String },
      name: { type: String },
      helperText: { type: String },
      errorText: { type: String },
      validText: { type: String },
      required: { type: Boolean },
      disabled: { type: Boolean },
      invalid: { type: Boolean },
      valid: { type: Boolean },
      size: { type: String },
      showLabel: { type: Boolean },
      hxPost: { type: String },
      hxGet: { type: String },
      hxTrigger: { type: String },
      hxTarget: { type: String },
      hxInclude: { type: String },
      focused: { type: Boolean, state: true },
    };
  }

  handleInput(e) {
    const input = e.target;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this.value },
        bubbles: true,
      })
    );
  }

  handleFocus() {
    this.focused = true;
    this.dispatchEvent(new CustomEvent("focus", { bubbles: true }));
  }

  handleBlur() {
    this.focused = false;
    this.dispatchEvent(new CustomEvent("blur", { bubbles: true }));
  }

  render() {
    const inputClasses = [
      "ls-input",
      this.size ? `ls-input-${this.size}` : "",
      this.invalid ? "is-invalid" : "",
      this.valid ? "is-valid" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const labelClasses = ["ls-form-label", this.required ? "required" : ""]
      .filter(Boolean)
      .join(" ");

    return html`
      <div class="ls-form-group">
        ${this.showLabel && this.label
          ? html`
              <label class="${labelClasses}" for="${this.name || "input"}">
                ${this.label}
              </label>
            `
          : ""}

        <input
          id="${this.name || "input"}"
          type="${this.type}"
          class="${inputClasses}"
          placeholder="${this.placeholder}"
          .value="${this.value}"
          name="${this.name}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @input="${this.handleInput}"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          ${this.hxPost ? `hx-post="${this.hxPost}"` : ""}
          ${this.hxGet ? `hx-get="${this.hxGet}"` : ""}
          ${this.hxTrigger ? `hx-trigger="${this.hxTrigger}"` : ""}
          ${this.hxTarget ? `hx-target="${this.hxTarget}"` : ""}
          ${this.hxInclude ? `hx-include="${this.hxInclude}"` : ""}
        />

        ${this.helperText
          ? html` <div class="ls-form-text">${this.helperText}</div> `
          : ""}
        ${this.invalid && this.errorText
          ? html` <div class="ls-invalid-feedback">${this.errorText}</div> `
          : ""}
        ${this.valid && this.validText
          ? html` <div class="ls-valid-feedback">${this.validText}</div> `
          : ""}
      </div>
    `;
  }
}
