import React, { useState } from 'react';
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
    const [title, setTitle] = useState<string>('');
    const [newText, setNewText] = useState<string>('');
    const [test, setTest] = useState<string>('');
    const [task, setTask] = useState<Todo[]>([]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const searchdata = () => {
        axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos/`)
            .then((response) => {
                console.log(response.data);
                setTask(response.data);
                setOpenSnackbar(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (values: MyFormValues,{ resetForm }: FormikHelpers<MyFormValues>) => {
        const newTask: Todo = {
            userId: 1, // Assuming the user ID is always 1 for new tasks
            id: new Date().getTime(),
            title: values.title,
            completed: values.completed,
        };

        const updatedTaskList = [...task, newTask];
        setTask(updatedTaskList);

        axios.post(`https://jsonplaceholder.typicode.com/todos`, newTask)
            .then((response) => {
                console.log(response);
                resetForm();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUpdateClick = (id: number,userId:number) => {
        const newtext = 'Your new todo text'; // Replace with actual new text
        axios.put(`https://jsonplaceholder.typicode.com/todos/${userId}/?userId=${id}`, { title: newtext })
            .then(response => {
                // setTest(JSON.stringify(response.data));
     console.log(response.data);
     setTest(response.data);
        
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    const handleDeleteClick = (id: number) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => {
                setTask(task.filter(todo => todo.id !== id));
                console.log('Task deleted successfully.');
            })
            .catch(error => {
                console.log('Error deleting task:', error);
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column' }}>
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            {({ errors, touched }) => (
                <Form>
                    <Stack>
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
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Data Received"
        />
        {task.map((task, index) => (
            <div key={index} style={{ marginRight: "2vh" }}>
                <Typography variant="h6">{task.title}</Typography>
                <Button onClick={() => handleUpdateClick(task.id, task.userId)}><EditIcon /></Button>
                <Button onClick={() => handleDeleteClick(task.id)}><DeleteIcon /></Button>
            </div>
        ))}
    </div>
    );
}
