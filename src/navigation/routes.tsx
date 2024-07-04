import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage1/IndexPage';
import { PickDatePage } from '@/pages/PickDatePage';
import { PickTimePage } from '@/pages/PickTimePage';
import { ReservationConfirmationPage } from '@/pages/ReservationConfirmationPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/pickDate', Component: PickDatePage, title: 'Pick Date' },
  { path: '/pickTime', Component: PickTimePage, title: 'Pick Time' },
  { path: '/confirmReservation', Component: ReservationConfirmationPage, title: 'Confirm Reservation' },
];
