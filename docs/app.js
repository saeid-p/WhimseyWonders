/**
 * Whimsy Wonders Studio — Nursery & Kids Room Gallery Controller
 * --------------------------------------------------------------
 * Loads catalog items from 'items.json', groups them by collection,
 * provides live filtering/search, cycles secondary photos via dots,
 * and opens each item's Etsy listing in a new tab.
 */

// Base URL of your Etsy storefront (used if an item doesn't specify a full shopUrl)
const SHOP_BASE_URL = "https://whimsywondersteam.etsy.com";

// Fallback sample catalog matching your real Etsy shop sections for instant previewing
const FALLBACK_CATALOG = [
  {
    "name": "Astronaut Giraffe Wall Decor",
    "image": "https://i.etsystatic.com/59544034/r/il/a14e19/8726672352/il_1588xN.8726672352_5hty.jpg",
    "images": [
      "https://i.etsystatic.com/59544034/r/il/a14e19/8726672352/il_1588xN.8726672352_5hty.jpg",
      "https://i.etsystatic.com/59544034/r/il/4bd29f/8726672730/il_1588xN.8726672730_5v3v.jpg"
    ],
    "category": "Adventure Beyond",
    "shopUrl": "https://www.etsy.com/listing/4357854848/astronaut-giraffe-wall-decor-handmade"
  },
  {
    "name": "Astronaut Boy Space Explorer Wall Art",
    "image": "https://i.etsystatic.com/59544034/r/il/4bd29f/8726672730/il_1588xN.8726672730_5v3v.jpg",
    "category": "Adventure Beyond",
    "shopUrl": "https://www.etsy.com/listing/4369048721/astronaut-boy-wall-decor-handmade-space"
  },
  {
    "name": "Donkey Astronaut on a Cloud Wall Hanging",
    "image": "https://placehold.co/800x800/E8F5F8/3A2E2A?text=Donkey+Astronaut+Cloud",
    "category": "Adventure Beyond",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Lion Astronaut Animal Nursery Art",
    "image": "https://placehold.co/800x800/FEF3D6/3A2E2A?text=Lion+Astronaut+Decor",
    "category": "Adventure Beyond",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Sleeping Bear Woodland Nursery Wall Art",
    "image": "https://i.etsystatic.com/59544034/r/il/4ebef6/8726672250/il_1588xN.8726672250_2g3g.jpg",
    "images": [
      "https://i.etsystatic.com/59544034/r/il/4ebef6/8726672250/il_1588xN.8726672250_2g3g.jpg",
      "https://i.etsystatic.com/59544034/r/il/7fbc64/8726672588/il_1588xN.8726672588_49hl.jpg"
    ],
    "category": "Lullaby Land",
    "shopUrl": "https://www.etsy.com/listing/4360767792/sleeping-bear-wall-decor-handmade"
  },
  {
    "name": "Sleeping Lamb Figurine Sheep Wall Art",
    "image": "https://placehold.co/800x800/F7F1E5/3A2E2A?text=Sleeping+Lamb+Decor",
    "category": "Lullaby Land",
    "shopUrl": "https://www.etsy.com/listing/4338357579/sleeping-lamb-wall-decor-handmade-sheep"
  },
  {
    "name": "Sleeping Unicorn Magical Kids Wall Hanging",
    "image": "https://placehold.co/800x800/FCECE7/3A2E2A?text=Sleeping+Unicorn+Art",
    "category": "Lullaby Land",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Wooden Donkey Piggy Bank",
    "image": "https://placehold.co/800x800/F7F1E5/3A2E2A?text=Wooden+Donkey+Piggy+Bank",
    "category": "Piggy Banks",
    "shopUrl": "https://www.etsy.com/listing/4360254196/donkey-piggy-bank-wooden-decor-handmade"
  },
  {
    "name": "Penguin Wooden Piggy Bank",
    "image": "https://placehold.co/800x800/E8F5F8/3A2E2A?text=Penguin+Piggy+Bank",
    "category": "Piggy Banks",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Lamb Black & Cream Wooden Money Bank",
    "image": "https://placehold.co/800x800/FEF3D6/3A2E2A?text=Lamb+Piggy+Bank",
    "category": "Piggy Banks",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Elephant Figurine Nursery Name Sign",
    "image": "https://i.etsystatic.com/59544034/r/il/7fbc64/8726672588/il_1588xN.8726672588_49hl.jpg",
    "category": "Safari Smile",
    "shopUrl": "https://www.etsy.com/listing/4338314391/elephant-wall-decor-handmade-animal"
  },
  {
    "name": "Animal Train Jungle Wall Art with Name Flag",
    "image": "https://placehold.co/800x800/EAF2EB/3A2E2A?text=Jungle+Animal+Train",
    "category": "Safari Smile",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Smiling Sleepy Sun Nursery Wall Hanging",
    "image": "https://placehold.co/800x800/FEF3D6/3A2E2A?text=Smiling+Sleepy+Sun",
    "category": "Starry Snooze",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Smiley Cloud & Crescent Moon Wall Art",
    "image": "https://placehold.co/800x800/E8F5F8/3A2E2A?text=Smiley+Cloud+%26+Moon",
    "category": "Starry Snooze",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Brontosaurus Dad Dinosaur Wall Decor",
    "image": "https://placehold.co/800x800/EAF2EB/3A2E2A?text=Brontosaurus+Dad+Dino",
    "category": "Cuddle-Saurus",
    "shopUrl": "https://www.etsy.com/listing/4369177732/brontosaurus-dad-dinosaur-wall-decor"
  },
  {
    "name": "Brontosaurus & T-Rex Hatchlings Dino Art",
    "image": "https://placehold.co/800x800/EAF2EB/3A2E2A?text=Dino+Hatchlings+Decor",
    "category": "Cuddle-Saurus",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Layered Wood Psalm 139:14 Christian Wall Art",
    "image": "https://placehold.co/800x800/FCECE7/3A2E2A?text=Psalm+139%3A14+Plaque",
    "category": "Angelic Dreams",
    "shopUrl": "https://www.etsy.com/listing/4396176281/beautifully-made-sign-christian-faith"
  },
  {
    "name": "Painted Wood Angel Girl & Boy Nursery Plaques",
    "image": "https://placehold.co/800x800/FEF3D6/3A2E2A?text=Angel+Nursery+Plaque",
    "category": "Angelic Dreams",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  },
  {
    "name": "Breakdance Custom Painted Kids Name Sign",
    "image": "https://placehold.co/800x800/E8F5F8/3A2E2A?text=Breakdance+Name+Sign",
    "category": "Frames & Arts",
    "shopUrl": "https://www.etsy.com/listing/4446315930/custom-breakdance-name-sign-for-kids"
  },
  {
    "name": "Layered Wood Mountain Forest Landscape Art",
    "image": "https://placehold.co/800x800/EAF2EB/3A2E2A?text=Mountain+Forest+Art",
    "category": "Frames & Arts",
    "shopUrl": "https://whimsywondersteam.etsy.com"
  }
];

