import Image from 'next/image';

import LoginCoverImage from '@rock/app/assets/images/login-cover.webp';

const LoginCover = () => {
  return (
    <div className='relative size-full grid-cols-1 max-md:row-span-2'>
      <Image
        src={LoginCoverImage}
        fill
        alt='login-cover-image'
        className='object-cover'
      />
    </div>
  );
};

export default LoginCover;
