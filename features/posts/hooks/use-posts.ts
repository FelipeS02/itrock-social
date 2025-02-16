import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@rock/hooks/redux-hooks';

import { getPosts } from '@rock/store/slices/posts.slice';

export default function usePosts() {
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState(false);

  const posts = useAppSelector((state) => state.posts, shallowEqual);

  // Initialize store
  useEffect(() => {
    if (!mounted) return setMounted(true);

    if (!posts.fullfilled) dispatch(getPosts());
  }, [dispatch, mounted, posts.fullfilled]);

  return { posts, dispatch };
}
