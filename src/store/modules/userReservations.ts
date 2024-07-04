import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import * as mocks from '../mocks';
import { FetchStatus, Reservation, ReservationInfo } from '@/types';
import { RootState } from '../store';
import { selectServiceEntities } from './services';

const userReservationsAdapter = createEntityAdapter<Reservation>({
  sortComparer: (a, b) => a.startTime.getTime() - b.startTime.getTime()
});

const initialState = userReservationsAdapter.getInitialState({
  status: 'idle' as FetchStatus,
  modificationStatus: 'idle' as FetchStatus
});

export const fetchUserReservations = createAsyncThunk('userReservations/fetch', async () => {
  const response = await mocks.waitFor(mocks.userReservations, 4000);
  return response;
});

export const createNewReservation = createAsyncThunk(
  'userReservations/create',
  async ({ serviceId, startTime }: { serviceId: string, startTime: Date }) => {
    const response = await mocks.waitFor(mocks.getNewReservation({
      serviceId,
      startTime,
    }), 4000);
    return response;
  });

const userReservationsSlice = createSlice({
  name: 'userReservations',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        userReservationsAdapter.setMany(state, action.payload);
        state.status = 'success';
      })
      .addCase(createNewReservation.pending, (state) => {
        state.modificationStatus = 'loading';
      })
      .addCase(createNewReservation.fulfilled, (state, action) => {
        state.modificationStatus = 'success';
        userReservationsAdapter.addOne(state, action.payload);
      })
  },
});

export const {
  selectAll: selectUserReservations,
  selectTotal: selectUserReservationsCount,
  selectEntities: selectUserReservationEntities
} = userReservationsAdapter.getSelectors((state: RootState) => state.userReservations);

export const selectUserReservationsStatus = (state: RootState) => state.userReservations.status;
export const selectUserReservationModificationStatus = (state: RootState) => state.userReservations.modificationStatus;

export const selectNextReservationId = (state: RootState) => state.userReservations.ids[0] || '';

export const selectNextReservation = createSelector(
  selectNextReservationId,
  selectUserReservationEntities,
  (id, reservations) => reservations[id] || null);

export const selectNextReservationInfo = createSelector(
  selectNextReservation,
  selectServiceEntities,
  (reservation, services) => {
    const service = services[reservation?.serviceId];
    const reservationInfo = reservation ? {
      ...reservation,
      service
    } as ReservationInfo :
      null;
    return reservationInfo;
  });

export default userReservationsSlice.reducer;
