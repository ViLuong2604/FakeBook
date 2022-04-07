import { Close, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { addHistory, displayHistory } from '../../redux/History'

import { userRequest } from '../../requestMethod'
import DropdownItems from './DropdownItems'

const Container = styled.div`
    display: flex;
    flex: 2.5;
    position: relative;
    align-items: center;
    *{
      margin-left: 10px;
    }
`
const Logo = styled.img`
width: 40px;
height: 40px;
object-fit: contain;
border-radius: 50%;
cursor: pointer;
`
const Search = styled.div`
  display: flex;
    height: 40px;
    align-items: center;
    width: 80%;
    border-radius: 25px;
     background-color: rgb(176,228,233);
    position: relative;
    
`
const Icon = styled.div`
 position: absolute;
 font-size:  12px;
 left: -15px;
  
`
const Input = styled.input`
  height: 80%;
  width: 80%;
  margin-left: 25px;
  background-color: rgb(176,228,233);
  border: none;
  :focus{
    outline: none;
  }

`
const Dropdown = styled.div`
  /* -webkit-box-shadow: 0px 0px 16px -8px rgba(116, 56, 56, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(114, 71, 71, 0.68); */
  width: 95%;
  /* border: 1px solid black; */
  padding: 5px;
  position: absolute;
  z-index: 12;
  /* background-color: black; */
  top: 45px;
  left: -10px;
  transition: 0.3s;
  background-color: rgb(2,175,174);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-bottom: 20px;
`
const Tkgd = styled.div`
margin-left: 15px;
margin-top: 15px;
display: flex;
color: white;
font-weight: 500;
/* justify-content: space-between; */
width: 100%;


`
const P = styled.p`

 
`


export default function Left() {
  const[search,setSearch]=useState('');
  const[users,setUsers]= useState([]);
  const [userSearch,setUserSearch]=useState([]);
  const typingTimeoutRef = useRef(null);
  const typingdisplay = useRef(null);
  const {currentUser} = useSelector(state => state.user);
   const uhistory = useHistory();
  //  const[display,setDisplay]  = useState(null)
   const  {history,display} = useSelector(state =>  state.history);
  const dispath = useDispatch();
  useEffect(()=>{
    const getUsers = async ()=>{
      const res= await userRequest.get('users/');
      setUsers(res.data)
    }
    // document.addEventListener('click', (event) => {
    //   dispath(displayHistory(false));
    
    // });
    getUsers();
    
  },[]);
 
  
  const handleSubmit = (e)=>{
   const value = e.target.value;
    setSearch(value)
   if(typingTimeoutRef.current){
     clearTimeout(typingTimeoutRef.current)
   }
    
   typingTimeoutRef.current = setTimeout(() => {
     
     setUserSearch(users.filter(u => u.username.includes(value.trim())))
   }, 300);
    
  }
  
  const displayHandle = (e)=>{
    if(typingdisplay.current){
      clearTimeout(typingdisplay.current)
    }
    typingdisplay.current = setTimeout(() => {
      dispath(displayHistory(e))
     
    }, 400);
  }
  // 
  return (
    <Container >
       <Logo onClick={()=> uhistory.push(`/`)} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' />
       <Search >
         <Icon  >
            <SearchOutlined />
         </Icon>
         
     
         <Input  onMouseEnter={ ()=> displayHandle(true)} onChange={handleSubmit}  placeholder='Tìm kiếm bạn bè....' />
   
       </Search> 
       {
        display &&  <Dropdown  onMouseLeave={ ()=> displayHandle(false)} >
         <Tkgd> 
           {
              search.length === 0 &&  
              <P style={{ marginRight : '45px'}}>Tìm kiếm gần đây</P>
           }
           
           {/* <P>Chỉnh sửa</P> */}
         </Tkgd>
         {
          search.length > 0 ? 
          <>
          {
              userSearch.slice(0,8).map( u => <DropdownItems  key={u._id} user={u} /> )
            }
          </> :
          <>
           {
            history.slice(0,8).map( u => <DropdownItems type='history' key={u._id} user={u} /> )
            }
          </>
          
        
         }
         
         
      
         
        
         
     </Dropdown>
       }
     

    </Container>
  )
}
