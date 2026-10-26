
const SETTINGS = {
  password: "2710",
  reasons: [
    "You can make me smile even on an ordinary day. 🥹",
    "You're the person I want to share my little moments with. 💗",
    "After three years, you still hold a special place in my heart. ❤️"
  ]
};

const $ = id => document.getElementById(id);

const lockScreen = $("lockScreen");
const storyScreen = $("storyScreen");
const quizScreen = $("quizScreen");
const letterScreen = $("letterScreen");
const finalScreen = $("finalScreen");
const timelineScreen = $("timelineScreen");

const passwordForm = $("passwordForm");
const passwordInput = $("passwordInput");
const passwordMessage = $("passwordMessage");
const musicButton = $("musicButton");
const heartsContainer = $("hearts");

function showScreen(screen) {
  [
    lockScreen,
    storyScreen,
    quizScreen,
    letterScreen,
    finalScreen,
    timelineScreen
  ].forEach(item => item.classList.add("hidden"));

  screen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// PASSWORD
passwordForm.addEventListener("submit", event => {
  event.preventDefault();

  if (passwordInput.value.trim() === SETTINGS.password) {
    passwordMessage.textContent = "";
    passwordInput.value = "";
    storyIndex = 0;
    showStory();
    showScreen(storyScreen);
  } else {
    passwordMessage.textContent =
      "Oops, Baby! That's not our secret code. Try again 💗";
    passwordInput.value = "";
    passwordInput.focus();
  }
});

// STORY
const stories = [
  {
    emoji: "💕",
    title: "Welcome to our little world",
    text: "Three years of memories, smiles and little moments that mean so much. ❤️"
  },
  {
    emoji: "🥹",
    title: "Our special memories",
    text: "Every conversation, every laugh and every little moment has become part of our story."
  },
  {
    emoji: "💗",
    title: "And this is only the beginning",
    text: "Here's to more happiness, understanding, laughter and beautiful memories together."
  }
];

let storyIndex = 0;

function showStory() {
  const story = stories[storyIndex];
  $("stepLabel").textContent = `OUR STORY · ${storyIndex + 1}`;
  $("storyEmoji").textContent = story.emoji;
  $("storyTitle").textContent = story.title;
  $("storyText").textContent = story.text;
  $("progressBar").style.width =
    `${((storyIndex + 1) / stories.length) * 100}%`;

  $("nextButton").textContent =
    storyIndex === stories.length - 1
      ? "Play our little love game 💘"
      : "Next surprise 💌";
}

$("nextButton").addEventListener("click", () => {
  if (storyIndex < stories.length - 1) {
    storyIndex++;
    showStory();
  } else {
    resetQuiz();
    showScreen(quizScreen);
  }
});

// LOVE QUIZ
const questions = [
  {
    question: "What would I choose for our anniversary?",
    answers: [
      "An expensive gift 🎁",
      "A hug and time together 🫂",
      "A fancy restaurant 🍰",
      "A shopping trip 🛍️"
    ],
    correct: 1,
    messages: [
      "Hehe, gifts are cute, but time together is priceless. ❤️",
      "Awww! You know your girl! 🥹❤️",
      "That would be cute too, Baby! 💗",
      "Maybe another day! 🤭"
    ]
  },
  {
    question: "What makes our story special?",
    answers: [
      "Our memories together 💗",
      "Only expensive presents 🎁",
      "Never sharing our feelings 🤐",
      "Competing with other couples 🏆"
    ],
    correct: 0,
    messages: [
      "Yesss, our memories are precious! 🥹❤️",
      "The best things about us can't be bought. 💌",
      "Understanding each other matters. 🫂",
      "Our story is uniquely ours. ♾️"
    ]
  },
  {
    question: "What do I want for our fourth year?",
    answers: [
      "More arguments 😂",
      "To stop making memories",
      "More love, laughter and understanding ❤️",
      "To never talk again 😭"
    ],
    correct: 2,
    messages: [
      "Let's choose more laughter instead! 😂",
      "We have so many memories left to make! 💗",
      "That's the dream! Let's grow together. 🥹❤️",
      "Let's keep sharing our little moments. 💗"
    ]
  }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  $("quizCounter").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  $("quizQuestion").textContent = question.question;
  $("quizOptions").innerHTML = "";
  $("quizFeedback").textContent = "";
  $("quizNextButton").classList.add("hidden");
  answered = false;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      if (index === question.correct) quizScore++;

      $("quizOptions").querySelectorAll("button").forEach(item => {
        item.disabled = true;
      });

      button.classList.add("selected");
      $("quizFeedback").textContent = question.messages[index];
      $("quizNextButton").textContent =
        currentQuestion === questions.length - 1
          ? "Read your letter 💌"
          : "Next question ➜";
      $("quizNextButton").classList.remove("hidden");
    });

    $("quizOptions").appendChild(button);
  });
}

