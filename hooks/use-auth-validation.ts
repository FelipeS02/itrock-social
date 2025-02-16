import { useCallback, useEffect } from 'react';

import { isSessionExpirated } from '@rock/lib/auth';

import { logout } from '@rock/store/slices/user.slice';

import { useAppDispatch, useAppSelector } from './redux-hooks';

import { useInterval } from 'usehooks-ts';

/**
 * @ms Miliseconds to revalidate session
 * @summary Manage session expiration and redirect if needed
 */
export default function useAuthValidation(ms: number = 10000) {
  const dispatch = useAppDispatch();
  const expiration = useAppSelector((state) => state.user.exp);

  const checkExpiration = useCallback(() => {
    if (expiration && isSessionExpirated(expiration)) dispatch(logout());
  }, [dispatch, expiration]);

  // Initial validation
  useEffect(checkExpiration, [checkExpiration]);

  // If access token exists revalidate (every 10 seconds by default)
  useInterval(checkExpiration, expiration > 0 ? ms : null); // Null to cancel interval

  return expiration;
}
