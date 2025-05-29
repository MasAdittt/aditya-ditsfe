import React, { useState, useEffect, useRef } from 'react'
import { Coffee, Home, ChefHat, Cookie, Wifi, Music } from 'lucide-react'

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef(null)

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
    if (!isVisible) return

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * target)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div ref={countRef} className="text-center">
      <div className="text-3xl font-bold text-amber-900">{count}{suffix}</div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div 
      ref={cardRef}
      className={`bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-amber-100 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex justify-center mb-4">
        <Icon size={48} className="text-amber-600" />
      </div>
      <h3 className="text-xl font-bold text-amber-900 mb-3 text-center">{title}</h3>
      <p className="text-amber-800 text-center leading-relaxed">{description}</p>
    </div>
  )
}

function CafeAboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-200/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6 font-[Poppins]">
            Tentang Ditcafe
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Lebih dari sekedar kedai kopi, kami adalah tempat dimana cerita-cerita indah dimulai. 
            Setiap cangkir yang kami sajikan dibuat dengan dedikasi dan cinta untuk memberikan pengalaman terbaik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={Coffee}
            title="Premium Quality"
            description="Biji kopi pilihan terbaik dari perkebunan lokal dan internasional, dipanggang dengan sempurna untuk menciptakan cita rasa yang tak terlupakan."
            delay={0}
          />
          <FeatureCard
            icon={Home}
            title="Cozy Atmosphere"
            description="Suasana hangat dan nyaman dengan desain interior yang instagramable, perfect untuk me-time, meeting, atau quality time bersama teman."
            delay={200}
          />
          <FeatureCard
            icon={ChefHat}
            title="Expert Baristas"
            description="Tim barista berpengalaman yang passionate dalam menghadirkan setiap cup dengan teknik brewing terbaik dan latte art yang memukau."
            delay={400}
          />
          <FeatureCard
            icon={Cookie}
            title="Fresh Pastries"
            description="Pastry dan makanan ringan yang dibuat fresh setiap hari, perfect pairing untuk melengkapi pengalaman ngopi Anda."
            delay={600}
          />
          <FeatureCard
            icon={Wifi}
            title="Free Wi-Fi"
            description="Koneksi internet super cepat untuk mendukung produktivitas Anda, cocok untuk digital nomad dan remote workers."
            delay={800}
          />
          <FeatureCard
            icon={Music}
            title="Live Music"
            description="Live acoustic performance di weekend yang menciptakan ambiance yang lebih hidup dan memorable untuk pengunjung."
            delay={1000}
          />
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter target={500} suffix="+" duration={2500} />
              <p className="text-amber-700 font-medium mt-2">Happy Customers</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={50} suffix="+" duration={2000} />
              <p className="text-amber-700 font-medium mt-2">Coffee Variants</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={3} suffix=" Years" duration={2200} />
              <p className="text-amber-700 font-medium mt-2">Experience</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={24} suffix="/7" duration={1800} />
              <p className="text-amber-700 font-medium mt-2">Service Hours</p>
            </div>
          </div>
        </div>

     
      </div>

      {/* Floating Coffee Beans */}
      <div className="absolute top-20 left-20 w-4 h-6 bg-amber-800 rounded-full opacity-30 animate-bounce transform rotate-12">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-amber-900 rounded-full"></div>
      </div>
      <div className="absolute bottom-32 right-16 w-3 h-5 bg-amber-900 rounded-full opacity-25 animate-bounce delay-300 transform -rotate-12">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-amber-950 rounded-full"></div>
      </div>
      <div className="absolute top-1/2 right-32 w-5 h-7 bg-amber-700 rounded-full opacity-20 animate-bounce delay-700 transform rotate-45">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-5 bg-amber-900 rounded-full"></div>
      </div>
    </section>
  )
}

export default CafeAboutSection