import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const publicationsSlice = createSlice({
  name: 'publications',
  initialState: [],
  reducers: {
    addComment(state, action: PayloadAction<number>) {
      
    },
    removeComment(
      state,
      action: PayloadAction<{ publicationId: number; commentId: number }>,
    ) {

    },
    likePublication(state, action: PayloadAction<number>) {

    },
  },
});

export const { addComment, likePublication, removeComment } =
  publicationsSlice.actions;

export default publicationsSlice;
