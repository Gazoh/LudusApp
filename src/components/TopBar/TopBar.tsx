import React from 'react'
import Nav from './components/Nav'
import Logo from '../Logo'
import styled from 'styled-components'
import AccountButton from './components/AccountButton'
import Container from '../Container'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar id="topbar">
      <Container size="lg" className='topbar-container'>
        <StyledTopBarInner>
          <StyledLogoWrapper className='styled-logo-wrapper'>
            <Logo />
          </StyledLogoWrapper>
          <StyledNavWrapper>
            <Nav />
          </StyledNavWrapper>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
          <StyledMenuButton className='menu-btn-mob' onClick={onPresentMobileMenu}>
            <svg height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </StyledMenuButton>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  @media (max-width: 500px) {
    width: auto;
  }
`

const StyledTopBar = styled.div`
  position: sticky;
  top: 0;
  background: #0E7DFF;
  z-index: 99;
  border-bottom: 1px solid #E9E9E9;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  @media (max-width: 500px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: 500px) {
    justify-content: flex-end;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 500px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: flex-end;
    width: 44px;
  }
`

export default TopBar
