import { ReservationInfo } from "@/types"
import { Badge, ButtonCell, Card, Cell } from "@telegram-apps/telegram-ui"
import { Icon24Channel } from "@telegram-apps/telegram-ui/dist/icons/24/channel"
import React from "react"
import { FC } from "react"

const NextReservationCard: FC<{
  userReservationCount: number,
  nextReservationInfo: ReservationInfo | null
}> = ({ userReservationCount, nextReservationInfo }) => {
  return userReservationCount > 0 && nextReservationInfo &&
    <Card style={{ width: '90vw', marginTop: '20px' }}>
      <Cell
        subtitle={nextReservationInfo.service.name}
        description={new Date(nextReservationInfo.startTime).toLocaleString()}
        after={<Badge type='number'>{userReservationCount}</Badge>}
      >
        Следующая запись:
      </Cell>
      <ButtonCell before={<Icon24Channel />}>Мои записи</ButtonCell>
    </Card>
}

export default React.memo(NextReservationCard);