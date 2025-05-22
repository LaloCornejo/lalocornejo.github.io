/**
 * Main Application Initialization
 * Author: LÆLÖ
 * Updated: 2025-05-20
 */

// Default configuration
const DEFAULT_CONFIG = {
  version: "v1.0.0",
  // loader: { 
  //   hideDelay: 800,
  //   fadeTime: 500
  // },
  theme: {
    defaultTheme: 'dark',
    transitionTime: 300
  }
};

// Module references (will be initialized later)
let config = DEFAULT_CONFIG;
let themeManager = null;
let cursorManager = null;

// Initialization status tracking
const initStatus = {
  configLoaded: false,
  themeInitialized: false,
  cursorInitialized: false
};

class AppManager {
  constructor() {
    this.elements = {
      // loader: document.querySelector(".loader"),
      backButton: document.querySelector("#back"),
      versionText: document.querySelector("#versionTxt"),
      themeToggle: document.querySelector("#theme-toggle")
    };
    
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleThemeToggle = this.handleThemeToggle.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }
  
  /**
   * Initialize the application
   * @returns {Promise<object>} Initialization status
   */
  async initialize() {
    try {
      console.info("Initializing application...");
      
      // Load dependencies first
      await this.loadDependencies();
      
      // Initialize core features
      await this.initializeCore();
      
      // Initialize UI components
      this.initializeUI();
      
      // Set up event listeners
      this.setupEventListeners();
      
      console.info("Application initialized successfully");
      
      return {
        success: true,
        status: initStatus
      };
    } catch (error) {
      console.error("Failed to initialize application:", error);
      this.handleInitError(error);
      
      return {
        success: false,
        status: initStatus,
        error
      };
    }
  }
  
