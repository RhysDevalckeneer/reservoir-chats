import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomUsers = ({ socket, username, room }: any) => {
    const [roomUsers, setRoomUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            console.log(data);
            setRoomUsers(data);
        });

        return () => socket.off('chatroom_users');
    }, [socket]);

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });
        // Redirect to home page
        navigate('/', { replace: true });
    };

  return (
    <div>
        {room}

        <div>
        {roomUsers.length > 0 && <h5 className="">Users:</h5>}
        <ul className="">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RoomUsers