import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'
import { ToastContainer } from 'react-toastify'

import ModalsProvider from './contexts/Modals'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import StakingContent from './views/Staking/StakingContent'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <>
      <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
      <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
      <Switch>
        <Route path="/" exact>
          <StakingContent />
        </Route>
      </Switch>
    </>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <UseWalletProvider
        chainId={parseInt(process.env.REACT_APP_NETWORK_ID)}
        connectors={{
          walletconnect: {
            rpcUrl: 'https://mainnet.eth.aragon.network/',
          },
        }}>
        <ModalsProvider>{children}</ModalsProvider>
      </UseWalletProvider>
      <ToastContainer limit={3} />
    </React.Fragment>
  )
}


export default () => (
  <Providers>
    <Router>
      <App />
    </Router>
  </Providers>
)
