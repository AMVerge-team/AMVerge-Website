import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import About from "./components/About.tsx"
import CTA from "./components/CTA.tsx"
import Landing from "./components/Landing.tsx"
import Explanation from "./components/Explanation.tsx"
import Navbar from "./components/Navbar.tsx"
import Merge from "./components/Merge.tsx"
import Footer from "./components/Footer.tsx"
import './App.css'

function App() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 0)
  }, [hash])

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
      <Footer />
    </>
  )
}

export default App
