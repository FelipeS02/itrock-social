import PostsList from '@rock/features/posts/posts-list';
import PostsWrapper from '@rock/features/posts/posts-wrapper';

export default function HomePage() {
  return (
    <PostsWrapper>
      <PostsList />
    </PostsWrapper>
  );
}
