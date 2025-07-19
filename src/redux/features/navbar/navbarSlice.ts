import { createSlice } from "@reduxjs/toolkit";



const initialState : {isSidebar: boolean , isStorePromptModal : boolean}  = {
    isSidebar: false,
    isStorePromptModal: false
}


const navbarSlice = createSlice({
    name: 'navbarSlice',
    initialState,
    reducers: {
        setToggleSidebar: (state) => {
            state.isSidebar = !state.isSidebar
        },
        setStorePromptModal : (state, action) => {
            state.isStorePromptModal = action.payload
        }

    }
})


export const {setToggleSidebar , setStorePromptModal} = navbarSlice.actions


export default navbarSlice.reducer