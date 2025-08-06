import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: null | object;
  token: null | string,

}

const initialState : AuthState = {
    user: null,
    token: null,
}


export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
      setUser :  (state, action) => {
        const {user, token} = action.payload;
        state.user = user;
        state.token = token
      },
      logoutUser: (state) => {
        state.user = null;
        state.token = null
      },
      setNewEmail: (state, action) => {
        const user = action.payload;
        state.user = user
      },
      updateUser: (state, action) => {
        const user = action.payload;
        state.user = {...state.user, ...user}
      }
    }

})

export const {setUser, logoutUser, setNewEmail, updateUser} = authSlice.actions

export default authSlice.reducer;