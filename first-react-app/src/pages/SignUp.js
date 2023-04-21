import logo from '.././logo.svg';
import '.././App.css';
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = () => {
    const [UserName, SetName] = useState("");
    const [UserDOB, SetDOB] = useState("");
    const [UserEmail, SetEmail] = useState("");
    const [UserPassword, SetPassword] = useState("");

    const HandleNameChange = (event) =>  {
        SetName(event.target.value);
    }

    const HandleDOBChange = (event) =>  {
       SetDOB(event.target.value);
    }
  
    const HandleEmailChange = (event) => {
      SetEmail(event.target.value);
    }

    const HandlePasswordChange = (event) =>  {
      SetPassword(event.target.value);
    }
  
    const SignUpSubmit  = (event) => {
        //send UserEmail to Mongo and make sure account doesnt exist
        event.preventDefault();
    }
    return(
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and eat my ass.
          </p>
          <p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasic" value = {UserName} onChange = {HandleNameChange}>
                <Form.Label>Name: </Form.Label>
                <Form.Control type="name" placeholder="Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic" value = {UserDOB} onChange = {HandleDOBChange}>
                <Form.Label>Date of Birth: </Form.Label>
                <Form.Control type="dob" placeholder="Date of Birth" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail" value = {UserEmail} onChange = {HandleEmailChange}>
                <Form.Label>Email Address: </Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" value={UserPassword} onChange={HandlePasswordChange}>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={SignUpSubmit}>
                Submit
              </Button>
            </Form>
          </p> 
        </header>
      </div>
    );
};

export default SignUp;