// Application State
const state = {
  items: [],
  activeCategory: "All",
  searchQuery: "",
  groupByCategory: true
};

// DOM References
const elements = {
  catalogMount: document.getElementById("catalog-mount"),
  themeCardsMount: document.getElementById("theme-cards-mount"),
  categoryFilters: document.getElementById("category-filters"),
  searchInput: document.getElementById("search-input"),
  toggleGroupingBtn: document.getElementById("toggle-grouping"),
  viewModeLabel: document.getElementById("view-mode-label"),
  itemCounter: document.getElementById("item-counter"),
  loadingState: document.getElementById("loading-state")
};

// Visual styling metadata for each Etsy collection theme card
const THEME_ACCENTS = {
  "Adventure Beyond": { bg: "bg-skyLight", badge: "Space & Rockets", symbol: "&#9734;" },
  "Lullaby Land": { bg: "bg-butter", badge: "Sweet Dreams", symbol: "&#9790;" },
  "Piggy Banks": { bg: "bg-oatmeal", badge: "Wood & Acrylic", symbol: "&#9829;" },
  "Safari Smile": { bg: "bg-meadowLight", badge: "Jungle Friends", symbol: "&#10047;" },
  "Starry Snooze": { bg: "bg-skyLight", badge: "Clouds & Sun", symbol: "&#9728;" },
  "Cuddle-Saurus": { bg: "bg-meadowLight", badge: "Dino Family", symbol: "&#10022;" },
  "Angelic Dreams": { bg: "bg-blushLight", badge: "Faith & Grace", symbol: "&#10013;" },
  "Frames & Arts": { bg: "bg-butter", badge: "Custom Signs", symbol: "&#9998;" }
};

/**
 * Fetch the items array from the adjacent items.json file,
 * falling back seamlessly to FALLBACK_CATALOG in sandboxed/file:// previews.
 */
async function loadCatalog() {
  try {
    const response = await fetch("items.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Expected items.json to contain a JSON array.");
    }

    state.items = data;
  } catch (error) {
    console.warn("Using embedded sample catalog for preview (items.json unavailable):", error);
    state.items = FALLBACK_CATALOG;
  }

  elements.loadingState.classList.add("hidden");
  renderThemeCards();
  renderCategoryFilters();
  renderGallery();
}

