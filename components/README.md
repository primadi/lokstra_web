# 🧩 Lokstra Components - Clean Architecture

## 🎯 **ARCHITECTURE CLEANUP COMPLETED**

✅ **Clean Separation Achieved:**
- **`theme.css`** → **Design tokens & theme variations ONLY**
- **Component files** → **Complete self-contained styling**  
- **No cross-contamination** → **Single responsibility per file**

---

## 📁 Clean Component Structure

```
components/
├── theme.css                    # 🎨 DESIGN TOKENS ONLY
│                               #     Colors, spacing, typography tokens
│                               #     Theme variations (dark, accessibility)
│                               #     NO component styling
├── forms/                       # 📝 Form components
│   ├── ls-button.css           #     Complete button styling + tokens
│   └── ls-input.css            #     Complete input/form styling + tokens
├── layout/                      # 📐 Layout components  
│   └── ls-card.css             #     Complete card styling + tokens
├── navigation/                  # 🧭 Navigation components
│   └── ls-sidebar.js           #     Sidebar component (uses tokens)
└── utilities/                   # 🛠️ Utility classes
    └── ls-utilities.css        #     Spacing, typography, responsive utilities
```

## ✅ What Was Cleaned Up

### **BEFORE (Mixed Responsibilities):**
```css
/* theme.css was cluttered with component styles */
:root { --ls-primary-600: #2563eb; }

.ls-btn { padding: 0.75rem 1rem; } /* ❌ Component styling in theme */
.ls-input { border: 1px solid; }   /* ❌ Component styling in theme */
.ls-card { box-shadow: ...; }      /* ❌ Component styling in theme */
/* Hard to maintain, unclear separation */
```

### **AFTER (Clean Separation):**
```css
/* theme.css: PURE design tokens */
:root {
  --ls-primary-600: #2563eb;
  --ls-spacing-lg: 1rem;
  /* ONLY tokens and theme variations */
}

/* components/forms/ls-button.css: Complete button */
:host {
  --button-bg: var(--ls-primary-600, #2563eb);
  background: var(--button-bg);
  /* Self-contained with token usage */
}
```

---

## 🎨 Pure Design Token System

### **`theme.css` Now Contains ONLY:**

#### **🎨 Color Tokens**
```css
--ls-primary-600: #2563eb;    /* Blue-600 */
--ls-gray-900: #111827;       /* Near black */
--ls-error-600: #dc2626;      /* Red-600 */
--ls-success-600: #059669;    /* Emerald-600 */
```

#### **📐 Spatial Tokens**  
```css
--ls-spacing-xs: 0.25rem;     /* 4px */
--ls-spacing-lg: 1rem;        /* 16px */
--ls-spacing-2xl: 2rem;       /* 32px */
```

#### **🔤 Typography Tokens**
```css
--ls-font-size-sm: 0.875rem;  /* 14px */
--ls-font-weight-medium: 500;
--ls-line-height-normal: 1.5;
```

#### **🌈 Theme Variations**
```css
.theme-dark { --ls-gray-900: #ffffff; }
.theme-ocean { --ls-primary-600: #0891b2; }
.theme-high-contrast { --ls-primary-600: #0000ff; }
```

---

## 🧩 Self-Contained Components

### **Component Pattern:**
```css
/* Each component file is complete */
:host {
  /* Component variables using design tokens */
  --component-bg: var(--ls-gray-50, #f9fafb);
  --component-text: var(--ls-gray-900, #111827);
  --component-padding: var(--ls-spacing-lg, 1rem);
  
  /* Component styling */
  background: var(--component-bg);
  color: var(--component-text);
  padding: var(--component-padding);
}

/* Theme responsiveness */
:host([data-theme="dark"]) {
  --component-bg: var(--ls-gray-800, #1f2937);
}
```

### **Available Component Files:**

#### **📝 `forms/ls-button.css`**
- Complete button component styling
- Size variants: sm, lg
- Color variants: primary, secondary, outline, danger, success
- States: hover, active, disabled, loading
- Theme responsive

