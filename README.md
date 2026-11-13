# Topremit International Money Transfer Prototype

A modern, responsive, and functional international remittance web application prototype inspired by Topremit.

Built with **Next.js 16 (App Router)**, **React 19**, **Chakra UI v3**, **TanStack Query v5**, **Zustand v5**, **React Hook Form**, and **Yup** in strict TypeScript mode.

---

## 🛠 Technology Stack

- **Framework:** Next.js 16 (App Router with `src/` directory)
- **UI Library:** Chakra UI v3 (`@chakra-ui/react`, `@emotion/react`, `next-themes`)
- **Language:** TypeScript 5.9 (Strict mode enabled, zero `any`)
- **Server State & Caching:** TanStack React Query v5
- **Client State:** Zustand v5 (with `persist` middleware for reload resilience)
- **Form Management:** React Hook Form v7
- **Schema Validation:** Yup v1 + `@hookform/resolvers`
- **Icons:** Lucide React
- **Code Quality:** ESLint 9 (Flat Config), Prettier

---

## 📁 Architecture (MVC + Service Layer)

The application adheres to clean separation of concerns:

- **Model (`src/models/`):** Strict TypeScript domain interfaces for countries, exchange rates, recipients, and transactions.
- **View (`src/components/`, `src/app/`):** Pure React and Chakra UI v3 components organized into modular domain views.
- **Controller (`src/app/api/`):** Next.js Route Handlers serving mock endpoints for banks, fees, payment methods, and transaction persistence.
- **Service Layer (`src/services/`):** Pure business logic, currency conversion math, and external API connectors (REST Countries, public FX rate API).
- **Custom Hooks (`src/hooks/`):** Reusable React Query and calculation facades (`useCountries`, `useExchangeRate`, `useTransferCalculator`, etc.).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `>= 20.x` (Tested on Node.js `v24.22.3`)
- **npm:** `>= 10.x` (Tested on npm `11.19.1`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/topremit-transfer.git
cd topremit-transfer

# Install dependencies
npm install
```

### Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Available Scripts

| Script         | Command                | Purpose                                                            |
| :------------- | :--------------------- | :----------------------------------------------------------------- |
| `dev`          | `npm run dev`          | Starts local Next.js development server at `http://localhost:3000` |
| `build`        | `npm run build`        | Builds the production bundle with Turbopack                        |
| `start`        | `npm run start`        | Runs the production build locally                                  |
| `lint`         | `npm run lint`         | Runs ESLint 9 checks                                               |
| `typecheck`    | `npm run typecheck`    | Validates strict TypeScript compilation without emitting code      |
| `format`       | `npm run format`       | Auto-formats code with Prettier                                    |
| `format:check` | `npm run format:check` | Checks formatting conformity                                       |

---

## 🛡 Prototype Disclaimer

This application is a functional frontend prototype designed for evaluation purposes. All money transfers, banking settlements, and transactions are simulated.
