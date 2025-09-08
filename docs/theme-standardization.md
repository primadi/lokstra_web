# 🎨 Theme System - Standardized `data-theme` Approach

## 🎯 **STANDARDIZATION COMPLETED**

✅ **Single Theme Approach:** Semua theme sekarang menggunakan **`data-theme` attribute** untuk consistency dan modern best practices.

---

## 📋 **Available Themes**

### **🌙 Dark Mode**
```html
<body data-theme="dark">
```

### **🎨 Color Themes**
```html
<body data-theme="ocean">    <!-- Cyan primary -->
<body data-theme="forest">   <!-- Emerald primary -->
<body data-theme="sunset">   <!-- Orange primary -->
<body data-theme="royal">    <!-- Violet primary -->
```

### **📐 Spacing Themes**
```html
<body data-theme="compact">   <!-- Reduced spacing -->
<body data-theme="spacious">  <!-- Increased spacing -->
```

### **♿ Accessibility Themes**
```html
<body data-theme="high-contrast">  <!-- High contrast colors -->
<body data-theme="large-text">     <!-- Larger font sizes -->
```

---

## 🔄 **Theme Switching JavaScript**

### **Simple Theme Switch:**
```javascript
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  // Optionally save to localStorage
  localStorage.setItem('theme', theme);
}

// Usage
setTheme('dark');
setTheme('ocean');
setTheme('compact');
```

### **Theme Toggle (Light/Dark):**
```javascript
function toggleDarkMode() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? null : 'dark';
  
  if (newTheme) {
    document.body.setAttribute('data-theme', newTheme);
  } else {
    document.body.removeAttribute('data-theme');
  }
  
  localStorage.setItem('theme', newTheme || 'light');
}
```

### **Advanced Theme Management:**
```javascript
class ThemeManager {
  constructor() {
    this.loadSavedTheme();
  }
  
  setTheme(theme) {
    if (theme === 'light' || theme === null) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme || 'light');
    this.dispatchThemeChange(theme);
  }
  
  getTheme() {
    return document.body.getAttribute('data-theme') || 'light';
  }
  
  loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'light') {
      this.setTheme(savedTheme);
    }
  }
  
  dispatchThemeChange(theme) {
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
}

// Usage
const themeManager = new ThemeManager();
themeManager.setTheme('dark');
```

---

## 🧩 **Component Integration**

### **Components automatically respond to theme changes:**
```css
/* Components use data-theme selectors */
:host([data-theme="dark"]) {
  --component-bg: var(--ls-gray-800);
  --component-text: var(--ls-gray-100);
}

:host([data-theme="ocean"]) {
  --component-accent: var(--ls-primary-600); /* Ocean cyan */
}
```

### **Theme-Aware Styling:**
```html
<!-- Components inherit theme from body -->
<body data-theme="dark">
  <ls-button variant="primary">Automatically dark themed</ls-button>
  <ls-card>Dark themed card</ls-card>
</body>
```

---

## 🌈 **Multiple Theme Combinations**

### **Combining Color + Spacing Themes:**
```javascript
// Apply multiple theme aspects
function setComplexTheme(color, spacing) {
  const themes = [];
  if (color) themes.push(color);
  if (spacing) themes.push(spacing);
  
  document.body.setAttribute('data-theme', themes.join(' '));
}

// Usage
setComplexTheme('dark ocean', 'compact');
setComplexTheme('sunset', 'spacious');
```

### **CSS Multi-Theme Support:**
```css
/* Multiple data-theme values */
[data-theme~="dark"] { /* Dark theme tokens */ }
[data-theme~="ocean"] { /* Ocean color scheme */ }
[data-theme~="compact"] { /* Compact spacing */ }
```

---

## 🎛️ **Theme Switcher Component Example**

```html
<div class="theme-switcher">
  <label>Theme:</label>
  <select onchange="setTheme(this.value)">
    <option value="">Light (Default)</option>
    <option value="dark">Dark</option>
    <option value="ocean">Ocean</option>
    <option value="forest">Forest</option>
    <option value="sunset">Sunset</option>
    <option value="royal">Royal</option>
  </select>
  
  <label>Spacing:</label>
  <select onchange="setSpacingTheme(this.value)">
    <option value="">Default</option>
    <option value="compact">Compact</option>
    <option value="spacious">Spacious</option>
  </select>
  
  <label>Accessibility:</label>
  <select onchange="setA11yTheme(this.value)">
    <option value="">Default</option>
    <option value="high-contrast">High Contrast</option>
    <option value="large-text">Large Text</option>
  </select>
</div>

<script>
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
}

function setSpacingTheme(spacing) {
  const current = document.body.getAttribute('data-theme') || '';
  const themes = current.split(' ').filter(t => !['compact', 'spacious'].includes(t));
  if (spacing) themes.push(spacing);
  document.body.setAttribute('data-theme', themes.join(' ').trim());
}

function setA11yTheme(a11y) {
  const current = document.body.getAttribute('data-theme') || '';
  const themes = current.split(' ').filter(t => !['high-contrast', 'large-text'].includes(t));
  if (a11y) themes.push(a11y);
  document.body.setAttribute('data-theme', themes.join(' ').trim());
}
</script>
```

---

## ✅ **Benefits of Standardization**

### **🔄 Consistency:**
- **Single approach** untuk semua theme switching
- **Predictable behavior** di seluruh aplikasi
- **Easy debugging** dengan consistent selectors

### **🚀 Performance:**
- **Reduced CSS size** tanpa duplicate selectors
- **Faster parsing** dengan attribute selectors
- **Better caching** dengan consistent patterns

### **👨‍💻 Developer Experience:**
- **Clear convention** untuk team development
- **Easy to remember** satu cara theme switching
- **Better IDE support** untuk attribute-based selectors

### **♿ Accessibility:**
- **Standard approach** yang familiar untuk screen readers
- **Semantic meaning** via data attributes
- **Better integration** dengan accessibility tools

---

## 🎯 **Migration Guide**

### **OLD (Mixed approaches):**
```html
<!-- Before: Mixed class and attribute -->
<body class="theme-dark theme-compact">
<body data-theme="ocean" class="theme-spacious">
```

### **NEW (Standardized):**
```html
<!-- After: Pure data-theme attribute -->
<body data-theme="dark">
<body data-theme="ocean compact">
<body data-theme="dark high-contrast">
```

### **JavaScript Update:**
```javascript
// OLD
document.body.classList.add('theme-dark');
document.body.classList.remove('theme-dark');

// NEW
document.body.setAttribute('data-theme', 'dark');
document.body.removeAttribute('data-theme');
```

---

## 🎉 **Standardization Complete!**

**Result:** Clean, consistent, modern theme system menggunakan **`data-theme` attribute** approach exclusively! 🚀
