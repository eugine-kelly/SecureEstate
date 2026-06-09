import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { rentals } from '../data/rentals';
import PaymentModal from '../components/PaymentModal';
import api from '../api/axios';

function getAccessFee(type, price, isRental) {
    if (isRental) return 200;
    const p = parseFloat(String(price).replace(/,/g, ''));
    if (type === 'Land' || type === 'Commercial') return 1000;
    if (p < 10000000) return 500;
    if (p <= 30000000) return 1000;
    return 1500;
}

export default function PropertyDetail() {
    const { id } = useParams();
    const parsedId = parseInt(id);

    const property = properties.find(p => p.id === parsedId)
        || rentals.find(p => p.id === parsedId);
    const isRental = rentals.some(p => p.id === parsedId);

    const [showPayment, setShowPayment] = useState(false);
    const [accessUnlocked, setAccessUnlocked] = useState(false);
    const [agentDetails, setAgentDetails] = useState(null);
    const [checkingAccess, setCheckingAccess] = useState(true);

    const accessFee = property
        ? getAccessFee(property.type, property.price, isRental)
        : 500;

    // Get logged-in user's email from JWT
    const getUserEmail = () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return '';
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub || '';
        } catch { return ''; }
    };

    const checkAccess = async () => {
        try {
            const res = await api.get(
                `/property-access/${parsedId}/check?isRental=${isRental}`
            );
            console.log('Access check result:', res.data);
            if (res.data.hasAccess) {
                setAccessUnlocked(true);
                await fetchAgentDetails();
            }
        } catch (err) {
            console.error('Access check error:', err);
        } finally {
            setCheckingAccess(false);
        }
    };

    useEffect(() => {
        if (property) checkAccess();
    }, [parsedId]);

    const fetchAgentDetails = async () => {
        try {
            const res = await api.get(
                `/property-access/${parsedId}?isRental=${isRental}`
            );
            console.log('Agent details response:', res.data);
            if (res.data.accessUnlocked) {
                setAgentDetails(res.data);
                setAccessUnlocked(true);
            } else {
                console.warn('Access not unlocked in response:', res.data);
            }
        } catch (err) {
            console.error('Agent details error:', err.response?.data || err.message);
        }
    };

    const handlePaymentSuccess = async () => {
        // Close modal
        setShowPayment(false);
        setCheckingAccess(true);
        // Wait for DB to update
        await new Promise(r => setTimeout(r, 1000));
        // Fetch agent details directly (we know payment was made)
        try {
            const res = await api.get(
                `/property-access/${parsedId}?isRental=${isRental}`
            );
            console.log('Post-payment agent details:', res.data);
            if (res.data.accessUnlocked) {
                setAgentDetails(res.data);
                setAccessUnlocked(true);
            } else {
                // Try the check endpoint as fallback
                await checkAccess();
            }
        } catch (err) {
            console.error('Post-payment details error:', err);
            await checkAccess();
        } finally {
            setCheckingAccess(false);
        }
    };

    if (!property) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <i className="fas fa-home text-6xl text-gray-300 mb-6"></i>
            <h2 className="text-3xl font-bold text-gray-700 mb-2">Property Not Found</h2>
            <p className="text-gray-500 mb-8">This listing may have been removed.</p>
            <Link to={isRental ? "/rent" : "/buy"}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700">
                Browse Listings
            </Link>
        </div>
    );

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 py-12">
                <Link to={isRental ? "/rent" : "/buy"}
                      className="text-emerald-600 mb-6 inline-block hover:underline">
                    ← Back to {isRental ? "rentals" : "listings"}
                </Link>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="relative">
                        <img
                            src={isRental ? property.image : property.image}
                            alt={property.title}
                            className="rounded-3xl w-full h-80 object-cover"
                        />
                        {!accessUnlocked && (
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-white/90 text-gray-700 text-xs px-3 py-1.5 rounded-full shadow">
                                    <i className="fas fa-lock mr-1 text-emerald-600"></i>
                                    Pay KES {accessFee.toLocaleString()} to unlock
                                </span>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${isRental ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {isRental ? 'For Rent' : 'For Sale'}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                                {property.type}
                            </span>
                            {accessUnlocked && (
                                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-white">
                                    <i className="fas fa-unlock mr-1"></i>Unlocked
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold mt-2">{property.title}</h1>
                        <p className="text-xl text-gray-600 mt-2">{property.location}</p>
                        <p className="text-4xl font-bold text-emerald-700 mt-4">
                            KES {property.price}
                            {isRental && (
                                <span className="text-lg font-normal text-gray-500"> / month</span>
                            )}
                        </p>

                        {property.verified && (
                            <div className="mt-3 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm">
                                <i className="fas fa-shield-alt"></i>Ardhisasa Verified
                            </div>
                        )}

                        {(property.beds > 0 || property.baths > 0) && (
                            <div className="flex gap-6 mt-5 text-sm text-gray-600">
                                {property.beds > 0 && (
                                    <span>
                                        <i className="fas fa-bed text-emerald-500 mr-1"></i>
                                        {property.beds} Bed{property.beds > 1 ? 's' : ''}
                                    </span>
                                )}
                                {property.baths > 0 && (
                                    <span>
                                        <i className="fas fa-bath text-emerald-500 mr-1"></i>
                                        {property.baths} Bath{property.baths > 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Content based on access */}
                        {checkingAccess ? (
                            <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                                <i className="fas fa-spinner fa-spin"></i>
                                Checking access...
                            </div>
                        ) : accessUnlocked && agentDetails ? (
                            /* ── UNLOCKED STATE ── */
                            <div className="mt-6 space-y-4">
                                {/* Agent contacts */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                                    <p className="text-emerald-700 font-semibold text-sm mb-3 flex items-center gap-2">
                                        <i className="fas fa-unlock"></i>
                                        Agent Contact Details
                                    </p>
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-user text-gray-400 w-4"></i>
                                            <span className="font-semibold text-gray-800">
                                                {agentDetails.agentFullName || 'SecureEstate Agent'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-phone text-gray-400 w-4"></i>
                                            <a href={`tel:${agentDetails.agentPhone}`}
                                               className="text-emerald-600 hover:underline font-medium">
                                                {agentDetails.agentPhone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-envelope text-gray-400 w-4"></i>
                                            <a href={`mailto:${agentDetails.agentEmail}`}
                                               className="text-emerald-600 hover:underline">
                                                {agentDetails.agentEmail}
                                            </a>
                                        </div>
                                        <a href={agentDetails.agentWhatsApp}
                                           target="_blank" rel="noreferrer"
                                           className="flex items-center gap-3 text-green-600 hover:underline">
                                            <i className="fab fa-whatsapp w-4 text-lg"></i>
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                    {agentDetails.mpesaReceiptNumber && (
                                        <p className="text-xs text-gray-400 mt-3 border-t border-emerald-100 pt-2">
                                            <i className="fas fa-receipt mr-1"></i>
                                            M-Pesa Receipt: {agentDetails.mpesaReceiptNumber}
                                        </p>
                                    )}
                                </div>

                                {/* Property description */}
                                <div className="bg-gray-50 rounded-2xl p-5">
                                    <p className="font-semibold text-gray-800 mb-2 text-sm">
                                        <i className="fas fa-file-alt mr-2 text-gray-400"></i>
                                        Property Description
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {agentDetails.description || property.description}
                                    </p>
                                </div>

                                {/* Security info */}
                                <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700 space-y-1">
                                    <p><i className="fas fa-shield-alt mr-2"></i>MFA Protected • End-to-End Encrypted</p>
                                    <p><i className="fas fa-check mr-2"></i>AI Fraud Scanned • Ardhisasa Verified</p>
                                </div>
                            </div>
                        ) : (
                            /* ── LOCKED STATE ── */
                            <div className="mt-6">
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 mb-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <i className="fas fa-lock text-gray-400"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 text-sm">
                                                Agent Details Locked
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Pay a small fee to unlock instantly
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                                        <span><i className="fas fa-user mr-1"></i>Agent name & phone</span>
                                        <span><i className="fas fa-envelope mr-1"></i>Agent email</span>
                                        <span><i className="fab fa-whatsapp mr-1"></i>WhatsApp link</span>
                                        <span><i className="fas fa-file-alt mr-1"></i>Full description</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
                                >
                                    <i className="fas fa-unlock"></i>
                                    Unlock for KES {accessFee.toLocaleString()}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-2">
                                    One-time fee • Instant access • M-Pesa secure
                                </p>
                            </div>
                        )}

                        <Link to="/agent"
                              className="mt-4 w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3">
                            <i className="fas fa-comments"></i>Chat with AI Agent
                        </Link>
                    </div>
                </div>
            </div>

            {showPayment && (
                <PaymentModal
                    property={property}
                    isRental={isRental}
                    accessFee={accessFee}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </>
    );
}