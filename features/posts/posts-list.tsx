'use client';

import { Skeleton } from '@rock/components/ui/skeleton';
import {
  NewPostForm,
  NewPostFormSkeleton,
} from '@rock/components/common/new-post-form';
import PageHeader from '@rock/components/common/page-header';

import { getGreeting } from '@rock/lib/utils';
import { useAppSelector } from '@rock/hooks/redux-hooks';
import { NewPostForm as NewPostFormValues } from '@rock/models/post.model';

import { createPost, likePost } from '@rock/store/slices/posts.slice';

import { BasePost, BasePostSkeleton } from './base-post';
import usePosts from './hooks/use-posts';
import { Post, PostAvatar, PostContent } from './post-parts/post-parts';

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
            <NewPostFormSkeleton />
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
      <PageHeader>
        <h1 className='text-lg font-medium'>
          {getGreeting()},{' '}
          <span style={{ color: user.role.background }}>
            {user.username.split(' ')[0]}
          </span>
        </h1>
      </PageHeader>

      <Post className='pt-3'>
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
