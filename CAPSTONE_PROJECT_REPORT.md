# CAPSTONE PROJECT COMPREHENSIVE REPORT & PRESENTATION GUIDE

**Project Title:** Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement  
**Domain / Area:** Software Engineering and Web Technologies (DD04)  
**Nature of Work:** Web Application & Competency Intelligence System  
**Lead Developer:** Aryan Prasher  
**Target SDGs:** Quality Education (SDG 4), Decent Work and Economic Growth (SDG 8), Partnerships for the Goals (SDG 17)  
**Current Status:** Phase 1 (Multi-Role Authentication & Architecture) & Phase 2 (Skill Mapping & Gap Analysis Engine) Operational

---

## 1. Executive Summary & Problem Formulation

### 1.1 The Academia-Industry Gap
In modern higher education, academic institutions and industrial recruitment sectors operate in disparate silos. While universities deliver comprehensive theoretical curricula, industry demands dynamic, stack-specific practical proficiencies (e.g., containerization, modern JavaScript frameworks, cloud services, and algorithmic problem-solving).

This disconnection causes:
1. **Severe Skill Mismatches:** Students graduate with degrees but lack the precise skill configurations expected by companies for internship and entry-level engineering roles.
2. **Fragmented, Manual Processes:** Training and Placement Officers (TPOs) manage campus drives through error-prone spreadsheets, manual email chains, and disconnected Google Forms.
3. **No Continuous Feedback Loop:** Colleges lack empirical, cohort-wide data indicating why their students fail specific recruitment screenings, preventing timely curriculum updates.

### 1.2 The Proposed Solution: SkillSync Portal
**SkillSync** is a unified collaboration portal that establishes a structured bridge between students, academic institutions, and industry recruiters:
- **For Students:** Provides an objective, real-time assessment of how well their skills match actual industry role requirements, pinpointing exact gaps and learning paths.
- **For Academia (TPOs):** Offers visibility into student readiness, campus placement pipelines, and cohort skill deficiencies.
- **For Industry Partners:** Enables companies to define role benchmarks, publish drives, and identify pre-screened talent filtered by compatibility scores.

---

## 2. System Architecture & Technology Stack

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT (React 19 + Vite)                          |
|  - Auth & Role System (Student / TPO / Recruiter)                                  |
|  - Skill Mapping Engine & Live Circular Progress Gauge                            |
|  - Interactive Competency Matrix & Gap Visualizer                                 |
|  - Bespoke Liquid Wave & Glassmorphism Design System                              |
+------------------------------------------+----------------------------------------+
                                           | HTTP / REST (JSON) + JWT Bearer Auth
                                           v
+-----------------------------------------------------------------------------------+
|                             SERVER (Express.js + Node.js)                         |
|  - Routes: /api/auth, /api/skills, /api/drives                                    |
|  - Controllers: AuthController, SkillController                                   |
|  - Middleware: JWT Token Authenticator, Role-Based Access Controller (RBAC)       |
|  - Computation Engine: Weighted Skill Match & Gap Detection Algorithm             |
+------------------------------------------+----------------------------------------+
                                           | Mongoose ODM / In-Memory Fallback
                                           v
+-----------------------------------------------------------------------------------+
|                                DATABASE (MongoDB)                                 |
|  - Collections: Users (Multi-Role Profiles), Skills, Benchmarks, Applications      |
+-----------------------------------------------------------------------------------+
```

### 2.1 Technology Stack Details
- **Frontend:**
  - **React 19 & React Router v7:** Modern component architecture, declarative client-side routing, and hooks-driven reactive state.
  - **Vite 6:** Ultra-fast bundling, HMR (Hot Module Replacement), and proxy configuration (`/api` &rarr; `http://localhost:5000`).
  - **Custom Vanilla CSS (No External Bloat):** Handcrafted design tokens, fluid gradients, liquid SVG waves, and micro-animations matching corporate design standards.
- **Backend:**
  - **Node.js & Express.js:** Fast, asynchronous REST API architecture.
  - **Bcrypt.js & JSON Web Tokens (JWT):** Cryptographically salted password hashing (10 rounds) and stateless 7-day bearer token authentication.
  - **Role-Based Access Control (RBAC):** Guarded endpoints enforcing authorization per role (`student`, `institution_tpo`, `industry_recruiter`).
- **Database & Resilience:**
  - **MongoDB & Mongoose:** Document schemas with automatic timestamps, uniqueness validation, and indexing.
  - **Graceful In-Memory Fallback:** Built-in dev store allowing seamless development and demo execution even without a remote MongoDB cluster configured.

