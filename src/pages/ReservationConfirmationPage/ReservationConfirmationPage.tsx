import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewReservation, selectUserReservationModificationStatus } from "@/store/modules/userReservations";
import { Service } from "@/types";
import { Button, Headline, Section, Snackbar, Spinner, Title } from "@telegram-apps/telegram-ui";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { FC, useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const ReservationConfirmationPage: FC = () => {
  const dispatch = useAppDispatch();
  const mainButton = useMainButton();
  const { date, service }: { date: Date, service: Service } = useLocation().state;
  const navigate = useNavigate();
  const status = useAppSelector(selectUserReservationModificationStatus);

  const onConfirmClick = useCallback(() => {
    dispatch(createNewReservation({ serviceId: service.id, startTime: date }));
  }, [service, date]);

  const onMainButtonClick = useCallback(() => {
    console.log(status);
    status == 'success' ? navigate(-3) : onConfirmClick()
  }, [onConfirmClick, navigate, status]);

  const bb = useBackButton();

  useEffect(() => {
    if (status === 'success') bb.on('click', () => navigate(-3));
    return () => {
    }
  }, [status, bb]);

  useEffect(() => {
    mainButton.setParams({
      isEnabled: status !== 'loading',
      isVisible: true,
      text: status == 'success' ? 'OK' : 'Записаться'
    });
    mainButton.on('click', onMainButtonClick);
    return () => {
      mainButton.off('click', onMainButtonClick);
      mainButton.hide();
    };
  }, [mainButton, status, onMainButtonClick]);

  return (
    <Section style={{ margin: 20, borderRadius: '20px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title style={{ marginTop: 10 }}>Подтвердите запись</Title>
        <Headline>{service.name}</Headline>
        <Headline>{date.toLocaleString()}</Headline>
        {status === 'success' && <Snackbar duration={4000} onClose={() => { }}>Запись успешна!</Snackbar>}
        {status === 'loading' && < Spinner size="l" />}
        <Button onClick={onMainButtonClick}>Записаться</Button>
        {status === 'success' && < Button onClick={() => navigate(-3)}>Ok</Button >}
      </div>
    </Section>
  )
}