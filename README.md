# 🚀 Lokstra Web Framework

Modern, lightweight web framework with **encapsulated components** and **comprehensive design system**.

## ✨ Key Features

- 🧩 **Component-First Architecture** - Encapsulated, reusable web components
- 🎨 **Design Token System** - Powerful theming with global consistency
- 🌙 **Multi-Theme Support** - Dark mode, color themes, accessibility variants
- ⚡ **Performance Optimized** - CSS variables for fast theme switching
- ♿ **Accessibility Ready** - High contrast and large text themes built-in
- 📱 **Responsive Design** - Mobile-first with flexible spacing system

## 🏗️ Architecture

### **Hybrid Design System Approach**

```
🎨 Global Design Tokens (theme.css)
   ↓ provides foundation
🧩 Encapsulated Components (self-contained)
   ↓ composes into
📱 Application (consistent & flexible)
```

**Benefits:**
- ✅ **Component Independence** - Each component works standalone
- ✅ **Global Consistency** - Shared design language through tokens
- ✅ **Theme Flexibility** - Easy customization and theme switching
- ✅ **Maintainability** - Single source of truth for design decisions

## 🎯 Quick Start

### **1. Using Design Tokens**

```css
/* Component styling with design tokens */
:host {
  background: var(--ls-gray-50, #f9fafb);      /* With fallback */
  color: var(--ls-gray-900, #111827);
  padding: var(--ls-spacing-lg, 1rem);
  border-radius: var(--ls-radius-md, 0.5rem);
  transition: all var(--ls-duration-normal, 300ms);
}
```

### **2. Theme Switching**

```html
<!-- Change themes globally -->
<body data-theme="dark">         <!-- Dark mode -->
<body data-theme="ocean">        <!-- Ocean color theme -->
<body class="theme-compact">     <!-- Compact spacing -->
<body class="theme-high-contrast"> <!-- Accessibility -->
```

### **3. Creating Components**

```javascript
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          --component-bg: var(--ls-primary-600, #2563eb);
          background: var(--component-bg);
          padding: var(--ls-spacing-md, 0.75rem);
        }
      </style>
      <div>Themed Component</div>
    `;
  }
}
```

## 📁 Project Structure

```
lokstra_web/
├── components/           # Encapsulated web components
│   ├── ls-sidebar.js    # Sidebar component with theme support
│   └── [other-components]
├── static/
│   ├── theme.css        # 🎨 Global design system & tokens
│   ├── dashboard.css    # Application-specific styles
│   └── scrollbar.css    # Custom scrollbar styling
├── templates/           # HTML templates
├── docs/               # 📚 Documentation
│   ├── design-system.md     # Complete design system guide
│   ├── component-guide.md   # Component implementation guide
│   └── theme-system-demo.html # Interactive demo
└── cmd/examples/       # Example applications
```

## 🎨 Design System

### **Available Themes**

| Theme | Description | Usage |
|-------|-------------|-------|
| **default** | Light theme with blue primary | Default |
| **dark** | Dark mode variant | `data-theme="dark"` |
| **ocean** | Cyan-based color theme | `data-theme="ocean"` |
| **forest** | Green-based theme | `data-theme="forest"` |
| **sunset** | Orange-based theme | `data-theme="sunset"` |
| **royal** | Purple-based theme | `data-theme="royal"` |
| **compact** | Reduced spacing | `class="theme-compact"` |
| **spacious** | Increased spacing | `class="theme-spacious"` |
| **high-contrast** | Accessibility theme | `class="theme-high-contrast"` |
| **large-text** | Larger font sizes | `class="theme-large-text"` |

### **Design Token Categories**

- 🎨 **Colors**: Primary, gray, status colors with full scales
- 📐 **Spacing**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl (4px → 48px)
- 🔤 **Typography**: Font sizes, weights, line heights
- 🔲 **Borders**: Border radius, shadow variations
- ⏱️ **Animation**: Duration and easing functions

## 📚 Documentation

- **[Design System Guide](docs/design-system.md)** - Complete token reference and architecture
- **[Component Implementation](docs/component-guide.md)** - Step-by-step component creation
- **[Live Demo](docs/theme-system-demo.html)** - Interactive theme system showcase

## 🛠️ Development

### **Philosophy**

1. **Component Encapsulation** - Each component manages its own styling
2. **Design Token Foundation** - Global tokens provide consistency
3. **Theme Responsiveness** - Components adapt to theme changes
4. **Performance First** - CSS variables enable fast updates
5. **Accessibility Built-in** - Multiple accessibility themes

### **Best Practices**

- ✅ Always use design tokens with fallbacks
- ✅ Create component variables using token foundation
- ✅ Test with all theme variations
- ✅ Support accessibility themes
- ✅ Document custom tokens

### **Example Implementation**

```css
/* Component following best practices */
:host {
  /* Component variables using design tokens */
  --card-bg: var(--ls-gray-50, #f9fafb);
  --card-text: var(--ls-gray-900, #111827);
  --card-padding: var(--ls-spacing-lg, 1rem);
  --card-radius: var(--ls-radius-lg, 0.75rem);
  --card-shadow: var(--ls-shadow-md, 0 4px 6px rgba(0,0,0,0.1));
  
  /* Component styling */
  background: var(--card-bg);
  color: var(--card-text);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

/* Theme responsiveness */
:host([data-theme="dark"]) {
  --card-bg: var(--ls-gray-800, #1f2937);
  --card-text: var(--ls-gray-100, #f9fafb);
}
```

## 🎯 Why This Architecture?

### **Problem Solved**
- ❌ **Before**: Global CSS conflicts, inconsistent theming, hard to maintain
- ✅ **After**: Encapsulated components with shared design language

### **Benefits Achieved**
- 🧩 **Modularity**: Components work independently
- 🎨 **Consistency**: Shared design tokens ensure uniformity
- 🌈 **Flexibility**: Easy theme creation and switching
- ♿ **Accessibility**: Built-in support for various needs
- 🚀 **Performance**: CSS variables for fast theme updates
- 📈 **Scalability**: New components easily integrate

## 🤝 Contributing

1. Follow the [Component Guide](docs/component-guide.md)
2. Use design tokens from [Design System](docs/design-system.md)
3. Test with multiple themes
4. Ensure accessibility compliance
5. Document new tokens or patterns

---

**Built with ❤️ by the Lokstra team**
