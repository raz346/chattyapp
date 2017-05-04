import React, {Component} from 'react';

class Header extends Component {
  render() {
    console.log("count",this.props.clientsCount)
       return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p> {this.props.clientsCount} users online </p>
      </nav>
    );
  }
}
export default Header;