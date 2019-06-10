import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import UserForm from './UserForm';
import UserUpdate from './UserUpdate';

const rootAPI = "http://localhost:3000/users";

export default class Main extends React.Component {
  constructor() {
    super();
    this.updateUsers = this.updateUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.state = {
      users: []
    };
  }

  updateUsers() {
    axios.get(rootAPI)
         .then(users => { this.setState({users: users.data}); });    
  }

  createUser(user) {
    const sortedUsers = this.state.users.sort((a, b) => a.id < b.id);
    console.log(sortedUsers);
    let idCheck = 1;
    while (sortedUsers[idCheck - 1] && idCheck === sortedUsers[idCheck - 1].id) {
      idCheck++;
    }
    user.id = idCheck;
    axios.post(rootAPI, user)
         .then(() => this.updateUsers());
  }

  componentDidMount() {
    this.updateUsers();
  }
  
  render() {
    const {users} = this.state;
    return (
      <div>
        <h1>Acme Users CRUD</h1>
        <hr/>
        <h1>Users</h1>
        <div>
          <h2>Create a User</h2>
          <UserForm createUser={this.createUser} users={this.state.users}/>
        </div>
        <ul>
          <Router>
            {
              users ? users.map((user)=>{
                return <li key={user.id}><Link to={`/${user.id}`}>{user.name}</Link></li>;
              }) : <p>Nothing (I feel so empty inside</p>
                              }
          </Router>
        </ul>            
        <Router>
          <Route path="/:id" render={(match)=> <UserUpdate match={match} users={users} updateUsers={this.updateUsers}/>}/>
        </Router>
      </div>
    );
  }
}
