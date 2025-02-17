'use client';

import { FC, HTMLAttributes, useRef } from 'react';

import { Button } from '@rock/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@rock/components/ui/form';
import { Input } from '@rock/components/ui/input';

import { cn } from '@rock/lib/utils';
import useSubmitOnKey from '@rock/hooks/use-submit-on-key';

import useLoginForm from '../hooks/use-login-form';

import { CornerDownLeft } from 'lucide-react';

const LoginForm: FC<HTMLAttributes<HTMLFormElement>> = ({
  className = '',
  ...rest
}) => {
  const submitButton = useRef<HTMLButtonElement>(null);

  // Enable submit on Enter key
  useSubmitOnKey(submitButton.current);

  const { form, onSubmit, loading } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-5', className)}
        {...rest}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email corporativo</FormLabel>
              <FormControl>
                <Input type='email' placeholder='felipesaracho@itrocksweb.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder='··········' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          ref={submitButton}
          type='submit'
          size='lg'
          className='w-full'
          aria-label='Iniciar sesión'
          disabled={loading}
        >
          Iniciar sesión <CornerDownLeft className='max-md:hidden' />
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
