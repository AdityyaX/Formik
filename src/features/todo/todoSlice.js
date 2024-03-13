import axios from "axios";
import { createSlice,nanoid } from "@reduxjs/toolkit";
const initialstate=  {

    todos:[{    userId: '1',
        id: "1",
        title: "delectus aut autem",
        completed: false}]
}
 export const todoSlice = createSlice({ 
    name: "todos",
    initialState: initialstate,
    reducers: { 
        addtodo: (state, action) => {
            const newTask = {
                userId: 1, 
                id: nanoid(),
                title: action.payload.title,
                completed: true,
            };
            const updatedTaskList = [newTask];
            // setTask(updatedTaskList);
            console.log("redux is workin");
            state.todos.push(newTask)
    
            axios.post(`https://jsonplaceholder.typicode.com/todos`, newTask)
                .then((response) => {
                    console.log(response);
                    console.log(newTask);
                    // resetForm();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        },
        removetodo: (state, action) => {
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${state.id}`)
                    .then(response => {

                        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
                        console.log('Task deleted successfully.');
                    })
                    .catch(error => {
                        console.log('Error deleting task:', error);
                    });
          
        } 
    }
    )
    export const { addtodo, removetodo } = todoSlice.actions;
    export default todoSlice.reducer;