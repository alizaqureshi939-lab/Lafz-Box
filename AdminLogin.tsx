import React, { useState } from 'react';
import { Lock, X, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use .trim() to remove accidental spaces from copy-pasting
    if (password.trim() === 'Ruvaida@1999@Qureshi#') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-lafz-card border border-white/10 w-full max-w-sm rounded-2xl p-8 shadow-2xl animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-lafz-muted hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <Lock size={24} className="text-lafz-sky" />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">Owner Access</h3>
          <p className="text-lafz-muted text-sm mt-2">Enter your security PIN to manage stories.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter PIN" 
              className={`w-full bg-black/40 border ${error ? 'border-red-500 animate-pulse' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-center focus:border-lafz-sky outline-none transition-all placeholder:text-white/20`}
            />
            {/* Note: Removed type="password" momentarily or tracking-widest to make it easier to see what you are typing for complex passwords, or kept simple text styling */}
            {error && <p className="absolute -bottom-5 left-0 w-full text-red-500 text-xs text-center font-medium">Incorrect PIN. Try again.</p>}
          </div>

          <button type="submit" className="w-full py-3 bg-lafz-sky hover:bg-sky-500 text-black font-bold rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20">
            Access Dashboard <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;