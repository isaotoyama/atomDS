import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Bell, ChartNoAxesColumnIncreasing, CircleHelp, Download, LockKeyhole, Mail } from 'lucide-react';
import { Avatar, Badge, Button, Checkbox, IconButton, Input, Select, Switch } from './atoms';
import { FormField } from './molecules';

export interface DataColumn<Row> { key: keyof Row; title: string; render?: (value: Row[keyof Row], row: Row) => ReactNode; sortable?: boolean }
export function DataTable<Row extends { id: string | number }>({ rows, columns }: { rows: Row[]; columns: DataColumn<Row>[] }) {
  const [sort, setSort] = useState<{ key: keyof Row; direction: 'asc' | 'desc' } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => {
      const aVal = String(a[sort.key] ?? ''); const bVal = String(b[sort.key] ?? '');
      return aVal.localeCompare(bVal, undefined, { numeric: true }) * (sort.direction === 'asc' ? 1 : -1);
    });
  }, [rows, sort]);
  return <div className="at-table-scroller"><table className="at-data-table"><thead><tr>{columns.map(col => <th key={String(col.key)} scope="col" aria-sort={sort?.key === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}>{col.sortable ? <button type="button" onClick={() => setSort(previous => ({ key: col.key, direction: previous?.key === col.key && previous.direction === 'asc' ? 'desc' : 'asc' }))}>{col.title}{sort?.key === col.key ? (sort.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : <ArrowUpDown size={14} />}</button> : col.title}</th>)}</tr></thead><tbody>{sorted.map(row => <tr key={row.id}>{columns.map(col => <td key={String(col.key)}>{col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}</td>)}</tr>)}</tbody></table>{rows.length === 0 && <div className="at-empty-table">No records found.</div>}</div>;
}

export function AppHeader({ title = 'Analytics overview', subtitle = 'Welcome back to your workspace.', actions }: { title?: string; subtitle?: string; actions?: ReactNode }) {
  return <header className="at-app-header"><div><div className="at-eyebrow">YOUR WORKSPACE / OVERVIEW</div><h2>{title}</h2><p>{subtitle}</p></div><div className="at-app-header-actions">{actions || <><IconButton variant="outline" icon={<Bell size={18} />} aria-label="Notifications" /><Button leftIcon={<Download size={16} />}>Export report</Button></>}</div></header>;
}

export function SettingsPanel() {
  const [emails, setEmails] = useState(true);
  const [security, setSecurity] = useState(true);
  const [name, setName] = useState('Alex Morgan');
  const [role, setRole] = useState('designer');
  const [saved, setSaved] = useState(false);
  return <div className="at-settings"><div className="at-settings-top"><div className="at-settings-avatar"><Avatar name={name} size="lg" status="online" /></div><div><strong>Profile settings</strong><p>Manage your personal preferences</p></div></div><div className="at-settings-grid"><FormField htmlFor="settings-name" label="Full name"><Input id="settings-name" value={name} onChange={(event) => { setName(event.target.value); setSaved(false); }} /></FormField><FormField htmlFor="settings-role" label="Your role"><Select id="settings-role" value={role} onChange={(event) => { setRole(event.target.value); setSaved(false); }}><option value="designer">Product designer</option><option value="engineer">Engineer</option><option value="manager">Product manager</option></Select></FormField></div><div className="at-settings-toggles"><Switch checked={emails} onChange={e => { setEmails(e.target.checked); setSaved(false); }} label="Email notifications" description="Get weekly activity summaries" /><Switch checked={security} onChange={e => { setSecurity(e.target.checked); setSaved(false); }} label="Security alerts" description="Get notified about important sign-ins" /></div><div className="at-settings-footer">{saved && <span className="at-saved" role="status">Settings saved locally</span>}<Button size="sm" onClick={() => setSaved(true)}>Save changes</Button></div></div>;
}

export function SignInForm() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <form className="at-signin" onSubmit={submit}><div className="at-signin-icon"><LockKeyhole size={20} /></div><h3>Welcome back</h3><p>Enter your details to sign in.</p><FormField label="Email address" htmlFor="signin-email" required><Input required id="signin-email" type="email" placeholder="you@company.com" leading={<Mail size={16} />} value={email} onChange={e => setEmail(e.target.value)} /></FormField><FormField label="Password" htmlFor="signin-password" required><Input required id="signin-password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} /></FormField><Checkbox label="Remember me" defaultChecked /><Button type="submit">Sign in</Button>{submitted && <p className="at-signin-notice" role="status">Demo only — no authentication request was made.</p>}</form>;
}

export function MiniDashboard() {
  const rows = [
    { id: 1, name: 'Acme Studio', plan: 'Enterprise', status: 'Active', amount: '$4,250' },
    { id: 2, name: 'Orbit Labs', plan: 'Pro', status: 'Active', amount: '$1,890' },
    { id: 3, name: 'Linear Works', plan: 'Starter', status: 'Pending', amount: '$450' },
    { id: 4, name: 'Northstar', plan: 'Pro', status: 'Active', amount: '$1,290' },
  ];
  return <div className="at-mini-dashboard"><AppHeader title="Analytics overview" subtitle="A snapshot of your performance" actions={<><IconButton variant="outline" icon={<CircleHelp size={17}/>} aria-label="Help"/><IconButton variant="outline" icon={<Bell size={17}/>} aria-label="Notifications"/></>} /><div className="at-mini-stats"><div className="at-mini-stat"><div><ChartNoAxesColumnIncreasing size={17} /> Total revenue</div><strong>$48,290</strong><span>↑ 12.8% from last month</span></div><div className="at-mini-stat"><div><Bell size={17} /> Active users</div><strong>2,840</strong><span>↑ 8.2% from last month</span></div></div><DataTable rows={rows} columns={[{ key: 'name', title: 'Customer', sortable: true }, { key: 'plan', title: 'Plan' }, { key: 'status', title: 'Status', render: (value) => <Badge tone={value === 'Active' ? 'success' : 'warning'} dot>{String(value)}</Badge> }, { key: 'amount', title: 'MRR' }]} /></div>;
}
