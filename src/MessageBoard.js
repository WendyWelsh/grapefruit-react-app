import React, { Component } from "react";
import MessageList from './MessageList';
import MessageBoardTitle from './MessageBoardTitle';
import SendMessageForm from './SendMessageForm';
import Chatkit from '@pusher/chatkit-client'

// const chatkit = new Chatkit({
//   instanceLocator: "v1:us1-staging:...",
//   key: "9f0ae37c-1310-4fb2-b517...",
// })

// const Chatkit = require('@pusher/chatkit-server')

const instanceLocator = "v1:us1:1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e";

const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e/token";

const userName = "user1";

const roomId = "19389927";

const DUMMY_DATA = [
    {
      senderId: "perborgen",
      text: "who'll win?",
      id: "0"
    },
    {
      senderId: "janedoe",
      text: "who'll win?",
      id: "1"
    }
]


class MessageBoard extends React.Component {
    constructor() { 
        super()
        this.state = {
           messages: []
        }
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
          text,
          roomId: roomId
        })
    }
  
    componentDidMount() {
        const tokenProvider = new Chatkit.TokenProvider({
            url: testToken

          });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: instanceLocator,
          userId: userName,
          tokenProvider: tokenProvider
        })
        
        
        chatManager.connect().then(currentUser => {
            currentUser.subscribeToRoom({
              roomId: roomId,
              hooks: {
                onMessage: message => {
                  this.setState({
                    messages: [...this.state.messages, message]
                  })
                }
              }
            })
        })
    }
     
    render() {
      return (
        <div className="MessageBoard">
          <MessageBoardTitle />
          <MessageList  messages={this.state.messages}/>
          <SendMessageForm sendMessage={this.sendMessage} />
       </div>
      )
    }
}

  export default MessageBoard;
