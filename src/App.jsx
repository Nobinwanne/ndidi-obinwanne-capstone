import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello",
      sender: "BpH",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
    };

    const newMessages = [...messages, newMessage]; //all old messages + new messages
    // update message state

    //process message to chatGPT (send it over and see the response)
  };

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "50rem", width: "44rem" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default App;
