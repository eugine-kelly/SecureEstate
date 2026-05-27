import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
                <p className="text-gray-500 mt-3">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
                    <div className="space-y-5">
                        {[
                            { icon: 'fas fa-map-marker-alt', title: 'Office', value: 'Westlands, Nairobi, Kenya', color: 'bg-emerald-100 text-emerald-600' },
                            { icon: 'fas fa-phone-alt', title: 'Phone', value: '+254 700 000 000', color: 'bg-blue-100 text-blue-600' },
                            { icon: 'fas fa-envelope', title: 'Email', value: 'hello@secureestate.co.ke', color: 'bg-purple-100 text-purple-600' },
                            { icon: 'fas fa-clock', title: 'Hours', value: 'Mon–Fri, 8am–6pm EAT', color: 'bg-orange-100 text-orange-600' },
                        ].map(item => (
                            <div key={item.title} className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                                    <i className={item.icon}></i>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    {sent ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <i className="fas fa-check text-emerald-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input type="text" required value={form.name}
                                       onChange={e => setForm({...form, name: e.target.value})}
                                       className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" required value={form.email}
                                       onChange={e => setForm({...form, email: e.target.value})}
                                       className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input type="text" required value={form.subject}
                                       onChange={e => setForm({...form, subject: e.target.value})}
                                       className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea required rows={4} value={form.message}
                                          onChange={e => setForm({...form, message: e.target.value})}
                                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none" />
                            </div>
                            <button type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">
                                <i className="fas fa-paper-plane mr-2"></i>Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}