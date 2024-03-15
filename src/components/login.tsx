// import { UseDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import {useSelector, useDispatch} from "react-redux";
import { login } from "../features/auth/loginslice";

export interface MyFormValues {
   user: string;
  }
 
  
  export const Login: React.FC<{}> = () => {
    const initialValues: MyFormValues = { user: '' };
    const dispatch = useDispatch();
const user= useSelector((states:MyFormValues) => states);


const detaile=JSON.stringify(user)

 const handlesubmit = (values: MyFormValues) => {
    console.log(
      values
    );

    console.log("user:",detaile);
    
    dispatch(login(values));

    
 }
    return (
      <div>
        <h1>My Example</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handlesubmit}
        >
          <Form>
            <label htmlFor="user">First Name</label>
            <Field id="user" name="user" placeholder="First Name" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    );
  };