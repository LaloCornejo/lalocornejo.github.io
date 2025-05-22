/**
 * Home Page Module
 * Handles home page functionality including clock and UI interactions
 * 
 * @version 1.3.0
 * @author LÆLÖ
 * @updated 2025-05-20
 */

// Safe import function with fallback
const safeImport = async (modulePath, errorMessage) => {
  try {
    // Always use the full path from the HTML perspective
    // This is more reliable than trying to adjust paths
    console.log(`Importing module: ${modulePath}`);
    return await import(modulePath);
  } catch (error) {
    console.error(`${errorMessage}: ${error.message}`);
    return null;
  }
};

// Registered cleanup functions to be called on unload
const cleanupFunctions = [];

// Register a cleanup function to be called on page unload
const registerCleanup = (cleanupFn) => {
  if (typeof cleanupFn === 'function') {
    cleanupFunctions.push(cleanupFn);
    return true;
  }
  return false;
};

// Run all cleanup functions
const runCleanup = () => {
  cleanupFunctions.forEach(fn => {
    try {
      fn();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  });
};

// Register page unload handler
window.addEventListener('beforeunload', runCleanup);

// Safe DOM element selector
const getElement = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.error(`Failed to find element ${selector}:`, error);
    return null;
  }
};

// DOM elements will be cached during initialization to ensure DOM is ready
let elements = {
  time: null,
  sliders: null,
  projects: null  // Will use this instead of mainContainer which doesn't exist
};

// Cache DOM elements - called during initialization
const cacheElements = () => {
  try {
    elements = {
      time: getElement("#current-time"),
      sliders: document.querySelectorAll(".sliderContainer"),
      projects: getElement(".projects") // Projects section for flash effect
    };
    
    return true;
  } catch (error) {
    console.error('Failed to cache DOM elements:', error);
    return false;
  }
};

// -=================== Clock ===================-
const initClock = () => {
  try {
    if (!elements.time) {
      console.warn('Clock element not found');
      return null;
    }
    
    // Create update function
    const updateClock = () => {
      try {
        const d = new Date();
        elements.time.innerHTML = d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      } catch (error) {
        console.error('Clock update failed:', error);
      }
    };
    
    // Initial update
    updateClock();
    
    // Set interval for regular updates
    const clockInterval = setInterval(updateClock, 1000);
    
    // Return cleanup function
    const cleanup = () => {
      try {
        clearInterval(clockInterval);
        console.log('Clock interval cleared');
      } catch (error) {
        console.error('Failed to clear clock interval:', error);
      }
    };
    
    // Register cleanup
    registerCleanup(cleanup);
    
    return clockInterval;
  } catch (error) {
    console.error('Failed to initialize clock:', error);
    return null;
  }
};
// No login/auth functionality needed

// -=================== Cursor ===================-
const initCursor = async () => {
  try {
    console.log('Loading cursor module...');
    const cursorModule = await safeImport('../js/Cursor.js', 'Cursor module failed to load');
    
    if (!cursorModule) {
      console.warn('Cursor module not loaded, skipping initialization');
      return false;
    }
    
    // Initialize cursor using exported function
    if (cursorModule.initializeCursor) {
      const success = await cursorModule.initializeCursor();
      console.log('Cursor initialization ' + (success ? 'successful' : 'failed'));
      
      // Register cleanup if provided and initialization succeeded
      if (success && cursorModule.default && cursorModule.default.cleanup) {
        registerCleanup(cursorModule.default.cleanup);
      }
      
      return success;
    } else {
      console.warn('Cursor module missing initialization function');
      return false;
    }
  } catch (error) {
    console.error('Failed to initialize cursor:', error);
    return false;
  }
};

// -=================== Slides ===================-
const initSlides = async () => {
  try {
    console.log('Loading slides module...');
    const slidesModule = await safeImport('../js/Slides.js', 'Slides module failed to load');
    
    if (!slidesModule) {
      console.warn('Slides module not loaded, skipping initialization');
      return false;
    }
    
    // Initialize slides using exported function
    if (slidesModule.initializeSlideModule) {
      const success = await slidesModule.initializeSlideModule();
      console.log('Slides initialization ' + (success ? 'successful' : 'failed'));
      
      // Register cleanup if provided and initialization succeeded
      if (success && slidesModule.cleanupSlides) {
        registerCleanup(slidesModule.cleanupSlides);
      }
      
      return success;
    } else {
      console.warn('Slides module missing initialization function');
      return false;
    }
  } catch (error) {
    console.error('Failed to initialize slides:', error);
    return false;
  }
};

