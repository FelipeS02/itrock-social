'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ROUTES from '@rock/lib/routes';
import useAuthValidation from '@rock/hooks/use-auth-validation';

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const isExpirated = !useAuthValidation();

  useEffect(() => {
    if (isExpirated) router.push(ROUTES.AUTH.LOGIN);
  }, [isExpirated, router]);

  if (isExpirated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
