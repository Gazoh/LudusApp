import React from 'react'
import styled from 'styled-components'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <div className='modal-actions-btm'>
      <StyledModalActions>
        {React.Children.map(children, (child, i) => (
          <>
            <StyledModalAction>
              {child}
            </StyledModalAction>
          </>
        ))}
      </StyledModalActions>
    </div>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  display: flex;
  margin: 0;
`

const StyledModalAction = styled.div`
  flex: 1;
`

export default ModalActions