import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import CustomButton from '../../CustomButton/CustomButton'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import Dropdown from 'react-bootstrap/Dropdown'
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AccountButtonProps { }

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton className='styled-account-btn'>
      {!account ? (
        <>
          <a className='nav-item' href='https://playludus.io/' target='_blank'>Go to PlayLudios.io</a>
          <CustomButton className='b-btn' onClick={onPresentWalletProviderModal}>Connect to wallet</CustomButton>
        </>
      ) : (
        <>
          <a className='nav-item' href='https://playludus.io/' target='_blank'>Go to PlayLudios.io</a>
          <Dropdown className='b-btn'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              My Wallet
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={() => {
                copy(account)
                toast("Copied address")
              }}>Copy address</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <CustomButton className='b-btn' onClick={onPresentAccountModal}>My Wallet</CustomButton> */}
          {/* <Button onClick={onPresentAccountModal} size="sm" text="My Wallet" /> */}
        </>
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default AccountButton
