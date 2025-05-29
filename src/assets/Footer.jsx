import React from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Coffee, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart
} from 'lucide-react'

function SimpleCafeFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Description */}
          <div>
            <div className="flex items-center mb-4">
              <Coffee size={24} className="text-amber-300 mr-2" />
              <h3 className="text-xl font-bold">Ditcafe</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Tempat dimana cerita-cerita indah dimulai dengan secangkir kopi terbaik.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="https://instagram.com/ditcafe" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Instagram size={18} className="text-pink-400" />
              </a>
              <a href="https://facebook.com/ditcafe" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Facebook size={18} className="text-blue-400" />
              </a>
              <a href="https://twitter.com/ditcafe" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Twitter size={18} className="text-sky-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-white/80 hover:text-amber-300 transition-colors">Tentang Kami</a></li>
              <li><a href="#menu" className="text-white/80 hover:text-amber-300 transition-colors">Menu</a></li>
              <li><a href="#reservation" className="text-white/80 hover:text-amber-300 transition-colors">Reservasi</a></li>
              <li><a href="#events" className="text-white/80 hover:text-amber-300 transition-colors">Event</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-amber-300 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                Komplek Pertokoan Central Park, Jl. <br/>
                Patih Jelantik, Kuta, Kec. Kuta,<br/>
                 Kabupaten Badung, Bali 80361
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-amber-300 flex-shrink-0" />
                <span className="text-white/80">+62 22 1234 5678</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-amber-300 flex-shrink-0" />
                <span className="text-white/80">hello@ditcafe.com</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center text-white/60 mb-4 sm:mb-0">
            <span>© {currentYear} Ditcafe. Made with</span>
            <Heart size={14} className="mx-1 text-red-400 fill-red-400" />
            <span>in Indonesia</span>
          </div>
          
          <div className="flex space-x-4 text-white/60">
            <a href="#privacy" className="hover:text-amber-300 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-amber-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SimpleCafeFooter