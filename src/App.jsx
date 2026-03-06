import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Listings from './Pages/Listings';
import PropertyDetail from './Pages/PropertyDetail';
import PostProperty from './Pages/PostProperty';
import Insights from './Pages/Insights';
import Login from './Pages/Login';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                    <Route path="/sell" element={<PostProperty />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;