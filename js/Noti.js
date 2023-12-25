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
      opacity: "1",
      "font-family": "JetBrains Mono, JetBrains",
      "font-size": bool ? "1.5vh" : "1.8vw",
      "@media screen and (max-width: 900px)": {
        "font-size": "2vw",
      },
      background: type == "success" ? "linear-gradient(153deg, rgba(0,48,255,1) 0%, rgba(255,0,241,1) 50%)" : "linear-gradient(45deg, rgba(255,0,0, 1) 20%, rgba(255,60,0, 1) 100%)", 
      "box-shadow": "0 0 80px" + (type == "success" ? "#ae00ff" : "#ff0000"),
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
