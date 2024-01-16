import {createSlice} from  "@reduxjs/toolkit"

const Name = createSlice({
    name : "name",
    initialState : {
        name : "",
        // cnmae: ""
    },
    reducers: {
        updateName : (state, action)=>{
            state.name = action.payload
        }
        // updateCname
    }
})

export const {updateName} = Name.actions
export default Name.reducer