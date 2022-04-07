import {createSlice} from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name : "modal",
    initialState : {
       display : false   
    },
    reducers : {
        hiddenModal :(state,actions)=>{
            state.display = actions.payload
            
        }
         
    }
})
export const {hiddenModal} = modalSlice.actions
export default modalSlice.reducer