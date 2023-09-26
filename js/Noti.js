export function Noti(message, type="success"){
    Toastify({
        text: message,
        duration: 1500,
        destination: "",
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            "border-radius": "10px",
            background: type == "success" ? "#ae00ff" : "#ff0000",
        },
        onClick: function(){} // Callback after click
    }).showToast();
} 