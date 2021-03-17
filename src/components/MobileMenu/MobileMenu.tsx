import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import { NavLink } from 'react-router-dom'
import CustomButton from '../CustomButton/CustomButton'
import useModal from '../../hooks/useModal'
import WalletProviderModal from '../WalletProviderModal'
import Dropdown from 'react-bootstrap/esm/Dropdown'
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';

interface MobileMenuProps {
  onDismiss: () => void
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  

  if (visible) {
    return (
      <StyledMobileMenuWrapper>
        <StyledBackdrop onClick={onDismiss} />
        <StyledMobileMenu>
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
              {/* <CustomButton className='b-btn' onClick={onPresentAccountModal}>My Wallet</CustomButton> */}
              {/* <Button onClick={onPresentAccountModal} size="sm" text="My Wallet" /> */}
            </>
          )}
        </StyledMobileMenu>
      </StyledMobileMenuWrapper>
    )
  }
  return null
}

const StyledBackdrop = styled.div`
  background-color: ${(props) => props.theme.color.grey[600]}aa;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledMobileMenu = styled.div`
  animation: ${slideIn} 0.3s forwards ease-out;
  background-color: ${(props) => props.theme.color.grey[200]};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: calc(100% - 48px);
`

const StyledLink = styled(NavLink)`
  box-sizing: border-box;
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 24px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[3]}px
    ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
`

const StyledAbsoluteLink = styled.a`
  box-sizing: border-box;
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 24px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[3]}px
    ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
`

export default MobileMenu
