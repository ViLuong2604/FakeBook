import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../../requestMethod'
import Comment from './Comment'
import FormComment from './FormComment'

const Container = styled.div`
  width: 100%;
  transition: 0.3s;
 padding-bottom: 15px;
`
export default function CommentContainer({post,type}) {
  const[comments,setComments] = useState([]);
  const[rootComments,setRootComments] = useState([]);
  const[activeComment,setActiveComment] = useState(null)
  useEffect(()=>{
   const getComment = async ()=>{
     const res = await userRequest.get(`comment/${post._id}`)
     setComments(res.data)
   }
   post !== null && getComment();
  },[post])
  const getReplies = (commentId) =>
    comments
      .filter((backendComment) => backendComment.parenid === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  useEffect( ()=>{
    const root = comments.filter(
      (backendComment) => backendComment.parenid === null
    );
       setRootComments(root.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) )
      
   },[comments])  
  return (
   <Container>
     <FormComment post={post} type={type} comments={comments} setComments={setComments} />
     {
      rootComments.map( c =>{
        return <>
           <Comment type={type} cmt={c} post={post} activeComment={activeComment} setActiveComment={setActiveComment} comments={comments} setComments={setComments}/>
           {
             getReplies(c._id).length >0 && getReplies(c._id).map(c=> <Comment type={type} style='reply' cmt={c}
             activeComment={activeComment} post={post} setActiveComment={setActiveComment} comments={comments} setComments={setComments}/>)
           }
        </>
      } )
     }
     
   </Container>
  )
}
