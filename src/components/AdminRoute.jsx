import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) return <Navigate to="/login" replace />;

    // Handle both "ADMIN" and "ROLE_ADMIN" formats
    if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') return <Navigate to="/" replace />;

    return children;
}