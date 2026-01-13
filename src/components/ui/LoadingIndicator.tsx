/**
 * @fileoverview Loading indicator component.
 * @module LoadingIndicator
 */

import type { Component } from 'solid-js';
import { SpinnerIcon } from './Icons';

export interface LoadingIndicatorProps {
    /** Loading message to display */
    message?: string;
}

/**
 * Full-screen centered loading spinner with optional message.
 */
const LoadingIndicator: Component<LoadingIndicatorProps> = (props) => (
    <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 mb-4">
            <SpinnerIcon class="w-8 h-8 text-white" />
        </div>
        <p class="text-slate-400">{props.message || 'Loading...'}</p>
    </div>
);

export default LoadingIndicator;
