import React, { useState } from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import {
    Formik,
    Form,
    Field,
    FormikHelpers,
} from 'formik';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Snackbar, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { addtodo, removetodo } from '../features/todo/todoSlice';
import { RootState } from '../app/store';
interface MyFormValues {
    title: string;
    completed: boolean;
}


interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const SignupSchema = Yup.object().shape({
    title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
completed: Yup.boolean().required('Required'),
  });

export const Basic: React.FC<{}> = () => {
    const initialValues: MyFormValues = { title: '', completed: false };
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // const [title, setTitle] = useState<string>('');
    // const [newText, setNewText] = useState<string>('');
    // const [test, setTest] = useState<string>('');
    const [task, setTask] = useState<Todo[]>([]);


const dispatch = useDispatch();
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // const searchdata = () => {
    //     axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos/`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setTask(response.data);
    //             setOpenSnackbar(true);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // const handleSubmit = (values: MyFormValues,{ resetForm }: FormikHelpers<MyFormValues>) => {
        // const newTask: Todo = {
        //     userId: 1, 
        //     id: new Date().getTime(),
        //     title: values.title,
        //     completed: values.completed,
        // };

        // const updatedTaskList = [...task, newTask];
        // setTask(updatedTaskList);


        // axios.post(`https://jsonplaceholder.typicode.com/todos`, newTask)
        //     .then((response) => {
        //         console.log(response);
        //         console.log(newTask);
        //         resetForm();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
   
    // };


    const handleSubmit = (values: { title: any; }) => {
        // e.preventDefault();

            
            console.log("debvugging");
            
            const newTask: Todo = {
                userId: 1, 
                id: new Date().getTime(),
                title: values.title,
                completed: false
        };

        const updatedTaskList = [...task, newTask];
        setTask(updatedTaskList);
        console.log("task:", task);
        


        dispatch(addtodo(values.title)as any); // Explicitly specify the type of the action
    }


    // const handleDelete = (values: Todo) => {
    //     console.log("deleting");
    //     console.log("values:", values);
    //     const updatedTaskList = task.filter(todo => todo.id !== values.id);
    //     setTask(updatedTaskList);
    //     dispatch(removetodo(values.title)as any); // Explicitly specify the type of the action


    // }


    // const handleUpdateClick = (id: number, userId: number) => {
    //     const newtext = 'Your new todo text'; // Replace with actual new text
    //     const newUserId = 1; // Replace with actual new user ID
    //     axios.put(`https://jsonplaceholder.typicode.com/todos/${newUserId}/?`, { title: newtext })
    //         .then(response => {
    //             const updatedTaskList = task.map(todo => {
    //                 if (todo.id === id) {
    //                     return {
    //                         ...todo,
    //                         title: newtext
    //                     };
    //                     console.log(newText);
                        
    //                 }
    //                 return todo;
    //             });
    //             setTask(updatedTaskList);
    //             console.log('Task updated successfully.');
    //         })
    //         .catch(error => {
    //             console.log('Error updating task:', error);
    //         });
    // };
    // const handleDeleteClick = (id: number) => {
    //     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //         .then(response => {
    //             setTask(task.filter(todo => todo.id !== id));
    //             console.log('Task deleted successfully.');
    //         })
    //         .catch(error => {
    //             console.log('Error deleting task:', error);
    //         });
    // };
  


    // ...


    const todos = useSelector((state: RootState) => state.todos);
    // const dispatch = useDispatch();

    const handleDelete = (values: Todo) => {
        const updatedTaskList = task.filter(todo => todo.id !== values.id);
        setTask(updatedTaskList);
        dispatch(removetodo(values.id) as any); // Explicitly specify the type of the action
      };

    // ...



  interface initialstate{     

        todos:[{    userId: '1',
            id: "1",
            title: "delectus aut autem",
            completed: false}]
    }
//     const todos = useSelector((state:initialstate) => state.todos);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '70vh', flexDirection: 'row' }}>
            <div>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            {({ errors, touched }) => (
                <Form >
                    <Stack >
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="title" />
                        {errors.title && touched.title && <div>{errors.title}</div>}
                    </Stack>
                    <Stack>
                        <label htmlFor="completed">Completed</label>
                        <Field id="completed" name="completed" type="checkbox" />
                        {errors.completed && touched.completed && <div>{errors.completed}</div>}
                    </Stack>
                    <Stack>
                        <button type="submit" >Submit</button>
                    </Stack>
                </Form>
            )}
        </Formik>
        </div>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Data Received"
        />
    
        <div style={{display:'flex',justifyContent:'',flexDirection:"column"}}>
        {task.map((task) => (
            <div key={task.title} style={{ marginRight: "2vh" }}>
                <Typography variant="h6">{task.title}</Typography>
                <Button onClick={() => handleDelete(task)}><DeleteIcon/></Button>
            </div>
        ))}
        </div>
       

  
    </div>
    );
}
function state(state: unknown): unknown {
    throw new Error('Function not implemented.');
}

