import { Close } from '@material-ui/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setHiddenModal, setType } from '../../redux/comment';

const LopPhu = styled.div`
    
  position: absolute;
  z-index: 99999;
  width: 100vw;
  height: 100%;
  margin-top: -50px;
  padding-bottom: 50px;
  background-color: black;
  opacity: 0.2;
  overflow: hidden;
    
`
const Container = styled.div`
position: fixed;
z-index: 9999999;
border-radius: 5px;
overflow: hidden;
  top: 40%;
  left: 37vw;
    width: 450px;
	background-color: #fff;
	border-radius: 5px;
   background-color :white;
`
const Top =styled.div`
width: 100%;
background-color: rgb(2,175,174);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const P = styled.p`
    
`
const Main =styled.div`
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    *{
        margin-left: 10px;
    }
`
const Bottom =styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    height: 55px;
    
    *{
        margin-right: 15px;
        cursor: pointer;
        font-size: 15px;
    }
    >*{
    &:first-child{

    }
    &:nth-child(2){
        background-color: rgb(2,175,174);
        border: none;
        color: white;
    }}
`
const Button = styled.button`
height: 40px;
width: 70px;

`
export default function Modal() {
    const dispath = useDispatch();
    const handle = ()=>{
        dispath(setHiddenModal(false));
        dispath(setType('none'))
    }
    const handleDelete = ()=>{
        dispath(setHiddenModal(false));
        dispath(setType('delete'))
    }
  return (
      <>
      <LopPhu>
          </LopPhu>
 <Container>
                <Top>
                    <P style={{marginLeft : '10px',color : 'white'}}>Xóa bình luận ? </P>
                    <Close onClick={handle} style={{marginRight : '10px',cursor : 'pointer',color : 'white',fontSize : '35px'}} />
                </Top>
                <Main>
                    <p>Bạn có chắc muốn xóa bình luận này không ?</p>
                </Main>
                <Bottom>
                    <Button onClick={handle} >Không</Button>
                    <Button onClick={handleDelete} >Xóa</Button>
                </Bottom>
            </Container> 
      </>
            
  )
}
