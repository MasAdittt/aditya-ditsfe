import React, { useState, useEffect, useRef } from 'react'
import { Coffee, Cookie, Sandwich, IceCream, Star, Heart, Clock, DollarSign, MapPin, Phone, Mail, Navigation } from 'lucide-react'

function MenuCard({ image, title, description, price, category, rating, isPopular, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
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
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">
            ☕
          </div>
        )}
        {isPopular && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Popular
          </div>
        )}
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          <Heart 
            size={18} 
            className={`${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors duration-300`} 
          />
        </button>
        
        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold text-gray-700">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">{category}</span>
          <div className="flex items-center space-x-1 text-amber-600">
            <DollarSign size={16} />
            <span className="text-lg font-bold">{price}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-amber-800 text-sm leading-relaxed mb-4">
          {description}
        </p>

        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function CategoryTab({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
        isActive 
          ? 'bg-amber-600 text-white shadow-lg transform scale-105' 
          : 'bg-white/70 text-amber-600 hover:bg-amber-100 border border-amber-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )
}

function LocationSection() {
  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold font-[Lexend] text-slate-900 mb-6 text-amber-900">
            Our Location
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-[lexend]">
            Temukan kami di lokasi yang strategis dan mudah dijangkau. 
            Nikmati suasana yang nyaman dan pelayanan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Container */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              <div className="aspect-video">
                <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.9483588266817!2d115.17727747464026!3d-8.711823791337396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd246c84b624c43%3A0x43c45e475aaa916!2sKopi%20Zeen%20%3A%20best%20cafe%20Bali%20Kuta!5e1!3m2!1sid!2sid!4v1748498803962!5m2!1sid!2sid"                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ditcafe Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            
            {/* Floating Direction Button */}
            <button className="absolute top-4 right-4 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              <Navigation size={20} />
            </button>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <MapPin className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Alamat Lengkap</h3>
                  <p className="text-slate-700 leading-relaxed">
                  Komplek Pertokoan Central Park,<br/>
                   Jl. Patih Jelantik, Kuta, Kec. Kuta,<br/>
                    Kabupaten Badung, Bali 80361
                    
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Phone className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">Telepon</h4>
                </div>
                <p className="text-slate-700">+62 895-3471-64682</p>
               
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">Email</h4>
                </div>
                <p className="text-slate-700">info@ditcafe.com</p>
                <p className="text-slate-700">adityabayuw@gmail.com</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="text-purple-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Jam Operasional</h3>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between">
                      <span>Senin - Jumat</span>
                      <span className="font-semibold">07:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu - Minggu</span>
                      <span className="font-semibold">08:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between text-amber-600 font-semibold">
                      <span>Happy Hour</span>
                      <span>14:00 - 17:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <Navigation size={20} />
                <span>Get Directions</span>
              </button>
              <button className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Mudah Ditemukan & Dijangkau</h3>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Berlokasi strategis di pusat kota dengan akses transportasi umum yang mudah. 
              Tersedia parkir luas untuk kendaraan pribadi dan area yang ramah untuk pejalan kaki.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CafeMenuSection() {
  const [activeCategory, setActiveCategory] = useState('coffee')

  const categories = [
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'pastry', label: 'Pastry', icon: Cookie },
    { id: 'food', label: 'Food', icon: Sandwich },
    { id: 'dessert', label: 'Dessert', icon: IceCream }
  ]

  const menuItems = {
    coffee: [
      {
        image: '/src/image/espresso.jpg',
        title: 'Signature Espresso',
        description: 'Rich and bold espresso shot with perfect crema, made from our premium blend beans',
        price: '25K',
        category: 'Hot Coffee',
        rating: '4.9',
        isPopular: true
      },
      {
        image: '/src/image/caramel.jpg',
        title: 'Caramel Macchiato',
        description: 'Smooth espresso with steamed milk, vanilla syrup and caramel drizzle',
        price: '35K',
        category: 'Hot Coffee',
        rating: '4.8',
        isPopular: true
      },
      {
        image: '/src/image/ice.jpg',
        title: 'Iced Americano',
        description: 'Refreshing cold brew with ice, perfect for hot weather coffee lovers',
        price: '28K',
        category: 'Cold Coffee',
        rating: '4.7',
        isPopular: false
      },
      {
        image: '/src/image/matcha.jpg',
        title: 'Matcha Latte',
        description: 'Premium Japanese matcha powder with steamed milk and light sweetness',
        price: '32K',
        category: 'Specialty',
        rating: '4.6',
        isPopular: false
      },
      {
        image: '/src/image/cappuc.jpg',
        title: 'Cappuccino',
        description: 'Classic Italian coffee with equal parts espresso, steamed milk and foam',
        price: '30K',
        category: 'Hot Coffee',
        rating: '4.8',
        isPopular: false
      },
      {
        image: '/src/image/frap.jpg',
        title: 'Frappuccino',
        description: 'Blended iced coffee with whipped cream and your choice of flavor',
        price: '38K',
        category: 'Cold Coffee',
        rating: '4.7',
        isPopular: true
      }
    ],
    pastry: [
      {
        image: '/src/image/croisssant.jpg',
        title: 'Fresh Croissant',
        description: 'Buttery, flaky pastry baked fresh daily, perfect with your morning coffee',
        price: '18K',
        category: 'Bakery',
        rating: '4.8',
        isPopular: true
      },
      {
        image: '/src/image/blue.jpg',
        title: 'Blueberry Muffin',
        description: 'Moist and fluffy muffin packed with fresh blueberries',
        price: '22K',
        category: 'Bakery',
        rating: '4.7',
        isPopular: false
      },
      {
        image: '/src/image/cokocip.jpg',
        title: 'Chocolate Chip Cookie',
        description: 'Warm, gooey cookies with premium chocolate chips',
        price: '15K',
        category: 'Sweet',
        rating: '4.9',
        isPopular: true
      },
      {
        image: '/src/image/bagel.jpg',
        title: 'Everything Bagel',
        description: 'Toasted bagel with cream cheese and everything seasoning',
        price: '25K',
        category: 'Bakery',
        rating: '4.6',
        isPopular: false
      }
    ],
    food: [
      {
        image: '/src/image/sand.jpg',
        title: 'Club Sandwich',
        description: 'Triple-layered sandwich with chicken, bacon, lettuce and tomato',
        price: '45K',
        category: 'Main Course',
        rating: '4.8',
        isPopular: true
      },
      {
        image: '/src/image/nasgor.jpg',
        title: 'Nasi Goreng',
        description: 'Friend Rice Special recipe from java',
        price: '20K',
        category: 'Breakfast',
        rating: '4.7',
        isPopular: false
      },
      {
        image: '/src/image/salad.jpg',
        title: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing, croutons and parmesan',
        price: '38K',
        category: 'Healthy',
        rating: '4.6',
        isPopular: false
      },
      {
        image: '🌯',
        title: 'Chicken Wrap',
        description: 'Grilled chicken with vegetables wrapped in soft tortilla',
        price: '35K',
        category: 'Light Meal',
        rating: '4.7',
        isPopular: true
      }
    ],
    dessert: [
      {
        image: '/src/image/tiramisu.jpg',
        title: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
        price: '35K',
        category: 'Signature',
        rating: '4.9',
        isPopular: true
      },
      {
        image: '/src/image/straw.jpg',
        title: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: '32K',
        category: 'Hot Dessert',
        rating: '4.8',
        isPopular: true
      },
      {
        image: '/src/image/risol.jpg',
        title: 'Gorengan',
        description: 'gorengan tradisional Indonesia, cocok untuk teman ngopi',
        price: '10K',
        category: 'Coffee Dessert',
        rating: '4.7',
        isPopular: false
      },
      {
        image: '/src/image/pie.jpg',
        title: 'Apple Pie',
        description: 'Homemade apple pie with cinnamon and flaky crust',
        price: '30K',
        category: 'Traditional',
        rating: '4.6',
        isPopular: false
      }
    ]
  }

  return (
    <div>
      {/* Menu Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-yellow-200/15 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6 font-[Poppins]">
              Menu Spesial Kami
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed font-[Poppins]">
              Nikmati koleksi menu premium kami yang dibuat dengan bahan-bahan berkualitas tinggi. 
              Setiap hidangan disiapkan dengan cinta untuk memberikan pengalaman kuliner terbaik.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <CategoryTab
                key={category.id}
                icon={category.icon}
                label={category.label}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {menuItems[activeCategory].map((item, index) => (
              <MenuCard
                key={`${activeCategory}-${index}`}
                {...item}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-center text-white shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Clock size={32} className="mr-3" />
              <h3 className="text-2xl font-bold">Happy Hour Special!</h3>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Dapatkan diskon 20% untuk semua minuman kopi setiap hari pukul 14:00 - 17:00
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105">
                Order Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              Siap Merasakan Pengalaman Kopi Terbaik?
            </h3>
            <p className="text-amber-700 mb-8 max-w-2xl mx-auto">
              Kunjungi Ditcafe hari ini dan rasakan perbedaan kualitas premium dalam setiap tegukan. 
              Your perfect coffee moment awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Visit Our Cafe
              </button>
              <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                See Location
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-16 opacity-20">
          <Coffee size={24} className="text-amber-800 animate-bounce" />
        </div>
        <div className="absolute bottom-40 right-12 opacity-20">
          <Cookie size={20} className="text-amber-700 animate-bounce delay-300" />
        </div>
        <div className="absolute top-2/3 left-8 opacity-20">
          <IceCream size={28} className="text-amber-900 animate-bounce delay-700" />
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />
    </div>
  )
}

export default CafeMenuSection