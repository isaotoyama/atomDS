import type { ReactNode } from 'react';

export function DashboardTemplate({ sidebar, header, children }: { sidebar: ReactNode; header: ReactNode; children: ReactNode }) {
  return <div className="at-dashboard-template"><aside>{sidebar}</aside><section><header>{header}</header><main>{children}</main></section></div>;
}
export function AuthTemplate({ branding, children }: { branding: ReactNode; children: ReactNode }) {
  return <div className="at-auth-template"><aside>{branding}</aside><main>{children}</main></div>;
}
