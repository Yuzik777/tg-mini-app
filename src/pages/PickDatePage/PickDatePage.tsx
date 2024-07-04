import { Section, List, Title, Divider } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';

import { useLaunchParams, useMainButton } from '@tma.js/sdk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
//import "react-day-picker/dist/style.css";
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useAppSelector } from '@/store/hooks';
import { selectUserReservations } from '@/store/modules/userReservations';
import { startOfDay } from 'date-fns';

export const PickDatePage: FC = () => {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const navigate = useNavigate();
  const mainButton = useMainButton();
  const isAndroid = useLaunchParams().platform === 'android';
  const { service } = useLocation().state;
  const userReservations = useAppSelector(selectUserReservations);

  const userReservationDays = userReservations.map(res => startOfDay(res.startTime));

  useEffect(() => { //TODO 
    const isDateSelected = !!selectedDate;
    mainButton.setParams({
      isEnabled: isDateSelected,
      isVisible: !isAndroid || isDateSelected ? true : false,
      text: 'Далее'
    });
    const onMainClick = () => navigate('/pickTime', { state: { date: selectedDate, service } });
    mainButton.on('click', onMainClick);
    return () => {
      mainButton.hide();
      mainButton.off('click', onMainClick);
    };
  }, [selectedDate, service]);

  /*
  <Section title='General information' style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <Button onClick={() => navigate('/pickTime', { state: { date: selectedDate, service } })}>Test</Button>
        </Section>
        */
  return (
    <div >
      <List style={{ padding: 20 }}>
        <Section title='Виберите дату' style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title style={{ paddingTop: 10, paddingLeft: 10 }}>Виберите дату</Title>
            <Divider style={{ height: 10 }} />
            <DayPicker //TODO вынести в компонент
              mode='single'
              classNames={defaultStyles}
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
              disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
              modifiers={{ myReservations: userReservationDays }}
              //modifiersClassNames={{ myReservations: styles1.orange }}
              modifiersStyles={{ myReservations: { backgroundColor: 'orange' } }}
            //userReservations=
            />
          </div>
        </Section>
      </List>
      <MainButton text='Выбрать время'></MainButton>
    </div>
  );
};
