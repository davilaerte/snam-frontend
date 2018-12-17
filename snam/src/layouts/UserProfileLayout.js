import React, { Component } from "react";

class UserProfileLayout extends Component {
  constructor(props) {
    super(props);

    this.props.setTabValue();
  }
  render() {
    return (
      <div>
        <h1>Minhas descrições feitas: {this.props.numberDescriptions}</h1>
      </div>
    );
  }
}

export default UserProfileLayout;