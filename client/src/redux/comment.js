import {createSlice} from '@reduxjs/toolkit'


const commentSlice = createSlice({
    name : "comments",
    initialState : {
       hiddenModal : false,  
       type : '' 
    },
    reducers : {
        setHiddenModal :(state,actions)=>{
           
            state.hiddenModal = actions.payload
             
        },
        setType :(state,actions)=>{
           
            state.type = actions.payload
             
        }
         
    }
})
export const {setHiddenModal,setType} = commentSlice.actions
export default commentSlice.reducer