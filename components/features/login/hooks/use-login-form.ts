import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import ROUTES from '@rock/lib/routes';
import { timeout } from '@rock/lib/utils';
import { useAppDispatch } from '@rock/hooks/redux-hooks';
import useAuthValidation from '@rock/hooks/use-auth-validation';
import { AuthState } from '@rock/models/auth-state.model';
import { User } from '@rock/models/user.model';

import { login } from '@rock/store/slices/auth.slice';

import { getExpirationTime } from '../helpers/expiration';
import { LoginForm } from '../models/login-form.model';
import { loginFormSchema } from '../schemas/login-form.schema';

import { zodResolver } from '@hookform/resolvers/zod';

const mockUser: User = {
  email: '',
  username: 'Felipe Saracho',
  role: { background: '#FF3201', foreground: '#FAFAFA', name: 'Front-End' },
  
};

const mockPassword = 'ITROCK2025';

const EXPIRATION_HOURS = 2;

export default function useLoginForm(
  props: UseFormProps<LoginForm> = {},
  redirect = ROUTES.FEED.HOME,
) {
  const sessionExists = !!useAuthValidation();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    ...props,
  });

  const handleRedirect = useCallback(
    () => router.push(redirect),
    [redirect, router],
  );

  async function onSubmit(values: LoginForm) {
    try {
      setLoading(true);

      form.clearErrors();

      const { email, password } = values;

      await timeout(1000);

      if (password !== mockPassword)
        return form.setError('password', {
          message: 'La contraseña es incorrecta',
        });

      const exp = getExpirationTime(EXPIRATION_HOURS);

      const newUser: AuthState = { exp, user: { ...mockUser, email } };

      dispatch(login(newUser));

      handleRedirect();

      // Ideally use catch sentence in api querys
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sessionExists) handleRedirect();
  }, [handleRedirect, sessionExists]);

  return { form, onSubmit, loading };
}
