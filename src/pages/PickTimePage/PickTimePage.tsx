import GridList from '@/components/GridList';
import { Chip, Divider, List, Title } from '@telegram-apps/telegram-ui';
import { useLaunchParams, useMainButton } from '@tma.js/sdk-react';
import { addHours, format, startOfDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TimeSlot = {
  start: Date,
  free?: boolean,
  mine?: boolean,
  selected?: boolean
}
const createTimeSlots = (start: Date, finish: Date, interval: number) => {
  const slots: TimeSlot[] = [];
  let current = start;
  while (current <= finish) {
    slots.push({
      start: current,
      free: Math.random() > 0.5 ? true : false
    });
    current = addHours(current, interval);
  }
  return slots;
}

const keyExtractor = (slot: TimeSlot) => slot.start.getTime();

export const PickTimePage: FC = () => {
  const navigate = useNavigate();
  const { date, service } = useLocation().state;
  const [selectedSlot, setSelectedSlot] = useState<Date>();
  const isAndroid = useLaunchParams().platform === 'android';
  const mainButton = useMainButton();

  const timeSlots = useMemo(() => {
    const dayStart = startOfDay(date);
    return createTimeSlots(addHours(dayStart, 8), addHours(dayStart, 18), 0.5);
  }, [date]);

  const renderItem = useCallback((slot: TimeSlot) => {
    const selected = selectedSlot === slot.start;
    const disabled = !slot.free || (Date.now() > slot.start.getTime());
    return <Chip
      style={{ backgroundColor: selected ? 'green' : '', width: '20vw', textAlign: 'center' }}
      mode={!disabled ? 'elevated' : 'mono'}
      disabled={disabled}
      onClick={() => slot.free && !disabled && setSelectedSlot(slot.start)}
    >
      {format(slot.start, 'HH:mm')}
    </Chip>;
  }, [selectedSlot, setSelectedSlot]);

  useEffect(() => {
    const isTimeSelected = !!selectedSlot;
    mainButton.setParams({
      isEnabled: isTimeSelected,
      isVisible: !isAndroid || isTimeSelected ? true : false,
      text: 'Далее'
    });
    const onMainClick = () => navigate('/confirmReservation', { state: { date: selectedSlot, service } });
    mainButton.on('click', onMainClick);
    return () => {
      mainButton.off('click', onMainClick);
    };
  }, [selectedSlot, service]);

  //<Button onClick={() => navigate('/confirmReservation', { state: { date: selectedSlot, service } })}>Go</Button>
  return (
    <List style={{ padding: 20 }}>
      <Title style={{ paddingTop: 10, paddingLeft: 10 }}>Виберите время</Title>
      <Divider style={{ height: 10 }} />
      <GridList
        items={timeSlots}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        cols={4}
      />
    </List>
  );
}