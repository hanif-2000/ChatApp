import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRooms, createRoom } from '../api/chatService';

export const fetchRooms = createAsyncThunk('chat/fetchRooms', async () => {
  return await getRooms();
});

export const createChatRoom = createAsyncThunk('chat/createRoom', async (name: string) => {
  return await createRoom(name);
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: { rooms: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => { state.loading = true; })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      });
  },
});

export default chatSlice.reducer;
