import { handleError } from '@rock/lib/error';
import { mockPosts } from '@rock/lib/mock-posts';
import { deleteFromIndex, timeout } from '@rock/lib/utils';
import { Comment } from '@rock/models/comment.model';
import { NewPostForm } from '@rock/models/post.model';
import { PostsState } from '@rock/models/posts-state.model';
import { User } from '@rock/models/user.model';

import { postSchema } from '@rock/schemas/post.schema';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import { z } from 'zod';

export const getPosts = createAsyncThunk(
  'getPosts',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Simulate api request
      await timeout(1500);

      // In a real world case validate object structure and transform if necessary
      const parsedPosts = z.array(postSchema).parse(mockPosts);

      return fulfillWithValue(parsedPosts);
    } catch (error) {
      rejectWithValue(handleError(error));
    }
  },
);

const initialState: PostsState = {
  list: [],
  loading: true,
  fullfilled: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment(
      state,
      {
        payload: { comment, postId },
      }: PayloadAction<{ postId: number; comment: Omit<Comment, 'id'> }>,
    ) {
      const postIndex = state.list.findIndex((post) => post.id === postId);

      if (postIndex === -1) return;

      state.list[postIndex].comments.unshift({
        ...comment,
        id: state.list.length + 1,
      });
    },
    createPost(
      state,
      {
        payload: { post, user },
      }: PayloadAction<{ user: User; post: NewPostForm }>,
    ) {
      state.list.unshift({
        id: state.list.length + 1,
        user,
        comments: [],
        date: formatISO(new Date()),
        likes: [],
        ...post,
      });
    },

    likePost(
      state,
      {
        payload: { postId, user },
      }: PayloadAction<{ postId: number; user: User }>,
    ) {
      const postIndex = state.list.findIndex((post) => post.id === postId);

      if (postIndex === -1) return;

      const userLikeIndex = state.list[postIndex].likes.findIndex(
        (like) => like.id === user.id,
      );

      if (userLikeIndex === -1) {
        state.list[postIndex].likes.push(user);

        return;
      }

      const likes = state.list[postIndex].likes

      const newState = deleteFromIndex<typeof likes[0]>(
        likes,
        userLikeIndex,
      );

      state.list[postIndex].likes = newState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload: newPosts }) => {
        if (!newPosts?.length) return;

        state.loading = false;
        state.error = false;
        state.fullfilled = true;
        state.list = newPosts;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.list = [];
      });
  },
});

export const { addComment, likePost, createPost } = postsSlice.actions;

export default postsSlice;
