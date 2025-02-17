'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ROUTES from '@rock/lib/routes';
import useAuthValidation from '@rock/hooks/use-auth-validation';

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { expirated } = useAuthValidation();

  useEffect(() => {
    if (expirated) router.push(ROUTES.AUTH.LOGIN);
  }, [expirated, router]);

  if (expirated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
