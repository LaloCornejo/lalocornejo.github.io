/**
 * Enhanced custom cursor implementation with performance optimizations
 * Used in: index.html and other pages with custom cursor
 * 
 * @version 1.1.0
 * @author LÆLÖ
 * @updated 2025-05-20
 */

// Import will be done dynamically to prevent loading errors
let mobileCheck;

// Configuration with performance considerations
const CURSOR_CONFIG = {
  // Movement parameters
  speed: 0.7, // Easing factor (0-1)
  hoverScale: 1.25, // Scale when hovering elements
  
  // Performance settings
  transitionDuration: 150, // ms for hover transitions
  frameThrottle: 1000 / 120, // Target 120fps max
  inactivityTimeout: 5000, // Hide cursor after inactivity (ms)
  
  // Visual settings
  cursorSize: 80, // px diameter
  cursorColor: 'white', // Default cursor color
  blendMode: 'difference', // Mix-blend-mode for cursor
  
  // Feature flags
  enableInactivityHide: true, // Hide cursor after inactivity
  enableSmoothTransition: true, // Use CSS transitions for smoother effects
  adaptToDarkMode: true // Adjust cursor based on theme
};

/**
 * CursorManager handles custom cursor display and animations
 */
class CursorManager {
  constructor(config = {}) {
    // Merge default config with provided options
    this.config = {...CURSOR_CONFIG, ...config};
    
    // DOM elements (will be set during initialization)
    this.cursor = null;
    
    // State management
    this.state = {
      mouseX: 0,
      mouseY: 0,
      cursorX: 0,
      cursorY: 0,
      scale: 1,
      isVisible: true,
      isActive: false,
      lastActivityTime: Date.now(),
      lastFrameTime: 0,
      isMobile: false,
      isInitialized: false
    };
    
    // Animation frame request ID
    this.animationFrameId = null;
    
    // Activity check interval ID
    this.activityCheckId = null;
    
    // Bind methods to maintain context
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.animate = this.animate.bind(this);
    this.checkActivity = this.checkActivity.bind(this);
    this.cleanup = this.cleanup.bind(this);
    
    // Add cleanup on page unload
    window.addEventListener('beforeunload', this.cleanup);
  }
  
  /**
   * Async initialization to allow for import of dependencies
   * @returns {Promise<boolean>} Success status
   */
  async initializeAsync() {
    try {
      console.log("Initializing cursor manager...");
      
      // Load mobile check utility
      try {
        const mobileModule = await import("./isMobile.js");
        mobileCheck = mobileModule.mobileCheck;
        console.log("Mobile check module loaded");
      } catch (error) {
        console.warn("Could not load mobile check module:", error);
        // Fallback mobile detection
        mobileCheck = () => window.innerWidth <= 768;
      }
      
      // Set mobile state
      this.state.isMobile = mobileCheck();
      
      // Get DOM elements
      this.cursor = document.querySelector(".cursor");
      
      // Initialize if not on mobile
      if (!this.state.isMobile) {
        const success = this.init();
        this.state.isInitialized = success;
        return success;
      } else {
        console.log("Mobile detected, cursor disabled");
        this.hideCursor();
        return true;
      }
    } catch (error) {
      console.error("Failed to initialize cursor manager:", error);
      return false;
    }
  }
  
  /**
   * Initialize cursor tracking
   * @returns {boolean} Success status
   */
  init() {
    try {
      if (!this.cursor) {
        console.error("Cursor element not found");
        return false;
      }
      
      // Set up initial styles
      this.setupStyles();
      
      // Add event listeners
      this.addEventListeners();
      
      // Start animation loop
      this.startAnimation();
      
      // Start inactivity check if enabled
      if (this.config.enableInactivityHide) {
        this.startActivityCheck();
      }
      
      return true;
    } catch (error) {
      console.error("Failed to initialize cursor:", error);
      return false;
    }
  }
  
  /**
   * Set up initial cursor styles
   */
  setupStyles() {
    if (!this.cursor) return;
    
    // Apply styles directly for better performance
    this.cursor.style.position = 'fixed';
    this.cursor.style.pointerEvents = 'none';
    this.cursor.style.width = `${this.config.cursorSize}px`;
    this.cursor.style.height = `${this.config.cursorSize}px`;
    this.cursor.style.borderRadius = '50%';
    this.cursor.style.backgroundColor = this.config.cursorColor;
    this.cursor.style.mixBlendMode = this.config.blendMode;
    this.cursor.style.zIndex = '9999';
    this.cursor.style.willChange = 'transform, opacity';
    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    this.cursor.style.transition = `transform ${this.config.transitionDuration}ms ease-out, opacity 0.3s ease`;
  }
  
