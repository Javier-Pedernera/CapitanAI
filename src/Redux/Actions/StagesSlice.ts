import { createSlice } from "@reduxjs/toolkit";
// import Project from "../../components/Models/Project";

// export interface stageSelected {

// }

const initialState = {
    stagesProyect : [],
    stageSelected: {},
    projectStageInfo:{}
};

const Slice = createSlice({
    name: 'stages',
    initialState,
    reducers: {
        // compare: (state, action) => {
        //     if (state.projects.length < action.payload.length)
        //         state.projects = action.payload;
        // },
        // stageCreate: (state, action) => {
        //     // console.log(state, action);
            
        // },
        stageByProyect: (state, action) => {
            return {
                ...state,
                stagesProyect: action.payload
            };
        },
        selectStageById: (state, action) => {
            return {
                ...state,
                stageSelected: action.payload
            };
        },
        selectProyect_Stage: (state, action) => {
            return {
                ...state,
                projectStageInfo: action.payload
            };
        },
      
    }
});


export const {   stageByProyect, selectStageById, selectProyect_Stage } = Slice.actions;
export default Slice.reducer;