// -=================== Project Sliders Interaction ===================-
const setupProjectSliders = () => {
  try {
    console.log('Setting up project sliders...');
    
    // Make sure elements are cached
    if (!elements.sliders) {
      console.warn('Sliders not cached, attempting to get them now');
      elements.sliders = document.querySelectorAll('.sliderContainer');
    }
    
    if (!elements.sliders || elements.sliders.length === 0) {
      console.warn('No slider containers found');
      return false;
    }
    
    // Track handlers for cleanup
    const clickHandlers = new Map();
    
    // Add click handlers to each slider
    elements.sliders.forEach((slider) => {
      const clickHandler = () => {
        try {
          // Remove focus from all sliders
          elements.sliders.forEach(s => {
            s.classList.remove('sliderFocused');
            s.classList.add('sliderNotFocused');
          });
          
          // Add focus to the clicked slider
          slider.classList.remove('sliderNotFocused');
          slider.classList.add('sliderFocused');
          
          // Flash effect on click
          flash();
        } catch (error) {
          console.error('Error handling slider click:', error);
        }
      };
      
      // Store handler reference for cleanup
      clickHandlers.set(slider, clickHandler);
      
      // Add event listener
      slider.addEventListener('click', clickHandler);
    });
    
    // Register cleanup function
    registerCleanup(() => {
      try {
        clickHandlers.forEach((handler, slider) => {
          slider.removeEventListener('click', handler);
        });
        console.log('Project slider event listeners cleaned up');
      } catch (error) {
        console.error('Failed to clean up project slider event listeners:', error);
      }
    });
    
    console.log('Project sliders setup complete');
    return true;
  } catch (error) {
    console.error('Failed to set up project sliders:', error);
    return false;
  }
};

// Animation flash effect with error handling
const flash = () => {
  try {
    // Use projects element instead of mainContainer which doesn't exist
    const flashTarget = elements.projects;
    
    if (!flashTarget) {
      console.warn('Flash target element not found');
      return;
    }
    
    flashTarget.style.animation = "flash .8s ease-in-out";
    
    setTimeout(() => {
      if (flashTarget) {
        flashTarget.style.animation = "none";
      }
    }, 500);
  } catch (error) {
    console.error('Flash animation failed:', error);
  }
};

// Main initialization function - simplified without Firebase dependencies
const initialize = async () => {
  try {
    console.info('Initializing home page...');
    
    // First cache all DOM elements
    console.log('Caching DOM elements...');
    const elementsReady = cacheElements();
    
    if (!elementsReady) {
      console.warn('DOM elements not properly cached, some functionality may be limited');
    }
    
    // Initialize components in sequence for best user experience
    
    // 1. Start the clock first for immediate UI feedback
    console.log('Initializing clock...');
    const clockInterval = initClock();
    
    if (!clockInterval) {
      console.warn('Clock initialization failed, time display will not update');
      // Continue initialization despite clock failure (non-critical)
    } else {
      console.log('Clock initialized successfully');
    }
    
    // 2. Initialize cursor for immediate user interaction feedback
    console.log('Initializing cursor...');
    const cursorReady = await initCursor();
    
    if (!cursorReady) {
      console.warn('Cursor initialization failed, using default browser cursor');
      // Continue despite cursor failure (non-critical)
    } else {
      console.log('Cursor initialized successfully');
    }
    
    // 3. Initialize slides module (may take slightly longer)
    console.log('Initializing slides...');
    const slidesReady = await initSlides();
    
    if (!slidesReady) {
      console.warn('Slides initialization failed, slide animations may not work');
      // If slides module failed, try direct initialization as fallback
      console.log('Attempting fallback slider initialization...');
      const slidersInitialized = setupProjectSliders();
      
      if (!slidersInitialized) {
        console.warn('Fallback slider initialization also failed');
      } else {
        console.log('Fallback slider initialization succeeded');
      }
    } else {
      console.log('Slides initialized successfully');
    }
    
    console.info('Home page initialization complete');
    
    // Return object with init status and cleanup function
    return {
      status: {
        elementsReady,
        clockInitialized: !!clockInterval,
        cursorInitialized: cursorReady,
        slidesInitialized: slidesReady
      },
      cleanup: runCleanup
    };
  } catch (error) {
    console.error('Failed to initialize home page:', error);
    // Return failure status but continue with limited functionality
    return {
      status: {
        elementsReady: false,
        clockInitialized: false,
        cursorInitialized: false,
        slidesInitialized: false,
        error
      },
      cleanup: runCleanup
    };
  }
};

// Start initialization when DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initialize().catch(error => {
    console.error('Error during home page initialization:', error);
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    initialize().catch(error => {
      console.error('Error during home page initialization:', error);
    });
  });
}

// Export for potential use in other modules
export default { initialize, runCleanup };
