import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './modules/socket'

function App() {
  const [messageList, updateMessageList] = useState<string[]>([])
  const [newMessage, updateNewMessage] = useState<string>('')

  useEffect(() => {
    socket.off('boom')
    socket.off('chouchou')
    socket.off('chat message')
    socket.on('chat message', (msg: string) => {
      console.log('new message received', msg)
      updateMessageList([...messageList, msg])
    })
    socket.on('chouchou', () => {
      console.log('new message received')
      updateMessageList([...messageList, 'chouchou'])
    })
    socket.on('boom', () => {
      console.log('new message received')
      updateMessageList([...messageList, 'boom'])
    })

    return () => {
      socket.off('boom')
      socket.off('chouchou')
      socket.off('chat message')
    }
  })

  return (
    <div>
      <ul>
        {messageList.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form action="">
        <input 
          type="text"
          id="message" 
          onChange={(e) => updateNewMessage(e.target.value)}
          value={newMessage} 
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            socket.emit('chat message', newMessage)
            updateNewMessage('')
          }}
        >
          Send
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            socket.emit('send-others-a-message', newMessage)
            updateNewMessage('')
          }}
        >
          Send to others
        </button>
        
        <button
          onClick={(e) => {
            e.preventDefault()
            socket.emit('send-to-last-socket', newMessage)
            updateNewMessage('')
          }}
        >
          Send to last socket
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            socket.emit('patate')
            updateNewMessage('')
          }}
        >
          Patate
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            socket.emit('bim')
            updateNewMessage('')
          }}
        >
          Bim
        </button>
      </form>

    </div>
  )
}

export default App
