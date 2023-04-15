const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => { document.body.classList.contains("light-theme") ? enableDarkMode() : enableLightMode(); });

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
  window.localStorage.setItem("theme", "dark");
  console.log('dark');
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
  window.localStorage.setItem("theme", "light");
  console.log('light');
}

function setThemePreference() {
  if (window.localStorage.getItem("theme") == "dark") {
    enableDarkMode();
    return;
  }
  enableLightMode();
}
document.onload = setThemePreference();
