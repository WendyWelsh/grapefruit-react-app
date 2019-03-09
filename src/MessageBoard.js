import React, { Component } from 'react';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client'
import {
    ThemeProvider,
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
    myTheme: {
        TitleBar: {
            css: {
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'black',
            },
            IconButton: {
                css: {
                    backgroundColor: 'rgba(20,20,20,0.1)',
                    border: 'solid black 0.1em',
                    borderRadius: '50%',
                    color: 'black',
                },
            },
        },
        MessageList: {
            css: {
                border: 'solid black 0.1em',
                backgroundColor: 'rgba(20,20,20,0.1)',
                borderRadius: '1em',
            },

        },
        TextComposer: {
            css: {
                marginTop: '1em',
            },
        },
    },
}


class MessageBoard extends Component {

    constructor() {
        super()
        this.state = {
            messageInput: '',
            messages: [],
            chatOpen: true,
            sender: 'fred',
            reciever: 'bunyan',
            room: '',
        };

        this.listMessages = this.listMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.connect = this.connect.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
        this.createRoom(this.state.sender, this.state.reciever)
    }

    createRoom(sender, reciever) {
        axios.post(`/chatCreateRoom`,
            {
                user_id: sender,
                inspector_id: reciever,
            }).then((response)=> {
                console.log('axios post ' + response.data)
                this.setState({room:response.data.toString()})
                this.connect(this.state.sender,response.data.toString())
                console.log('state room' + this.state.room)
              })
    }

    connect(user,roomId) {
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
                currentUser.subscribeToRoom({
                    roomId: roomId,
                    hooks: {
                        onMessage: message => {
                            var joined = this.state.messages
                            joined.push({ user: message.senderId, text: message.text })
                            this.setState({ messages: joined })
                        }
                    }
                });
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
                                <Message date="00:00" isOwn={false} authorName={item.user} radiusType='single'>
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

    sendMessage(sender, room, input) {
        if (input.length) {
            axios.post(`/chatSendMessage`,
                {
                    sender_id: sender,
                    room_id: room,
                    message: input
                })
        } else {
            console.log("Field is Empty")
        }
    }

    render() {
        return (
            <div>
                <ThemeProvider theme={themes['myTheme']}>
                    <FixedWrapper.Root>
                        <FixedWrapper.Maximized>
                            <Maximized sender={this.state.sender} room={this.state.room} messageInput={this.state.messageInput} listMessages={this.listMessages} handleChange={this.handleChange} sendMessage={this.sendMessage}/>
                        </FixedWrapper.Maximized>
                        <FixedWrapper.Minimized>
                            <Minimized />
                        </FixedWrapper.Minimized>
                    </FixedWrapper.Root>
                </ThemeProvider>
            </div>
        );
    }
}

export default MessageBoard

const Maximized = ({
    listMessages,
    sendMessage,
    minimize,
    sender,
    room,
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
            <TextComposer onSend={(data) => { sendMessage(sender, room, data) }}>
                <Row align="center">
                    <TextInput />
                    <SendButton />
                </Row>
            </TextComposer>
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
            background: 'rgb(0,206,210)',
            color: '#fff',
            borderRadius: '50%',
            border: 'solid black 0.1em',
            cursor: 'pointer',
        }}
    >
        <IconButton onClick={maximize}>
            <ChatIcon />
        </IconButton>
    </div>
)