  /**
   * Load dependencies
   * @returns {Promise<void>}
   */
  async loadDependencies() {
    try {
      console.log("Loading dependencies...");
      
      try {
        const configModule = await import("../js/config.js");
        if (configModule && configModule.config) {
          config = { ...DEFAULT_CONFIG, ...configModule.config };
          initStatus.configLoaded = true;
          console.log("Config loaded successfully");
        } else {
          console.warn("Config module format invalid, using default configuration");
          config = DEFAULT_CONFIG;
        }
      } catch (error) {
        console.warn("Config module not found, using default configuration", error);
        config = DEFAULT_CONFIG;
      }
      
      // Import theme manager - use absolute path for HTML in subdirectory
      try {
        const themeModule = await import("../js/theme.js");
        themeManager = themeModule.default;
        console.log("Theme manager loaded successfully");
      } catch (error) {
        console.warn("Theme module not found, using fallback theme manager", error);
        themeManager = {
          initialize: async () => {
            console.log("Theme fallback: using system preference");
            // Check for system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
            return true;
          },
          applyTheme: (theme) => document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme'),
          toggleTheme: () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
          },
          cleanup: () => {}
        };
      }
      
      // Import cursor manager - use absolute path for HTML in subdirectory
      try {
        const cursorModule = await import("../js/Cursor.js");
        cursorManager = cursorModule.default;
        console.log("Cursor manager loaded successfully");
      } catch (error) {
        console.warn("Cursor module not found, using default cursor", error);
        cursorManager = {
          init: () => {},
          cleanup: () => {}
        };
      }
    } catch (error) {
      console.error("Error loading dependencies:", error);
      throw new Error("Failed to load critical dependencies");
    }
  }
  
  /**
   * Initialize core managers (theme, cursor)
   * @returns {Promise<void>}
   */
  async initializeCore() {
    try {
      // Initialize theme management (with await to ensure it completes)
      if (themeManager && typeof themeManager.initialize === 'function') {
        try {
          await themeManager.initialize();
          console.log("Theme manager initialized successfully");
          initStatus.themeInitialized = true;
        } catch (themeError) {
          console.error("Failed to initialize theme manager:", themeError);
          // Fallback: apply dark theme
          document.body.classList.add('dark-theme');
        }
      } else {
        console.warn("Theme manager not available or missing initialize method");
        // Fallback: apply dark theme
        document.body.classList.add('dark-theme');
      }
      
      // Connect theme toggle button to theme manager
      if (this.elements.themeToggle) {
        this.elements.themeToggle.addEventListener("click", this.handleThemeToggle);
      }
      
      // Initialize cursor manager if available
      if (cursorManager && typeof cursorManager.init === 'function') {
        try {
          const cursorResult = cursorManager.init();
          // Handle potential promise from init
          if (cursorResult instanceof Promise) {
            await cursorResult;
          }
          console.log("Cursor manager initialized successfully");
          initStatus.cursorInitialized = true;
        } catch (error) {
          console.error("Failed to initialize cursor manager:", error);
        }
      } else {
        console.warn("Cursor manager not available or missing init method");
      }
    } catch (error) {
      console.error("Error in core initialization:", error);
      // Ensure minimum functionality even on error
      document.body.classList.add('dark-theme');
      throw new Error("Core initialization failed: " + error.message);
    }
  }
  
  /**
   * Initialize UI components
   */
  initializeUI() {
    // this.initializeLoader();
    this.initializeVersion();
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Back button functionality
    if (this.elements.backButton) {
      this.elements.backButton.addEventListener("click", this.handleBackClick);
    }
    
    // Cleanup on page unload
    window.addEventListener("beforeunload", this.cleanup);
  }
  
  /**
   * Handle back button click
   * @param {Event} event - Click event
   */
  handleBackClick(event) {
    event.preventDefault();
    window.history.back();
  }
  
  /**
   * Handle theme toggle click
   */
  handleThemeToggle() {
    try {
      if (themeManager && typeof themeManager.toggleTheme === 'function') {
        themeManager.toggleTheme();
      } else {
        // Fallback toggle if themeManager isn't available
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
      }
    } catch (error) {
      console.error("Error toggling theme:", error);
      // Emergency fallback
      document.body.classList.toggle('dark-theme');
    }
  }
  
  /**
   * Initialize the page loader
   */
  // initializeLoader() {
  //   if (!this.elements.loader) {
  //     console.warn("Loader element not found");
  //     return;
  //   }
    
    // Use more reliable approach with page loaded state check
  //   const hideLoader = () => {
  //     try {
  //       setTimeout(() => {
  //         // Apply hidden class
  //         this.elements.loader.classList.remove("loader");
  //         this.elements.loader.classList.add("loader-hidden");
  //         console.log("Removing loader");
  //         
  //         // Remove loader from DOM after transition completes
  //         this.elements.loader.addEventListener("transitionend", () => {
  //           try {
  //             if (document.body.contains(this.elements.loader)) {
  //               document.body.removeChild(this.elements.loader);
  //             }
  //           } catch (removeError) {
  //             console.error("Error removing loader element:", removeError);
  //           }
  //         }, { once: true }); // Only run once
  //       }, config.loader.hideDelay || 800);
  //     } catch (error) {
  //       console.error("Error hiding loader:", error);
  //       
  //       // Emergency fallback - force hide the loader after a longer delay
  //       setTimeout(() => {
  //         try {
  //           if (this.elements.loader && document.body.contains(this.elements.loader)) {
  //             this.elements.loader.style.display = 'none';
  //           }
  //         } catch (emergencyError) {
  //           console.error("Emergency loader hide failed:", emergencyError);
  //         }
  //       }, 2000);
  //     }
  //   };
  //
  //   // Check if page is already loaded
  //   if (document.readyState === 'complete') {
  //     hideLoader();
  //   } else {
  //     window.addEventListener("load", hideLoader);
  //   }
  // }
  
  /**
   * Initialize version display
   */
  initializeVersion() {
    if (this.elements.versionText) {
      this.elements.versionText.textContent = config.version;
    }
  }
  
  /**
   * Handle initialization errors
   * @param {Error} error - The initialization error
   */
  handleInitError(error) {
    // Attempt to apply fallback settings
    try {
      // Ensure theme is set even if other features fail
      themeManager.applyTheme('dark', false);
      
      // Hide loader to avoid blocked UI
      if (this.elements.loader) {
        this.elements.loader.classList.add("loader-hidden");
      }
      
      // Log detailed error for debugging
      console.error("Initialization error details:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    } catch (fallbackError) {
      console.error("Failed to apply fallback initialization:", fallbackError);
    }
  }
  
  /**
   * Clean up resources
   */
  cleanup() {
    try {
      // Clean up core managers if they exist and have cleanup methods
      if (themeManager && typeof themeManager.cleanup === 'function') {
        themeManager.cleanup();
      }
      
      if (cursorManager && typeof cursorManager.cleanup === 'function') {
        cursorManager.cleanup();
      }
      
      // Remove event listeners
      if (this.elements.backButton) {
        this.elements.backButton.removeEventListener("click", this.handleBackClick);
      }
      
      if (this.elements.themeToggle) {
        this.elements.themeToggle.removeEventListener("click", this.handleThemeToggle);
      }
      
      window.removeEventListener("beforeunload", this.cleanup);
      
      console.info("Application cleanup completed");
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}

// Create and initialize application
const app = new AppManager();

// Initialize when DOM is ready
if (document.readyState === "complete") {
  app.initialize();
} else {
  document.addEventListener("DOMContentLoaded", () => app.initialize());
}

// Export for potential use in other modules
export default app;
