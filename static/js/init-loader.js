// Loader for reusable scripts (importmap, theme, htmx, alpine, lucide, preline, etc)

// Import map for Lit and related packages
if (!window.__importMapInjected) {
  const importMap = document.createElement("script")
  importMap.type = "importmap"
  importMap.textContent = JSON.stringify({
    imports: {
      lit: "https://unpkg.com/lit@3.0.0/index.js",
      "lit/": "https://unpkg.com/lit@3.0.0/",
      "lit-html": "https://unpkg.com/lit-html@3.0.0/lit-html.js",
      "lit-html/": "https://unpkg.com/lit-html@3.0.0/",
      "lit-element": "https://unpkg.com/lit-element@4.0.0/lit-element.js",
      "lit-element/": "https://unpkg.com/lit-element@4.0.0/",
      "@lit/reactive-element":
        "https://unpkg.com/@lit/reactive-element@2.0.0/reactive-element.js",
      "@lit/reactive-element/":
        "https://unpkg.com/@lit/reactive-element@2.0.0/",
      "@lit/decorators":
        "https://unpkg.com/@lit/decorators@2.0.0/decorators.js",
      "@lit/decorators/": "https://unpkg.com/@lit/decorators@2.0.0/",
    },
  })
  document.head.prepend(importMap)
  window.__importMapInjected = true
}

// Alpine.js
// if (!window.Alpine) {
//   const alpineScript = document.createElement("script")
//   alpineScript.defer = true
//   alpineScript.src = "https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
//   document.head.appendChild(alpineScript)
// }

// HTMX
if (!window.htmx) {
  const htmxScript = document.createElement("script")
  htmxScript.src = "https://unpkg.com/htmx.org@2.0.6"
  document.head.appendChild(htmxScript)
}

// Theme manager
if (!window.__themeManagerInjected) {
  const themeScript = document.createElement("script")
  themeScript.src = "/static/js/theme-manager.js"
  document.head.appendChild(themeScript)
  window.__themeManagerInjected = true
}

// Lucide
if (!window.lucide) {
  const lucideScript = document.createElement("script")
  lucideScript.src = "https://unpkg.com/lucide@0.294.0/dist/umd/lucide.js"
  document.head.appendChild(lucideScript)
}

// Preline
// if (!window.HSStaticMethods) {
//   const prelineScript = document.createElement("script")
//   prelineScript.src = "https://unpkg.com/preline@3.2.3/dist/preline.js"
//   document.head.appendChild(prelineScript)
// }

// Lokstra Web Components
if (!window.__lokstraComponentsInjected) {
  const wcScript = document.createElement("script")
  wcScript.type = "module"
  wcScript.src = "/components/register-all.js"
  document.head.appendChild(wcScript)
  window.__lokstraComponentsInjected = true
}
