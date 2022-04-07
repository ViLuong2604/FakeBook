import {createSlice} from '@reduxjs/toolkit'


const loadingSlice = createSlice({
    name : "loading",
    initialState : {
       loading : false,   
      

    },
    reducers : {
        setLoading :(state,actions)=>{
            state.loading = actions.payload
        },
        
         
    }
})
export const {setLoading} = loadingSlice.actions
export default loadingSlice.reducer