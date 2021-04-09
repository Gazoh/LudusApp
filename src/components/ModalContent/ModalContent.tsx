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
`

export default ModalContent
