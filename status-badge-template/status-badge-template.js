/**
 * Status Badge System - Template Configuration
 * 
 * To add or modify statuses, simply edit the STATUS_CONFIG object below.
 * No need to touch the CSS or the initialization code.
 */

// ============================================================================
// CONFIGURATION - Edit this to add/change statuses
// ============================================================================

const STATUS_CONFIG = {
    'active': {
        className: 'status-active',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',    // Light green
        textColor: '#34d399',                           // Green
        dotColor: '#34d399',                            // Green
        animated: true                                  // Pulsing dot
    },
    'completed': {
        className: 'status-completed',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',    // Light blue
        textColor: '#60a5fa',                           // Blue
        dotColor: '#60a5fa',                            // Blue
        animated: false                                 // Static dot
    },
    'deactivated': {
        className: 'status-deactivated',
        backgroundColor: 'rgba(107, 114, 128, 0.15)',   // Light gray
        textColor: '#9ca3af',                           // Gray
        dotColor: '#9ca3af',                            // Gray
        animated: false                                 // Static dot
    }
    
    // ADD MORE STATUSES HERE:
    // 'pending': {
    //     className: 'status-pending',
    //     backgroundColor: 'rgba(245, 158, 11, 0.15)',
    //     textColor: '#fbbf24',
    //     dotColor: '#fbbf24',
    //     animated: false
    // }
};

// ============================================================================
// INITIALIZATION CODE - No need to edit below this line
// ============================================================================

/**
 * Generates CSS styles dynamically based on STATUS_CONFIG
 */
function generateStatusStyles() {
    let cssRules = '';
    
    for (const [statusKey, config] of Object.entries(STATUS_CONFIG)) {
        const { className, backgroundColor, textColor, dotColor, animated } = config;
        
        // Badge background and text color
        cssRules += `
table .${className},
tbody .${className} {
    background: ${backgroundColor};
    color: ${textColor};
}

`;
        
        // Dot color and animation
        cssRules += `
table .${className}::before,
tbody .${className}::before {
    background: ${dotColor};
    ${animated ? 'animation: pulse 2s ease-in-out infinite;' : ''}
}

`;
    }
    
    return cssRules;
}

/**
 * Injects generated CSS into the page
 */
function injectStatusStyles() {
    const styleElement = document.createElement('style');
    styleElement.id = 'status-badge-dynamic-styles';
    styleElement.textContent = generateStatusStyles();
    document.head.appendChild(styleElement);
    
    console.log('[Status Badges] Dynamic styles injected');
}

/**
 * Initializes status badges by applying classes based on text content
 */
function initializeStatusBadges() {
    // Create a map of status text → className
    const statusMap = {};
    for (const [statusKey, config] of Object.entries(STATUS_CONFIG)) {
        statusMap[statusKey] = config.className;
    }
    
    // Find all status badges within tables
    const badges = document.querySelectorAll('table .status-badge');
    console.log(`[Status Badges] Found ${badges.length} status badges in tables`);
    
    // Apply classes based on text content
    badges.forEach(badge => {
        const statusText = badge.textContent.toLowerCase().trim();
        const statusClass = statusMap[statusText];
        
        if (statusClass) {
            badge.classList.add(statusClass);
            console.log(`[Status Badges] ✓ "${statusText}" → ${statusClass}`);
        } else {
            console.warn(`[Status Badges] ✗ No mapping found for: "${statusText}"`);
            console.warn(`[Status Badges] Available statuses: ${Object.keys(statusMap).join(', ')}`);
        }
    });
    
    console.log('[Status Badges] Initialization complete!');
}

/**
 * Main initialization - runs when DOM is ready
 */
function initStatusBadgeSystem() {
    injectStatusStyles();
    initializeStatusBadges();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatusBadgeSystem);
} else {
    // DOM already loaded
    initStatusBadgeSystem();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initializeStatusBadges, 
        STATUS_CONFIG,
        initStatusBadgeSystem 
    };
}
