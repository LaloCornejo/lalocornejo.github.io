/**
 * Display a notification toast message
 * @param {string} message - The message to display
 * @param {'success' | 'error'} type - The type of notification
 */
export function Noti(message, type = "success") {
  // Input validation
  if (typeof message !== "string") {
    console.error("Noti error: Message must be a string");
    message = String(message);
  }
  
  if (!["success", "error"].includes(type)) {
    console.warn(`Noti warning: Invalid type "${type}", defaulting to "success"`);
    type = "success";
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `toast-notification toast-${type}`;
  notification.textContent = message;

  // Apply styles
  Object.assign(notification.style, {
    position: "fixed",
    top: type === "success" ? "200px" : "110px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    borderRadius: "10px",
    fontFamily: "JetBrains Mono, JetBrains",
    fontSize: "calc(1vw + 0.5vh)",
    color: "#ffffff",
    opacity: "0",
    transition: "opacity 0.3s ease-in-out",
    zIndex: "9999",
    background: type === "success"
      ? "linear-gradient(153deg, rgba(0,48,255,1) 0%, rgba(255,0,241,1) 50%)"
      : "linear-gradient(45deg, rgba(255,0,0,1) 20%, rgba(255,60,0,1) 100%)",
    boxShadow: `0 0 80px ${type === "success" ? "#ae00ff" : "#ff0000"}`
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Trigger animation
  requestAnimationFrame(() => {
    notification.style.opacity = "1";
  });

  // Remove after duration
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.addEventListener("transitionend", () => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    });
  }, 1000);
}
