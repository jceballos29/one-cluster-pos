import { createSlice } from '@reduxjs/toolkit';
import { Database } from '../../types';

export interface PosState {
  databases: Array<Database>;
}

const initialState: PosState = {
  databases: [],
};

const databaseSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    setDatabases: (state, action) => {
      return {
        ...state,
        databases: action.payload,
      };
    },
  },
});

export const { setDatabases } = databaseSlice.actions;

export default databaseSlice.reducer;