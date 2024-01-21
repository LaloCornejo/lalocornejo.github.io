/*---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 | C | O | M | P | I | L | E | R |   | S | C | R | I | P | T | S | 
 +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+*/


function compile() {
  var code = document.getElementById("code").value;
  var data = {
    script: code,
    language: "cpp14",
    versionIndex: "3"
  };

  fetch('https://api.jdoodle.com/v1/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'YOUR_JDOODLE_API_KEY'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerText = data.output;
    });
}

function system() {
  if (navigator.userAgent.indexOf("Win") != -1) {
    // Windows
    document.getElementById( "windows" ).style.display = "block";
    document.getElementById( "mac" ).style.display = "none";
  } else if (navigator.userAgent.indexOf("Mac") != -1) {
    // Mac
    document.getElementById( "windows" ).style.display = "none";
    document.getElementById( "mac" ).style.display = "block";
  }
}

window.onload = system();