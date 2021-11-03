import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { AuthenticationInterface } from "../models"

interface authState {
  auth: AuthenticationInterface
}

const initialState: authState = {
  auth: {
    user: {
      _id: "",
      userType: -1,
      username: "",
      info: {
        _id: "",
        name: "",
        avatar: "",
        email: "",
        phone: "",
        identification: "",
      },
    },
    token: "",
    tokenExpiration: 0,
  },
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticationInterface>) => {
      state.auth = action.payload
      localStorage.setItem(
        "token",
        action.payload.token ? action.payload.token : ""
      )
    },
    logout: (state) => {
      state.auth = initialState.auth
      localStorage.setItem("token", "")
    },
  },
})

// Selector
export const authSelector = (state: RootState) => state.authReducer.auth

// Actions
export const { login, logout } = authSlice.actions

// Reducer
export default authSlice.reducer
