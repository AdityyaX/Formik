import React from 'react';
import logo from './logo.svg';
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
import './App.css';
import {Basic} from './components/form';
import { Navbar } from './components/appbar';
import Footer from './components/footer';
import { Provider } from 'react-redux';
import { Login } from './components/login';
import { useSelector } from 'react-redux';

interface MyFormValues {
  user: string;
 }

// const user= useSelector((states:MyFormValues) => states.user);
// console.log(user);

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <Navbar/>
<Basic/>
    <Footer/>
        </>
  },
]);
function App() {
  return (
    <div className="App">

      {/* <Navbar/>
      <Basic/>
      <Footer/> */}
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
