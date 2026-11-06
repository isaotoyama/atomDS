import { useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { AlertCircle, ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Info, Search, X } from 'lucide-react';
import { IconButton, Input } from './atoms';

export function SearchField({ value, onChange, placeholder = 'Search...', onSubmit }: { value: string; onChange: (value: string) => void; placeholder?: string; onSubmit?: () => void }) {
  return <form className="at-search-field" role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(); }}>
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label="Search" leading={<Search size={17} />} trailing={value ? <IconButton variant="ghost" size="sm" icon={<X size={14} />} aria-label="Clear search" onClick={() => onChange('')} /> : null} />
  </form>;
}

export interface FormFieldProps { label: string; htmlFor: string; helper?: string; error?: string; required?: boolean; children: ReactNode }
export function FormField({ label, htmlFor, helper, error, required, children }: FormFieldProps) {
  return <div className="at-form-field"><label className="at-field-label" htmlFor={htmlFor}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{error ? <span id={`${htmlFor}-description`} className="at-field-error" role="alert">{error}</span> : helper ? <span id={`${htmlFor}-description`} className="at-field-helper">{helper}</span> : null}</div>;
}

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';
export interface AlertProps extends HTMLAttributes<HTMLDivElement> { tone?: AlertTone; title: string; children?: ReactNode }
export function Alert({ tone = 'info', title, children, className = '', ...props }: AlertProps) {
  const Icon = { info: Info, success: CheckCircle2, warning: AlertCircle, danger: AlertCircle }[tone];
  return <div className={`at-alert at-alert--${tone} ${className}`} role={tone === 'danger' ? 'alert' : 'status'} {...props}><Icon size={19} aria-hidden="true"/><div><strong>{title}</strong>{children && <p>{children}</p>}</div></div>;
}

export interface TabItem { value: string; label: string; content: ReactNode }
export function Tabs({ items, value, onValueChange }: { items: TabItem[]; value?: string; onValueChange?: (next: string) => void }) {
  const prefix = useId().replaceAll(':', '');
  const [internal, setInternal] = useState(items[0]?.value || '');
  const selected = value ?? internal;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function choose(next: string) { if (value === undefined) setInternal(next); onValueChange?.(next); }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault(); choose(items[next].value); refs.current[next]?.focus();
  }
  return <div className="at-tabs"><div className="at-tabs-list" role="tablist" aria-label="Content sections">{items.map((item, i) => <button key={item.value} ref={(el) => { refs.current[i] = el; }} id={`tab-${prefix}-${item.value}`} role="tab" type="button" className={selected === item.value ? 'is-active' : ''} tabIndex={selected === item.value ? 0 : -1} aria-selected={selected === item.value} aria-controls={`panel-${prefix}-${item.value}`} onKeyDown={(event) => handleKey(event, i)} onClick={() => choose(item.value)}>{item.label}</button>)}</div>{items.map(item => <div key={item.value} id={`panel-${prefix}-${item.value}`} role="tabpanel" aria-labelledby={`tab-${prefix}-${item.value}`} hidden={selected !== item.value} className="at-tabs-panel" tabIndex={0}>{item.content}</div>)}</div>;
}

export function StatCard({ label, value, change, direction = 'up', icon }: { label: string; value: string; change?: string; direction?: 'up' | 'down'; icon?: ReactNode }) {
  return <div className="at-stat-card"><div className="at-stat-top"><span>{label}</span>{icon && <span className="at-stat-icon">{icon}</span>}</div><strong>{value}</strong>{change && <div className="at-stat-bottom"><span className={direction === 'up' ? 'at-positive' : 'at-negative'}>{direction === 'up' ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{change}</span><span>vs. last month</span></div>}</div>;
}

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const total = Math.max(1, totalPages); const active = Math.max(1, Math.min(total, page));
  return <nav className="at-pagination" aria-label="Pagination"><IconButton icon={<ChevronLeft size={16} />} aria-label="Previous page" variant="outline" size="sm" disabled={active === 1} onClick={() => onPageChange(active - 1)} /><span>Page <strong>{active}</strong> of {total}</span><IconButton icon={<ChevronRight size={16} />} aria-label="Next page" variant="outline" size="sm" disabled={active === total} onClick={() => onPageChange(active + 1)} /></nav>;
}

export function Toast({ message, tone = 'success', onDismiss }: { message: string; tone?: AlertTone; onDismiss: () => void }) {
  return <div className={`at-toast at-toast--${tone}`} role="status"><CheckCircle2 size={19} /><span>{message}</span><IconButton icon={<X size={16} />} size="sm" variant="ghost" aria-label="Dismiss notification" onClick={onDismiss} /></div>;
}
