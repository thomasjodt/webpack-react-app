import './styles/App.css'

export function App() {
  // You can remove from this line
  return (
    <div className='App'> 
      <h1>Welcome to WebPack React App</h1>
      <img
        className='react-logo' 
        src={require('../public/logo.png')} 
        alt="React Logo" />
      <p>Edit <b>App.jsx</b> to add changes.</p>
    </div>
    // To this line.
  )
}