import React from 'react'
import styled from 'styled-components';
import { EMOJI_ICON } from '../../constants';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
`
const Icons = styled.div`
    /* background-color:white; */
    width: 30px;
    height: 30px;
    /* border-radius: 50%; */
    display: flex;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    border-radius: 8px;
   :hover{
     background-color: rgb(62,64,66);
   }
  cursor: pointer;
`
export default function Emoji({setNewMessenger,newMessenger}) {
  const test = (s)=>{
    console.log(s);
  }
  return (
   <Container>
     {
       EMOJI_ICON.map((emoji,idx)=><Icons onClick={()=> setNewMessenger(newMessenger+ emoji.props.children)}
        key={idx}>{emoji}</Icons>

         
       )
     }
   </Container>
  )
}
