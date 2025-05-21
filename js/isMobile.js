/**
 * Checks if the current device is a mobile device using multiple detection methods
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export function mobileCheck() {
  try {
    // Primary check using matchMedia for touch devices with small screens
    if (window.matchMedia) {
      const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const smallScreen = window.matchMedia('(max-width: 768px)').matches;
      
      if (touchDevice && smallScreen) {
        return true;
      }
    }

    // Secondary check using navigator properties
    if ('maxTouchPoints' in navigator) {
      return navigator.maxTouchPoints > 0;
    }

    // Fallback check using user agent for older browsers
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'
    ];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  } catch (error) {
    console.error('Error detecting mobile device:', error);
    
    // Last resort fallback to screen size if everything else fails
    return window.innerWidth <= 768;
  }
}

/**
 * Checks if the device is in portrait orientation
 * @returns {boolean} True if in portrait orientation, false otherwise
 */
export function isPortrait() {
  try {
    if (window.matchMedia) {
      return window.matchMedia('(orientation: portrait)').matches;
    }
    return window.innerHeight > window.innerWidth;
  } catch (error) {
    console.error('Error detecting orientation:', error);
    return false;
  }
}
