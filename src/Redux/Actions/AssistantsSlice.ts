import { createSlice } from "@reduxjs/toolkit";
import AssistantModel from "../../Models/AssistantModel";


export interface Assistant {
    assistantsOpenai: AssistantModel[]
}

const initialState: Assistant = {
    assistantsOpenai: []
};
const Slice = createSlice({
    name: 'assistants',
    initialState,
    reducers: {
        assistants: (state, action) => {
            return {
                ...state,
                assistantsOpenai: action.payload
            };
        },
    }
});

export const { assistants } = Slice.actions;
export default Slice.reducer;