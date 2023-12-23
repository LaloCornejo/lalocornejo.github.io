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
      background: type == "success" ? "linear-gradient(45deg, rgba(0,24,126,1) 0%, rgba(255,0,241,1) 77%)" : "linear-gradient(45deg, rgba(255,0,0,0.7) 0%, rgba(52,31,0,0.7) 100%)", // Add a colon after the property name "background"
      "box-shadow": "0 0 80px" + (type == "success" ? "#00ff8c" : "#ff0000"),
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
