import React from 'react';

export default class UserForm extends React.Component {
  constructor() {
    super();
    this.updateNameValue = this.updateNameValue.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.state = {
      userName: "",
      admin: false
    };
  }

  updateNameValue(e) {
    const {target} = e;
    if (target.type === 'text') this.setState({userName: e.target.value});
    else if (target.type === 'checkbox') this.setState({admin: !this.state.admin});
  }
  
  submitUser(e) {
    e.preventDefault();
    const user = {
      name: this.state.userName,
      admin: this.state.admin
    };
    this.setState({userName: "", admin: false});
    this.props.createUser(user);
  }
  
  render() {
    return (
      <form onSubmit={this.submitUser}>
        <input type="text" onChange={this.updateNameValue} value={this.state.userName}/>
        <p>Is Admin<input type="checkbox" onChange={this.updateNameValue} checked={this.state.admin}/></p>
        <button type="submit">Create!</button>
      </form>
    );
  }
}
