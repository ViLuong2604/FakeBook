import { Gamepad, Group, GroupAdd, GroupAddTwoTone, GroupTwoTone, GroupWorkRounded, GroupWorkSharp, Home, LiveTv } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
flex: 5;
    display: flex;
    height: 100%;
    align-items: center;
    
`
const Icons = styled.div`
   flex: 1;
   
   height: 80%;
   display: flex;
   align-items: center;
   justify-content: center;
   *{
    font-size: 30px;
   }
`
export default function Center() {
  return (
    <Container>
        <Icons> <Home /> </Icons>
        <Icons> <Group /> </Icons>
        <Icons> <LiveTv /> </Icons>
        <Icons> <GroupWorkRounded /> </Icons>
        <Icons> <Gamepad /> </Icons>
    </Container>
  )
}
