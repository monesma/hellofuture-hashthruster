import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    allTokens: []
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        loadToken: (state, action) => {
            state.allTokens = action.payload
        }
    }
})

export const {loadToken} = tokenSlice.actions
export const selectToken = (state: any) => state.token
export default tokenSlice.reducer