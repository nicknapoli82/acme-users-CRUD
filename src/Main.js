import React from 'react';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Acme Users CRUD</h1>
        <hr/>
        <div>
          <h2>Create a User</h2>
          <form>
            <input type="text" />
          </form>
        </div>
      </div>
    );
  }
}
