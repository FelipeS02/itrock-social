import { CSSProperties, FC } from 'react';

import { cn } from '@rock/lib/utils';
import { User } from '@rock/models/user.model';

const RoleBadge: FC<User['role'] & { className?: string }> = ({
  background,
  foreground,
  name,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex h-fit w-fit items-center bg-(--_badge-background) px-1 py-0.5 text-sm leading-none text-(--_badge-foreground)',
        className,
      )}
      style={
        {
          '--_badge-background': background,
          '--_badge-foreground': foreground,
        } as CSSProperties
      }
    >
      {name}
    </div>
  );
};

export default RoleBadge;
