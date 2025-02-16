import { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

import { Button, ButtonProps } from '@rock/components/ui/button';

import { cn } from '@rock/lib/utils';

import Logo from '@rock/app/assets/images/logo.webp';

import AccountOptions from './account-options';

import { Compass, House, LucideIcon, Search, SquarePlus } from 'lucide-react';

const NavigationButton: FC<ButtonProps & LinkProps> = ({
  children,
  href,
  className,
  ...rest
}) => {
  return (
    <Button
      variant='ghost'
      className={cn('max-md:[&>span]:sr-only', className)}
      asChild
      {...rest}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

type NavigationOption = {
  name: string;
  icon: LucideIcon;
};
const NavigationOptions: FC<{ className?: string }> = ({ className = '' }) => {
  const options: NavigationOption[] = [
    { icon: House, name: 'Inicio' },
    { icon: Search, name: 'Buscar' },
    { icon: SquarePlus, name: 'Crear' },
    { icon: Compass, name: 'Explorar' },
  ];

  return options.map((option) => (
    <NavigationButton
      href='home'
      className={className}
      key={`navigation-item-${option.name}`}
    >
      <option.icon /> <span>{option.name}</span>
    </NavigationButton>
  ));
};

const Navigation: FC<HTMLAttributes<HTMLDivElement> & { mobile?: boolean }> = ({
  mobile = false,
  className = '',
  ...rest
}) => {
  if (mobile)
    return (
      <div
        className={cn(
          'bg-background flex items-center justify-between border-t px-4 py-1',
          className,
        )}
        {...rest}
      >
        <NavigationOptions className='[&>svg]:size-6' />
        <AccountOptions contentProps={{ side: 'top' }} />
      </div>
    );

  return (
    <aside
      className={cn(
        'flex flex-col items-start justify-between gap-2  py-4 pb-2',
        className,
      )}
    >
      <div className='w-full space-y-6'>
        <Image src={Logo} alt='itrock-logo' className='mx-4 max-w-36' />
        <div className='flex flex-col relative'>
          <NavigationOptions className='w-full justify-start py-6 text-lg [&>svg]:size-6' />
        </div>
      </div>

      <AccountOptions contentProps={{ side: 'right' }} />
    </aside>
  );
};

export default Navigation;
