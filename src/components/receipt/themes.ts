/**
 * @fileoverview Theme configuration for receipt states.
 * @module receiptThemes
 */

/** Status-specific styling configuration */
export interface StatusTheme {
    gradient: string;
    iconBg: string;
    badge: string;
    button: string;
    accent: string;
}

/** Theme configuration for success state */
export const SUCCESS_THEME: StatusTheme = {
    gradient: 'from-slate-900 via-emerald-900 to-slate-900',
    iconBg: 'from-emerald-500 to-green-500',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    button: 'from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-emerald-500/30',
    accent: 'text-emerald-400',
};

/** Theme configuration for failure state */
export const FAILURE_THEME: StatusTheme = {
    gradient: 'from-slate-900 via-red-900 to-slate-900',
    iconBg: 'from-red-500 to-rose-500',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    button: 'from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/30',
    accent: 'text-red-400',
};
