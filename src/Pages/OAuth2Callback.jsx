import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            // Decode JWT to get role
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload.role || 'BUYER';
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                navigate('/', { replace: true });
            } catch {
                navigate('/login?error=invalid_token', { replace: true });
            }
        } else if (error) {
            navigate('/login?error=oauth_failed', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">SE</div>
                <p className="text-gray-600 text-lg">Signing you in with Google...</p>
                <i className="fas fa-spinner fa-spin text-emerald-600 text-2xl mt-4 block"></i>
            </div>
        </div>
    );
}