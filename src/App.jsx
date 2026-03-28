import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <main className="container">
        <header>
          <h1 className="title">Welcome to React</h1>
          <p className="subtitle">
            Your premium development environment is ready. <br/>
            Experience next-level performance and elegant design right out of the box.
          </p>
        </header>

        <div className="interactive-area">
          <button 
            className="btn"
            onClick={() => setCount((count) => count + 1)}
          >
            Enhance Experience
          </button>
          
          <div className="status">
            Interaction Level: <strong>{count}</strong>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
