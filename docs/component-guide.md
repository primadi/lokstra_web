# 🛠️ Component Implementation Guide

## 📋 Quick Checklist

Ketika membuat atau memperbarui component, pastikan:

- [ ] **Menggunakan design tokens** dengan fallback values
- [ ] **Component variables** menggunakan prefix `--component-*`
- [ ] **Responsif terhadap themes** dark/light dan color variations
- [ ] **Accessible** mendukung high contrast dan large text themes
- [ ] **Performance** tidak ada layout shifts saat theme change

## 🏗️ Component Template

### **Standard Component Structure**

```css
/* Component: ls-[component-name] */
:host {
  /* === COMPONENT VARIABLES (using design tokens) === */
  
  /* Colors */
  --component-bg: var(--ls-gray-50, #f9fafb);
  --component-text: var(--ls-gray-900, #111827);
  --component-border: var(--ls-gray-200, #e5e7eb);
  --component-accent: var(--ls-primary-600, #2563eb);
  
  /* Spacing */
  --component-padding-x: var(--ls-spacing-lg, 1rem);
  --component-padding-y: var(--ls-spacing-md, 0.75rem);
  --component-gap: var(--ls-spacing-sm, 0.5rem);
  
  /* Typography */
  --component-font-size: var(--ls-font-size-md, 1rem);
  --component-font-weight: var(--ls-font-weight-medium, 500);
  --component-line-height: var(--ls-line-height-normal, 1.5);
  
  /* Visual */
  --component-radius: var(--ls-radius-md, 0.5rem);
  --component-shadow: var(--ls-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  
  /* Animation */
  --component-transition: all var(--ls-duration-normal, 300ms) var(--ls-ease-in-out);
  
  /* === COMPONENT STYLING === */
  display: block;
  background: var(--component-bg);
  color: var(--component-text);
  border: 1px solid var(--component-border);
  border-radius: var(--component-radius);
  padding: var(--component-padding-y) var(--component-padding-x);
  font-size: var(--component-font-size);
  font-weight: var(--component-font-weight);
  line-height: var(--component-line-height);
  box-shadow: var(--component-shadow);
  transition: var(--component-transition);
}

/* === THEME RESPONSIVENESS === */

/* Dark theme support */
:host([data-theme="dark"]) {
  --component-bg: var(--ls-gray-800, #1f2937);
  --component-text: var(--ls-gray-100, #f9fafb);
  --component-border: var(--ls-gray-700, #374151);
}

/* Color theme support */
:host([data-theme="ocean"]) {
  --component-accent: var(--ls-primary-600, #0891b2);
}

/* High contrast theme support */
:host([data-theme="high-contrast"]) {
  --component-bg: #ffffff;
  --component-text: #000000;
  --component-border: #000000;
  --component-accent: #0000ff;
}

/* === STATES === */
:host(:hover) {
  --component-bg: var(--ls-gray-100, #f3f4f6);
  --component-shadow: var(--ls-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}

:host(:focus) {
  outline: 2px solid var(--component-accent);
  outline-offset: 2px;
}

:host([disabled]) {
  --component-bg: var(--ls-gray-200, #e5e7eb);
  --component-text: var(--ls-gray-400, #9ca3af);
  cursor: not-allowed;
}
```

## 🎯 Real Example: Button Component

```css
/* === ls-button.css === */
:host {
  /* Button-specific variables */
  --button-bg: var(--ls-primary-600, #2563eb);
  --button-text: var(--ls-white, #ffffff);
  --button-padding-x: var(--ls-spacing-xl, 1.5rem);
  --button-padding-y: var(--ls-spacing-md, 0.75rem);
  --button-radius: var(--ls-radius-md, 0.5rem);
  --button-font-size: var(--ls-font-size-md, 1rem);
  --button-font-weight: var(--ls-font-weight-semibold, 600);
  --button-transition: all var(--ls-duration-fast, 150ms) var(--ls-ease-out);
  
  /* Base styling */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ls-spacing-sm, 0.5rem);
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: var(--button-radius);
  padding: var(--button-padding-y) var(--button-padding-x);
  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  cursor: pointer;
  transition: var(--button-transition);
}

/* Variants */
:host([variant="secondary"]) {
  --button-bg: transparent;
  --button-text: var(--ls-primary-600, #2563eb);
  border: 1px solid var(--ls-primary-600, #2563eb);
}

:host([variant="danger"]) {
  --button-bg: var(--ls-error-600, #dc2626);
}

/* Size variants */
:host([size="sm"]) {
  --button-padding-x: var(--ls-spacing-lg, 1rem);
  --button-padding-y: var(--ls-spacing-sm, 0.5rem);
  --button-font-size: var(--ls-font-size-sm, 0.875rem);
}

:host([size="lg"]) {
  --button-padding-x: var(--ls-spacing-2xl, 2rem);
  --button-padding-y: var(--ls-spacing-lg, 1rem);
  --button-font-size: var(--ls-font-size-lg, 1.125rem);
}

/* States */
:host(:hover:not([disabled])) {
  transform: translateY(-1px);
  box-shadow: var(--ls-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
}

:host(:active:not([disabled])) {
  transform: translateY(0);
}

:host([disabled]) {
  --button-bg: var(--ls-gray-300, #d1d5db);
  --button-text: var(--ls-gray-500, #6b7280);
  cursor: not-allowed;
  transform: none;
}

/* Theme responsiveness */
:host([data-theme="dark"]) {
  --button-bg: var(--ls-primary-500, #3b82f6);
}

:host([data-theme="dark"][variant="secondary"]) {
  --button-text: var(--ls-primary-400, #60a5fa);
  border-color: var(--ls-primary-400, #60a5fa);
}
```

