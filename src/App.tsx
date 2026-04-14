import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import About from "./components/About.tsx"
import CTA from "./components/CTA.tsx"
import Landing from "./components/Landing.tsx"
import Explanation from "./components/Explanation.tsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Landing />
        <About />
        <Explanation />
        <CTA />
      </main>
    </>
  )
}

export default App
