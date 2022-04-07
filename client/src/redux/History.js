import {createSlice} from '@reduxjs/toolkit'


const historySlice = createSlice({
    name : "history",
    initialState : {
       history : [],
       display : false   
    },
    reducers : {
        addHistory :(state,actions)=>{
            state.history=  state.history.filter( h=> h._id !== actions.payload._id);
            state.history.push(actions.payload)
            
            
        },
        deleteHistory :(state,actions)=>{
            state.history = state.history.filter(h => h._id !== actions.payload )
       },
        displayHistory :(state,actions)=>{
            state.display = actions.payload
        //    state.history = state.history.filter(h =>  )
       },
         
    }
})
export const {addHistory,deleteHistory,displayHistory} = historySlice.actions
export default historySlice.reducer