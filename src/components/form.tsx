import React, { useState } from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import {
    Formik,
    Form,
    Field,
    FormikHelpers,
} from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Snackbar, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { addtodo, removetodo,updatetodo } from '../features/todo/todoSlice';
// import { removetodo } from '../features/todo/todoSlice';
import { RootState } from '../app/store';
import { useGettodoQuery,useAddtodoMutation, useDeletetodoMutation ,useUpdateodoMutation} from '../features/todo/createapilice';
import { todoapi } from "../features/todo/createapilice";
import { log } from 'console';
import { Task } from '@mui/icons-material';

interface MyFormValues {
    title: string;
    completed: boolean;
}





export  interface Todo {
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


    const { data: todos, error, isLoading } = useGettodoQuery();
    const [addTodo] = useAddtodoMutation();
    const [deleteTodo] = useDeletetodoMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const initialValues: MyFormValues = { title: '', completed: false };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    interface initialstate{     

        todos:[{    userId: '1',
            id: "1",
            title: "delectus aut autem",
            completed: false}]
    }
    console.log(todos);
    const handleUpdate = async (id: number, newTas: Todo) => {
        try {
            await useUpdateodoMutation.mutateAsync({ id, newTas });
            // Handle the response and update the state if necessary
        } catch (error) {
            // Handle the error
        }
    };
    
  
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '70vh', flexDirection: 'row' }}>
        <div>
    <Formik
       initialValues={initialValues}
       onSubmit={(values, { resetForm }) => {
        addTodo({
          userId: 1,
          id: new Date().getTime(),
          title: values.title,
          completed: values.completed,
        });
        resetForm(); // Reset the form after submission
      }}
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
                    <button type="submit"  >Submit</button>
                </Stack>
            </Form>
        )}
    </Formik>
    </div>
    {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Data Received"
    /> */}

    <div style={{display:'flex',justifyContent:'',flexDirection:"column"}}>
    
    {todos.map((todo: Todo) => (
        <div key={todo.id}>
            <Typography variant="h6">{todo.title}</Typography>


            <Button onClick={(event:any) =>{
                    console.log("task =", todo.id);

                    deleteTodo(todo.id)
                    console.log(todo);
                    
                console.log("deleting");
                
                }}><DeleteIcon/></Button>
                
                    <button onClick={() => {
                        const updated: Todo = {
                            id: 22,
                            userId: 1,
                            title: "Task 4 is here",
                            completed: false
                        }
                        handleUpdate(todo.id, updated);
                        console.log("updating");
                    }}><EditIcon/></button>
              
        </div>

        
    ))} 




    </div>
   


</div>
    );
  };
//     const initialValues: MyFormValues = { title: '', completed: false };
//     const [openSnackbar, setOpenSnackbar] = useState(false);
   
//     const [task, setTask] = useState<Todo[]>([]);
  
// const [createtodo, dataorg] = useAddtodoMutation();


// const data=useGettodoQuery('');
// console.log("data is here",data);

// const Read = () => {
//     createtodo(task);
//     console.log("post request done");
// }

    
// const dispatch = useDispatch();
//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     // const searchdata = () => {
//     //     axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos/`)
//     //         .then((response) => {
//     //             console.log(response.data);
//     //             setTask(response.data);
//     //             setOpenSnackbar(true);
//     //         })
//     //         .catch((error) => {
//     //             console.log(error);
//     //         }); 
//     // };

   

//     const handleSubmit = (values: { title: any; }) => {
       
        
//         console.log("task is here:",task);
        
            
//             const newTask: Todo = {
//                 userId: 1, 
//                 id: new Date().getTime(),
//                 title: values.title,
//                 completed: false
//         };


        
//         const updatedTaskList = [...task, newTask];
//         setTask(updatedTaskList);
//         console.log("task:", task);
        


//         dispatch(addtodo(values.title)as any);
//     }

// const [deletetodo,response]=useDeletetodoMutation();

   

   

//     const handlePost = () => {
//         const newTask: Todo = {
//             userId: 1,
//             id: new Date().getTime(),
//             title: "New Task",
//             completed: false
//         };

//         dispatch(addtodo(newTask) as any); 
//     };


//     const todos = useSelector((state: RootState) => state.todos);
//     console.log("main list is here",todos.todos);
    

   
//     const handleDelete = (id:any) => {
//         const updatedTaskList = task.filter(todo => todo.id !== id);
//         console.log("updtedask = ", updatedTaskList);
//         setTask(updatedTaskList);
     
//     };
//     // ...



//   interface initialstate{     

//         todos:[{    userId: '1',
//             id: "1",
//             title: "delectus aut autem",
//             completed: false}]
//     }
 
//     return (
//         <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '70vh', flexDirection: 'row' }}>
//             <div>
//         <Formik
//             initialValues={initialValues}
//             onSubmit={handleSubmit}
//             validationSchema={SignupSchema}
//         >
//             {({ errors, touched }) => (
//                 <Form >
//                     <Stack >
//                         <label htmlFor="title">Title</label>
//                         <Field id="title" name="title" placeholder="title" />
//                         {errors.title && touched.title && <div>{errors.title}</div>}
//                     </Stack>
//                     <Stack>
//                         <label htmlFor="completed">Completed</label>
//                         <Field id="completed" name="completed" type="checkbox" />
//                         {errors.completed && touched.completed && <div>{errors.completed}</div>}
//                     </Stack>
//                     <Stack>
//                         <button type="submit" onClick={Read} >Submit</button>
//                     </Stack>
//                 </Form>
//             )}
//         </Formik>
//         </div>
//         <Snackbar
//             open={openSnackbar}
//             autoHideDuration={6000}
//             onClose={handleCloseSnackbar}
//             message="Data Received"
//         />
    
//         <div style={{display:'flex',justifyContent:'',flexDirection:"column"}}>
   

//              {todos.todos.map((task) => (
//             <div key={task.title} style={{ marginRight: "2vh" }}>
//                 <Typography variant="h6">{task.title}</Typography>
       
// <Button onClick={(event:any) =>{
//                     console.log("task =", task.id);

//                     deletetodo(task.id)
//                     console.log(task);
                    
//                 console.log("deleting");
                
//                 }}><DeleteIcon/></Button>
//                 <button onClick={Read}></button>
//                 <button onClick={(event:any) => {
//                     console.log("task =", task.id);
//                     dispatch(updatetodo(task.id) as any)
//                     console.log("updating");
//                 }}><EditIcon/></button>

//             </div>
//         ))}
      
//         </div>
       

  
//     </div>
//     );
// }
function state(state: unknown): unknown {
    throw new Error('Function not implemented.');
}

