import './styles/App.css'
import { useState } from 'react'

export function App() {
  // You can remove from this line

  const [count, setCount] = useState(0)

  const addCount = () => setCount(count + 1)
  const resetCounter = () => setCount(0)

  return (
    <div className='App'> 
      <h1>Welcome to WebPack React App</h1>
      <div className='img-container' >
      <img
        className='react-logo' 
        src={require('../public/logo.png')} 
        alt="React Logo"
      />
        <div className='counter' onClick={resetCounter} >{count}</div>
      </div>
      <p>Edit <b>App.jsx</b> to add changes.</p>
      <button onClick={addCount} >Click me</button>
    </div>
    // To this line.
  )
}