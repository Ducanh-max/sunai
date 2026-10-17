# SUNAI — Learn Smarter. Speak Brighter.

SUNAI is an AI-powered English learning platform designed to make daily practice clear, interactive, and motivating.

## Product direction
- Guided English learning paths from beginner to advanced.
- Short interactive lessons and Duolingo-inspired practice activities.
- Progress tracking, XP, streaks, and learning goals.
- AI Tutor for explanations and conversation practice.
- Speaking and writing practice with feedback.

## Current milestone
The frontend foundation now includes a responsive learner dashboard, a searchable course catalogue covering CEFR levels A1–C2, and an interactive lesson player with vocabulary cards, example conversations, multiple-choice practice, answer explanations, and a completion score. Course and learner statistics are currently sample content; AI services, authentication, and persistent progress are not connected yet.

## Stack
- Next.js App Router
- React + TypeScript
- Plain CSS design system (keeps the first milestone lightweight)
- Planned: Supabase for authentication and data; an AI provider for tutor features.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Current routes
- `/` — learner dashboard.
- `/courses` — course catalogue with CEFR level, keyword, and skill filters.
- `/lesson/a1-greetings` — sample interactive lesson.
- `/lesson/a1-daily-life`, `/lesson/a2-travel`, `/lesson/a2-grammar`, `/lesson/b1-conversation`, `/lesson/b1-reading`, `/lesson/b2-academic`, `/lesson/b2-listening`, `/lesson/c1-fluency`, `/lesson/c2-mastery` — level-specific lesson examples.

## Roadmap
1. Product foundation and responsive UI. (In progress)
2. Authentication and learner profiles.
3. Expand structured course content and assessments.
4. AI Tutor, speaking practice, and writing feedback.
5. Progress persistence, testing, accessibility, and deployment.

## Brand
SUNAI combines “Sun” (light, energy, growth) with “AI” (artificial intelligence).
Slogan: **Learn Smarter. Speak Brighter.**
