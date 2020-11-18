import React from "react";
import {ChatContainer, Message, MessageInput, MessageList, MessageSeparator} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import "./chat.scss"

const Chat = () => (
  <div className={"chat"}>
    <div className="chat-inner">
      <ChatContainer>
        <MessageList>
          <MessageSeparator content="November 30, 2020"/>
          {
            [...Array(12)].map((x, i) => {
              return <Message key={i} model={{
                message: "Hello my friend",
                direction: Math.floor(Math.random() * 2) ? "incoming" : "outgoing",
                position: "single"
              }}/>
            })
          }
        </MessageList>
        <MessageInput placeholder="Type message here" attachButton={false}/>
      </ChatContainer>
    </div>
  </div>
);

export default Chat