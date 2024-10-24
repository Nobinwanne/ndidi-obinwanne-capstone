import { useState } from "react";
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

const api_key = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am BpH. How can I help you today?",
      sender: "BpH",
      direction: "outgoing",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
    };

    const newMessages = [...messages, newMessage]; //all old messages + new messages
    // update message state
    setMessages(newMessages);

    //set a typing indicator
    setTyping(true);

    //process message to chatGPT (send it over and see the response)
    await processMessageToBpH(newMessages);
  };

  async function processMessageToBpH(chatMessages) {
    //chatMessages {sender: "user" or "BpH", message: "The message content here"}
    //apiMessages {role: "user" or "assistant", content: "The message content here"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "BpH") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    //role: "user" -> a message from the user, "asistant" -> a response from BpH
    //"system" -> generally one initial message defining how we want BpH to talk

    const systemMessage = {
      role: "system",
      content:
        "Explain all concepts like I am a new real estate developer starting my first deal", //speak like a persona you want to create e.g speak like a realtor
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        ...apiMessages, //[message1, message2, message3...]
      ],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "BpH",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "50rem", width: "44rem" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? <TypingIndicator content="BpH is Typing" /> : null
                }
              >
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
