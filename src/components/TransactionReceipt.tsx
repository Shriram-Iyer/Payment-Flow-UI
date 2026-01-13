/**
 * @fileoverview Transaction receipt page component.
 *
 * Main component that orchestrates the receipt display based on
 * transaction status from URL parameters.
 *
 * @module TransactionReceipt
 */

import { createSignal, onMount, Show, type Component } from 'solid-js';
import type { TransactionReceiptData } from '../interfaces/payment';
import { generateTransactionId } from '../utils';
import { LoadingIndicator } from './ui';
import { SuccessReceipt, FailureReceipt, SUCCESS_THEME, FAILURE_THEME } from './receipt';

/**
 * Transaction receipt component showing payment success or failure.
 *
 * Reads transaction data from URL search parameters and displays
 * an appropriate receipt based on the transaction status.
 *
 * @example
 * ```astro
 * ---
 * import TransactionReceipt from '../components/TransactionReceipt';
 * ---
 * <TransactionReceipt client:load />
 * ```
 */
const TransactionReceipt: Component = () => {
    // State
    const [receiptData, setReceiptData] = createSignal<TransactionReceiptData | null>(null);

    // Derived State
    const isSuccess = () => receiptData()?.transactionStatus === 'Success';
    const theme = () => (isSuccess() ? SUCCESS_THEME : FAILURE_THEME);

    // Parse URL parameters on mount
    onMount(() => {
        const params = new URLSearchParams(window.location.search);

        setReceiptData({
            nameOnCard: params.get('nameOnCard') ?? '',
            maskedCardNumber: params.get('maskedCardNumber') ?? '',
            expiryDate: params.get('expiryDate') ?? '',
            paymentAmount: parseFloat(params.get('paymentAmount') ?? '0'),
            transactionStatus: (params.get('status') as 'Success' | 'Failed') ?? 'Success',
            transactionId: generateTransactionId(),
        });
    });

    // Handlers
    const handlePrint = () => window.print();
    const handleGoBack = () => window.history.back();

    return (
        <div class={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${theme().gradient}`}>
            <div class="w-full max-w-md">
                <Show when={receiptData()} fallback={<LoadingIndicator message="Loading receipt..." />}>
                    {/* Success Receipt */}
                    <Show when={isSuccess()}>
                        <SuccessReceipt
                            data={receiptData()!}
                            theme={theme()}
                            onPrint={handlePrint}
                        />
                    </Show>

                    {/* Failure Receipt */}
                    <Show when={!isSuccess()}>
                        <FailureReceipt
                            data={receiptData()!}
                            theme={theme()}
                            onGoBack={handleGoBack}
                        />
                    </Show>

                    {/* Footer */}
                    <footer class="mt-6 text-center">
                        <p class="text-slate-500 text-sm">
                            Powered by{' '}
                            <span class={`font-semibold ${theme().accent}`}>BillEasy</span>
                        </p>
                    </footer>
                </Show>
            </div>
        </div>
    );
};

export default TransactionReceipt;
