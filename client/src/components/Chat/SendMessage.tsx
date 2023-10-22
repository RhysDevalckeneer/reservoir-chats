import React, { useState } from 'react';
import { FaRegPaperPlane } from "react-icons/fa6";

const SendMessage = ({ socket, username, room }: any) => {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <form className="flex justify-between p-6 bg-white">
        <input 
          type="text"
          placeholder="Aa"
          className="flex grow rounded border border-slate-200 p-1 px-4"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button 
          type="button"
          onClick={sendMessage}
          className="bg-blue-500 text-white w-24 rounded flex justify-center items-center p-4 ml-2"
        >
          <FaRegPaperPlane />
        </button>
    </form>
  )
}

export default SendMessage