/**
 * @fileoverview Success receipt sub-component.
 * @module SuccessReceipt
 */

import type { Component } from 'solid-js';
import type { TransactionReceiptData } from '../../interfaces/payment';
import type { StatusTheme } from './themes';
import { formatCurrency, formatDateTime } from '../../utils';
import { DetailRow } from '../ui';
import { PrintIcon, HomeIcon, CheckIcon } from '../ui/Icons';

export interface SuccessReceiptProps {
    data: TransactionReceiptData;
    theme: StatusTheme;
    onPrint: () => void;
}

/**
 * Success receipt display showing completed transaction details.
 */
const SuccessReceipt: Component<SuccessReceiptProps> = (props) => (
    <>
        {/* Success Header */}
        <header class="text-center mb-8">
            <div class={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${props.theme.iconBg} rounded-full mb-4 shadow-lg shadow-emerald-500/40 animate-pulse`}>
                <CheckIcon />
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p class="text-slate-400">Your transaction has been completed</p>
        </header>

        {/* Receipt Card */}
        <article class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Status Badge */}
            <div class="flex justify-center mb-6">
                <span class={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${props.theme.badge}`}>
                    <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
                    {props.data.transactionStatus}
                </span>
            </div>

            {/* Amount */}
            <div class="text-center mb-8 pb-6 border-b border-white/10">
                <p class="text-slate-400 text-sm mb-1">Amount Paid</p>
                <p class="text-4xl font-bold text-white">
                    {formatCurrency(props.data.paymentAmount)}
                </p>
            </div>

            {/* Transaction Details */}
            <dl class="space-y-4">
                <DetailRow label="Transaction ID" value={props.data.transactionId} mono small />
                <DetailRow label="Name on Card" value={props.data.nameOnCard} />
                <DetailRow label="Card Number" value={props.data.maskedCardNumber} mono />
                <DetailRow label="Expiry Date" value={props.data.expiryDate} mono />
                <DetailRow label="Date & Time" value={formatDateTime()} noBorder />
            </dl>

            {/* Actions */}
            <div class="mt-8 space-y-3">
                <button
                    type="button"
                    onClick={props.onPrint}
                    class="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <PrintIcon />
                    Print Receipt
                </button>

                <a
                    href="/"
                    class={`w-full py-3 bg-gradient-to-r ${props.theme.button} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                >
                    <HomeIcon />
                    Make Another Payment
                </a>
            </div>

            {/* Confirmation Message */}
            <p class="mt-8 pt-6 border-t border-white/10 text-center text-slate-500 text-xs">
                A confirmation email has been sent to your registered address.
            </p>
        </article>
    </>
);

export default SuccessReceipt;
