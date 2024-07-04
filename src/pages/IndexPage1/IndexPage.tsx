import { Spinner } from '@telegram-apps/telegram-ui';
import { useCallback, useEffect, type FC } from 'react';
import styles from './product.module.css';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSpecialist, getSpecialistInfo, getSpecialistInfoStatus } from '@/store/modules/specialist';
import ServiceList from './ServiceList';
import { fetchServices, selectServices, selectServicesStatus } from '@/store/modules/services';
import { fetchUserReservations, selectNextReservationInfo, selectUserReservationsCount, selectUserReservationsStatus } from '@/store/modules/userReservations';
import NextReservationCard from './NextReservationCard';
import SpecialistCard from './SpecialistCard';

export const IndexPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const specialist = useAppSelector(getSpecialistInfo);
  const specialistStatus = useAppSelector(getSpecialistInfoStatus);
  const services = useAppSelector(selectServices);
  const servicesStatus = useAppSelector(selectServicesStatus);
  const userReservationStatus = useAppSelector(selectUserReservationsStatus);
  const userReservationCount = useAppSelector(selectUserReservationsCount);
  const nextReservationInfo = useAppSelector(selectNextReservationInfo);

  useEffect(() => {
    specialistStatus === 'idle' && dispatch(fetchSpecialist());
  }, [specialistStatus]);

  useEffect(() => {
    servicesStatus === 'idle' && dispatch(fetchServices());
  }, [servicesStatus]);

  useEffect(() => {
    userReservationStatus === 'idle' && dispatch(fetchUserReservations());
  }, [userReservationStatus]);

  /*let mainButton: MainButton;

  useEffect(() => {
   [mainButton] = initMainButton();
    mainButton.enable().show().setText('Записаться');
    const onMainClick = () => navigate('/pickDate');
    mainButton.on('click', onMainClick);
    return () => {
      mainButton.hide();
      mainButton.off('click', onMainClick);
    };
  }, []);
  */

  const navigateToDatePicker = useCallback(
    (service: Service) => navigate('/pickDate', { state: { service } }),
    [navigate]
  );

  if (specialistStatus !== 'success' || !specialist)
    return <Spinner size='l' />;

  return (
    <>
      <div
        className={styles.container}
        style={{ display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}
      >
        <SpecialistCard specialist={specialist} />
        <NextReservationCard
          nextReservationInfo={nextReservationInfo}
          userReservationCount={userReservationCount} />
        <ServiceList
          services={services}
          onClick={navigateToDatePicker}
          status={servicesStatus} />
      </div>
    </>
  );
};
