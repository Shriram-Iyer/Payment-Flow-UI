# BillEasy - Payment Flow UI

A high-performance, 2-screen payment application built with **Astro** and **SolidJS** using the Islands Architecture.

> **AI Tool Used: Gemini**

## 🌐 Deployment

**Live Demo**: [https://payment-flow-ui-alpha.vercel.app](https://payment-flow-ui-alpha.vercel.app)

---

## 🚀 Project Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/billeasy.git
cd billeasy

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:4321`

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
npm run lint:fix
```

---

## 🏗️ Architecture

This project uses **Astro + SolidJS Islands Architecture**:

```
┌───────────────────────────────────────────────┐
│              Astro (Static HTML)              │
│  ┌─────────────────────────────────────────┐  │
│  │       SolidJS Island (Interactive)      │  │
│  │   • PaymentForm.tsx - client:load       │  │
│  │   • TransactionReceipt.tsx - client:load│  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### What is Islands Architecture?

- **Partial Hydration**: Only interactive components load JavaScript
- **Faster Page Loads**: Static HTML served immediately
- **Better Performance**: Non-interactive parts don't require JS

### Project Structure

```
src/
├── components/
│   ├── ui/                   # Shared UI components
│   │   ├── Icons.tsx         # All SVG icons
│   │   ├── FormField.tsx     # Form field wrapper
│   │   ├── DetailRow.tsx     # Key-value display row
│   │   ├── LoadingIndicator.tsx
│   │   └── index.ts
│   ├── receipt/              # Receipt sub-components
│   │   ├── themes.ts         # Success/failure themes
│   │   ├── SuccessReceipt.tsx
│   │   ├── FailureReceipt.tsx
│   │   └── index.ts
│   ├── PaymentForm.tsx       # Main payment form
│   ├── TransactionReceipt.tsx # Main receipt page
│   └── index.ts
├── constants/
│   └── payment.ts            # Test cards, validation rules
├── interfaces/
│   └── payment.ts            # TypeScript interfaces
├── pages/
│   ├── index.astro           # Payment page
│   └── receipt.astro         # Receipt page
├── styles/
│   └── global.css
└── utils/
    ├── formatters.ts         # Card masking, currency
    └── validation.ts         # Form validation
```

---

## 📄 Receipt Page Details

The transaction receipt displays:

| Field | Description |
|-------|-------------|
| **Name** | Cardholder name |
| **Masked Card Number** | e.g., `**** **** **** 1234` |
| **Expiry Date** | MM/YY format |
| **Payment Amount** | Formatted as currency ($99.99) |
| **Transaction Status** | `Success` or `Failed` |
| **Transaction ID** | Unique identifier (e.g., `A1B2C3D4-E5F6-...`) |

---

## 🧪 Test Cards

| Card Number | Result |
|-------------|--------|
| Any valid 16-digit card | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |

---

## ✨ Features

- **Form Validation**: 16-digit card, MM/YY expiry, CVV
- **Card Masking**: Numbers masked before display
- **Glassmorphism UI**: Modern backdrop-blur design
- **Success/Failure States**: Distinct UI for each outcome
- **Print Support**: Print-friendly receipts
- **Type Safety**: Full TypeScript with documented interfaces
- **Accessibility**: ARIA labels, semantic HTML

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.2.5 | Static site generation |
| SolidJS | 1.9.4 | Reactive UI components |
| Tailwind CSS | 4.0.6 | Styling |
| TypeScript | 5.7.3 | Type safety |
| ESLint | 9.18.0 | Code quality |

---

## 📄 License

MIT License