#### **📝 `forms/ls-input.css`**  
- Complete input/form styling
- Input, textarea, select support
- Validation states: error, success
- Form groups, labels, feedback
- Theme responsive

#### **🎴 `layout/ls-card.css`**
- Complete card component
- Variants: elevated, outlined, flat, interactive
- Size variants: sm, lg
- Status indicators: error, warning, success
- Theme responsive

#### **🛠️ `utilities/ls-utilities.css`**
- Atomic utility classes
- Spacing: `.ls-p-lg`, `.ls-m-md`
- Typography: `.ls-text-lg`, `.ls-font-bold`
- Layout: `.ls-d-flex`, `.ls-justify-center`
- All using design tokens

---

## 🔗 Usage Examples

### **1. Import Component Styles**
```html
<!-- In web component -->
<style>
  @import url('./components/forms/ls-button.css');
</style>

<!-- In main CSS -->
@import url('./components/forms/ls-button.css');
@import url('./components/layout/ls-card.css');
@import url('./components/utilities/ls-utilities.css');
```

### **2. Web Component Usage**
```html
<!-- Component attributes -->
<ls-button variant="primary" size="lg">Click me</ls-button>
<ls-input state="error" size="sm" placeholder="Enter text"></ls-input>
<ls-card variant="elevated" status="success">Card content</ls-card>
```

### **3. Utility Class Usage**
```html
<!-- Quick styling with utilities -->
<div class="ls-p-lg ls-rounded-md ls-bg-primary ls-text-white ls-d-flex">
  Styled with design token utilities
</div>
```

### **4. Theme Switching**
```javascript
// Global theme change affects all components
document.body.setAttribute('data-theme', 'dark');
document.body.classList.add('theme-ocean');
document.body.classList.add('theme-compact');
```

---

## 📈 Benefits Achieved

### **✅ For Developers:**
- **Clear Separation**: Know exactly where to find component styles
- **Easy Maintenance**: Update components independently
- **No Conflicts**: Clean file boundaries prevent CSS collisions
- **Scalable**: Add new components without polluting theme.css

### **✅ For Components:**
- **Self-Contained**: All styling within component file
- **Token-Aware**: Automatic theme responsiveness
- **Fallback Safe**: Work even without theme.css loaded
- **Performance**: Only load needed component styles

### **✅ For Design System:**
- **Pure Tokens**: theme.css is single source of design truth
- **Consistent Theming**: All components use same token foundation
- **Easy Customization**: Change tokens → all components update
- **Clear Architecture**: Obvious file responsibilities

---

## 🚀 Migration Guide

### **Old Global Classes → New Component Files**

#### **Buttons:**
```html
<!-- OLD: Global classes from theme.css -->
<button class="ls-btn ls-btn-primary">Old way</button>

<!-- NEW: Component file or web component -->
<ls-button variant="primary">New way</ls-button>
<!-- OR -->
<button class="ls-btn ls-btn-primary">Still works via ls-button.css</button>
```

#### **Inputs:**
```html
<!-- OLD: Global classes -->
<input class="ls-input">

<!-- NEW: Component file -->
<ls-input placeholder="Enter text"></ls-input>
<!-- OR -->
<input class="ls-input"> <!-- Via ls-input.css -->
```

### **Import New Component Styles:**
```css
/* Add to your main CSS */
@import url('./components/forms/ls-button.css');
@import url('./components/forms/ls-input.css');
@import url('./components/layout/ls-card.css');
@import url('./components/utilities/ls-utilities.css');
```

---

## 📚 Documentation

- **[Design System Guide](../docs/design-system.md)** - Complete token reference
- **[Component Implementation](../docs/component-guide.md)** - Step-by-step guide
- **[Theme Demo](../docs/theme-system-demo.html)** - Interactive showcase

---

## 🎉 Architecture Success

**Clean separation achieved!** Every file now has a single, clear responsibility:

- **`theme.css`** = Design tokens only
- **`components/*.css`** = Complete component styling  
- **`utilities/*.css`** = Utility classes
- **`navigation/*.js`** = Web components