---

## 3. The Skill-Mapping Engine & Mathematical Model (Phase 2 Core)

The core scientific innovation of this capstone is the **Weighted Skill Match & Gap Analysis Engine**.

### 3.1 Mathematical Formulation

Let a target industry benchmark role $R$ require $N$ distinct competencies:
$$R = \{ (r_j, w_j, p_j^{\text{req}}, m_j) \}_{j=1}^N$$
Where:
- $r_j$: Skill identifier (e.g., `react`, `nodejs`, `docker`)
- $w_j \in [1, 3]$: Skill weight based on industry demand (Core = 3, High = 2, Supporting = 1)
- $p_j^{\text{req}} \in \{1, 2, 3, 4\}$: Required proficiency level:
  $$\text{Beginner} = 1, \quad \text{Intermediate} = 2, \quad \text{Advanced} = 3, \quad \text{Expert} = 4$$
- $m_j \in \{\text{True}, \text{False}\}$: Mandatory indicator (True = Must-Have, False = Preferred)

Let a student profile possess a set of acquired skills $S$:
$$S = \{ (s_i, p_i^{\text{student}}) \}_{i=1}^K$$

#### Step 1: Proficiency Fulfillment Ratio ($PR_j$)
For each required skill $r_j$ in the benchmark:
$$PR_j = \begin{cases} 
\min\left(1.0, \; \frac{p_i^{\text{student}}}{p_j^{\text{req}}}\right) & \text{if } r_j \in S \\
0.0 & \text{if } r_j \notin S 
\end{cases}$$

#### Step 2: Total Match Percentage ($M$)
$$\text{Match Percentage } (M) = \text{round}\left( \frac{\sum_{j=1}^N w_j \cdot PR_j}{\sum_{j=1}^N w_j} \times 100 \right)$$

#### Step 3: Categorization & Gap Severity
- If $PR_j \ge 1.0$: Skill is **Proficient** (100% Contribution).
- If $0 < PR_j < 1.0$: Skill is **Partially Matched** (Contributes proportional points; flagged as *Upskilling Needed*).
- If $PR_j = 0.0$:
  - If $m_j = \text{True}$ &rarr; **Critical Gap** (Disqualifying weakness for technical screening).
  - If $m_j = \text{False}$ &rarr; **Recommended Gap** (Competitive enhancement).

#### Step 4: Readiness Classification
$$\text{Readiness Band} = \begin{cases} 
\text{Industry Ready (Top 10\%)} & M \ge 80\% \\
\text{Competitive Candidate} & 60\% \le M < 80\% \\
\text{Intermediate Alignment} & 40\% \le M < 60\% \\
\text{Early Skill Stage} & M < 40\%
\end{cases}$$

---

## 4. Multi-Stakeholder Role Workflows

| Stakeholder Role | Key Capabilities & Features |
| :--- | :--- |
| **🎓 Student / Scholar** | • Custom registration with degree, branch, and college name<br>• Add/manage verified skills across 6 technical categories<br>• Switch target benchmark roles to view real-time compatibility scores<br>• Inspect critical vs. recommended skill gaps<br>• Access targeted learning pathways (Coursera, DeepLearning.AI, LeetCode, etc.) |
| **🏛️ College / TPO** | • Institutional registration with college name and Placement Cell department<br>• Verification of student credentials and batch alignment<br>• Overview of institutional placement readiness and cohort-wide skill deficiencies |
| **💼 Industry Recruiter** | • Corporate registration with company name and recruiting domain<br>• Role benchmark review and candidate compatibility filtering |

---

## 5. Completed Implementation Summary

### Phase 1: Authentication & Role Architecture (Completed)
1. **Cleaned UI & Removed Prototype Demos:**
   - Purged the dual-screen showcase mode, side-by-side card gallery, and `/showcase` route.
   - Removed all mock autofill buttons (`⚡ Autofill demo credentials`), mock social auto-logins, and hardcoded demo users.
2. **Backend Auth API:**
   - `POST /api/auth/register`: Multi-role account creation with password hashing and JWT issuance.
   - `POST /api/auth/login`: Email or username login returning authenticated session and JWT bearer token.
   - `GET /api/auth/me`: Protected session endpoint verifying token signature.
3. **Frontend Multi-Role Register Card:**
   - Segmented interactive role selector (🎓 Student, 🏛️ College / TPO, 💼 Recruiter).
   - Dynamic form inputs adjusting for College/University Name, Department/Placement Cell, or Company Name.
