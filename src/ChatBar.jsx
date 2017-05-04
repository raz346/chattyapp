import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(){
    super();
    this.state = {
      content: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.userKeyPress = this.userKeyPress.bind(this)
  }

  userKeyPress(event){
      this.props.addUserName(event.target.value)
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.addMessage(event.target.value)
      event.target.value = "";
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
        onBlur={this.userKeyPress}
        placeholder="Type username "  />

        <input className="chatbar-message" 
        onKeyPress={this.handleKeyPress} 
        placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;