/**
 * Portfolio Flux Switcher
 * A creative variant switcher for Ranjeet's portfolio versions.
 */

(function () {
    const variants = [
        { id: 'v1', name: 'Modern Dark', desc: 'Material You Inspiration', icon: 'fa-terminal', color: 'v-modern', path: 'index.html' },
        { id: 'v1-clean', name: 'Clean Minimal', desc: 'Sleek & Professional', icon: 'fa-user-tie', color: 'v-clean', path: 'v1/index.html' },
        { id: 'v2', name: 'Bento Grid', desc: 'Interactive Grid Layout', icon: 'fa-th-large', color: 'v-bento', path: 'v2/index.html' },
        { id: 'v3', name: 'Play Store V3', desc: 'App Store Aesthetic', icon: 'fa-google-play', color: 'v-playstore', path: 'v3/index.html' },
        { id: 'v4', name: 'Play Store PLUS', desc: 'Advanced Interaction', icon: 'fa-rocket', color: 'v-playstore-plus', path: 'v4/index.html' },
        { id: 'v5', name: 'Play Store Interactive', desc: 'Developer Mode & Eggs', icon: 'fa-code', color: 'v-playstore-plus', path: 'v5/index.html', accent: '#FF00FF' }
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

        const pathParts = window.location.pathname.split('/');
        const fileName = pathParts.pop() || 'index.html';
        const dirName = pathParts.pop();

        // Effective path for matching
        let effectivePath = fileName;
        if (dirName && (dirName.startsWith('v') && !isNaN(dirName.substring(1)))) {
            effectivePath = dirName + '/' + fileName;
        }

        const menuHtml = `
            <div class="switcher-header">
                <h3>Portfolio Flux</h3>
                <p>Choose your preferred experience</p>
            </div>
            <div class="variant-list">
                ${variants.map(v => {
            const isCurrent = v.path === effectivePath || (v.path === 'index.html' && effectivePath === '');

            // Path adjustment logic
            let finalPath = '';
            const inSubDir = dirName && (dirName.startsWith('v') && !isNaN(dirName.substring(1)));

            if (inSubDir) {
                // We are in v1/, v2/, etc.
                if (v.path === 'index.html') {
                    finalPath = '../index.html';
                } else if (v.path.includes('/')) {
                    // Target is in another subdir (e.g., v2/index.html)
                    const targetDir = v.path.split('/')[0];
                    if (targetDir === dirName) {
                        finalPath = 'index.html';
                    } else {
                        finalPath = '../' + v.path;
                    }
                }
            } else {
                // We are in root
                finalPath = v.path;
            }

            return `
                    <a href="${finalPath}" class="variant-item ${isCurrent ? 'current' : ''}" 
                       onclick="if(window.trackEvent) trackEvent('switch_variant', { variant_id: '${v.id}', variant_name: '${v.name}' })">
                        <div class="variant-icon ${v.color}" style="${v.accent ? `background: ${v.accent}` : ''}">
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
