// ================= DADOS DO CARDÁPIO =================
const MENU_DATA = {
  cafes: [
    {
      name: 'Espresso Full House Blend',
      price: 'R$ 9,90',
      tag: 'Especial da Casa',
      desc: 'Grãos 100% arábica de torra média com notas de chocolate amargo e avelã.'
    },
    {
      name: 'Cappuccino Rock & Cacau',
      price: 'R$ 15,90',
      tag: 'Mais Pedido',
      desc: 'Espresso duplo, leite vaporizado cremoso, borda de ganache e cacau 70%.'
    },
    {
      name: 'Irish Coffee Full House',
      price: 'R$ 26,90',
      tag: 'Alcoólico',
      desc: 'Café filtrado especial, whiskey envelhecido, açúcar mascavo e chantilly artesanal.'
    },
    {
      name: 'Cold Brew Tônica & Laranja',
      price: 'R$ 17,50',
      tag: 'Refrescante',
      desc: 'Extração a frio por 18h servida com água tônica, gelo cristalino e rodela de laranja bahia.'
    },
    {
      name: 'Mocha Caramelo Salgado',
      price: 'R$ 18,90',
      tag: 'Doce na Medida',
      desc: 'Calda artesanal de caramelo flor de sal, espresso intenso e leite cremoso.'
    },
    {
      name: 'Affogato Royal',
      price: 'R$ 19,90',
      tag: 'Sobremesa',
      desc: 'Bola generosa de sorvete de baunilha banhada no espresso quente na hora.'
    }
  ],
  drinks: [
    {
      name: 'Full House Gold Negroni',
      price: 'R$ 32,00',
      tag: 'Autoral',
      desc: 'Gin infusionado com especiarias, vermute tinto, Campari e twist de laranja defumada.'
    },
    {
      name: 'Old Fashioned Highway',
      price: 'R$ 34,00',
      tag: 'Clássico Rock',
      desc: 'Bourbon selecionado, bitter aromático, torrão de açúcar demerara e cereja marrasquino.'
    },
    {
      name: 'Gin Tônica Bosque Verde',
      price: 'R$ 29,90',
      tag: 'Refrescante',
      desc: 'Gin artesanal, xarope de maçã verde, alecrim fresco, zimbro e água tônica.'
    },
    {
      name: 'Chopp IPA Artesanal 500ml',
      price: 'R$ 19,90',
      tag: 'Torneira Gelada',
      desc: 'Aromática, cítrica e encorpada, servida na temperatura ideal.'
    },
    {
      name: 'Moscow Mule da Casa',
      price: 'R$ 28,90',
      tag: 'Sucesso',
      desc: 'Vodka premium, suco de limão tahiti fresco e espuma cremosa de gengibre.'
    },
    {
      name: 'Soda Italiana Frutas Vermelhas',
      price: 'R$ 16,50',
      tag: 'Sem Álcool',
      desc: 'Redução artesanal de morango, amora e framboesa com água com gás e hortelã.'
    }
  ],
  petiscos: [
    {
      name: 'Burger Full House Double',
      price: 'R$ 38,90',
      tag: 'Carro-Chefe',
      desc: 'Dois blends bovinos 120g, cheddar inglês, bacon crocante, cebola caramelizada no café e pão brioche.'
    },
    {
      name: 'Fritas Rústicas com Alecrim & Páprica',
      price: 'R$ 27,90',
      tag: 'Para Compartilhar',
      desc: 'Batatas cortadas à mão, temperadas com ervas finas e acompanhadas de maionese defumada.'
    },
    {
      name: 'Iscas de Filé ao Molho Gorgonzola',
      price: 'R$ 54,90',
      tag: 'Porção Premium',
      desc: 'Tiras de filé mignon salteadas, creme suave de gorgonzola e cestinha de pão italiano.'
    },
    {
      name: 'Coxinha Cremosa de Costela (6 un.)',
      price: 'R$ 32,90',
      tag: 'Artesanal',
      desc: 'Massa leve sem farinha, recheio de costela desfiada por 8h e requeijão de corte.'
    },
    {
      name: 'Bruschetta Mediterrânea',
      price: 'R$ 25,90',
      tag: 'Vegetariano',
      desc: 'Fatias de pão de fermentação natural tostadas com tomate confit, manjericão e azeite extravirgem.'
    },
    {
      name: 'Brownie Belga com Nozes',
      price: 'R$ 21,90',
      tag: 'Doce',
      desc: 'Servido morno com calda quente de chocolate meio amargo e castanhas tostadas.'
    }
  ]
};

