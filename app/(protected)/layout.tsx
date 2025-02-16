import { ReactNode } from 'react';

import ProtectedRoute from '@rock/features/protected-route';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
