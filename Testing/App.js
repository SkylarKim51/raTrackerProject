// import logo from './logo.svg';
// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [inputs, setInputs] = useState("");
//   const [myCar, setMyCar] = useState("");

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs(values => ({...values, [name]: value}))
//   }

//   const handleSelectChange = (event) => {
//     setMyCar(event.target.value)
//   }

//   const signUpSubmit  = (event) => {
//       //figure out how to output a variable in quotations
//       event.preventDefault();
//       console.log(inputs)
//   }

//   // function signupForm(){
//   //   return (
//   //     <form>
//   //       <label>Email: <input type="text" /> </label>
//   //       <label>Name: <input type="text" /> </label>
//   //       <label>Password: <input type="text" /> </label>
//   //     </form>
//   //   )
//   // }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and eat my ass.
//         </p>
//         <p>
//           <form onSubmit={signUpSubmit}>

//            <label>Email:  
//             <input 
//               type="text" 
//               name='email'
//               value={inputs.email || ""}
//               onChange={handleChange}
//               /> 
//             </label>

//             <label>Password:  
//             <input 
//               type="text" 
//               name='password'
//               value={inputs.password || ""}
//               onChange={handleChange}
//               /> 
//             </label>
//             <input type="submit" />
//           </form>

//           <form>
//             <select value={myCar} onChange={handleSelectChange}>
//               <option value="Eat">Eat</option>
//               <option value="My">My</option>
//               <option value="Pants">Pants</option>  
//             </select>
//           </form>
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
