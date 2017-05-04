import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      count:1
    };
  this.addMessage = this.addMessage.bind(this)
  this.addUserName = this.addUserName.bind(this)
  }

  addUserName(newName) {
    const postNotification = {type: "postNotification",username:null, content: `${this.state.currentUser.name} has change their name to ${newName}`}
    this.socket.send(JSON.stringify(postNotification))
    this.setState({
      currentUser: {name:newName}
    })
  }
  addMessage(content) {
    const newMessage = {type:"postMessage", username:this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage))

  }
  render() {
    return (
      <div>
      <Header clientsCount={this.state.count}/>
      <MessageList  messages={this.state.messages}/>
      <ChatBar addMessage={this.addMessage} addUserName={this.addUserName} />
      </div>
    );
  }

  componentDidMount(){
    this.socket = new WebSocket("ws://0.0.0.0:3001/");
    this.socket.onopen = (event => {
      console.log("connected to the server");
          this.socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      const receivedMessage = this.state.messages.concat(parsedMessage)
      if (parsedMessage.type === "incomingMessage") {
      this.setState({
        messages: receivedMessage
      })
      } else if (parsedMessage.type === "postNotification") {
          this.setState({
            messages: receivedMessage
          })
          console.log("note",this.state.messages);
      } else if (parsedMessage.type === "clientsCount"){
        this.setState({
          count: parsedMessage.content
        })
      }
    }
    });
    
  }
}
export default App;
