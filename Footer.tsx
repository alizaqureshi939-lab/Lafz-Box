import React from 'react';
import { Heart, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Attractive Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lafz-sky to-transparent"></div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lafz-sky/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
             <div className="cursor-pointer inline-block group" onClick={() => onNavigate('home')}>
               <span className="text-3xl font-display text-white tracking-widest group-hover:text-lafz-sky transition-colors">
                  Lafz<span className="text-lafz-sky group-hover:text-white transition-colors">-Box</span>
                </span>
             </div>
             <p className="text-lafz-muted text-sm leading-relaxed max-w-xs">
               A sanctuary for the unspoken. Discover original, anonymous stories that touch the soul.
             </p>
             <div className="flex items-center gap-2 text-xs text-lafz-muted/60 mt-4">
               Made with <Heart size={12} className="text-red-500 fill-red-500" /> for readers everywhere.
             </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3 md:items-center">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Quick Navigation</h4>
            <button onClick={() => onNavigate('home')} className="text-lafz-muted hover:text-lafz-sky transition-colors text-sm text-left">Home</button>
            <button onClick={() => onNavigate('stories')} className="text-lafz-muted hover:text-lafz-sky transition-colors text-sm text-left">Premium Library</button>
            <button onClick={() => onNavigate('about')} className="text-lafz-muted hover:text-lafz-sky transition-colors text-sm text-left">About Us</button>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col space-y-4 md:items-end">
             <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Connect With Us</h4>
             
             <div className="flex gap-4">
               {/* Email - Real Icon Button Only */}
               <a 
                  href="mailto:lafzbox@gmail.com" 
                  title="Send us an Email"
                  className="bg-white/5 hover:bg-lafz-sky hover:text-black text-lafz-muted p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110 shadow-lg group"
               >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
               </a>

               {/* Instagram - Real Icon Button Only */}
               <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Follow us on Instagram"
                  className="bg-white/5 hover:bg-pink-600 hover:text-white text-lafz-muted p-3 rounded-full border border-white/10 transition-all duration-300 hover:scale-110 shadow-lg group"
               >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
               </a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-lafz-muted/50">
          <p>© {new Date().getFullYear()} Lafz-Box. All Rights Reserved.</p>
          <div className="flex gap-6 items-center">
             <button onClick={() => onNavigate('policy')} className="hover:text-lafz-sky transition-colors">Privacy Policy</button>
             <button onClick={() => onNavigate('terms')} className="hover:text-lafz-sky transition-colors">Terms of Service</button>
             {/* Secret Admin Entry */}
             <button onClick={() => onNavigate('admin')} className="text-white/10 hover:text-lafz-sky transition-colors ml-4" title="Owner Access">
               <Lock size={12} />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;