import { configureStore } from '@reduxjs/toolkit';
import user from "../Actions/UserSlice"
// import messages from '../Actions/MessageSlice';
import projects from '../Actions/ProjectsSlice';

export const store = configureStore({
    reducer: {
       user: user,
    //    messages: messages,
       projects:projects
    },
});
// Documentacion Redux
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch




// export default store;