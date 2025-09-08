# 🎨 Lokstra Design System

## 📖 Overview

Lokstra menggunakan **Design Token System** yang powerful dan fleksibel, memungkinkan:

- ✅ **Component Encapsulation** - Setiap komponen mengelola styling sendiri
- ✅ **Global Consistency** - Shared design tokens untuk konsistensi
- ✅ **Theme Variations** - Multiple theme support (dark, colors, spacing, accessibility)
- ✅ **Maintainability** - Single source of truth untuk design decisions

## 🏗️ Architecture Philosophy

### **Hybrid Approach: The Best of Both Worlds**

```
┌─────────────────────────────────────────────────────────────┐
│                    THEME.CSS (Global Design System)         │
│  🎨 Design Tokens: colors, spacing, typography, animation   │
│  🌈 Theme Variations: dark, ocean, forest, compact, etc     │
│  🎯 Foundation Layer: Reusable across all components        │
└─────────────────────────────────────────────────────────────┘
                              ↓ (provides tokens)
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENTS (Encapsulated)                 │
│  🧩 Self-contained: All styling within component           │
│  🔗 Token-aware: Uses global tokens with fallbacks        │
│  🎨 Theme-responsive: Responds to global theme changes     │
│  📦 Portable: Can work standalone with fallback values     │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Design Tokens Reference

### **🎨 Color Tokens**

```css
/* Foundation Colors */
--ls-primary-600: #2563eb;
--ls-gray-900: #111827;
--ls-success-600: #059669;
--ls-error-600: #dc2626;
--ls-warning-600: #d97706;

