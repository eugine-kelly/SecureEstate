import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
    {
        q: 'How does the access fee work?',
        a: 'You pay a small one-time fee via M-Pesa to unlock the full property details and agent contacts. The fee varies by property type — KES 200 for rentals, KES 500–1,500 for properties for sale.'
    },
    {
        q: 'Is my M-Pesa payment secure?',
        a: 'Yes. All payments go through Safaricom\'s official Daraja API with end-to-end encryption. Your payment is held in escrow by SecureEstate and released only after verification.'
    },
    {
        q: 'What is Ardhisasa verification?',
        a: 'Ardhisasa is Kenya\'s official digital land registry system by the Ministry of Lands. We verify every property title deed through Ardhisasa to protect you from fraudulent listings.'
    },
    {
        q: 'How do I contact an agent after paying?',
        a: 'After paying the access fee, the agent\'s full name, phone number, email, and WhatsApp link are instantly revealed on the property page.'
    },
    {
        q: 'Can I get a refund?',
        a: 'Refunds are handled on a case-by-case basis. Contact us at hello@secureestate.co.ke within 24 hours if you have an issue with your payment.'
    },
    {
        q: 'How does the AI Agent work?',
        a: 'Our AI Agent is available 24/7 to answer questions about properties, the buying/renting process, Ardhisasa verification, and M-Pesa payments. It\'s powered by advanced AI and knows all current listings.'
    },
];

export default function HelpCenter() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                    <i className="fas fa-question-circle text-emerald-600 text-2xl"></i>
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
                <p className="text-gray-500 mt-3">Find answers to common questions about SecureEstate</p>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                    { icon: 'fas fa-mobile-alt', label: 'M-Pesa Payments', color: 'bg-green-50 text-green-600' },
                    { icon: 'fas fa-shield-alt', label: 'Ardhisasa', color: 'bg-blue-50 text-blue-600' },
                    { icon: 'fas fa-robot', label: 'AI Agent', color: 'bg-purple-50 text-purple-600' },
                    { icon: 'fas fa-home', label: 'Properties', color: 'bg-orange-50 text-orange-600' },
                ].map(item => (
                    <div key={item.label} className={`${item.color} rounded-2xl p-4 text-center cursor-pointer hover:opacity-80`}>
                        <i className={`${item.icon} text-2xl mb-2 block`}></i>
                        <p className="text-sm font-medium">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* FAQs */}
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
                {FAQS.map((faq, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left"
                        >
                            <span className="font-medium text-gray-800">{faq.q}</span>
                            <i className={`fas fa-chevron-${openIndex === i ? 'up' : 'down'} text-gray-400 text-sm`}></i>
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Still need help */}
            <div className="mt-12 bg-emerald-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Still need help?</h3>
                <p className="text-gray-500 text-sm mb-6">Our team is here to assist you</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium text-sm">
                        <i className="fas fa-envelope mr-2"></i>Contact Us
                    </Link>
                    <Link to="/agent" className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-medium text-sm">
                        <i className="fas fa-robot mr-2"></i>Chat with AI Agent
                    </Link>
                </div>
            </div>
        </div>
    );
}