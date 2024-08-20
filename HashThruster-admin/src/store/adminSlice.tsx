import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    infos: {},
    isLogged: false
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        connectAdmin: (state, action) => {
            state.infos = action.payload
            state.isLogged = true
        },
        logoutAdmin: (state) => {
            state.infos = {}
            state.isLogged = false
        }
    }
})

export const {connectAdmin, logoutAdmin} = adminSlice.actions
export const selectAdmin = (state: any) => state.admin
export default adminSlice.reducer