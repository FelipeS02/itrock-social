'use client';

import { Skeleton } from '@rock/components/ui/skeleton';
import NewPostForm from '@rock/components/common/new-post-form';

import { useAppSelector } from '@rock/hooks/redux-hooks';
import { NewPostForm as NewPostFormValues } from '@rock/models/post.model';

import { createPost, likePost } from '@rock/store/slices/posts.slice';

import { BasePost, BasePostSkeleton } from './base-post';
import usePosts from './hooks/use-posts';
import { Post, PostAvatar, PostContent } from './post-parts/post-parts';

import { ImagePlus } from 'lucide-react';

const PostsList = () => {
  const user = useAppSelector((state) => state.user.info);

  const {
    posts: { list: posts, loading },
    dispatch,
  } = usePosts();

  const onSubmitPost = (values: NewPostFormValues) => {
    dispatch(createPost({ user, post: values }));
  };

  if (loading)
    return (
      <>
        <Post>
          <Skeleton className='size-10 rounded-full' />
          <PostContent>
            <Skeleton className='h-[60px]' />
            <div className='mt-1.5 inline-flex w-full justify-between'>
              <ImagePlus className='text-primary/10 size-4' />

              <Skeleton className='h-9 w-22' />
            </div>
          </PostContent>
        </Post>
        <BasePostSkeleton />
        <BasePostSkeleton />
        <BasePostSkeleton />
        <BasePostSkeleton />
      </>
    );

  return (
    <>
      <Post>
        <PostAvatar avatar={user.avatar} username={user.username} />
        <PostContent>
          <NewPostForm placeholder='¿Que contás?' cb={onSubmitPost} />
        </PostContent>
      </Post>
      {posts.map((post) => {
        const userHasLikedPost =
          post.likes.findIndex((like) => like.id === user.id) > -1;

        return (
          <BasePost
            liked={userHasLikedPost}
            onLike={(postId) => dispatch(likePost({ postId, user }))}
            key={`post-${post.id}`}
            asLink
            {...post}
          />
        );
      })}
    </>
  );
};

export default PostsList;
