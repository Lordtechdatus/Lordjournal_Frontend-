// Cookie utility functions for session-based cookie consent

/**
 * Get a session cookie value (expires when browser closes)
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getSessionCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * Set a session cookie (expires when browser closes)
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 */
export const setSessionCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
};

/**
 * Check if user has given cookie consent
 * @returns {boolean|null} - true if accepted, false if declined, null if not set
 */
export const hasCookieConsent = () => {
  const consent = getSessionCookie("cookieConsent");
  if (consent === "true") return true;
  if (consent === "false") return false;
  return null;
};

/**
 * Check if user has accepted cookies
 * @returns {boolean} - true if cookies are accepted
 */
export const isCookieConsentAccepted = () => {
  return hasCookieConsent() === true;
};

/**
 * Get session ID from cookie
 * @returns {string|null} - Session ID or null if not found
 */
export const getSessionId = () => {
  return getSessionCookie("sessionId");
};

/**
 * Generate a unique session ID
 * @returns {string} - Unique session ID
 */
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