## 🎨 JavaScript Integration

```javascript
// === ls-button.js ===
class LsButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupThemeObserver();
  }
  
  setupThemeObserver() {
    // Listen for theme changes on document
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'data-theme' || 
             mutation.attributeName === 'class')) {
          this.updateTheme();
        }
      });
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });
  }
  
  updateTheme() {
    const bodyTheme = document.body.getAttribute('data-theme') || 
                     document.body.className;
    this.setAttribute('data-theme', bodyTheme);
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Import component CSS */
        @import './components/ls-button.css';
      </style>
      <button part="button">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ls-button', LsButton);
```

## 📱 Usage Examples

### **HTML Usage**
```html
<!-- Basic button -->
<ls-button>Click me</ls-button>

<!-- Variants -->
<ls-button variant="secondary">Secondary</ls-button>
<ls-button variant="danger">Delete</ls-button>

<!-- Sizes -->
<ls-button size="sm">Small</ls-button>
<ls-button size="lg">Large</ls-button>

<!-- States -->
<ls-button disabled>Disabled</ls-button>
```

### **Theme Switching**
```javascript
// Global theme change affects all components
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  // All components with theme responsiveness will update automatically
}

// Individual component theme
const button = document.querySelector('ls-button');
button.setAttribute('data-theme', 'ocean');
```

## 🔍 Testing Checklist

### **✅ Visual Testing**
```css
/* Test each theme variation */
.test-themes {
  display: grid;
  gap: var(--ls-spacing-lg);
}

.theme-test[data-theme="light"] { /* Default */ }
.theme-test[data-theme="dark"] { /* Dark mode */ }
.theme-test[data-theme="ocean"] { /* Color theme */ }
.theme-test[data-theme="high-contrast"] { /* Accessibility */ }
```

### **✅ Accessibility Testing**
- [ ] High contrast theme works
- [ ] Large text theme increases readability
- [ ] Focus indicators visible in all themes
- [ ] Color contrast ratios meet WCAG standards

### **✅ Performance Testing**
- [ ] No layout shifts during theme changes
- [ ] Smooth transitions
- [ ] CSS variables update efficiently

## 🚀 Migration Guide

### **Converting Existing Components**

**Before (hardcoded values):**
```css
.old-component {
  background: #f9fafb;
  color: #111827;
  padding: 16px;
  border-radius: 8px;
}
```

**After (design tokens):**
```css
:host {
  --component-bg: var(--ls-gray-50, #f9fafb);
  --component-text: var(--ls-gray-900, #111827);
  --component-padding: var(--ls-spacing-lg, 1rem);
  --component-radius: var(--ls-radius-md, 0.5rem);
  
  background: var(--component-bg);
  color: var(--component-text);
  padding: var(--component-padding);
  border-radius: var(--component-radius);
}
```

**Migration Steps:**
1. Identify hardcoded values
2. Map to appropriate design tokens
3. Add component variables with fallbacks
4. Add theme responsiveness
5. Test with all theme variations

## 💡 Pro Tips

### **✅ DO**
- Always provide fallback values
- Use semantic naming for component variables
- Test with all theme variations
- Group related tokens logically
- Document custom tokens

### **❌ DON'T**
- Don't use hardcoded values in components
- Don't create too many component variants
- Don't forget accessibility themes
- Don't ignore performance implications
- Don't break encapsulation with global selectors

### **🎯 Best Practices**
1. **Component variables** should use design tokens as source
2. **Fallback values** ensure component works standalone
3. **Theme attributes** on :host for responsiveness
4. **Consistent naming** follows `--component-property` pattern
5. **Performance first** - avoid expensive calculations in CSS
