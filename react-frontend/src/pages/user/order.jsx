import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/ui/navbar.jsx';

import Modal from '../../components/ui/Modal.jsx';
export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || JSON.parse(localStorage.getItem('cart') || '[]'));
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: User Info
  const [userInfo, setUserInfo] = useState(() => 
    JSON.parse(localStorage.getItem('userInfo')) || {
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryDate: '',
    deliveryTime: ''
  });

  // Step 2: Options
  const [insurance, setInsurance] = useState(() => localStorage.getItem('insurance') || '');
  const [addons, setAddons] = useState(() => JSON.parse(localStorage.getItem('addons')) || []);

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState(() => localStorage.getItem('paymentMethod') || '');
  const [promoCode, setPromoCode] = useState(() => localStorage.getItem('promoCode') || '');
  const [discount, setDiscount] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  // Persist state to localStorage
  useEffect(() => { localStorage.setItem('userInfo', JSON.stringify(userInfo)); }, [userInfo]);
  useEffect(() => { localStorage.setItem('insurance', insurance); }, [insurance]);
  useEffect(() => { localStorage.setItem('addons', JSON.stringify(addons)); }, [addons]);
  useEffect(() => { localStorage.setItem('paymentMethod', paymentMethod); }, [paymentMethod]);
  useEffect(() => { localStorage.setItem('promoCode', promoCode); }, [promoCode]);

  // Totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const insuranceCost =
    insurance === 'basic'
      ? 10 * cart.reduce((total, item) => total + item.quantity, 0)
      : insurance === 'premium'
      ? 20 * cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
  const addonsCost = addons.reduce((total, addon) => {
    const cost =
      addon === 'gps' ? 5 :
      addon === 'carseat' ? 8 :
      addon === 'cleaning' ? 15 : 0;
    return total + cost * cart.reduce((total, item) => total + item.quantity, 0);
  }, 0);
  const total = subtotal + deliveryFee + insuranceCost + addonsCost - discount; // toLocaleString() removed for now

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleAddonChange = (addon) => {
    setAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  const validateInfo = () => {
    const newErrors = {};
    if (!userInfo.name.trim()) newErrors.name = 'Name is required.';
    if (!userInfo.address.trim()) newErrors.address = 'Delivery address is required.';
    if (!userInfo.deliveryDate) newErrors.deliveryDate = 'Delivery date is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInfo.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!userInfo.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(userInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const steps = ['Cart', 'Details', 'Payment', 'Confirmation'];

  const nextStep = () => {
    if (currentStep === 2 && !validateInfo()) return;
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step) => {
    if (step < currentStep) 
      setCurrentStep(step);
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    // Clear cart and other relevant localStorage items
    localStorage.removeItem('cart');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('insurance');
    localStorage.removeItem('addons');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('promoCode');
    setCart([]);
    // Maybe redirect after a delay or on modal close
    // setTimeout(() => navigate('/'), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-50 text-gray-800 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-8 max-w-7xl">

          {/* Progress Indicator */}
          <div className="hidden md:flex justify-center mb-12">
            <div className="flex items-center space-x-4 sm:space-x-8">
              {steps.map((label, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center cursor-pointer" onClick={() => goToStep(index + 1)}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      index < currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      index < currentStep ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {index < steps.length - 1 && <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
            Order Summary
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-16">Your cart is empty. Add some cars to get started!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Cart</h2>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.info}</p>
                          <p className="text-sm text-gray-600">${item.price.toLocaleString()}/day</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 hover:bg-gray-300 transition"
                        >−</button>
                        <span className="w-8 text-center text-gray-800 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 hover:bg-gray-300 transition"
                        >+</button>
                        <span className="text-lg font-bold text-gray-800 w-24 text-right">${(item.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >🗑️</button>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="border-t border-gray-200 mt-4 pt-4 text-right space-y-2 text-gray-600">
                    <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee.toLocaleString()}</span></div>
                    {insuranceCost > 0 && <div className="flex justify-between"><span>Insurance:</span><span>${insuranceCost.toLocaleString()}</span></div>}
                    {addonsCost > 0 && <div className="flex justify-between"><span>Add-ons:</span><span>${addonsCost.toLocaleString()}</span></div>}
                    {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount:</span><span>-${discount.toLocaleString()}</span></div>}
                    <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3 mt-3">
                      <span>Total:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* User Info Section */}
                <div className={`bg-white rounded-2xl shadow-sm p-6 ${currentStep >= 2 ? '' : 'opacity-50 pointer-events-none'}`}>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries({
                      Name: 'name',
                      Email: 'email',
                      Phone: 'phone',
                      'Delivery Address': 'address',
                      'Delivery Date': 'deliveryDate'
                    }).map(([label, key]) => (
                      <div key={key}>
                        <label className="text-sm text-gray-600 mb-2 block">{label}</label>
                        <input required
                          type={key.includes('email') ? 'email' : key.includes('Date') ? 'date' : key.includes('phone') ? 'tel' : 'text'}
                          value={userInfo[key]}
                          onChange={(e) => setUserInfo({ ...userInfo, [key]: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition`}
                        />
                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance & Addons */}
                <div className={`bg-white rounded-2xl shadow-sm p-6 ${currentStep >= 2 ? '' : 'opacity-50 pointer-events-none'}`}>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Options & Add-ons</h2>
                  <div className="space-y-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                      {['none', 'basic', 'premium'].map(type => (
                          <button key={type} onClick={() => setInsurance(type)} className={`flex-1 text-left p-4 rounded-lg border-2 transition ${insurance === type ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
                            <span className="font-semibold capitalize">{type}</span>
                            <p className="text-sm text-gray-500">
                            {type === 'basic' && 'Covers basic damages. $10/day.'}
                            {type === 'premium' && 'Full coverage. $20/day.'}
                              {type === 'none' && 'No extra coverage.'}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add-ons</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                          { id: 'gps', name: 'GPS Navigation', price: 5 },
                          { id: 'carseat', name: 'Child Car Seat', price: 8 },
                          { id: 'cleaning', name: 'Post-Rental Cleaning', price: 15 }
                        ].map(addon => (
                        <button key={addon.id} onClick={() => handleAddonChange(addon.id)} className={`p-4 rounded-lg border-2 transition ${addons.includes(addon.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
                            <p className="font-semibold">{addon.name}</p>
                            <p className="text-sm text-gray-500">${addon.price}/day</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className={`bg-white rounded-2xl shadow-sm p-6 ${currentStep >= 3 ? '' : 'opacity-50 pointer-events-none'}`}>
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Payment Method</h2>
                  <div className="space-y-4">
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Payment Method</option>
                      <option value="credit">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <button onClick={applyPromoCode} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">Apply</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 h-fit space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between text-gray-600"><span>Total Items:</span><span className="font-medium text-gray-800">{cart.length}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Total Days:</span><span className="font-medium text-gray-800">{cart.reduce((t, i) => t + i.quantity, 0)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Estimated Delivery:</span><span className="font-medium text-gray-800">{userInfo.deliveryDate || 'TBD'}</span></div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-2xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <button onClick={prevStep} className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
                      Back
                    </button>
                  )}
                  <button
                    onClick={currentStep < steps.length - 1 ? nextStep : handlePlaceOrder}
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-gray-400"
                    disabled={
                      (currentStep === 2 && (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address || !userInfo.deliveryDate)) ||
                      (currentStep === 3 && !paymentMethod)
                    }
                  >
                    {currentStep === steps.length - 1 ? 'Place Order' : `Next: ${steps[currentStep]}`}
                  </button>
                </div>
                <button
                  onClick={() => navigate('/cars')}
                  className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={isOrderPlaced} onClose={() => setIsOrderPlaced(false)}>
        <div className="text-center p-4">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </Modal>
    </>
  );
}
