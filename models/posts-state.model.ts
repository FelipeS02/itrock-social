import { Post } from './post.model';
import QueryState from './query-state.model';

export type PostsState = QueryState & {
  list: Post[];
};
