/**
 * @fileoverview Utility functions for payment form validation.
 * Provides reusable validation logic with TypeScript type safety.
 */

import { VALIDATION_RULES } from '../constants/payment';

/**
 * Validation result containing success status and optional error message.
 */
export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validates a card number.
 * Checks for exactly 16 numeric digits after removing formatting.
 *
 * @param cardNumber - The card number to validate (may include spaces)
 * @returns Validation result with error message if invalid
 *
 * @example
 * validateCardNumber('4242 4242 4242 4242'); // { isValid: true }
 * validateCardNumber('1234');                // { isValid: false, error: '...' }
 */
export function validateCardNumber(cardNumber: string): ValidationResult {
    const digits = cardNumber.replace(/\D/g, '');

    if (digits.length !== VALIDATION_RULES.CARD_NUMBER_LENGTH) {
        return {
            isValid: false,
            error: `Please enter a valid ${VALIDATION_RULES.CARD_NUMBER_LENGTH}-digit card number`,
        };
    }

    return { isValid: true };
}

/**
 * Validates an expiry date in MM/YY format.
 * Ensures the date is in the future.
 *
 * @param expiryDate - The expiry date string in MM/YY format
 * @returns Validation result with error message if invalid
 *
 * @example
 * validateExpiryDate('12/28'); // { isValid: true } (if current date < Dec 2028)
 * validateExpiryDate('01/20'); // { isValid: false, error: '...' }
 */
export function validateExpiryDate(expiryDate: string): ValidationResult {
    const match = expiryDate.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

    if (!match) {
        return {
            isValid: false,
            error: 'Please enter a valid expiry date (MM/YY)',
        };
    }

    const [, monthStr, yearStr] = match;
    const month = parseInt(monthStr, 10);
    const year = parseInt(`20${yearStr}`, 10);
    const now = new Date();
    const expiry = new Date(year, month - 1);

    if (expiry <= now) {
        return {
            isValid: false,
            error: 'Card has expired',
        };
    }

    return { isValid: true };
}

/**
 * Validates a CVV/CVC code.
 * Accepts 3 digits (Visa/MC) or 4 digits (Amex).
 *
 * @param cvv - The CVV code to validate
 * @returns Validation result with error message if invalid
 *
 * @example
 * validateCvv('123');  // { isValid: true }
 * validateCvv('1234'); // { isValid: true }
 * validateCvv('12');   // { isValid: false, error: '...' }
 */
export function validateCvv(cvv: string): ValidationResult {
    const isValidLength =
        cvv.length >= VALIDATION_RULES.CVV_MIN_LENGTH &&
        cvv.length <= VALIDATION_RULES.CVV_MAX_LENGTH;

    if (!isValidLength || !/^\d+$/.test(cvv)) {
        return {
            isValid: false,
            error: 'Please enter a valid CVV',
        };
    }

    return { isValid: true };
}

/**
 * Validates a payment amount.
 * Ensures the amount is greater than the minimum allowed.
 *
 * @param amount - The payment amount to validate
 * @returns Validation result with error message if invalid
 *
 * @example
 * validatePaymentAmount(99.99); // { isValid: true }
 * validatePaymentAmount(0);     // { isValid: false, error: '...' }
 */
export function validatePaymentAmount(amount: number): ValidationResult {
    if (amount < VALIDATION_RULES.MIN_PAYMENT_AMOUNT) {
        return {
            isValid: false,
            error: 'Please enter a valid payment amount',
        };
    }

    return { isValid: true };
}

/**
 * Validates the name on card field.
 *
 * @param name - The cardholder name to validate
 * @returns Validation result with error message if invalid
 */
export function validateNameOnCard(name: string): ValidationResult {
    if (!name.trim()) {
        return {
            isValid: false,
            error: 'Name on card is required',
        };
    }

    return { isValid: true };
}
