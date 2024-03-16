import { combineReducers } from 'redux';
import todoReducer from '../features/todo/todoSlice';
import { configureStore } from '@reduxjs/toolkit';
import  loginReducer from '../features/auth/loginslice';
import { todoapi } from '../features/todo/createapilice';

const rootReducer = combineReducers({
  todos: todoReducer
  ,
  [todoapi.reducerPath]: todoapi.reducer,
  
  userLogin:loginReducer,
  
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoapi.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
