import { FC, HTMLAttributes } from 'react';

import { cn } from '@rock/lib/utils';

const PostsWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <main
      className={cn('m-auto flex flex-col h-full w-full max-w-[800px] border-x bg-background', className)}
      {...rest}
    />
  );
};

export default PostsWrapper;
