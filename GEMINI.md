# Context: Payment Flow UI Assessment
Building a high-performance, 2-screen payment application using Astro and SolidJS.

## Project Standards
- **Type Safety**: Strictly use TypeScript for all components and logic. Use interfaces for Payment Details and Receipt data.
- **Framework Pattern**: Use Astro for routing/pages and SolidJS for interactive UI components (Islands architecture).
- **Styling**: Tailwind CSS for all styling. Ensure a clean, modern, and accessible UI.
- **State Management**: Since it's a 2-screen flow, handle state transitions using URL search params to pass data between screens.
- **Security**: Mock payment processing. Ensure card numbers are masked before being displayed on the receipt.

## Tooling & Stack
- Framework: Astro
- UI Library: SolidJS (using `client:load` or `client:visible` directives)
- Styling: Tailwind CSS
- Deployment: Vercel
- Language: TypeScript

## Preferences
- **Architecture**: Keep SolidJS components in `src/components` and Astro pages in `src/pages`.
- **Validation**: Use simple native HTML5 validation or lightweight logic within SolidJS signals.
- **UI Design**: Minimalist "Stripe-like" aesthetic. Focus on clear typography and consistent padding.

## Interfaces
```typescript
// src/interfaces/payment.ts (or directly within gemini.md for quick reference)

/**
 * Interface for the payment form data.
 */
export interface PaymentFormData {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string; // MM/YY format
  cvv: string;
  paymentAmount: number;
}

/**
 * Interface for the data displayed on the transaction receipt.
 */
export interface TransactionReceiptData {
  nameOnCard: string;
  maskedCardNumber: string; // **** **** **** 1234
  expiryDate: string;
  paymentAmount: number;
  transactionStatus: 'Success' | 'Failed'; // For future expansion, currently only Success
  transactionId: string; // Mocked UUID or similar
}