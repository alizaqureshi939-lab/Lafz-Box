import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 bg-lafz-card/50 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Reader Reviews</h2>
          <div className="w-16 h-1 bg-lafz-sky mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-lafz-dark p-6 rounded-xl border border-white/5 relative group hover:border-lafz-sky/30 transition-all duration-300">
              <Quote className="absolute top-4 right-4 text-white/5 w-12 h-12 group-hover:text-lafz-sky/10 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < review.rating ? 'text-lafz-sky fill-lafz-sky' : 'text-gray-700'}`} 
                  />
                ))}
              </div>
              <p className="text-lafz-text font-light italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lafz-sky to-lafz-cyan flex items-center justify-center text-black font-bold text-xs">
                  {review.user.charAt(0)}
                </div>
                <span className="text-sm font-bold text-white">{review.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;