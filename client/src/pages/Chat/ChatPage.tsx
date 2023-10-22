import React from 'react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Avatar from "boring-avatars";

import { ChatMessages, SendMessage, RoomUsers } from '@/components'

const ChatPage = ({ socket, username, room }: any) => {
  return (
    <div className="flex justify-start ">
      <div className="w-2/12 p-6 flex flex-col justify-between border-r border-slate-100">
        <div className="">
          <h2 className="font-bold text-slate-700 text-2xl">Chats</h2>
          <RoomUsers socket={socket} username={username} room={room} />
        </div>
        <div className="">
          <button className="border border-red-400 rounded text-red-400 my-4 w-full flex p-2 px-4 justify-between align-center items-center">
            <span>Logout</span>
            <FaArrowRightFromBracket />
          </button>
          <p className="text-xs text-slate-300">v0.1.0</p>
        </div>        
      </div>
      <div className="w-10/12 h-screen bg-gray-50 flex flex-col justify-between">
        <div className="w-full">
          <ChatMessages socket={socket} room={room}/>
        </div>
        <div className="w-full">
          <SendMessage socket={socket} username={username} room={room} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage