import React from "react";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white p-6 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Sidebar Title */}
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Company Dashboard
        </h2>

        {/* Company Stats */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="text-sm text-gray-400">Total Cars Sold</h3>
            <p className="text-2xl font-bold text-green-400 mt-1">1,284</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="text-sm text-gray-400">Cars Available</h3>
            <p className="text-2xl font-bold text-blue-400 mt-1">57</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="text-sm text-gray-400">Total Revenue</h3>
            <p className="text-2xl font-bold text-yellow-400 mt-1">$8.2M</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="text-sm text-gray-400">Customer Satisfaction</h3>
            <p className="text-2xl font-bold text-purple-400 mt-1">98%</p>
          </div>
        </div>

        {/* Optional Footer */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-500">
          <p>jerjerCars Company © 2025</p>
          <p>Driving Excellence & Performance</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
