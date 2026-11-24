/**
 * ============================================================================
 * LES CONSEILS DE MANON — SCRIPT PRINCIPAL PARTAGÉ (main.js)
 * Gère : Navigation unifiée responsive, Formatage des fiches, Recherche &
 *        Filtrage par budget 🪙, Lightbox zoom photo, et Retour en haut.
 * ============================================================================
 */

(function () {
    const isSubPage = window.location.pathname.includes('/pages/');
    const rootPrefix = isSubPage ? '../' : '';
    const pagesPrefix = isSubPage ? '' : 'pages/';
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    /**
     * 1. INJECTION DE LA BARRE DE NAVIGATION UNIFIÉE & DU TIROIR MOBILE
     */
    function initSharedNavigation() {
        const navMount = document.getElementById('site-nav');
        if (!navMount) return;

        const isAromaActive = ['aroma.html', 'aroma_he.html', 'aroma_hydro.html'].includes(currentFile);
        const isActive = (file) => currentFile === file ? 'active' : '';

        navMount.innerHTML = `
            <header class="site-header">
                <nav class="navbar" aria-label="Navigation principale">
                    <a href="${rootPrefix}index.html" class="nav-brand" title="Retour à l'accueil vidéo">
                        <img src="${rootPrefix}assets/images/logo.webp" alt="Logo Les Conseils de Manon" class="nav-brand-logo">
                        <div class="nav-brand-text">
                            <span class="nav-brand-title">Les Conseils de Manon</span>
                            <span class="nav-brand-sub">Santé Naturelle</span>
                        </div>
                    </a>

                    <ul class="nav-links">
                        <li><a href="${rootPrefix}sommaire.html" class="nav-link ${isActive('sommaire.html')}">Sommaire</a></li>
                        <li class="nav-item-dropdown">
                            <a href="${pagesPrefix}aroma.html" class="nav-link ${isAromaActive ? 'active' : ''}">Aromathérapie ▾</a>
                            <div class="nav-dropdown">
                                <a href="${pagesPrefix}aroma.html" class="${isActive('aroma.html')}">🌿 Portail Aromathérapie</a>
                                <a href="${pagesPrefix}aroma_he.html" class="${isActive('aroma_he.html')}">💧 Huiles Essentielles</a>
                                <a href="${pagesPrefix}aroma_hydro.html" class="${isActive('aroma_hydro.html')}">🌸 Hydrolats & Eaux florales</a>
                            </div>
                        </li>
                        <li><a href="${pagesPrefix}phyto.html" class="nav-link ${isActive('phyto.html')}">Phytothérapie</a></li>
                        <li><a href="${pagesPrefix}gemmo.html" class="nav-link ${isActive('gemmo.html')}">Gemmothérapie</a></li>
                        <li><a href="${pagesPrefix}coeur.html" class="nav-link ${isActive('coeur.html')}">Coups de Cœur</a></li>
                        <li><a href="${pagesPrefix}micro.html" class="nav-link ${isActive('micro.html')}">Micronutrition</a></li>
                        <li><a href="${pagesPrefix}veto.html" class="nav-link ${isActive('veto.html')}">Vétérinaire</a></li>
                    </ul>

                    <div class="nav-actions">
                        <a href="${pagesPrefix}imc.html" class="nav-pill-btn ${isActive('imc.html')}" title="Calculateur d'IMC">⚖️ IMC</a>
                        <a href="${pagesPrefix}contact.html" class="nav-pill-btn ${isActive('contact.html')}" title="Contacter Manon">✉️ Contact</a>
                    </div>

                    <button class="nav-burger" id="openMobileMenu" aria-label="Ouvrir le menu" aria-expanded="false">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </nav>
            </header>

            <div class="mobile-drawer-backdrop" id="drawerBackdrop"></div>
            <aside class="mobile-drawer" id="mobileDrawer" aria-label="Menu mobile">
                <div class="drawer-header">
                    <div class="nav-brand-text">
                        <span class="nav-brand-title">Les Conseils de Manon</span>
                        <span class="nav-brand-sub">Navigation rapide</span>
                    </div>
                    <button class="drawer-close" id="closeMobileMenu" aria-label="Fermer le menu">&times;</button>
                </div>

                <nav class="drawer-nav">
                    <a href="${rootPrefix}index.html" class="drawer-link ${isActive('index.html')}"><span>🏠 Accueil (Vidéo)</span><span>→</span></a>
                    <a href="${rootPrefix}sommaire.html" class="drawer-link ${isActive('sommaire.html')}"><span>🧭 Sommaire interactif</span><span>→</span></a>
                    <a href="${pagesPrefix}aroma.html" class="drawer-link ${isActive('aroma.html')}"><span>🌿 Aromathérapie</span><span>→</span></a>
                    <div class="drawer-sublinks">
                        <a href="${pagesPrefix}aroma_he.html" class="drawer-sublink ${isActive('aroma_he.html')}">💧 Huiles Essentielles</a>
                        <a href="${pagesPrefix}aroma_hydro.html" class="drawer-sublink ${isActive('aroma_hydro.html')}">🌸 Hydrolats</a>
                    </div>
                    <a href="${pagesPrefix}phyto.html" class="drawer-link ${isActive('phyto.html')}"><span>🍵 Phytothérapie</span><span>→</span></a>
                    <a href="${pagesPrefix}gemmo.html" class="drawer-link ${isActive('gemmo.html')}"><span>🌱 Gemmothérapie</span><span>→</span></a>
                    <a href="${pagesPrefix}coeur.html" class="drawer-link ${isActive('coeur.html')}"><span>💚 Coups de Cœur & Myco</span><span>→</span></a>
                    <a href="${pagesPrefix}micro.html" class="drawer-link ${isActive('micro.html')}"><span>✨ Micronutrition</span><span>→</span></a>
                    <a href="${pagesPrefix}veto.html" class="drawer-link ${isActive('veto.html')}"><span>🐾 Conseils Vétérinaires</span><span>→</span></a>
                </nav>

                <div class="drawer-footer">
                    <a href="${pagesPrefix}imc.html" class="${isActive('imc.html')}">⚖️ Calcul IMC</a>
                    <a href="${pagesPrefix}contact.html" class="${isActive('contact.html')}">✉️ Contact</a>
                </div>
            </aside>
        `;

        const openBtn = document.getElementById('openMobileMenu');
        const closeBtn = document.getElementById('closeMobileMenu');
        const drawer = document.getElementById('mobileDrawer');
        const backdrop = document.getElementById('drawerBackdrop');

        function toggleMenu(open) {
            drawer.classList.toggle('open', open);
            backdrop.classList.toggle('open', open);
            openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        }

        openBtn.addEventListener('click', () => toggleMenu(true));
        closeBtn.addEventListener('click', () => toggleMenu(false));
        backdrop.addEventListener('click', () => toggleMenu(false));
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('open')) {
                toggleMenu(false);
            }
        });
    }

    /**
     * 2. INJECTION DU PIED DE PAGE UNIFIÉ
     */
    function initSharedFooter() {
        const footerMount = document.getElementById('site-footer');
        if (!footerMount) return;

        footerMount.innerHTML = `
            <footer class="site-footer">
                <div class="footer-inner">
                    <div class="footer-cta-row">
                        <a href="${rootPrefix}sommaire.html" class="btn-footer-primary">← Retour au Sommaire</a>
                        <a href="${pagesPrefix}contact.html" class="btn-footer-secondary">Poser une question à Manon</a>
                    </div>
                    <p class="footer-disclaimer">
                        Les informations partagées sur ce site sont délivrées à titre éducatif et de bien-être naturel.
                        Elles ne se substituent en aucun cas à un avis ou un traitement médical personnalisé.
                    </p>
                    <p class="footer-copy">© 2026 Les Conseils de Manon — Créé par Bruno CULOT</p>
                </div>
            </footer>
        `;
    }

    /**
     * 3. LIGHTBOX ZOOM PHOTO PRODUIT
     */
    let lightboxEl = null;
    function ensureLightbox() {
        if (lightboxEl) return lightboxEl;
        lightboxEl = document.createElement('div');
        lightboxEl.className = 'image-lightbox';
        lightboxEl.innerHTML = `
            <div class="image-lightbox-box">
                <img src="" alt="" id="lightboxImg">
                <div class="image-lightbox-caption" id="lightboxCaption"></div>
            </div>
        `;
        lightboxEl.addEventListener('click', () => lightboxEl.classList.remove('open'));
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxEl.classList.contains('open')) {
                lightboxEl.classList.remove('open');
            }
        });
        document.body.appendChild(lightboxEl);
        return lightboxEl;
    }

    window.openProductLightbox = function (src, title) {
        const lb = ensureLightbox();
        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightboxImg').alt = title;
        document.getElementById('lightboxCaption').textContent = title;
        lb.classList.add('open');
    };

    /**
     * 4. FORMATAGE DES BALISES PERSONNALISÉES DES FICHIERS JSON
     * Nettoie aussi la répétition éventuelle du titre en début de libellé
     */
    window.formatLibelle = function (text, titleToStrip) {
        if (!text) return '';
        let cleaned = text.trim();

        // Dans aroma_he.js et aroma_hydro.js, certains libellés répètent "(G) TITRE (/G)(Retour)" au début
        if (titleToStrip) {
            const escaped = titleToStrip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const repeatRegex = new RegExp(`^\\(G\\)\\s*${escaped}\\s*\\(\\/G\\)\\s*(\\(Retour\\))?`, 'i');
            cleaned = cleaned.replace(repeatRegex, '').trim();
        }

        return cleaned
            .replace(/\(G\)/g, '<strong>')
            .replace(/\(\/G\)/g, '</strong>')
            .replace(/\(I\)/g, '<em>')
            .replace(/\(\/I\)/g, '</em>')
            .replace(/\(S\)/g, '<u>')
            .replace(/\(\/S\)/g, '</u>')
            .replace(/\(R\)/g, '<span class="libelle-alert">')
            .replace(/\(\/R\)/g, '</span>')
            .replace(/\(GS\)/g, '<strong><u>')
            .replace(/\(\/GS\)/g, '</u></strong>')
            .replace(/\(Espace interligne\)/g, '<div class="libelle-spacer"></div>')
            .replace(/\(Retour\)/g, '<br>');
    };

    /**
     * 5. REGISTRE GLOBAL POUR LA RECHERCHE ET LE FILTRE PAR PIÈCES 🪙
     */
    const catalogRegistry = [];

    function normalizeText(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Affiche une liste de produits JSON dans un conteneur donné
     */
    window.displayProducts = function (data, targetId = 'product-list') {
        const container = document.getElementById(targetId);
        if (!container) {
            console.warn('Le conteneur #' + targetId + " n'a pas été trouvé.");
            return;
        }

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Aucune fiche disponible pour le moment.</p></div>';
            return;
        }

        container.classList.add('products-stack');

        const sectionRecord = {
            container,
            items: []
        };

        data.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.style.animationDelay = `${Math.min(index * 55, 400)}ms`;

            const nbPieces = Number(item.Piece) || 0;
            const coins = nbPieces > 0 ? '🪙'.repeat(nbPieces) : '';
            const photoSrc = `${rootPrefix}${item.Photo}`;
            const fallbackSrc = `${rootPrefix}assets/images/fallback.jpg`;

            const priceHtml = nbPieces > 0
                ? `<div class="price-badge" title="Indicateur budget : ${nbPieces} pièce${nbPieces > 1 ? 's' : ''}">
                       <span class="price-coins">${coins}</span>
                   </div>`
                : '';

            card.innerHTML = `
                <div class="product-media">
                    <img src="${photoSrc}"
                         alt="${item.Titre}"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='${fallbackSrc}';">
                </div>
                <div class="product-body">
                    <div class="product-header">
                        <h2 class="product-title">${item.Titre}</h2>
                        ${priceHtml}
                    </div>
                    <div class="libelle-text">${window.formatLibelle(item.Libelle, item.Titre)}</div>
                </div>
            `;

            const imgEl = card.querySelector('.product-media img');
            imgEl.addEventListener('click', () => {
                window.openProductLightbox(imgEl.src, item.Titre);
            });

            container.appendChild(card);

            sectionRecord.items.push({
                card,
                pieces: nbPieces,
                searchText: normalizeText(item.Titre + ' ' + item.Libelle)
            });
        });

        catalogRegistry.push(sectionRecord);
        setupCatalogToolbar();
    };

    /**
     * 6. BARRE DE RECHERCHE & FILTRES AUTOMATIQUES SUR LES PAGES PRODUITS
     */
    let toolbarInitialized = false;
    let activeSearchQuery = '';
    let activePieceFilter = 'all';

    function setupCatalogToolbar() {
        const toolbarMount = document.getElementById('catalog-toolbar');
        if (!toolbarMount) return;

        // Collecter tous les niveaux de pièces existants sur cette page
        const allPieces = new Set();
        let totalItems = 0;
        catalogRegistry.forEach((sec) => {
            sec.items.forEach((it) => {
                totalItems++;
                if (it.pieces > 0) allPieces.add(it.pieces);
            });
        });

        const sortedPieces = Array.from(allPieces).sort((a, b) => a - b);

        // Si plusieurs niveaux de budget existent, afficher les puces de filtre
        const showPieceFilters = sortedPieces.length > 1;

        if (!toolbarInitialized) {
            toolbarInitialized = true;
            toolbarMount.innerHTML = `
                <div class="catalog-toolbar">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="search" id="catalogSearchInput" class="search-input" placeholder="Rechercher une plante, un symptôme, un usage (ex: stress, sommeil, digestion)...">
                        <button type="button" id="catalogSearchClear" class="search-clear" aria-label="Effacer">✕</button>
                    </div>
                    <div class="toolbar-filters" id="toolbarFiltersContainer"></div>
                    <span class="catalog-count" id="catalogCountLabel"></span>
                </div>
                <div id="catalogEmptyGlobal" class="empty-state" style="display:none; margin-bottom:28px;">
                    <h3>Aucun conseil ne correspond à votre recherche</h3>
                    <p>Essayez un autre mot-clé (ex: immunité, peau, articulation) ou réinitialisez les filtres.</p>
                    <button type="button" class="btn-reset-filter" id="resetCatalogBtn">Afficher toutes les fiches</button>
                </div>
            `;

            const searchInput = document.getElementById('catalogSearchInput');
            const clearBtn = document.getElementById('catalogSearchClear');
            const resetBtn = document.getElementById('resetCatalogBtn');

            searchInput.addEventListener('input', (e) => {
                activeSearchQuery = normalizeText(e.target.value.trim());
                clearBtn.style.display = activeSearchQuery ? 'inline-flex' : 'none';
                applyCatalogFilters();
            });

            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                activeSearchQuery = '';
                clearBtn.style.display = 'none';
                applyCatalogFilters();
                searchInput.focus();
            });

            resetBtn.addEventListener('click', () => {
                searchInput.value = '';
                activeSearchQuery = '';
                activePieceFilter = 'all';
                clearBtn.style.display = 'none';
                updateFilterChipsUI();
                applyCatalogFilters();
            });
        }

        // Mettre à jour les boutons de filtre de pièces (utile quand coeur.html charge 2 listes)
        const filtersBox = document.getElementById('toolbarFiltersContainer');
        if (filtersBox) {
            if (showPieceFilters) {
                filtersBox.style.display = 'flex';
                filtersBox.innerHTML = `
                    <button type="button" class="filter-chip ${activePieceFilter === 'all' ? 'active' : ''}" data-piece="all">Tous</button>
                    ${sortedPieces.map(p => `
                        <button type="button" class="filter-chip ${String(activePieceFilter) === String(p) ? 'active' : ''}" data-piece="${p}">
                            ${'🪙'.repeat(p)}
                        </button>
                    `).join('')}
                `;
                filtersBox.querySelectorAll('.filter-chip').forEach((chip) => {
                    chip.addEventListener('click', () => {
                        activePieceFilter = chip.getAttribute('data-piece');
                        updateFilterChipsUI();
                        applyCatalogFilters();
                    });
                });
            } else {
                filtersBox.style.display = 'none';
            }
        }

        applyCatalogFilters(totalItems);
    }

    function updateFilterChipsUI() {
        document.querySelectorAll('#toolbarFiltersContainer .filter-chip').forEach((chip) => {
            chip.classList.toggle('active', chip.getAttribute('data-piece') === String(activePieceFilter));
        });
    }

    function applyCatalogFilters() {
        let visibleCount = 0;
        let totalCount = 0;

        catalogRegistry.forEach((sec) => {
            sec.items.forEach((item) => {
                totalCount++;
                const matchSearch = !activeSearchQuery || item.searchText.includes(activeSearchQuery);
                const matchPiece = activePieceFilter === 'all' || String(item.pieces) === String(activePieceFilter);
                const show = matchSearch && matchPiece;
                item.card.style.display = show ? '' : 'none';
                if (show) visibleCount++;
            });
        });

        const countLabel = document.getElementById('catalogCountLabel');
        if (countLabel) {
            countLabel.textContent = visibleCount === totalCount
                ? `${totalCount} fiche${totalCount > 1 ? 's' : ''}`
                : `${visibleCount} / ${totalCount} fiche${totalCount > 1 ? 's' : ''}`;
        }

        const emptyGlobal = document.getElementById('catalogEmptyGlobal');
        if (emptyGlobal) {
            emptyGlobal.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    /**
     * 7. GESTION DU BOUTON RETOUR EN HAUT
     */
    function initScrollTop() {
        let scrollBtn = document.getElementById('scrollTop');
        if (!scrollBtn && document.getElementById('site-nav')) {
            scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollTop';
            scrollBtn.title = 'Retour en haut';
            scrollBtn.setAttribute('aria-label', 'Retour en haut de page');
            scrollBtn.innerHTML = '↑';
            document.body.appendChild(scrollBtn);
        }

        if (!scrollBtn) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            scrollBtn.classList.toggle('visible', scrolled > 240);
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialisation dès que le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSharedNavigation();
            initSharedFooter();
            initScrollTop();
        });
    } else {
        initSharedNavigation();
        initSharedFooter();
        initScrollTop();
    }
})();
