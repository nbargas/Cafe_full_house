// ================= CONFIGURAÇÃO DO FIREBASE =================
const firebaseConfig = {
  apiKey: "AIzaSyAznsdAHJnKHmD6KvcEZ6i6ySRdJDteOm8",
  authDomain: "cafe-full-house.firebaseapp.com",
  projectId: "cafe-full-house",
  storageBucket: "cafe-full-house.firebasestorage.app",
  messagingSenderId: "807791334064",
  appId: "1:807791334064:web:fd8775fde8fc87e63cd5d5",
  measurementId: "G-4P1SKPPB0J"
};

let db = null;
let isFirebaseConfigured = false;
let firestoreFns = null;

async function bootFirebase() {
  try {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("COLE_AQUI")) {
      return false;
    }
    const appMod = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
    const fsMod = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js");
    const app = appMod.initializeApp(firebaseConfig);
    db = fsMod.getFirestore(app);
    firestoreFns = fsMod;
    isFirebaseConfigured = true;
    return true;
  } catch (err) {
    console.error("Erro ao inicializar o Firebase:", err);
    return false;
  }
}

// ================= DADOS DO CARDÁPIO =================
const MENU_ITEMS = {
  cafes: [
    {
      name: "Espresso Full House",
      price: "R$ 9,90",
      tag: "Grão Especial",
      desc: "Extração encorpada de grãos 100% arábica com notas de chocolate amargo e avelã."
    },
    {
      name: "Cappuccino Rock & Creme",
      price: "R$ 16,90",
      tag: "Mais Pedido",
      desc: "Espresso duplo, leite vaporizado cremoso, borda de ganache meio amargo e cacau."
    },
    {
      name: "Irish Coffee Backstage",
      price: "R$ 26,90",
      tag: "Alcoólico",
      desc: "Café coado especial, dose de whiskey irlandês, açúcar mascavo e chantilly artesanal."
    },
    {
      name: "Iced Caramel Macchiato",
      price: "R$ 18,50",
      tag: "Gelado",
      desc: "Leite gelado, espresso intenso e calda artesanal de caramelo salgado."
    },
    {
      name: "Affogato Santo André",
      price: "R$ 19,90",
      tag: "Sobremesa",
      desc: "Duas bolas de sorvete de creme artesanal banhadas no espresso quente na hora."
    },
    {
      name: "Coado V60 da Casa",
      price: "R$ 14,90",
      tag: "Método Filtrado",
      desc: "Passado na mesa com torra média fresca, aroma frutado e finalização limpa."
    }
  ],
  drinks: [
    {
      name: "Full House Old Fashioned",
      price: "R$ 32,00",
      tag: "Autoral",
      desc: "Bourbon selecionado, bitter aromático, redução de casca de laranja e gelo cristalino."
    },
    {
      name: "Black Sabbath Negroni",
      price: "R$ 31,00",
      tag: "Clássico",
      desc: "Gin artesanal, vermute tinto, Campari e defumação leve de alecrim."
    },
    {
      name: "Espresso Martini Acoustic",
      price: "R$ 29,90",
      tag: "Assinatura",
      desc: "Vodka premium, licor de café, espresso recém-extraído e espuma aveludada."
    },
    {
      name: "Gin Tônica Botânica",
      price: "R$ 28,00",
      tag: "Refrescante",
      desc: "Gin seco, água tônica artesanal, zimbro, pepino japonês e limão-siciliano."
    },
    {
      name: "Chopp Pilsen Artesanal (500ml)",
      price: "R$ 15,90",
      tag: "Tirado a 0°C",
      desc: "Leve, refrescante e com colarinho cremoso para acompanhar a noite toda."
    },
    {
      name: "IPA Rock Session (500ml)",
      price: "R$ 19,90",
      tag: "Lupulada",
      desc: "Amargor equilibrado com notas cítricas de maracujá e pinho."
    }
  ],
  petiscos: [
    {
      name: "Full House Smash Burger",
      price: "R$ 36,90",
      tag: "Carro-Chefe",
      desc: "Dois blends bovinos de 100g, cheddar inglês, bacon crocante, cebola caramelizada e maionese da casa."
    },
    {
      name: "Fritas Rústicas com Cheddar & Bacon",
      price: "R$ 34,90",
      tag: "Para Compartilhar",
      desc: "Batatas rústicas temperadas com páprica defumada, creme de cheddar e cubos de bacon."
    },
    {
      name: "Iscas de Filé ao Molho Gorgonzola",
      price: "R$ 49,90",
      tag: "Especial",
      desc: "Tiras de filé mignon salteadas na manteiga de ervas com creme de gorgonzola e pão italiano."
    },
    {
      name: "Dadinhos de Tapioca com Geleia",
      price: "R$ 28,90",
      tag: "Vegetariano",
      desc: "Crocantes por fora e macios por dentro, servidos com geleia artesanal de pimenta."
    },
    {
      name: "Mini Pastéis Rock Bar (10 un.)",
      price: "R$ 32,90",
      tag: "Clássico de Bar",
      desc: "Massa sequinha recheada com carne seca desfiada e queijo coalho."
    },
    {
      name: "Brownie Quente de Chocolate Belga",
      price: "R$ 22,90",
      tag: "Doce",
      desc: "Servido com calda quente de chocolate e bola de sorvete de creme."
    }
  ]
};

