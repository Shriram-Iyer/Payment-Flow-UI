/**
 * @fileoverview Failure receipt sub-component.
 * @module FailureReceipt
 */

import type { Component } from 'solid-js';
import type { TransactionReceiptData } from '../../interfaces/payment';
import type { StatusTheme } from './themes';
import { formatCurrency, formatDateTime } from '../../utils';
import { DetailRow } from '../ui';
import { RetryIcon, BackIcon, XIcon, WarningIcon } from '../ui/Icons';

export interface FailureReceiptProps {
    data: TransactionReceiptData;
    theme: StatusTheme;
    onGoBack: () => void;
}

/**
 * Failure receipt display showing declined transaction details.
 */
const FailureReceipt: Component<FailureReceiptProps> = (props) => (
    <>
        {/* Failure Header */}
        <header class="text-center mb-8">
            <div class={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${props.theme.iconBg} rounded-full mb-4 shadow-lg shadow-red-500/40`}>
                <XIcon />
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Payment Failed</h1>
            <p class="text-slate-400">Your transaction could not be completed</p>
        </header>

        {/* Receipt Card */}
        <article class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Status Badge */}
            <div class="flex justify-center mb-6">
                <span class={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${props.theme.badge}`}>
                    <span class="w-2 h-2 bg-red-400 rounded-full" aria-hidden="true" />
                    {props.data.transactionStatus}
                </span>
            </div>

            {/* Amount (struck through) */}
            <div class="text-center mb-8 pb-6 border-b border-white/10">
                <p class="text-slate-400 text-sm mb-1">Amount Attempted</p>
                <p class="text-4xl font-bold text-white line-through opacity-60">
                    {formatCurrency(props.data.paymentAmount)}
                </p>
            </div>

            {/* Error Message */}
            <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6" role="alert">
                <div class="flex items-start gap-3">
                    <WarningIcon />
                    <div>
                        <p class="text-red-400 font-medium text-sm">Transaction Declined</p>
                        <p class="text-slate-400 text-xs mt-1">
                            Your card issuer has declined this transaction.
                            Please try a different payment method or contact your bank.
                        </p>
                    </div>
                </div>
            </div>

            {/* Transaction Details */}
            <dl class="space-y-4">
                <DetailRow label="Reference ID" value={props.data.transactionId} mono small />
                <DetailRow label="Card Number" value={props.data.maskedCardNumber} mono />
                <DetailRow label="Date & Time" value={formatDateTime()} noBorder />
            </dl>

            {/* Actions */}
            <div class="mt-8 space-y-3">
                <a
                    href="/"
                    class={`w-full py-3 bg-gradient-to-r ${props.theme.button} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                >
                    <RetryIcon />
                    Try Again
                </a>

                <button
                    type="button"
                    onClick={props.onGoBack}
                    class="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <BackIcon />
                    Go Back
                </button>
            </div>

            {/* Support Message */}
            <p class="mt-8 pt-6 border-t border-white/10 text-center text-slate-500 text-xs">
                Need help? Contact support at support@billeasy.com
            </p>
        </article>
    </>
);

export default FailureReceipt;
