import React, { FC } from 'react';
import Link from 'next/link';

import { Skeleton } from '@rock/components/ui/skeleton';

import { Post as PostType } from '@rock/models/post.model';

import {
  Post,
  PostAvatar,
  PostCommentsCounter,
  PostContent,
  PostDate,
  PostImages,
  PostLike,
  PostLikeProps,
  PostText,
  PostUser,
} from './post-parts/post-parts';

import { MessageSquare, Rocket } from 'lucide-react';

type BasePostProps = PostType &
  Pick<PostLikeProps, 'liked' | 'onLike'> & {
    asLink?: boolean;
  };

/**
 * @summary Base post layout
 */
const BasePost: FC<BasePostProps> = ({
  id,
  images,
  likes,
  text,
  user,
  liked,
  onLike,
  comments,
  date,
  asLink = false,
}) => {
  const likesQuantity = likes.length;

  return (
    <Post className='hover:bg-accent transition-colors'>
      {asLink ? (
        <Link
          href={`/${id}`}
          className='absolute size-full transition-colors'
        />
      ) : null}
      <PostAvatar avatar={user.avatar} username={user.username} />
      <PostContent>
        <PostUser role={user.role} username={user.username} />

        <PostText text={text} />

        <PostImages images={images} className='mt-3' />

        <PostDate date={date} className='mt-1' />

        <div className='z-2 flex w-fit gap-4 py-2'>
          {' '}
          <PostLike
            id={id}
            onLike={onLike}
            liked={liked}
            likes={likesQuantity}
          />
          <PostCommentsCounter quantity={comments.length} />
        </div>
      </PostContent>
    </Post>
  );
};

const BasePostSkeleton = () => {
  return (
    <Post>
      <Skeleton className='col-span-1 size-10 rounded-full' />
      <div className='col-span-1 space-y-2'>
        <div className='inline-flex items-center gap-1'>
          <Skeleton className='h-4 w-30 rounded-full' />
          <Skeleton className='h-6 w-24' />
        </div>

        <div className='w-full space-y-1'>
          <Skeleton className='h-3 w-[90%] rounded-full' />
          <Skeleton className='h-3 w-[80%] rounded-full' />
        </div>
        <Skeleton className='h-[400px]' />

        <Skeleton className='h-3 w-40 rounded-full' />

        <div className='text-primary/10 inline-flex gap-8'>
          <div className='inline-flex items-center gap-0.5'>
            <Rocket className='size-4' />
            <Skeleton className='h-3 w-5 rounded-full' />
          </div>

          <div className='inline-flex items-center gap-0.5'>
            <MessageSquare className='size-4' />
            <Skeleton className='h-3 w-5 rounded-full' />
          </div>
        </div>
      </div>
    </Post>
  );
};

export { BasePost, BasePostSkeleton };
