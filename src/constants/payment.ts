/**
 * @fileoverview Payment-related constants and configuration.
 * Contains test card numbers and validation rules for the payment flow.
 */

/**
 * Test card numbers for simulating payment scenarios.
 * Following Stripe's test card convention.
 */
export const TEST_CARDS = {
    /** Card number that always results in a declined transaction */
    DECLINED: '4000000000000002',
    /** Standard test card for successful transactions */
    SUCCESS: '4242424242424242',
} as const;

/**
 * Validation rules for payment form fields.
 */
export const VALIDATION_RULES = {
    /** Required length for card number (16 digits) */
    CARD_NUMBER_LENGTH: 16,
    /** Minimum length for CVV (3 digits) */
    CVV_MIN_LENGTH: 3,
    /** Maximum length for CVV (4 digits for Amex) */
    CVV_MAX_LENGTH: 4,
    /** Minimum payment amount allowed */
    MIN_PAYMENT_AMOUNT: 0.01,
} as const;

/**
 * Display formatting configuration.
 */
export const FORMAT_CONFIG = {
    /** Card number group size for display (e.g., "4242 4242 4242 4242") */
    CARD_GROUP_SIZE: 4,
    /** Mask character for hiding card digits */
    MASK_CHAR: '*',
    /** Currency code for amount formatting */
    CURRENCY: 'USD',
    /** Locale for number/date formatting */
    LOCALE: 'en-US',
} as const;

/**
 * Transaction ID generation configuration.
 */
export const TRANSACTION_ID_CONFIG = {
    /** Character set for generating transaction IDs */
    CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    /** Segment lengths for transaction ID format */
    SEGMENTS: [8, 4, 4, 4, 12] as const,
} as const;
