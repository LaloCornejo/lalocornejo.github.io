/**
 * Theme Management Module
 * Provides centralized theme state management for the entire application
 * 
 * Features:
 * - Centralized theme state management
 * - Local storage persistence
 * - Smooth theme transitions
 * - System preference detection
 * - Event handling and cleanup
 * - Error boundaries
 * - TypeScript-like type checking
 */

// Type definitions (for documentation and type checking)
/**
 * @typedef {'light'|'dark'} ThemeType
 * 
 * @typedef {Object} ThemeConfig
 * @property {string} storageKey - Key used for localStorage
 * @property {number} transitionDuration - Duration of theme transitions in ms
 * @property {ThemeType} defaultTheme - Default theme to use when no preference is available
 * @property {Function} [onThemeChange] - Optional callback when theme changes
 */

// Default configuration
/** @type {ThemeConfig} */
const DEFAULT_CONFIG = {
  storageKey: 'theme',
  transitionDuration: 300,
  defaultTheme: 'dark',
  onThemeChange: null
};

/**
 * Theme Manager class
 * Manages theme state and transitions for the application
 */
class ThemeManager {
  /**
   * Create a new ThemeManager instance
   * @param {Partial<ThemeConfig>} config - Optional configuration overrides
   */
  constructor(config = {}) {
    // Merge default config with provided options
    /** @type {ThemeConfig} */
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    /** @type {ThemeType|null} */
    this.currentTheme = null;
    
    /** @type {Set<Function>} */
    this.listeners = new Set();
    
    /** @type {boolean} */
    this.isTransitioning = false;
    
    // Bind methods to maintain context
    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleSystemPreferenceChange = this.handleSystemPreferenceChange.bind(this);
    
    // Reference to cleanup function for system preference listener
    this.systemPreferenceCleanup = null;
  }
  
  /**
   * Initialize the theme manager
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      // Get theme from storage or system preference
      const storedTheme = this.getStoredTheme();
      if (storedTheme && this.isValidTheme(storedTheme)) {
        this.currentTheme = storedTheme;
      } else {
        this.currentTheme = this.getSystemPreference() || this.config.defaultTheme;
      }
      
      // Apply initial theme (without transition)
      this.applyTheme(this.currentTheme, false);
      
      // Set up system preference detection
      this.setupSystemPreferenceDetection();
      
      console.info(`Theme initialized: ${this.currentTheme}`);
    } catch (error) {
      console.error('Failed to initialize theme:', error);
      // Fallback to default theme
      this.currentTheme = this.config.defaultTheme;
      this.applyTheme(this.currentTheme, false);
    }
  }
  
  /**
   * Check if a theme is valid
   * @param {string} theme - Theme to validate
   * @returns {boolean} Whether the theme is valid
   */
  isValidTheme(theme) {
    return theme === 'light' || theme === 'dark';
  }
  
  /**
   * Get theme from localStorage
   * @returns {ThemeType|null} Stored theme or null if none exists
   */
  getStoredTheme() {
    try {
      return /** @type {ThemeType} */ (localStorage.getItem(this.config.storageKey));
    } catch (error) {
      console.error('Failed to get theme from localStorage:', error);
      return null;
    }
  }
  
