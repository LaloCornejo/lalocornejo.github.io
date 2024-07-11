const Input = document.getElementById("favoriteInput");
const thangsList = document.querySelector(".thangsList");
const addButton = document.querySelector(".add");
const addLi = document.querySelector("#add");
const inputFace = document.querySelector(".InputFace");

const liCount = document.querySelectorAll(".thangsList li").length;

console.log(liCount);

if (liCount >= 10 ) {
  add.style.display = "none";
}

window.addEventListener("click", (e) => {
  if(e.target.className === "add") {
    inputFace.style.display = "flex";
  }
});

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
  }else if (e.key === "Escape") {
    e.preventDefault();
    inputFace.removeAttribute("style");
    console.log(e.key);
  }
});

function saveFavorite(favorite) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  thangsList.innerHTML = ''; // Clear the list first
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((favorite) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img"); 

    img.src = `https://www.google.com/s2/favicons?sz=128&domain_url=https://${favorite}`;
    img.alt = "Favicon";
    img.className = "favicon";

    a.href = "http://www." + favorite;
    a.setAttribute("target", "_blank");
    a.className = "thang";

    li.appendChild(a);
    a.appendChild(img);
    thangsList.appendChild(li); 
  });

  const addLi = document.createElement("li");
  addLi.id = "add";
  addLi.innerHTML = '<button class="add"><ion-icon name="add-outline"></ion-icon><h4>add</h4></button>';
  thangsList.appendChild(addLi);
}

loadFavorites();

let X;
let Y;

const thang = document.querySelectorAll(".thang");
const contextMenu = document.querySelector('.contextMenu');

thang.forEach((item) => {
  item.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenu.style.display = "block";
    X = event.clientX;
    Y = event.clientY;
    console.log(X + " " + Y);
    moveContextMenu(X, Y);
  });
});

function moveContextMenu(x, y) {
  contextMenu.style.position = 'absolute'; // Use 'fixed' to position relative to the viewport
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
}

// TODO: Add a delete button to the context menu