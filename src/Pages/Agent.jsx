import { useState, useRef, useEffect } from 'react';
import api from '../api/axios';

const SUGGESTED_QUESTIONS = [
    "What properties are available in Karen?",
    "How does Ardhisasa title verification work?",
    "What is the process for renting a property?",
    "How secure are M-Pesa transactions on SecureEstate?",
    "What documents do I need to buy property in Kenya?",
    "Are there any 3-bedroom apartments in Westlands?",
];

export default function Agent() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm your SecureEstate agent 👋 I can help you find properties, explain our verification process, or answer any questions about buying or renting in Kenya. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = async (text) => {
        const userText = text || input.trim();
        if (!userText) return;

        const newMessages = [...messages, { role: 'user', content: userText }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/agent/chat', {
                sessionId,
                message: userText,
            });

            const { reply, sessionId: newSessionId } = response.data;
            if (!sessionId) setSessionId(newSessionId);
            setMessages([...newMessages, { role: 'assistant', content: reply }]);
        } catch (err) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please try again shortly."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl mb-4">
                    <i className="fas fa-robot"></i>
                </div>
                <h1 className="text-4xl font-bold">SecureEstate Agent</h1>
                <p className="text-gray-500 mt-2">AI-powered real estate assistant — available 24/7</p>
                <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
                    <span><i className="fas fa-shield-alt text-emerald-500 mr-1"></i>End-to-End Encrypted</span>
                    <span><i className="fas fa-circle text-emerald-500 mr-1"></i>Online</span>
                    <span><i className="fas fa-database text-emerald-500 mr-1"></i>Session stored securely</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col" style={{ height: '60vh' }}>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs mr-3 mt-1 flex-shrink-0">
                                    SE
                                </div>
                            )}
                            <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                msg.role === 'user'
                                    ? 'bg-emerald-600 text-white rounded-br-sm'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs mr-3 flex-shrink-0">SE</div>
                            <div className="bg-gray-100 px-5 py-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="border-t border-gray-100 p-4">
                    <div className="flex gap-3">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about properties, pricing, verification..."
                            rows={1}
                            className="flex-1 border border-gray-300 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={loading || !input.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white px-6 rounded-2xl font-medium text-sm flex items-center gap-2"
                        >
                            <i className="fas fa-paper-plane"></i>Send
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4 text-center">Suggested questions</p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                        <button key={i} onClick={() => sendMessage(q)} disabled={loading}
                                className="text-sm border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full disabled:opacity-40">
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}