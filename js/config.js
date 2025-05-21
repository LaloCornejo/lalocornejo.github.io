/**
 * Application Configuration Module
 * Centralizes configuration settings for the LÆLÖ portfolio site
 * 
 * @version 1.0.0
 * @author LÆLÖ
 * @updated 2025-05-20
 */

/**
 * Validates that an object has all required properties
 * @param {Object} obj - Object to validate
 * @param {Array<string>} requiredProps - List of required property names
 * @returns {boolean} True if valid, false otherwise
 */
function validateConfig(obj, requiredProps) {
  if (!obj || typeof obj !== 'object') return false;
  return requiredProps.every(prop => prop in obj);
}

/**
 * Application configuration settings
 * @type {Object}
 */
export const config = {
  /**
   * Version information
   * @type {string}
   */
  version: "v1.0.0",
  
  /**
   * Loader configuration
   * @type {Object}
   */
  loader: {
    /**
     * Delay in ms before hiding the loader
     * @type {number}
     */
    hideDelay: 800,
    
    /**
     * Transition time in ms for loader fade out
     * @type {number}
     */
    fadeTime: 500,
    
    /**
     * Show loader for at least this many ms, even if page loads faster
     * @type {number}
     */
    minDisplayTime: 300
  },
  
  /**
   * Theme configuration
   * @type {Object}
   */
  theme: {
    /**
     * Default theme to use (dark|light)
     * @type {string}
     */
    defaultTheme: 'dark',
    
    /**
     * Transition time in ms for theme changes
     * @type {number}
     */
    transitionTime: 300,
    
    /**
     * Whether to respect system dark mode preference
     * @type {boolean}
     */
    respectSystemPreference: true,
    
    /**
     * Whether to remember user theme preference
     * @type {boolean}
     */
    rememberUserPreference: true
  },
  
  /**
   * Cache configuration
   * @type {Object}
   */
  cache: {
    /**
     * Whether to use local storage cache
     * @type {boolean}
     */
    enabled: true,
    
    /**
     * Cache expiration time in ms (1 hour)
     * @type {number}
     */
    expirationTime: 3600000,
    
    /**
     * Maximum cache size in bytes (1MB)
     * @type {number}
     */
    maxSize: 1048576,
    
    /**
     * Cache version for invalidation
     * @type {number}
     */
    version: 1
  },
  
  /**
   * Animation settings
   * @type {Object}
   */
  animation: {
    /**
     * Whether to reduce motion based on user preference
     * @type {boolean}
     */
    respectReduceMotion: true,
    
    /**
     * Default animation duration in ms
     * @type {number}
     */
    defaultDuration: 300,
    
    /**
     * Default easing function
     * @type {string}
     */
    defaultEasing: 'ease-out'
  }
};

// Validate configuration
const requiredSections = ['version', 'loader', 'theme'];
if (!validateConfig(config, requiredSections)) {
  console.error('Invalid configuration: Missing required sections');
}

// Default export for module pattern consistency
export default { config };

/**
 * Global configuration values for the application
 */
export const config = {
  // Application version
  version: "v12.09.2024",
  
  // Sidebar configuration
  sidebar: {
    activationThreshold: 100,  // px from left edge to activate
    deactivationThreshold: 500, // px from left edge to deactivate
    debounceDelay: 150  // ms to debounce mouse tracking
  },
  
  // Loader configuration
  loader: {
    hideDelay: 1000  // ms before hiding loader
  }
};