**Result:** Maintainable, scalable, and clean component architecture! 🚀

## Tech Stack

- **Lit Framework 3.0.0** - Web components library tanpa TypeScript decorators
- **Preline UI 3.2.3** - Design system dan component library yang konsisten
- **Alpine.js 3.x.x** - Reactive JavaScript framework untuk interaktivitas
- **HTMX 2.0.6** - Server-side rendering dengan partial page updates
- **Lucide Icons (latest)** - SVG icon system dengan data-lucide attributes

## Struktur Folder

```
components/
├── forms/          # Form-related components
│   ├── ls-input.js      # Text input dengan Preline styling
│   ├── ls-button.js     # Button dengan berbagai variant
│   ├── register.js      # Component registration
│   └── example.html     # Demo dan contoh penggunaan
├── data/           # Data display components  
│   └── ls-table.js      # Advanced table dengan sorting, pagination, selection
├── navigation/     # Navigation components
│   └── ls-sidebar.js    # Responsive sidebar navigation
├── layout/         # Layout components
│   ├── ls-layout.js     # Page layout dengan header, sidebar, footer
│   └── ls-card.js       # Card component dengan berbagai variant
├── feedback/       # User feedback components
│   ├── ls-modal.js      # Modal dialog dengan animations
│   └── ls-alert.js      # Alert/notification dengan auto-hide
└── theme.css       # Global CSS variables dengan Preline integration
```

## Fitur Utama

### 1. **Lit Web Components**
Components dibuat menggunakan Lit framework sebagai native web components yang dapat digunakan di framework apa pun atau vanilla HTML.

### 2. **Preline UI Integration**
Menggunakan Preline UI classes untuk styling yang konsisten dan modern:
```css
/* Preline classes terintegrasi dalam components */
.hs-input, .hs-button, .hs-card, .hs-modal, .hs-alert
```

### 3. **Alpine.js Reactive State**
Components mendukung Alpine.js untuk state management dan interaktivitas:
```html
<ls-table x-data="{ selectedRows: [], sortBy: 'name' }"></ls-table>
```

### 4. **HTMX Integration** 
Components mendukung HTMX attributes untuk server-side rendering:
```html
<ls-button hx-post="/api/submit" hx-target="#result"></ls-button>
```

### 5. **Lucide Icons**
Menggunakan Lucide icons dengan data-lucide attributes:
```html
<ls-button icon="plus" text="Add Item"></ls-button>
```

### 6. **CSS Variables Theming**
Theming menggunakan CSS custom properties yang dapat di-override:
```css
:root {
  --ls-primary-600: #3b82f6;
  --ls-gray-100: #f3f4f6;
}
```

## Penggunaan

### 1. Setup
```html
<!DOCTYPE html>
<html>
<head>
    <!-- tailwind.css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css">

    
    <!-- Include theme CSS dengan Preline integration -->
    <link rel="stylesheet" href="components/theme.css">
    
    <!-- Include Lit library -->
    <script type="module" src="https://unpkg.com/lit@3.0.0/index.js"></script>
    
    <!-- Include Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <!-- Include HTMX -->
    <script src="https://unpkg.com/htmx.org@2.0.6/dist/htmx.min.js"></script>
    
    <!-- Include Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    
    <!-- Include Preline JavaScript -->
    <script src="https://unpkg.com/preline@3.2.3/dist/preline.js"></script>
    
    <!-- Register components -->
    <script type="module" src="components/forms/register.js"></script>
</head>
<body>
    <!-- Your app content -->
</body>
</html>
```

### 2. Basic Usage
```html
<!-- Input component -->
<ls-input 
    label="Email Address" 
    type="email" 
    placeholder="Enter your email"
    required
></ls-input>

<!-- Button component -->
<ls-button 
    text="Submit" 
    variant="primary"
    size="md"
    icon="send"
></ls-button>

<!-- Card component -->
<ls-card 
    title="User Profile"
    subtitle="Manage your account settings"
    variant="default"
    size="md"
>
    <p>Card content goes here</p>
</ls-card>
```

