import React from 'react'
import { useState, useEffect, useRef } from 'react';

import Avatar from "boring-avatars";
import { BotMessage } from '@/components'

const ChatMessages = ({ socket, room }: any) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    useEffect(() => {
        socket.on('receive_message', (data) => {
          console.log(data);
          setMessagesReceived((state) => [
            ...state,
            {
              message: data.message,
              username: data.username,
              __createdtime__: data.__createdtime__,
            },
          ]);
        });
    
        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    useEffect(() => {
        // Last 100 messages sent in the chat room (fetched from the db in backend)
        socket.on('last_100_messages', (last100Messages) => {
          console.log('Last 100 messages:', JSON.parse(last100Messages));
          last100Messages = JSON.parse(last100Messages);
          // Sort these messages by __createdtime__
          last100Messages = sortMessagesByDate(last100Messages);
          setMessagesReceived((state) => [...last100Messages, ...state]);
        });
    
        return () => socket.off('last_100_messages');
      }, [socket]);

    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
        }, [messagesRecieved]);

    function sortMessagesByDate(messages) {
    return messages.sort(
        (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
    }

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    const isBot = "ChatBot";

    return (
        <div>
            <div className="bg-white p-4">
                <h2 className="text-xl font-bold text-slate-700">{room}</h2>
            </div>
            <div className="p-4 overflow-y-scroll h-[80vh]" ref={messagesColumnRef}>
                {messagesRecieved.map((msg, i) => (
                    <div className="w-full" key={i}>
                        {msg.username == isBot 
                            ? ( <BotMessage msg={msg.message} /> )
                            : (
                                <div className="rounded bg-white p-3 my-2 w-3/6 flex justify-start">
                                    <div className="flex flex-col items-center content-center justify-end">
                                        <Avatar
                                            size={35}
                                            name="Maria Mitchell"
                                            variant="marble"
                                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                        />  
                                    </div>
                                    <div className="w-11/12 flex flex-col ml-3">
                                        <div className="flex w-full justify-between">
                                            <span className="text-sm text-slate-400">{msg.username}</span>
                                            <span className="text-sm text-slate-400">{formatDateFromTimestamp(msg.__createdtime__)}</span>
                                        </div>
                                        <span className="text-slate-700">{msg.message}</span>
                                        
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatMessages