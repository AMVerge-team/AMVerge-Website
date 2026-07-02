import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useSEO from "./hooks/useSEO"
import About from "./components/home/About.tsx"
import CTA from "./components/home/CTA.tsx"
import Landing from "./components/home/Landing.tsx"
import Explanation from "./components/home/Explanation.tsx"
import Navbar from "./components/ui/Navbar.tsx"
import Merge from "./components/home/Merge.tsx"
import Contributors from "./components/home/Contributors.tsx"
import Footer from "./components/ui/Footer.tsx"
import SectionDivider from "./components/ui/SectionDivider.tsx"
import './css/home.css'

function App() {
  const { hash } = useLocation()

  useSEO({
    title: "Fast Scene Selection for AMV Editors",
    description: "AMVerge splits any video into individual scenes automatically. Browse in a grid and export clips instantly. Free, open-source, built for the AMV community.",
    url: "https://amverge.app/",
  })

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
        <SectionDivider />
        <Explanation />
        <SectionDivider />
        <Merge />
        <SectionDivider />
        <CTA />
        <SectionDivider />
        <Contributors />
      </main>
      <Footer />
    </>
  )
}

export default App
