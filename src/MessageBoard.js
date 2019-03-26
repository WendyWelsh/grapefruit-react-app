import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
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
  SendButton
} from "@livechat/ui-kit";
import axios from "axios";
let host;
if (process.env.NODE_ENV === 'production') {
    host = 'https://grapefruit-server.herokuapp.com/'
} else { host = 'http://localhost:3000' }

const themes = {
  myTheme: {
    TitleBar: {
      css: {
        backgroundColor: "black",
        borderRadius: "10em",
        fontSize:30,
        color: "white",
        fontFamily: "Poiret One",
        borderWidth: "2px",
      },
      IconButton: {
        css: {
          backgroundColor: "white",
          border: "solid black 0.1em",
          borderRadius: "50%",
          color: "black"
        }
      }
    },
    MessageList: {
      css: {
        borderWidth: "2px",
        borderColor: "gray",
        borderStyle: "solid",
        backgroundColor: "lightgray",
        borderRadius: "1em",
        textAlign: "justify",
        fontFamily: "Poiret One",
        fontSize: '20px'
      }
    },
    TextComposer: {css: {marginTop: "1em"}}
}}
  

class MessageBoard extends Component {
  constructor() {
    super();
    this.state = {
      messageInput: "",
      messages: [],
      chatOpen: true,
      sender: null,
      receiver: null,
      room: "",
      roomName: "",
      isPropsLoaded: false,
      hasRunOnce: false,
    };

    this.listMessages = this.listMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.connect = this.connect.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.shortenWordLength = this.shortenWordLength.bind(this);
  }

  componentDidMount() {
    this.setState({isPropsLoaded: false})
  }

  componentDidUpdate() {
    if (this.props.sender && this.props.sender !== this.state.sender && this.props.receiver !== this.state.receiver) {
        this.setState({sender: this.props.sender})
      this.setState({receiver: this.props.receiver})
      this.setState({isPropsLoaded: true})
    }
    if (this.state.isPropsLoaded && !this.state.hasRunOnce)
    {
       this.createRoom(this.state.sender, this.state.receiver);
      this.setState({hasRunOnce: true}) 
    }
  }

  createRoom(sender, receiver) {
    axios
      .post(`${host}/chatCreateRoom`, {
        user_id: sender,
        inspector_id: receiver
      })
      .then(response => {
        this.setState({ 
          room: response.data.room_id.toString() ,
          roomName: response.data.room_name.toString()
        });
        this.connect(sender, response.data.room_id.toString());
      });
  }

  connect(user, roomId) {
    const tokenProvider = new Chatkit.TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1d7cfa46-c2f6-46f8-826e-4b94a8d46b2e/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR,
      userId: user,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            var joined = this.state.messages;
            let truncatedText = this.shortenWordLength(message.text,40);
            joined.push({ user: message.senderId, text: truncatedText });
            this.setState({ messages: joined });
          }
        }
      });
    });
  }

  shortenWordLength(sentence,l) {
    let words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > l) {
        let word = words[i].split("");
        let newWord = [];
        while (word.length) {
          let temp = word.splice(0, l);
          let joinedTemp = temp.join("");
          newWord.push(joinedTemp);
          newWord.push(" ");
        }
        let composedWord = newWord.join("");
        words.splice(i, 1, composedWord);
      }
    }
    let finalWords = words.join(" ");
    return finalWords;
  }

  listMessages() {
    var i = 100;
    return this.state.messages.map(item => {
      i++;
      return (
        <div key={i.toString()}>
        <Avatar letter={item.user[0]} />
          <Row>
            <MessageGroup onlyFirstWithMeta>
              <Message isOwn={false} radiusType="single">
                <MessageText> {item.text}</MessageText>
              </Message>
            </MessageGroup>
          </Row>
        </div>
      );
    });
  }

  sendMessage(sender, room, input) {
    if (input.length) {
      axios.post(`${host}/chatSendMessage`, {
        sender_id: sender,
        room_id: room,
        message: input
      });
    } else {
      console.log("Field is Empty");
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={themes["myTheme"]}>
          <FixedWrapper.Root maximizedOnInit={this.props.isOpenOnLoad}>
            <FixedWrapper.Maximized>
              <Maximized
                sender={this.state.sender}
                room={this.state.room}
                roomName={this.state.roomName}
                messageInput={this.state.messageInput}
                listMessages={this.listMessages}
                handleChange={this.handleChange}
                sendMessage={this.sendMessage}
              />
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



export default MessageBoard;

const Maximized = ({ listMessages, sendMessage, minimize, sender, room, roomName, reset }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TitleBar
        rightIcons={[
          <IconButton key="close" onClick={minimize}>
            <CloseIcon />
          </IconButton>
        ]}
        title={roomName}
      />
      <div style={{ flexGrow: 1, minHeight: 0, height: "100%" }}>
        <MessageList active containScrollInSubtree>
          {listMessages()}
        </MessageList>
      </div>
      <TextComposer
        onSend={data => {
        //   sendMessage(sender, room, data);
        sendMessage(sender, room, data)
        }}
      >
        <Row align="center">
          <TextInput />
          <SendButton />
        </Row>
      </TextComposer>
    </div>
  );
};

const Minimized = ({ maximize }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      background: "mediumSeaGreen",
      color: "#fff",
      borderRadius: "50%",
      borderStyle: 'solid',
      borderWidth: "1.8px",
      borderColor: "black",
      cursor: "pointer",

    }}
  >
    <IconButton onClick={maximize}>
      <ChatIcon />
    </IconButton>
  </div>
);