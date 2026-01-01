import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoryCard from './components/StoryCard';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import PaymentModal from './components/PaymentModal';
import AdminLogin from './components/AdminLogin';
import { PAYMENT_CONFIG } from './constants';
import { Story, StoryGenre, PaymentConfig } from './types';
import { BookOpen, Feather, Loader2 } from 'lucide-react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // --- REAL-TIME DATABASE STATE ---
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Payment Config State (Global from Firebase)
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(PAYMENT_CONFIG);

  // 1. Fetch Stories from Firebase
  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("id", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const firebaseStories: Story[] = [];
      querySnapshot.forEach((doc) => {
        firebaseStories.push(doc.data() as Story);
      });
      setStories(firebaseStories);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching stories:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Fetch Payment Settings from Firebase (Real-time)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "config", "payment"), (doc) => {
        if (doc.exists()) {
            setPaymentConfig(doc.data() as PaymentConfig);
        } else {
            // Use default if not set in DB yet
            setPaymentConfig(PAYMENT_CONFIG);
        }
    });
    return () => unsub();
  }, []);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const genres = ['All', ...Object.values(StoryGenre)];
  const freeStories = stories.filter(story => !story.isPaid);
  
  const allStoriesFiltered = selectedGenre === 'All' 
    ? stories.filter(story => story.isPaid) 
    : stories.filter(story => story.isPaid && story.genre === selectedGenre);

  const handleNavigate = (view: string) => {
    if (view === 'admin') {
      if (isAuthenticated) {
        setActiveView('admin');
      } else {
        setIsLoginOpen(true);
      }
    } else {
      setActiveView(view);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setActiveView('admin');
  };

  const handlePurchaseClick = (story: Story) => {
    if (story.isPaid) {
      setSelectedStory(story);
      setIsPaymentOpen(true);
    } else {
      if (story.pdfUrl) {
         window.open(story.pdfUrl, '_blank');
      } else {
         alert(`Opening PDF Reader for: ${story.title}`);
      }
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedStory) {
      setIsPaymentOpen(false);
      if (selectedStory.pdfUrl) {
        window.open(selectedStory.pdfUrl, '_blank');
      } else {
        alert("Payment Verified! Downloading PDF...");
      }
      setSelectedStory(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-lafz-dark flex flex-col items-center justify-center text-white">
        <Loader2 size={48} className="animate-spin text-lafz-sky mb-4" />
        <p className="font-serif text-xl animate-pulse">Loading Lafz-Box Library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-lafz-dark font-sans">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />
      
      {isLoginOpen && (
        <AdminLogin onClose={() => setIsLoginOpen(false)} onLogin={handleLoginSuccess} />
      )}

      {isPaymentOpen && selectedStory && (
        <PaymentModal 
          story={selectedStory}
          paymentConfig={paymentConfig} 
          onClose={() => setIsPaymentOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}

      <main className="flex-grow pt-20">
        
        {activeView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            
            {/* Free Reads Section */}
            <section id="free-reads" className="py-20 bg-lafz-dark relative border-b border-white/5 scroll-mt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="text-lafz-sky" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Trending Free Reads</h2>
                  </div>
                  {freeStories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {freeStories.slice(0, 4).map((story) => (
                          <StoryCard key={story.id} story={story} onPurchase={handlePurchaseClick} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white/5 rounded-lg text-lafz-muted">
                      <p className="mb-2">No free stories available yet.</p>
                      <button onClick={() => handleNavigate('admin')} className="text-xs text-lafz-sky underline">Upload one now</button>
                    </div>
                  )}
                  <div className="mt-10 text-center">
                    <button onClick={() => handleNavigate('stories')} className="text-lafz-muted hover:text-lafz-sky underline underline-offset-4 text-sm">
                      View Premium Collection &rarr;
                    </button>
                  </div>
              </div>
            </section>

            {/* Featured Story Excerpt */}
            <section className="py-24 bg-gradient-to-b from-lafz-dark to-lafz-card relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="absolute top-10 left-10 text-9xl font-serif text-white">"</div>
                  <div className="absolute bottom-10 right-10 text-9xl font-serif text-white rotate-180">"</div>
               </div>
               <div className="max-w-4xl mx-auto px-6 relative z-10">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-lafz-sky/10 rounded-full mb-4">
                      <Feather className="text-lafz-sky w-6 h-6" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">The Soul of Lafz-Box</h3>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
                    <h4 className="text-2xl text-white font-display mb-6 text-center">"The Letter That Never Arrived"</h4>
                    
                    <div className="prose prose-invert prose-lg mx-auto text-lafz-muted font-serif leading-relaxed italic space-y-6">
                       <p>
                          The ink was smeared, not by rain, but by tears he refused to shed. For seven years, the letter sat in the breast pocket of his trench coat, absorbing the scent of old tobacco and regret. It wasn't just paper; it was a confession.
                       </p>
                       <p>
                          She stood across the street, laughing at something the barista said. She looked happy. Happier than she ever was with him. The letter felt heavy, like a stone dragging him into the abyss of his own making. He took a step forward, then stopped. Some words are meant to be felt, not read. Some apologies are better left as ghosts.
                       </p>
                    </div>

                    <div className="mt-8 text-center">
                       <p className="text-white font-bold">— Anonymous Writer #402</p>
                       <button onClick={() => handleNavigate('stories')} className="mt-6 px-8 py-3 bg-transparent border border-lafz-sky text-lafz-sky hover:bg-lafz-sky hover:text-black transition-all rounded-full text-sm uppercase tracking-wider">
                          Read Full Story in Premium
                       </button>
                    </div>
                  </div>
               </div>
            </section>
            
            <Reviews />
          </>
        )}

        {/* --- OTHER VIEWS --- */}
        {activeView === 'stories' && (
          <section className="py-12 bg-lafz-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-white/5 pb-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Premium Library</h2>
                  <p className="text-lafz-muted">Exclusive stories. Deep emotions. Written by Anonymous.</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                        selectedGenre === genre
                          ? 'bg-lafz-sky/10 border-lafz-sky text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'bg-transparent border-white/10 text-lafz-muted hover:text-white hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allStoriesFiltered.map((story) => (
                  <StoryCard key={story.id} story={story} onPurchase={handlePurchaseClick} />
                ))}
              </div>
              {allStoriesFiltered.length === 0 && (
                <div className="text-center py-24 text-lafz-muted bg-white/5 rounded-xl border border-white/5">
                  <p className="text-lg">No premium stories found in this genre yet.</p>
                  <button onClick={() => setSelectedGenre('All')} className="mt-4 text-lafz-sky hover:underline">View All</button>
                </div>
              )}
            </div>
          </section>
        )}

        {activeView === 'admin' && isAuthenticated && (
          <AdminDashboard 
            stories={stories}
            paymentConfig={paymentConfig}
            onAddStory={() => {}} // Not needed as Admin handles DB directly now
            onDeleteStory={() => {}} // Not needed
            onUpdatePaymentConfig={() => {}} // Not needed, handled inside dashboard now
          />
        )}

        {activeView === 'about' && <About />}
        {activeView === 'contact' && <Contact />}
        
        {activeView === 'policy' && (
          <section className="py-20 bg-lafz-dark">
            <div className="max-w-3xl mx-auto px-4 space-y-8">
               <h2 className="text-4xl font-serif font-bold text-white border-b border-lafz-sky/30 pb-4">Privacy & Refund Policy</h2>
               <div className="space-y-6 text-lafz-text leading-relaxed">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-lafz-sky mb-2">Privacy Policy</h3>
                    <p className="text-lafz-muted">We respect your privacy. Your email and personal details are never shared with third parties. We use secure payment gateways for all transactions. Data is encrypted and stored securely.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-lafz-sky mb-2">Refund Policy</h3>
                    <p className="text-lafz-muted">Due to the nature of digital products (PDFs), all sales are final. Refunds are only processed if a technical error prevents download and our support team cannot resolve the issue within 48 hours.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-lafz-sky mb-2">Copyright Protection</h3>
                    <p className="text-lafz-muted">All stories are original intellectual property of Lafz-Box writers. Unauthorized distribution, resale, or plagiarism is strictly prohibited and will be met with legal action.</p>
                  </div>
               </div>
            </div>
          </section>
        )}
        
        {activeView === 'terms' && (
           <section className="py-20 bg-lafz-dark">
            <div className="max-w-3xl mx-auto px-4 space-y-8">
               <h2 className="text-4xl font-serif font-bold text-white border-b border-lafz-cyan/30 pb-4">Terms & Conditions</h2>
               <div className="space-y-6 text-lafz-text leading-relaxed">
                  <p><strong>1. Introduction</strong><br/>By accessing this website, you agree to be bound by these terms and conditions.</p>
                  <p><strong>2. Digital Products</strong><br/>Purchased PDFs are for personal use only. You may not resell, upload, or share the files publicly on any platform.</p>
                  <p><strong>3. Age Responsibility</strong><br/>Some content may deal with mature emotional themes. By using this site, you confirm you are of legal age in your jurisdiction.</p>
                  <p><strong>4. Content Disclaimer</strong><br/>All characters and events are fictitious. Any resemblance to real persons is purely coincidental. The stories reflect the views of the anonymous authors.</p>
               </div>
            </div>
          </section>
        )}

      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;