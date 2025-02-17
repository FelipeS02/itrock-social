'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@rock/components/ui/button';
import {
  NewPostForm,
  NewPostFormSkeleton,
} from '@rock/components/common/new-post-form';
import PageHeader from '@rock/components/common/page-header';

import { useAppDispatch, useAppSelector } from '@rock/hooks/redux-hooks';
import { NewPostForm as NewPostFormValues } from '@rock/models/post.model';

import { BasePostSkeleton } from '@rock/features/posts/base-post';
import usePosts from '@rock/features/posts/hooks/use-posts';
import {
  Post,
  PostAvatar,
  PostComments,
  PostCommentsCounter,
  PostDate,
  PostImages,
  PostLike,
  PostText,
  PostUser,
} from '@rock/features/posts/post-parts/post-parts';
import PostsWrapper from '@rock/features/posts/posts-wrapper';
import { addComment, likePost } from '@rock/store/slices/posts.slice';

import { ArrowLeft } from 'lucide-react';

export default function Page() {
  const { postId } = useParams<{ postId: string }>();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);

  const {
    posts: { list },
  } = usePosts();

  const post = useMemo(() => {
    if (!list) return undefined;

    return list.find((post) => post.id === Number(postId));
  }, [postId, list]);

  if (!post)
    return (
      <PostsWrapper>
        <BasePostSkeleton />
        <div className='w-full border-b p-4'>
          <NewPostFormSkeleton />
        </div>
      </PostsWrapper>
    );

  const userHasLikedPost =
    post.likes.findIndex((like) => like.id === user.id) > -1;

  const likesQuantity = post.likes.length;

  const cb = (values: NewPostFormValues) => {
    const { text, images } = values;

    dispatch(addComment({ comment: { images, user, text }, postId: post.id }));
  };

  return (
    <PostsWrapper className='flex flex-col'>
      <PageHeader className='bg-background sticky top-0 z-10 px-0'>
        <Button variant='link' onClick={router.back}>
          <ArrowLeft />
        </Button>
        <span className='font-medium'>
          Post de {post.user.username.split(' ')[0]}
        </span>
      </PageHeader>
      <Post className='flex flex-col pb-4'>
        <div className='inline-flex items-center gap-2'>
          <PostAvatar avatar={post.user.avatar} username={post.user.username} />
          <PostUser
            className='flex-col items-start gap-0'
            role={post.user.role}
            username={post.user.username}
          />
        </div>

        <PostText text={post.text} />

        <PostImages images={post.images} />

        <PostDate date={post.date} />

        <div className='flex w-fit gap-4'>
          <PostLike
            id={post.id}
            onLike={(postId) => dispatch(likePost({ postId, user }))}
            liked={userHasLikedPost}
            likes={likesQuantity}
          />

          <PostCommentsCounter quantity={post.comments.length} />
        </div>
      </Post>

      <div className='w-full border-b p-4'>
        <NewPostForm
          buttonText='Responder'
          cb={cb}
          placeholder='Postea tu respuesta'
        />
      </div>

      <PostComments comments={post.comments} />
    </PostsWrapper>
  );
}
