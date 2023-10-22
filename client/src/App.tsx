import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

// Import pages 
import { HomePage, ChatPage } from "@/pages/"

const socket = io.connect('http://localhost:4000')

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
            <HomePage 
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom} 
              socket={socket} 
            />
          }
        />
        <Route 
          path='/chat' 
          element={
            <ChatPage 
              username={username} 
              room={room} 
              socket={socket} 
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
