import {createSlice} from '@reduxjs/toolkit'


const balloonsSlice = createSlice({
    name : "ballons",
    initialState : {
       ballons : [],   
    },
    reducers : {
        openBalloons :(state,actions)=>{
           state.ballons = state.ballons.filter(b => b !== actions.payload);
             state.ballons.push(actions.payload);
             
        },
        deleteBalloons :(state,actions)=>{
            state.ballons = state.ballons.filter(b => b!== actions.payload)
       },
         
    }
})
export const {openBalloons,deleteBalloons} = balloonsSlice.actions
export default balloonsSlice.reducer