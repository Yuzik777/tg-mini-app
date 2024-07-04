import { configureStore } from '@reduxjs/toolkit';
import specialistReducer from './modules/specialist';
import servicesReducer from './modules/services';
import userReservationsReducer from './modules/userReservations';

export const store = configureStore({
  reducer: {
    specialist: specialistReducer,
    services: servicesReducer,
    userReservations: userReservationsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;