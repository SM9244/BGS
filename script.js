// ==========================================
// BIRTHDAY GIFT SURPRISE
// ==========================================

const giftBox = document.getElementById("giftBox");
const giftScreen = document.getElementById("giftScreen");
const birthdayScreen = document.getElementById("birthdayScreen");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

let giftOpened = false;

// ==========================================
// BIRTHDAY MUSIC
// ==========================================

if (birthdayMusic) {
  birthdayMusic.volume = 0.5;
}

async function playBirthdayMusic() {
  if (!birthdayMusic) return;

  try {
    await birthdayMusic.play();

    musicButton.classList.add("hidden");
  } catch (error) {
    console.log("Automatic music playback was blocked:", error);

    musicButton.classList.remove("hidden");
  }
}

// ==========================================
// OPEN THE GIFT BOX
// ==========================================

giftBox.addEventListener("click", async function () {
  if (giftOpened) return;

  giftOpened = true;

  // Open gift lid
  giftBox.classList.add("opened");

  // Play music after user interaction
  playBirthdayMusic();

  // Wait for gift-opening animation
  setTimeout(() => {
    // Hide initial gift screen
    giftScreen.classList.add("hidden");

    // Show birthday surprise
    birthdayScreen.classList.remove("hidden");

    // Start falling birthday emojis
    createConfetti();
  }, 1100);
});

// ==========================================
// FALLING BIRTHDAY EMOJIS AND FLOWERS
// ==========================================

function createConfetti() {
  const emojis = [
    "🎉",
    "🎊",
    "🪻",
    "🌸",
    "🌟",
    "🌷",
    "✨",
    "🎈",
    "🥳",
    "💫",
    "🎂",
  ];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");

    // Random birthday emoji
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random position
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-40px";

    // Random size
    confetti.style.fontSize = Math.random() * 18 + 16 + "px";

    confetti.style.zIndex = "9999";
    confetti.style.pointerEvents = "none";
    confetti.style.userSelect = "none";

    document.body.appendChild(confetti);

    // Random falling speed
    const duration = Math.random() * 4 + 3;

    // Falling animation
    const animation = confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translateY(110vh) rotate(${Math.random() * 1080}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        easing: "linear",
      }
    );

    // Remove after animation
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}

// ==========================================
// MANUAL MUSIC BUTTON
// ==========================================

musicButton.addEventListener("click", function () {
  playBirthdayMusic();
});
