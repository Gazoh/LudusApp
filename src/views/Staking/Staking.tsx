import React from 'react'
import { Switch } from 'react-router-dom'

import Page from '../../components/Page'
import FarmsContent from './StakingContent'

const Farms: React.FC = () => {
  return (
    <Switch>
      <div className='main-wrap'>
        <Page>
          <FarmsContent />
        </Page>
      </div>
    </Switch>
  )
}

export default Farms
