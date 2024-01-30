var url = document.getElementById("input");
var qrCodeImage = document.querySelector(".qr-code");

document.addEventListener("keydown", function (event) {
  if (
    (event.metaKey && event.key == "Enter") ||
    (event.ctrlKey && event.key == "Enter")
  ) {
    event.preventDefault();
    typeURL();
  } else if (event.key == "Escape" && selected == true) {
    event.preventDefault();
    close();
  } else if (event.key == "Enter" && selected == true) {
    event.preventDefault();

    var content = url.value;
    console.log(content);
    var finalURL =
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
      content +
      "&chs=200x200&chld=L|0";
    qrCodeImage.src = finalURL;

    setTimeout(function () {
      url.value = "";
      close();
    }, 500);
  }
});

function close() {
  selected = false;
  document.getElementById("URL").removeAttribute("style");
}

var selected = false;

function typeURL() {
  selected = true;
  document.getElementById("URL").style = "visibility: visible; opacity: 1;";

  setTimeout(function () {
    url.focus();
  }, 50);
}

qrCodeImage.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(qrCodeImage.src);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
});