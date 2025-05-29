import React, { useState, useEffect, useRef } from 'react'

// Simulasi CountUp.js functionality
class CountUp {
  constructor(target, startVal, endVal, decimals, duration, options) {
    this.target = target
    this.startVal = startVal || 0
    this.endVal = endVal
    this.decimals = Math.max(0, decimals || 0)
    this.duration = duration * 1000 || 2000
    this.options = options || {}
    this.frameVal = this.startVal
    this.frame = null
  }

  start(callback) {
    this.callback = callback
    this.rAF = Date.now()
    this.startTime = this.rAF
    this.remaining = this.duration
    this.frameVal = this.startVal
    this.count()
  }

  count() {
    const now = Date.now()
    this.remaining = this.duration - (now - this.startTime)
    
    if (this.remaining > 0) {
      const progress = (this.duration - this.remaining) / this.duration
      // Easing function
      const easedProgress = this.easeOutQuart(progress)
      this.frameVal = this.startVal + (this.endVal - this.startVal) * easedProgress
      
      if (this.target) {
        this.target.textContent = this.formatNumber(this.frameVal)
      }
      
      this.frame = requestAnimationFrame(() => this.count())
    } else {
      this.frameVal = this.endVal
      if (this.target) {
        this.target.textContent = this.formatNumber(this.endVal)
      }
      if (this.callback) this.callback()
    }
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }

  formatNumber(num) {
    const result = this.decimals === 0 ? Math.floor(num) : num.toFixed(this.decimals)
    return result + (this.options.suffix || '')
  }

  reset() {
    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
    this.frameVal = this.startVal
    if (this.target) {
      this.target.textContent = this.formatNumber(this.startVal)
    }
  }
}

function AnimatedCounter({ end, decimals = 0, duration = 2, suffix = "", prefix = "" }) {
  const countRef = useRef(null)
  const countUpRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible && countRef.current) {
      // Initialize CountUp
      countUpRef.current = new CountUp(
        countRef.current,
        0,
        end,
        decimals,
        duration,
        {
          suffix: suffix,
          prefix: prefix
        }
      )
      
      // Start animation
      countUpRef.current.start()
    }

    return () => {
      if (countUpRef.current) {
        countUpRef.current.reset()
      }
    }
  }, [isVisible, end, decimals, duration, suffix, prefix])

  return (
    <div className="text-center">
      <div ref={countRef} className="text-2xl font-bold">
        0{suffix}
      </div>
    </div>
  )
}

// Alternative menggunakan custom hook untuk smooth counting
function useCountAnimation(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function - ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(easeProgress * (end - startValue) + startValue)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }

  return { count, startAnimation, isAnimating }
}

function AlternativeCounter({ target, suffix = "" }) {
  const [isVisible, setIsVisible] = useState(false)
  const { count, startAnimation } = useCountAnimation(target, 2500)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startAnimation()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible, startAnimation])

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold">{count}{suffix}</div>
    </div>
  )
}

