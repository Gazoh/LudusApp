import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import StrudelIcon from '../../components/StrudelIcon'
import AstroWave from '../../assets/img/astroWave.png'
import ThumbsUp from '../../assets/img/thumbs_up_astronaut.png'

import Button from '../../components/Button'
import Page from '../../components/Page'

import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core'

import MuiContainer from '@material-ui/core/Container'
import { TerraFarm } from '../../components/Lottie'
import Spacer from '../../components/Spacer'
import MuiPaper from '@material-ui/core/Paper'
import CustomButton from '../../components/CustomButton/CustomButton'
import FarmsContent from './StakingContent'

const Paper = withStyles({
  rounded: {
    'border-radius': '10px',
  },
  root: {
    margin: 'auto',
    '@media (min-width: 500px)': {
      width: '70%',
    },
    '& > *': {
      padding: '10px',
    },
  },
})(MuiPaper)
const Container = withStyles({
  root: {
    margin: 'auto',
    textAlign: 'center',
  },
})(MuiContainer)

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        <FarmsContent />
      </Page>
    </Switch>
  )
}

const StyledP = styled.p`
  text-align: center;
`

const StyledMulti = styled.span`
  font-size: 35px;
  font-family: 'azo-sans-web', Arial, Helvetica, sans-serif;
  font-weight: 700;
`

const StyledMoving = styled.div`
  & > div {
    height: 200px;
  }
`

export default Farms
