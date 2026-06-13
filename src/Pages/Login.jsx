import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they came from, or home
    const from = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            const { accessToken, role } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('role', role);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Spring Boot Google OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL.replace('/api', '')}/oauth2/authorization/google`;
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">SE</div>
                    <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
                    <p className="text-gray-500 mt-1 text-sm">Sign in to access SecureEstate</p>
                </div>

                {/* Redirect notice */}
                {location.state?.from && (
                    <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-2xl text-sm">
                        <i className="fas fa-lock mr-2"></i>
                        Please login to access that page
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                        <i className="fas fa-exclamation-circle mr-2"></i>{error}
                    </div>
                )}

                {/* Google OAuth Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3.5 rounded-2xl font-medium text-gray-700 transition-all mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end mb-6">
                        <Link to="/forgot-password" className="text-emerald-600 text-sm hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</>
                            : <><i className="fas fa-shield-alt"></i> Login Securely</>
                        }
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-600 font-medium hover:underline">Register here</Link>
                </p>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Protected by RBAC • End-to-End Encryption • Kenya Data Protection Act
                </p>
            </div>
        </div>
    );
}