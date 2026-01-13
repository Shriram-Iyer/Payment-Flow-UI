/**
 * @fileoverview Submit button with loading state.
 * @module SubmitButton
 */

import { Show, type Component, type JSX } from 'solid-js';
import { SpinnerIcon } from './Icons';

export interface SubmitButtonProps {
    /** Button is in loading/processing state */
    isLoading?: boolean;
    /** Text to show when loading */
    loadingText?: string;
    /** Text to show normally */
    text: string;
    /** Icon to show before text */
    icon?: JSX.Element;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Additional button classes */
    class?: string;
}

/**
 * Submit button with loading spinner state.
 *
 * @example
 * <SubmitButton
 *   text="Pay Securely"
 *   icon={<LockIcon />}
 *   isLoading={isProcessing()}
 *   loadingText="Processing..."
 * />
 */
const SubmitButton: Component<SubmitButtonProps> = (props) => (
    <button
        type="submit"
        disabled={props.disabled || props.isLoading}
        class={props.class || 'w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'}
    >
        <Show
            when={!props.isLoading}
            fallback={
                <>
                    <SpinnerIcon />
                    <span>{props.loadingText || 'Loading...'}</span>
                </>
            }
        >
            {props.icon}
            <span>{props.text}</span>
        </Show>
    </button>
);

export default SubmitButton;
