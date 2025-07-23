const iconGrid = document.getElementById("iconGrid");
const searchInput = document.getElementById("searchInput");
let icons = [];

async function loadIcons() {
    try {
        const response = await fetch('./fonts/fonts-list.json');
        icons = await response.json();
        renderIcons();
    } catch (err) {
        console.error('Failed to load icons.json', err);
    }
}

function renderIcons(filter = "") {
    iconGrid.innerHTML = "";
    const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(filter.toLowerCase()));

    filteredIcons.forEach(icon => {
        const div = document.createElement("div");
        const iconName = icon.replace(/_/g, ' ');
        const iconLabel = iconName.charAt(0).toUpperCase() + iconName.slice(1);
        div.className = "icon-item";
        div.dataset.icon = icon;
        div.innerHTML = `
      <span class="tooltip">Copied!</span>
      <span class="material-symbols-rounded">${icon}</span>
      <div class="icon-label">${iconLabel}</div>
    `;
        div.addEventListener("click", () => {
            navigator.clipboard.writeText(icon);
            // navigator.clipboard.writeText(`<span class="material-symbols-rounded">${icon}</span>`);
            div.classList.add("show-tooltip");
            setTimeout(() => div.classList.remove("show-tooltip"), 1000);
        });
        iconGrid.appendChild(div);
    });
}

searchInput.addEventListener("input", () => {
    renderIcons(searchInput.value);
});

// Load icons.json then render
loadIcons();
