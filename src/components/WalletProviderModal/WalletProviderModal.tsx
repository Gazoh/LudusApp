import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import CustomButton from '../CustomButton/CustomButton'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal className='modal-wrapper'>
      <ModalTitle text="Select a wallet provider." />
      <ModalContent className='wallet-card'>
        <StyledWalletsWrapper className='wallet-wrap'>
          <StyledWalletCard className='styled-wallet-card'>
            <WalletCard
              style={{ boxShadow: 'none' }}
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          <StyledWalletCard className='styled-wallet-card'>
            <WalletCard
              style={{ boxShadow: 'none' }}
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <CustomButton className='button' onClick={onDismiss}>Cancel</CustomButton>
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-shadow: none;
`

const StyledWalletCard = styled.div`
`

export default WalletProviderModal
