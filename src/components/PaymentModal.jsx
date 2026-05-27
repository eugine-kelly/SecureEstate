import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function PaymentModal({ property, isRental, accessFee, onClose, onSuccess }) {
    const [tab, setTab] = useState('stk');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkoutRequestId, setCheckoutRequestId] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const [pollCount, setPollCount] = useState(0);

    // Poll payment status every 10 seconds, max 12 times (2 minutes)
    useEffect(() => {
        if (!checkoutRequestId || status === 'IN_ESCROW' || status === 'FAILED') return;
        if (pollCount >= 12) return; // Stop after 2 minutes

        const interval = setInterval(async () => {
            try {
                const res = await api.get(`/mpesa/status/${checkoutRequestId}`);
                setPollCount(c => c + 1);
                if (res.data.status === 'IN_ESCROW') {
                    setStatus('IN_ESCROW');
                    clearInterval(interval);
                    setTimeout(() => onSuccess && onSuccess(), 1500);
                } else if (res.data.status === 'FAILED') {
                    setStatus('FAILED');
                    clearInterval(interval);
                }
            } catch (err) { console.error(err); }
        }, 10000);
        return () => clearInterval(interval);
    }, [checkoutRequestId, status]);

    const validatePhone = (p) => {
        const cleaned = p.replace(/[\s\-()]/g, '');
        return /^(0[17]\d{8}|254[17]\d{8}|\+254[17]\d{8})$/.test(cleaned);
    };

    const handleSTKPush = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePhone(phone)) {
            setError('Invalid phone number. Use format: 0712345678');
            return;
        }

        setLoading(true);
        try {
            const buyerEmail = localStorage.getItem('email') || '';
            const res = await api.post('/mpesa/stk-push', {
                phoneNumber: phone,
                amount: accessFee,
                propertyId: property.id,
                buyerEmail,
            });

            if (res.data.success) {
                setCheckoutRequestId(res.data.checkoutRequestId);
                setStatus('PENDING');
            } else {
                setError(res.data.message || 'Payment failed. Please try again.');
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const feeLabel = `KES ${Number(accessFee).toLocaleString()}`;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-emerald-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-xl font-bold">Unlock Property Details</h2>
                        <button onClick={onClose} className="text-white/70 hover:text-white">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <p className="text-emerald-100 text-sm">{property.title} — {property.location}</p>
                    <div className="mt-3 bg-white/20 rounded-2xl p-3">
                        <p className="text-xs text-emerald-100 mb-1">One-time access fee</p>
                        <p className="text-3xl font-bold">{feeLabel}</p>
                        <p className="text-xs text-emerald-200 mt-1">Unlocks agent contacts + full property brochure</p>
                    </div>
                </div>

                <div className="p-6">
                    {/* What you unlock */}
                    {!status && (
                        <div className="bg-emerald-50 rounded-2xl p-4 mb-5">
                            <p className="text-sm font-semibold text-emerald-800 mb-2">
                                <i className="fas fa-unlock mr-2"></i>After payment you get:
                            </p>
                            <ul className="space-y-1.5 text-sm text-emerald-700">
                                <li><i className="fas fa-check mr-2 text-emerald-500"></i>Agent full name & phone number</li>
                                <li><i className="fas fa-check mr-2 text-emerald-500"></i>Agent email & WhatsApp link</li>
                                <li><i className="fas fa-check mr-2 text-emerald-500"></i>Full property description & details</li>
                                <li><i className="fas fa-check mr-2 text-emerald-500"></i>Downloadable property brochure</li>
                                <li><i className="fas fa-check mr-2 text-emerald-500"></i>M-Pesa payment receipt</li>
                            </ul>
                        </div>
                    )}

                    {/* PENDING state */}
                    {status === 'PENDING' && (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <i className="fas fa-mobile-alt text-yellow-500 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Check Your Phone</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                An M-Pesa prompt has been sent to <strong>{phone}</strong>.
                                Enter your PIN to pay <strong>{feeLabel}</strong>.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
                                <i className="fas fa-spinner fa-spin"></i>
                                <span className="text-sm">Waiting for payment confirmation...</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">This will auto-update once payment is confirmed</p>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await api.get(`/mpesa/status/${checkoutRequestId}`);
                                        if (res.data.status === 'IN_ESCROW') {
                                            setStatus('IN_ESCROW');
                                            onSuccess && onSuccess();
                                        } else if (res.data.status === 'FAILED') {
                                            setStatus('FAILED');
                                        } else {
                                            // Still pending - show message
                                            alert('Payment not confirmed yet. Please enter your M-Pesa PIN if you haven\'t already, then try again.');
                                        }
                                    } catch (e) { console.error(e); }
                                }}
                                className="text-sm text-emerald-600 border border-emerald-300 px-4 py-2 rounded-xl hover:bg-emerald-50"
                            >
                                <i className="fas fa-sync mr-1"></i> I have paid — Check status
                            </button>
                        </div>
                    )}

                    {/* SUCCESS state */}
                    {status === 'IN_ESCROW' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <i className="fas fa-unlock text-emerald-600 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-bold text-emerald-700 mb-2">Access Unlocked!</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Payment of <strong>{feeLabel}</strong> confirmed. Agent contacts and property details are now available.
                            </p>
                            <button onClick={() => { onSuccess && onSuccess(); onClose(); }}
                                    className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-semibold">
                                View Agent Details →
                            </button>
                        </div>
                    )}

                    {/* FAILED state */}
                    {status === 'FAILED' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <i className="fas fa-times-circle text-red-500 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-bold text-red-600 mb-2">Payment Failed</h3>
                            <p className="text-gray-500 text-sm mb-4">The payment was cancelled or failed. Please try again.</p>
                            <button onClick={() => setStatus(null)}
                                    className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold">
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Payment form */}
                    {!status && (
                        <>
                            {/* Tabs */}
                            <div className="flex bg-gray-100 rounded-2xl p-1 mb-5">
                                <button onClick={() => setTab('stk')}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'stk' ? 'bg-white shadow text-emerald-700' : 'text-gray-500'}`}>
                                    <i className="fas fa-mobile-alt mr-2"></i>STK Push
                                </button>
                                <button onClick={() => setTab('c2b')}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'c2b' ? 'bg-white shadow text-emerald-700' : 'text-gray-500'}`}>
                                    <i className="fas fa-university mr-2"></i>PayBill
                                </button>
                            </div>

                            {tab === 'stk' ? (
                                <form onSubmit={handleSTKPush}>
                                    {error && (
                                        <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                                            <i className="fas fa-exclamation-circle mr-2"></i>{error}
                                        </div>
                                    )}
                                    <div className="mb-5">
                                        <label className="block text-sm font-medium mb-2">M-Pesa Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🇰🇪 +254</span>
                                            <input type="tel" value={phone}
                                                   onChange={(e) => setPhone(e.target.value)}
                                                   placeholder="712 345 678"
                                                   className="w-full border border-gray-300 rounded-2xl pl-20 pr-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                                                   required />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Enter number registered with M-Pesa</p>
                                    </div>
                                    <button type="submit" disabled={loading}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                                        {loading
                                            ? <><i className="fas fa-spinner fa-spin"></i> Sending prompt...</>
                                            : <><i className="fas fa-lock"></i> Pay {feeLabel} to Unlock</>
                                        }
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">Pay via M-Pesa PayBill:</p>
                                    <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                                        {[
                                            { label: 'Business Number', value: '174379' },
                                            { label: 'Account Number', value: `SE-${property.id}` },
                                            { label: 'Amount', value: feeLabel },
                                        ].map((row) => (
                                            <div key={row.label} className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">{row.label}</span>
                                                <span className="font-bold text-gray-800">{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-blue-50 rounded-2xl p-4 text-xs text-blue-700 space-y-1">
                                        <p className="font-semibold mb-1">How to pay:</p>
                                        <p>1. M-Pesa → Lipa na M-Pesa → Pay Bill</p>
                                        <p>2. Business No: <strong>174379</strong></p>
                                        <p>3. Account: <strong>SE-{property.id}</strong></p>
                                        <p>4. Amount: <strong>{feeLabel}</strong> → Enter PIN</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}