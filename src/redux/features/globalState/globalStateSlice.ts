import { createSlice } from "@reduxjs/toolkit";


export const initialState : {isStream: string | null} = {
    isStream: null

}



const globalStateSlice = createSlice({
    name: 'globalState',
    initialState,
    reducers:{
        setIsStream : (state, action) => {
            state.isStream = action.payload
        }
    }
});

export default globalStateSlice.reducer;
export const {setIsStream} = globalStateSlice.actions;