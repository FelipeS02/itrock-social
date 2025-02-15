'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ROUTES from '@rock/lib/routes';
import useAuthValidation from '@rock/hooks/use-auth-validation';

export default function ProtectedRoute() {
  const router = useRouter();
  const isExpirated = !useAuthValidation();

  useEffect(() => {
    if (isExpirated) router.push(ROUTES.AUTH.LOGIN);
  }, [isExpirated, router]);

  return null;
}
