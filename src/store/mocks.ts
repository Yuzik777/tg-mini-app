import { Reservation, Service, Specialist } from "@/types";
import { addDays, addHours, startOfDay } from 'date-fns';

export const specialist: Specialist = {
  id: '1',
  name: 'Светлана',
  description: 'Коуч/Психолог',
  avatar: '../../../assets/avatar.jpeg',
  image: 'https://i.imgur.com/892vhef.jpeg'
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Первичная консультация',
    image: 'https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22300_1648697030578743.jpg',
    description: 'Продам гараж',
    duration: 60,
    price: 30
  },
  {
    id: '2',
    name: 'Консультация',
    image: 'https://www.therapytribe.com/wp-content/uploads/2023/10/What-is-Psychotherapy-TherapyTribe.png',
    description: 'Обычная консультация',
    duration: 60,
    price: 50
  },
  {
    id: '3',
    name: 'Гадание на Таро',
    image: 'https://miro.medium.com/v2/resize:fit:1024/0*uHUUxJ0BbxE0k5yF.jpg',
    description: 'Предскажу курс $DOGE по картам',
    duration: 60,
    price: 100
  },
  {
    id: '4',
    name: 'Парная консультация',
    image: 'https://circlevha.ie/wp-content/uploads/2023/05/counselling-and-supports-1024x683.jpg',
    description: 'Помогу разобраться в отношениях',
    duration: 60,
    price: 120
  }
];

export const userReservations: Reservation[] = [
  {
    id: '1',
    serviceId: '1',
    startTime: addHours(addDays(startOfDay(new Date()), 1), 18)
  },
  {
    id: '2',
    serviceId: '3',
    startTime: addHours(addDays(startOfDay(new Date()), 7), 11)
  }
];

export const getNewReservation = (props: any) => ({ ...props, id: Math.random() + '' } as Reservation);

export const waitFor = <T>(res: T, timeout: number) =>
  new Promise<T>(
    resolve => setTimeout(
      () => resolve(res), timeout
    )
  );