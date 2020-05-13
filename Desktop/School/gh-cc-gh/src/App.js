import React from 'react';

export class App extends React.Component {
  //React.Component can only set state
  state = {
    usersGH: [],
    error: "",
    userName: "andrecolon"
  }
  componentDidMount() {
    //
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

handleUserChange = e => {
    this.setState({
      userName: e.target.value
    });
  };

handleUserUpdate = e => {
  fetch(`https://api.github.com/users/${this.state.userName}/followers`)
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(user =>{
    if(user.status === 'error'){
      this.setState({error: user.error});
      
    } else {
      this.setState({usersGH: user.login})
    }
  })
  .catch(err =>{
    console.log(err)
    this.setState({error: err})
  })
}
  render() {
    return (
      <div className="user-container">
        <input
          id="name"
          text="text"
          placeholder="User Name"
          value={this.state.userName}
          onChange={this.handleUserChange}
        />
        <button onClick={this.handleUserUpdate}>Next GH User</button>
      <ul className="user-grid">
        {this.state.usersGH.map((users) => (
          <li key={users.id}>{users.login}<img src={users.avatar_url} alt="User" /></li>
        ))}
      </ul>
      </div>
    )
  }
}

export default App;