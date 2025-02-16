import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

const LoginWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 max-md:grid-rows-3 md:grid-cols-2 h-full w-full',
        className,
      )}
      {...rest}
    />
  );
};

export default LoginWrapper;
