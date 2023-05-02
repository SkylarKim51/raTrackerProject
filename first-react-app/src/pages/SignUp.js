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

        //const userInfo = {UserName, UserDOB, UserEmail, UserPassword};

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
          <img src="MyDog.png" alt="sick azz pup"></img>
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