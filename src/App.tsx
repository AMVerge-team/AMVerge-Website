import About from "./components/About.tsx"
import CTA from "./components/CTA.tsx"
import Landing from "./components/Landing.tsx"
import Explanation from "./components/Explanation.tsx"
import Navbar from "./components/Navbar.tsx"
import Merge from "./components/Merge.tsx"
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <About />
        <Explanation />
        <Merge />
        <CTA />
      </main>
    </>
  )
}

export default App
