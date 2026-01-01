import React from 'react';
import { Feather, Shield, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-lafz-dark relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">About Lafz-Box</h2>
          <div className="w-24 h-1 bg-lafz-sky mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-lafz-text leading-relaxed font-light">
              <span className="text-lafz-sky font-serif text-2xl">Lafz-Box</span> is more than just a platform; it is a sanctuary for the unspoken. We believe that the most powerful stories are often the ones told from the shadows.
            </p>
            <p className="text-lafz-muted leading-relaxed">
              Our mission is to provide a safe haven for anonymous writers to share their deepest emotions, wildest mysteries, and tenderest romances without the burden of identity. We focus purely on the quality of storytelling, ensuring that every PDF you download resonates with the soul.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { 
                icon: <Shield className="w-6 h-6 text-lafz-cyan" />, 
                title: "Anonymous Creativity", 
                desc: "Writers remain 100% anonymous, allowing for raw and authentic expression." 
              },
              { 
                icon: <Feather className="w-6 h-6 text-lafz-sky" />, 
                title: "Original Content", 
                desc: "Every story is original, legal, and crafted exclusively for Lafz-Box." 
              },
              { 
                icon: <Heart className="w-6 h-6 text-red-400" />, 
                title: "Emotional Depth", 
                desc: "Curated for those who seek romance, soft GL, and emotional mystery." 
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/5 hover:border-lafz-sky/20 transition-colors">
                <div className="p-3 bg-black/30 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-lafz-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;