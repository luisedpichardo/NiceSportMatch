import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

const lastChatsSlice = createSlice({
  name: 'last chats',
  initialState,
  reducers: {
    onAddChats: (state, action) => {
      return [...state, action.payload.sender];
    },
    onRemoveChats: (state, action) => {
      return state.filter((sender: string) => sender !== action.payload.sender);
    },
  },
});

export default lastChatsSlice.reducer;
