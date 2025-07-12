// Sound management
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isEnabled = false;
    this.init();
  }

  init() {
    // Preload sounds
    this.loadSound(
      "hover",
      "../audio/click-reverb-001.mp3"
    );
    this.loadSound(
      "click",
    );
    this.loadSound(
      "textChange",
    );
  }

  loadSound(name, url) {
    const audio = new Audio(url);
    audio.preload = "auto";
    if (name === "hover") {
      audio.volume = 0.05; // Lower volume for hover
    } else {
      audio.volume = 0.3; // Default volume for click and text change
    }
    this.sounds[name] = audio;
  }

  enableAudio() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      console.log("Audio enabled");
    }
  }

  play(soundName, delay = 0) {
    if (this.isEnabled && this.sounds[soundName]) {
      if (delay > 0) {
        setTimeout(() => {
          this.sounds[soundName].currentTime = 0;
          this.sounds[soundName].play().catch((e) => {
            console.log("Audio play failed:", e);
          });
        }, delay);
      } else {
        this.sounds[soundName].currentTime = 0;
        this.sounds[soundName].play().catch((e) => {
          console.log("Audio play failed:", e);
        });
      }
    }
  }
}

const soundManager = new SoundManager();

const navItem = document.querySelectorAll(".navItem");
const progressFill = document.getElementById("progress-fill");
const currentSection = document.getElementById("current-section");
const totalSections = navItem.length;

const Loader = document.getElementById("pre-load");

const slides = document.querySelectorAll(".Slide");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (Loader) {
      Loader.style.display = "none";
    }
  }, 3000);
  soundManager.enableAudio();
  soundManager.play("textChange", 500);
});

navItem.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    soundManager.enableAudio();
    soundManager.play("hover");
  });

  item.addEventListener("click", () => {
    soundManager.enableAudio();
    soundManager.play("click");

    navItem.forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    item.classList.add("active");
    

    const index = parseInt(item.getAttribute("data-index"), 10);
    const progress = (index / totalSections) * 100;

    slides.forEach((slide) => {
      if( parseInt(slide.getAttribute("data-index"), 10) === index) {
        slide.classList.add("activeSl");
      }
      else {
        slide.classList.remove("activeSl");
      }
    });

    if (currentSection) {
      currentSection.textContent = index.toString().padStart(2, "0");
    }

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".navItem");
  const slides = document.querySelectorAll(".Slide");
  let currentSlide = 1;

  function updateSlides(newIndex) {
    if (newIndex < 1 || newIndex > slides.length || newIndex === currentSlide) {
        return;
    }

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

    setTimeout(() => {
        document.documentElement.classList.remove("no-overflow");
    }, 500);

    navItems.forEach(item => item.classList.remove("active"));
    const newNavItem = document.querySelector(`.navItem[data-index="${newIndex}"]`);
    if (newNavItem) newNavItem.classList.add("active");

    const progress = (newIndex / totalSections) * 100;
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (currentSection) {
        currentSection.textContent = newIndex.toString().padStart(2, "0");
    }

    currentSlide = newIndex;
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const index = parseInt(item.getAttribute("data-index"), 10);
        updateSlides(index);
    });
  });

  let isWheeling = false;
  window.addEventListener("wheel", function (event) {
    if (isWheeling) return;
    isWheeling = true;
    setTimeout(() => { isWheeling = false; }, 500);

    if (event.deltaY > 0) {
      updateSlides(currentSlide + 1);
    } else {
      updateSlides(currentSlide - 1);
    }
  });
});