/**
 * Render interactive theme spotlight cards in the landing page hero section.
 */
function renderThemeCards() {
  if (!elements.themeCardsMount) return;

  const counts = state.items.reduce((acc, item) => {
    if (item.category) {
      acc[item.category] = (acc[item.category] || 0) + 1;
    }
    return acc;
  }, {});

  elements.themeCardsMount.innerHTML = "";

  Object.entries(counts).forEach(([category, count]) => {
    const accent = THEME_ACCENTS[category] || {
      bg: "bg-oatmeal",
      badge: "Collection",
      symbol: "&#10022;"
    };
    const isActive = state.activeCategory === category;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isActive
      ? `${accent.bg} ring-2 ring-blush rounded-2xl p-3.5 text-left transition-all shadow-md flex flex-col justify-between min-h-[104px]`
      : `${accent.bg}/70 hover:${accent.bg} border border-cocoa/10 rounded-2xl p-3.5 text-left transition-all hover:-translate-y-1 hover:shadow-storybook flex flex-col justify-between min-h-[104px]`;

    btn.innerHTML = `
      <div class="flex items-center justify-between w-full">
        <span class="text-base text-cocoa/80">${accent.symbol}</span>
        <span class="px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-extrabold text-cocoa">${count}</span>
      </div>
      <div class="mt-2">
        <p class="font-display text-sm font-semibold text-cocoa leading-tight">${escapeHtml(category)}</p>
        <p class="text-[10px] font-bold text-pebble mt-0.5">${accent.badge}</p>
      </div>
    `;

    btn.addEventListener("click", () => {
      state.activeCategory = state.activeCategory === category ? "All" : category;
      renderThemeCards();
      renderCategoryFilters();
      renderGallery();
      const galleryEl = document.getElementById("gallery-section");
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    elements.themeCardsMount.appendChild(btn);
  });
}

/**
 * Extract unique categories from items.json and render filter pills.
 */
function renderCategoryFilters() {
  const categories = ["All", ...new Set(state.items.map((item) => item.category).filter(Boolean))];
  elements.categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const isActive = state.activeCategory === category;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = isActive
      ? "px-4 py-2 rounded-full bg-blush text-white text-xs font-extrabold tracking-wide shadow-sm transition-all whitespace-nowrap"
      : "px-4 py-2 rounded-full bg-oatmeal/80 text-cocoa/80 hover:bg-butter hover:text-cocoa text-xs font-bold tracking-wide transition-all whitespace-nowrap";

    button.addEventListener("click", () => {
      state.activeCategory = category;
      renderThemeCards();
      renderCategoryFilters();
      renderGallery();
    });

    elements.categoryFilters.appendChild(button);
  });
}

/**
 * Filter items based on active category and search query, then render the view.
 */
function renderGallery() {
  const filteredItems = state.items.filter((item) => {
    const matchesCategory =
      state.activeCategory === "All" || item.category === state.activeCategory;
    const matchesQuery =
      !state.searchQuery ||
      item.name.toLowerCase().includes(state.searchQuery) ||
      item.category.toLowerCase().includes(state.searchQuery);

    return matchesCategory && matchesQuery;
  });

  elements.itemCounter.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-meadow"></span>
    <span>${filteredItems.length} ${filteredItems.length === 1 ? "Creation" : "Creations"}</span>
  `;

  elements.catalogMount.innerHTML = "";

  if (filteredItems.length === 0) {
    elements.catalogMount.innerHTML = `
      <div class="text-center py-16 bg-white/90 rounded-[2rem] border border-cocoa/10 shadow-storybook">
        <p class="font-display text-2xl font-semibold text-cocoa mb-2">No little wonders match your search</p>
        <p class="text-sm font-medium text-pebble">Try clearing your filter or exploring another nursery collection.</p>
      </div>
    `;
    return;
  }

  if (state.groupByCategory && state.activeCategory === "All") {
    renderGroupedSections(filteredItems);
  } else {
    const heading =
      state.activeCategory === "All" ? "Complete Whimsy Wonders Collection" : state.activeCategory;
    const section = createCategorySection(heading, filteredItems);
    elements.catalogMount.appendChild(section);
  }
}

/**
 * Group filtered items by their category property and render distinct sections.
 */
function renderGroupedSections(items) {
  const groups = items.reduce((acc, item) => {
    const cat = item.category || "Studio Favorites";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  Object.entries(groups).forEach(([categoryName, categoryItems]) => {
    const section = createCategorySection(categoryName, categoryItems);
    elements.catalogMount.appendChild(section);
  });
}

/**
 * Build a section DOM element containing a category header and a grid of item cards.
 */
function createCategorySection(title, items) {
  const section = document.createElement("section");
  section.className = "space-y-6";

  const header = document.createElement("div");
  header.className = "flex items-center justify-between border-b-2 border-oatmeal pb-3.5";
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="w-3 h-7 rounded-full bg-gradient-to-b from-honey to-blush"></span>
      <h2 class="font-display text-2xl sm:text-3xl font-semibold text-cocoa">${escapeHtml(title)}</h2>
    </div>
    <span class="px-3.5 py-1 rounded-full bg-butter text-xs font-extrabold text-cocoa">${items.length} ${
    items.length === 1 ? "Piece" : "Pieces"
  }</span>
  `;

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8";

  items.forEach((item) => {
    grid.appendChild(createItemCard(item));
  });

  section.appendChild(header);
  section.appendChild(grid);
  return section;
}

