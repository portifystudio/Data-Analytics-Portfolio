# Antigravity Data Analytics Portfolio - Koushik Reddy

A premium, medium-level data analytics portfolio featuring a dark cosmic aesthetic, glassmorphic cards, a Canvas-based gravity particle system, and orbiting skill systems. Optimized for performance, readability, and modern Web standards.

---

## 🌟 Features

* **Cosmic Drift Background**: Custom HTML5 Canvas engine generating slow floating star particles that gravitationally drift toward the user's cursor.
* **Frosted Glassmorphism**: Frosted layouts (`backdrop-filter`) with glowing border neon highlights (electric blue + violet).
* **Interactive Skill Orbits**: 2D orbital gravity engine containing core tool classifications (Languages, Libraries, Utilities) rotating continuously, pausing, and scaling on mouse hover.
* **Production-Ready SEO**: Custom meta-tags, descriptions, keyword indexing, and Open Graph config for rich social share previews.
* **Mobile Responsive**: Scaled CSS Grid and Flexbox layouts optimized with media break-points for mobile, tablet, and high-DPI desktop viewports.

---

## 🛠️ Tech Stack

* **Structure**: Semantic HTML5 markup
* **Styling**: Vanilla CSS3 Custom Variables, Grids, and Transitions
* **Logic/Interactions**: Custom Vanilla JavaScript (ES6)
* **Icons**: FontAwesome Web Kit CDN
* **Typography**: Google Fonts Outfit (Weights: 100, 300, 400, 600)

---

## 📁 Folder Structure

```text
.
├── assets/                  # Portait, background, and dashboard previews
│   ├── cosmic_bg.png
│   ├── profile_avatar.png
│   ├── project_sales.png
│   ├── project_churn.png
│   └── project_marketing.png
├── css/                     # Styling stylesheets
│   └── style.css
├── js/                      # Main script behaviors
│   └── app.js
├── index.html               # Main website template
├── .gitignore               # Ignored track files
└── README.md                # Technical documentation
```

---

## 🚀 Local Installation

Since this is a static frontend project, no building compilers or npm setups are required. 

1. **Clone the repository**:
   ```bash
   git clone https://github.com/portifystudio/data-analytics-portfolio.git
   cd data-analytics-portfolio
   ```

2. **Open the project**:
   - Simply open `index.html` in any web browser.
   - Alternatively, serve it via local server modules:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (Live Server)
     npx live-server
     ```

---

## 🌐 Vercel Deployment

Deploying the static portfolio to Vercel is free and takes less than a minute.

### Option A: Deployment via Vercel CLI (Fastest)

1. Open your terminal in the root of the project.
2. Install Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```
3. Run the deployment command:
   ```bash
   vercel
   ```
4. Follow the command prompts (Link to project, choose defaults). Once completed, Vercel will output a live production preview URL.

### Option B: Deployment via GitHub & Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   - Create a new repository on GitHub.
   - Commit and push your local files:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Antigravity Portfolio"
     git branch -M main
     git remote add origin YOUR_REPOSITORY_URL
     git push -u origin main
     ```
2. **Link to Vercel**:
   - Log in to the [Vercel Dashboard](https://vercel.com).
   - Click **Add New** > **Project**.
   - Import your cloned GitHub repository.
   - Leave the build settings blank (as it is a static project, Vercel automatically serves the root files).
   - Click **Deploy**. Vercel will automatically host the files and update the build every time you push changes to your `main` branch.

---

## 🔗 Social Channels

Stay connected with our developer community and explore more high-performance templates:

* **LinkedIn**: [Portify Studio](https://www.linkedin.com/company/portifystudio)
* **Instagram**: [@portifystudio](https://www.instagram.com/portifystudio)
* **GitHub**: [portifystudio](https://github.com/portifystudio)
* **YouTube**: [Portify Studio Channel](https://www.youtube.com/@PortifyStudio)
* **Twitter/X**: [@PortifyStudio](https://x.com/PortifyStudio)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
