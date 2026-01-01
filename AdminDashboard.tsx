import React, { useState, useEffect } from 'react';
import { Story, StoryGenre, PaymentConfig } from '../types';
import { Plus, BookOpen, BarChart3, Upload, Settings, Save, Link, IndianRupee, Loader2, Trash2 } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

interface AdminDashboardProps {
  stories: Story[];
  paymentConfig: PaymentConfig;
  onAddStory: (story: Story) => void;
  onDeleteStory: (id: string) => void;
  onUpdatePaymentConfig: (config: PaymentConfig) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  stories, 
  paymentConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'settings'>('stories');
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
  // Story Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newGenre, setNewGenre] = useState<StoryGenre>(StoryGenre.ROMANCE);
  const [newIsPaid, setNewIsPaid] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [newCover, setNewCover] = useState('');
  const [newPdfUrl, setNewPdfUrl] = useState('');

  // Payment Config State
  const [upiId, setUpiId] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [instructions, setInstructions] = useState('');

  // Initialize payment config from props
  useEffect(() => {
    if(paymentConfig) {
        setUpiId(paymentConfig.upiId || '');
        setQrUrl(paymentConfig.qrCodeUrl || '');
        setInstructions(paymentConfig.instructionText || '');
    }
  }, [paymentConfig]);
  
  // Calculate Stats
  const totalStories = stories.length;
  const totalSales = stories.reduce((acc, curr) => acc + (curr.sales || 0), 0);
  
  const totalRevenue = stories.reduce((acc, curr) => {
    if (!curr.isPaid || !curr.price) return acc;
    const priceVal = parseFloat(curr.price.replace(/[^\d.]/g, ''));
    return acc + (priceVal * (curr.sales || 0));
  }, 0).toFixed(2);

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
        const newStoryData: Story = {
          id: Date.now().toString(),
          title: newTitle,
          description: newDesc,
          genre: newGenre,
          isPaid: newIsPaid,
          price: newIsPaid ? `₹${newPrice}` : undefined,
          coverUrl: newCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000',
          pdfUrl: newPdfUrl,
          sales: 0
        };

        // Add to Firebase Firestore
        await setDoc(doc(db, "stories", newStoryData.id), newStoryData);

