import React from 'react';
import { Story } from '../types';
import { ShoppingBag, BookOpen } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  onPurchase: (story: Story) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onPurchase }) => {
  return (
    <div className="group bg-lafz-card rounded-xl overflow-hidden border border-white/5 hover:border-lafz-sky/50 transition-all duration-500 hover:shadow-xl hover:shadow-lafz-sky/10 flex flex-col h-full">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={story.coverUrl} 
          alt={story.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10">
            {story.genre}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border ${story.isPaid ? 'bg-lafz-sky/20 text-lafz-sky border-lafz-sky/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
            {story.isPaid ? 'Premium' : 'Free'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-lafz-sky transition-colors">
          {story.title}
        </h3>
        <p className="text-lafz-muted text-sm line-clamp-3 mb-6 flex-grow font-light leading-relaxed">
          {story.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="text-white font-medium">
            {story.isPaid ? story.price : 'Free'}
          </div>
          <button 
            onClick={() => onPurchase(story)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
              ${story.isPaid 
                ? 'bg-white text-black hover:bg-lafz-sky hover:text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }`}
          >
            {story.isPaid ? (
              <>
                <ShoppingBag size={16} /> Buy PDF
              </>
            ) : (
              <>
                <BookOpen size={16} /> Read Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;