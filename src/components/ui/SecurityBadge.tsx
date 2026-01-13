/**
 * @fileoverview Security badge component.
 * @module SecurityBadge
 */

import type { Component } from 'solid-js';
import { ShieldIcon } from './Icons';

export interface SecurityBadgeProps {
    /** Text to display */
    text?: string;
}

/**
 * Security badge showing encryption information.
 */
const SecurityBadge: Component<SecurityBadgeProps> = (props) => (
    <div class="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
        <ShieldIcon />
        <span>{props.text || '256-bit SSL Encryption'}</span>
    </div>
);

export default SecurityBadge;
