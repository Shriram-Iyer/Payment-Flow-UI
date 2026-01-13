/**
 * @fileoverview Detail row component for displaying key-value pairs.
 * @module DetailRow
 */

import type { Component } from 'solid-js';

export interface DetailRowProps {
    /** Label/key text */
    label: string;
    /** Value to display */
    value: string;
    /** Use monospace font for value */
    mono?: boolean;
    /** Use smaller text with background */
    small?: boolean;
    /** Hide bottom border */
    noBorder?: boolean;
}

/**
 * A row displaying a label-value pair in a definition list style.
 */
const DetailRow: Component<DetailRowProps> = (props) => (
    <div class={`flex justify-between items-center py-3 ${props.noBorder ? '' : 'border-b border-white/5'}`}>
        <dt class="text-slate-400 text-sm">{props.label}</dt>
        <dd class={`text-white ${props.mono ? 'font-mono' : 'font-medium'} ${props.small ? 'text-xs bg-white/5 px-3 py-1 rounded-lg' : 'text-sm'}`}>
            {props.value}
        </dd>
    </div>
);

export default DetailRow;
