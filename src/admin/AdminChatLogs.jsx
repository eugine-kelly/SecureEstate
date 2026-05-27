import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AdminChatLogs() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        api.get('/admin/chat-logs')
            .then(res => setSessions(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const loadSession = async (sessionId) => {
        setSelectedSession(sessionId);
        setLoadingMessages(true);
        try {
            const res = await api.get(`/admin/chat-logs/${sessionId}`);
            setMessages(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            setMessages([]);
        } finally {
            setLoadingMessages(false);
        }
    };

    const shortId = (id) => id.replace('chat:session:', '').substring(0, 8) + '...';

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Chat Logs</h1>
                <p className="text-gray-500 mt-1">View agent chat session history from Redis</p>
            </div>

            <div className="grid grid-cols-3 gap-6 h-[70vh]">
                {/* Sessions List */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b bg-gray-50">
                        <p className="font-semibold text-sm text-gray-700">
                            {sessions.length} Active Session{sessions.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-32">
                                <i className="fas fa-spinner fa-spin text-emerald-600"></i>
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="text-center py-12 text-gray-400 text-sm">
                                <i className="fas fa-comments text-3xl mb-2 block"></i>
                                No chat sessions yet
                            </div>
                        ) : (
                            sessions.map((sessionKey) => (
                                <button
                                    key={sessionKey}
                                    onClick={() => loadSession(sessionKey.replace('chat:session:', ''))}
                                    className={`w-full text-left px-4 py-3 text-sm border-b hover:bg-gray-50 transition-colors ${
                                        selectedSession === sessionKey.replace('chat:session:', '')
                                            ? 'bg-emerald-50 border-l-4 border-l-emerald-500'
                                            : ''
                                    }`}
                                >
                                    <p className="font-medium text-gray-700">
                                        <i className="fas fa-comment-dots text-emerald-500 mr-2"></i>
                                        Session {shortId(sessionKey)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">Click to view messages</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b bg-gray-50">
                        <p className="font-semibold text-sm text-gray-700">
                            {selectedSession ? `Session: ${selectedSession.substring(0, 16)}...` : 'Select a session to view messages'}
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {!selectedSession ? (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <div className="text-center">
                                    <i className="fas fa-mouse-pointer text-4xl mb-3 block"></i>
                                    <p>Select a session from the left</p>
                                </div>
                            </div>
                        ) : loadingMessages ? (
                            <div className="flex items-center justify-center h-full">
                                <i className="fas fa-spinner fa-spin text-emerald-600 text-2xl"></i>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center text-gray-400 mt-12">No messages found</div>
                        ) : (
                            messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                                        msg.role === 'user'
                                            ? 'bg-emerald-600 text-white rounded-br-sm'
                                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                                    }`}>
                                        <p className={`text-xs font-semibold mb-1 ${msg.role === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                                            {msg.role === 'user' ? 'Customer' : 'Agent'}
                                        </p>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}