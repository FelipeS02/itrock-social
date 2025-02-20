import Image from 'next/image';

import Logo from './assets/images/logo.webp';

const Loading = () => {
  return (
    <div className='w-dvw h-svh grid'>
      <div className='grid animate-pulse justify-center space-y-1 m-auto'>
        <Image
          src={Logo}
          width={500}
          alt='loading-logo'
          className='h-20 w-fit'
        />

        <h1 className='text-center text-3xl font-black'>FELIPE SARACHO</h1>
      </div>
    </div>
  );
};

export default Loading;
