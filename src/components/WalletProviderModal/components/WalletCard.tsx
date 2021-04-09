import React from 'react'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'

import CustomButton from '../../CustomButton/CustomButton'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string,
  style?: any,
  className?: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title, style, className }) => {

  return (
    <Card style={style} className={className}>
      <CardContent>
        <CardIcon>{icon}</CardIcon>
        <CardTitle text={title} />
        <CustomButton className='button' onClick={async () => onConnect()}>Connect</CustomButton>
      </CardContent>
    </Card>
  )
}

export default WalletCard
