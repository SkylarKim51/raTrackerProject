import logo from '.././logo.svg';
import '.././App.css';
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//var dbAccess = require('../../../usermodule');

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

    const confirmSignUp = () => {
      if (UserName && UserDOB && UserEmail && UserPassword){
        var dobPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/
        if(!dobPattern.test(UserDOB)){
          alert("Please enter correct format for date of birth MM/DD/YYYY")
        }
        else{
          //send to mongo
        }
      }
      else{
        alert("Please fill out all fields")
      }
    }
  
    const SignUpSubmit  = (event) => {
        //send UserEmail to Mongo and make sure account doesnt exist
        event.preventDefault();

        const userInfo = {UserName, UserDOB, UserEmail, UserPassword};

        confirmSignUp();

        // fetch("http://localhost:8080/SignUp", {
        //   method: 'POST',
        //   mode: 'cors',
        //   body: JSON.stringify(userInfo)
        // }).then(()=>{
        //   window.alert("signup submit post req")
        // })
    }
    return(
        <div className="App">

        <header className="App-header">
        <header className = "App-name"> 
          <p>Skylar Kim RA Tracker/Predicter</p>
        </header>
          <img src="data:image/jpeg;base64,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" className="App-logo" alt="new" />
          <p>
            Welcome to cleverName, please register to begin using
          </p>
          <p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasic" value = {UserName} onChange = {HandleNameChange}>
                <Form.Label>Name: </Form.Label>
                <Form.Control type="name" placeholder="Smitty WerbenJagerManJensen" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic" value = {UserDOB} onChange = {HandleDOBChange}>
                <Form.Label>Date of Birth: </Form.Label>
                <Form.Control type="dob" placeholder="MM/DD/YYYY" />
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