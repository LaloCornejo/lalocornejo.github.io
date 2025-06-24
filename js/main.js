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

    if (currentSection) {
      currentSection.textContent = index.toString().padStart(2, "0");
    }

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
  });
});
