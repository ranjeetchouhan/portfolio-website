/**
 * Analytics Utility for Portfolio
 * Handles Google Analytics 4 integration and custom event tracking.
 */

(function () {
    // --- CONFIGURATION ---
    // Update this with your actual Google Analytics Measurement ID (G-XXXXXXXXXX)
    const MEASUREMENT_ID = 'G-VR5LZG9MD2';
    const DEBUG_MODE = false; // Set to false in production

    function log(...args) {
        if (DEBUG_MODE) {
            console.log('[Analytics]', ...args);
        }
    }

    // --- INITIALIZATION ---
    function initGA() {
        if (!MEASUREMENT_ID || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
            log('GA4 Measurement ID not set. Skipping real tracking, using console only.');
            return;
        }

        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', MEASUREMENT_ID, {
            'send_page_view': true,
            'anonymize_ip': true
        });

        log(`GA4 Initialized with ID: ${MEASUREMENT_ID}`);
    }

    /**
     * Track a custom event
     * @param {string} eventName 
     * @param {Object} params 
     */
    window.trackEvent = function (eventName, params = {}) {
        log(`Tracking Event: ${eventName}`, params);

        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    };

    // Track Page Info (Referrer, etc.)
    function trackPageView() {
        const pageData = {
            page_path: window.location.pathname,
            referrer: document.referrer || 'direct',
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
        };

        log('Page View Details:', pageData);
        window.trackEvent('page_view_custom', pageData);
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initGA();
            trackPageView();
        });
    } else {
        initGA();
        trackPageView();
    }
})();
