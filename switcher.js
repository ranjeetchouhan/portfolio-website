/**
 * Portfolio Flux Switcher
 * A creative variant switcher for Ranjeet's portfolio versions.
 */

(function () {
    const variants = [
        { id: 'v1', name: 'Modern Dark', desc: 'Material You Inspiration', icon: 'fa-terminal', color: 'v-modern', path: 'index.html' },
        { id: 'v1', name: 'Clean Minimal', desc: 'Sleek & Professional', icon: 'fa-user-tie', color: 'v-clean', path: 'index_1.html' },
        { id: 'v2', name: 'Bento Grid', desc: 'Interactive Grid Layout', icon: 'fa-th-large', color: 'v-bento', path: 'index_2.html' },
        { id: 'v3', name: 'Play Store V3', desc: 'App Store Aesthetic', icon: 'fa-google-play', color: 'v-playstore', path: 'index_3.html' },
        { id: 'v4', name: 'Play Store PLUS', desc: 'Interactive Experience', icon: 'fa-rocket', color: 'v-playstore-plus', path: 'v4/index.html' }
    ];

    function initSwitcher() {
        // Create the Orb
        const orb = document.createElement('div');
        orb.id = 'portfolio-switcher-orb';
        orb.innerHTML = '<i class="fas fa-plus"></i>';
        orb.title = 'Switch Portfolio Variant';

        // Create the Menu
        const menu = document.createElement('div');
        menu.id = 'portfolio-switcher-menu';

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isV4 = window.location.pathname.includes('/v4/');
        const effectivePath = isV4 ? 'v4/index.html' : currentPath;

        const menuHtml = `
            <div class="switcher-header">
                <h3>Portfolio Flux</h3>
                <p>Choose your preferred experience</p>
            </div>
            <div class="variant-list">
                ${variants.map(v => {
            const isCurrent = v.path === effectivePath || (v.path === 'index.html' && effectivePath === '');
            const adjustedPath = isV4 ? '../' + v.path : v.path;
            // If we are in v4, normal links need ../, if we are in root, v4 needs v4/
            let finalPath = v.path;
            if (isV4) {
                finalPath = v.path.includes('v4/') ? 'index.html' : '../' + v.path;
            } else {
                // We are in root
                finalPath = v.path;
            }

            return `
                    <a href="${finalPath}" class="variant-item ${isCurrent ? 'current' : ''}">
                        <div class="variant-icon ${v.color}">
                            <i class="fas ${v.icon}"></i>
                        </div>
                        <div class="variant-info">
                            <span class="variant-name">${v.name}</span>
                            <span class="variant-desc">${v.desc}</span>
                        </div>
                    </a>
                `;
        }).join('')}
            </div>
        `;

        menu.innerHTML = menuHtml;

        document.body.appendChild(orb);
        document.body.appendChild(menu);

        // Event Listeners
        orb.addEventListener('click', () => {
            orb.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!orb.contains(e.target) && !menu.contains(e.target)) {
                orb.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }

    // Load FontAwesome if not present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwitcher);
    } else {
        initSwitcher();
    }
})();
