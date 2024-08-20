import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    allProjects: []
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        loadProject: (state, action) => {
            state.allProjects = action.payload
        }
    }
})

export const {loadProject} = projectSlice.actions
export const selectProject = (state: any) => state.project
export default projectSlice.reducer