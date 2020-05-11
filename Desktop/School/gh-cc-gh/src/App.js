import React from "react";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ghUsers: []

    };
  }

  componentDidMount() {
    // We are waiting for everthing to load then checking on the compnents state or readiness
    fetch(`https://api.github.com/users/andrecolon/followers`)
      .then(res => res.json())
      .then(users => {
        console.log("what data? ", users); // Let's test to see if we get the right data set
        const newState = {
          ghUsers: users.map(userImg => {
            return { 
              avatar_url: userImg, selected: false 
              
            };
          })
        };
        this.setState(newState);
      })
      .catch(err => console.error("What is my error - line 24 ", err));
  }

  toggleSelect = toggleFllwrs => {
    console.log(toggleFllwrs);
    this.setState({
      ghUsers: this.state.ghUsers.map((users, followers) => {
        if (toggleFllwrs === followers) {
          return {
            ...users,
            selected: !users.selected
          };
        }
        return users;
      })
    });
  };

  render() {
    return (
      <div className="App">
        <h1>webpt15 ghUsers app</h1>
        {this.state.ghUsers.map((ghUsers, login) =>{
          return(
            <p 
            className={ghUsers.selected ? "selected" : ""}
              key={`ghUsers${login}`}>{this.state.login}
              </p>
          )

        })}
        
        {this.state.ghUsers.map((ghUsers, followers) => {
          return (
            <img
              className={ghUsers.selected ? "selected" : ""}
              src={ghUsers.avatar_url}
              alt="User"
              onClick={e => this.toggleSelect(followers)}
              key={`ghUsers${followers}`}
              
            />
          );
          
        }
        
        )}
      </div>
      
    );
  }
}

export default App;
