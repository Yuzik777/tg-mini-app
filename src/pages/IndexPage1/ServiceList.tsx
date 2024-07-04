import React from 'react';
import { useMemo, type FC } from 'react';
import { Info, Card, List, Headline, Spinner } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { FetchStatus, Service } from '@/types'

const ServiceCard: FC<{ service: Service, onClick: () => any }> = ({ service, onClick }) => {
  return (
    <Card onClick={onClick} style={{
      width: '100%',
      //padding: '0 0 20px 0'
    }}>
      <img
        src={service.image}
        style={{
          objectFit: 'cover',
          width: '100vw',
          height: 150,
        }} />
      <CardCell
        after={<Info type='text' subtitle={service.duration + ' минут'}>{service.price + '$'}</Info>}
        before={<Headline>{service.name}</Headline>}
      //style={{padding: '12px'}}
      />
    </Card>
  );
}

interface ServiceListProps {
  services: Service[],
  status: FetchStatus,
  onClick: (service: Service) => any
}

const ServiceList: FC<ServiceListProps> = ({ services, status, onClick }) => {
  const serviceItems = useMemo(() => services.map(
    service =>
      <ServiceCard
        service={service}
        key={service.id}
        onClick={() => onClick(service)}
      />),
    [services, onClick]);

  if (status !== 'success') {
    return <Spinner size='l' />
  }

  return (
    <List style={{
      marginTop: 20, width: '90vw',
    }}>
      {...serviceItems}
    </List>
  );
}

export default React.memo(ServiceList);