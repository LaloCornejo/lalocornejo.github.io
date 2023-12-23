export function Noti(message, type = "success", bool = false) {
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
      "font-family": "JetBrains Mono",
      "font-size": bool ? "1.5vh" : "1.8vw",
      "@media screen and (max-width: 900px)": {
        "font-size": "2vw",
      },
      background: type == "success" ? "linear-gradient(45deg, rgba(0,24,126,1) 0%, rgba(255,0,241,1) 77%)" : "linear-gradient(75deg, rgba(255,0,0,0.7) 0%, rgba(52,31,0,0.7) 100%)", // Add a colon after the property name "background"
      "box-shadow": "0 0 80px" + (type == "success" ? "#ae00ff" : "#ff0000"),
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