/* Usage in Components */
.my-component {
  background: var(--ls-primary-600, #2563eb);  /* With fallback */
  color: var(--ls-gray-100, #f9fafb);
}
```

### **📐 Spatial Tokens**

```css
/* Spacing Scale */
--ls-spacing-xs: 0.25rem;   /* 4px */
--ls-spacing-sm: 0.5rem;    /* 8px */
--ls-spacing-md: 0.75rem;   /* 12px */
--ls-spacing-lg: 1rem;      /* 16px */
--ls-spacing-xl: 1.5rem;    /* 24px */
--ls-spacing-2xl: 2rem;     /* 32px */

/* Size Scale */
--ls-size-xs: 1rem;         /* 16px */
--ls-size-lg: 2.5rem;       /* 40px */

/* Usage */
.component {
  padding: var(--ls-spacing-lg);
  margin: var(--ls-spacing-md) var(--ls-spacing-lg);
  width: var(--ls-size-xl);
}
```

### **🔤 Typography Tokens**

```css
/* Font Sizes */
--ls-font-size-xs: 0.75rem;   /* 12px */
--ls-font-size-sm: 0.875rem;  /* 14px */
--ls-font-size-md: 1rem;      /* 16px */
--ls-font-size-lg: 1.125rem;  /* 18px */

/* Font Weights */
--ls-font-weight-normal: 400;
--ls-font-weight-medium: 500;
--ls-font-weight-semibold: 600;
--ls-font-weight-bold: 700;

/* Line Heights */
--ls-line-height-tight: 1.25;
--ls-line-height-normal: 1.5;
--ls-line-height-relaxed: 1.75;
```

### **🌀 Border & Shadow Tokens**

```css
/* Border Radius */
--ls-radius-sm: 0.25rem;    /* 4px */
--ls-radius-md: 0.5rem;     /* 8px */
--ls-radius-lg: 0.75rem;    /* 12px */
--ls-radius-full: 9999px;   /* Fully rounded */

/* Shadows */
--ls-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--ls-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--ls-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

### **⏱️ Animation Tokens**

```css
/* Duration */
--ls-duration-fast: 150ms;
--ls-duration-normal: 300ms;
--ls-duration-slow: 500ms;

/* Easing */
--ls-ease-in: cubic-bezier(0.4, 0, 1, 1);
--ls-ease-out: cubic-bezier(0, 0, 0.2, 1);
--ls-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Usage */
.component {
  transition: all var(--ls-duration-normal) var(--ls-ease-in-out);
}
```

## 🌈 Theme Variations

### **🌙 Dark Theme**
```css
.theme-dark, [data-theme="dark"] {
  --ls-gray-900: #ffffff;  /* Inverted for dark */
  --ls-gray-50: #1f2937;
}
```

### **🎨 Color Themes**
```css
.theme-ocean { --ls-primary-600: #0891b2; }      /* Cyan */
.theme-forest { --ls-primary-600: #059669; }     /* Emerald */
.theme-sunset { --ls-primary-600: #ea580c; }     /* Orange */
.theme-royal { --ls-primary-600: #7c3aed; }      /* Violet */
```

### **📐 Spacing Themes**
```css
.theme-compact {
  --ls-spacing-lg: 0.75rem;  /* Reduced spacing */
  --ls-font-size-md: 0.875rem;
}

.theme-spacious {
  --ls-spacing-lg: 1.5rem;   /* Increased spacing */
  --ls-font-size-md: 1.125rem;
}
```

### **♿ Accessibility Themes**
```css
.theme-high-contrast {
  --ls-gray-900: #000000;
  --ls-primary-600: #0000ff;
}

.theme-large-text {
  --ls-font-size-sm: 1rem;
  --ls-font-size-md: 1.125rem;
}
```

## 🧩 Component Implementation

### **Best Practice: Token-Aware Components**

```css
/* ✅ GOOD: Using design tokens with fallbacks */
:host {
  /* Component variables using design tokens */
  --component-bg: var(--ls-gray-900, #111827);
  --component-text: var(--ls-gray-100, #f9fafb);
  --component-padding: var(--ls-spacing-lg, 1rem);
  --component-radius: var(--ls-radius-md, 0.5rem);
  
  /* Styling using component variables */
  background: var(--component-bg);
  color: var(--component-text);
  padding: var(--component-padding);
  border-radius: var(--component-radius);
  
  /* Animation using design tokens */
  transition: all var(--ls-duration-normal, 300ms) var(--ls-ease-in-out);
}

/* Theme responsiveness */
:host([data-theme="dark"]) {
  --component-bg: var(--ls-gray-800, #1f2937);
}
```

## 📱 Usage Examples

### **1. Theme Switching**
```html
<!-- Theme attributes -->
<body data-theme="dark">
<body data-theme="ocean">
<body class="theme-compact">

<!-- JavaScript -->
<script>
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
  }
</script>
```

### **2. Component with Multiple Tokens**
```css
.card {
  /* Layout using spatial tokens */
  padding: var(--ls-spacing-lg);
  margin: var(--ls-spacing-md);
  gap: var(--ls-spacing-sm);
  
  /* Visual using design tokens */
  background: var(--ls-gray-50);
  border: 1px solid var(--ls-gray-200);
  border-radius: var(--ls-radius-lg);
  box-shadow: var(--ls-shadow-md);
  
  /* Typography using font tokens */
  font-size: var(--ls-font-size-md);
  font-weight: var(--ls-font-weight-medium);
  line-height: var(--ls-line-height-normal);
  
  /* Animation using timing tokens */
  transition: all var(--ls-duration-fast) var(--ls-ease-out);
}
```

### **3. Responsive Design with Tokens**
```css
.responsive-component {
  font-size: var(--ls-font-size-sm);
  padding: var(--ls-spacing-md);
}

@media (min-width: 768px) {
  .responsive-component {
    font-size: var(--ls-font-size-md);
    padding: var(--ls-spacing-lg);
  }
}
```

## 🎯 Benefits

### **✅ For Developers**
- **Consistency**: All components use same design language
- **Efficiency**: No need to remember specific values
- **Flexibility**: Easy theme switching and customization
- **Maintainability**: Change tokens in one place, affects everywhere

### **✅ For Users**
- **Accessibility**: High contrast, large text themes
- **Personalization**: Multiple color and spacing preferences
- **Performance**: CSS variables are fast and efficient
- **Consistency**: Uniform experience across all components

### **✅ For Design System**
- **Scalability**: Easy to add new tokens and themes
- **Governance**: Centralized design decisions
- **Evolution**: Tokens can evolve without breaking components
- **Documentation**: Self-documenting through naming

## 🚀 Getting Started

1. **Use existing tokens** from `theme.css`
2. **Create component variables** using tokens with fallbacks
3. **Test with multiple themes** to ensure responsiveness
4. **Document custom tokens** if creating new components

**Demo**: Lihat `docs/theme-system-demo.html` untuk interactive demo dari semua fitur theme system.
