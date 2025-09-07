// Utility for rendering Lucide icons in Shadow DOM (Lit, Web Components, etc)

/**
 * Convert kebab-case to PascalCase
 * @param {string} str
 * @returns {string}
 */
export function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Render Lucide icons manually in a root (shadowRoot or element)
 * @param {ShadowRoot|Element} root - The root to search for <i data-lucide>
 * @param {object} lucide - The lucide icon library (usually window.lucide)
 */
export function createIconsManually(root, lucide = window.lucide) {
  if (!root || !lucide) return;
  const iconsToCreate = root.querySelectorAll(
    "i[data-lucide]:not(.manual-created)"
  );
  iconsToCreate.forEach((iconElement) => {
    const iconName = iconElement.getAttribute("data-lucide");
    const pascalName = toPascalCase(iconName);
    const iconData = lucide[iconName] || lucide[pascalName];
    if (iconData) {
      try {
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("data-lucide", iconName);
        svg.classList.add("manual-created");
        if (iconData && iconData.length >= 3) {
          const svgContent = iconData[2]
            .map((child) => {
              if (Array.isArray(child)) {
                return `<${child[0]} ${Object.entries(child[1] || {})
                  .map(([k, v]) => `${k}="${v}"`)
                  .join(" ")}>${child[2] || ""}</${child[0]}>`;
              }
              return child;
            })
            .join("");
          svg.innerHTML = svgContent;
        }
        iconElement.parentNode.replaceChild(svg, iconElement);
      } catch (error) {
        console.warn(`Lucide: Failed to create icon ${iconName}:`, error);
      }
    }
  });
}
