import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { mockUsers } from '@rock/lib/mock-posts';
import ROUTES from '@rock/lib/routes';
import { timeout } from '@rock/lib/utils';
import { useAppDispatch } from '@rock/hooks/redux-hooks';
import useAuthValidation from '@rock/hooks/use-auth-validation';
import { User } from '@rock/models/user.model';
import { UserState } from '@rock/models/user-state.model';

import { login } from '@rock/store/slices/user.slice';

import { getExpirationTime } from '../helpers/expiration';
import { LoginForm } from '../models/login-form.model';
import { loginFormSchema } from '../schemas/login-form.schema';

import { zodResolver } from '@hookform/resolvers/zod';

const mockPassword = 'ITROCK2025';

const EXPIRATION_HOURS = 2;

function getMockUser(email: string): User {
  const usersList = Object.values(mockUsers);

  const findedUser =
    usersList.find((user) => user.email === email) ?? mockUsers['felipe'];

  return findedUser;
}

export default function useLoginForm(
  props: UseFormProps<LoginForm> = {},
  redirect = ROUTES.FEED.HOME,
) {
  const { expirated } = useAuthValidation();

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

      const newUser: UserState = {
        exp,
        info: getMockUser(email),
      };

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
    if (!expirated) handleRedirect();
  }, [handleRedirect, expirated]);

  return { form, onSubmit, loading };
}
