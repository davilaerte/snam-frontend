import React, { Component } from "react";

class UserProfileLayout extends Component {
  render() {
    return (
      <div>
        <h1>Minhas descrições feitas: {this.props.numberDescriptions}</h1>
      </div>
    );
  }
}

export default UserProfileLayout;