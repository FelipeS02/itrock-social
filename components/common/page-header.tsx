import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

const PageHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <header
      className={cn(
        'inline-flex w-full items-center border-b px-4 py-2',
        className,
      )}
      {...rest}
    />
  );
};

export default PageHeader;
