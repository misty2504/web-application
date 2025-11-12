import React from 'react';

export default function Card({ car, onAddToCart, onBuyNow }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200/80">
      <div className="relative">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {car.featured && (
          <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        {!car.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-900 truncate">{car.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{car.info}</p>
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-xl font-extrabold text-gray-900">
            ${car.price.toLocaleString()}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onAddToCart(car)}
              disabled={!car.available}
              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                car.available
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {car.available ? "Add to Cart" : "Unavailable"}
            </button>
            <button
              onClick={() => onBuyNow(car)}
              disabled={!car.available}
              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                car.available
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
