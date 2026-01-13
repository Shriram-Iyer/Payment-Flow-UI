/**
 * @fileoverview Page header component with icon, title, and subtitle.
 * @module PageHeader
 */

import type { Component, JSX } from 'solid-js';

export interface PageHeaderProps {
    /** Icon element to display */
    icon: JSX.Element;
    /** Main title text */
    title: string;
    /** Subtitle/description text */
    subtitle: string;
    /** Gradient classes for icon background */
    iconGradient?: string;
    /** Shadow classes for icon */
    iconShadow?: string;
}

/**
 * Page header with icon, title, and subtitle.
 *
 * @example
 * <PageHeader
 *   icon={<CreditCardIcon />}
 *   title="Payment Details"
 *   subtitle="Enter your card information"
 *   iconGradient="from-violet-500 to-purple-500"
 * />
 */
const PageHeader: Component<PageHeaderProps> = (props) => (
    <header class="text-center mb-8">
        <div
            class={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${props.iconGradient || 'from-violet-500 to-purple-500'} rounded-2xl mb-4 shadow-lg ${props.iconShadow || 'shadow-purple-500/30'}`}
        >
            {props.icon}
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">{props.title}</h1>
        <p class="text-slate-400">{props.subtitle}</p>
    </header>
);

export default PageHeader;
