# Lokstra Dashboard Example

This example demonstrates a complete dashboard layout using the Lokstra web framework with Lit web components and HTMX for dynamic content loading.

## Features

- **Responsive Dashboard Layout**: Header, sidebar, content area, and footer
- **Web Components**: Using Lit framework with `ls-` prefix for consistency
- **HTMX Integration**: Partial content loading without page refreshes
- **CSS Variables Theming**: Global theme system with dark/light modes
- **Lucide Icons**: SVG icon system with data-lucide attributes
- **Mobile Responsive**: Collapsible sidebar with mobile overlay

## Quick Start

1. **Navigate to the dashboard example**:
   ```bash
   cd cmd/examples/dashboard
   ```

2. **Run the server**:
   ```bash
   go run main.go
   ```

3. **Open your browser**:
   ```
   http://localhost:8080
   ```

## Project Structure

```
lokstra_web/
├── components/                  # Web Components Library
│   ├── theme.css               # Global CSS variables and theming
│   ├── forms/                  # Form components (input, button, etc.)
│   │   ├── ls-input.js
│   │   ├── ls-button.js
│   │   └── register.js         # Component registration
│   └── navigation/             # Navigation components
│       ├── ls-sidebar.js
│       ├── ls-navbar.js
│       └── register.js         # Component registration
├── templates/                  # HTML Templates
│   ├── layouts/               # Layout templates
│   │   └── dashboard.html     # Main dashboard layout
│   ├── pages/                 # Full page templates
│   │   └── users.html         # Users management page
│   └── partials/              # Partial templates for HTMX
│       └── users-table.html   # Users table partial
└── cmd/examples/dashboard/     # Dashboard example
    └── main.go                # Go server implementation
```

## Component System

### Using Web Components

All components use the `ls-` prefix and are built with Lit framework:

```html
<!-- Button Component -->
<ls-button text="Save" variant="primary" size="medium"></ls-button>

<!-- Input Component -->
<ls-input placeholder="Enter text" label="Name" required></ls-input>

<!-- With HTMX Integration -->
<ls-button 
    text="Load Users" 
    variant="outline"
    hx-get="/api/users"
    hx-target="#content">
</ls-button>
```

### Available Components

#### Forms
- `ls-input`: Text input with validation and theming
- `ls-button`: Button with variants, sizes, and states

#### Navigation
- `ls-sidebar`: Responsive sidebar with collapsible menu groups
- `ls-navbar`: Top navigation with breadcrumbs and user menu

### Theming System

The framework uses CSS variables for consistent theming:

```css
:root {
    --ls-primary-50: #eff6ff;
    --ls-primary-500: #3b82f6;
    --ls-primary-900: #1e3a8a;
    /* ... more variables */
}

/* Dark theme */
.theme-dark {
    --ls-gray-50: #1f2937;
    --ls-gray-900: #f9fafb;
}
```

Switch themes programmatically:
```javascript
// Apply dark theme
document.body.classList.add('theme-dark');

// Remove theme (back to light)
document.body.classList.remove('theme-dark');
```

## HTMX Integration

### Partial Content Loading

The dashboard uses HTMX for seamless content updates:

```html
<!-- Navigation with HTMX -->
<ls-button 
    text="Users" 
    hx-get="/users" 
    hx-target="#pageContent">
</ls-button>

<!-- Search with live results -->
<ls-input 
    placeholder="Search users..."
    hx-get="/users/search"
    hx-trigger="keyup changed delay:300ms"
    hx-target="#usersTable">
</ls-input>
```

### Server Response

The Go server detects HTMX requests and returns appropriate content:

```go
func usersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("HX-Request") == "true" {
        // Return partial content for HTMX
        tmpl, _ := template.ParseFiles("templates/pages/users.html")
        tmpl.Execute(w, data)
        return
    }
    // Handle full page request
    http.Redirect(w, r, "/#users", http.StatusSeeOther)
}
```

## Layout Structure

### Dashboard Layout

The main dashboard layout consists of:

1. **Header (ls-navbar)**: 
   - Breadcrumb navigation
   - Search functionality
   - User menu and notifications

2. **Sidebar (ls-sidebar)**:
   - Collapsible navigation menu
   - Menu groups with submenu support
   - Mobile responsive with overlay

3. **Content Area**:
   - Dynamic content loading via HTMX
   - Page headers and actions
   - Statistics cards and content grids

4. **Footer**:
   - Simple footer with branding

### Responsive Behavior

- **Desktop (>768px)**: Sidebar collapses/expands in place
- **Mobile (≤768px)**: Sidebar slides over content with overlay
- **All screen sizes**: Content area adapts fluidly

## API Endpoints

The example server provides these endpoints:

- `GET /`: Main dashboard
- `GET /users`: Users management page
- `GET /api/users`: Users table data (partial)
- `GET /api/activity`: Recent activity data (partial)
- `GET /analytics`: Analytics page (partial)
- `GET /projects`: Projects page (partial)
- `GET /settings`: Settings page (partial)

## Customization

### Adding New Components

1. Create component file in appropriate folder:
   ```javascript
   // components/forms/ls-select.js
   import { LitElement, html, css } from 'lit';
   
   class LSSelect extends LitElement {
       // Component implementation
   }
   
   customElements.define('ls-select', LSSelect);
   ```

2. Register in the appropriate register.js file:
   ```javascript
   // components/forms/register.js
   import './ls-select.js';
   ```

### Styling Components

Use CSS variables for consistent theming:

```javascript
static styles = css`
    :host {
        --component-bg: var(--ls-gray-50);
        --component-border: var(--ls-gray-300);
        --component-text: var(--ls-gray-900);
    }
    
    .component {
        background-color: var(--component-bg);
        border: 1px solid var(--component-border);
        color: var(--component-text);
    }
`;
```

### Adding New Pages

1. Create page template:
   ```html
   <!-- templates/pages/analytics.html -->
   <div class="page-header">
       <h1 class="page-title">Analytics</h1>
   </div>
   <!-- Page content -->
   ```

2. Add route handler:
   ```go
   func analyticsHandler(w http.ResponseWriter, r *http.Request) {
       tmpl, _ := template.ParseFiles("templates/pages/analytics.html")
       tmpl.Execute(w, data)
   }
   ```

3. Add navigation menu item:
   ```javascript
   const menuItems = [
       {
           title: 'Analytics',
           items: [
               { 
                   key: 'analytics', 
                   title: 'Overview', 
                   icon: 'bar-chart',
                   hxGet: '/analytics',
                   hxTarget: '#pageContent'
               }
           ]
       }
   ];
   ```

## Performance Notes

- **No Build Process**: Components work directly in the browser
- **Lazy Loading**: Components are loaded on demand
- **Efficient Updates**: HTMX updates only changed content
- **Small Footprint**: Minimal JavaScript dependencies

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Web Components**: Native support required
- **ES Modules**: Native support required
- **CSS Variables**: Native support required

## Next Steps

1. **Add Form Validation**: Extend input components with validation
2. **Create More Components**: Tables, modals, dropdowns, etc.
3. **Add State Management**: For complex component interactions
4. **Implement WebSockets**: For real-time updates
5. **Add Testing**: Unit and integration tests for components

This dashboard system provides a solid foundation for building modern web applications with Go backend and web components frontend, without the complexity of build tools or heavy frameworks.
