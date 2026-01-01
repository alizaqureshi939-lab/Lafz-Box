import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, Loader2, Copy, AlertCircle } from 'lucide-react';
import { Story, PaymentConfig } from '../types';

interface PaymentModalProps {
  story: Story;
  paymentConfig: PaymentConfig;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ story, paymentConfig, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [txnId, setTxnId] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentConfig.upiId);
    alert('UPI ID Copied!');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if(txnId.length < 4) {
       alert("Please enter a valid Transaction ID");
       return;
    }

    setStep('processing');
    setLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess(); // Close modal and trigger success in app
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-lafz-card border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-lafz-muted hover:text-white z-10">
          <X size={24} />
        </button>

        {step === 'details' && (
          <form onSubmit={handlePay}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-1">Buy PDF</h3>
              <p className="text-lafz-sky font-medium">{story.title}</p>
              <div className="mt-2 text-3xl font-bold text-white">{story.price}</div>
            </div>

            <div className="space-y-4 mb-6">
               <div className="bg-black/30 p-6 rounded-lg border border-white/5 flex flex-col items-center">
                 {/* QR Code */}
                 {paymentConfig.qrCodeUrl && (
                   <div className="bg-white p-2 rounded-lg mb-4">
                     <img src={paymentConfig.qrCodeUrl} alt="Payment QR" className="w-32 h-32 object-contain" />
                   </div>
                 )}
                 
                 {/* UPI ID */}
                 <div className="w-full bg-lafz-dark border border-white/10 rounded-lg p-3 flex justify-between items-center mb-3">
                    <span className="text-sm text-lafz-muted truncate mr-2">{paymentConfig.upiId}</span>
                    <button type="button" onClick={handleCopy} className="text-lafz-sky hover:text-white">
                       <Copy size={16} />
                    </button>
                 </div>
                 
                 <p className="text-xs text-lafz-muted text-center leading-relaxed">
                   {paymentConfig.instructionText}
                 </p>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-bold text-white block">Enter Transaction ID / UTR</label>
                 <input 
                   required 
                   type="text" 
                   value={txnId}
                   onChange={e => setTxnId(e.target.value)}
                   placeholder="e.g. 123456789012" 
                   className="w-full bg-lafz-dark border border-white/10 rounded px-4 py-3 text-white focus:border-lafz-sky outline-none" 
                 />
                 <p className="text-[10px] text-lafz-muted flex items-center gap-1">
                   <AlertCircle size={10} /> We verify this ID manually if needed.
                 </p>
               </div>
            </div>

            <button type="submit" className="w-full py-3 bg-lafz-sky text-black font-bold rounded-lg hover:bg-sky-500 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={18} /> Confirm Payment
            </button>
          </form>
        )}

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Loader2 size={48} className="text-lafz-sky animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white">Verifying Transaction...</h3>
            <p className="text-lafz-muted text-sm mt-2">This may take a few seconds.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
               <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Payment Verified!</h3>
            <p className="text-lafz-muted text-sm mt-2">Your PDF is opening now...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;