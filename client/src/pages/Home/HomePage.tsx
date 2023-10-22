import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = ({ username, setUsername, room, setRoom, socket }: any) => {
    const navigate = useNavigate();

    const joinRoom = (event: any) => {
        event.preventDefault();
        if (room !== '' && username !== '') {
          socket.emit('join_room', { username, room });
        }
        navigate('/chat', { replace: true });
    };

  return (
    <main className="h-screen w-screen flex justify-center items-center home-background">
        <div className="w-3/12 border border-slate-100 rounded p-8 bg-white">
            <h1 className="font-bold text-center text-xl mb-4">Reservoir Chats</h1>
            <form>
                <input
                    type="text" 
                    className="w-full border border-slate-100 rounded p-2 mb-3 font-light"
                    placeholder="e.g. Nice Guy Eddie"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select 
                    className="w-full p-2 rounded bg-white border border-slate-100 mb-3"
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>-- Select Room --</option>
                    <option className="bg-white" value="bank" disabled>The Bank</option>
                    <option value="warehouse">The Warehouse</option>
                </select>
                <button
                    type="button"
                    className="w-full bg-slate-900 text-white p-2 rounded"
                    onClick={joinRoom}
                >
                    Enter Chatroom
                </button>
            </form>
        </div>
    </main>
  )
}

export default HomePage