// Sound management
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = false;
    this.init();
  }

  init() {
    this.loadSound("hover", "../audio/click-reverb-001.mp3");
  }

  loadSound(name, url) {
    if (!url) return;
    const audio = new Audio(url);
    audio.preload = "metadata";
    audio.volume = name === "hover" ? 0.05 : 0.3;
    this.sounds[name] = audio;
  }

  enableAudio() {
    if (!this.isEnabled) {
      this.isEnabled = true;
    }
  }

  play(soundName, delay = 0) {
    if (!this.isEnabled || !this.sounds[soundName]) return;
    
    const playAudio = () => {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play().catch(() => {});
    };

    delay > 0 ? setTimeout(playAudio, delay) : playAudio();
  }
}

// Initialize sound manager
const soundManager = new SoundManager();

// Cache DOM elements
const navItems = document.querySelectorAll(".navItem");
const progressFill = document.getElementById("progress-fill");
const currentSection = document.getElementById("current-section");
const loader = document.getElementById("pre-load");
const slides = document.querySelectorAll(".Slide");

let currentSlide = 1;
let isWheeling = false;
let isTransitioning = false;

// Loader management
window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) loader.style.display = "none";
  }, 3000);
  soundManager.enableAudio();
});

// Slide transition function
function updateSlides(newIndex) {
  if (newIndex < 1 || newIndex > slides.length || newIndex === currentSlide || isTransitioning) {
    return;
  }

  isTransitioning = true;
  document.documentElement.classList.add("no-overflow");

  const oldSlide = document.querySelector(`.Slide[data-index="${currentSlide}"]`);
  const newSlide = document.querySelector(`.Slide[data-index="${newIndex}"]`);

  if (oldSlide) {
    const animationName = newIndex > currentSlide ? "activeOutUp" : "activeOutDown";
    oldSlide.style.animation = `${animationName} 0.5s forwards`;
    oldSlide.addEventListener('animationend', function handler() {
      oldSlide.style.animation = '';
      oldSlide.classList.remove("activeSl");
      oldSlide.removeEventListener('animationend', handler);
    });
  }

  if (newSlide) {
    const animationName = newIndex > currentSlide ? "commingInUp" : "commingInDown";
    newSlide.style.animation = `${animationName} 0.5s forwards`;
    newSlide.classList.add("activeSl");
    newSlide.addEventListener('animationend', function handler() {
      newSlide.style.animation = '';
      newSlide.removeEventListener('animationend', handler);
    });
  }

  // Update navigation
  navItems.forEach(item => item.classList.remove("active"));
  const newNavItem = document.querySelector(`.navItem[data-index="${newIndex}"]`);
  if (newNavItem) newNavItem.classList.add("active");

  // Update progress
  const progress = (newIndex / navItems.length) * 100;
  if (progressFill) progressFill.style.width = `${progress}%`;
  if (currentSection) currentSection.textContent = newIndex.toString().padStart(2, "0");

  currentSlide = newIndex;

  setTimeout(() => {
    document.documentElement.classList.remove("no-overflow");
    isTransitioning = false;
  }, 500);
}

// Event listeners
navItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    soundManager.enableAudio();
    soundManager.play("hover");
  });

  item.addEventListener("click", () => {
    const index = parseInt(item.getAttribute("data-index"), 10);
    updateSlides(index);
  });
});

// Wheel navigation with throttling
window.addEventListener("wheel", function (event) {
  if (isWheeling || isTransitioning) return;
  
  isWheeling = true;
  setTimeout(() => { isWheeling = false; }, 500);

  const direction = event.deltaY > 0 ? 1 : -1;
  updateSlides(currentSlide + direction);
});

// Keyboard navigation
document.addEventListener("keydown", function (event) {
  if (isTransitioning) return;
  
  switch (event.key) {
    case "ArrowDown":
    case "PageDown":
      event.preventDefault();
      updateSlides(currentSlide + 1);
      break;
    case "ArrowUp":
    case "PageUp":
      event.preventDefault();
      updateSlides(currentSlide - 1);
      break;
  }
});

// ─── Live GitHub Stats ─────────────────────────────────────────────
const GITHUB_USER = "LaloCornejo";
const CACHE_KEY = "gh_stats";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function fetchGitHubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const data = {
      repos: user.public_repos,
      stars: totalStars,
      followers: user.followers,
      fetchedAt: Date.now()
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    return data;
  } catch {
    return null;
  }
}

function renderStats(data) {
  const reposEl = document.getElementById("stat-repos");
  const starsEl = document.getElementById("stat-stars");
  const followersEl = document.getElementById("stat-followers");
  if (reposEl) reposEl.textContent = data.repos;
  if (starsEl) starsEl.textContent = data.stars;
  if (followersEl) followersEl.textContent = data.followers;
}

function loadStats() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.fetchedAt < CACHE_TTL) {
      renderStats(parsed);
      return;
    }
  }

  // Render stale cache immediately, then refresh in background
  if (cached) renderStats(JSON.parse(cached));

  fetchGitHubStats().then(data => { if (data) renderStats(data); });
}

document.addEventListener("DOMContentLoaded", loadStats);
