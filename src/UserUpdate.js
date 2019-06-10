import React from 'react';
import axios from'axios';
import {Link} from 'react-router-dom';

export default class UserUpdate extends React.Component  {
  constructor() {
    super();
    this.updateNameValue = this.updateNameValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      id: 0,
      nameValue: "",
      admin: false
    };
  }

  updateNameValue(e) {
    const {target} = e;
    if (target.type === 'text') this.setState({nameValue: e.target.value});
    else if (target.type === 'checkbox') this.setState({admin: !this.state.admin});
  }

  submitForm(e) {
    e.preventDefault();
    const {match, history} = this.props.match;
    const user = {
      id: match.params.id,
      name: this.state.nameValue,
      admin: this.state.admin
    };
    axios.patch(`http://localhost:3000/users/${match.params.id}`, user)
         .then(() => this.props.updateUsers());
    history.replace("/");
  }

  deleteUser(e) {
    const {match, history} = this.props.match;
    const user = {
      id: match.params.id,
      name: this.state.nameValue,
      admin: this.state.admin
    };
    axios.delete(`http://localhost:3000/users/${match.params.id}`, user)
         .then(() => this.props.updateUsers());
    history.replace("/");
  }

  componentDidMount() {
    const {users, match} = this.props;
    if(!users) return;
    const user = users.filter(user =>  Number(match.match.params.id) === user.id)[0];
    if (user)
      this.setState({nameValue: user.name, admin: user.admin});
  }

  componentDidUpdate() {
    const {users} = this.props;
    const {match, history} = this.props.match;
    if (Number(match.params.id) !== this.state.id)
      axios.get(`http://localhost:3000/users/${match.params.id}`)
           .then(users => {
             const user = users.data;
             this.setState({ id: user.id,
                             nameValue: user.name,
                             admin: user.admin
                           });
           });
  }  
  
  render() {
    const {users, match} = this.props;
    if (!users) return null;
    const user = users.filter(user =>  Number(match.match.params.id) === user.id)[0];
    if (user === undefined) return null;
    return (
      <div>
        <h2>Update information for {user.name}</h2>
        <form onSubmit={this.submitForm}>
          <label htmlFor="adminBox">Admin:
            <input type="checkbox" name="adminBox" checked={this.state.admin} onChange={this.updateNameValue} />
          </label>
          <br/>
          <input type="text" value={this.state.nameValue} onChange={this.updateNameValue} />
          <button type="submit">Update</button>
          <button onClick={this.deleteUser}>Delete</button>
        </form>
        <Link to="/">Cancel</Link>
      </div>
    ); 
  }
}