// ================= ESTADO GLOBAL =================
let allReviews = [];
let currentReviewFilter = "all";
let lastReservationSummary = "";
const WHATSAPP_NUMBER = "5511968288545";

// ================= INICIALIZAÇÃO =================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initOperatingHours();
  initMenuTabs();
  initStarSelector();
  initReviewsSystem();
  initReservationForm();
  initCookieConsent();
});

// ================= NAVEGAÇÃO & SCROLL =================
function initNavigation() {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", !isHidden);
      iconOpen.classList.toggle("hidden", isHidden);
      iconClose.classList.toggle("hidden", !isHidden);
      mobileBtn.setAttribute("aria-expanded", String(isHidden));
    });
  }

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeReserveModal();
      closeCookieModal();
      closeLgpdModal();
      closeMobileMenu();
    }
  });
}

window.closeMobileMenu = function () {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");
  if (!mobileMenu) return;

  mobileMenu.classList.add("hidden");
  iconOpen?.classList.remove("hidden");
  iconClose?.classList.add("hidden");
  mobileBtn?.setAttribute("aria-expanded", "false");
};

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ================= HORÁRIO DE FUNCIONAMENTO (SP) =================
function initOperatingHours() {
  updateOperatingStatus();
  setInterval(updateOperatingStatus, 60000);
}

function updateOperatingStatus() {
  const heroDot = document.getElementById("hero-status-dot");
  const heroText = document.getElementById("hero-status-text");
  const locBadge = document.getElementById("location-status-badge");

  const nowSp = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );
  const day = nowSp.getDay();
  const currentMinutes = nowSp.getHours() * 60 + nowSp.getMinutes();

  const schedule = {
    0: { open: 16 * 60, close: 24 * 60, label: "Domingo • 16h às 00h" },
    1: null,
    2: null,
    3: { open: 16 * 60, close: 24 * 60, label: "Quarta • 16h às 00h" },
    4: { open: 16 * 60, close: 24 * 60, label: "Quinta • 16h às 00h" },
    5: { open: 18 * 60, close: 25 * 60, label: "Sexta • 18h às 01h" },
    6: { open: 16 * 60, close: 25 * 60, label: "Sábado • 16h às 01h" }
  };

  const prevDay = (day + 6) % 7;
  const prevSched = schedule[prevDay];
  const isOpenFromYesterday =
    prevSched && prevSched.close > 24 * 60 && currentMinutes < prevSched.close - 24 * 60;

  const todaySched = schedule[day];
  const isOpenToday =
    todaySched && currentMinutes >= todaySched.open && currentMinutes < todaySched.close;

  const isOpen = Boolean(isOpenFromYesterday || isOpenToday);

  if (isOpen) {
    if (heroDot) heroDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse";
    if (heroText) {
      heroText.textContent = isOpenFromYesterday
        ? "Aberto agora • Encerra à 01:00"
        : `Aberto agora • ${todaySched.label}`;
    }
    if (locBadge) {
      locBadge.textContent = "Aberto Agora";
      locBadge.className =
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    }
  } else {
    if (heroDot) heroDot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
    let nextMessage = "Fechado no momento • Abrimos Quarta às 16h";
    if (todaySched && currentMinutes < todaySched.open) {
      const openHour = String(Math.floor(todaySched.open / 60)).padStart(2, "0");
      nextMessage = `Fechado agora • Abrimos hoje às ${openHour}:00`;
    } else if (day === 2) {
      nextMessage = "Fechado hoje • Abrimos amanhã (Quarta) às 16:00";
    } else if (day === 3 || day === 5 || day === 6) {
      nextMessage = "Fechado agora • Abrimos amanhã às 16:00";
    } else if (day === 4) {
      nextMessage = "Fechado agora • Abrimos amanhã (Sexta) às 18:00";
    }

    if (heroText) heroText.textContent = nextMessage;
    if (locBadge) {
      locBadge.textContent = "Fechado Agora";
      locBadge.className =
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30";
    }
  }
}

