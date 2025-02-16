import { ComponentProps, FC, HTMLAttributes } from 'react';
import Image, { ImageProps } from 'next/image';

import { Avatar, AvatarImage } from '@rock/components/ui/avatar';
import { Button } from '@rock/components/ui/button';
import { Label } from '@rock/components/ui/label';
import FormattedText from '@rock/components/common/formatted-text';
import RoleBadge from '@rock/components/common/role-badge';

import { cn, formatISODate } from '@rock/lib/utils';
import { Comment } from '@rock/models/comment.model';
import { Post as PostType } from '@rock/models/post.model';
import { User } from '@rock/models/user.model';

import styles from './post-parts.module.css';

import { AvatarFallback } from '@radix-ui/react-avatar';
import { MessageSquare, Rocket } from 'lucide-react';

// Use this parts to make personalized posts layouts

const Post: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <article
      className={cn(
        'relative grid h-fit w-full gap-3 border-b px-4 py-6 pb-2 last:border-0',
        styles.post,
        className,
      )}
      {...rest}
    />
  );
};

export type PostAvatarProps = Pick<User, 'avatar' | 'username'> &
  ComponentProps<typeof Avatar> & {
    containerClassName?: string;
  };

const PostAvatar: FC<PostAvatarProps> = ({
  avatar,
  username,
  className = '',
  containerClassName = '',
  ...rest // Avatar props
}) => {
  return (
    <div className={cn('w-fit', styles.avatar, containerClassName)}>
      <Avatar className={className} {...rest}>
        <AvatarImage src={avatar} alt={`${username}-photo`} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

const PostContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <div
      className={cn('flex w-full flex-col', styles.content, className)}
      {...rest}
    />
  );
};

export type PostUserProps = Pick<User, 'role' | 'username'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'role'>;

const PostUser: FC<PostUserProps> = ({
  role,
  username,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={cn('inline-flex w-fit items-center gap-2', className)}
      {...rest}
    >
      <span className='font-semibold'>{username}</span> <RoleBadge {...role} />
    </div>
  );
};

type PostTextProps = Pick<PostType, 'text'> &
  HTMLAttributes<HTMLParagraphElement>;

const PostText: FC<PostTextProps> = ({ className = '', text, ...rest }) => (
  <div className={cn('mt-1 leading-5 break-words', className)} {...rest}>
    <FormattedText text={text} />
  </div>
);

export type PostImagesWrapperProps = HTMLAttributes<HTMLDivElement> & {
  quantity: number;
};

const PostImagesWrapper: FC<PostImagesWrapperProps> = ({
  quantity = 1,
  className = '',
  ...rest
}) => {
  let layoutClassName = 'grid-cols-1';

  if (quantity === 2) layoutClassName = 'grid-cols-2';

  if (quantity === 3) layoutClassName = 'grid-cols-[2fr_1fr] grid-rows-2';

  if (quantity > 3)
    layoutClassName = 'grid-cols-[2fr_1fr] grid-rows-[repeat(3,1fr)]';

  return (
    <div
      className={cn(
        'bg-border grid h-[400px] max-w-full gap-0.5 border',
        quantity > 2 ? '[&_*]:first:col-span-1 [&_*]:first:row-span-full' : '',
        layoutClassName,
        className,
      )}
      {...rest}
    />
  );
};

const PostImage: FC<ImageProps> = ({ className = '', alt, ...rest }) => {
  return (
    <div className={cn('relative size-full', className)}>
      <Image fill className='object-cover object-center' alt={alt} {...rest} />
    </div>
  );
};

export type PostImagesProps = HTMLAttributes<HTMLDivElement> & {
  images: string[];
};
const PostImages: FC<PostImagesProps> = ({ images, id, ...rest }) => {
  if (!images.length) return null;

  return (
    <PostImagesWrapper quantity={images.length} {...rest}>
      {images.map((image, i) => (
        <PostImage src={image} alt={`Foto ${i}`} key={`post-${id}-img-${i}`} />
      ))}
    </PostImagesWrapper>
  );
};

export type PostCommentsProps = HTMLAttributes<HTMLDivElement> & {
  comments: Comment[];
};
const PostComments: FC<PostCommentsProps> = ({
  className = '',
  comments,
  ...rest
}) => {
  if (!comments.length)
    return (
      <div className={cn('w-full p-4 text-center', className)} {...rest}>
        <span className='text-muted-foreground w-full text-xl'>
          Aun no hay ningun comentario.
        </span>
      </div>
    );

  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      {comments.map((comment, index) => (
        <Post key={`comment-${index}`}>
          <PostAvatar
            avatar={comment.user.avatar}
            username={comment.user.username}
          />
          <PostContent>
            <PostUser
              role={comment.user.role}
              username={comment.user.username}
            />
            <PostText text={comment.text} />
            <PostImages className='mt-3' images={comment.images} />
          </PostContent>
        </Post>
      ))}
    </div>
  );
};

export type PostLikeProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> &
  Pick<PostType, 'id'> & {
    likes?: number;
    liked?: boolean;
    onLike?: (postId: number) => void;
  };

const PostLike: FC<PostLikeProps> = ({
  id,
  likes = 0,
  liked = false,
  className = '',
  onLike = () => undefined,
}) => {
  const elementId = `post-${id}-like`;

  return (
    <div
      className={cn(
        'hover:text-like group data-[liked=true]:text-like inline-flex items-center gap-0.5',
        className,
      )}
      data-liked={liked}
    >
      <Button
        id={elementId}
        className='hover:text-like group-data-[liked=true]:[&>svg]:fill-like size-fit rounded-full p-1'
        variant='ghost'
        onClick={() => onLike(id)}
      >
        <Rocket />
      </Button>

      {/* Using W-8 for better UX */}
      <Label
        className='w-8 cursor-pointer transition-colors'
        htmlFor={elementId}
      >
        {likes}
      </Label>
    </div>
  );
};

const PostCommentsCounter: FC<
  HTMLAttributes<HTMLDivElement> & { quantity?: number }
> = ({ quantity = 0 }) => {
  return (
    <div className='text-accent-foreground inline-flex items-center gap-1'>
      <MessageSquare className='size-4' />
      <span className='text-sm'>{quantity}</span>
    </div>
  );
};

const PostDate: FC<
  HTMLAttributes<HTMLSpanElement> & { date: PostType['date'] }
> = ({ className = '', date }) => {
  return (
    <span className={cn('text-muted-foreground text-sm', className)}>
      {formatISODate(date)}
    </span>
  );
};

export {
  Post,
  PostAvatar,
  PostContent,
  PostText,
  PostUser,
  PostImagesWrapper,
  PostImage,
  PostImages,
  PostComments,
  PostLike,
  PostCommentsCounter,
  PostDate,
};
