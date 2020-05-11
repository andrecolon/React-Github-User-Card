import React from 'react';

export class App extends React.Component {
  state = {
    usersGH: []
  }
  componentDidMount() {
    fetch('https://api.github.com/users/andrecolon/followers')
      .then((response) => response.json())
      .then(userList => {
        console.log(userList)
        this.setState({ usersGH: userList });
        });
  }
    
  componentWillUnmount() {
    // make fetch request
  }

  render() {
    return (
      <ul className="user-grid">
        {this.state.usersGH.map((user) => (
          <li key={user.id}>{user.login}<img src={user.avatar_url} alt="User" /></li>
        ))}
      </ul>
    )
  }
}

export default App;