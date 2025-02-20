import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

const PostsWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <main
      className={cn('m-auto flex flex-col min-h-svh w-full max-w-[800px] md:border-x bg-background', className)}
      {...rest}
    />
  );
};

export default PostsWrapper;
