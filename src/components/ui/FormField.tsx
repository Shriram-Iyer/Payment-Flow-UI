/**
 * @fileoverview Reusable form field component.
 * @module FormField
 */

import { type JSX, type Component, Show } from 'solid-js';

export interface FormFieldProps {
    /** Unique identifier for the field */
    id: string;
    /** Label text displayed above the input */
    label: string;
    /** Error message to display (if any) */
    error?: string;
    /** Additional class names for the container */
    class?: string;
    /** Child input element */
    children: JSX.Element;
}

/**
 * Form field wrapper with label and error display.
 */
const FormField: Component<FormFieldProps> = (props) => (
    <div class={props.class || 'mb-6'}>
        <label
            for={props.id}
            class="block text-sm font-medium text-slate-300 mb-2"
        >
            {props.label}
        </label>
        {props.children}
        <Show when={props.error}>
            <p class="mt-2 text-sm text-red-400" role="alert">
                {props.error}
            </p>
        </Show>
    </div>
);

export default FormField;
