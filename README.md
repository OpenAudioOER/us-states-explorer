# 🗺️ 5th-Grade US States Explorer

A colorful, encouraging, and interactive geography web application built with Next.js, React, Tailwind CSS, and Framer Motion to help 5th graders master US state shapes, spelling, and locations.

---

## 🌟 Included Unit 1 States (23 Total)

- **New England:** Maine (ME), New Hampshire (NH), Vermont (VT), Massachusetts (MA), Rhode Island (RI), Connecticut (CT)
- **Mid-Atlantic:** New York (NY), New Jersey (NJ), Pennsylvania (PA), Delaware (DE), Maryland (MD)
- **Southeast & Appalachia:** Virginia (VA), West Virginia (WV), Kentucky (KY), Tennessee (TN), North Carolina (NC), South Carolina (SC), Georgia (GA), Florida (FL), Alabama (AL), Mississippi (MS), Louisiana (LA), Arkansas (AR)

---

## 🎮 Features & Practice Modes

1. **🧩 Shape Detective:** Identifies state silhouettes with visual hints (region, starting letter) and immediate feedback.
2. **🔤 Spelling Bee:** Dedicated letter slots with cursor auto-advance, backspacing, and color-coded verification.
3. **🗺️ Map Explorer:** Interactive US map quiz with target state highlight animations and multi-choice or click-on-map selection.
4. **🎉 Gamification:** Score counter, streak multipliers, and confetti explosions on correct answers.

---

## 🚀 How to Run Locally

1. Open your terminal in this directory:
   ```bash
   cd /Users/brian/.gemini/antigravity/scratch/us-states-explorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚡ How to Deploy to Vercel via GitHub

1. **Create a GitHub Repository:**
   - Go to [github.com/new](https://github.com/new) and create a repository named `us-states-explorer`.

2. **Push Code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - 5th Grade US States Explorer"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/us-states-explorer.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Log in to your [Vercel Dashboard](https://vercel.com).
   - Click **"Add New..." -> "Project"**.
   - Import your `us-states-explorer` GitHub repository.
   - Click **"Deploy"**. Vercel will automatically build and publish your app with a free live URL!
