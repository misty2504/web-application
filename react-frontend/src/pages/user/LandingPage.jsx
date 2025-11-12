import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/navbar.jsx";
import Card from "../../components/ui/card.jsx";

const featuredCars = [
  {
    id: 1,
    title: 'Porsche 911 GT3',
    info: '18 MPG • Gasoline • 2 seats',
    price: 182900,
    image: 'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
    featured: true
  },
  {
    id: 3,
    title: 'Lamborghini Urus',
    info: '16 MPG • Gasoline • 5 seats',
    price: 237848,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
    featured: true
  },
  {
    id: 6,
    title: 'Audi R8',
    info: '17 MPG • Gasoline • 2 seats',
    price: 161395,
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
    featured: true
  },
  {
    id: 9,
    title: 'Rivian R1T',
    info: '74 MPGe • Electric • 5 seats',
    price: 74800,
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
    featured: true
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full relative bg-gray-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <main>
        <section className="relative w-full flex items-center justify-center text-center min-h-[80vh] px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // This image is already quite dark, so full opacity might be too much. Let's try a higher opacity.
              alt="Luxury car background"
              className="w-full h-full object-cover object-center opacity-100"
            />
            {/* Removed the gradient overlay to make the image fully visible */}
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
              Find Your <span className="text-blue-600">Perfect Ride</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
              From luxury sedans to powerful SUVs, your dream car is just a few clicks away. Experience premium service and unmatched quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/cars")}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                Browse Cars
              </button>
              <button
                onClick={() => navigate("/contacts")}
                className="bg-transparent text-gray-800 px-8 py-3 rounded-full font-semibold text-lg border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-12">
              We redefine the experience of car ownership with premium service, transparent pricing, and vehicles that speak class and performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Selection</h3>
                <p className="text-gray-600">Hand-picked luxury vehicles to ensure the highest quality and comfort for your journey.</p>
              </div>
              {/* Feature 2 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Ordering</h3>
                <p className="text-gray-600">Order your dream car online in minutes with our easy-to-use and secure platform.</p>
              </div>
              {/* Feature 3 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Exceptional Service</h3>
                <p className="text-gray-600">Our dedicated team is here to provide you with support and a first-class rental experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-12">
              Hand-picked selection of our finest cars, available for you right now.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCars.map((car) => (
                <Card key={car.id} car={car} onAddToCart={() => {}} onBuyNow={() => navigate('/cars')} />
              ))}
            </div>
            <button
              onClick={() => navigate('/cars')}
              className="mt-12 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
            >
              View All Cars
            </button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-12">
              We pride ourselves on providing an exceptional experience. Here's what our clients have to say.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Alex Johnson', text: "The entire process was seamless, from browsing to purchase. The team at Misty was incredibly helpful. I love my new car!" },
                { name: 'Samantha Bee', text: "I've never had a better car buying experience. Transparent pricing and no pressure. Highly recommended!" },
                { name: 'Michael Chen', text: "Found the exact model I was looking for. The quality of the vehicle is outstanding. Thank you, Misty Car Dealership!" }
              ].map((testimonial, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <p className="mt-4 font-semibold text-gray-800">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Misty Car Dealership</h3>
          <p className="text-gray-400 mb-6">Your journey to the perfect ride starts here.</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.26C11.73,8.58 11.77,8.9 11.84,9.2C8.28,9.03 5.15,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6.02,17.25 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 9,21.5C9.08,21.5 9.16,21.47 9.21,21.42C9.27,21.37 9.3,21.29 9.3,21.21V16.62C8.5,16.8 8.06,17.36 7.9,17.9C7.8,18.2 7.5,18.5 7.1,18.5C6.8,18.5 6.5,18.2 6.5,17.9C6.5,17.6 6.8,17.1 7.5,16.5C8.2,15.9 9.3,15.3 9.3,13.5C9.3,12.1 8.5,11.2 7.6,11.2C6.8,11.2 6.3,11.7 6.3,12.3C6.3,12.7 6.6,13 7,13C7.4,13 7.7,12.7 7.7,12.3C7.7,12.1 7.9,11.9 8.3,11.9C8.8,11.9 9.3,12.4 9.3,13.5V13.5H10.7V12.3C10.7,10.9 12.3,10.1 13.7,10.1C15.1,10.1 16.7,10.9 16.7,12.3V13.5H18.1V13.5C18.1,12.4 18.6,11.9 19.1,11.9C19.5,11.9 19.7,12.1 19.7,12.3C19.7,12.7 20,13 20.4,13C20.8,13 21.1,12.7 21.1,12.3C21.1,11.7 20.6,11.2 19.8,11.2C18.9,11.2 18.1,12.1 18.1,13.5C18.1,15.3 19.2,15.9 19.9,16.5C20.6,17.1 20.9,17.6 20.9,17.9C20.9,18.2 20.6,18.5 20.3,18.5C19.9,18.5 19.6,18.2 19.5,17.9C19.34,17.36 18.9,16.8 18.1,16.62V21.21C18.1,21.29 18.13,21.37 18.19,21.42C18.24,21.47 18.32,21.5 18.4,21.5C22.53,20.17 25.4,16.42 25.4,12A10,10 0 0,0 12,2Z" /></svg></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M17.5,6.5A1.5,1.5 0 0,1 19,8A1.5,1.5 0 0,1 17.5,9.5A1.5,1.5 0 0,1 16,8A1.5,1.5 0 0,1 17.5,6.5Z" /></svg></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19,4H5A1,1 0 0,0 4,5V19A1,1 0 0,0 5,20H19A1,1 0 0,0 20,19V5A1,1 0 0,0 19,4M12,6A6,6 0 0,1 18,12C18,14.5 16.4,16.6 14.2,17.5L12,13.9L9.8,17.5C7.6,16.6 6,14.5 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg></a>
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Misty Car Dealership. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition">Home</button>
            <button onClick={() => navigate("/cars")} className="text-gray-400 hover:text-white transition">Cars</button>
            <button onClick={() => navigate("/order")} className="text-gray-400 hover:text-white transition">My Order</button>
            <button onClick={() => navigate("/contacts")} className="text-gray-400 hover:text-white transition">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
