// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     messages: [],
//     messageActual: []
// };

// const Slice = createSlice({
//     name: 'messages',
//     initialState,
//     reducers: {
//         compare: (state, action) => {
//             if (state.messages.length < action.payload.length)
//                 state.messages = action.payload;
//         },
//         messageAdded: () => {
//             // state.projects.push(action.payload);
//         },
//         messageAI: () => {
//             // state.projects.push(action.payload);
//         },
//         selectVoice: (state, action) => {
//             state.messages = action.payload;
//         },
//         getOut: (state) => {
//             state.messages = [];
//         },
//     }
// });

// export const { compare, messageAI, selectVoice, messageAdded, getOut } = Slice.actions;
// export default Slice.reducer;