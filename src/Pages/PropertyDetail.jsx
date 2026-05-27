import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { rentals } from '../data/rentals';
import PaymentModal from '../components/PaymentModal';
import api from '../api/axios';

// Calculate access fee on frontend (mirrors backend logic)
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

    const property = properties.find(p => p.id === parsedId) || rentals.find(p => p.id === parsedId);
    const isRental = rentals.some(p => p.id === parsedId);

    const [showPayment, setShowPayment] = useState(false);
    const [accessUnlocked, setAccessUnlocked] = useState(false);
    const [agentDetails, setAgentDetails] = useState(null);
    const [checkingAccess, setCheckingAccess] = useState(true);

    const accessFee = property ? getAccessFee(property.type, property.price, isRental) : 500;

    // Check if user already has access on load
    useEffect(() => {
        if (!property) return;
        api.get(`/property-access/${parsedId}/check?isRental=${isRental}`)
            .then(res => {
                if (res.data.hasAccess) {
                    setAccessUnlocked(true);
                    fetchAgentDetails();
                }
            })
            .catch(() => {})
            .finally(() => setCheckingAccess(false));
    }, [parsedId]);

    const fetchAgentDetails = () => {
        api.get(`/property-access/${parsedId}?isRental=${isRental}`)
            .then(res => {
                if (res.data.accessUnlocked) {
                    setAgentDetails(res.data);
                    setAccessUnlocked(true);
                }
            })
            .catch(console.error);
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        fetchAgentDetails();
    };

    if (!property) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <i className="fas fa-home text-6xl text-gray-300 mb-6"></i>
            <h2 className="text-3xl font-bold text-gray-700 mb-2">Property Not Found</h2>
            <p className="text-gray-500 mb-8">This listing may have been removed.</p>
            <Link to={isRental ? "/rent" : "/buy"} className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700">
                Browse Listings
            </Link>
        </div>
    );

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 py-12">
                <Link to={isRental ? "/rent" : "/buy"} className="text-emerald-600 mb-6 inline-block hover:underline">
                    ← Back to {isRental ? "rentals" : "listings"}
                </Link>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="relative">
                        <img src={isRental ? property.image : property.image} alt={property.title}
                             className="rounded-3xl w-full h-80 object-cover" />
                        {!accessUnlocked && (
                            <div className="absolute inset-0 bg-black/10 rounded-3xl flex items-end p-4">
                                <span className="bg-white/90 text-gray-700 text-xs px-3 py-1 rounded-full">
                                    <i className="fas fa-lock mr-1 text-emerald-600"></i>
                                    Pay KES {accessFee.toLocaleString()} to unlock full details
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
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">{property.type}</span>
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
                            {isRental && <span className="text-lg font-normal text-gray-500"> / month</span>}
                        </p>

                        {property.verified && (
                            <div className="mt-3 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm">
                                <i className="fas fa-shield-alt"></i> Ardhisasa Verified
                            </div>
                        )}

                        {/* Beds/Baths */}
                        {(property.beds > 0 || property.baths > 0) && (
                            <div className="flex gap-6 mt-5 text-sm text-gray-600">
                                {property.beds > 0 && <span><i className="fas fa-bed text-emerald-500 mr-1"></i>{property.beds} Beds</span>}
                                {property.baths > 0 && <span><i className="fas fa-bath text-emerald-500 mr-1"></i>{property.baths} Baths</span>}
                            </div>
                        )}

                        {/* Locked / Unlocked content */}
                        {checkingAccess ? (
                            <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                                <i className="fas fa-spinner fa-spin"></i> Checking access...
                            </div>
                        ) : accessUnlocked && agentDetails ? (
                            /* UNLOCKED — show full details */
                            <div className="mt-6 space-y-4">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                                    <p className="text-emerald-700 font-semibold text-sm mb-3">
                                        <i className="fas fa-unlock mr-2"></i>Agent Contact Details
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <p><i className="fas fa-user text-gray-400 w-5 mr-2"></i><strong>{agentDetails.agentFullName || 'SecureEstate Agent'}</strong></p>
                                        <p><i className="fas fa-phone text-gray-400 w-5 mr-2"></i>{agentDetails.agentPhone}</p>
                                        <p><i className="fas fa-envelope text-gray-400 w-5 mr-2"></i>{agentDetails.agentEmail}</p>
                                        <a href={agentDetails.agentWhatsApp} target="_blank" rel="noreferrer"
                                           className="flex items-center gap-2 text-green-600 hover:underline">
                                            <i className="fab fa-whatsapp w-5"></i>Chat on WhatsApp
                                        </a>
                                    </div>
                                    {agentDetails.mpesaReceiptNumber && (
                                        <p className="text-xs text-gray-400 mt-3 border-t pt-2">
                                            Receipt: {agentDetails.mpesaReceiptNumber}
                                        </p>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700">
                                    <p className="font-semibold mb-2">Property Description</p>
                                    <p className="leading-relaxed">{agentDetails.description || property.description}</p>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600 space-y-1">
                                    <p><i className="fas fa-shield-alt text-emerald-500 mr-2"></i>MFA Protected • End-to-End Encrypted</p>
                                    <p><i className="fas fa-check text-emerald-500 mr-2"></i>AI Fraud Scanned • Ardhisasa Verified</p>
                                </div>
                            </div>
                        ) : (
                            /* LOCKED — show access fee CTA */
                            <div className="mt-6">
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 mb-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <i className="fas fa-lock text-gray-400"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 text-sm">Agent Details Locked</p>
                                            <p className="text-xs text-gray-400">Pay a small fee to unlock</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                                        <span><i className="fas fa-user mr-1"></i>Agent name & phone</span>
                                        <span><i className="fas fa-envelope mr-1"></i>Agent email</span>
                                        <span><i className="fab fa-whatsapp mr-1"></i>WhatsApp link</span>
                                        <span><i className="fas fa-file-alt mr-1"></i>Full brochure</span>
                                    </div>
                                </div>

                                <button onClick={() => setShowPayment(true)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3">
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
                            <i className="fas fa-comments"></i> Chat with AI Agent
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