import React, { useState, useEffect } from 'react'
import { Menu, X, Coffee, MapPin, Phone, Clock } from 'lucide-react'

function CafeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Menu', href: '#menu' },
  ]

  return (
    <>
      {/* Top Bar */}
    
      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-amber-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Coffee className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900 font-[Poppins]">
                  Dit<span className="text-orange-600">cafe</span>
                </h1>
                <p className="text-xs text-amber-700 -mt-1">Premium Coffee Experience</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative text-amber-800 hover:text-amber-600 font-medium transition-all duration-300 group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Order Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-amber-800 hover:text-amber-600 p-2 rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-amber-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-amber-800 hover:text-amber-600 font-medium py-3 px-4 rounded-lg hover:bg-amber-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-amber-100 space-y-3">
                <div className="flex items-center space-x-3 text-amber-700 px-4">
                  <MapPin size={16} />
                  <span className="text-sm"> Komplek Pertokoan Central Park, Jl. Kabupaten Badung, Bali 80361</span>
                </div>
                <div className="flex items-center space-x-3 text-amber-700 px-4">
                  <Phone size={16} />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-3 text-amber-700 px-4">
                  <Clock size={16} />
                  <span className="text-sm">07:00 - 23:00</span>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-4 px-4">
                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-lg">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Coffee Beans Animation */}
      <div className="fixed top-24 left-4 w-2 h-3 bg-amber-800 rounded-full opacity-20 animate-bounce transform rotate-12 pointer-events-none z-40">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-amber-900 rounded-full"></div>
      </div>
      <div className="fixed top-32 right-8 w-2 h-3 bg-amber-900 rounded-full opacity-15 animate-bounce delay-500 transform -rotate-12 pointer-events-none z-40">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-amber-950 rounded-full"></div>
      </div>
    </>
  )
}

export default CafeNavbar