# 👋 Djordje Simovic — Portfolio

A playful, fast, and responsive personal portfolio built to showcase my frontend work and engineering approach. The goal of this project is not just design — but clean structure, accessibility, and performance.

🔗 Live: https://djordjesimovic.dev

---

## 🚀 Tech Stack

- React
- TypeScript
- Vite
- Styled-components
- FontAwesome
- React Fast Marquee

> Open-source libraries that make this project possible. Thanks to their creators!

---

## ✨ Highlights

- Fully responsive layout
- Custom CV download logic (desktop download vs mobile open)
- Accessibility-focused structure
- Optimized asset loading
- Modular component architecture
- Animated SVG signature

---

## 🧠 Architecture Philosophy

This portfolio is structured as a reusable, scalable React project rather than a one-off static site.

- Components are small and composable
- Layout sections are isolated and easy to extend
- Assets are optimized for performance
- Utilities handle device-specific logic
- Structure is designed for future growth

---

## 📁 Project Structure

```bash
src/
├── assets/      # Static files (images, logos, CV)
├── screens/     # App screens / routes
├── sections/    # Page sections used inside screens
├── shared/      # Reusable global components
├── router/      # App routing configuration
├── contexts/    # Global React context
├── styles/      # Theme + global styles
├── utils/       # Helper utilities
├── test/        # Test setup and helpers
```

---

## ✅ Test Coverage

All critical components and utilities are tested. Current coverage:

| Metric     | % Covered |
| ---------- | --------- |
| Statements | 96.8%     |
| Branches   | 84.3%     |
| Functions  | 96.4%     |
| Lines      | 97.9%     |

> Coverage generated with Vitest + V8

---

## 🛠 Getting Started

Requires Node 18+

```bash
npm install
npm run dev
```

## 🔮 Future Improvements

- Reusability layer (easier content swapping)