// ================= AVALIAÇÕES INICIAIS =================
const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: 'Ricardo Almeida',
    rating: 5,
    category: 'Shows & Ambiente',
    comment: 'Ambiente sensacional no centro de Santo André! O som ao vivo tem qualidade impecável e o atendimento faz você se sentir em casa.',
    date: 'Há 2 dias'
  },
  {
    id: 2,
    name: 'Camila Ferreira',
    rating: 5,
    category: 'Cafés & Drinks',
    comment: 'O Cappuccino Rock & Cacau e o Gin Tônica Bosque Verde são perfeitos. Decoração linda em verde e dourado!',
    date: 'Há 5 dias'
  },
  {
    id: 3,
    name: 'Lucas Mendes',
    rating: 5,
    category: 'Atendimento & Gastronomia',
    comment: 'Fui comemorar meu aniversário com amigos e fizemos a reserva pelo WhatsApp super rápido. Burger Full House nota 10!',
    date: 'Há 1 semana'
  },
  {
    id: 4,
    name: 'Fernanda Souza',
    rating: 4,
    category: 'Shows & Ambiente',
    comment: 'Ótima opção para curtir um rock de qualidade sem muvuca. Recomendo reservar mesa antes nos sábados.',
    date: 'Há 2 semanas'
  }
];

let reviews = JSON.parse(localStorage.getItem('fullhouse_reviews')) || [...DEFAULT_REVIEWS];
let activeReviewFilter = 'all';
let lastReservationText = '';

// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
  updateOperatingStatus();
  setInterval(updateOperatingStatus, 60000);

  renderMenu('cafes');
  setupMenuTabs();

  renderReviews();
  setupReviewForm();
  setupReviewFilters();

  setupMobileMenu();
  setupPhoneMask();
  setupReservationForm();
  initCookieConsent();
  setupScrollReveal();
  setupNavbarScroll();
});

// ================= REVELAÇÃO SUAVE AO ROLAR =================
function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 24) {
        navbar.classList.add('shadow-xl', 'shadow-black/50', 'bg-forest-950/95');
      } else {
        navbar.classList.remove('shadow-xl', 'shadow-black/50', 'bg-forest-950/95');
      }
    },
    { passive: true }
  );
}

// ================= STATUS DE FUNCIONAMENTO (HORÁRIO DE SP) =================
function updateOperatingStatus() {
  const now = new Date();
  const spString = now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
  const spDate = new Date(spString);
  const day = spDate.getDay();
  const hour = spDate.getHours();
  const minute = spDate.getMinutes();
  const currentMinutes = hour * 60 + minute;

  let isOpen = false;
  let statusMessage = 'Fechado no momento • Abrimos quarta às 16h';

  if (day === 3 || day === 4 || day === 0) {
    if (currentMinutes >= 960 && currentMinutes < 1440) {
      isOpen = true;
      statusMessage = 'Aberto agora • Hoje até 00:00';
    } else if (currentMinutes < 960) {
      statusMessage = 'Fechado agora • Abre hoje às 16:00';
    }
  } else if (day === 5) {
    if (currentMinutes >= 1080) {
      isOpen = true;
      statusMessage = 'Aberto agora • Hoje até 01:00';
    } else {
      statusMessage = 'Fechado agora • Abre hoje às 18:00';
    }
  } else if (day === 6) {
    if (currentMinutes < 60) {
      isOpen = true;
      statusMessage = 'Aberto agora • Até 01:00';
    } else if (currentMinutes >= 960) {
      isOpen = true;
      statusMessage = 'Aberto agora • Hoje até 01:00';
    } else {
      statusMessage = 'Fechado agora • Abre hoje às 16:00';
    }
  } else if (day === 1) {
    statusMessage = 'Fechado hoje • Abrimos quarta às 16:00';
  } else if (day === 2) {
    statusMessage = 'Fechado hoje • Abrimos amanhã às 16:00';
  }

  if (day === 0 && currentMinutes < 60) {
    isOpen = true;
    statusMessage = 'Aberto agora • Até 01:00';
  }

  const heroDot = document.getElementById('hero-status-dot');
  const heroText = document.getElementById('hero-status-text');
  const locBadge = document.getElementById('location-status-badge');

  if (heroDot && heroText) {
    heroDot.className = `w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`;
    heroText.textContent = statusMessage;
  }

  if (locBadge) {
    locBadge.textContent = isOpen ? 'Aberto Agora' : 'Fechado Agora';
    locBadge.className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
      isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
    }`;
  }
}

// ================= CARDÁPIO COM ANIMAÇÃO EM CASCATA =================
function setupMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.category);
    });
  });
}

function renderMenu(category) {
  const grid = document.getElementById('menu-items-grid');
  if (!grid) return;

  const items = MENU_DATA[category] || [];
  grid.innerHTML = items
    .map(
      (item, index) => `
      <div
        class="card-hover menu-item-animate p-6 rounded-2xl bg-forest-850 border border-gold-500/20 flex flex-col justify-between"
        style="animation-delay: ${index * 65}ms"
      >
        <div>
          <div class="flex items-start justify-between gap-3">
            <span class="px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-400 text-[11px] font-display uppercase tracking-wider font-bold">
              ${item.tag}
            </span>
            <span class="font-display text-lg font-bold text-gold-400 shrink-0">${item.price}</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-bold uppercase text-white">${item.name}</h3>
          <p class="mt-2 text-sm text-stone-300 leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `
    )
    .join('');
}

