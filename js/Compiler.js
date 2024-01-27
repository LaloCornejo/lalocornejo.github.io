/*---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 | C | O | M | P | I | L | E | R |   | S | C | R | I | P | T | S | 
 +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+*/

 const Terminal = document.querySelector(".Terminal");

document.addEventListener("keydown", function (event) {
  if ((navigator.userAgent.indexOf("Mac") === -1 && event.ctrlKey && event.key === "Enter") || (navigator.userAgent.indexOf("Mac") != -1 && event.key === "Enter")) {
    compile();
  }
});

function compile() {
  var code = document.getElementById("code").value;
  var data = {
    script: code,
    language: "cpp14",
    versionIndex: "3",
  };

  fetch("https://api.jdoodle.com/v1/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "fdsaasdfjkl",
    },
    body: JSON.stringify(data),
  })
    .then(Terminal.classList.add("active"))
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("TerminalOutput").innerText = data.output;
    });
}

function system() {
  if ( navigator.userAgent.indexOf("Mac") != -1 ) {
    // Mac
    document.getElementById("windows").style.display = "none";
    document.getElementById("macos").style.display = "flex";
  } else {
    // Windows
    document.getElementById("windows").style.display = "flex";
    document.getElementById("macos").style.display = "none";
  }
}

window.onload = system();

const CloseTerminal = document.querySelector(".CloseTerminal");

CloseTerminal.addEventListener("click", () => {
  Terminal.classList.remove("active");
});
