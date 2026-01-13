/**
 * @fileoverview Payment form page component.
 *
 * Main component for collecting payment details with validation
 * and simulated processing.
 *
 * @module PaymentForm
 */

import { createSignal, type Component, type JSX } from 'solid-js';
import type { PaymentFormData } from '../interfaces/payment';
import { TEST_CARDS } from '../constants';
import {
    formatCardNumber,
    formatExpiryDate,
    maskCardNumber,
    sanitizeCvv,
    validateCardNumber,
    validateExpiryDate,
    validateCvv,
    validatePaymentAmount,
    validateNameOnCard,
    type ValidationResult,
} from '../utils';
import {
    PageHeader,
    Card,
    TextField,
    SubmitButton,
    SecurityBadge,
    CreditCardIcon,
    CardBrandIcon,
    LockIcon,
} from './ui';

// ============================================================================
// Types
// ============================================================================

type FormErrors = Partial<Record<keyof PaymentFormData, string>>;

// ============================================================================
// Component
// ============================================================================

/**
 * Payment form component for collecting and processing card payments.
 *
 * @example
 * ```astro
 * ---
 * import PaymentForm from '../components/PaymentForm';
 * ---
 * <PaymentForm client:load />
 * ```
 */
const PaymentForm: Component = () => {
    // State
    const [nameOnCard, setNameOnCard] = createSignal('');
    const [cardNumber, setCardNumber] = createSignal('');
    const [expiryDate, setExpiryDate] = createSignal('');
    const [cvv, setCvv] = createSignal('');
    const [paymentAmount, setPaymentAmount] = createSignal(0);
    const [errors, setErrors] = createSignal<FormErrors>({});
    const [isProcessing, setIsProcessing] = createSignal(false);

    // Validation
    const validateForm = (): boolean => {
        const validations: [keyof PaymentFormData, ValidationResult][] = [
            ['nameOnCard', validateNameOnCard(nameOnCard())],
            ['cardNumber', validateCardNumber(cardNumber())],
            ['expiryDate', validateExpiryDate(expiryDate())],
            ['cvv', validateCvv(cvv())],
            ['paymentAmount', validatePaymentAmount(paymentAmount())],
        ];

        const newErrors: FormErrors = {};
        for (const [field, result] of validations) {
            if (!result.isValid && result.error) {
                newErrors[field] = result.error;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsProcessing(true);

        setTimeout(() => {
            const cardDigits = cardNumber().replace(/\D/g, '');
            const isSuccess = cardDigits !== TEST_CARDS.DECLINED;

            const params = new URLSearchParams({
                nameOnCard: nameOnCard(),
                maskedCardNumber: maskCardNumber(cardNumber()),
                expiryDate: expiryDate(),
                paymentAmount: paymentAmount().toString(),
                status: isSuccess ? 'Success' : 'Failed',
            });

            window.location.href = `/receipt?${params.toString()}`;
        }, 1500);
    };

    return (
        <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                {/* Header */}
                <PageHeader
                    icon={<CreditCardIcon />}
                    title="Payment Details"
                    subtitle="Enter your card information securely"
                />

                {/* Form Card */}
                <Card>
                    <form onSubmit={handleSubmit} novalidate>
                        {/* Name on Card */}
                        <TextField
                            id="nameOnCard"
                            label="Name on Card"
                            value={nameOnCard()}
                            onInput={(e) => setNameOnCard(e.currentTarget.value)}
                            placeholder="John Doe"
                            autocomplete="cc-name"
                            error={errors().nameOnCard}
                        />

                        {/* Card Number */}
                        <TextField
                            id="cardNumber"
                            label="Card Number"
                            value={cardNumber()}
                            onInput={(e) => setCardNumber(formatCardNumber(e.currentTarget.value))}
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            maxLength={19}
                            autocomplete="cc-number"
                            rightAddon={<CardBrandIcon />}
                            error={errors().cardNumber}
                        />

                        {/* Expiry & CVV Row */}
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <TextField
                                id="expiryDate"
                                label="Expiry Date"
                                value={expiryDate()}
                                onInput={(e) => setExpiryDate(formatExpiryDate(e.currentTarget.value))}
                                placeholder="MM/YY"
                                inputMode="numeric"
                                maxLength={5}
                                autocomplete="cc-exp"
                                error={errors().expiryDate}
                                class="mb-0"
                            />

                            <TextField
                                id="cvv"
                                label="CVV"
                                type="password"
                                value={cvv()}
                                onInput={(e) => setCvv(sanitizeCvv(e.currentTarget.value))}
                                placeholder="•••"
                                inputMode="numeric"
                                maxLength={4}
                                autocomplete="cc-csc"
                                error={errors().cvv}
                                class="mb-0"
                            />
                        </div>

                        {/* Payment Amount */}
                        <TextField
                            id="paymentAmount"
                            label="Payment Amount"
                            type="number"
                            value={paymentAmount() || ''}
                            onInput={(e) => setPaymentAmount(parseFloat(e.currentTarget.value) || 0)}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            leftAddon="$"
                            error={errors().paymentAmount}
                            class="mb-8"
                        />

                        {/* Submit Button */}
                        <SubmitButton
                            text="Pay Securely"
                            icon={<LockIcon />}
                            isLoading={isProcessing()}
                            loadingText="Processing..."
                        />

                        {/* Security Badge */}
                        <SecurityBadge />
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default PaymentForm;