function CafeHeroSection() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-amber-900 font-[Poppins] leading-tight">
              Ditcafe
            </h1>
            <p className="text-xl sm:text-2xl text-amber-700 font-medium font-[Poppins]">
              Where Every Cup Tells a Story
            </p>
          </div>
          
          <p className="text-lg text-amber-800 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Temukan kelezatan kopi premium dan suasana hangat yang membuat setiap kunjungan menjadi pengalaman tak terlupakan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Order Now
            </button>
            <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              View Menu
            </button>
          </div>
          
          {/* Stats dengan CountUp Animation */}
          <div className="flex items-center justify-center lg:justify-start space-x-6 text-amber-700">
            <div className="flex flex-col items-center">
              <AnimatedCounter end={500} suffix="+" duration={2.5} />
              <div className="text-sm mt-1">Happy Customers</div>
            </div>
            <div className="h-8 w-px bg-amber-300"></div>
            <div className="flex flex-col items-center">
              <AlternativeCounter target={50} suffix="+" />
              <div className="text-sm mt-1">Coffee Variants</div>
            </div>
            <div className="h-8 w-px bg-amber-300"></div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={4.9} decimals={1} duration={3} />
              <div className="text-sm mt-1">Rating</div>
            </div>
          </div>
        </div>
        
        {/* Image/Visual Content - Coffee Shop Scene */}
        <div className="relative">
          <div className="relative z-10 flex items-center justify-center">
            {/* Main Coffee Shop Building */}
            <div className="relative">
              {/* Building Base */}
              <div className="w-80 h-64 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-3xl shadow-2xl relative overflow-hidden">
                
                {/* Roof */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-16 bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-full shadow-xl border-4 border-red-900"></div>
                
                {/* Main Window/Storefront */}
                <div className="absolute top-12 left-8 right-8 bottom-16 bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-2xl border-4 border-amber-600 shadow-inner">
                  
                  {/* Window Frames */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-amber-700 rounded-full"></div>
                  <div className="absolute top-1/2 left-4 right-4 h-1 bg-amber-700 rounded-full"></div>
                  <div className="absolute top-4 left-1/2 bottom-4 w-1 bg-amber-700 rounded-full transform -translate-x-1/2"></div>
                  
                  {/* Interior Scene */}
                  <div className="absolute top-8 left-6 right-6 bottom-8 bg-gradient-to-t from-amber-100 to-amber-50 rounded-lg overflow-hidden">
                    
                    {/* Tables and Chairs */}
                    <div className="absolute bottom-6 left-4 w-8 h-6 bg-amber-700 rounded-lg shadow-md"></div>
                    <div className="absolute bottom-4 left-6 w-4 h-4 bg-amber-600 rounded-full shadow-sm"></div>
                    <div className="absolute bottom-4 left-2 w-4 h-4 bg-amber-600 rounded-full shadow-sm"></div>
                    
                    <div className="absolute bottom-6 right-6 w-6 h-4 bg-amber-700 rounded-lg shadow-md"></div>
                    <div className="absolute bottom-4 right-8 w-3 h-3 bg-amber-600 rounded-full shadow-sm"></div>
                    <div className="absolute bottom-4 right-5 w-3 h-3 bg-amber-600 rounded-full shadow-sm"></div>
                    
                    {/* Coffee Machine/Counter */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-t from-gray-800 to-gray-600 rounded-lg shadow-lg">
                      <div className="absolute top-1 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-1 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500"></div>
                    </div>
                    
                    {/* Warm Light Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/30 to-transparent rounded-lg"></div>
                  </div>
                </div>
                
                {/* Door */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-2xl border-2 border-amber-900 shadow-xl">
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-b from-amber-600 to-amber-700 rounded-xl border border-amber-800">
                    <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg border border-amber-500"></div>
                    <div className="absolute right-2 top-6 w-2 h-2 bg-amber-900 rounded-full"></div>
                  </div>
                </div>
                
                {/* Sign */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg border-2 border-amber-600 shadow-lg flex items-center justify-center">
                  <span className="text-amber-900 font-bold text-sm">DITCAFE</span>
                </div>
              </div>
              
              {/* Smoke from Roof */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 translate-x-8">
                <div className="relative">
                  <div className="absolute w-2 h-16 bg-gradient-to-t from-gray-500/40 via-gray-400/30 to-transparent rounded-full animate-pulse transform rotate-12" style={{animationDelay: '0s', animationDuration: '4s', filter: 'blur(1px)'}}></div>
                  <div className="absolute w-3 h-20 bg-gradient-to-t from-gray-600/50 via-gray-500/30 to-transparent rounded-full animate-pulse transform -translate-x-4 -rotate-6" style={{animationDelay: '1s', animationDuration: '5s', filter: 'blur(1.5px)'}}></div>
                  <div className="absolute w-2 h-14 bg-gradient-to-t from-gray-400/35 to-transparent rounded-full animate-pulse transform translate-x-6 rotate-20" style={{animationDelay: '2s', animationDuration: '4.5s', filter: 'blur(1px)'}}></div>
                </div>
              </div>
              
              {/* Ground/Base */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-8 bg-gradient-to-r from-green-600 via-green-500 to-green-600 rounded-full shadow-lg opacity-80"></div>
              
              {/* Trees/Plants around */}
              <div className="absolute -left-12 bottom-0 w-6 h-24 bg-gradient-to-t from-green-800 to-green-600 rounded-full shadow-md">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-green-500 to-green-600 rounded-full shadow-sm"></div>
              </div>
              
              <div className="absolute -right-16 bottom-0 w-8 h-32 bg-gradient-to-t from-green-900 to-green-700 rounded-full shadow-lg">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-green-400 to-green-500 rounded-full shadow-md"></div>
              </div>
              
              {/* Small Details */}
              <div className="absolute top-20 -left-8 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-32 -right-10 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-50" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-16 -left-16 w-4 h-4 bg-red-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-8 h-8 opacity-60 animate-bounce transform rotate-45" style={{animationDelay: '0.5s'}}>
            <div className="w-full h-full bg-amber-400 rounded-lg shadow-lg"></div>
          </div>
          <div className="absolute top-16 right-12 w-6 h-6 opacity-50 animate-bounce transform -rotate-12" style={{animationDelay: '1.5s'}}>
            <div className="w-full h-full bg-orange-400 rounded-full shadow-md"></div>
          </div>
          <div className="absolute bottom-20 left-4 w-5 h-5 opacity-70 animate-bounce transform rotate-30" style={{animationDelay: '2.5s'}}>
            <div className="w-full h-full bg-red-400 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default CafeHeroSection