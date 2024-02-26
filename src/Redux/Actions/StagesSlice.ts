import { createSlice } from "@reduxjs/toolkit";
// import Project from "../../components/Models/Project";

// export interface ProyectState {
//     stagesProyect: [];
//     stageActual: string | null;
// }

const initialState = {
    stagesProyect : [],
    stageActual: ''
};

const Slice = createSlice({
    name: 'stages',
    initialState,
    reducers: {
        // compare: (state, action) => {
        //     if (state.projects.length < action.payload.length)
        //         state.projects = action.payload;
        // },
        stageCreate: (state, action) => {
            console.log(state, action);
            
        },
        stageByProyect: (state, action) => {
            return {
                ...state,
                stagesProyect: action.payload
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


export const {  stageCreate, stageByProyect } = Slice.actions;
export default Slice.reducer;