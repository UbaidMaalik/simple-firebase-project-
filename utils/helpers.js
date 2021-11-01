/**
 * Helper Methods
 */

/**
 * Get an element by its ID
 * @param String id
 * @return element
 */
const getByID = (id) => document.getElementById(id);

/**
 * Checks the current path
 * @param String path
 * @return Boolean
 */
const isCurrentPath = (path) => {
  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter((part) => part);
  const currentPath = parts[parts.length - 1];

  return currentPath === `${path}.html`;
};

/**
 * Show an element
 * @param DOMElement element
 * @return void
 */
const show = (element) => (element.style.display = "block");

/**
 * Hide an element
 * @param DOMElement element
 * @return void
 */
const hide = (element) => (element.style.display = "none");

/**
 * Show an alert
 * @param String type
 * @param String message
 * @param Number message (in seconds)
 * @return void
 */
const showAlert = (type, message, duration = 5) => {
  const wrapperElement = getByID("messages");

  if (!wrapperElement)
    return console.error(
      "There must be an element with ID 'messages' in the DOM"
    );

  wrapperElement.innerHTML += `
      <div class="alert alert-${type}">
        <strong>${message}</strong>
      </div>
   `;

  // Dismiss
  setTimeout(() => {
    wrapperElement.innerHTML = "";
  }, duration * 1000);
};
