import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [useMFA, setUseMFA] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Login successful!\n\nMFA ${useMFA ? 'enabled' : 'disabled'} • Role-Based Access Control active`);
        // In production: call Spring Boot /auth/login endpoint
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-4xl">SE</div>
                    <h2 className="text-3xl font-bold mt-6">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Secure login with MFA protection</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useMFA}
                                onChange={() => setUseMFA(!useMFA)}
                                className="w-5 h-5 accent-emerald-600"
                            />
                            <span className="text-sm">Enable Multi-Factor Authentication (TOTP)</span>
                        </label>
                        <a href="#" className="text-emerald-600 text-sm">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg"
                    >
                        Login Securely
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-10">
                    Protected by RBAC • End-to-End Encryption • Compliant with Kenya Data Protection Act
                </p>
            </div>
        </div>
    );
}