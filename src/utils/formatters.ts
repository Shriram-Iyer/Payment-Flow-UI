/**
 * @fileoverview Formatting utilities for payment display.
 * Handles card masking, currency formatting, and date/time display.
 */

import { FORMAT_CONFIG, TRANSACTION_ID_CONFIG } from '../constants/payment';

/**
 * Formats a card number with spaces for display.
 * Groups digits into sets of 4 for readability.
 *
 * @param value - Raw card number input (may contain non-digits)
 * @returns Formatted card number (e.g., "4242 4242 4242 4242")
 *
 * @example
 * formatCardNumber('4242424242424242'); // '4242 4242 4242 4242'
 * formatCardNumber('4242');             // '4242'
 */
export function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * Formats an expiry date input as MM/YY.
 * Automatically inserts the slash after the month.
 *
 * @param value - Raw expiry date input
 * @returns Formatted expiry date (e.g., "12/28")
 *
 * @example
 * formatExpiryDate('1228'); // '12/28'
 * formatExpiryDate('12');   // '12'
 */
export function formatExpiryDate(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length >= 2) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return digits;
}

/**
 * Masks a card number for secure display.
 * Shows only the last 4 digits.
 *
 * @param cardNumber - Full card number (may include spaces)
 * @returns Masked card number (e.g., "**** **** **** 4242")
 *
 * @example
 * maskCardNumber('4242 4242 4242 4242'); // '**** **** **** 4242'
 */
export function maskCardNumber(cardNumber: string): string {
    const digits = cardNumber.replace(/\D/g, '');
    const lastFour = digits.slice(-4);
    const mask = FORMAT_CONFIG.MASK_CHAR.repeat(4);

    return `${mask} ${mask} ${mask} ${lastFour}`;
}

/**
 * Formats a number as currency.
 *
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "$99.99")
 *
 * @example
 * formatCurrency(99.99); // '$99.99'
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat(FORMAT_CONFIG.LOCALE, {
        style: 'currency',
        currency: FORMAT_CONFIG.CURRENCY,
    }).format(amount);
}

/**
 * Formats the current date and time for display.
 *
 * @returns Formatted date/time string (e.g., "January 13, 2026 at 7:00 PM")
 */
export function formatDateTime(): string {
    return new Intl.DateTimeFormat(FORMAT_CONFIG.LOCALE, {
        dateStyle: 'long',
        timeStyle: 'short',
    }).format(new Date());
}

/**
 * Generates a unique transaction ID.
 * Format: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 *
 * @returns Generated transaction ID string
 *
 * @example
 * generateTransactionId(); // 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6'
 */
export function generateTransactionId(): string {
    const { CHARS, SEGMENTS } = TRANSACTION_ID_CONFIG;

    return SEGMENTS.map((length) =>
        Array.from(
            { length },
            () => CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
    ).join('-');
}

/**
 * Sanitizes CVV input to digits only.
 *
 * @param value - Raw CVV input
 * @param maxLength - Maximum allowed length (default: 4)
 * @returns Sanitized CVV string
 */
export function sanitizeCvv(value: string, maxLength = 4): string {
    return value.replace(/\D/g, '').slice(0, maxLength);
}
