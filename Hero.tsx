import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - Attractive Dark/Romantic Theme */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2000&auto=format&fit=crop" 
          alt="Atmospheric dark library with candles" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-lafz-dark via-lafz-dark/80 to-black/40"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lafz-sky/5 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Tagline Badge */}
        <div className="mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
           <span className="inline-block py-2 px-6 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-lafz-sky text-sm tracking-[0.2em] uppercase font-medium shadow-2xl">
             Where Words Find Their Soul
           </span>
        </div>
        
        {/* Main Attractive Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-2xl animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
          Unveiling The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lafz-sky via-white to-lafz-cyan">
            Unspoken
          </span>
        </h1>

        {/* Writer by Anonymous Subtitle */}
        <div className="mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <p className="text-xl md:text-2xl text-lafz-muted font-display tracking-widest uppercase border-y border-white/10 py-3 px-8 inline-block backdrop-blur-sm">
                Writer by <span className="text-white font-bold">Anonymous</span>
            </p>
        </div>
        
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
          Immerse yourself in a world of raw emotion, hidden secrets, and heart-touching narratives. 
          A premium collection of stories that speak what you feel.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full animate-fade-in-up opacity-0" style={{ animationDelay: '1s' }}>
          <button 
            onClick={() => {
                const freeSection = document.getElementById('free-reads'); // Scroll to free reads on same page
                if(freeSection) freeSection.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="w-full sm:w-auto px-10 py-4 bg-lafz-sky hover:bg-sky-500 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(56,189,248,0.4)] flex items-center justify-center gap-3 text-lg"
          >
            <BookOpen size={20} />
            Read Free Stories
          </button>
          <button 
            onClick={() => onNavigate('stories')}
            className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/40 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles size={20} />
            Premium Library
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;