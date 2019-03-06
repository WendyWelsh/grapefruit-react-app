// import React, { Component } from "react";
// import MessageList from './MessageList';
// import MessageBoardTitle from './MessageBoardTitle';
// import SendMessageForm from './SendMessageForm';
// import Chatkit from '@pusher/chatkit-client'

// const chatkit = new Chatkit({
//   instanceLocator: "v1:us1-staging:...",
//   key: "9f0ae37c-1310-4fb2-b517...",
// })

// const Chatkit = require('@pusher/chatkit-server')

// const instanceLocator = "v1:us1:1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e";

// const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e/token";

// const userName = "user1";

// const roomId = "19389927";

// const DUMMY_DATA = [
//     {
//       senderId: "perborgen",
//       text: "who'll win?",
//       id: "0"
//     },
//     {
//       senderId: "janedoe",
//       text: "who'll win?",
//       id: "1"
//     }
// ]


// class MessageBoard extends React.Component {
//     constructor() { 
//         super()
//         this.state = {
//            messages: []
//         }
//     }

//     sendMessage(text) {
//         this.currentUser.sendMessage({
//           text,
//           roomId: roomId
//         })
//     }
  
//     componentDidMount() {
//         const tokenProvider = new Chatkit.TokenProvider({
//             url: testToken

//           });

//         const chatManager = new Chatkit.ChatManager({
//           instanceLocator: instanceLocator,
//           userId: userName,
//           tokenProvider: tokenProvider
//         })
        
        
//         chatManager.connect().then(currentUser => {
//             currentUser.subscribeToRoom({
//               roomId: roomId,
//               hooks: {
//                 onMessage: message => {
//                   this.setState({
//                     messages: [...this.state.messages, message]
//                   })
//                 }
//               }
//             })
//         })
//     }
     
//     render() {
//       return (
//         <div className="MessageBoard">
//           <MessageBoardTitle />
//           <MessageList  messages={this.state.messages}/>
//           <SendMessageForm sendMessage={this.sendMessage} />
//        </div>
//       )
//     }
// }

//   export default MessageBoard;

import React, { Component } from 'react';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client'
import {
    ThemeProvider,
    darkTheme,
    elegantTheme,
    purpleTheme,
    defaultTheme,
    Avatar,
    TitleBar,
    TextInput,
    MessageList,
    Message,
    MessageText,
    CloseIcon,
    ChatIcon,
    FixedWrapper,
    MessageGroup,
    TextComposer,
    Row,
    IconButton,
    SendButton,
} from '@livechat/ui-kit'
const themes = {
    purpleTheme: {
        ...purpleTheme,
        TitleBar: {
            ...purpleTheme.TitleBar,
            css: {
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'black',
            },
            IconButton: {
                ...purpleTheme.TitleBar.IconButton,
                css: {
                  // ...purpleTheme.IconButton.css,
                    backgroundColor: 'green',
                    borderRadius: '50%',
                    color: 'black',
                },
            },
        },
        MessageList: {
            ...purpleTheme.MessageList,
            css: {
                // ...purpleTheme.MessageList.css,
                backgroundColor: 'rgb(0,206,210)',
                borderRadius: '1em',
            },
        },
        TextComposer: {
            ...purpleTheme.TextComposer,
            css: {
                ...purpleTheme.TextComposer.css,
                // backgroundColor: 'blue',
                marginTop: '1em',
            },
        },
    },
}
export default class MessageBoard extends Component {
    constructor() {
        super()
        this.state = {
            messageInput: '',
            messages: [],
            chatOpen: true,
        };
        this.listMessages = this.listMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.connect = this.connect.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }
    componentDidMount() {
        this.connect('user1')
    }
    connect(user) {
        const tokenProvider = new Chatkit.TokenProvider({
            url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e/token"

        });
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR,
            userId: user,
            tokenProvider: tokenProvider
        });
        chatManager
            .connect()
            .then(currentUser => {
                console.log("Connected as user ", currentUser);
            })
            .catch(error => {
                console.error("error:", error);
            });
        chatManager
            .connect()
            .then(currentUser => {
                currentUser.subscribeToRoom({
                    roomId: currentUser.rooms[0].id,
                    hooks: {
                        onMessage: message => {
                            // var joined = 
                            this.state.messages.push({ user: message.senderId, text: message.text })
                            // this.setState({ mesages: joined })
                        }
                    }
                });
            })
            .catch(error => {
                console.error("error:", error);
            })
    }
    listMessages() {
        var i = 100;
        return (
            this.state.messages.map((item) => {
                i++
                return (
                    <div key={i.toString()}>
                        <Row>
                            <Avatar letter={item.user[0]} />
                            <MessageGroup onlyFirstWithMeta>
                                <Message date="00:00" isOwn={true} authorName={item.user} radiusType='single'>
                                    <MessageText>
                                        {item.text}
                                    </MessageText>
                                </Message>
                            </MessageGroup>
                        </Row>
                    </div>
                )
            })
        )
    }
    createRoom(sender, reciever) {
        axios.post(`/chatCreateRoom`,
            {
                user_id: sender,
                inspector_id: reciever,
            })
        console.log('room Created')
    }
    sendMessage(sender, reciever, input) {
        this.createRoom(sender, reciever)
        if (input.length) {
            axios.post(`/chatSendMessage`,
                {
                    sender_id: sender,
                    reciever_id: reciever,
                    message: input
                })
            console.log("Sent Message")
        } else {
            console.log("Field is Empty")
        }
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        console.log(event.target.value)
    };
    //How do we minimize and maximize the fixed wrapper
    //how do we add a change handler to the
    render() {
        return (
            <div>
                <ThemeProvider theme={themes['purpleTheme']}>
                    <FixedWrapper.Root>
                        <FixedWrapper.Maximized>
                            <Maximized {...this.props} messageInput={this.state.messageInput} listMessages={this.listMessages} handleChange={this.handleChange} sendMessage={this.sendMessage} />
                        </FixedWrapper.Maximized>
                        <FixedWrapper.Minimized>
                            <Minimized {...this.props} />
                        </FixedWrapper.Minimized>
                    </FixedWrapper.Root>
                </ThemeProvider>
            </div>
        );
    }
}
const Maximized = ({
    listMessages,
    handleChange,
    sendMessage,
    messageInput,
    minimize,
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', }}>
            <TitleBar
                rightIcons={[
                    <IconButton key="close" onClick={minimize}>
                        <CloseIcon />
                    </IconButton>,
                ]}
                title="Chat"
            />
            <div style={{ flexGrow: 1, minHeight: 0, height: '100%', }}>
                <MessageList active containScrollInSubtree>
                    {listMessages()}
                </MessageList>
            </div>
            <TextComposer
                onChange={handleChange('messageInput')}
                onClick={() => sendMessage('user1', 'user2', messageInput)}
            >
                <Row align="center">
                    <TextInput />
                    <SendButton />
                </Row>
            </TextComposer>
            <div style={{ textAlign: 'center', fontSize: '.6em', padding: '.4em', background: '#fff', color: '#888', }}>
            </div>
        </div>
    )
}
const Minimized = ({ maximize }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            background: '#0093FF',
            color: '#fff',
            borderRadius: '50%',
            cursor: 'pointer',
        }}
    >
        <IconButton color="#fff" onClick={maximize}>
            <ChatIcon />
        </IconButton>
    </div>
)
