import { ReactNode } from 'react';

import ProtectedRoute from '@rock/components/ProtectedRoute';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProtectedRoute /> {children}
    </>
  );
}
