import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  this.addMessage = this.addMessage.bind(this)
  this.addUserName = this.addUserName.bind(this)
  }

  addUserName(newName) {
    console.log(name);
      this.setState({
        currentUser: {name:newName}
      })
      console.log(this.state.currentUser)

  }
  addMessage(content) {
    const newMessage = { username:this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage))
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const receivedMessage = this.state.messages.concat(JSON.parse(event.data))
      console.log(receivedMessage);
      this.setState({
        messages: receivedMessage
      })
    }
  }
  render() {
    return (
      <div>
      <Header />
      <MessageList  messages={this.state.messages} />
      <ChatBar addMessage={this.addMessage} addUserName={this.addUserName} />
      </div>
    );
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://0.0.0.0:3001/");
    this.socket.onopen = (event => {
      console.log("connected to the server");
    });
    
  }
}
export default App;
