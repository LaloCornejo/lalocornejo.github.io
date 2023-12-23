export function Noti(message, type = "success") {
  Toastify({
    text: message,
    duration: 1000,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "10px",
      "margin-top": type == "success" ? "200px" : "70px",
      opacity: ".7",
      transition: "opacity 300ms ease-out",
      "font-family": "JetBrains Mono",
      "font-size": "1.2em",
      "@keyframes opacity": "from{opacity: .7;} to{opacity: 0;}", // Fix the typo in the @keyframes property
      background: type == "success" ? "#1138cc" : "#ae00ff", // Add a colon after the property name "background"
      "box-shadow": "0 0 80px" + (type == "success" ? "#1138cc" : "#ae00ff"),
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
