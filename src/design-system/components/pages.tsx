import { MiniDashboard, SettingsPanel } from './organisms';

/** Example page composition — replace hardcoded metrics with application data. */
export function AnalyticsPage() {
  return <MiniDashboard />;
}

/** Example page composition — settings state is local and not persisted. */
export function SettingsPage() {
  return <SettingsPanel />;
}
