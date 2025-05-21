const Input = document.getElementById("favoriteInput");
const thangsList = document.querySelector(".thangsList");
const addButton = document.querySelector(".add");
const addLi = document.querySelector("#add");
const inputFace = document.querySelector(".InputFace");
const thang = document.querySelectorAll(".thang");
const contextMenu = document.querySelector(".contextMenu");
let X;
let Y;
let inputOn = false;

window.addEventListener("click", (e) => {
  // console.log(e.target.className);
  if (e.target.className === "add") {
    inputFace.style.display = "flex";
    inputOn = true;
    inputData();
  } else if (e.target.className !== "contextMenu") {
    contextMenu.style.visibility = "hidden";
    contextMenu.style.display = "none";
  }
  if ( inputOn && e.target.className === "InputFace") {
    console.log("inputFace clcked");
    inputFace.removeAttribute("style");
    inputOn = false;
  }
});

function inputData() {
  if (inputOn) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const favorite = Input.value;
        if (favorite.trim()) {
          saveFavorite(favorite);
          Input.value = "";
          loadFavorites();
        }
        inputFace.removeAttribute("style");
        console.log(e.key);
        inputOn = false;
      } else if (e.key === "Escape") {
        e.preventDefault();
        inputFace.removeAttribute("style");
        inputOn = false;
        console.log(e.key);
      }
    });
  }
}

function saveFavorite(favorite) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  thangsList.innerHTML = ""; // Clear the list first
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites);
  favorites.forEach((favorite, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    img.src = `https://www.google.com/s2/favicons?sz=128&domain_url=https://${favorite}`;
    img.alt = "Favicon";
    img.className = "favicon";

    li.className = "thang";

    a.href = "http://www." + favorite;
    a.setAttribute("target", "_blank");
    a.className = "thang";
    a.setAttribute("data-index", index);

    li.appendChild(a);
    a.appendChild(img);
    thangsList.appendChild(li);
  });

  const addLi = document.createElement("li");
  addLi.id = "add";
  addLi.innerHTML =
    '<button class="add"><ion-icon name="add-outline"></ion-icon><h4>add</h4></button>';
  thangsList.appendChild(addLi);

  const liCount = document.querySelectorAll(".thangsList li").length;

  console.log(liCount);

  if (liCount >= 10) {
    add.style.display = "none";
  }
}

thang.forEach((item) => {
  item.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenu.style.display = "block";
    X = event.clientX;
    Y = event.clientY;
    // console.log(X + " " + Y);
    moveContextMenu(X, Y);
    let index = item.getAttribute("data-index");
    console.log(index);
    contextMenu.querySelector("#edit").addEventListener("click", () => {
      editFavorite(index);
    });

    contextMenu.querySelector("#delete").addEventListener("click", () => {
      deleteFavorite(index);
    });
  });
});

window.addEventListener("contextmenu", (event) => {
  if (event.target.className === "thang") {
    event.preventDefault();
    contextMenu.style.display = "block";
    X = event.clientX;
    Y = event.clientY;
    // console.log(X + " " + Y);
    moveContextMenu(X, Y);
    let index = event.target.getAttribute("data-index");
    console.log(index);
    contextMenu.querySelector("#edit").addEventListener("click", () => {
      editFavorite(index);
    });

    contextMenu.querySelector("#delete").addEventListener("click", () => {
      deleteFavorite(index);
    });
  }
});

function moveContextMenu(x, y) {
  contextMenu.style.visibility = "visible";
  contextMenu.style.display = "block";
  contextMenu.style.position = "absolute";
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
}

function deleteFavorite(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

function editFavorite(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const edit = favorites[index];
  Input.value = edit;
  inputFace.style.display = "flex";
  inputOn = true;
  inputDataEdit(index);
}

function inputDataEdit(index) {
  if (inputOn) {
    window.addEventListener("keydown", (e) => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (e.key === "Enter") {
        e.preventDefault();
        const favorite = Input.value;
        if (favorite.trim()) {
          favorites[index] = Input.value;
          localStorage.setItem("favorites", JSON.stringify(favorites));
          Input.value = "";
          loadFavorites();
        }
        inputFace.removeAttribute("style");
        console.log(e.key);
        inputOn = false;
      } else if (e.key === "Escape") {
        e.preventDefault();
        inputFace.removeAttribute("style");
        inputOn = false;
        console.log(e.key);
      }
    });
  }
}

loadFavorites();
