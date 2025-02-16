import { FC, ReactNode } from 'react';

import Navigation from '@rock/features/navigation/navigation';

const SocialsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='flex size-full max-md:flex-col'>
      <Navigation className='sticky top-0 h-screen max-md:hidden' />

      {children}

      <Navigation
        mobile
        className='bg-background sticky bottom-0 z-10 row-span-1 md:hidden'
      />
    </div>
  );
};

export default SocialsLayout;
