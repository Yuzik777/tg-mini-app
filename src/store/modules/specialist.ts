import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as mocks from '../mocks';
import { FetchStatus, Specialist } from '@/types';
import { RootState } from '../store';

interface specialistState {
  entity: Specialist | null,
  status: FetchStatus
}

const initialState: specialistState = {
  entity: null,
  status: 'idle'
};

export const fetchSpecialist = createAsyncThunk('specialist/fetch', async () => {
  const response = await mocks.waitFor(mocks.specialist, 1000);
  return response;
});

const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSpecialist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialist.fulfilled, (state, action) => {
        state.entity = action.payload;
        state.status = 'success';
      })
  },
});

export const getSpecialistInfo = (state: RootState) => state.specialist.entity;
export const getSpecialistInfoStatus = (state: RootState) => state.specialist.status;

export default specialistSlice.reducer;