### 3. HTMX Integration
```html
<ls-button 
    text="Load Data" 
    hx-get="/api/data"
    hx-target="#result"
    hx-trigger="click"
    icon="refresh-cw"
></ls-button>

<ls-input 
    label="Search"
    hx-post="/api/search"
    hx-trigger="keyup changed delay:500ms"
    hx-target="#search-results"
    icon="search"
></ls-input>

<ls-table 
    hx-get="/api/users"
    hx-target="this"
    hx-trigger="load"
></ls-table>
```

### 4. Alpine.js Integration
```html
<div x-data="{ users: [], loading: false }">
    <ls-button 
        text="Load Users"
        :loading="loading"
        @click="loading = true; $refs.table.refresh()"
    ></ls-button>
    
    <ls-table 
        x-ref="table"
        :data="users"
        selectable
        @table-select-row="console.log('Row selected:', $event.detail)"
    ></ls-table>
</div>
```

### 5. Modal Usage
```html
<ls-modal 
    title="Confirm Delete"
    size="sm"
    :open="showModal"
    :actions="[
        { text: 'Cancel', variant: 'outline' },
        { text: 'Delete', variant: 'danger', action: 'delete' }
    ]"
    @modal-action="handleModalAction($event.detail)"
>
    <p>Are you sure you want to delete this item?</p>
</ls-modal>
```

### 4. Theme Switching
```javascript
// Switch to dark theme
document.body.classList.add('theme-dark');

// Switch to custom primary theme
document.body.classList.add('theme-primary');

// Reset to default theme
document.body.className = '';
```

## Available Components

### Forms (`/forms`)

#### **ls-input** - Text input dengan Preline styling
**Properties:**
- `label` (string) - Label text
- `type` (string) - Input type: text, email, password, number, etc.
- `placeholder` (string) - Placeholder text  
- `value` (string) - Input value
- `required` (boolean) - Required validation
- `disabled` (boolean) - Disabled state
- `error` (string) - Error message
- `success` (string) - Success message
- `icon` (string) - Lucide icon name
- `variant` (string) - Styling variant: default, floating

**Events:** `input`, `focus`, `blur`, `change`

#### **ls-button** - Button dengan loading states dan berbagai variant
**Properties:**
- `text` (string) - Button text
- `variant` (string) - Variants: primary, secondary, outline, danger, success, warning
- `size` (string) - Sizes: sm, md, lg
- `disabled` (boolean) - Disabled state
- `loading` (boolean) - Loading state dengan spinner
- `type` (string) - Button type: button, submit, reset
- `icon` (string) - Lucide icon name

**Events:** `click`

### Data (`/data`)

#### **ls-table** - Advanced table dengan sorting, pagination, selection
**Properties:**
- `columns` (array) - Column definitions dengan sortable, template, actions
- `data` (array) - Table data
- `sortBy` (string) - Current sort column
- `sortDir` (string) - Sort direction: asc, desc
- `selectable` (boolean) - Enable row selection
- `loading` (boolean) - Loading state
- `pagination` (object) - Pagination config
- `actions` (array) - Row actions

**Events:** `table-sort`, `table-select-row`, `table-select-all`, `table-action`, `table-page-change`

### Navigation (`/navigation`)

#### **ls-sidebar** - Responsive sidebar navigation
**Properties:**
- `items` (array) - Navigation items dengan icon, text, url
- `collapsed` (boolean) - Collapsed state
- `brand` (object) - Brand logo dan text
- `footer` (object) - Footer content

**Events:** `sidebar-toggle`, `nav-click`

### Layout (`/layout`)

#### **ls-layout** - Page layout dengan header, sidebar, footer
**Properties:**
- `pageTitle` (string) - Page title
- `pageSubtitle` (string) - Page subtitle  
- `breadcrumb` (array) - Breadcrumb items
- `pageActions` (array) - Page action buttons
- `showFooter` (boolean) - Show footer
- `footerText` (string) - Footer text
- `maxWidth` (string) - Content max width

**Events:** `breadcrumb-click`, `page-action`, `sidebar-toggle`