4. **Session / Logout Dashboard Card:**
   - Active user avatar, role badge (`🏛️ Academic TPO`, `🎓 Student Scholar`, etc.), institution affiliation badge, active session duration counter, and direct navigation into Phase 2.

### Phase 2: Skill Mapping & Competency Alignment (Completed)
1. **Taxonomy & Industry Benchmarks Database:**
   - 34 standardized skills categorized into:
     - Frontend Development
     - Backend & APIs
     - Databases & Storage
     - Cloud & DevOps
     - Data Science & AI/ML
     - Core Computer Science & Soft Skills
   - 4 Industry Role Benchmarks:
     - **Full Stack MERN Developer** (₹35k-60k stipend, ₹8-16 LPA)
     - **AI / Machine Learning Engineer** (₹40k-75k stipend, ₹10-22 LPA)
     - **Cloud & DevOps Engineer** (₹35k-65k stipend, ₹9-18 LPA)
     - **Backend Systems Engineer** (₹35k-60k stipend, ₹8-17 LPA)
2. **Backend Calculation Endpoints:**
   - `GET /api/skills/taxonomy`: Full skills library.
   - `GET /api/skills/benchmarks`: Role requirements, weights, and average packages.
   - `POST /api/skills/analyze`: Computes match percentage, gap classification, and learning courses for any skill set.
   - `GET /api/skills/my-profile` & `PUT /api/skills/my-profile`: Live user skill profile storage and database synchronization.
3. **Frontend Skill Mapping Dashboard (`/skills`):**
   - **Hero Metric Banner:** Dynamic SVG circular ring gauge calculating and animating real-time compatibility percentage ($M\%$).
   - **Interactive Role Switcher:** One-click toggling between target roles, instantly re-evaluating the student's profile.
   - **My Skill Profile Manager:** Interactive skill chips, level selectors (`Beg`, `Int`, `Adv`, `Exp`), category filters, and an "+ Add Skill" modal with taxonomy autocomplete.
   - **Alignment & Gap Matrix:**
     - Emerald Matched Competencies list with percentage contributions.
     - Rose/Amber Skill Gaps flagged as Critical or Recommended.
     - Curated Learning Pathways with direct resource recommendations.

---

## 6. How to Run, Demonstrate, and Present This Project

### 6.1 Running the Project Locally

```powershell
# In the project root (d:\Capstone):
# 1. Install dependencies (if not already installed)
npm install

# 2. Run both Client (Port 5173) and Server (Port 5000) simultaneously:
npm run dev
```

- **Frontend Application:** `http://localhost:5173/`
- **Backend API:** `http://localhost:5000/api/health`

### 6.2 Step-by-Step Live Demo Presentation Script

When presenting to evaluators, professors, or an examination committee, follow this seamless script:

1. **Step 1: Introduction (The Problem Statement)**
   > *"Good morning/afternoon. Today I am presenting our Capstone Project: **Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement**. The central challenge we are solving is the fragmented engagement between colleges and companies, which causes a major mismatch between student skillsets and real-world hiring criteria."*

2. **Step 2: Show the Portal Authentication & Multi-Role Architecture (Phase 1)**
   - Open `http://localhost:5173/login`.
   - Point out the clean corporate UI, free of mock demo buttons or clutter.
   - Click **"Sign Up &rarr;"** to navigate to `/register`.
   - **Demonstrate Role Selection:**
     - Click **🎓 Student** &rarr; Notice the degree and college field.
     - Click **🏛️ College / TPO** &rarr; Notice the institutional name and Placement Cell field.
     - Click **💼 Recruiter** &rarr; Notice the company name field.
   - Log in with `aryan` (password: `password123`) or register a new user.
   - Show the **Session Card** with the encrypted session badge and role tag.

3. **Step 3: Launch the Skill Mapping Engine (Phase 2)**
   - Click the prominent button: **"🎯 Launch Skill Mapping Engine &rarr;"** (or navigate to `http://localhost:5173/skills`).
   - Highlight the **Live Circular Score Ring**:
     > *"Here the system takes the student's profile and executes our competency matching algorithm in real-time."*
   - **Demonstrate Role Benchmark Switching:**
     - Switch from *Full Stack MERN Developer* to *AI / Machine Learning Engineer*.
     - Show how the score immediately recalibrates (e.g., from 78% down to 25%) because the student's web stack does not fulfill the ML requirements.
     - Switch back to *Full Stack MERN Developer*.
   - **Demonstrate Interactive Skill Editing & Level Upgrading:**
     - Click on `React.js` and upgrade from `Intermediate` to `Advanced`.
     - Show the score increase immediately.
     - Click **"+ Add Skill"** &rarr; Add `Docker` as `Intermediate`.
     - Notice how `Docker` transitions from the **Detected Skill Gaps** column directly into the **Matched Competencies** column!
     - Show how the match percentage increases dynamically.
   - **Demonstrate Targeted Learning Pathways:**
     - Point out the bottom recommendations section showing the student exactly which course and project will bridge their remaining gaps.

