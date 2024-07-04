import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import * as mocks from '../mocks';
import { FetchStatus, Service } from '@/types';
import { RootState } from '../store';

const servicesAdapter = createEntityAdapter<Service>();

const initialState = servicesAdapter.getInitialState({
  status: 'idle' as FetchStatus
});

export const fetchServices = createAsyncThunk('services/fetch', async () => {
  const response = await mocks.waitFor(mocks.services, 4000);
  return response;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        servicesAdapter.setAll(state, action.payload);
        state.status = 'success';
      })
  },
});

export const {
  selectAll: selectServices,
  selectEntities: selectServiceEntities
} = servicesAdapter.getSelectors((state: RootState) => state.services);

export const selectServicesStatus = (state: RootState) => state.services.status;

export default servicesSlice.reducer;
