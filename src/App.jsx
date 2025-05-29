import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './assets/Navbar'
import CafeAboutSection from './assets/Section2'
import CafeHeroSection from './assets/Section1'
import CafeMenuSection from './assets/Menu'
import SimpleCafeFooter from './assets/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <CafeHeroSection />
    <CafeAboutSection />
    <CafeMenuSection />
    <SimpleCafeFooter />
   
    </>
  )
}

export default App