function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  renderQuestion();
}

$("quizNextButton").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showScreen(letterScreen);
  }
});

// SECRET LETTER
$("openLetterButton").addEventListener("click", () => {
  $("letterContent").classList.remove("hidden");
  $("openLetterButton").classList.add("hidden");
  $("finishButton").classList.remove("hidden");
});

$("finishButton").addEventListener("click", () => {
  showScreen(finalScreen);
  celebrateHearts(30);
});

// REPLAY
$("restartButton").addEventListener("click", () => {
  storyIndex = 0;
  resetQuiz();

  $("letterContent").classList.add("hidden");
  $("openLetterButton").classList.remove("hidden");
  $("finishButton").classList.add("hidden");

  showScreen(lockScreen);
});

 // RELATIONSHIP TIMELINE
$("timelineButton").addEventListener("click", () => {
  showScreen(timelineScreen);
});

$("backToFinalButton").addEventListener("click", () => {
  showScreen(finalScreen);
});

// FLOATING HEARTS
const heartSymbols = ["💗", "💕", "💖", "♡", "💘"];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 6) + "s";

  heartsContainer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createHeart, 850);

function celebrateHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 100);
  }
}



 // MUSIC — Ammadi from YouTube
let musicPlaying = false;
let youtubeReady = false;
let youtubePlayer = null;

function loadYouTubeAPI() {
  window.onYouTubeIframeAPIReady = createYouTubePlayer;

  if (window.YT && window.YT.Player) {
    createYouTubePlayer();
    return;
  }

  if (!document.getElementById("youtube-api-script")) {
    const tag = document.createElement("script");
    tag.id = "youtube-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }
}

function createYouTubePlayer() {
  if (youtubePlayer) return;

  youtubePlayer = new YT.Player("ammadiPlayer", {
    events: {
      onReady: () => {
        youtubeReady = true;
        musicButton.textContent = "♫ Music: OFF";
        musicButton.setAttribute("aria-pressed", "false");
      },
      onError: (event) => {
        musicPlaying = false;
        musicButton.textContent = "♫ Music error " + event.data;
        musicButton.setAttribute("aria-pressed", "false");
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          musicPlaying = true;
          musicButton.textContent = "♫ Music: ON";
          musicButton.setAttribute("aria-pressed", "true");
        } else if (
          event.data === YT.PlayerState.PAUSED ||
          event.data === YT.PlayerState.ENDED
        ) {
          musicPlaying = false;
          musicButton.textContent = "♫ Music: OFF";
          musicButton.setAttribute("aria-pressed", "false");
        }
      }
    }
  });
}

function toggleMusic() {
  if (!youtubeReady || !youtubePlayer) {
    musicButton.textContent = "♫ Loading music…";
    loadYouTubeAPI();
    return;
  }

  if (musicPlaying) {
    youtubePlayer.pauseVideo();
  } else {
    youtubePlayer.playVideo();
  }
}

musicButton.addEventListener("click", toggleMusic);
loadYouTubeAPI();



// START
showScreen(lockScreen);
