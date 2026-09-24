/* ═══════════════════════════════════════════════════════════════════
   BIRTHDAY TRIBUTE — Dr. Ratnakiriti Roy Sir
   script.js  |  Cinematic Orchestration & Web Audio Synthesizer
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── STATE ─────────────────────────────────────────────────────── */
let musicPlaying = false;
let wishMade = false;
let cakeConfettiInterval = null;
let finalConfettiInterval = null;
let audioCtx = null;
let synthInterval = null;

/* ─── DEFAULT STUDENT MESSAGES ──────────────────────────────────── */
const DEFAULT_MESSAGES = [
  { name: 'A Student',         text: 'Thank you for always encouraging us to do better, Sir.' },
  { name: 'Your Department',   text: 'Your guidance has made our academic journey more meaningful and purposeful.' },
  { name: 'Grateful Students', text: 'We are grateful for your patience, support, and leadership throughout the years.' },
  { name: 'Batch 2024',        text: 'May this birthday bring you happiness, success, and many wonderful memories.' },
  { name: 'A Well-Wisher',     text: 'Your belief in each of us has made us believe in ourselves. Thank you, Sir.' },
  { name: 'Your Students',     text: 'Every lesson, every word of encouragement — we carry it forward. Happy Birthday!' },
];

/* ═══════════════════════════════════════════════════════════════════
   ON DOM READY
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initIntroStars();
  startSlowIntroSequence();
  initParticleCanvas();
  initMusicBtn();
  initScrollReveal();
  initLetterReveal();
  initScrollProgress();
});

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — SLOW CINEMATIC INTRO SEQUENCE
   ═══════════════════════════════════════════════════════════════════ */
