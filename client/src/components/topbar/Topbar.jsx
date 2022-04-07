import React from 'react'
import styled from 'styled-components'
import Center from './Center'
import Left from './Left'
import Right from './Right'


const Container = styled.div`
    height: 50px;
  width: 100%;
  background-color: rgb(2,175,174);
  display: flex;
  align-items: center;
  position: relative;
  position: sticky;
  top: 0;
  z-index: 999;
`

export default function Topbar() {
  return (
    <Container>
       <Left />
      <Center />
      <Right />
    </Container>
  )
}
