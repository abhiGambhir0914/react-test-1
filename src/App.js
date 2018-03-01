import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import MessageArea from './MessageArea/MessageArea';
import ChatMsg from './ChatMsg/ChatMsg';

import browsingMetrics from 'browser-metrics/lib/browsingMetrics';

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
       super(props);
       this.state = {
         text: '',
         username: '',
         users: [],
         chats: []
       };
     }




  componentDidMount() {

           const username = window.prompt('Username you want to use: ', ' ');
           this.setState({ username });

           const pusher = new Pusher('1003a01bb71cf14762c1',
           {
             cluster: 'ap2',
             encrypted: true,
             authEndpoint: 'http://localhost:8080/pusher/auth',
             auth: {
               params : {
                 username: username
               }
             }
           });

           // channels to bind next
           const channel = pusher.subscribe('chat');
           const userChannel = pusher.subscibe('activeUsers');
           const userinfo = pusher.subscibe('presence-info');

           //binding events to channel name 'channel'
           channel.bind('message', data => {
             this.setState({ chats: [...this.state.chats, data], test: '' });
             console.log("msg sent successfully");
           });
           this.handleTextChange = this.handleTextChange.bind(this);
         }

        handleTextChange(e) {
        if (e.keyCode === 13) {
          const payload = {
            username: this.state.username,
            message: this.state.text
          };
          axios.post('http://localhost:8080/message', payload);
        } else {
          this.setState({ text: e.target.value });
        }
      }


  render() {
    return (
      <div className="App">

        <section>

              <ChatMsg chats={this.state.chats} />
              <MessageArea
                text={this.state.text}
                username={this.state.username}
                handleTextChange={this.handleTextChange}
              />
       </section>

      </div>
    );
  }
}

export default App;
