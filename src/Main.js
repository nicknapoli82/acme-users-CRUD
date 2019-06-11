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
    const sortedUsers = this.state.users.sort((a, b) => {
      if (Number(a.id) < Number(b.id)) return -1;
      else if(Number(a.id) < Number(b.id)) return 1;
      else return 0;});
    let idCheck = 1;
    while (sortedUsers[idCheck - 1] && idCheck === sortedUsers[idCheck - 1].id) {
      if (Number(sortedUsers[idCheck - 1].id) === idCheck){
        idCheck++;
      }
      else break;
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
    let numUsers = 0, numAdmins = 0;
    for (let u of users) {
      u.admin ? numAdmins++ : numUsers++;
    }
    return (
      <div>
        <h1>Acme Users CRUD</h1>
        <hr/>
        <div className="header">
          <div className="create-wrapper">
            <h2>Create a User</h2>
            <UserForm createUser={this.createUser} users={this.state.users}/>
          </div>
          <div>
            <p>Users: {numUsers}</p>
            <p>Admins: {numAdmins}</p>
            <p>Total: {users.length}</p>
          </div>
        </div>
        <hr/>
        <h1>Users</h1>
        <Router>
          <Route path="/:id" render={(props)=> <UserUpdate users={users} updateUsers={this.updateUsers} {...props} />}/>
          <ul className="list-names">
            {
              users ? users.map((user)=> {
                return <li key={user.id}><Link to={`/${user.id}`}>{user.name}</Link></li>; })
                : <p>Nothing (I feel so empty inside</p>
            }
          </ul>            
        </Router>
      </div>
    );
  }
}
