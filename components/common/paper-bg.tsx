'use client';

import { useEffect, useRef } from 'react';

const PaperBg = () => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.playbackRate = 0.30;
  }, []);

  return (
    <div className='size-screen fixed inset-0 -z-1 opacity-30'>
      <video
        muted
        autoPlay
        loop
        src='https://static.vecteezy.com/system/resources/previews/049/962/577/mp4/black-dirty-background-animation-overlay-free-video.mp4'
        className='aspect-video size-full object-cover'
        ref={ref}
      />
    </div>
  );
};

export default PaperBg;
