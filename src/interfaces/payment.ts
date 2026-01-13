/**
 * @fileoverview Payment-related TypeScript interfaces.
 *
 * Defines the data structures used throughout the payment flow,
 * from form input to transaction receipt display.
 *
 * @module payment
 */

/**
 * Type alias for transaction status.
 * Used to ensure type safety when passing status between pages.
 */
export type TransactionStatus = 'Success' | 'Failed';

/**
 * Interface for the payment form input data.
 *
 * Represents the raw data collected from the user via the payment form.
 * This data is validated before processing.
 *
 * @example
 * ```typescript
 * const formData: PaymentFormData = {
 *   nameOnCard: 'John Doe',
 *   cardNumber: '4242424242424242',
 *   expiryDate: '12/28',
 *   cvv: '123',
 *   paymentAmount: 99.99,
 * };
 * ```
 */
export interface PaymentFormData {
    /** Full name as it appears on the card */
    nameOnCard: string;

    /** Card number (16 digits, may include spaces for formatting) */
    cardNumber: string;

    /** Card expiry date in MM/YY format */
    expiryDate: string;

    /** Card verification value (3-4 digits) */
    cvv: string;

    /** Payment amount in USD */
    paymentAmount: number;
}

/**
 * Interface for the transaction receipt display data.
 *
 * Contains the masked and processed data shown on the receipt page.
 * Card numbers are already masked for security.
 *
 * @example
 * ```typescript
 * const receiptData: TransactionReceiptData = {
 *   nameOnCard: 'John Doe',
 *   maskedCardNumber: '**** **** **** 4242',
 *   expiryDate: '12/28',
 *   paymentAmount: 99.99,
 *   transactionStatus: 'Success',
 *   transactionId: 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6',
 * };
 * ```
 */
export interface TransactionReceiptData {
    /** Full name as it appeared on the card */
    nameOnCard: string;

    /** Masked card number showing only last 4 digits (e.g., "**** **** **** 1234") */
    maskedCardNumber: string;

    /** Card expiry date in MM/YY format */
    expiryDate: string;

    /** Payment amount in USD */
    paymentAmount: number;

    /** Transaction outcome status */
    transactionStatus: TransactionStatus;

    /** Unique transaction identifier for tracking */
    transactionId: string;
}

/**
 * Interface for URL parameters passed between payment and receipt pages.
 *
 * This represents the serialized form of receipt data that is passed
 * via URL search parameters.
 */
export interface ReceiptUrlParams {
    nameOnCard: string;
    maskedCardNumber: string;
    expiryDate: string;
    paymentAmount: string;
    status: TransactionStatus;
}
