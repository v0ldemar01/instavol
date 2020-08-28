import React, {useState} from 'react';
import {
  Button, InputGroup, Spinner, FormGroup, Input,  InputGroupAddon,
} from 'reactstrap';
import { Field, Formik, Form, ErrorMessage} from 'formik';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom'
const Error = ({name}) => (
  <ErrorMessage 
    name={name} 
    component="div"              
    className="invalid-feedback text-left" 
  />
);
const LoginForm = ({loginHandler, loading}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);  
  const history = useHistory();
  return (
    <Formik 
      initialValues={{ username: '', password: '',}}
      validate={values => {
        let errors = {};
        if (values.username === "") {
          errors.username = "Username is required";
        } 
        if (values.password === "") {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be 6 characters at minimum";
        }        
        return errors;
      }}  
      onSubmit={async (values, event) => {                
        await loginHandler({ ...values }); 
        history.push('/'); 
      }}
    >
      {({touched, handleSubmit, values, errors, isSubmitting}) => (
        <Form>          
          <div className="form-group">
            <Field
              className={`form-control ${
                touched.username && errors.username ? "is-invalid " : ""
              }`}
              type="text"                    
              name="username"
              id="username"
              placeholder="Username"
              autoComplete="nope"
              
            />                
            <Error name="username" />
          </div>
          <div className="form-group">
            <InputGroup className="mb-2">
              <Field
                name="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}               
                id="password"                    
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
              />            
              {
                values.password && (
                  <InputGroupAddon addonType="append">
                    <Button onClick={() => setPasswordVisibility(!isPasswordVisible)} type="button" className="btn btn-warning text-white">{isPasswordVisible ? 'Hide' : 'Show'}</Button> 
                  </InputGroupAddon>
                )
              }   
              <Error name="password" />          
            </InputGroup>
          </div>
          <Button             
            className="btn btn-success btn-block"
            type="submit"
            disabled={(!values.username.trim() || !values.password.trim())}
            onClick={handleSubmit}
          >
            {loading  ? <Spinner /> : 'Login To Instagram' }
          </Button>
        </Form>
      )}
    </Formik>  
  )
}
export default LoginForm;