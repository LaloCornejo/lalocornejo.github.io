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
      "margin-top": type == "success" ? "200px" : "110px",
      opacity: ".7",
      transition: "opacity 300ms ease-out",
      "font-family": "JetBrains Mono",
      "font-size": "1.2em",
      "@keyframes opacity": "from{opacity: .7;} to{opacity: 0;}", // Fix the typo in the @keyframes property
      background: type == "success" ? "linear-gradient(90deg, rgba(0,255,140,1) 0%, rgba(240,0,255,1) 100%)" : "linear-gradient(90deg, rgba(255,0,0,0.6565543185459094) 0%, rgba(0,215,255,1) 100%)", // Add a colon after the property name "background"
      "box-shadow": "0 0 80px" + (type == "success" ? "linear-gradient(90deg, rgba(0,255,140,1) 0%, rgba(240,0,255,1) 100%)" : "linear-gradient(90deg, rgba(255,0,0,0.6565543185459094) 0%, rgba(0,215,255,1) 100%)"),
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
