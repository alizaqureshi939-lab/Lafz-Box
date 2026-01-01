import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-lafz-card border-y border-white/5 scroll-mt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lafz-muted">For collaborations, copyright or support queries</p>
        </div>

        {/* Direct Email Card */}
        <div className="mb-10 p-6 bg-gradient-to-r from-lafz-sky/10 to-transparent rounded-2xl border border-lafz-sky/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             {/* Real Clickable Email Icon */}
             <a href="mailto:lafzbox@gmail.com" className="bg-lafz-sky/20 p-3 rounded-full text-lafz-sky hover:bg-lafz-sky hover:text-black transition-all cursor-pointer">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
               </svg>
             </a>
             <div className="text-left">
               <h3 className="text-white font-bold text-lg">Email Us Directly</h3>
               <p className="text-lafz-muted text-sm">We usually respond within 24 hours</p>
             </div>
          </div>
          <a href="mailto:lafzbox@gmail.com" className="text-xl md:text-2xl font-bold text-lafz-sky hover:text-white transition-colors underline decoration-2 underline-offset-4">
            lafzbox@gmail.com
          </a>
        </div>

        <form className="space-y-6 bg-lafz-dark p-8 rounded-2xl border border-white/5 shadow-xl" onSubmit={(e) => e.preventDefault()}>
          <div className="text-white font-serif text-lg mb-2">Send a Message</div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-lafz-text">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-lafz-sky text-white transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-lafz-text">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-lafz-sky text-white transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-lafz-text">Message</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-lafz-sky text-white transition-colors resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-lafz-sky hover:bg-sky-600 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2">
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;