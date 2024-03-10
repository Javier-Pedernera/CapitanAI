import { configureStore } from '@reduxjs/toolkit';
import user from "../Actions/UserSlice"
import messages from '../Actions/MessageSlice';
import projects from '../Actions/ProjectsSlice';
import stages from '../Actions/StagesSlice';
import assistants from '../Actions/AssistantsSlice';

export const store = configureStore({
    reducer: {
        assistants: assistants,
       user: user,
       messages: messages,
       projects:projects,
       stages: stages
    },
});
// Documentacion Redux
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch




// export default store;