// ================= MENU MOBILE / TABLET =================
function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.getElementById('menu-icon-open').classList.add('hidden');
      document.getElementById('menu-icon-close').classList.remove('hidden');
    } else {
      closeMobileMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  if (!menu || !btn) return;
  menu.classList.add('hidden');
  btn.setAttribute('aria-expanded', 'false');
  document.getElementById('menu-icon-open').classList.remove('hidden');
  document.getElementById('menu-icon-close').classList.add('hidden');
}

// ================= RESERVAS & WHATSAPP =================
function openReserveModal(preselectedEvent = '') {
  const modal = document.getElementById('reserve-modal');
  const eventSelect = document.getElementById('res-event');

  if (preselectedEvent && eventSelect) {
    for (let i = 0; i < eventSelect.options.length; i++) {
      if (eventSelect.options[i].value.includes(preselectedEvent)) {
        eventSelect.selectedIndex = i;
        break;
      }
    }
  }

  resetReserveModal();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeReserveModal() {
  const modal = document.getElementById('reserve-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function resetReserveModal() {
  document.getElementById('reserve-form-view').classList.remove('hidden');
  document.getElementById('reserve-success-view').classList.add('hidden');
}

function setupPhoneMask() {
  const phoneInput = document.getElementById('res-phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
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

function setupReservationForm() {
  const form = document.getElementById('reserve-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const guests = document.getElementById('res-guests').value;
    const eventName = document.getElementById('res-event').value;
    const time = document.getElementById('res-time').value;
    const notes = document.getElementById('res-notes').value.trim();

    const protocol = `#FH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const messageLines = [
      `🎸 *SOLICITAÇÃO DE RESERVA - CAFÉ FULL HOUSE*`,
      `*Protocolo:* ${protocol}`,
      `*Cliente:* ${name}`,
      `*Contato:* ${phone}`,
      `*Programação:* ${eventName}`,
      `*Pessoas:* ${guests}`,
      `*Horário Previsto:* ${time}`,
      notes ? `*Observações:* ${notes}` : null,
      `\n_Enviado pelo site oficial do Café Full House Rock Bar_`
    ].filter(Boolean);

    lastReservationText = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/5511968288545?text=${encodeURIComponent(lastReservationText)}`;

    document.getElementById('reserve-protocol-badge').textContent = `Protocolo: ${protocol}`;
    document.getElementById('whatsapp-direct-link').href = whatsappUrl;

    document.getElementById('reserve-form-view').classList.add('hidden');
    document.getElementById('reserve-success-view').classList.remove('hidden');

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

function copyReservationSummary() {
  if (!lastReservationText) return;
  navigator.clipboard.writeText(lastReservationText).then(() => {
    showToast('Comprovante da reserva copiado!');
  });
}

// ================= AVALIAÇÕES =================
function setupReviewForm() {
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('review-rating');
  const starLabel = document.getElementById('star-label');
  const labels = {
    1: '1/5 - Precisa melhorar',
    2: '2/5 - Regular',
    3: '3/5 - Bom',
    4: '4/5 - Muito bom!',
    5: '5/5 - Excelente!'
  };

  starBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = Number(btn.dataset.star);
      ratingInput.value = val;
      starLabel.textContent = labels[val];

      starBtns.forEach((b) => {
        const bVal = Number(b.dataset.star);
        b.classList.toggle('text-gold-400', bVal <= val);
        b.classList.toggle('text-stone-600', bVal > val);
      });
    });
  });

  const form = document.getElementById('review-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      name: document.getElementById('review-name').value.trim(),
      rating: Number(ratingInput.value),
      category: document.getElementById('review-category').value,
      comment: document.getElementById('review-comment').value.trim(),
      date: 'Agora mesmo'
    };

    reviews.unshift(newReview);
    localStorage.setItem('fullhouse_reviews', JSON.stringify(reviews));

    form.reset();
    ratingInput.value = 5;
    starLabel.textContent = labels[5];
    starBtns.forEach((b) => {
      b.classList.add('text-gold-400');
      b.classList.remove('text-stone-600');
    });

    renderReviews();
    showToast('Obrigado! Sua avaliação foi publicada.');
  });
}

