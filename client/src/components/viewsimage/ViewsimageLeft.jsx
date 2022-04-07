import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ArrowBackIos, ArrowForwardIos, Close, Facebook, LocalOffer, ZoomIn, ZoomInOutlined, ZoomOut, ZoomOutMap } from "@material-ui/icons";
import { useHistory, useLocation } from 'react-router-dom';
import { userRequest } from '../../requestMethod';
const Container = styled.div`
    position: relative;
    flex: 7;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
`
const IconsLeft = styled.div`
     display: flex;
     z-index: 333;
    align-items: center;
    position: absolute;
    left: 15px;
    top: 5px;
`
const IconsRight = styled.div`
     display: flex;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 5px;
    z-index: 333;
`
const Icon = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 25px;
    border-radius: 50%;
     color: white;
`
const Image = styled.img`
    height: 100%;
    ${
      props => props.maxview ?  ` width: 30%;` :` width: 50%;`
    }
   
    object-fit: cover;
    transition: 0.5s;
    ${
        props => `transform: scale(${props.zoom});`
    }
    
`
const Arrow = styled.div`
     display: flex;
     z-index: 111;
    align-items: center;
    justify-content: center;
    background-color:rgb(16,16,16);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    :hover{
        color: white;
        transition: 0.3s;
        ${
       props => props.vt ? 'right: 10px;' : "left: 10px;"
   }
    }
    top: 50%;
    color: rgb(95,96,97);
   ${
       props => props.vt ? 'right: 15px;' : "left: 15px;"
   }
`
export default function ViewsimageLeft({post,setMaxView,maxView}) {
    const history = useHistory();
  
  const[index,setIndex] = useState(0);
  const[images,setImages]= useState([])
  const[zoom,setZoom]= useState(1)
  useEffect(()=>{
  post!== null &&  setImages(post.img);
  },[post])
  const HandleSlice =(type)=>{
     
      if (type==='del') {
          index <=0 ? setIndex(images.length-1) : setIndex(index-1);
      }else{
        index >=images.length-1 ? setIndex(0) : setIndex(index+1);
      }
      setZoom(1);
  }
  const HandleZoom =(type)=>{
    if (type==='del') {
        zoom <=1.2 ? setZoom(1) :setZoom(zoom - 0.2);
    }else{
        zoom >=1.8 ? setZoom(2) :setZoom(zoom + 0.2);
    }
}
  
  return (
   <Container>
      <IconsLeft> 
          <Icon onClick={()=> history.push('/')}> <Close style={{fontSize : '30px'}} />  </Icon>
           <Icon  ><Facebook style={{fontSize : '40px',color : 'blue'}} /> </Icon>
           
      </IconsLeft>
      <Arrow onClick={ ()=>images.length >0 && HandleSlice('del')} > <ArrowBackIos /> </Arrow>
      <Image maxview={maxView} zoom={zoom} src={ post!== null && images[index]} />
      <Arrow onClick={ ()=>images.length >0 && HandleSlice('add')}  vt='right' > <ArrowForwardIos /> </Arrow>
      <IconsRight>
          <Icon><ZoomIn onClick={ ()=>HandleZoom('add')} /> </Icon>
          <Icon><ZoomOut onClick={ ()=>HandleZoom('del')}/> </Icon>
          <Icon><LocalOffer/> </Icon>
        
          <Icon onClick={()=> setMaxView(!maxView)}>
          <ZoomOutMap />
              
               </Icon>
      </IconsRight>

   </Container>
  )
}
