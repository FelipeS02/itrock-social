'use client';

import { Suspense, useEffect, useRef } from 'react';

const PaperBg = () => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.playbackRate = 0.3;
  }, []);

  return (
    <Suspense fallback={<></>}>
      <div className='size-screen fixed inset-0 -z-1 opacity-30'>
        <video
          muted
          autoPlay
          loop
          playsInline
          poster='https://static.vecteezy.com/system/resources/thumbnails/049/962/577/large/black-dirty-background-animation-overlay-free-video.jpg'
          className='aspect-video size-full object-cover'
          ref={ref}
        >
          <source
            src='https://static.vecteezy.com/system/resources/previews/049/962/577/mp4/black-dirty-background-animation-overlay-free-video.mp4'
            type='video/mp4'
          />
        </video>
      </div>
    </Suspense>
  );
};

export default PaperBg;