#### **ls-card** - Card component dengan berbagai variant
**Properties:**
- `title` (string) - Card title
- `subtitle` (string) - Card subtitle
- `variant` (string) - Variants: default, outlined, elevated, flat
- `size` (string) - Sizes: sm, md, lg  
- `interactive` (boolean) - Interactive hover effects
- `expandable` (boolean) - Expandable content
- `status` (string) - Status indicator: active, inactive, pending
- `actions` (array) - Header action buttons

**Events:** `card-click`, `card-toggle`, `card-action`

### Feedback (`/feedback`)

#### **ls-modal** - Modal dialog dengan animations
**Properties:**
- `open` (boolean) - Open/close state
- `title` (string) - Modal title
- `size` (string) - Sizes: sm, md, lg, xl, full
- `showHeader` (boolean) - Show header
- `showFooter` (boolean) - Show footer
- `actions` (array) - Footer action buttons
- `dismissOnOverlay` (boolean) - Dismiss on overlay click
- `dismissOnEscape` (boolean) - Dismiss on escape key

**Events:** `modal-open`, `modal-close`, `modal-action`

#### **ls-alert** - Alert/notification dengan auto-hide
**Properties:**
- `variant` (string) - Variants: info, success, warning, error
- `title` (string) - Alert title
- `message` (string) - Alert message
- `dismissible` (boolean) - Show dismiss button
- `autoHide` (boolean) - Auto hide after duration
- `autoHideDuration` (number) - Auto hide duration in ms
- `actions` (array) - Alert action buttons

**Events:** `alert-dismissed`, `alert-action`

## Theme Variables

### Global Colors (Preline Compatible)
```css
/* Primary Colors */
--ls-primary-50: #eff6ff;
--ls-primary-100: #dbeafe; 
--ls-primary-600: #2563eb;
--ls-primary-700: #1d4ed8;

/* Gray Colors */
--ls-gray-50: #f9fafb;
--ls-gray-100: #f3f4f6;
--ls-gray-600: #4b5563;
--ls-gray-900: #111827;

/* Status Colors */
--ls-success-100: #dcfce7;
--ls-success-600: #16a34a;
--ls-error-100: #fee2e2;
--ls-error-600: #dc2626;
--ls-warning-100: #fef3c7;
--ls-warning-600: #d97706;
```

### Component Variables
```css
/* Card */
--ls-card-bg: white;
--ls-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--ls-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

/* Input */
--ls-input-bg: white;
--ls-input-border: #d1d5db;
--ls-border-radius: 0.375rem;
--ls-border-radius-lg: 0.5rem;

/* Button */
--ls-btn-primary-bg: var(--ls-primary-600);
--ls-btn-primary-hover: var(--ls-primary-700);
```

### Dark Theme Override
```css
.theme-dark {
  --ls-card-bg: #1f2937;
  --ls-input-bg: #374151;
  --ls-gray-900: #f9fafb;
  --ls-gray-100: #374151;
}
```

## Events

Components dispatch standard DOM events yang dapat di-listen:

```javascript
// Listen to input changes
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'LS-INPUT') {
        console.log('Input value:', e.detail.value);
    }
});

// Listen to button clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'LS-BUTTON') {
        console.log('Button clicked:', e.target.text);
    }
});

// Listen to table events
document.addEventListener('table-sort', (e) => {
    console.log('Table sorted:', e.detail);
});

// Listen to modal events
document.addEventListener('modal-action', (e) => {
    console.log('Modal action:', e.detail.action);
});

// Listen to card events
document.addEventListener('card-action', (e) => {
    console.log('Card action:', e.detail.action);
});
```

## HTMX Integration Examples

### Form Submission
```html
<form hx-post="/api/users" hx-target="#result">
    <ls-input label="Name" name="name" required></ls-input>
    <ls-input label="Email" name="email" type="email" required></ls-input>
    <ls-button text="Save User" type="submit" icon="save"></ls-button>
</form>
```

### Dynamic Table Loading
```html
<ls-table 
    hx-get="/api/users"
    hx-trigger="load, refresh from:body"
    hx-target="this"
    hx-swap="outerHTML"
></ls-table>
```

