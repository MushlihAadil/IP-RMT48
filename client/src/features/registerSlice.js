import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "../utils/ServerAPI";

export const registerSlice = createSlice({
    name: 'register',
    initialState : {
        user: {
            email: "",
            password: ""
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = { ...state.user, ...payload }
        }
    },
})

export const { setUser } = registerSlice.actions

