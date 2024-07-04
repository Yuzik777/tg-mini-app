export type Specialist = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  image: string;
}

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // В миллисекундах?
  image?: string;
}

export type Reservation = {
  id: string;
  startTime: Date; // В миллисекундах?
  serviceId: string;
}

export type ReservationInfo = Reservation & {
  service: Service;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';