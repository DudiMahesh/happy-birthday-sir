# 🎂 Birthday Tribute — Dr. Ratnakiriti Roy Sir

> A premium, interactive, emotional birthday tribute website created with respect and gratitude by his students.

---

## ✨ What's Inside

| Section | Description |
|---|---|
| 🎬 Cinematic Intro | Full-screen animated opening sequence |
| 🏛️ Hero Section | Premium academic hero with animated name |
| 🎂 Birthday Cake | Interactive CSS cake with blow-out candles & confetti |
| 🎓 About HOD | Glassmorphism tribute card |
| 💎 Appreciation Cards | 5 animated cards with hover effects |
| 💌 Messages Wall | Student messages with localStorage persistence |
| 📸 Photo Gallery | Gallery section (replace placeholders with real photos) |
| ❤️ Special Letter | Cinematic letter with line-by-line reveal |
| 🎁 Final Surprise | Full-screen celebration with confetti + balloons |
| 🔊 Music | Optional background audio toggle |

---

## 🚀 How to Run Locally

1. Download or clone this project.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. **No server needed** — everything works offline.

```
hod-birthday/
├── index.html          ← Open this file
├── style.css
├── script.js
└── assets/
    ├── images/         ← Add your photos here
    └── birthday-music.mp3  ← Add your MP3 here
```

> **Tip:** If you see CORS issues with images in Chrome, either run a local server or use Edge/Firefox for direct file:// access.

---

## 📸 How to Add Photographs

1. Copy your `.jpg`, `.png`, or `.webp` photo files into:
   ```
   hod-birthday/assets/images/
   ```

2. Open `script.js` and find the `galleryPhotos` array near the top:
   ```js
   const galleryPhotos = [
     { usePlaceholder: true, src: '', caption: '...', icon: '🎓', hint: '...' },
     ...
   ];
   ```

3. For each photo you want to replace, change it like this:
   ```js
   { usePlaceholder: false, src: 'assets/images/your-photo.jpg', caption: 'Department Event 2024' },
   ```

4. Save `script.js` and refresh `index.html`.

---

## 🎵 How to Add Birthday Music

1. Find a **royalty-free** birthday/instrumental MP3 from:
   - [Pixabay Music](https://pixabay.com/music/search/birthday/)
   - [Free Music Archive](https://freemusicarchive.org)
   - [Incompetech](https://incompetech.com)

2. Rename your file to `birthday-music.mp3` and place it at:
   ```
   hod-birthday/assets/birthday-music.mp3
   ```

3. The **🔊 Music** button (top-right corner) will now work.

> Music will **never autoplay** — it only plays when the button is clicked, respecting browser policies.

---

## 💌 How to Edit Student Messages

Open `script.js` and find the `DEFAULT_MESSAGES` array:

```js
const DEFAULT_MESSAGES = [
  { name: 'A Student',  text: 'Thank you for always encouraging us...' },
  ...
];
```

Add, edit, or remove entries as needed. Student-submitted messages are saved automatically to `localStorage`.

---

## 🌐 How to Deploy on GitHub + Vercel

### Step 1 — Upload to GitHub

```bash
git init
git add .
git commit -m "Birthday tribute for Dr. Ratnakiriti Roy Sir"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hod-birthday.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New Project"**.
3. Import your `hod-birthday` repository.
4. Leave all settings as default — Vercel will detect it as a static site.
5. Click **Deploy** ✅

Your website will be live at: `https://hod-birthday.vercel.app` (or similar)

> **Note:** localStorage messages will be per-browser. For a shared message board, you would need a backend (Firebase, Supabase, etc.).

---

## 🎨 Design Theme

| Element | Value |
|---|---|
| Background | Deep Navy `#04071a` |
| Accent | Elegant Gold `#c9a84c` |
| Typography | Playfair Display + Cormorant Garamond + Inter |
| Effects | Glassmorphism cards, particle canvas, CSS animations |
| Approach | Academic, premium, emotional — not a generic template |

---

## 📱 Responsive

Tested for:
- ✅ Desktop (1920px+)
- ✅ Laptop (1280px)
- ✅ Tablet (768px)
- ✅ Mobile — Android & iPhone (375px+)

---

## ❤️ Credits

Made with Respect & Gratitude by the Students of Dr. Ratnakiriti Roy Sir.
