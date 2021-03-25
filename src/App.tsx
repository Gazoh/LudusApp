import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import VBTCProvider from './contexts/VBTCProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Staking'
import Home from './views/Home'
import Stake from './views/Stake'
import { useTracking } from './hooks/useTracking'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary'

import 'react-toastify/dist/ReactToastify.css'
import RollbarErrorTracking from './errorTracking/rollbar'

const ErrorFallback = (any: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{any.error.message}</pre>
    </div>
  )
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  RollbarErrorTracking.logErroInfo(info)
  RollbarErrorTracking.logErrorInRollbar(error)
}

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])
  useTracking('UA-179869676-1')

  return (
    <>
      <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
      <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
      <Switch>
        <Route path="/" exact>
        <Farms />
        </Route>
      </Switch>
    </>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={parseInt(process.env.REACT_APP_NETWORK_ID)}
        connectors={{
          walletconnect: {
            rpcUrl: 'https://mainnet.eth.aragon.network/',
          },
        }}
      >
        <VBTCProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </VBTCProvider>
      </UseWalletProvider>
      <ToastContainer limit={3} />
    </ThemeProvider>
  )
}


export default () => (
  <Providers>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </Providers>
)
