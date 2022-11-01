import { createSlice } from '@reduxjs/toolkit'
const initialState={
    value :[]
}
export const userSlice = createSlice ({
    name :'get_user',
    initialState,
    reducers:{
        setUsers:(state,action) =>{
            state.value = action.payload.value
        },
        setNewUsers:(state,action) =>{
            state.value = action.payload.value
        }
    }
})
export const {setUsers} = userSlice.actions
export default userSlice.reducer