  /**
   * Add event listeners for cursor movement and hover effects
   */
  addEventListeners() {
    // Add mouse move event with passive option for performance
    document.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    
    // Add hover event listeners to all interactive elements
    const hoverElements = document.querySelectorAll(".Hover");
    
    if (hoverElements && hoverElements.length > 0) {
      hoverElements.forEach(item => {
        item.addEventListener("mouseenter", this.handleMouseEnter);
        item.addEventListener("mouseleave", this.handleMouseLeave);
      });
    }
  }
  
  /**
   * Start the animation loop
   */
  startAnimation() {
    // Cancel any existing animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Start the animation loop
    this.state.isActive = true;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  /**
   * Start activity checking
   */
  startActivityCheck() {
    // Clear any existing interval
    if (this.activityCheckId) {
      clearInterval(this.activityCheckId);
    }
    
    // Check for inactivity every second
    this.activityCheckId = setInterval(this.checkActivity, 1000);
  }
  
  /**
   * Handle mouse movement
   * @param {MouseEvent} event Mouse movement event
   */
  handleMouseMove(event) {
    // Update mouse position
    this.state.mouseX = event.clientX;
    this.state.mouseY = event.clientY;
    this.state.lastActivityTime = Date.now();
    
    // Show cursor if it was hidden due to inactivity
    if (!this.state.isVisible && this.cursor) {
      this.showCursor();
    }
  }
  
  /**
   * Handle mouse enter on hoverable elements
   */
  handleMouseEnter() {
    if (!this.cursor) return;
    
    // Scale up cursor
    this.state.scale = this.config.hoverScale;
    this.cursor.style.transform = `translate(-50%, -50%) scale(${this.state.scale})`;
  }
  
  /**
   * Handle mouse leave on hoverable elements
   */
  handleMouseLeave() {
    if (!this.cursor) return;
    
    // Reset cursor scale
    this.state.scale = 1;
    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  }
  
  /**
   * Check for cursor activity
   */
  checkActivity() {
    const now = Date.now();
    const inactiveTime = now - this.state.lastActivityTime;
    
    // Hide cursor after inactivity threshold
    if (this.state.isVisible && inactiveTime > this.config.inactivityTimeout) {
      this.hideCursor();
    }
  }
  
  /**
   * Animation loop using requestAnimationFrame with throttling
   * @param {number} timestamp Current time from requestAnimationFrame
   */
  animate(timestamp) {
    if (!this.state.isActive || !this.cursor) {
      return;
    }
    
    // Throttle animation frame for performance
    if (timestamp - this.state.lastFrameTime >= this.config.frameThrottle) {
      // Calculate the distance between mouse and cursor
      const distX = this.state.mouseX - this.cursorX;
      const distY = this.state.mouseY - this.cursorY;
      
      // Apply easing for smooth movement
      this.state.cursorX += distX * this.config.speed;
      this.state.cursorY += distY * this.config.speed;
      
      // Update cursor position
      this.cursor.style.left = `${this.state.cursorX}px`;
      this.cursor.style.top = `${this.state.cursorY}px`;
      
      // Update last frame time
      this.state.lastFrameTime = timestamp;
    }
    
    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  /**
   * Hide the cursor
   */
  hideCursor() {
    if (!this.cursor) return;
    
    this.state.isVisible = false;
    this.cursor.style.opacity = "0";
  }
  
  /**
   * Show the cursor
   */
  showCursor() {
    if (!this.cursor) return;
    
    this.state.isVisible = true;
    this.cursor.style.opacity = "1";
  }
  
  /**
   * Clean up event listeners and animations
   */
  cleanup() {
    // Stop animation loop
    this.state.isActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Clear activity check interval
    if (this.activityCheckId) {
      clearInterval(this.activityCheckId);
      this.activityCheckId = null;
    }
    
    // Remove event listeners
    document.removeEventListener("mousemove", this.handleMouseMove);
    
    const hoverElements = document.querySelectorAll(".Hover");
    if (hoverElements && hoverElements.length > 0) {
      hoverElements.forEach(item => {
        item.removeEventListener("mouseenter", this.handleMouseEnter);
        item.removeEventListener("mouseleave", this.handleMouseLeave);
      });
    }
    
    // Remove unload listener
    window.removeEventListener('beforeunload', this.cleanup);
  }
}

// Create the cursor manager instance but don't initialize it yet
const cursorManager = new CursorManager();

// Export the manager and initialization function
export default cursorManager;
export const initializeCursor = async () => {
  try {
    return await cursorManager.initializeAsync();
  } catch (error) {
    console.error("Error initializing cursor:", error);
    return false;
  }
};
