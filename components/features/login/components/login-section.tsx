import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

import LoginForm from './login-form';

const LoginSection: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <main
      className={cn(
        'flex items-center justify-center border-t md:border-l',
        className,
      )}
      {...rest}
    >
      <LoginForm className='w-sm'/>
    </main>
  );
};

export default LoginSection;
