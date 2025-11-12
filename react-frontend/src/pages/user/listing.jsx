import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/ui/navbar';
import Card from '../../components/ui/card';

const initialCars = [
  {
    id: 1,
    title: 'Porsche 911 GT3',
    info: '18 MPG • Gasoline • 2 seats',
    price: 182900,
    image: 'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Sedan',
    fuel: 'Gasoline',
    mpg: 18,
    seats: 2,
    available: true,
    featured: true
  },
  {
    id: 2,
    title: 'Tesla Model S Plaid',
    info: '101 MPGe • Electric • 5 seats',
    price: 89990,
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'SUV',
    fuel: 'Electric',
    mpg: 101,
    seats: 5,
    available: true,
    featured: false
  },
  {
    id: 3,
    title: 'Lamborghini Urus',
    info: '16 MPG • Gasoline • 5 seats',
    price: 237848,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Coupe',
    fuel: 'Gasoline',
    mpg: 16,
    seats: 5,
    available: true,
    featured: true
  },
  {
    id: 4,
    title: 'Ferrari 296 GTB',
    info: '47 MPGe • Hybrid • 2 seats',
    price: 338255,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Hatchback',
    fuel: 'Hybrid',
    mpg: 47,
    seats: 2,
    available: true,
    featured: false
  },
  {
    id: 5,
    title: 'Rolls-Royce Cullinan',
    info: '14 MPG • Gasoline • 5 seats',
    price: 376750,
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Van',
    fuel: 'Gasoline',
    mpg: 14,
    seats: 5,
    available: false,
    featured: false
  },
  {
    id: 6,
    title: 'Audi R8',
    info: '17 MPG • Gasoline • 2 seats',
    price: 161395,
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'SUV',
    fuel: 'Gasoline',
    mpg: 17,
    seats: 2,
    available: true,
    featured: true
  },
  {
    id: 7,
    title: 'Mercedes-Benz G-Class',
    info: '16 MPG • Gasoline • 5 seats',
    price: 141050,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Coupe',
    fuel: 'Gasoline',
    mpg: 16,
    seats: 5,
    available: true,
    featured: false
  },
  {
    id: 8,
    title: 'BMW M4',
    info: '19 MPG • Gasoline • 4 seats',
    price: 79095,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Sedan',
    fuel: 'Gasoline',
    mpg: 19,
    seats: 4,
    available: true,
    featured: false
  },
  {
    id: 9,
    title: 'Rivian R1T',
    info: '74 MPGe • Electric • 5 seats',
    price: 74800,
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'SUV',
    fuel: 'Electric',
    mpg: 74,
    seats: 5,
    available: true,
    featured: true
  },
  {
    id: 10,
    title: 'McLaren 720S',
    info: '18 MPG • Gasoline • 2 seats',
    price: 310500,
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Convertible',
    fuel: 'Gasoline',
    mpg: 18,
    seats: 2,
    available: false,
    featured: false
  },
  {
    id: 11,
    title: 'Lucid Air',
    info: '140 MPGe • Electric • 5 seats',
    price: 78900,
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Hatchback',
    fuel: 'Electric',
    mpg: 140,
    seats: 5,
    available: true,
    featured: false
  },
  {
    id: 12,
    title: 'Range Rover',
    info: '21 MPG • Hybrid • 5 seats',
    price: 108875,
    image: 'https://images.pexels.com/photos/1108069/pexels-photo-1108069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Van',
    fuel: 'Hybrid',
    mpg: 21,
    seats: 5,
    available: true,
    featured: false
  },
  {
    id: 13,
    title: 'Aston Martin DB12',
    info: '17 MPG • Gasoline • 2 seats',
    price: 248086,
    image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Pickup',
    fuel: 'Gasoline',
    mpg: 17,
    seats: 2,
    available: true,
    featured: false
  },
  {
    id: 14,
    title: 'Cadillac Escalade-V',
    info: '13 MPG • Gasoline • 7 seats',
    price: 154290,
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Crossover',
    fuel: 'Gasoline',
    mpg: 13,
    seats: 7,
    available: true,
    featured: true
  },
  {
    id: 15,
    title: 'Ford Mustang Dark Horse',
    info: '17 MPG • Gasoline • 4 seats',
    price: 60865,
    image: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Micro',
    fuel: 'Gasoline',
    mpg: 17,
    seats: 4,
    available: true,
    featured: false
  },
  {
    id: 16,
    title: 'Genesis G90',
    info: '21 MPG • Gasoline • 5 seats',
    price: 90245,
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Sedan',
    fuel: 'Gasoline',
    mpg: 21,
    seats: 5,
    available: true,
    featured: true
  },
  {
    id: 17,
    title: 'Polestar 2',
    info: '113 MPGe • Electric • 5 seats',
    price: 51300,
    image: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'SUV',
    fuel: 'Electric',
    mpg: 113,
    seats: 5,
    available: true,
    featured: false
  },
  {
    id: 18,
    title: 'Maserati GranTurismo',
    info: '21 MPG • Gasoline • 4 seats',
    price: 175500,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Sedan',
    fuel: 'Gasoline',
    mpg: 21,
    seats: 4,
    available: true,
    featured: true
  },
  {
    id: 19,
    title: 'Chevrolet Corvette Z06',
    info: '15 MPG • Gasoline • 2 seats',
    price: 114395,
    image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'SUV',
    fuel: 'Gasoline',
    mpg: 15,
    seats: 2,
    available: true,
    featured: true
  },
  {
    id: 20,
    title: 'Rimac Nevera',
    info: '53 MPGe • Electric • 2 seats',
    price: 2200000,
    image: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    type: 'Coupe',
    fuel: 'Electric',
    mpg: 53,
    seats: 2,
    available: true,
    featured: true
  }
];


