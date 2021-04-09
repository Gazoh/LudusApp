import React from 'react'
import useModal from '../../../hooks/useModal'
import styled from 'styled-components'
import WalletProviderModal from '../../WalletProviderModal'
import CustomButton from '../../CustomButton/CustomButton'
import Dropdown from 'react-bootstrap/Dropdown'
import copy from 'copy-to-clipboard';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { useWallet } from 'use-wallet'

interface AccountButtonProps { }

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  return (
    <StyledAccountButton className='styled-account-btn'>
      {!account ? (
        <>
          <a className='nav-item' href='https://playludus.io/' target='_blank'>Go to PlayLudus.io</a>
          <CustomButton className='b-btn' onClick={onPresentWalletProviderModal}>Connect to wallet</CustomButton>
        </>
      ) : (
        <>
          <a className='nav-item' href='https://playludus.io/' target='_blank'>Go to PlayLudus.io</a>
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
