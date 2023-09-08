import '.././App.css';
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    // const [UserName, SetName] = useState("");
    // const [UserDOB, SetDOB] = useState("");
    // const [UserEmail, SetEmail] = useState("");
    // const [UserPassword, SetPassword] = useState("");
    const navigate = useNavigate()
    const [newUser, setUser] = useState({
      name: '',
      email: '',
      dob: Date,
      password: '',
    });

    function updateForm(value) {
      return setUser((prev) => {
        return { ...prev, ...value };
      });
    }

   async function onSubmit() {
      const newPerson = {...newUser};
      await fetch('http://localhost:5000/signUp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      setUser({ name: "", email: "", dob: "", password: ""});
      navigate("/MyEntries");
      // axios
      //   .post('http://localhost:5000/signUp', newUser)
      //   .then((res) =>{
      //     setUser({
      //       name: '',
      //       email: '',
      //       dob: '',
      //       password: ''
      //     });

      //     navigate('/MyEntries');
      //   })
      //   .catch((err) => {
      //     console.log("Sign In Error, please try again");
      //   });
    }

    // const HandleNameChange = (event) =>  {
    //     SetName(event.target.value);
    // }
    // const HandleDOBChange = (event) =>  {
    //    SetDOB(event.target.value);
    // }
    // const HandleEmailChange = (event) => {
    //   SetEmail(event.target.value);
    // }
    // const HandlePasswordChange = (event) =>  {
    //   SetPassword(event.target.value);
    // }

    const confirmSignUp = () => {
      if (newUser.name && newUser.dob && newUser.email && newUser.password){
        var dobPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/
        if(!dobPattern.test(newUser.dob)){
          alert("Please enter correct format for date of birth MM/DD/YYYY")
        }
      }
      else{
        alert("Please fill out all fields")
      }
      return
    }
  
    const SignUpSubmit  = (event) => {
        //send UserEmail to Mongo and make sure account doesnt exist
        event.preventDefault();
        confirmSignUp();
        onSubmit();
    }

    return(
        <div className="App">

        <header className="App-header">
        <header className = "App-name"> 
          <p>Skylar Kim RA Tracker/Predicter</p>
        </header>
          <img src="MyDog.png" alt="sick azz pup"></img>
          <p>
            Welcome to CleverName, please register to begin using
          </p>
          <p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasic" value = {newUser.name} onChange = {(e) => updateForm({name: e.target.value})}>
                <Form.Label>Name: </Form.Label>
                <Form.Control type="name" placeholder="Smitty WerbenJagerManJensen" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic" value = {newUser.dob} onChange = {(e) => updateForm({dob: e.target.value})}>
                <Form.Label>Date of Birth: </Form.Label>
                <Form.Control type="dob" placeholder="MM/DD/YYYY" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail" value = {newUser.email} onChange = {(e) => updateForm({email: e.target.value})}>
                <Form.Label>Email Address: </Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" value={newUser.password} onChange= {(e) => updateForm({password: e.target.value})}>
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