export default function Listing() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    type: '',
    fuel: '',
    minPrice: '',
    maxPrice: '',
    minMPG: '',
    maxMPG: ''
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const carsPerPage = 12;
  const navigate = useNavigate();

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter and sort cars
  const filtered = initialCars.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.info.toLowerCase().includes(query.toLowerCase());
    const matchesType = !filters.type || c.type === filters.type;
    const matchesFuel = !filters.fuel || c.fuel === filters.fuel;
    const matchesPrice = (!filters.minPrice || c.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || c.price <= parseInt(filters.maxPrice));
    const matchesMPG = (!filters.minMPG || c.mpg >= parseInt(filters.minMPG)) &&
      (!filters.maxMPG || c.mpg <= parseInt(filters.maxMPG));

    return matchesQuery && matchesType && matchesFuel && matchesPrice && matchesMPG;
  });

  // Sort cars
  const sortedCars = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'mpg':
        return b.mpg - a.mpg;
      case 'newest':
        return b.id - a.id;
      case 'featured':
      default:
        return b.featured - a.featured || a.price - b.price;
    }
  });

  // Calculate total pages and slice cars for the current page
  const totalPages = Math.ceil(sortedCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = sortedCars.slice(startIndex, startIndex + carsPerPage);

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Add to cart function
  const addToCart = (car) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === car.id);
      if (existingItem) {
        // If item already in cart, increase quantity
        return prevCart.map((item) =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...car, quantity: 1 }];
      }
    });
    // Show notification
    setNotification(`${car.title} added to cart!`);
    setTimeout(() => setNotification(''), 3000); // Hide after 3 seconds
  };

  // Buy now function
  const buyNow = (car) => {
    const newCart = ((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === car.id);
      if (existingItem) {
        // If item already in cart, do nothing to quantity, just proceed
        return prevCart;
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...car, quantity: 1 }];
      }
    })(cart);

    setCart(newCart);
    navigate('/order', { state: { cart: newCart } });
  };

  // Navigate to order page with cart data
  const goToOrder = () => {
    navigate('/order', { state: { cart } });
  };

  return (
    <>
      <Navbar />
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 font-semibold animate-bounce">
          {notification}
        </div>
      )}

      {/* Page Header */}
      <header className="bg-white pt-24 pb-8 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Our Collection</h1>
          <div className="flex justify-between items-center">
            <div className="relative">
              <input
                aria-label="search-cars"
                placeholder="Search cars..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-64 md:w-80 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              onClick={() => setIsFilterExpanded(true)}
              className="px-6 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2 font-semibold hover:bg-gray-100"
            >
              <span>Filters</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m-6-6H4m16 0h-2m-6 6v-2m0-10V4m6 6h2m-16 0h2" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Filter Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isFilterExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <button onClick={() => setIsFilterExpanded(false)} className="p-2 rounded-full hover:bg-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-6 flex-grow overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 text-sm">
                <option value="">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Van">Van</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <select value={filters.fuel} onChange={(e) => setFilters({ ...filters, fuel: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 text-sm">
                <option value="">All Fuels</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm" />
                <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-900 text-sm">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="mpg">Best MPG</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold" onClick={() => {
              setQuery('');
              setFilters({ type: '', fuel: '', minPrice: '', maxPrice: '', minMPG: '', maxMPG: '' });
              setSortBy('featured');
              setIsFilterExpanded(false);
            }}>
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isFilterExpanded && (
        <div onClick={() => setIsFilterExpanded(false)} className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"></div>
      )}

      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <section id="listing" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedCars.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 py-8">No cars match your search.</p>
              ) : (
                paginatedCars.map((car) => (
                  <Card key={car.id} car={car} onAddToCart={addToCart} onBuyNow={buyNow}/>
                ))
              )}
            </section>

            {/* Pagination Section */}
            {totalPages > 1 && (
              <section className="flex justify-center items-center gap-2 mt-16">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition ${currentPage === index + 1
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </section>
            )}
        </div>
      </main>
    </>
  );
}