        setNewTitle('');
        setNewDesc('');
        setNewPrice('');
        setNewCover('');
        setNewPdfUrl('');
        setNewIsPaid(false);
        alert("Story Published Publicly via Firebase!");
    } catch (error) {
        console.error("Error uploading story: ", error);
        alert("Error uploading story. Check console.");
    } finally {
        setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if(window.confirm("Are you sure you want to delete this story publicly? This cannot be undone.")) {
          setDeletingId(id);
          try {
              await deleteDoc(doc(db, "stories", id));
              // Success is handled by real-time listener removing it from list
          } catch (e) {
              console.error("Error deleting: ", e);
              alert("Could not delete from Database. Check permissions or connection.");
          } finally {
              setDeletingId(null);
          }
      }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
        const config: PaymentConfig = {
            upiId: upiId,
            qrCodeUrl: qrUrl,
            instructionText: instructions
        };
        // Save to Firebase globally
        await setDoc(doc(db, "config", "payment"), config);
        alert("Payment Settings Updated Globally!");
    } catch (error) {
        console.error("Error saving settings:", error);
        alert("Failed to save settings to database.");
    } finally {
        setIsSavingSettings(false);
    }
  };

  return (
    <section className="py-24 bg-lafz-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>Admin Dashboard</span>
          <div className="flex gap-4">
             <div className="flex bg-white/5 rounded-lg p-1">
                <button onClick={() => setActiveTab('stories')} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'stories' ? 'bg-lafz-sky text-black' : 'text-lafz-muted hover:text-white'}`}>Manage Stories</button>
                <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'settings' ? 'bg-lafz-sky text-black' : 'text-lafz-muted hover:text-white'}`}>Settings</button>
             </div>
          </div>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-lafz-card p-6 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><BookOpen /></div>
            <div>
              <p className="text-lafz-muted text-sm uppercase tracking-wider">Total Stories</p>
              <h3 className="text-2xl font-bold text-white">{totalStories}</h3>
            </div>
          </div>
          <div className="bg-lafz-card p-6 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Upload /></div>
            <div>
              <p className="text-lafz-muted text-sm uppercase tracking-wider">Total Downloads</p>
              <h3 className="text-2xl font-bold text-white">{totalSales}</h3>
            </div>
          </div>
          <div className="bg-lafz-card p-6 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><IndianRupee /></div>
            <div>
              <p className="text-lafz-muted text-sm uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white">₹{totalRevenue}</h3>
            </div>
          </div>
        </div>

        {activeTab === 'stories' ? (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Upload Form */}
            <div className="lg:col-span-1">
              <div className="bg-lafz-card p-6 rounded-xl border border-white/5 sticky top-24 shadow-lg shadow-black/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                  <Plus size={20} className="text-lafz-sky"/> Add New Story
                </h3>
                <form onSubmit={handleStorySubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-lafz-muted uppercase font-bold">Story Title</label>
                    <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full mt-1 bg-black/40 border border-white/10 rounded-md p-2 text-white focus:border-lafz-sky outline-none" placeholder="Enter title..." />
                  </div>
                  <div>
                    <label className="text-xs text-lafz-muted uppercase font-bold">Genre</label>
                    <select value={newGenre} onChange={e => setNewGenre(e.target.value as StoryGenre)} className="w-full mt-1 bg-black/40 border border-white/10 rounded-md p-2 text-white focus:border-lafz-sky outline-none">
                        {Object.values(StoryGenre).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  {/* PRICE SECTION */}
                  <div className={`p-4 rounded-lg border transition-colors ${newIsPaid ? 'bg-lafz-sky/5 border-lafz-sky/30' : 'bg-white/5 border-white/5'}`}>
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input type="checkbox" checked={newIsPaid} onChange={e => setNewIsPaid(e.target.checked)} className="w-5 h-5 accent-lafz-sky" />
                      <span className={`text-sm font-bold ${newIsPaid ? 'text-lafz-sky' : 'text-white'}`}>Is this a Paid PDF?</span>
                    </label>
                    <div className={newIsPaid ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                       <label className="text-xs text-lafz-muted uppercase font-bold mb-1 block">Set Price (INR)</label>
                       <div className="relative">
                          <span className="absolute left-3 top-2.5 text-lafz-text font-bold">₹</span>
                          <input type="number" step="1" required={newIsPaid} value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-md py-2 pl-8 pr-4 text-white focus:border-lafz-sky outline-none" disabled={!newIsPaid} placeholder="49"/>
                       </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-lafz-muted uppercase font-bold">Cover URL</label>
                    <input type="url" value={newCover} onChange={e => setNewCover(e.target.value)} className="w-full mt-1 bg-black/40 border border-white/10 rounded-md p-2 text-white focus:border-lafz-sky outline-none" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-xs text-lafz-sky uppercase font-bold flex items-center gap-1"><Link size={12}/> PDF Link</label>
                    <input type="url" required value={newPdfUrl} onChange={e => setNewPdfUrl(e.target.value)} className="w-full mt-1 bg-black/40 border border-white/10 rounded-md p-2 text-white focus:border-lafz-sky outline-none" placeholder="Drive/Dropbox Link..." />
                  </div>
                  <div>
                    <label className="text-xs text-lafz-muted uppercase font-bold">Description</label>
                    <textarea rows={3} required value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full mt-1 bg-black/40 border border-white/10 rounded-md p-2 text-white focus:border-lafz-sky outline-none" placeholder="Synopsis..."></textarea>
                  </div>

                  <button 
                     id="submit-story-btn" 
                     type="submit" 
                     disabled={isUploading}
                     className="w-full py-3 bg-lafz-sky hover:bg-sky-500 text-black font-bold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                     {isUploading ? (
                        <><Loader2 className="animate-spin" size={20} /> Publishing...</>
                     ) : (
                        "Upload to Public"
                     )}
                  </button>
                </form>
              </div>
            </div>

            {/* Stories List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-lafz-sky"/> Manage Content</h3>
              <div className="bg-lafz-card rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-lafz-muted text-xs uppercase tracking-wider">
                        <th className="py-4 px-4">Title</th>
                        <th className="py-4 px-4">PDF</th>
                        <th className="py-4 px-4">Price</th>
                        <th className="py-4 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-white text-sm">
                      {stories.map(story => (
                        <tr key={story.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-medium flex items-center gap-2">
                            <img src={story.coverUrl} className="w-8 h-10 object-cover rounded" />
                            {story.title}
                          </td>
                           <td className="py-3 px-4">
                             {story.pdfUrl ? <span className="text-green-400 text-xs">Linked</span> : <span className="text-red-400 text-xs">Missing</span>}
                           </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${story.isPaid ? 'bg-lafz-sky/20 text-lafz-sky' : 'bg-green-500/20 text-green-400'}`}>
                              {story.isPaid ? story.price : 'Free'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button 
                               type="button"
                               onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 handleDelete(story.id);
                               }} 
                               disabled={deletingId === story.id}
                               className="px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded shadow-md transition-colors flex items-center gap-1 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deletingId === story.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))}
                      {stories.length === 0 && (
                        <tr><td colSpan={6} className="py-12 text-center text-lafz-muted">No stories found. Add one to get started!</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-lafz-card p-8 rounded-xl border border-white/10">
             <div className="mb-8 text-center">
                <Settings size={32} className="mx-auto mb-4 text-lafz-sky" />
                <h3 className="text-2xl font-bold text-white">Global Payment Setup</h3>
                <p className="text-lafz-muted text-sm mt-2">Changes here will update for all users immediately.</p>
             </div>
             <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                   <label className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">Your UPI ID</label>
                   <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-lafz-sky outline-none" />
                </div>
                <div>
                   <label className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">QR Code URL</label>
                   <input type="url" value={qrUrl} onChange={e => setQrUrl(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-lafz-sky outline-none" />
                </div>
                 <div>
                   <label className="text-sm font-bold text-white uppercase tracking-wider mb-2 block">Instructions</label>
                   <textarea rows={3} value={instructions} onChange={e => setInstructions(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-lafz-sky outline-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSavingSettings}
                  className="w-full py-4 bg-lafz-sky hover:bg-sky-500 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSavingSettings ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
                  Save Global Settings
                </button>
             </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;