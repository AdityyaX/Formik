import { combineReducers } from 'redux';
import todoReducer from '../features/todo/todoSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todos: todoReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
