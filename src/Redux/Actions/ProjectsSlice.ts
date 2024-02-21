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
        // selectVoice: (state, action) => {
        //     state.projectActual = action.payload;
        // },userActive.userData && 'id' in userActive.userData ? userActive.userData.id:""
        // removeProject: (state, action) => {
        //     state.projects = state.projects.filter(project => project.id !== action.payload);
        // },
      
    }
});


export const { compare, projectCreate, userProjects } = Slice.actions;
export default Slice.reducer;