/**
 * Create an individual Whimsy Wonders piece card.
 * Clicking anywhere on the card opens the item's Etsy listing in a new tab.
 */
function createItemCard(item) {
  const photoList = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : [item.image];

  let currentPhotoIndex = 0;
  const targetUrl = item.shopUrl || SHOP_BASE_URL;

  const card = document.createElement("a");
  card.href = targetUrl;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.className =
    "group block bg-white rounded-[1.75rem] overflow-hidden border-2 border-oatmeal shadow-storybook hover:shadow-card-lift hover:-translate-y-1.5 hover:border-blush/50 transition-all duration-300 flex flex-col";

  // Image frame with square studio framing & gentle zoom on hover
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "relative aspect-[4/4] bg-oatmeal overflow-hidden";

  const img = document.createElement("img");
  img.src = photoList[0];
  img.alt = item.name;
  img.loading = "lazy";
  img.className =
    "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out";

  // Graceful fallback if an image URL fails to load
  img.onerror = () => {
    img.onerror = null;
    const encodedName = encodeURIComponent(item.name);
    img.src = `https://placehold.co/800x800/F7F1E5/3A2E2A?text=${encodedName}`;
  };

  imageWrapper.appendChild(img);

  // Category Pill Overlay
  const badge = document.createElement("span");
  badge.textContent = item.category;
  badge.className =
    "absolute top-3.5 left-3.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-extrabold tracking-wide text-cocoa shadow-sm";
  imageWrapper.appendChild(badge);

  // If multiple pictures exist for this item, provide interactive photo switcher dots
  if (photoList.length > 1) {
    const controls = document.createElement("div");
    controls.className =
      "absolute bottom-3.5 right-3.5 flex items-center gap-1.5 bg-cocoa/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm";

    photoList.forEach((photoSrc, idx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `View photo ${idx + 1} of ${item.name}`);
      dot.className =
        idx === 0
          ? "w-2.5 h-2.5 rounded-full bg-honey scale-110 transition-all"
          : "w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-all";

      // Prevent dot click from triggering the card's link navigation
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentPhotoIndex = idx;
        img.src = photoList[currentPhotoIndex];
        Array.from(controls.children).forEach((child, cIdx) => {
          child.className =
            cIdx === currentPhotoIndex
              ? "w-2.5 h-2.5 rounded-full bg-honey scale-110 transition-all"
              : "w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-all";
        });
      });

      controls.appendChild(dot);
    });

    imageWrapper.appendChild(controls);
  }

  // Card Footer / Metadata
  const body = document.createElement("div");
  body.className = "p-5 sm:p-6 flex items-center justify-between gap-4 mt-auto bg-white";
  body.innerHTML = `
    <div>
      <h3 class="font-display text-xl font-semibold text-cocoa group-hover:text-blush transition-colors leading-snug">
        ${escapeHtml(item.name)}
      </h3>
      <p class="text-xs font-bold text-meadow mt-1.5 flex items-center gap-1.5">
        <span>View on Etsy</span>
        <span class="text-pebble/50">&bull;</span>
        <span class="text-pebble">Hand-painted to order</span>
      </p>
    </div>
    <span class="w-10 h-10 rounded-full bg-butter text-cocoa flex items-center justify-center group-hover:bg-blush group-hover:text-white group-hover:rotate-12 transition-all duration-300 shrink-0 shadow-sm font-bold" aria-hidden="true">
      &nearr;
    </span>
  `;

  card.appendChild(imageWrapper);
  card.appendChild(body);
  return card;
}

/**
 * Utility to prevent XSS when inserting text into HTML templates.
 */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Event Listeners
elements.searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value.trim().toLowerCase();
  renderGallery();
});

elements.toggleGroupingBtn.addEventListener("click", () => {
  state.groupByCategory = !state.groupByCategory;
  elements.viewModeLabel.textContent = state.groupByCategory ? "Grouped" : "All Grid";
  renderGallery();
});

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadCatalog);
