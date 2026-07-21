// Semola Food & Spices - Application State & Interaction Manager

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------
  // Application State
  // ------------------------------------------
  let currentLanguage = "en"; // 'en' or 'hi'
  let isDarkMode = false;
  
  let cart = [];
  let wishlist = [];
  let activeProductCategory = "all";
  
  let activeRecipeId = null;
  let activeRecipeStepIndex = 0;

  // 3D Carousel rotation angle
  let carouselRotationAngle = 0;
  let carouselAutoRotateInterval = null;

  // ------------------------------------------
  // DOM Cache Elements
  // ------------------------------------------
  const mainHeader = document.getElementById("main-header");
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll("#product-filters .filter-btn");
  
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  
  // Cart & Wishlist drawers DOM
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartDrawer = document.getElementById("cart-drawer-element");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartSubtotalVal = document.getElementById("cart-subtotal-val");
  const cartBadgeCount = document.getElementById("cart-badge-count");
  const cartCheckoutBtn = document.getElementById("cart-checkout-action-btn");
  
  const openWishlistBtn = document.getElementById("open-wishlist-btn");
  const closeWishlistBtn = document.getElementById("close-wishlist-btn");
  const wishlistDrawer = document.getElementById("wishlist-drawer-element");
  const wishlistItemsList = document.getElementById("wishlist-items-list");
  const wishlistBadgeCount = document.getElementById("wishlist-badge-count");

  // Modals DOM
  const modalBackdrop = document.getElementById("modal-backdrop");
  const productDetailModal = document.getElementById("product-detail-modal");
  const closePModalBtn = document.getElementById("close-p-modal-btn");
  const productDetailContent = document.getElementById("product-detail-modal-content");
  
  const checkoutSuccessModal = document.getElementById("checkout-success-modal");
  const closeCheckoutModalBtn = document.getElementById("close-checkout-modal-btn");
  const checkoutSuccessCloseAction = document.getElementById("checkout-success-close-action");
  
  const cookingHelperModal = document.getElementById("cooking-helper-modal");
  const closeCookingModalBtn = document.getElementById("close-cooking-modal-btn");
  const cookingRecipeTitle = document.getElementById("cooking-recipe-title");
  const cookingStepTracker = document.getElementById("cooking-step-tracker");
  const cookingProgressBar = document.getElementById("cooking-progress-indicator");
  const cookingStepLabel = document.getElementById("cooking-step-label");
  const cookingStepContent = document.getElementById("cooking-step-instruction-content");
  const cookingPrevBtn = document.getElementById("cooking-prev-step-btn");
  const cookingNextBtn = document.getElementById("cooking-next-step-btn");

  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navUl = document.querySelector("header nav ul");

  // AI Chat DOM
  const openAiChatBtn = document.getElementById("open-ai-chat-btn");
  const closeAiChatBtn = document.getElementById("close-ai-chat-btn");
  const aiChatWindow = document.getElementById("ai-chat-window-element");
  const aiMessagesContainer = document.getElementById("ai-chat-messages-container");
  const aiChatInput = document.getElementById("ai-chat-input");
  const sendAiChatBtn = document.getElementById("send-ai-chat-btn");

  // Founders & Future Products DOM
  const foundersContainer = document.getElementById("founders-container");
  const futureProductsContainer = document.getElementById("future-products-container");
  const recipesContainer = document.getElementById("recipes-container");
  const featuredRecipesContainer = document.getElementById("featured-recipes-container");
  const recipesScrollPrev = document.getElementById("recipes-scroll-prev");
  const recipesScrollNext = document.getElementById("recipes-scroll-next");

  // Inquiry Form DOM
  const contactInquiryForm = document.getElementById("contact-inquiry-form");
  const btnToggleDistributor = document.getElementById("btn-toggle-distributor-form");
  const btnToggleBulk = document.getElementById("btn-toggle-bulk-form");
  let activeFormType = "distributor"; // 'distributor' or 'bulk'

  // Ghee Trigger
  const gheeAddCartBtn = document.querySelector(".ghee-add-cart-btn");
  if (gheeAddCartBtn) {
    gheeAddCartBtn.addEventListener("click", () => {
      addToCart("desi-cow-ghee");
    });
  }

  // Load cart and wishlist from Local Storage
  try {
    const savedCart = localStorage.getItem("semola_spices_cart");
    if (savedCart) cart = JSON.parse(savedCart);
    const savedWishlist = localStorage.getItem("semola_spices_wishlist");
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
  } catch (e) {
    console.error("Local storage sync error", e);
  }

  // Load theme preference
  if (localStorage.getItem("semola_theme") === "dark") {
    isDarkMode = true;
    document.body.classList.add("dark-mode");
  }

  // ------------------------------------------
  // Intro Logo Animation Splash Screen
  // ------------------------------------------
  const introSplash = document.getElementById("intro-splash");
  if (introSplash) {
    setTimeout(() => {
      introSplash.classList.add("fade-out");
      setTimeout(() => {
        introSplash.style.display = "none";
      }, 800);
    }, 2400); // 2.4s intro logo zoom display
  }

  // ------------------------------------------
  // Initialize Content & Drawers
  // ------------------------------------------
  renderProducts();
  renderFounders();
  renderFutureProducts();
  renderRecipes();
  initializeWorldMap();
  initialize3DCarousel();
  initializeStatsCounter();
  updateCartUI();
  updateWishlistUI();
  translateUI();

  // ------------------------------------------
  // Language Translation Function
  // ------------------------------------------
  function translateUI() {
    const dict = SEMOLA_DATA.translations[currentLanguage];
    
    // Toggle language button label
    langToggleBtn.textContent = currentLanguage === "en" ? "HI" : "EN";

    // Translate all elements with data-translate attribute
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Custom updates for mixed elements
    const searchInput = document.getElementById("recipe-search-input");
    if (searchInput) {
      searchInput.placeholder = dict.recipeSearchPlaceholder;
    }
    
    const chatInput = document.getElementById("ai-chat-input");
    if (chatInput) {
      chatInput.placeholder = dict.aiAssistantPlaceholder;
    }

    // Refresh dynamic lists to apply translation
    renderProducts();
    renderFounders();
    renderFutureProducts();
    renderRecipes();
  }

  langToggleBtn.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "hi" : "en";
    translateUI();
  });

  // ------------------------------------------
  // Dark/Light Theme Switching
  // ------------------------------------------
  themeToggleBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("semola_theme", isDarkMode ? "dark" : "light");
  });

  // ------------------------------------------
  // Header Scroll Effect & Mobile Nav
  // ------------------------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  });

  mobileMenuToggle.addEventListener("click", () => {
    navUl.style.display = navUl.style.display === "flex" ? "none" : "flex";
    mobileMenuToggle.classList.toggle("active");
  });

  // ------------------------------------------
  // Render Products list
  // ------------------------------------------
  function renderProducts() {
    productGrid.innerHTML = "";
    
    const dict = SEMOLA_DATA.translations[currentLanguage];

    const filtered = SEMOLA_DATA.products.filter(p => 
      activeProductCategory === "all" || p.category === activeProductCategory
    );

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      
      if (p.id === "magic-masala-10") {
        card.classList.add("specialty-highlight");
      }
      
      const badgeText = p.category === "trial" ? dict.badgeTrialPack : (p.category === "spices" ? dict.badgePremium : (p.category === "blends" ? dict.badgeGourmet : "Pure Ghee"));
      
      const isStarred = wishlist.includes(p.id) ? "active" : "";

      card.innerHTML = `
        <span class="product-badge">${badgeText}</span>
        <button class="wishlist-heart-btn ${isStarred}" data-id="${p.id}" aria-label="Wishlist">❤️</button>
        <div class="product-img-wrapper">
          <div class="image-fallback-bg" style="background-color: ${p.fallbackColor}">🌶️</div>
          <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.style.opacity='0'">
        </div>
        <div class="product-info">
          <span class="product-cat">${p.weight}</span>
          <h3 class="product-title" data-id="${p.id}">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-footer">
            <span class="product-price">₹${p.price}</span>
            <div class="product-action-btns">
              <button class="card-btn add-to-cart-btn" data-id="${p.id}">${dict.btnShopNow}</button>
            </div>
          </div>
        </div>
      `;

      // Handlers
      card.querySelector(".product-title").addEventListener("click", () => openProductModal(p.id));
      card.querySelector(".wishlist-heart-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(p.id);
      });
      card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(p.id);
      });

      productGrid.appendChild(card);
    });
  }

  // Filter list listener
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeProductCategory = btn.getAttribute("data-category");
      renderProducts();
    });
  });

  // ------------------------------------------
  // Render Founders
  // ------------------------------------------
  function renderFounders() {
    foundersContainer.innerHTML = "";
    
    SEMOLA_DATA.founders.forEach(f => {
      const card = document.createElement("div");
      card.className = "founder-card";
      
      let socialsHtml = '';
      if (f.linkedin) {
        socialsHtml += `<a href="https://${f.linkedin}" target="_blank" class="founder-social-link">🔗 LinkedIn</a> `;
      }
      if (f.phone) {
        socialsHtml += `<a href="tel:${f.phone}" class="founder-social-link">📞 Call</a> `;
        const cleanPhone = f.phone.replace(/[^0-9]/g, '');
        socialsHtml += `<a href="https://wa.me/${cleanPhone}" target="_blank" class="founder-social-link" style="color: #25D366;">💬 WhatsApp</a> `;
      } else {
        socialsHtml += `<a href="mailto:${f.email}" class="founder-social-link">✉️ Contact</a> `;
      }

      let instagramHtml = '';
      if (f.instagram) {
        instagramHtml = `
          <div style="margin-top: 1.2rem; border-top: 1px solid rgba(212, 175, 55, 0.12); padding-top: 0.8rem; text-align: center; width: 100%;">
            <a href="https://instagram.com/${f.instagram}" target="_blank" style="color: var(--color-secondary); font-size: 0.85rem; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem; transition: opacity 0.2s;" onmouseenter="this.style.opacity='0.8'" onmouseleave="this.style.opacity='1'">
              📸 @${f.instagram}
            </a>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="founder-img-wrapper">
          <img src="${f.image}" alt="${f.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'45\' r=\'25\' fill=\'%23B71C1C\'/><circle cx=\'50\' cy=\'100\' r=\'40\' fill=\'%23B71C1C\'/></svg>'">
        </div>
        <h3>${f.name}</h3>
        <h4>${f.designation}</h4>
        <p class="founder-bio">${f.bio}</p>
        <div class="founder-socials">
          ${socialsHtml}
        </div>
        ${instagramHtml}
      `;
      foundersContainer.appendChild(card);
    });
  }

  // ------------------------------------------
  // Render Future Products
  // ------------------------------------------
  function renderFutureProducts() {
    futureProductsContainer.innerHTML = "";
    
    SEMOLA_DATA.futureProducts.forEach(item => {
      const el = document.createElement("span");
      el.className = "filter-btn";
      el.style.cursor = "default";
      el.textContent = currentLanguage === "en" ? item.en : item.hi;
      futureProductsContainer.appendChild(el);
    });
  }

  // ------------------------------------------
  // Cart Actions
  // ------------------------------------------
  function addToCart(productId) {
    const prod = SEMOLA_DATA.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product: prod, quantity: 1 });
    }

    updateCartUI();
    saveCart();
    openCartDrawer();
  }

  function changeQuantity(productId, delta) {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.product.id !== productId);
    }
    updateCartUI();
    saveCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartUI();
    saveCart();
  }

  function updateCartUI() {
    cartItemsList.innerHTML = "";
    const dict = SEMOLA_DATA.translations[currentLanguage];

    if (cart.length === 0) {
      cartItemsList.innerHTML = `<p class="empty-cart-message">${dict.cartEmpty}</p>`;
      cartSubtotalVal.textContent = "₹0";
      cartBadgeCount.textContent = "0";
      return;
    }

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
      subtotal += item.product.price * item.quantity;
      totalItems += item.quantity;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100%\' height=\'100%\' fill=\'${item.product.fallbackColor}\'/></svg>'">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">₹${item.product.price}</div>
          <div class="cart-item-quantity">
            <button class="qty-btn dec-qty">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn inc-qty">+</button>
          </div>
        </div>
        <button class="cart-item-remove">🗑️</button>
      `;

      row.querySelector(".dec-qty").addEventListener("click", () => changeQuantity(item.product.id, -1));
      row.querySelector(".inc-qty").addEventListener("click", () => changeQuantity(item.product.id, 1));
      row.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(item.product.id));

      cartItemsList.appendChild(row);
    });

    cartSubtotalVal.textContent = `₹${subtotal}`;
    cartBadgeCount.textContent = totalItems.toString();
  }

  function saveCart() {
    localStorage.setItem("semola_spices_cart", JSON.stringify(cart));
  }

  function openCartDrawer() {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("active");
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("active");
  }

  openCartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartBackdrop.addEventListener("click", () => {
    closeCartDrawer();
    closeWishlistDrawer();
  });

  cartCheckoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    closeCartDrawer();
    checkoutSuccessModal.classList.add("active");
    modalBackdrop.classList.add("active");
    cart = [];
    updateCartUI();
    saveCart();
  });

  // ------------------------------------------
  // Wishlist Actions
  // ------------------------------------------
  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx !== -1) {
      wishlist.splice(idx, 1);
    } else {
      wishlist.push(productId);
    }
    updateWishlistUI();
    renderProducts();
    localStorage.setItem("semola_spices_wishlist", JSON.stringify(wishlist));
  }

  function updateWishlistUI() {
    wishlistItemsList.innerHTML = "";
    const dict = SEMOLA_DATA.translations[currentLanguage];

    if (wishlist.length === 0) {
      wishlistItemsList.innerHTML = `<p class="empty-cart-message">${dict.wishlistEmpty}</p>`;
      wishlistBadgeCount.textContent = "0";
      return;
    }

    wishlistBadgeCount.textContent = wishlist.length.toString();

    wishlist.forEach(id => {
      const p = SEMOLA_DATA.products.find(prod => prod.id === id);
      if (!p) return;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="cart-item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100%\' height=\'100%\' fill=\'${p.fallbackColor}\'/></svg>'">
        <div class="cart-item-details">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">₹${p.price}</div>
        </div>
        <button class="card-btn add-to-cart-from-wishlist" style="padding: 0.2rem 0.6rem; font-size: 0.75rem;">🛒 +</button>
        <button class="cart-item-remove remove-from-wishlist">🗑️</button>
      `;

      row.querySelector(".add-to-cart-from-wishlist").addEventListener("click", () => {
        addToCart(p.id);
        toggleWishlist(p.id);
      });
      row.querySelector(".remove-from-wishlist").addEventListener("click", () => toggleWishlist(p.id));

      wishlistItemsList.appendChild(row);
    });
  }

  function openWishlistDrawer() {
    wishlistDrawer.classList.add("open");
    cartBackdrop.classList.add("active");
  }

  function closeWishlistDrawer() {
    wishlistDrawer.classList.remove("open");
    cartBackdrop.classList.remove("active");
  }

  openWishlistBtn.addEventListener("click", openWishlistDrawer);
  closeWishlistBtn.addEventListener("click", closeWishlistDrawer);

  // ------------------------------------------
  // Product Detail Modal
  // ------------------------------------------
  function openProductModal(productId) {
    const p = SEMOLA_DATA.products.find(prod => prod.id === productId);
    if (!p) return;

    const dict = SEMOLA_DATA.translations[currentLanguage];

    productDetailContent.innerHTML = `
      <div style="background-color: rgba(0,0,0,0.02); overflow: hidden; display: flex; align-items: center; justify-content: center; border-right: var(--card-border);">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\'><rect width=\'100%\' height=\'100%\' fill=\'${p.fallbackColor}\'/></svg>'">
      </div>
      <div style="padding: 2.5rem;">
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--color-primary);">${p.name}</h2>
        <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 1.2rem;">₹${p.price}</div>
        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">${p.description}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; border-top: var(--card-border); padding-top: 1.2rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
          <div><strong>${dict.detailWeight}:</strong> ${p.weight}</div>
          <div><strong>${dict.detailSpiciness}:</strong> ${p.spiciness}</div>
          <div style="grid-column: span 2;"><strong>${dict.detailIngredients}:</strong> ${p.ingredients}</div>
        </div>

        <button class="btn btn-primary add-to-cart-from-modal" style="width: 100%;" data-id="${p.id}">${dict.btnShopNow}</button>
      </div>
    `;

    productDetailContent.querySelector(".add-to-cart-from-modal").addEventListener("click", () => {
      addToCart(p.id);
      closeProductModal();
    });

    productDetailModal.classList.add("active");
    modalBackdrop.classList.add("active");
  }

  function closeProductModal() {
    productDetailModal.classList.remove("active");
    modalBackdrop.classList.remove("active");
  }

  closePModalBtn.addEventListener("click", closeProductModal);
  modalBackdrop.addEventListener("click", () => {
    closeProductModal();
    closeCookingMode();
    checkoutSuccessModal.classList.remove("active");
  });

  closeCheckoutModalBtn.addEventListener("click", () => {
    checkoutSuccessModal.classList.remove("active");
    modalBackdrop.classList.remove("active");
  });

  checkoutSuccessCloseAction.addEventListener("click", () => {
    checkoutSuccessModal.classList.remove("active");
    modalBackdrop.classList.remove("active");
  });

  // ------------------------------------------
  // Interactive Step-by-Step Cooking
  // ------------------------------------------
  // ------------------------------------------
  // Interactive Step-by-Step Cooking
  // ------------------------------------------
  function renderRecipes() {
    recipesContainer.innerHTML = "";
    featuredRecipesContainer.innerHTML = "";
    
    const dict = SEMOLA_DATA.translations[currentLanguage];
    const searchVal = document.getElementById("recipe-search-input").value.toLowerCase();

    // 1. Signature Featured Recipes (Always the same 4 famous recipes on front view)
    const featuredIds = ["paneer-butter-masala", "chicken-biryani-hyderabadi", "dal-makhani", "butter-chicken"];
    const featuredRecipes = SEMOLA_DATA.recipes.filter(r => featuredIds.includes(r.id));
    
    featuredRecipes.forEach(r => {
      const card = document.createElement("div");
      card.className = "why-card";
      card.style.textAlign = "left";
      card.style.display = "flex";
      card.style.flexDirection = "column";

      // Cross-sell tag
      const crossSellTag = r.featuredProduct 
        ? `<span class="product-badge" style="position: static; display: inline-block; margin-bottom: 0.8rem; width: fit-content; font-size: 0.65rem;">⭐ Uses Semola ${r.featuredProduct.replace("-10", "").replace("-", " ").toUpperCase()}</span>`
        : "";

      card.innerHTML = `
        ${crossSellTag}
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); margin-bottom: 0.6rem;">${r.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">⏱️ ${r.prepTime} | ${dict.recipeDifficulty}: ${r.difficulty}</p>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem; flex-grow: 1;"><strong>${dict.recipeNutrition}:</strong> ${r.nutrition}</p>
        <button class="btn btn-primary start-cooking" style="width: 100%; font-size: 0.85rem; padding: 0.5rem 1rem;">${dict.btnStartCooking}</button>
      `;

      card.querySelector(".start-cooking").addEventListener("click", () => startCookingMode(r.id));
      featuredRecipesContainer.appendChild(card);
    });

    // 2. All other 96 recipes rendered inside the horizontal scroll
    // Filter them based on search values
    const remainingRecipes = SEMOLA_DATA.recipes.filter(r => !featuredIds.includes(r.id));
    const filtered = remainingRecipes.filter(r => 
      r.title.toLowerCase().includes(searchVal) || 
      (r.featuredProduct && r.featuredProduct.toLowerCase().includes(searchVal))
    );

    filtered.forEach(r => {
      const card = document.createElement("div");
      card.className = "why-card";
      card.style.textAlign = "left";
      card.style.display = "flex";
      card.style.flexDirection = "column";

      const crossSellTag = r.featuredProduct 
        ? `<span class="product-badge" style="position: static; display: inline-block; margin-bottom: 0.8rem; width: fit-content; font-size: 0.65rem;">🌿 Semola Spice Match</span>`
        : "";

      card.innerHTML = `
        ${crossSellTag}
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); margin-bottom: 0.6rem;">${r.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">⏱️ ${r.prepTime} | ${dict.recipeDifficulty}: ${r.difficulty}</p>
        <p style="font-size: 0.85rem; margin-bottom: 1.5rem; flex-grow: 1;"><strong>${dict.recipeNutrition}:</strong> ${r.nutrition}</p>
        <button class="btn btn-primary start-cooking" style="width: 100%; font-size: 0.85rem; padding: 0.5rem 1rem;">${dict.btnStartCooking}</button>
      `;

      card.querySelector(".start-cooking").addEventListener("click", () => startCookingMode(r.id));
      recipesContainer.appendChild(card);
    });
  }

  // Setup horizontal scroll listeners
  if (recipesScrollPrev && recipesScrollNext) {
    recipesScrollPrev.addEventListener("click", () => {
      recipesContainer.scrollBy({ left: -340, behavior: "smooth" });
    });
    recipesScrollNext.addEventListener("click", () => {
      recipesContainer.scrollBy({ left: 340, behavior: "smooth" });
    });
  }

  document.getElementById("recipe-search-input").addEventListener("keyup", renderRecipes);

  // Recipe of the day button listener
  const dailyRecipeBtn = document.getElementById("daily-recipe-cook-btn");
  if (dailyRecipeBtn) {
    dailyRecipeBtn.addEventListener("click", () => {
      startCookingMode("magic-noodle-stirfry");
    });
  }

  function startCookingMode(recipeId) {
    const r = SEMOLA_DATA.recipes.find(rec => rec.id === recipeId);
    if (!r) return;

    activeRecipeId = recipeId;
    activeRecipeStepIndex = 0;

    cookingRecipeTitle.textContent = r.title;
    updateCookingStepUI();

    cookingHelperModal.classList.add("active");
    modalBackdrop.classList.add("active");
  }

  function updateCookingStepUI() {
    const r = SEMOLA_DATA.recipes.find(rec => rec.id === activeRecipeId);
    if (!r) return;

    const dict = SEMOLA_DATA.translations[currentLanguage];
    const totalSteps = r.steps.length;
    const currentStep = activeRecipeStepIndex + 1;

    cookingStepTracker.textContent = `Step ${currentStep} of ${totalSteps}`;
    cookingStepLabel.textContent = `${dict.recipeSteps} - Step 0${currentStep}`;
    cookingStepContent.textContent = r.steps[activeRecipeStepIndex];

    const progress = (currentStep / totalSteps) * 100;
    cookingProgressBar.style.width = `${progress}%`;

    cookingPrevBtn.style.visibility = activeRecipeStepIndex === 0 ? "hidden" : "visible";
    cookingNextBtn.textContent = activeRecipeStepIndex === totalSteps - 1 ? (currentLanguage === "en" ? "Finish" : "समाप्त") : dict.recipeSteps + " >>";
  }

  cookingPrevBtn.addEventListener("click", () => {
    if (activeRecipeStepIndex > 0) {
      activeRecipeStepIndex--;
      updateCookingStepUI();
    }
  });

  cookingNextBtn.addEventListener("click", () => {
    const r = SEMOLA_DATA.recipes.find(rec => rec.id === activeRecipeId);
    if (!r) return;

    if (activeRecipeStepIndex < r.steps.length - 1) {
      activeRecipeStepIndex++;
      updateCookingStepUI();
    } else {
      closeCookingMode();
      alert(currentLanguage === "en" ? "Congratulations on cooking this recipe! Share with family." : "रेसिपी पकाने के लिए बधाई! परिवार के साथ साझा करें।");
    }
  });

  function closeCookingMode() {
    cookingHelperModal.classList.remove("active");
    modalBackdrop.classList.remove("active");
    activeRecipeId = null;
  }

  closeCookingModalBtn.addEventListener("click", closeCookingMode);

  // ------------------------------------------
  // AI Chef Chat Assistant Mockup
  // ------------------------------------------
  openAiChatBtn.addEventListener("click", () => {
    aiChatWindow.classList.toggle("open");
  });
  
  closeAiChatBtn.addEventListener("click", () => {
    aiChatWindow.classList.remove("open");
  });

  function handleChefMessage() {
    const text = aiChatInput.value.trim();
    if (!text) return;

    // Append User message
    appendChatBubble(text, "user");
    aiChatInput.value = "";

    // Simulated Chef response
    setTimeout(() => {
      const q = text.toLowerCase();
      let reply = "";

      // Match recipe by title keywords
      const matchedRecipe = SEMOLA_DATA.recipes.find(r => 
        q.includes(r.title.toLowerCase()) || 
        r.title.toLowerCase().split(" ").some(word => word.length > 3 && q.includes(word))
      );

      if (matchedRecipe) {
        if (currentLanguage === "en") {
          reply = `Chef Suggestion: Let's cook ${matchedRecipe.title}! It takes ${matchedRecipe.prepTime} prep and ${matchedRecipe.cookTime} cook. Key ingredients: ${matchedRecipe.ingredients.slice(0, 3).join(", ")}. Would you like me to open the step-by-step helper?`;
        } else {
          reply = `शेफ सुझाव: आइए ${matchedRecipe.title} बनाएं! इसमें ${matchedRecipe.prepTime} तैयारी और ${matchedRecipe.cookTime} पकाने में लगेगा। मुख्य सामग्री: ${matchedRecipe.ingredients.slice(0, 3).join(", ")}। क्या आप चाहते हैं कि मैं इसे पकाने का हेल्पर खोलूं?`;
        }
        
        // Add auto trigger to start helper on click
        setTimeout(() => {
          const helperButton = document.createElement("button");
          helperButton.className = "card-btn";
          helperButton.style.marginTop = "0.5rem";
          helperButton.textContent = currentLanguage === "en" ? "Start Helper" : "हेल्पर शुरू करें";
          helperButton.addEventListener("click", () => {
            startCookingMode(matchedRecipe.id);
            aiChatWindow.classList.remove("open");
          });
          aiMessagesContainer.appendChild(helperButton);
          aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
        }, 100);

      } else {
        if (currentLanguage === "en") {
          if (q.includes("ghee") || q.includes("desi cow ghee")) {
            reply = "Semola Premium Desi Cow Ghee is bilona style inspired. Try using it to toast Paneer or make a dollop on Biryani for rich granulated taste!";
          } else if (q.includes("chili") || q.includes("chilli")) {
            reply = "Our Chilli Powder adds authentic red color and clean heat. Combine with ginger garlic paste to marinate Tandoori items.";
          } else if (q.includes("spices") || q.includes("price")) {
            reply = "Semola has a trial pack collection. Every trial packet (like Chilli, Cumin, Coriander) is available at just ₹10 ONLY!";
          } else {
            reply = "I can suggest delicious Indian recipes! Try asking about 'stirfry', 'pav bhaji', or 'paneer'. I'll give ingredients and steps!";
          }
        } else {
          if (q.includes("ghee") || q.includes("घी")) {
            reply = "सेमोला देसी गाय का घी पारंपरिक बिलोना पद्धति की प्रेरणा से बना है। पनीर को सेकने या बिरयानी पर डालने से इसका स्वाद बढ़ जाता है!";
          } else if (q.includes("mirch") || q.includes("मिर्च")) {
            reply = "हमारा रेड चिली पाउडर असली लाल रंग और तीखापन देता है। तंदूरी मैरीनेट के लिए अदरक-लहसुन पेस्ट के साथ मिलाएं।";
          } else if (q.includes("मसाला") || q.includes("दाम")) {
            reply = "सेमोला में ट्रायल पैक हैं। हर ट्रायल पैकेट (जैसे धनिया, जीरा, लाल मिर्च) केवल ₹10 में उपलब्ध है!";
          } else {
            reply = "मैं आपको बेहतरीन भारतीय रेसिपी सुझा सकता हूँ! 'stirfry', 'pav bhaji' या 'paneer' के बारे में पूछें।";
          }
        }
      }

      appendChatBubble(reply, "bot");
    }, 800);
  }

  function appendChatBubble(msg, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = msg;
    aiMessagesContainer.appendChild(bubble);
    aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
  }

  sendAiChatBtn.addEventListener("click", handleChefMessage);
  aiChatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChefMessage();
  });

  // ------------------------------------------
  // Forms & Inquiries Validation
  // ------------------------------------------
  btnToggleDistributor.addEventListener("click", () => {
    btnToggleDistributor.classList.add("active");
    btnToggleBulk.classList.remove("active");
    activeFormType = "distributor";
  });

  btnToggleBulk.addEventListener("click", () => {
    btnToggleBulk.classList.add("active");
    btnToggleDistributor.classList.remove("active");
    activeFormType = "bulk";
  });

  document.getElementById("distributor-trigger-btn").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    btnToggleDistributor.click();
    setTimeout(() => {
      document.getElementById("form-input-name").focus();
    }, 850);
  });

  document.getElementById("bulk-trigger-btn").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    document.getElementById("btn-toggle-bulk-form").click();
    setTimeout(() => {
      document.getElementById("form-input-name").focus();
    }, 850);
  });

  contactInquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-input-name").value;
    const email = document.getElementById("form-input-email").value;
    const phone = document.getElementById("form-input-phone").value;
    const message = document.getElementById("form-input-message").value;

    const newInquiry = {
      type: activeFormType,
      name,
      email,
      phone,
      message,
      date: new Date().toISOString()
    };

    let inquiries = [];
    try {
      const savedInquiries = localStorage.getItem("semola_inquiries");
      if (savedInquiries) inquiries = JSON.parse(savedInquiries);
    } catch (err) {}
    inquiries.push(newInquiry);
    localStorage.setItem("semola_inquiries", JSON.stringify(inquiries));
    
    const alertMsg = currentLanguage === "en" 
      ? `Thank you ${name}! Your ${activeFormType} inquiry has been registered. Our representative will contact you on ${phone} within 24 hours.`
      : `धन्यवाद ${name}! आपकी ${activeFormType === "distributor" ? "वितरक" : "थोक आर्डर"} पूछताछ दर्ज कर ली गई है। हमारे प्रतिनिधि 24 घंटे में आपसे संपर्क करेंगे।`;
      
    alert(alertMsg);
    contactInquiryForm.reset();
  });

  // ------------------------------------------
  // 3D Product Box Carousel Controller
  // ------------------------------------------
  function initialize3DCarousel() {
    const track = document.getElementById("carousel-track-3d");
    if (!track) return;

    // Pick 5 trial pack boxes to display in 3D circle
    const carouselItemsData = [
      { name: "Magic Masala", image: "assets/magic_masala.jpg" },
      { name: "Special Mix", image: "assets/special_mix.jpg" },
      { name: "Chilli Powder", image: "assets/chilli_powder.jpg" },
      { name: "Jeera Powder", image: "assets/jeera_powder.jpg" },
      { name: "Garam Masala", image: "assets/garam_masala.jpg" }
    ];

    track.innerHTML = "";
    const totalCount = carouselItemsData.length;
    const stepAngle = 360 / totalCount;

    carouselItemsData.forEach((item, index) => {
      const itemAngle = index * stepAngle;
      const el = document.createElement("div");
      el.className = "carousel-3d-item";
      // Position the item in 3D space with translation along Z-axis (radius = 280px)
      el.style.transform = `rotateY(${itemAngle}deg) translateZ(280px)`;
      
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'190\' height=\'275\'><rect width=\'100%\' height=\'100%\' fill=\'%23B71C1C\'/><text x=\'50%\' y=\'50%\' font-size=\'20\' fill=\'white\' text-anchor=\'middle\'>${item.name}</text></svg>'">
      `;
      
      // Clicking item rotates carousel to face it
      el.addEventListener("click", () => {
        carouselRotationAngle = -itemAngle;
        rotate3DCarousel();
        resetCarouselAutoPlay();
      });

      track.appendChild(el);
    });

    function rotate3DCarousel() {
      track.style.transform = `rotateY(${carouselRotationAngle}deg)`;
    }

    // Carousel buttons
    document.getElementById("prev-3d-btn").addEventListener("click", () => {
      carouselRotationAngle += stepAngle;
      rotate3DCarousel();
      resetCarouselAutoPlay();
    });

    document.getElementById("next-3d-btn").addEventListener("click", () => {
      carouselRotationAngle -= stepAngle;
      rotate3DCarousel();
      resetCarouselAutoPlay();
    });

    // Auto rotate interval
    function startCarouselAutoPlay() {
      carouselAutoRotateInterval = setInterval(() => {
        carouselRotationAngle -= stepAngle;
        rotate3DCarousel();
      }, 4000); // rotates every 4 seconds
    }

    function resetCarouselAutoPlay() {
      if (carouselAutoRotateInterval) {
        clearInterval(carouselAutoRotateInterval);
      }
      startCarouselAutoPlay();
    }

    startCarouselAutoPlay();
  }

  // ------------------------------------------
  // Stats Counter Count-up Script
  // ------------------------------------------
  function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length === 0) return;

    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute("data-target"), 10);
      animateValue(num, 0, target, 1500);
    });

    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const val = Math.floor(progress * (end - start) + start);
        
        // Formatting display
        if (end === 100) {
          obj.textContent = val + "+";
        } else if (end === 15) {
          obj.textContent = val + "+";
        } else if (end === 5) {
          obj.textContent = val + "+";
        } else if (end === 1) {
          obj.textContent = val + "+";
        } else {
          obj.textContent = val;
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }

  // ------------------------------------------
  // Interactive World Map Plotting
  // ------------------------------------------
  function initializeWorldMap() {
    const markersGroup = document.getElementById("map-markers-group");
    const tooltipBox = document.getElementById("map-tooltip-box");
    if (!markersGroup || !tooltipBox) return;

    markersGroup.innerHTML = "";

    const mapData = [
      { name: "United States", coordinates: [38, -98], count: "Export Ready" },
      { name: "United Kingdom", coordinates: [55, -3], count: "Distributor Active" },
      { name: "United Arab Emirates", coordinates: [24, 54], count: "Available in Supermarkets" },
      { name: "Singapore", coordinates: [1.3, 103.8], count: "Shipping Weekly" },
      { name: "Australia", coordinates: [-25, 133], count: "Coming Soon" },
      { name: "Germany", coordinates: [51, 10], count: "Distributor Appointed" }
    ];

    mapData.forEach(country => {
      const x = ((country.coordinates[1] + 180) / 360) * 1000;
      const y = 250 - (country.coordinates[0] * 2.4);

      const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      marker.setAttribute("cx", x);
      marker.setAttribute("cy", y);
      marker.setAttribute("r", 6);
      marker.setAttribute("fill", "#D4AF37");
      marker.setAttribute("style", "cursor: pointer; transition: all 0.3s;");

      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute("cx", x);
      pulse.setAttribute("cy", y);
      pulse.setAttribute("r", 8);
      pulse.setAttribute("fill", "#D4AF37");
      pulse.setAttribute("opacity", "0.4");
      
      marker.addEventListener("mouseenter", (e) => {
        tooltipBox.innerHTML = `<strong>${country.name}</strong><br>${country.count}`;
        tooltipBox.style.opacity = "1";
        const rect = e.target.getBoundingClientRect();
        const containerRect = document.getElementById("map-visualizer").getBoundingClientRect();
        tooltipBox.style.left = `${rect.left - containerRect.left + (rect.width / 2) - 80}px`;
        tooltipBox.style.top = `${rect.top - containerRect.top - 60}px`;
      });

      marker.addEventListener("mouseleave", () => {
        tooltipBox.style.opacity = "0";
      });

      markersGroup.appendChild(pulse);
      markersGroup.appendChild(marker);
    });
  }
});
