import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './modules/socket'

function App() {
  const [numbercomparison, updateNumbercomparison] = useState<string>('')
  const [mynumber, updateMynumber] = useState<number>(0)
  const [isthreeusers, updateIsthreeusers] = useState<boolean>(false)
  useEffect(() => {
    socket.off('reponse')
    socket.off('reponse_utilisateurs')
    // socket.on('number message', (msg: string) => {
    //   console.log('new message received', msg)
    //   updateNumbercomparison(msg);
    // })
    socket.on('reponse_utilisateurs', (reponseBoolean: boolean) => {
      updateIsthreeusers(reponseBoolean);
    })
    socket.on('reponse', (reponseString: string) => {
      updateNumbercomparison(reponseString);
    })


    return () => {
      socket.off('reponse')
      socket.off('reponse_utilisateurs')
    }
  })

  return (
    <div>
      {isthreeusers ?
      <div>
        <div>{numbercomparison}</div>
        {numbercomparison!=='Bravo'?
          <form action="">
            <input 
              type="number"
              id="message" 
              onChange={(e) => updateMynumber(parseInt(e.target.value))}
              value={mynumber} 
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                socket.emit('number message', mynumber)
                updateMynumber(0)
              }}
            >
              Send
            </button>
          </form>:
        <div>Un joueur a gagné</div>
        }
      </div> :
        <div>La partie commencera dès qu'il y aura trois utilisateurs</div>
      }
    </div>
  )
}

export default App
