import '@styles/App.css'

export function App() {
  return (
    <div className='App'>
      <h1>Welcome to WebPack React App</h1>
      <img
        className='react-logo' 
        src={require('@public/logo.png')} 
        alt="React Logo" />
    </div>
  )
}