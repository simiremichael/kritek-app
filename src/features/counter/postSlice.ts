import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Posts {
  id: number
  title: string
  category: string
  price: string
  description: string
  image: string
}

 interface PostResponse {
  post: Posts |null;
 } 

const initialState: PostResponse = {
   post:  null
};

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    postState: (state, action: PayloadAction<Posts>) => {
      state.post = action.payload;
    },
  },
});


export default postSlice.reducer;
export const { postState } = postSlice.actions;
