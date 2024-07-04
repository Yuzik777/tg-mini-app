import { Specialist } from "@/types"
import { Avatar, ButtonCell, Card, Info } from "@telegram-apps/telegram-ui"
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell"
import React from "react"
import { FC } from "react"


const SpecialistCard: FC<{
  specialist: Specialist
}> = ({ specialist }) => {
  return <Card style={{
    width: '90vw',
    //padding: '0 0 20px 0'
  }} >
    <img
      src={specialist.image}
      style={{
        objectFit: 'cover',
        width: '100vw',
        height: 200,
      }}
    />
    <CardCell
      readOnly
      after={<Info type='text' subtitle={specialist.description}>{specialist.name}</Info>}
      before={<Avatar size={96} src={specialist.avatar} />}
      style={{ padding: '12px' }}
    />
    <ButtonCell>Узнать больше</ButtonCell>
  </Card>
}

export default React.memo(SpecialistCard);