  /**
   * Store theme in localStorage
   * @param {ThemeType} theme - Theme to store
   */
  storeTheme(theme) {
    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.error('Failed to store theme in localStorage:', error);
    }
  }
  
  /**
   * Get system color scheme preference
   * @returns {ThemeType|null} System preference or null if not supported
   */
  getSystemPreference() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to get system preference:', error);
      return null;
    }
  }
  
  /**
   * Set up detection of system preference changes
   */
  setupSystemPreferenceDetection() {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set up listener for preference changes
      const listener = this.handleSystemPreferenceChange;
      
      // Add listener based on browser support
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', listener);
        this.systemPreferenceCleanup = () => mediaQuery.removeEventListener('change', listener);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(listener);
        this.systemPreferenceCleanup = () => mediaQuery.removeListener(listener);
      }
    } catch (error) {
      console.error('Failed to set up system preference detection:', error);
    }
  }
  
  /**
   * Handle changes to system color scheme preference
   * @param {MediaQueryListEvent} event - Media query change event
   */
  handleSystemPreferenceChange(event) {
    // Only apply system preference if user hasn't explicitly set a theme
    if (!this.getStoredTheme()) {
      const newTheme = event.matches ? 'dark' : 'light';
      this.setTheme(newTheme);
    }
  }
  
  /**
   * Apply theme to document
   * @param {ThemeType} theme - Theme to apply
   * @param {boolean} [withTransition=true] - Whether to use transition
   */
  applyTheme(theme, withTransition = true) {
    if (!this.isValidTheme(theme)) {
      console.error(`Invalid theme: ${theme}`);
      return;
    }
    
    try {
      const body = document.body;
      const previousTheme = theme === 'dark' ? 'light' : 'dark';
      
      // Apply transition if requested
      if (withTransition) {
        body.style.transition = `background-color ${this.config.transitionDuration}ms, color ${this.config.transitionDuration}ms`;
      } else {
        body.style.transition = 'none';
      }
      
      // Update DOM classes
      body.classList.remove(`${previousTheme}-theme`);
      body.classList.add(`${theme}-theme`);
      
      // Update theme-specific elements
      this.updateElements(theme);
      
      // Clear transition after it completes
      if (withTransition) {
        setTimeout(() => {
          body.style.transition = '';
        }, this.config.transitionDuration);
      }
      
      // Update current theme
      this.currentTheme = theme;
      
      // Call change callback if provided
      if (typeof this.config.onThemeChange === 'function') {
        this.config.onThemeChange(theme);
      }
      
      // Notify listeners
      this.notifyListeners(theme);
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }
  
  /**
   * Update theme-specific elements
   * @param {ThemeType} theme - Current theme
   */
  updateElements(theme) {
    try {
      // Update theme toggle button
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      }
      
      // Update logo images based on theme
      const logos = document.querySelectorAll('.logoAt, #Logo, #loaderImg');
      logos.forEach(logo => {
        if (logo instanceof HTMLImageElement) {
          // Apply appropriate CSS class based on theme
          if (theme === 'dark') {
            logo.classList.add('dark-theme-logo');
            logo.classList.remove('light-theme-logo');
          } else {
            logo.classList.add('light-theme-logo');
            logo.classList.remove('dark-theme-logo');
          }
        }
      });
    } catch (error) {
      console.error('Failed to update theme-specific elements:', error);
    }
  }
  
  /**
   * Set theme with storage persistence
   * @param {ThemeType} theme - Theme to set
   */
  setTheme(theme) {
    if (this.isTransitioning || !this.isValidTheme(theme) || theme === this.currentTheme) {
      return;
    }
    
    this.isTransitioning = true;
    
    try {
      // Apply theme with transition
      this.applyTheme(theme, true);
      
      // Persist theme
      this.storeTheme(theme);
      
      console.info(`Theme changed to: ${theme}`);
    } catch (error) {
      console.error('Failed to set theme:', error);
    } finally {
      // Allow transitions again after duration
      setTimeout(() => {
        this.isTransitioning = false;
      }, this.config.transitionDuration);
    }
  }
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
  
  /**
   * Add a theme change listener
   * @param {Function} listener - Callback function
   */
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.add(listener);
    }
  }
  
  /**
   * Remove a theme change listener
   * @param {Function} listener - Callback function to remove
   */
  removeListener(listener) {
    this.listeners.delete(listener);
  }
  
  /**
   * Notify all listeners of theme change
   * @param {ThemeType} theme - Current theme
   */
  notifyListeners(theme) {
    this.listeners.forEach(listener => {
      try {
        listener(theme);
      } catch (error) {
        console.error('Error in theme change listener:', error);
      }
    });
  }
  
  /**
   * Get current theme
   * @returns {ThemeType} Current theme
   */
  getTheme() {
    return this.currentTheme;
  }
  
  /**
   * Clean up resources
   */
  cleanup() {
    // Clear listeners
    this.listeners.clear();
    
    // Clean up system preference detection
    if (this.systemPreferenceCleanup) {
      this.systemPreferenceCleanup();
      this.systemPreferenceCleanup = null;
    }
    
    console.info('Theme manager cleaned up');
  }
}

// Create singleton instance
const themeManager = new ThemeManager();

// Export both the class (for custom instances) and default instance
export { ThemeManager, themeManager as default };