// ================= CARDÁPIO INTERATIVO =================
function initMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tab");
  renderMenuCategory("cafes");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.category || "cafes";
      renderMenuCategory(category);
    });
  });
}

function renderMenuCategory(category) {
  const grid = document.getElementById("menu-items-grid");
  if (!grid) return;

  const items = MENU_ITEMS[category] || MENU_ITEMS.cafes;
  grid.innerHTML = items
    .map(
      (item, index) => `
      <article class="menu-item-enter card-hover p-6 rounded-2xl bg-forest-850 border border-gold-500/20 flex flex-col justify-between" style="animation-delay: ${index * 60}ms">
        <div>
          <div class="flex items-start justify-between gap-3">
            <span class="px-2.5 py-0.5 rounded-md bg-gold-500/15 text-gold-400 text-[11px] font-display uppercase tracking-wider font-bold">
              ${escapeHtml(item.tag)}
            </span>
            <span class="font-display text-lg font-bold text-gold-300 shrink-0">
              ${escapeHtml(item.price)}
            </span>
          </div>
          <h3 class="mt-3 font-display text-xl font-bold uppercase text-white">
            ${escapeHtml(item.name)}
          </h3>
          <p class="mt-2 text-sm text-stone-300 leading-relaxed">
            ${escapeHtml(item.desc)}
          </p>
        </div>
      </article>
    `
    )
    .join("");
}

// ================= SELETOR DE ESTRELAS =================
function initStarSelector() {
  const buttons = document.querySelectorAll(".star-btn");
  const ratingInput = document.getElementById("review-rating");
  const starLabel = document.getElementById("star-label");

  const labels = {
    1: "1/5 - Pode melhorar",
    2: "2/5 - Regular",
    3: "3/5 - Bom",
    4: "4/5 - Muito bom!",
    5: "5/5 - Excelente!"
  };

  function updateStars(val) {
    if (ratingInput) ratingInput.value = String(val);
    if (starLabel) starLabel.textContent = labels[val] || "";
    buttons.forEach((btn) => {
      const starVal = Number(btn.dataset.star);
      btn.classList.toggle("text-gold-400", starVal <= val);
      btn.classList.toggle("text-stone-600", starVal > val);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      updateStars(Number(btn.dataset.star));
    });
  });

  updateStars(5);
}

