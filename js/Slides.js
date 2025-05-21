/**
 * Slide management for platform links (YouTube, GitHub, Twitch)
 * 
 * @version 1.1.0
 * @author LÆLÖ
 * @updated 2025-05-20
 */

// Configuration constants
const ANIMATION_DELAY = 500; // ms before enabling mouse listener again
const POSITIONS = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right'
};

// Transform values for each position
const TRANSFORMS = {
  [POSITIONS.CENTER]: {
    center: "translateX(0)",
    left: "translateX(-100%)",
    right: "translateX(80%)"
  },
  [POSITIONS.LEFT]: {
    left: "translateX(0)",
    right: "translateX(100%)",
    center: "translateX(-100%)"
  },
  [POSITIONS.RIGHT]: {
    right: "translateX(0)",
    left: "translateX(-100%)",
    center: "translateX(100%)"
  }
};

// Element selectors for delayed DOM access
const SELECTORS = {
  rightSlide: "Youtube",
  centerSlide: "GitHub",
  leftSlide: "Twitch"
};

// DOM elements cache (populated during initialization)
const elements = {
  rightSlide: null,
  centerSlide: null,
  leftSlide: null
};

// Event handlers storage for proper cleanup
const eventHandlers = {
  centerSlideHandler: null,
  leftSlideHandler: null,
  rightSlideHandler: null
};

// State management
let state = {
  currentPosition: POSITIONS.CENTER,
  isListenerEnabled: true,
  isInitialized: false,
  initError: null
};

/**
 * Cache DOM elements needed for slides
 * @returns {boolean} Success status
 */
function cacheElements() {
  try {
    // Get DOM elements - use document.getElementById for performance
    elements.rightSlide = document.getElementById(SELECTORS.rightSlide);
    elements.centerSlide = document.getElementById(SELECTORS.centerSlide);
    elements.leftSlide = document.getElementById(SELECTORS.leftSlide);
    
    // Check if elements exist
    for (const [key, element] of Object.entries(elements)) {
      if (!element) {
        console.error(`Slides: ${key} element not found, ID: ${SELECTORS[key]}`);
        state.initError = new Error(`${key} element not found`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error caching DOM elements:", error);
    state.initError = error;
    return false;
  }
}

/**
 * Set up event handlers with proper references for cleanup
 */
function setupEventHandlers() {
  try {
    // Create bound handlers and store references for cleanup
    eventHandlers.centerSlideHandler = () => activateSlide(POSITIONS.CENTER);
    eventHandlers.leftSlideHandler = () => activateSlide(POSITIONS.LEFT);
    eventHandlers.rightSlideHandler = () => activateSlide(POSITIONS.RIGHT);
    
    // Add event listeners
    elements.centerSlide.addEventListener("mouseenter", eventHandlers.centerSlideHandler);
    elements.leftSlide.addEventListener("mouseenter", eventHandlers.leftSlideHandler);
    elements.rightSlide.addEventListener("mouseenter", eventHandlers.rightSlideHandler);
    
    return true;
  } catch (error) {
    console.error("Error setting up event handlers:", error);
    state.initError = error;
    return false;
  }
}

/**
 * Initialize slides functionality
 * @returns {Promise<boolean>} Success status
 */
async function initializeSlides() {
  try {
    console.log("Initializing slides...");
    
    // Don't re-initialize if already done
    if (state.isInitialized) {
      console.log("Slides already initialized");
      return true;
    }
    
    // Cache DOM elements
    const elementsReady = cacheElements();
    if (!elementsReady) {
      return false;
    }
    
    // Set up event handlers
    const handlersReady = setupEventHandlers();
    if (!handlersReady) {
      return false;
    }
    
    // Set initial positions based on current state
    updateSlidePositions(state.currentPosition);
    
    // Mark as initialized
    state.isInitialized = true;
    console.log("Slides initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing slides:", error);
    state.initError = error;
    state.isInitialized = false;
    return false;
  }
}

/**
 * Activate a specific slide
 * @param {string} position - The position to activate ('center', 'left', or 'right')
 */
function activateSlide(position) {
  try {
    // Prevent unnecessary transitions
    if (!state.isListenerEnabled || state.currentPosition === position) {
      return;
    }
    
    console.log(`Activating ${position} slide`);
    
    // Update state
    state.currentPosition = position;
    state.isListenerEnabled = false;
    
    // Update slide classes
    updateSlideClasses(position);
    
    // Update slide positions
    updateSlidePositions(position);
    
    // Re-enable listener after animation completes
    setTimeout(() => {
      state.isListenerEnabled = true;
    }, ANIMATION_DELAY);
  } catch (error) {
    console.error(`Error activating ${position} slide:`, error);
    state.isListenerEnabled = true; // Ensure listener is re-enabled on error
  }
}

/**
 * Update CSS classes for slides based on active position
 * @param {string} position - The active position
 */
function updateSlideClasses(position) {
  // Reset all slides to not focused
  Object.values(elements).forEach(element => {
    element.classList.remove("sliderFocused");
    element.classList.add("sliderNotFocused");
  });
  
  // Set active slide to focused
  const activeElement = position === POSITIONS.CENTER ? elements.centerSlide :
                        position === POSITIONS.LEFT ? elements.leftSlide :
                        elements.rightSlide;
                        
  activeElement.classList.remove("sliderNotFocused");
  activeElement.classList.add("sliderFocused");
}

/**
 * Update transform positions for all slides
 * @param {string} position - The active position
 */
function updateSlidePositions(position) {
  const transforms = TRANSFORMS[position];
  
  if (!transforms) {
    console.error(`Invalid position: ${position}`);
    return;
  }
  
  elements.centerSlide.style.transform = transforms.center;
  elements.leftSlide.style.transform = transforms.left;
  elements.rightSlide.style.transform = transforms.right;
}

/**
 * Clean up event listeners - useful for SPA applications
 * @returns {boolean} Success status
 */
function cleanupSlides() {
  try {
    if (!state.isInitialized) {
      // Nothing to clean up
      return true;
    }
    
    // Remove event listeners using stored handler references
    if (elements.centerSlide && eventHandlers.centerSlideHandler) {
      elements.centerSlide.removeEventListener("mouseenter", eventHandlers.centerSlideHandler);
    }
    
    if (elements.leftSlide && eventHandlers.leftSlideHandler) {
      elements.leftSlide.removeEventListener("mouseenter", eventHandlers.leftSlideHandler);
    }
    
    if (elements.rightSlide && eventHandlers.rightSlideHandler) {
      elements.rightSlide.removeEventListener("mouseenter", eventHandlers.rightSlideHandler);
    }
    
    // Reset state
    state.isInitialized = false;
    
    console.log("Slides cleaned up successfully");
    return true;
  } catch (error) {
    console.error("Error cleaning up slides:", error);
    return false;
  }
}

/**
 * Get current initialization status
 * @returns {Object} Status object with isInitialized and error properties
 */
function getStatus() {
  return {
    isInitialized: state.isInitialized,
    error: state.initError
  };
}

// Export initialization function that returns a promise
export const initializeSlideModule = async () => {
  try {
    return await initializeSlides();
  } catch (error) {
    console.error("Error initializing slide module:", error);
    return false;
  }
};

// Export functions for external use with consistent naming
export {
  cleanupSlides
};

// Default export for module pattern consistency
export default {
  initialize: initializeSlideModule,
  cleanup: cleanupSlides,
  getStatus
};
