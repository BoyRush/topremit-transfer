# Topremit International Money Transfer Platform

A modern, responsive, and production-grade international remittance web prototype inspired by **Topremit**.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** (Strict Mode, zero `any`), **Chakra UI v3**, **TanStack React Query v5**, **Zustand v5**, **React Hook Form**, and **Yup**.

---

## 📑 Table of Contents

- [Features Overview](#-features-overview)
- [Bonus Features Implemented](#-bonus-features-implemented)
- [Which Stack We Picked and Why](#-which-stack-we-picked-and-why)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Promo Codes for Testing](#-promo-codes-for-testing)
- [Choices Made Where the Task Was Unclear](#-choices-made-where-the-task-was-unclear)
- [What We'd Improve With More Time](#-what-wed-improve-with-more-time)
- [License & Disclaimer](#-license--disclaimer)

---

## 🌟 Features Overview

The application faithfully implements the end-to-end 5-page remittance flow specified in the Topremit technical challenge:

1. **Calculator (`/`):**
   - Live country corridor selection with flags and currency codes (powered by REST Countries API).
   - Two-way automatic currency conversion (IDR $\leftrightarrow$ FX) without infinite loops or keystroke lag.
   - Real-time exchange rate display with inverse conversion ($1\text{ FX} = Y\text{ IDR}$).
   - Service selection (**Bank Transfer** vs **E-Wallet**) and speed (**Instant** vs **Regular**) with dynamic fees and estimated arrival times.
   - Total payment calculation: $\text{Total} = \text{Send Amount} + \text{Transfer Fee} - \text{Discount}$.

2. **Recipient Information (`/recipient`):**
   - Searchable bank selector filtered by the destination country corridor.
   - Strict validation: numbers-only account number (stored as a string to preserve leading zeros), full name trimming, transfer purpose selection, optional email validation, and a 255-character note with a **live character countdown**.
   - Clear field-level error messages powered by Yup.

3. **Review & Payment (`/review`):**
   - Full transaction summary with masked recipient account numbers for security.
   - Source payment bank selection (BCA, Mandiri, BRI) with mock Virtual Account instructions.
   - Interactive promo code engine with instant fee deduction.
   - Accessible confirmation modal requiring an explicit user confirmation click before the transfer is dispatched.

4. **Success Receipt (`/success/[id]`):**
   - Official-style transaction receipt with unique reference ID (`TRX-YYYYMMDD-XXXX`), payment details, and copy-to-clipboard functionality.
   - Interactive **1–5 star rating widget** with optional feedback comments, featuring server-side duplicate submission prevention.

5. **Transaction History (`/history` & `/history/[id]`):**
   - Chronological list of past transactions with status badges (`COMPLETED`, `PROCESSING`, `PENDING`), amounts, and formatted dates.
   - Real-time client-side search and status filter tabs (`ALL`, `PROCESSING`, `COMPLETED`, `PENDING`).
   - Detailed transaction breakdown page with dynamic metadata.

---

## 🎁 Bonus Features Implemented

All four optional bonus points specified in the take-home test brief are fully implemented:

| Bonus Feature                  | Implementation Details                                                                                                                                                                                                                                                                           |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Survives a Reload**       | Configured with Zustand `persist` (schema v2). The draft transfer parameters (country, currency, amounts, service, speed, applied promo) survive browser page reloads via `localStorage`. Sensitive recipient banking details are intentionally cleared upon cold refresh for financial privacy. |
| **2. Route Guards**            | Engineered client-side route protection in `src/hooks/useRouteGuard.ts` using React 19's `useSyncExternalStore`. Users attempting to jump directly to `/recipient` without a valid calculator draft or to `/review` without recipient details are instantly and gracefully redirected back.      |
| **3. Promo Code Engine**       | Built in `src/services/promo.service.ts` and `src/components/review/PromoCodeInput.tsx`. Supports percentage-based and fixed-amount discounts, minimum send amount thresholds, and clamps discounts so total payment never falls below zero.                                                     |
| **4. Two Languages (ID / EN)** | Full internationalization engine in `src/store/lang-store.ts` with 165 matched dictionary keys in `src/i18n/id.ts` and `src/i18n/en.ts`. Features an instant, reactive language switcher in the header without page reloading.                                                                   |

---

## 🛠 Which Stack We Picked and Why

We selected **Option A: Next.js (App Router) + Chakra UI v3 + Yup**. Here is the architectural reasoning:

### 1. Next.js 16 (App Router) & React 19

- **Backend-for-Frontend (BFF) Pattern:** App Router Route Handlers (`src/app/api/*`) allow us to proxy external public APIs. This eliminates client-side CORS issues, shields network traffic, and enables server-side caching.
- **Server Component Foundations:** `src/app/layout.tsx` is executed as a Server Component for instant SEO metadata rendering and anti-FOUC system font delivery, while interactive views cleanly define the client boundary (`"use client"`).
- **Turbopack Compiler:** Lightning-fast incremental compilation (~1000ms production builds).

### 2. Chakra UI v3 (`@chakra-ui/react` 3.38.0)

- **Design Tokens & Theme Consistency:** Configured via `createSystem(defaultConfig, customConfig)` in `src/theme/theme.ts`. It compiles semantically named tokens (e.g., `{colors.topremit.blue}`, `{radii.card}`) directly to CSS custom properties, ensuring 100% visual consistency with Topremit's brand identity.
- **Accessible Primitives:** Out-of-the-box WAI-ARIA compliant dialogs, focus trapping, and keyboard navigation.

### 3. Strict Separation in State Management

- **Server State $\rightarrow$ TanStack Query v5:** Dedicated exclusively to remote and asynchronous data (exchange rates, country lists, and mock transactions). Provides automatic deduplication, 10-minute caching, and targeted query invalidation upon rating submission.
- **Client Session State $\rightarrow$ Zustand v5:** Used for the multi-step transfer draft moving across wizard pages. Zero boilerplate, lightweight, and integrated with the `persist` middleware.
- **Form State $\rightarrow$ React Hook Form + Yup:** Uncontrolled inputs with isolated re-render boundaries, paired with Yup's declarative schema validation (`recipientValidationSchema`).

### 4. TypeScript 5 (Strict Mode, Zero `any`)

- The entire codebase is strictly typed. All domain models, API responses, and form inputs are defined with TypeScript interfaces, ensuring no runtime crashes or type coercion bugs.

---

## 📁 System Architecture

```
src/
├── app/                  # Next.js App Router (Thin Page Views & REST Route Handlers)
│   ├── api/              # Backend Controllers: /banks, /countries, /fees, /rates, /transactions
│   ├── history/          # Transaction History & Dynamic Detail Views (/history/[id])
│   ├── recipient/        # Recipient Form Entry Page
│   ├── review/           # Review, Payment Bank Picker & Confirmation Dialog
│   ├── success/[id]/     # Receipt Page & 1-5 Star Rating
│   ├── layout.tsx        # Server-rendered Root Shell
│   └── page.tsx          # Root Entry: Transfer Calculator
├── components/           # Presentation Layer (Organized by Domain)
│   ├── calculator/       # Calculator View, Country Modal, Service Modal, Rate Banner
│   ├── common/           # Reusable UI: CurrencyInput, Stepper, Summary, StarRating, Buttons
│   ├── history/          # History List & Transaction Detail Views
│   ├── layout/           # AppShell, Sticky Header, LanguageSwitcher, Footer
│   ├── recipient/        # Form View & Searchable Bank Modal
│   ├── review/           # Review Card, Payment Picker, PromoInput, ConfirmationDialog
│   ├── success/          # Success Receipt View
│   └── ui/               # Chakra UI v3 Dialog & Provider Snippets
├── hooks/                # Custom React Query & Controller Hooks (useTransferCalculator, etc.)
├── i18n/                 # Dictionaries (id.ts & en.ts, 165 keys each) & Interpolation Engine
├── models/               # Domain Models & Yup Schemas (Country, Transaction, Recipient, Transfer)
├── providers/            # Root Providers (TanStack QueryClient + ChakraProvider)
├── services/             # Pure Business Logic, Floating-Point Math & In-Memory Store
├── store/                # Zustand Stores (transfer-store.ts & lang-store.ts)
└── theme/                # Chakra UI v3 Theme System & Custom Color Tokens
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `>= 20.x` (Tested on Node.js `v24.22.3`)
- **npm:** `>= 10.x` (Tested on npm `11.19.1`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/boyrush/topremit-transfer.git
cd topremit-transfer

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
```

### Running Locally

```bash
# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Assurance & Build Commands

```bash
# Run strict TypeScript type check (zero errors)
npm run typecheck

# Run ESLint 9 validation
npm run lint

# Check Prettier code formatting
npm run format:check

# Auto-format all code
npm run format

# Create production build with Turbopack
npm run build

# Run production build locally
npm run start
```

---

## 🎟 Promo Codes for Testing

Test the promo code engine on the **Review Page** with these active codes:

| Promo Code          | Discount Type | Value                    | Eligibility Rule      |
| :------------------ | :------------ | :----------------------- | :-------------------- |
| **`WELCOME10`**     | Percentage    | **10% OFF** transfer fee | No minimum spend      |
| **`TRANSFER50`**    | Fixed IDR     | **IDR 50,000 OFF**       | Min. send IDR 500,000 |
| **`TOPREMITHEMAT`** | Fixed IDR     | **IDR 15,000 OFF**       | No minimum spend      |

_Note: Discounts are automatically clamped so they never exceed the transfer fee itself, preventing negative payments._

---

## 💡 Choices Made Where the Task Was Unclear

When technical specifications left room for interpretation, we made deliberate, production-minded engineering decisions:

1. **Privacy-Preserving Reload Persistence (Zustand Persist v2):**
   - _Ambiguity:_ The brief asked for the transfer draft to survive a reload.
   - _Decision:_ Storing plain-text recipient bank account numbers and full names in browser `localStorage` introduces financial data privacy risks. We engineered a schema migration (`version: 2`) that securely persists calculation parameters (country, currency, send/receive amounts, service speed, and promo codes) while intentionally dropping recipient banking details upon cold page reload.
2. **Backend-for-Frontend (BFF) Proxy & Resilient Fallbacks:**
   - _Ambiguity:_ The brief asked to use free public APIs for countries and exchange rates.
   - _Decision:_ Direct client-side calls to public APIs frequently encounter rate limits, CORS restrictions, or temporary downtime. We routed external calls through Next.js Route Handlers (`/api/countries` and `/api/rates`) with a 4-second timeout. If the remote API times out or fails, the system automatically activates verified local fallbacks (`DEFAULT_COUNTRIES` and `FALLBACK_IDR_RATES`), ensuring zero downtime or user interruption.
3. **In-Memory Singleton Server Storage:**
   - _Ambiguity:_ The brief specified mocking the backend via local API routes or server functions.
   - _Decision:_ Rather than relying solely on browser storage, we attached an in-memory repository to `globalThis.__TOPREMIT_TRANSACTIONS__` on the server runtime. It comes pre-seeded with 4 realistic transactions across major corridors (SG, MY, US, GB). This enables authentic server-side CRUD operations and rating mutations that persist across hot module reloads during development.
4. **React 19 Safe Hydration Detection:**
   - _Ambiguity:_ Route guards typically detect client hydration via `useEffect(() => setHydrated(true), [])`.
   - _Decision:_ React 19 enforces strict lint rules against calling `setState` inside `useEffect` bodies. We architected `useRouteGuard` using **`React.useSyncExternalStore`**, guaranteeing clean SSR-safe hydration detection with zero cascading re-renders or linter warnings.
5. **Two-Way Calculation Without Keystroke Loops:**
   - _Ambiguity:_ Typing in one currency field must automatically update the other without looping or firing requests on every keystroke.
   - _Decision:_ We isolated conversion math inside `src/services/currency-math.ts` and managed active typing direction (`typingField`) within `src/hooks/useTransferCalculator.ts`. Exchange rates are cached via TanStack Query, allowing conversions to run as pure, synchronous arithmetic in memory without triggering external HTTP requests.

---

## 🔮 What We'd Improve With More Time

While this prototype delivers a complete, robust, and tested user journey, here is what we would implement in a production phase:

1. **Persistent Database & ORM Integration:**
   - Replace the in-memory singleton with **PostgreSQL** or **MySQL** managed through **Prisma** or **Drizzle ORM**, adding database migrations and relational data integrity.
2. **Real Authentication & KYC Verification:**
   - Integrate authentication (e.g., Auth0, NextAuth / Auth.js) with role-based access control, JWT session tokens, and identity document upload for regulatory Anti-Money Laundering (AML) / Know-Your-Customer (KYC) compliance.
3. **Real Payment Gateway Integration:**
   - Connect Indonesian payment gateways (e.g., Midtrans, Xendit, or direct BI-FAST APIs) to generate real Dynamic Virtual Accounts and listen for settlement webhooks.
4. **Asynchronous Status Updates via WebSockets / SSE:**
   - Implement Server-Sent Events (SSE) or WebSockets to simulate real-time banking settlement transitions from `PENDING` $\rightarrow$ `PROCESSING` $\rightarrow$ `COMPLETED` without manual page refreshes.
5. **End-to-End (E2E) Automated Testing:**
   - Implement comprehensive E2E test suites with **Playwright** covering the complete 5-page transfer journey, currency edge-cases, and promo code validations across desktop and mobile viewports.
6. **Multi-Recipient Batch Transfers:**
   - Fully implement the "Banyak penerima" (batch recipients) tab on the calculator, allowing corporate users to disburse payments to multiple international vendors in a single checkout.

---

## 🛡 License & Disclaimer

This project is a functional frontend prototype built strictly for technical evaluation purposes as part of the **Topremit Take-Home Project**. All transactions, banking accounts, and remittances are simulated.