---

## 7. Viva Defense & Examiner FAQ Guide

### Q1: How does this project differ from LinkedIn, Unstop, or conventional job boards?
**Answer:**  
*"Conventional portals operate primarily as bulletin boards for resumes with keyword matching. They do not involve academic institutions and provide no structured diagnostic feedback to students. Our portal bridges academia and industry by:*
1. *Integrating TPOs directly into the verification loop.*
2. *Translating industry job requirements into concrete skill benchmarks.*
3. *Providing students with an objective gap analysis and targeted learning pathways before they apply."*

### Q2: How is the skill match percentage calculated? Is it just keyword matching?
**Answer:**  
*"No, it is a weighted mathematical algorithm. Each required skill has an industry weight (1 to 3) and a minimum proficiency threshold (Beginner to Expert). The system calculates the ratio of the student's current proficiency to the required proficiency, applies the weight, and sums the total points against the maximum possible score. This ensures that having a skill at Beginner level does not give full points if the role requires Advanced mastery."*

### Q3: How are passwords stored and authenticated?
**Answer:**  
*"Passwords are never stored in plaintext. In the backend, Mongoose pre-save hooks hash passwords using `bcryptjs` with 10 salt rounds. Authentication uses stateless JSON Web Tokens (JWT) signed with a secure secret key and set with a 7-day expiration. Role-Based Access Control middleware validates the token on protected routes."*

### Q4: What are the next steps for Phases 3 and 4?
**Answer:**  
*"With Phase 1 (Auth & Roles) and Phase 2 (Skill Mapping Engine) operational, our next deliverables are:*
- *Phase 3: **Internship & Placement Drive Management** — Enabling recruiters to post opportunities and students to apply with 1-click using their skill match scores.*
- *Phase 4: **Institutional Analytics Dashboard** — Giving TPOs bird's-eye metrics on batch readiness, company recruitment statistics, and curriculum gap trends."*

---

## 8. Repository File Directory Structure

```
d:\Capstone/
├── CAPSTONE_PROJECT_REPORT.md       <-- Comprehensive Project Report & Presentation Guide
├── README.md                         <-- Setup instructions
├── package.json                      <-- Monorepo root configuration
├── client/                           <-- React 19 Frontend
│   ├── src/
│   │   ├── App.jsx                   <-- Core application routing (/login, /register, /logout, /skills)
│   │   ├── index.css                 <-- Complete design tokens & responsive CSS
│   │   ├── context/
│   │   │   └── AuthContext.jsx       <-- JWT authentication, local session persistence & API bridge
│   │   ├── components/
│   │   │   ├── LoginCard.jsx         <-- Liquid wave login component
│   │   │   ├── RegisterCard.jsx      <-- Multi-role registration with segmented selectors
│   │   │   ├── LogoutCard.jsx        <-- Profile & session card with Skill Engine launch CTA
│   │   │   └── TermsModal.jsx        <-- Terms and policies modal
│   │   └── pages/
│   │       ├── AuthPage.jsx          <-- Clean portal header & authentication layout
│   │       └── SkillMappingPage.jsx  <-- Phase 2 Skill Mapping, Gap Matrix & Learning Pathways
│   └── vite.config.js                <-- Vite config with /api proxy to localhost:5000
└── server/                           <-- Express REST API Backend
    └── src/
        ├── app.js                    <-- Express app configuration & route registry
        ├── server.js                 <-- Server entry point (Port 5000)
        ├── config/
        │   └── database.js           <-- MongoDB connection with in-memory dev fallback
        ├── data/
        │   └── skillData.js          <-- Standardized 34-skill taxonomy & 4 industry role benchmarks
        ├── models/
        │   └── User.js               <-- Mongoose user model with role enum, skills, and affiliations
        ├── middleware/
        │   └── auth.js               <-- JWT token authentication & role authorization middleware
        ├── controllers/
        │   ├── authController.js     <-- Register, login, and profile controllers
        │   └── skillController.js    <-- Skill match engine, gap analysis, and profile synchronization
        └── routes/
            ├── authRoutes.js         <-- /api/auth routes
            └── skillRoutes.js        <-- /api/skills routes (taxonomy, benchmarks, analyze, my-profile)
```
