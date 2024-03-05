import { createSlice } from "@reduxjs/toolkit";
import MessageModel from "../../components/Models/Message";


interface MessagesState {
    messages: MessageModel[];
    messageActual: MessageModel[]; 
    threadSelected: any;
}


const initialState:MessagesState = {
    messages: [],
    messageActual: [],
    threadSelected: {}
};

const Slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getThread: (state, action) => {
            return {
                ...state,
                threadSelected: action.payload
            };
        },
        messageUserAdded: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
            
        },
        messageAssistantAdded: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
            
        },
        getAllMessagesThread: (state, action) => {
            return {
                ...state,
                messages: action.payload
            };
            
        },
    }
});

export const { getThread, messageUserAdded, messageAssistantAdded, getAllMessagesThread } = Slice.actions;
export default Slice.reducer;