import '.././App.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import user from '../../../server/models/user';

const Home = () => {
    const navigate = useNavigate();
  
    const [signIn, setSignIn] = useState({
      email: '',
      password: '',
    });

    function updateForm(value) {
      return setSignIn((prev) => {
        return { ...prev, ...value };
      });
    }

    // const onChange = (e) => {
    //   setSignIn({[e.email]: e.email.value, [e.password]: e.password.value})
    // }

    // const onSubmit = (e) => {
    //   e.preventDefault();

    //   axios
    //     .post('http://localhost:5000/signIn', signIn)
    //     .then((res) =>{
    //       setSignIn({
    //         email: '',
    //         password: '',
    //       });

    //       navigate('/MyEntries');
    //     })
    //     .catch((err) => {
    //       console.log("Sign In Error, please try again");
    //     });
    // }


    // const HandleEmailChange = (event) => {
    //   SetEmail(event.target.value);
    // }

    async function onSubmit() {
      const userSign = {...signIn};
      const response = await fetch('http://localhost:5000/signIn', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSign),
      })
      .catch(error => {
        window.alert(error);
        return;
      })

      const onSubUser = await response.text()

      window.alert(onSubUser)

      setSignIn({ email: "", password: ""});
      if(onSubUser === "user not found"){
        navigate("Home")
      }
      else{
        navigate("MyEntries")
      }
    }

  
    const SignInSubmit  = (event) => {
        ConfirmUserID();
        onSubmit();
        event.preventDefault();
    }

    const NavigateSignUp = () => {
      navigate('SignUp');
    }

    const ConfirmUserID = () => {
      //
      if (signIn.email && signIn.password){
        //send UserEmail and UserPassword to MongoDB and check
        //navigate('MakeEntry');
        return;
      }
      else{
        alert("Please enter your email and password or click sign up to register")
      }
    }

    return(
        <div className="App">
        <header className="App-header">
        <header className = "App-name"> 
          <p>Skylar Kim RA Tracker/Predicter</p>
        </header>
          <img src="MyDog.png" alt="sick azz pup"></img>
          <p>
            Welcome to cleverName, please sign in or click sign up to create your account!
          </p>

          <p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail" value = {signIn.email} onChange = {(e) => updateForm({email: e.target.value})}>
                <Form.Label>Email Address: </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword" value={signIn.password} onChange= {(e) => updateForm({password: e.target.value})}>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={SignInSubmit}>
                Sign In
              </Button>

              <Button variant="secondary" type="button" onClick={NavigateSignUp}>
                Sign Up
              </Button>
              
            </Form>
          </p> 
        </header>
      </div>
    );
};

export default Home;