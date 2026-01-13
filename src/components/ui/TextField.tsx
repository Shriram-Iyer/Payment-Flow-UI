/**
 * @fileoverview Reusable text field input component.
 * @module TextField
 */

import { Show, type Component, type JSX } from 'solid-js';

export interface TextFieldProps {
    /** Unique identifier */
    id: string;
    /** Label text */
    label: string;
    /** Input value */
    value: string | number;
    /** Input change handler */
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
    /** Placeholder text */
    placeholder?: string;
    /** Input type: text, password, number */
    type?: 'text' | 'password' | 'number';
    /** Input mode for mobile keyboards */
    inputMode?: 'text' | 'numeric' | 'decimal';
    /** Maximum input length */
    maxLength?: number;
    /** Autocomplete attribute */
    autocomplete?: string;
    /** Error message to display */
    error?: string;
    /** Element to show on the left (e.g., $ symbol) */
    leftAddon?: JSX.Element;
    /** Element to show on the right (e.g., card icon) */
    rightAddon?: JSX.Element;
    /** Additional container class */
    class?: string;
    /** For number inputs: step value */
    step?: string;
    /** For number inputs: minimum value */
    min?: string;
}

/**
 * Reusable text field with label, addons, and error display.
 *
 * @example
 * // Basic text field
 * <TextField id="name" label="Name" value={name()} onInput={handleName} />
 *
 * // Password field (CVV)
 * <TextField id="cvv" label="CVV" type="password" inputMode="numeric" ... />
 *
 * // With left addon (currency symbol)
 * <TextField leftAddon={<span>$</span>} ... />
 *
 * // With right addon (card brand icon)
 * <TextField rightAddon={<CardBrandIcon />} ... />
 */
const TextField: Component<TextFieldProps> = (props) => {
    const hasLeftAddon = () => props.leftAddon !== undefined;
    const hasRightAddon = () => props.rightAddon !== undefined;

    return (
        <div class={props.class || 'mb-6'}>
            <label
                for={props.id}
                class="block text-sm font-medium text-slate-300 mb-2"
            >
                {props.label}
            </label>
            <div class="relative">
                {/* Left Addon */}
                <Show when={hasLeftAddon()}>
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium" aria-hidden="true">
                        {props.leftAddon}
                    </span>
                </Show>

                <input
                    id={props.id}
                    type={props.type || 'text'}
                    inputmode={props.inputMode}
                    value={props.value}
                    onInput={props.onInput}
                    placeholder={props.placeholder}
                    maxLength={props.maxLength}
                    autocomplete={props.autocomplete}
                    step={props.step}
                    min={props.min}
                    class={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${hasLeftAddon() ? 'pl-8' : ''} ${hasRightAddon() ? 'pr-12' : ''}`}
                />

                {/* Right Addon */}
                <Show when={hasRightAddon()}>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                        {props.rightAddon}
                    </div>
                </Show>
            </div>

            {/* Error Message */}
            <Show when={props.error}>
                <p class="mt-2 text-sm text-red-400" role="alert">
                    {props.error}
                </p>
            </Show>
        </div>
    );
};

export default TextField;
