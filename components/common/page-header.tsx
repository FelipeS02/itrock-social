import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

const PageHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <header
      className={cn('inline-flex items-center border-b px-4 p-2', className)}
      {...rest}
    />
  );
};

export default PageHeader;
