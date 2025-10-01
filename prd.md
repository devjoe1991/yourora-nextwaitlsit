# Miha - Product Requirements Document (Enhanced)

---

## 1. Vision & Principles

**Vision:**  
Build the social layer of everyday effort. Miha turns each workout or positive habit into a proud, judgment-free daily post that fuels accountability via streaks and community.

**Product Principles:**
- **Effort > Aesthetics:** We reward showing up, not perfection. A quick selfie after a walk or a screenshot of a finished workout is more valuable than a heavily edited gym photo.  
- **Kind Accountability:** Our community thrives on friendly nudges and genuine support. We're a cheer squad, not a competition.  
- **Daily Ritual:** The core loop is designed to be completed in less than 30 seconds. It's about a quick, satisfying check-in that fits seamlessly into your day.  
- **Privacy-First:** Users have granular control over who sees their posts and personal information. We respect and protect their data.  
- **Zero Friction:** The posting flow is a one-tap process—camera → post → streak—making it incredibly simple to maintain consistency.  

---

## 2. The Problem & The Power of Social Proof

**The Problem:**  
The fitness journey is often a lonely one. Motivation wanes, and without a reliable support system, even the best intentions can fail. Many social platforms focus on aspirational, "finish-line" content, which can feel intimidating and discouraging for people just starting out. There's no dedicated space to share and celebrate the small, daily acts of effort that truly build a consistent habit.

**The Solution:**  
Miha is a streak-driven, fitness-first social app that leverages the power of social accountability and social proof to keep users engaged and consistent. By posting daily proof of effort, users not only track their personal progress but also contribute to a collective environment of positive action.  

Each user's post, no matter how small, serves as a ripple effect—a **"butterfly effect" of motivation**—inspiring their followers and the wider community to show up and keep their own streaks alive.  

---

## 3. Target Users & Their Needs

**Target Users:**  
Our core audience is the "everyday mover" and the "status tracker"—individuals who find satisfaction in tracking their progress and celebrating small wins.

- **Everyday Movers:** Simple daily activities like walks, home workouts, or yoga. Motivated by consistency over intensity.  
- **Lifestyle Changers:** Weight-loss or habit-building journeys, needing a supportive, non-judgmental community.  
- **Beginner to Intermediate Gym-Goers:** Building a habit, wanting to share progress without pressure.  
- **Status Trackers (critical segment):** Love streaks, badges, progress bars. Motivated by visual representation of effort and fear of breaking streaks. Highly responsive to positive reinforcement and visual feedback.  

**Jobs To Be Done (JTBD):**
1. When I finish a workout, I want to quickly log proof and keep my streak so I can stay consistent.  
2. When my motivation dips, I want supportive nudges and accountability from my friends so I don’t fall off.  
3. When I'm curious, I want to see others’ daily efforts to feel part of a collective journey.  

---

## 4. Core Use Cases & Ethos

- **Daily Check-in:** Capture/upload a photo, video, or screenshot → optional caption → post. Foundation of streaks.  
- **Streak Tracking:** Proprietary streak system with grace windows and "streak insurance." Visual/gamified pride + motivation.  
- **Friend Feed:** Daily posts from friends with emoji reactions and short comments. Accountability through encouragement.  
- **Explore Feed:** Discover wider community effort. Filter by activity/streak length. Showcases ripple effect of collective consistency.  

**Non-goals (MVP):**  
- Long-form content  
- Advanced analytics dashboards  
- Direct messaging  
- Heavy comment threads  

---

## 5. Feature Set

### 5.1 MVP (Phase 1)

- **Auth & Profiles:**  
  Email + OAuth sign-up. Profile: username, display name, avatar, bio, privacy (Public / Friends-only).  

- **Posting Flow:**  
  One-tap camera or upload. Support 10–60s videos + images (compressed). Optional 140-char captions.  

- **Streaks:**  
  - Logic: 24h window (local timezone).  
  - Grace Period: e.g. +4h extension.  
  - Streak Insurance: 1 manual save / 30 days.  
  - Milestones: 7, 30, 90 days → badges + celebratory emails.  

- **Feeds:**  
  - **Friends Feed:** Real-time posts from followed users.  
  - **Explore Feed:** Ranked by freshness, streak length, and engagement.  

- **Reactions & Comments:**  
  Emoji reactions (🔥 👏 💪 🙌) + short comments (≤120 chars).  

- **Notifications:**  
  - Daily reminder (push/email).  
  - Social nudges (friend milestones, reactions).  
  - Streak-at-risk banner/email.  

- **Privacy & Safety:**  
  Report/hide posts, block users, strong privacy controls.  

---

### 5.2 Phase 2

- **Integrations:** Apple Health, Strava, Garmin → auto-attach workout summaries.  
- **Groups & Challenges:** Public/private groups, challenges, leaderboards.  
- **Gamification:** Advanced badges + seasonal events.  
- **Premium:** Unlimited streak insurance, custom reminders, advanced insights.  

---

### 5.3 Phase 3

- **Partnerships:** Sponsored challenges, gym/brand partnerships.  
- **Scaling:** Advanced discovery + creator tools.  

---

## 6. Success Metrics (OKRs)

- **Activation:** ≥70% first post within 24h of sign-up.  
- **Engagement:** DAU/WAU ≥45%. Median time-to-post <30s.  
- **Streak Health:** Day-7 retention ≥40%, Day-30 ≥20%.  
- **Social:** ≥3 reactions/post, ≥30% users with ≥5 friends.  
- **Virality:** K-factor ≥0.2, invite → signup CVR ≥20%.  
- **Monetization (post-MVP):** 3–5% free-to-premium conversion.  

---

## 7. Experience Requirements & Acceptance Criteria

### 7.1 Create Post
- Authenticated user can post in ≤2 taps.  
- Streak counter updates immediately.  
- Feed refreshes in real time.  

### 7.2 Streak Logic
- Streak increments with ≥1 post / 24h.  
- Grace period clearly shown with countdown.  
- At-risk streak triggers banner + email.  
- Insurance redeemable within 24h of break (max 1 / 30 days).  

### 7.3 Reactions
- Real-time reaction count updates.  
- Tapping again toggles off reaction.  
- Optional push/email for milestone reactions.  

### 7.4 Explore Ranking (MVP)
- Algorithm = Freshness + Streak Length + Reaction Velocity.  
- Ensures visibility for new and consistent users.  

---

## 8. Information Architecture & Data Model

**Users:**  
`id, username, display_name, email, password, bio, avatar_url, timezone, privacy_setting (Public | Friends-only)`

**Posts:**  
`id, user_id, media_url, caption, created_at, visibility, streak_day`

**Streaks:**  
`user_id (PK), current_streak, longest_streak, last_posted_at, insurance_redeemed_at`

**Follows:**  
`follower_id, following_id`

**Reactions:**  
`post_id, user_id, emoji_type`

**Comments:**  
`id, post_id, user_id, text, created_at`

**Notifications:**  
`id, user_id, type, message, is_read`

---