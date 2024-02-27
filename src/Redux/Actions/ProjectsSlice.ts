import { createSlice } from "@reduxjs/toolkit";
import Project from "../../components/Models/Project";

export interface ProyectState {
    projects: Project[] | [];
    projectActual: string | null;
}

const initialState = {
    projects : [],
    projectActual: ''
};

const Slice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        compare: (state, action) => {
            if (state.projects.length < action.payload.length)
                state.projects = action.payload;
        },
        projectCreate: (state, action) => {
            console.log(state, action);
            
        },
        userProjects: (state, action) => {
            return {
                ...state,
                projects: action.payload
            };
        },
        getProjectByID:(state, action) => {
            return {
                ...state,
                projectActual: action.payload
            };
        },
      
    }
});


export const { compare, projectCreate, userProjects, getProjectByID } = Slice.actions;
export default Slice.reducer;