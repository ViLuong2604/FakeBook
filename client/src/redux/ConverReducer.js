import {createSlice} from '@reduxjs/toolkit'


const converSlice = createSlice({
    name : "ballons",
    initialState : {
       conver : [],   
      

    },
    reducers : {
        openConver :(state,actions)=>{
             state.conver.push(actions.payload)
        },
        deleteConver :(state,actions)=>{
            state.conver = state.conver.filter(c => c !== actions.payload)
       },
         
    }
})
export const {openConver,deleteConver} = converSlice.actions
export default converSlice.reducer