import { combineReducers } from 'redux';
import todoReducer from '../features/todo/todoSlice';
import { configureStore } from '@reduxjs/toolkit';
import  loginReducer from '../features/auth/loginslice';

const rootReducer = combineReducers({
  todos: todoReducer
  ,
  userLogin:loginReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
