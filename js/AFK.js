/**
 * AFK (Away From Keyboard) mode handler
 * Allows toggling between normal and AFK display modes
 */

// Cache DOM elements
const elements = {
  afkButton: document.querySelector(".afk"),
  mainContent: document.querySelector(".main"),
  logo: document.querySelector("#Logo")
};

/**
 * Initialize AFK functionality
 */
function initAFKMode() {
  // Check if required elements exist
  if (!elements.afkButton || !elements.mainContent || !elements.logo) {
    console.error("AFK Mode: Required DOM elements not found");
    return;
  }

  // Handle entering AFK mode
  elements.afkButton.addEventListener("click", enterAFKMode);
  
  // Handle exiting AFK mode on focus or click
  window.addEventListener("focus", exitAFKMode);
  window.addEventListener("click", exitAFKMode);
  
  console.log("AFK Mode initialized");
}

/**
 * Enter AFK mode
 */
function enterAFKMode() {
  try {
    elements.mainContent.style.opacity = "0";
    console.log("Entered AFK mode");
    
    setTimeout(() => {
      if (elements.logo) {
        elements.logo.style.scale = "5";
        elements.logo.style.transform = "translateY(65%)";
      }
    }, 300);
  } catch (error) {
    console.error("Error entering AFK mode:", error);
  }
}

/**
 * Exit AFK mode
 * @param {Event} event - The DOM event that triggered this function
 */
function exitAFKMode(event) {
  try {
    // Only exit if the click/focus wasn't on the AFK button itself
    if (event && event.target === elements.afkButton) {
      return;
    }
    
    if (elements.mainContent) {
      elements.mainContent.removeAttribute("style");
    }
    
    if (elements.logo) {
      elements.logo.removeAttribute("style");
    }
    
    console.log("Exited AFK mode");
  } catch (error) {
    console.error("Error exiting AFK mode:", error);
  }
}

/**
 * Clean up event listeners - useful for SPA applications
 */
function cleanupAFKMode() {
  try {
    if (elements.afkButton) {
      elements.afkButton.removeEventListener("click", enterAFKMode);
    }
    
    window.removeEventListener("focus", exitAFKMode);
    window.removeEventListener("click", exitAFKMode);
    
    console.log("AFK Mode cleaned up");
  } catch (error) {
    console.error("Error cleaning up AFK mode:", error);
  }
}

// Initialize AFK mode when DOM is ready
if (document.readyState === "complete") {
  initAFKMode();
} else {
  document.addEventListener("DOMContentLoaded", initAFKMode);
}

// Export functions for potential external use
export { 
  initAFKMode,
  enterAFKMode,
  exitAFKMode,
  cleanupAFKMode
};
