import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/modal/Modal';
import ViewsimageLeft from '../../components/viewsimage/ViewsimageLeft';
import ViewsimageRight from '../../components/viewsimage/ViewsimageRight';
import { userRequest } from '../../requestMethod';

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
`
export default function ImageViews() {
  const postId = useLocation().pathname.split('/')[2];
  const[maxView,setMaxView] = useState(false)
  const[post,setPost] = useState(null);
  const hiddenModal = useSelector(state => state.comments.hiddenModal)
  useEffect( ()=>{
    const getPost = async ()=>{
      const res = await userRequest(`posts/${postId}`);
      setPost(res.data)
    }
    getPost();
 },[postId])
  return (
   <Container>
     {
       hiddenModal === true &&  <Modal />
     }
   
    
     <ViewsimageLeft setMaxView={setMaxView} maxView={maxView} post={post} />
         
    {

      !maxView && <ViewsimageRight post={post} />
    }

     
   </Container>
  )
}
