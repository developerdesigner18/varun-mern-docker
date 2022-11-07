import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

// import { createRoot } from 'react-dom/client'

// const axios = require("axios");

// class MyFirstComponent extends React.Component{
//   state = {
//     users: [],
//     isLoading: true,
//     errors: null
//   };

//   getUsers() {
//     // We're using axios instead of Fetch
//     axios
//       // The API we're requesting data from
//       .get("https://randomuser.me/api/?results=10")
//       // Once we get a response, we'll map the API endpoints to our props
//       .then(response =>
//         response.data.results.map(user => ({
//           name: `${user.name.first} ${user.name.last}`,
//           username: `${user.login.username}`,
//           email: `${user.email}`
//         }))
//       )
//       // Let's make sure to change the loading state to display the data
//       .then(users => {
//         this.setState({
//           users,
//           isLoading: false
//         });
//       })
//       // We can still use the `.catch()` method since axios is promise-based
//       .catch(error => this.setState({ error, isLoading: false }));
//   }

//   componentDidMount() {
//     this.getUsers();
//   }

//     render() {
//   const { isLoading, users } = this.state;
//   return (
//     <React.Fragment>
//       <h2> Form data</h2>

//       <Form>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//         <Form.Label>First Name</Form.Label>
//         <Form.Control type="text" placeholder="name@example.com" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label>Example textarea</Form.Label>
//         <Form.Control as="textarea" rows={3} />
//       </Form.Group>
//     </Form>

//       <div class="input-group">
//   <div class="input-group-prepend">
//     <span class="input-group-text">With textarea</span>
//   </div>
//   <textarea class="form-control" aria-label="With textarea"></textarea>
// </div>
//       <button
//   className="button"
//   type="button"
//   onClick={() => this.getUsers()} >
//   Refresh
// </button>

//       <div>
//         {!isLoading ? (
//           users.map(user => {
//             const { username, name, email, image } = user;
//             return (
//               <div key={username}>
//                 <p>{name}</p>

//                 <p>{email}</p>
//                 <hr />
//               </div>
//             );
//           })
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </React.Fragment>
//   );
// }
// }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// createRoot(document.getElementById('root')).render(<h1>Your App</h1>)
