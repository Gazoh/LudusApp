import React from 'react'
import styled from 'styled-components'

interface ModalContentProps {
  children: any,
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className}) => {
  return <StyledModalContent className={className}>{children}</StyledModalContent>
}

export const StyledModalContent = styled.div`
  padding: ${(props) => props.theme.spacing[4]}px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    overflow: auto;
  }
`

export default ModalContent
