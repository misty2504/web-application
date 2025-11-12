import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/navbar.jsx";
import Modal from "../../components/ui/Modal.jsx";

const Contacts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-16">
      <Navbar />

      {/* Header */}
      <header className="text-center pt-16 pb-12 px-6 bg-white border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mb-3">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Reach out to us for inquiries, support, or feedback about your car orders.
        </p>
      </header>

      {/* Contact Information */}
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-16">
        {[
          {
            icon: (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            title: "Address",
            text: "123 Car Street, Auto City, AC 12345",
            href: "https://maps.google.com/?q=123,AC12345"
          },
          {
            icon: (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            ),
            title: "Phone",
            text: "1-800-CAR-ORDER",
            href: "tel:1-800-CAR-ORDER"
          },
          {
            icon: (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            title: "Email",
            text: "orders@jerjercars.com",
            href: "mailto:orders@fernandezcars.com"
          },
          {
            icon: (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            title: "Business Hours",
            text: "Mon–Fri: 9 AM – 6 PM\nSat: 10 AM – 4 PM"
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-blue-100 text-blue-600 rounded-full">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-blue-600 hover:underline transition"
              >
                {item.text}
              </a>
            ) : (
              <p className="text-base text-gray-500 whitespace-pre-line">{item.text}</p>
            )}
          </div>
        ))}
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 pb-16">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086319490542!2d144.95373531590415!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620842869562!5m2!1sen!2sus"
            width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Company Location">
          </iframe>
        </div>
      </section>
      {/* Contact Form */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Send Us a Message</h2>
          <p className="text-lg text-gray-500 text-center mb-12">We'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select name="subject" id="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" required>
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Billing Question</option>
                <option>Partnership</option>
                <option>Feedback</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea name="message" id="message" value={formData.message} onChange={handleInputChange} rows="5" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" required></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-600 text-white px-12 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

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
            <button onClick={() => navigate("/privacy")} className="text-gray-400 hover:text-white transition">Privacy Policy</button>
          </div>
        </div>
      </footer>

      <Modal open={formSubmitted} onClose={() => setFormSubmitted(false)}>
        <div className="text-center p-4">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you as soon as possible.
          </p>
          <button onClick={() => setFormSubmitted(false)} className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;