// ================= SISTEMA DE AVALIAÇÕES REAIS (FIREBASE) =================
async function initReviewsSystem() {
  const filterButtons = document.querySelectorAll(".review-filter");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentReviewFilter = btn.dataset.filter || "all";
      renderReviewsList();
    });
  });

  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", handleReviewSubmit);
  }

  const connected = await bootFirebase();

  if (!connected || !db || !firestoreFns) {
    updateRatingSummary([]);
    renderReviewsEmptyState(
      "Conecte-se à internet ou abra pelo link publicado (GitHub Pages / Live Server) para carregar as avaliações em tempo real."
    );
    return;
  }

  const { collection, onSnapshot, query, orderBy } = firestoreFns;
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, orderBy("createdAt", "desc"));

  onSnapshot(
    q,
    (snapshot) => {
      allReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      updateRatingSummary(allReviews);
      renderReviewsList();
    },
    (error) => {
      console.error("Erro ao carregar avaliações:", error);
      updateRatingSummary([]);
      renderReviewsEmptyState(
        "Não foi possível carregar as avaliações agora. Verifique se as regras do Firestore foram publicadas."
      );
    }
  );
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  if (!isFirebaseConfigured || !db || !firestoreFns) {
    showToast("Banco de dados indisponível neste modo de visualização.");
    return;
  }

  const nameInput = document.getElementById("review-name");
  const ratingInput = document.getElementById("review-rating");
  const categoryInput = document.getElementById("review-category");
  const commentInput = document.getElementById("review-comment");
  const lgpdInput = document.getElementById("review-lgpd");
  const submitBtn = document.getElementById("review-submit-btn");

  const name = nameInput.value.trim();
  const rating = parseInt(ratingInput.value, 10);
  const category = categoryInput.value;
  const comment = commentInput.value.trim();

  if (name.length < 2 || comment.length < 5 || !lgpdInput.checked) {
    showToast("Preencha todos os campos corretamente.");
    return;
  }

  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Publicando...";

  try {
    const { collection, addDoc, serverTimestamp } = firestoreFns;
    await addDoc(collection(db, "reviews"), {
      name,
      rating,
      category,
      comment,
      createdAt: serverTimestamp()
    });

    nameInput.value = "";
    commentInput.value = "";
    lgpdInput.checked = false;
    showToast("Obrigado! Sua avaliação real foi publicada.");
  } catch (err) {
    console.error("Erro ao publicar avaliação:", err);
    showToast("Erro ao enviar avaliação. Confira se publicou as regras no Firebase.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

function updateRatingSummary(reviews) {
  const avgScoreEl = document.getElementById("avg-rating-score");
  const avgStarsEl = document.getElementById("avg-rating-stars");
  const totalCountEl = document.getElementById("total-reviews-count");
  const barsEl = document.getElementById("rating-bars");

  const total = reviews.length;

  if (total === 0) {
    if (avgScoreEl) avgScoreEl.textContent = "—";
    if (avgStarsEl) avgStarsEl.textContent = "☆☆☆☆☆";
    if (totalCountEl) totalCountEl.textContent = "Seja o 1º a avaliar";
  } else {
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const avg = (sum / total).toFixed(1).replace(".", ",");
    const rounded = Math.round(sum / total);

    if (avgScoreEl) avgScoreEl.textContent = avg;
    if (avgStarsEl) {
      avgStarsEl.textContent = "★".repeat(rounded) + "☆".repeat(5 - rounded);
    }
    if (totalCountEl) {
      totalCountEl.textContent =
        total === 1 ? "1 avaliação real" : `${total} avaliações reais`;
    }
  }

  if (barsEl) {
    barsEl.innerHTML = [5, 4, 3, 2, 1]
      .map((star) => {
        const count = reviews.filter((r) => Number(r.rating) === star).length;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return `
          <div class="flex items-center gap-2">
            <span class="w-8 text-stone-300 font-medium">${star}★</span>
            <div class="flex-1 h-2 rounded-full bg-forest-900 overflow-hidden">
              <div class="h-full bg-gold-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
            <span class="w-7 text-right text-stone-400">${count}</span>
          </div>
        `;
      })
      .join("");
  }
}

function renderReviewsList() {
  const listEl = document.getElementById("reviews-list");
  if (!listEl) return;

  const filtered = allReviews.filter((r) => {
    if (currentReviewFilter === "all") return true;
    if (currentReviewFilter === "5") return Number(r.rating) === 5;
    return r.category === currentReviewFilter;
  });

  if (filtered.length === 0) {
    renderReviewsEmptyState(
      allReviews.length === 0
        ? "Ainda não há avaliações publicadas. Seja o primeiro cliente a compartilhar sua experiência!"
        : "Nenhuma avaliação encontrada neste filtro."
    );
    return;
  }

  listEl.innerHTML = filtered
    .map((rev) => {
      const rating = Math.min(5, Math.max(1, Number(rev.rating) || 5));
      const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
      const dateText = formatTimestamp(rev.createdAt);
      const initial = escapeHtml((rev.name || "C").charAt(0).toUpperCase());

      return `
        <article class="card-hover p-5 sm:p-6 rounded-2xl bg-forest-850 border border-gold-500/20">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 font-display font-bold flex items-center justify-center shrink-0">
                ${initial}
              </div>
              <div>
                <h4 class="font-semibold text-white text-sm sm:text-base">${escapeHtml(rev.name)}</h4>
                <div class="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-0.5">
                  <span class="text-gold-400 tracking-wider">${stars}</span>
                  <span>•</span>
                  <span class="text-gold-300/90">${escapeHtml(rev.category || "Experiência")}</span>
                </div>
              </div>
            </div>
            <span class="text-[11px] text-stone-400 shrink-0">${dateText}</span>
          </div>
          <p class="mt-3.5 text-sm text-stone-200 leading-relaxed">
            ${escapeHtml(rev.comment)}
          </p>
        </article>
      `;
    })
    .join("");
}

function renderReviewsEmptyState(message) {
  const listEl = document.getElementById("reviews-list");
  if (!listEl) return;
  listEl.innerHTML = `
    <div class="p-8 rounded-2xl bg-forest-850 border border-gold-500/20 text-center text-stone-300 text-sm">
      ${escapeHtml(message)}
    </div>
  `;
}

function formatTimestamp(ts) {
  if (!ts) return "Agora mesmo";
  try {
    const date = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return "Recente";
  }
}

// ================= MODAL DE RESERVAS (WHATSAPP) =================
window.openReserveModal = function (preselectedEvent = "") {
  const modal = document.getElementById("reserve-modal");
  const eventSelect = document.getElementById("res-event");
  if (!modal) return;

  if (preselectedEvent && eventSelect) {
    const optionExists = Array.from(eventSelect.options).some(
      (opt) => opt.value === preselectedEvent
    );
    if (optionExists) eventSelect.value = preselectedEvent;
  }

  resetReserveModal();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
};

window.closeReserveModal = function () {
  const modal = document.getElementById("reserve-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
};

window.resetReserveModal = function () {
  document.getElementById("reserve-form-view")?.classList.remove("hidden");
  document.getElementById("reserve-success-view")?.classList.add("hidden");
};

function initReservationForm() {
  const form = document.getElementById("reserve-form");
  const phoneInput = document.getElementById("res-phone");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 6) {
        v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        v = `(${v}`;
      }
      e.target.value = v;
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("res-name").value.trim();
      const phone = document.getElementById("res-phone").value.trim();
      const guests = document.getElementById("res-guests").value;
      const event = document.getElementById("res-event").value;
      const time = document.getElementById("res-time").value;
      const notes = document.getElementById("res-notes").value.trim();

      const protocol = `FH-${Math.floor(1000 + Math.random() * 9000)}`;

      const lines = [
        `*RESERVA DE MESA - CAFÉ FULL HOUSE ROCK BAR*`,
        `*Protocolo:* ${protocol}`,
        `*Nome:* ${name}`,
        `*Telefone:* ${phone}`,
        `*Pessoas:* ${guests}`,
        `*Dia/Evento:* ${event}`,
        `*Horário previsto:* ${time}`
      ];

      if (notes) lines.push(`*Observações:* ${notes}`);

      lastReservationSummary = lines.join("\n");
      const encodedMsg = encodeURIComponent(lastReservationSummary);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      const protocolBadge = document.getElementById("reserve-protocol-badge");
      const waLink = document.getElementById("whatsapp-direct-link");
      if (protocolBadge) protocolBadge.textContent = `Protocolo: ${protocol}`;
      if (waLink) waLink.href = waUrl;

      document.getElementById("reserve-form-view")?.classList.add("hidden");
      document.getElementById("reserve-success-view")?.classList.remove("hidden");

      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }
}

window.copyReservationSummary = function () {
  if (!lastReservationSummary) return;
  navigator.clipboard?.writeText(lastReservationSummary);
  showToast("Comprovante da reserva copiado!");
};

window.copyAddress = function () {
  const address = "R. Sen. Flaquer, 684 - Centro, Santo André - SP, 09010-160";
  navigator.clipboard?.writeText(address);
  showToast("Endereço copiado para a área de transferência!");
};

// ================= COOKIES & LGPD =================
function initCookieConsent() {
  const saved = localStorage.getItem("cfh_cookie_consent");
  if (!saved) {
    setTimeout(() => {
      document.getElementById("cookie-banner")?.classList.remove("hidden");
    }, 900);
  }
}

window.saveCookiePreferences = function (analytics, marketing) {
  const consent = {
    necessary: true,
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem("cfh_cookie_consent", JSON.stringify(consent));
  document.getElementById("cookie-banner")?.classList.add("hidden");
  closeCookieModal();
  showToast("Preferências de privacidade salvas!");
};

window.openCookieModal = function () {
  const modal = document.getElementById("cookie-modal");
  if (!modal) return;
  try {
    const saved = JSON.parse(localStorage.getItem("cfh_cookie_consent") || "{}");
    const analyticsEl = document.getElementById("cookie-analytics");
    const marketingEl = document.getElementById("cookie-marketing");
    if (analyticsEl) analyticsEl.checked = Boolean(saved.analytics);
    if (marketingEl) marketingEl.checked = Boolean(saved.marketing);
  } catch {
    // ignora erro de parse
  }
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeCookieModal = function () {
  const modal = document.getElementById("cookie-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

window.saveCustomCookies = function () {
  const analytics = document.getElementById("cookie-analytics")?.checked || false;
  const marketing = document.getElementById("cookie-marketing")?.checked || false;
  saveCookiePreferences(analytics, marketing);
};

window.openLgpdModal = function () {
  const modal = document.getElementById("lgpd-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeLgpdModal = function () {
  const modal = document.getElementById("lgpd-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

// ================= UTILITÁRIOS =================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}