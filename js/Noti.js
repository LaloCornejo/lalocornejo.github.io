export function Noti(message, type="success"){
    Toastify({
        text: message,
        duration: 1500,
        destination: "",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            "border-radius": "10px",
            "margin-top": "35px",
            background: type == "success" ? "#ae00ff" : "#ff0000",
        },
        onClick: function(){} // Callback after click
    }).showToast();
} 