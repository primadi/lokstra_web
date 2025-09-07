# Lokstra Theme Architecture

## Current Implementation (Recommended)

### Theme Switching Method
```css
/* Light theme (default) */
:root {
    --ls-bg-primary: #c0d0df;
    --ls-text-primary: #2c3e50;
    /* ... other variables */
}

/* Dark theme */
[data-theme="dark"] {
    --ls-bg-primary: #111827;
    --ls-text-primary: #f9fafb;
    /* ... other variables */
}
```

### Component Usage
```css
.component {
    background-color: var(--ls-bg-primary);
    color: var(--ls-text-primary);
}
```

### JavaScript Control
```javascript
// Switch theme by changing data attribute
document.documentElement.setAttribute('data-theme', 'dark');
```

## Why This Approach is Optimal

### ✅ Advantages of CSS Variables:
1. **Single Source of Truth** - All theme values centralized
2. **Performance** - No DOM manipulation needed for theme changes
3. **Flexibility** - Easy to add new themes (blue, green, etc.)
4. **Real-time Updates** - Instant theme switching
5. **Maintainability** - Easy to debug and modify

### ❌ Problems with Class-based Theming:
1. **Multiple Sources** - Theme values scattered across classes
2. **Performance** - Requires DOM manipulation to add/remove classes
3. **Complexity** - Hard to maintain consistent theming
4. **Limited Flexibility** - Difficult to add new themes

## Implementation Guidelines

### 1. Define All Theme Variables
```css
:root {
    /* Colors */
    --ls-bg-primary: #c0d0df;
    --ls-bg-secondary: #d4e2f0;
    --ls-text-primary: #2c3e50;
    --ls-text-muted: #5a6b7c;
    
    /* Spacing */
    --ls-spacing-sm: 0.5rem;
    --ls-spacing-md: 1rem;
    
    /* Shadows */
    --ls-shadow-md: 0 2px 6px -1px rgba(44, 62, 80, 0.15);
}
```

### 2. Use Variables Consistently
```css
.component {
    background: var(--ls-bg-primary);
    padding: var(--ls-spacing-md);
    box-shadow: var(--ls-shadow-md);
}
```

### 3. Theme Switching
```javascript
// Light theme
document.documentElement.setAttribute('data-theme', 'light');

// Dark theme  
document.documentElement.setAttribute('data-theme', 'dark');
```

## Current Status: ✅ OPTIMAL

Your current implementation is already following best practices:
- Uses CSS variables for all theming
- Single `data-theme` attribute for switching
- Centralized theme management
- No unnecessary class-based theming

**Recommendation: Keep the current approach** - it's already optimal and follows modern CSS theming patterns.
