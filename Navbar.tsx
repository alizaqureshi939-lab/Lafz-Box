import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Stories', id: 'stories' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-lafz-dark/95 backdrop-blur-md shadow-lg py-3 border-white/10'
          : 'bg-lafz-dark/50 backdrop-blur-sm py-4 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col cursor-pointer group" onClick={() => handleNavClick('home')}>
            <span className="text-2xl md:text-3xl font-display text-white tracking-widest">
              Lafz<span className="text-lafz-sky group-hover:text-lafz-cyan transition-colors">-Box</span>
            </span>
            <span className="text-[10px] md:text-xs text-lafz-muted tracking-wider font-sans uppercase">
              Where Words Find Their Soul
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-all duration-300 uppercase tracking-wide cursor-pointer relative py-2
                  ${activeView === link.id ? 'text-lafz-sky' : 'text-lafz-muted hover:text-white'}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-lafz-sky transform transition-transform duration-300 ${activeView === link.id ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-lafz-text hover:text-lafz-sky focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-lafz-card border-t border-white/5 absolute w-full left-0 shadow-2xl">
          <div className="px-4 pt-4 pb-8 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors
                   ${activeView === link.id ? 'bg-lafz-sky/10 text-lafz-sky' : 'text-lafz-text hover:bg-white/5 hover:text-white'}
                `}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;