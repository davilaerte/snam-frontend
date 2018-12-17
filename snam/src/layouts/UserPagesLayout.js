import React, { Component } from "react";

class UserPagesLayout extends Component {
  constructor(props) {
    super(props);

    this.props.setTabValue();
  }
  render() {
    return (
      <div>
        <h1>Minhas páginas</h1>
      </div>
    );
  }
}

export default UserPagesLayout;