### Search with Debouncing
```html
<ls-input 
    label="Search Users"
    hx-post="/api/search"
    hx-trigger="keyup changed delay:500ms"
    hx-target="#search-results"
    icon="search"
></ls-input>
```

## Alpine.js Integration Examples

### Reactive Table
```html
<div x-data="{ 
    users: [], 
    loading: false,
    selectedRows: [] 
}">
    <ls-button 
        text="Refresh"
        :loading="loading"
        @click="loading = true; htmx.trigger('#users-table', 'refresh')"
        icon="refresh-cw"
    ></ls-button>
    
    <ls-table 
        id="users-table"
        :data="users"
        selectable
        @table-select-row="selectedRows = $event.detail.selectedRows"
        hx-get="/api/users"
        hx-target="this"
    ></ls-table>
    
    <p x-show="selectedRows.length > 0">
        Selected: <span x-text="selectedRows.length"></span> rows
    </p>
</div>
```

### Modal Management
```html
<div x-data="{ 
    showModal: false,
    modalTitle: '',
    modalAction: null 
}">
    <ls-button 
        text="Delete Item"
        variant="danger"
        @click="showModal = true; modalTitle = 'Confirm Delete'"
        icon="trash-2"
    ></ls-button>
    
    <ls-modal 
        :open="showModal"
        :title="modalTitle"
        size="sm"
        @modal-close="showModal = false"
        @modal-action="if($event.detail.action === 'confirm') deleteItem()"
    >
        <p>Are you sure you want to delete this item?</p>
    </ls-modal>
</div>
```

## Browser Support

Components mendukung browser modern dengan:
- ES6+ JavaScript features
- Web Components APIs (Custom Elements, Shadow DOM)
- CSS Custom Properties
- ES Modules

## Quick Start

### 1. Include All Dependencies
```html
    <!-- tailwind.css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css">


<!-- Lokstra Theme CSS -->
<link rel="stylesheet" href="components/theme.css">

<!-- JavaScript Libraries -->
<script type="module" src="https://unpkg.com/lit@3.0.0/index.js"></script>
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script src="https://unpkg.com/htmx.org@2.0.6/dist/htmx.min.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script src="https://unpkg.com/preline@3.2.3/dist/preline.js"></script>

<!-- Register All Components -->
<script type="module" src="components/register-all.js"></script>
```

### 2. Start Using Components
```html
<ls-layout 
    page-title="Dashboard"
    page-subtitle="Welcome to your dashboard"
    :breadcrumb="[
        { title: 'Home', url: '/' },
        { title: 'Dashboard', active: true }
    ]"
>
    <ls-sidebar slot="sidebar" :items="navItems"></ls-sidebar>
    
    <ls-card title="User Stats" size="lg">
        <ls-table :columns="columns" :data="users"></ls-table>
    </ls-card>
</ls-layout>
```

## Demo

Lihat **`demo.html`** untuk demo lengkap semua components dengan contoh penggunaan:
- Semua variants dan sizes
- HTMX integration examples  
- Alpine.js reactive examples
- Theme switching
- Event handling

Buka `components/demo.html` di browser untuk melihat demo interaktif.

## File Structure

```
components/
├── demo.html              # Complete interactive demo
├── register-all.js        # Register all components
├── theme.css             # Preline-compatible theme
├── README.md             # This documentation
├── forms/
│   ├── ls-input.js
│   ├── ls-button.js
│   └── register.js
├── data/
│   └── ls-table.js
├── navigation/
│   └── ls-sidebar.js
├── layout/
│   ├── ls-card.js
│   └── ls-layout.js
└── feedback/
    ├── ls-alert.js
    └── ls-modal.js
```

## Changelog

### Latest Updates
- **Dependencies Updated** (January 2025):
  - HTMX: 1.9.0 → **2.0.6** (latest stable)
  - Preline UI: 2.0.0 → **3.2.3** (latest stable)
  - Improved compatibility and performance
  - All CDN links updated to latest versions
