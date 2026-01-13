/**
 * @fileoverview Card component for glassmorphism containers.
 * @module Card
 */

import type { Component, JSX } from 'solid-js';

export interface CardProps {
    /** Card content */
    children: JSX.Element;
    /** Additional classes */
    class?: string;
}

/**
 * Glassmorphism card container.
 */
const Card: Component<CardProps> = (props) => (
    <div class={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 ${props.class || ''}`}>
        {props.children}
    </div>
);

export default Card;