function setupReviewFilters() {
  const filterBtns = document.querySelectorAll('.review-filter');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeReviewFilter = btn.dataset.filter;
      renderReviews();
    });
  });
}

function renderReviews() {
  const listEl = document.getElementById('reviews-list');
  const avgEl = document.getElementById('avg-rating-score');
  const countEl = document.getElementById('total-reviews-count');
  const barsEl = document.getElementById('rating-bars');

  if (!listEl) return;

  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = total ? (sum / total).toFixed(1) : '5.0';

  avgEl.textContent = avg;
  countEl.textContent = `${total} ${total === 1 ? 'avaliação' : 'avaliações'}`;

  barsEl.innerHTML = [5, 4, 3, 2, 1]
    .map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      const pct = total ? Math.round((count / total) * 100) : 0;
      return `
        <div class="flex items-center gap-2">
          <span class="w-6 text-stone-300 font-semibold">${star}★</span>
          <div class="flex-1 h-2 rounded-full bg-forest-900 overflow-hidden">
            <div class="h-full bg-gold-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
          </div>
          <span class="w-8 text-right text-stone-400">${pct}%</span>
        </div>
      `;
    })
    .join('');

  const filtered = reviews.filter((r) => {
    if (activeReviewFilter === 'all') return true;
    if (activeReviewFilter === '5') return r.rating === 5;
    return r.category === activeReviewFilter;
  });

  listEl.innerHTML = filtered
    .map((r, index) => {
      const initials = r.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

      return `
        <article
          class="card-hover menu-item-animate p-6 rounded-2xl bg-forest-850 border border-gold-500/20"
          style="animation-delay: ${index * 60}ms"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 font-display font-bold flex items-center justify-center">
                ${initials}
              </div>
              <div>
                <h4 class="font-semibold text-white">${r.name}</h4>
                <span class="text-xs text-gold-400">${r.category} • ${r.date}</span>
              </div>
            </div>
            <div class="text-gold-400 text-sm tracking-wider" aria-label="${r.rating} de 5 estrelas">
              ${stars}
            </div>
          </div>
          <p class="mt-3 text-sm text-stone-300 leading-relaxed">${r.comment}</p>
        </article>
      `;
    })
    .join('');
}

// ================= LGPD & COOKIES =================
function initCookieConsent() {
  const saved = localStorage.getItem('fullhouse_cookie_consent');
  if (!saved) {
    document.getElementById('cookie-banner').classList.remove('hidden');
  }
}

function saveCookiePreferences(analytics, marketing) {
  const prefs = {
    essential: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('fullhouse_cookie_consent', JSON.stringify(prefs));
  document.getElementById('cookie-banner').classList.add('hidden');
  closeCookieModal();
  showToast('Preferências de cookies salvas!');
}

function openCookieModal() {
  const saved = JSON.parse(localStorage.getItem('fullhouse_cookie_consent') || '{}');
  document.getElementById('cookie-analytics').checked = Boolean(saved.analytics);
  document.getElementById('cookie-marketing').checked = Boolean(saved.marketing);

  const modal = document.getElementById('cookie-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCookieModal() {
  const modal = document.getElementById('cookie-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function saveCustomCookies() {
  const analytics = document.getElementById('cookie-analytics').checked;
  const marketing = document.getElementById('cookie-marketing').checked;
  saveCookiePreferences(analytics, marketing);
}

function openLgpdModal() {
  const modal = document.getElementById('lgpd-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeLgpdModal() {
  const modal = document.getElementById('lgpd-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ================= UTILITÁRIOS =================
function copyAddress() {
  const address = 'R. Sen. Flaquer, 684 - Centro, Santo André - SP, 09010-160';
  navigator.clipboard.writeText(address).then(() => {
    showToast('Endereço copiado para a área de transferência!');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}