function initIntroStars() {
  const container = document.getElementById('introStars');
  if (!container) return;
  for (let i = 0; i < 90; i++) {
    const star = document.createElement('div');
    star.className = 'intro-star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur:   ${3.5 + Math.random() * 4}s;
      --delay: ${Math.random() * 5}s;
      width:   ${Math.random() > 0.85 ? 3 : 2}px;
      height:  ${Math.random() > 0.85 ? 3 : 2}px;
    `;
    container.appendChild(star);
  }
}

/** Slow, majestic reveals */
function startSlowIntroSequence() {
  const el = id => document.getElementById(id);

  // Line 1  — 1.0s
  setTimeout(() => el('introLine1')?.classList.add('visible'), 1000);
  // Line 2  — 3.2s
  setTimeout(() => el('introLine2')?.classList.add('visible'), 3200);
  // Name    — 5.8s
  setTimeout(() => el('introName')?.classList.add('visible'), 5800);
  // Wish    — 7.8s
  setTimeout(() => el('introWish')?.classList.add('visible'), 7800);
  // Button  — 9.5s
  setTimeout(() => el('enterBtn')?.classList.add('visible'), 9500);
}

/** Called when "Enter the Celebration" is clicked */
function enterCelebration() {
  const introScreen = document.getElementById('intro-screen');
  const mainWebsite = document.getElementById('mainWebsite');

  introScreen.classList.remove('active');

  // Slow smooth crossfade
  setTimeout(() => {
    mainWebsite.classList.remove('main-hidden');
    mainWebsite.classList.add('main-revealed');

    // Trigger hero reveal
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-enter').forEach(el => el.classList.add('revealed'));
    }, 300);

    triggerScrollReveal();
  }, 900);
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES CANVAS (Calm, Serene, Gentle)
   ═══════════════════════════════════════════════════════════════════ */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) particles.push(createParticle(W, H));

  function createParticle(w, h) {
    return {
      x:     Math.random() * w,
      y:     Math.random() * h,
      r:     0.6 + Math.random() * 1.4,
      alpha: 0.15 + Math.random() * 0.45,
      vx:    (Math.random() - 0.5) * 0.18,
      vy:    -0.12 - Math.random() * 0.22,
      gold:  Math.random() > 0.45,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) {
        particles[i] = createParticle(W, H);
        particles[i].y = H + 10;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(229,193,88,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.65})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* ═══════════════════════════════════════════════════════════════════
   TOP SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const progress = (window.scrollY / totalScroll) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — BIRTHDAY CAKE & WISH
   ═══════════════════════════════════════════════════════════════════ */
function makeWish() {
  if (wishMade) return;
  wishMade = true;

  playMagicChimeSound();

  // 1. Slow, staggered candle blowout with smoke
  const flames = document.querySelectorAll('.candle-flame');
  flames.forEach((flame, i) => {
    setTimeout(() => {
      flame.classList.add('blown');
      const smoke = document.getElementById(`smoke${i}`);
      if (smoke) {
        smoke.style.display = 'block';
        setTimeout(() => { smoke.style.display = 'none'; }, 1400);
      }
    }, i * 220);
  });

  // Automatically start birthday music when candles blow out!
  setTimeout(() => {
    if (!musicPlaying) {
      startMusic();
      const musicBtn = document.getElementById('musicBtn');
      if (musicBtn) {
        musicBtn.innerHTML = '🔊 <span class="music-label">Music On</span>';
      }
      musicPlaying = true;
    }
  }, 900);

  // 2. Gentle dim
  const cakeSection = document.getElementById('cake-section');
  if (cakeSection) {
    cakeSection.style.transition = 'background 1.5s ease';
    cakeSection.style.background = 'rgba(0,0,0,0.35)';
    setTimeout(() => { cakeSection.style.background = ''; }, 2500);
  }

  // 3. Hide wish button
  setTimeout(() => {
    document.getElementById('wishArea')?.classList.add('hidden');
  }, 1000);

  // 4. Golden aura expansion
  setTimeout(() => {
    document.getElementById('cakeContainer')?.classList.add('wish-made');
  }, 1200);

  // 5. Launch graceful slow-falling confetti
  setTimeout(() => {
    launchCakeConfetti();
  }, 1400);

  // 6. Reveal wish text
  setTimeout(() => {
    document.getElementById('wishMessage')?.classList.add('revealed-msg');
  }, 2200);

  // 7. Stop cake confetti after 7s
  setTimeout(() => stopCakeConfetti(), 7500);
}

/* ─── Gentle Cake Confetti ───────────────────────────────────────── */
function launchCakeConfetti() {
  const canvas = document.getElementById('cakeConfettiCanvas');
  if (!canvas) return;
  canvas.classList.add('active');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const COLORS = ['#e5c158', '#fde047', '#ffffff', '#60a5fa', '#93c5fd', '#f97316', '#fef08a'];

  for (let i = 0; i < 110; i++) {
    pieces.push({
      x:   Math.random() * canvas.width,
      y:   -20 - Math.random() * 200,
      w:   6 + Math.random() * 6,
      h:   3 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.06,
      vy:  1.2 + Math.random() * 2.0, // Slow gentle fall
      vx:  (Math.random() - 0.5) * 1.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.9,
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y   += p.vy;
      p.x   += p.vx;
      p.rot += p.drot;

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    cakeConfettiInterval = requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

function stopCakeConfetti() {
  if (cakeConfettiInterval) {
    cancelAnimationFrame(cakeConfettiInterval);
    cakeConfettiInterval = null;
  }
  const canvas = document.getElementById('cakeConfettiCanvas');
  if (canvas) {
    canvas.classList.remove('active');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — MESSAGES WALL
   ═══════════════════════════════════════════════════════════════════ */
function loadMessages() {
  try {
    const stored = localStorage.getItem('hod_birthday_messages');
    if (stored) {
      const parsed = JSON.parse(stored);
      const userAdded = parsed.filter(m => m.userAdded);
      return [...DEFAULT_MESSAGES, ...userAdded];
    }
  } catch (e) {}
  return [...DEFAULT_MESSAGES];
}

function renderMessages() {
  const wall = document.getElementById('messagesWall');
  if (!wall) return;

  const messages = loadMessages();
  wall.innerHTML = '';

  messages.forEach((msg, i) => {
    const card = document.createElement('div');
    card.className = 'msg-card scroll-reveal';
    card.style.setProperty('--card-delay', `${i * 0.12}s`);
    card.innerHTML = `
      <p class="msg-text">${escHtml(msg.text)}</p>
      <p class="msg-author">${escHtml(msg.name)}</p>
    `;
    wall.appendChild(card);
  });

  initScrollReveal();
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL & LETTER REVEAL
   ═══════════════════════════════════════════════════════════════════ */
let scrollObserver = null;

function initScrollReveal() {
  if (scrollObserver) {
    document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
      scrollObserver.observe(el);
    });
    return;
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
}

function triggerScrollReveal() {
  setTimeout(initScrollReveal, 150);
}

function initLetterReveal() {
  const lines = document.querySelectorAll('.letter-line');
  if (!lines.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lineIndex = parseInt(entry.target.dataset.line || '0');
        setTimeout(() => {
          entry.target.classList.add('line-visible');
        }, lineIndex * 350);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  lines.forEach(line => observer.observe(line));
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9 — FINAL SURPRISE
   ═══════════════════════════════════════════════════════════════════ */
function triggerFinalSurprise() {
  const overlay = document.getElementById('finalSurpriseOverlay');
  if (!overlay) return;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Play magical celebratory fanfare
  playFanfareSound();

  // Launch balloons slowly
  setTimeout(launchBalloons, 400);

  // Launch slow finale confetti
  setTimeout(launchFinalConfetti, 600);
}

function closeFinalSurprise() {
  const overlay = document.getElementById('finalSurpriseOverlay');
  overlay?.classList.remove('active');
  document.body.style.overflow = '';

  if (finalConfettiInterval) {
    cancelAnimationFrame(finalConfettiInterval);
    finalConfettiInterval = null;
  }
}

const BALLOON_COLORS = ['#e5c158', '#3b82f6', '#f43f5e', '#10b981', '#a855f7', '#fde047'];

function launchBalloons() {
  const container = document.getElementById('balloonsContainer');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 18; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const left  = 8 + Math.random() * 84;
    const dur   = 8 + Math.random() * 5; // slow float
    const delay = Math.random() * 4;
    const sway  = (Math.random() - 0.5) * 50;

    balloon.style.cssText = `
      left: ${left}%;
      background: ${color};
      --dur:   ${dur}s;
      --delay: ${delay}s;
      --sway:  ${sway}px;
    `;
    container.appendChild(balloon);
  }
}

function launchFinalConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#e5c158', '#fde047', '#ffffff', '#60a5fa', '#a78bfa', '#fb7185', '#fef08a'];
  const pieces = [];

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x:    Math.random() * canvas.width,
      y:    -20 - Math.random() * 300,
      w:    6 + Math.random() * 8,
      h:    3 + Math.random() * 5,
      rot:  Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.08,
      vy:   1.2 + Math.random() * 2.2, // slow fall
      vx:   (Math.random() - 0.5) * 1.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.75 ? 'circle' : 'rect',
    });
  }

  function drawFinalFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y   += p.vy;
      p.x   += p.vx;
      p.rot += p.drot;

      if (p.y > canvas.height + 20) {
        p.y  = -20;
        p.x  = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });
    finalConfettiInterval = requestAnimationFrame(drawFinalFrame);
  }
  drawFinalFrame();
}

/* ═══════════════════════════════════════════════════════════════════
   MUSIC ENGINE (MP3 + Procedural Web Audio API Synthesizer)
   ═══════════════════════════════════════════════════════════════════ */
function initMusicBtn() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (musicPlaying) {
      stopMusic();
      btn.innerHTML = '🔇 <span class="music-label">Music Off</span>';
      musicPlaying = false;
    } else {
      startMusic();
      btn.innerHTML = '🔊 <span class="music-label">Music On</span>';
      musicPlaying = true;
    }
  });
}

function startMusic() {
  const audio = document.getElementById('bgMusic');
  if (audio) {
    audio.volume = 0.85;
    audio.play().then(() => {
      // Audio element is playing the traditional Happy Birthday track
      return;
    }).catch(err => {
      console.log('Audio element blocked or failed, falling back to Web Audio Synth:', err);
      startWebAudioSynth();
    });
  } else {
    startWebAudioSynth();
  }
}

function stopMusic() {
  const audio = document.getElementById('bgMusic');
  if (audio) {
    audio.pause();
  }
  stopWebAudioSynth();
}

/* ─── Procedural Harmonic Chime & Piano Synthesizer ─────────────── */
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle, beautiful celebratory melody notes (Happy Birthday ambient arpeggios)
const MELODY = [
  { note: 'G4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 }, { note: 'G4', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'B4', dur: 1.4 },
  { note: 'G4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 }, { note: 'G4', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 1.4 },
  { note: 'G4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'G5', dur: 0.8 }, { note: 'E5', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'B4', dur: 0.8 }, { note: 'A4', dur: 1.2 },
  { note: 'F5', dur: 0.4 }, { note: 'F5', dur: 0.4 }, { note: 'E5', dur: 0.8 }, { note: 'C5', dur: 0.8 }, { note: 'D5', dur: 0.8 }, { note: 'C5', dur: 1.6 }
];

const NOTE_FREQS = {
  'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
  'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
};

let melodyIndex = 0;

function startWebAudioSynth() {
  stopWebAudioSynth();
  const ctx = getAudioContext();
  melodyIndex = 0;

  function step() {
    if (!musicPlaying) return;
    const item = MELODY[melodyIndex];
    playSynthNote(NOTE_FREQS[item.note], item.dur);
    melodyIndex = (melodyIndex + 1) % MELODY.length;
    synthInterval = setTimeout(step, item.dur * 850);
  }
  step();
}

function stopWebAudioSynth() {
  if (synthInterval) {
    clearTimeout(synthInterval);
    synthInterval = null;
  }
}

function playSynthNote(freq, duration) {
  if (!freq) return;
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Primary warm oscillator (sine)
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Harmonic shimmer overtone
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // Soft gentle envelope
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.6);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + duration * 1.7);
  osc2.stop(now + duration * 1.7);
}

function playMagicChimeSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  chimeNotes.forEach((freq, idx) => {
    setTimeout(() => {
      playSynthNote(freq, 0.8);
    }, idx * 120);
  });
}

function playFanfareSound() {
  const ctx = getAudioContext();
  const fanfareNotes = [392.00, 523.25, 659.25, 783.99];
  fanfareNotes.forEach((freq, idx) => {
    setTimeout(() => {
      playSynthNote(freq, 1.2);
    }, idx * 180);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════════════ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.addEventListener('resize', () => {
  const cc = document.getElementById('cakeConfettiCanvas');
  if (cc) { cc.width = window.innerWidth; cc.height = window.innerHeight; }
  const fc = document.getElementById('confettiCanvas');
  if (fc) { fc.width = window.innerWidth; fc.height = window.innerHeight; }
});
