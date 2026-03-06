import { useState } from 'react';

export default function PostProperty() {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        type: 'Apartment',
        description: '',
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Property submitted for AI fraud scanning and Ardhisasa verification!");
        // In real app: send to Spring Boot backend
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-2">Post Your Property Securely</h1>
            <p className="text-gray-600 mb-10">All listings go through AI fraud detection and Ardhisasa title verification</p>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-10">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-medium mb-2">Property Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g. Westlands, Nairobi"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Price (KES)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Property Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Villa</option>
                            <option>Land</option>
                            <option>Commercial</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border border-gray-300 rounded-3xl px-6 py-4 focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>

                <div className="mt-8">
                    <label className="block text-sm font-medium mb-3">Upload Photos (Max 10)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-emerald-600 file:text-white"
                    />

                    {images.length > 0 && (
                        <div className="flex gap-4 mt-6 flex-wrap">
                            {images.map((img, i) => (
                                <img key={i} src={img} alt="preview" className="w-24 h-24 object-cover rounded-2xl" />
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-12 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
                >
                    <i className="fas fa-shield-alt"></i>
                    Submit for AI Verification & Ardhisasa Check
                </button>
            </form>
        </div>
    );
}