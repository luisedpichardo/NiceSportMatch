import { createSlice } from '@reduxjs/toolkit';

type address = {
  lat: number;
  long: number;
};

type Match = {
  _id: string;
  address: address;
  day: string;
  publisher: string;
  status: string;
  time: string;
};

const initialState: Match[] = [];

const myMatchesSlice = createSlice({
  name: 'my matches',
  initialState,
  reducers: {
    onAddMatch: (state, action) => {
      return [
        ...state,
        {
          _id: action.payload._id,
          address: action.payload.address,
          day: action.payload.day,
          publisher: action.payload.publisher,
          status: action.payload.status,
          time: action.payload.time,
        },
      ];
    },
    onRemoveMatch: (state, action) => {
      return state.filter((match: any) => match.match !== action.payload.match);
    },
  },
});

export default myMatchesSlice.reducer;
