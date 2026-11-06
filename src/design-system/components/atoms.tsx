import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

const cls = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, children, className, disabled, type = 'button', ...props }, ref) {
  return <button ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cls('at-btn', `at-btn--${variant}`, `at-btn--${size}`, className)} {...props}>
    {loading ? <LoaderCircle className="at-spinner-icon" size={16} aria-hidden="true" /> : leftIcon}
    {children && <span>{children}</span>}
    {!loading && rightIcon}
  </button>;
});

export interface IconButtonProps extends Omit<ButtonProps, 'children'> { 'aria-label': string; icon: ReactNode }
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, className, ...props }, ref) {
  return <Button ref={ref} className={cls('at-icon-btn', className)} {...props}>{icon}</Button>;
});

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: BadgeTone; dot?: boolean }
export function Badge({ tone = 'neutral', dot, className, children, ...props }: BadgeProps) {
  return <span className={cls('at-badge', `at-badge--${tone}`, className)} {...props}>{dot && <span className="at-badge-dot" aria-hidden="true" />}{children}</span>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> { inputSize?: Size; leading?: ReactNode; trailing?: ReactNode; invalid?: boolean }
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ inputSize = 'md', leading, trailing, invalid, className, ...props }, ref) {
  return <span className={cls('at-input-wrap', `at-input-wrap--${inputSize}`, invalid && 'is-invalid', className)}>
    {leading && <span className="at-input-leading" aria-hidden="true">{leading}</span>}
    <input ref={ref} className="at-input" aria-invalid={invalid || undefined} {...props} />
    {trailing && <span className="at-input-trailing">{trailing}</span>}
  </span>;
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { invalid?: boolean }
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, className, ...props }, ref) {
  return <textarea ref={ref} className={cls('at-textarea', invalid && 'is-invalid', className)} aria-invalid={invalid || undefined} {...props} />;
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { invalid?: boolean }
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ invalid, className, children, ...props }, ref) {
  return <select ref={ref} className={cls('at-select', invalid && 'is-invalid', className)} aria-invalid={invalid || undefined} {...props}>{children}</select>;
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> { label?: ReactNode; description?: string }
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, description, className, ...props }, ref) {
  return <label className={cls('at-check', className)}><input ref={ref} type="checkbox" {...props} /><span className="at-check-content">{label && <span className="at-check-label">{label}</span>}{description && <span className="at-check-desc">{description}</span>}</span></label>;
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> { label?: ReactNode; description?: string }
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, description, className, ...props }, ref) {
  return <label className={cls('at-switch-field', className)}><span className="at-switch-copy">{label && <span className="at-switch-label">{label}</span>}{description && <span className="at-switch-desc">{description}</span>}</span><span className="at-switch-control"><input ref={ref} type="checkbox" role="switch" {...props} /><span className="at-switch-track" aria-hidden="true" /></span></label>;
});

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> { name: string; src?: string; size?: Size; status?: 'online' | 'away' | 'offline' }
export function Avatar({ name, src, size = 'md', status, className, ...props }: AvatarProps) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
  return <span className={cls('at-avatar', `at-avatar--${size}`, className)} aria-label={status ? `${name}, ${status}` : name} role="img" {...props}>
    {src ? <img src={src} alt="" /> : initials}
    {status && <span className={cls('at-avatar-status', `at-avatar-status--${status}`)} />}
  </span>;
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> { value: number; max?: number; label?: string; showValue?: boolean }
export function Progress({ value, max = 100, label, showValue = false, className, ...props }: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const percent = Math.min(100, Math.max(0, value / safeMax * 100));
  return <div className={cls('at-progress-wrap', className)} {...props}>
    {(label || showValue) && <div className="at-progress-label">{label && <span>{label}</span>}{showValue && <strong>{Math.round(percent)}%</strong>}</div>}
    <progress className="at-progress" max={safeMax} value={Math.max(0, Math.min(safeMax, value))} aria-label={label || 'Progress'} />
  </div>;
}

export function Spinner({ size = 'md', label = 'Loading' }: { size?: Size; label?: string }) {
  return <span className={cls('at-spinner', `at-spinner--${size}`)} role="status"><LoaderCircle className="at-spinner-icon" aria-hidden="true" /><span className="sr-only">{label}</span></span>;
}
export function Skeleton({ width, height = 16, className }: { width?: number | string; height?: number | string; className?: string }) {
  return <span aria-hidden="true" className={cls('at-skeleton', className)} style={{ width, height }} />;
}
export function Divider({ label, className }: { label?: string; className?: string }) {
  return <div className={cls('at-divider', className)} role="separator">{label && <span>{label}</span>}</div>;
}
