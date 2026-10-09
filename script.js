/* ==========================================================================
   Doraemon Apology Web Application - Interactive Logic & Audio Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHearts();
  initMusicPlayer();
  initGadgets();
  initLoveMeter();
  initReasonsGenerator();
  initDecisionButtons();
  initModal();
});

/* --------------------------------------------------------------------------
   1. Floating Hearts Background Generator
   -------------------------------------------------------------------------- */
function initFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const heartSymbols = ['💖', '💕', '💗', '🌸', '✨', '❤️', '🎈'];

  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
    
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }

  setInterval(createHeart, 500);
}

/* --------------------------------------------------------------------------
   2. Gentle Synthesized Background Music (Web Audio API)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let isPlaying = false;
let melodyInterval = null;

function initMusicPlayer() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const tooltip = document.querySelector('.music-tooltip');

  musicBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
      musicBtn.classList.add('playing');
      tooltip.textContent = 'Pause Music 🎵';
      playSweetMelody();
    } else {
      musicBtn.classList.remove('playing');
      tooltip.textContent = 'Play Music 🎵';
      stopSweetMelody();
    }
  });
}

function playSweetMelody() {
  // Pentatonic romantic soft lullaby notes (Frequency in Hz)
  const notes = [
    523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
    659.25, 783.99, 1046.50, 880.00, 783.99
  ];
  let noteIndex = 0;

  melodyInterval = setInterval(() => {
    if (!isPlaying || !audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(notes[noteIndex], audioCtx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);

    noteIndex = (noteIndex + 1) % notes.length;
  }, 400);
}

function stopSweetMelody() {
  if (melodyInterval) clearInterval(melodyInterval);
}

/* --------------------------------------------------------------------------
   3. Doraemon Gadgets Interaction
   -------------------------------------------------------------------------- */
const gadgetInfo = {
  timemachine: {
    icon: '⏳',
    title: 'Time Machine Activated!',
    body: 'Bzzz-Wooosh! Doraemon turned back time to 1 hour before our fight! The argument never happened, and all bad feelings have been completely wiped out of history! 💖'
  },
  anywheredoor: {
    icon: '🚪',
    title: 'Anywhere Door Opened!',
    body: 'Knock knock! Opening the Pink Anywhere Door to give you the biggest, warmest, non-stop hug right now! You are safe and loved. 🤗❤️'
  },
  memorybread: {
    icon: '🍞',
    title: 'Memory Bread Pressed!',
    body: 'Nom nom! You ate the Memory Bread! It immediately loaded 1,000,000 sweet memories of us laughing, smiling, and hugging together into your heart!'
  },
  lovegummy: {
    icon: '🍬',
    title: 'Love Translation Gummy!',
    body: 'Doraemon translated my awkward words: "What I really meant to say is that you are my favorite person in the entire universe and I am so lucky to have you!" ✨'
  }
};

function initGadgets() {
  const gadgetCards = document.querySelectorAll('.gadget-card');
  gadgetCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-gadget');
      const data = gadgetInfo[type];
      if (data) {
        showModal(data.icon, data.title, data.body);
        triggerConfetti(0.3);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Love Meter & Reasons Generator
   -------------------------------------------------------------------------- */
function initLoveMeter() {
  const fillBtn = document.getElementById('fillMeterBtn');
  const meterBar = document.getElementById('meterBar');
  const meterText = document.getElementById('meterText');

  fillBtn.addEventListener('click', () => {
    meterBar.style.width = '100%';
    let count = 0;
    const interval = setInterval(() => {
      count += 50;
      meterText.textContent = count + '% LOVE OVERLOAD! 💕';
      if (count >= 1000) {
        clearInterval(interval);
        triggerConfetti(0.6);
        showModal('💖', 'Love Meter Exploded!', 'My love for you exceeds 1000%! Doraemon confirmed that no fight can ever weaken my love for you!');
      }
    }, 50);
  });
}

const sweetReasons = [
  "That gorgeous, bright smile on your face in our selfie—it literally melts my heart every single time! ☀️✌️",
  "The cozy feeling of holding your hand tight with your silver bracelet, never wanting to let go! 🤝💖",
  "Walking side-by-side with you everywhere we go—you are my absolute favorite walking partner! 👣🌸",
  "The cute peace sign you always do that makes every moment 100x happier! ✌️🥰",
  "How caring, sweet, and pure your heart is, even when you act angry with me! 🥺",
  "Because holding your hand makes me feel like the luckiest boy in the universe! ✨",
  "You are my best friend, my soulmate, and my ultimate happiness! 💖"
];

function initReasonsGenerator() {
  const display = document.getElementById('reasonDisplay');
  const btn = document.getElementById('nextReasonBtn');
  let index = 0;

  btn.addEventListener('click', () => {
    display.style.opacity = 0;
    setTimeout(() => {
      display.textContent = `"${sweetReasons[index]}"`;
      display.style.opacity = 1;
      index = (index + 1) % sweetReasons.length;
    }, 200);
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Decision Box (YES vs NO Dodge)
   -------------------------------------------------------------------------- */
function initDecisionButtons() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noMsg = document.getElementById('noCounterMsg');

  let noClickCount = 0;
  const cuteNoTexts = [
    "Doraemon locked the NO button! 🔒",
    "Are you sure? Doraemon is crying 🥺",
    "Think of dorayaki and hugs! 🍩",
    "Clicking NO is prohibited by love law! ⚖️❤️",
    "Pretty please forgive me? 🥺👉👈",
    "Doraemon says YES is the only valid answer!"
  ];

  // Moving NO button away on hover or touch
  const moveNoBtn = () => {
    noClickCount++;
    const container = document.getElementById('decisionButtons');
    const containerRect = container.getBoundingClientRect();
    
    // Pick random position within box
    const randomX = (Math.random() - 0.5) * (containerRect.width - 120);
    const randomY = (Math.random() - 0.5) * 100;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    noMsg.textContent = cuteNoTexts[noClickCount % cuteNoTexts.length];
  };

  noBtn.addEventListener('mouseenter', moveNoBtn);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoBtn();
  });

  yesBtn.addEventListener('click', () => {
    triggerConfetti(1.0);
    showModal(
      '👑',
      'THANK YOU MY PRINCESS! 🎉❤️',
      'You just made me the happiest person in the universe! I promise to give you lots of hugs, treats, and love today! Doraemon and I are celebrating!'
    );
  });
}

/* --------------------------------------------------------------------------
   6. Modal Dialog System & Confetti Effect
   -------------------------------------------------------------------------- */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const actionBtn = document.getElementById('modalActionBtn');

  const closeModal = () => overlay.classList.remove('active');

  closeBtn.addEventListener('click', closeModal);
  actionBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function showModal(icon, title, body) {
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modalOverlay').classList.add('active');
}

function triggerConfetti(intensity = 0.5) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: Math.floor(100 * intensity),
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#3a9bdc', '#ffd166', '#ff477e']
    });
  }
}
