'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productsAPI } from '@/lib/api';
import { formatKES } from '@/lib/utils';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  description?: string;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const { addToCart } = useStore();

  const categories = ['Protein', 'Strength', 'Recovery', 'Vitamins'];

  useEffect(() => {
    const params: any = {};
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    productsAPI.getAll(params)
      .then((res) => {
        console.log('Products loaded:', res.data);
        if (res.data && Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
        } else {
          console.error('Invalid products data:', res.data);
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        console.error('Error details:', error.response?.data || error.message);
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      });
  }, [searchQuery]);

  // Get category counts
  const getCategoryCount = (category: string) => {
    return products.filter(p => p.category === category).length;
  };

  // Helper function to find matching product from database
  const findMatchingProduct = (productName: string): Product | null => {
    const nameLower = productName.toLowerCase();
    return products.find(p => 
      p.name.toLowerCase().includes(nameLower) || 
      nameLower.includes(p.name.toLowerCase())
    ) || null;
  };

  // Handle add to cart for featured products
  const handleFeaturedAddToCart = (productName: string, image: string, minPrice: number, category: string) => {
    const matchingProduct = findMatchingProduct(productName);
    
    if (matchingProduct) {
      addToCart({
        product: matchingProduct._id,
        name: matchingProduct.name,
        image: matchingProduct.images[0] || image,
        price: matchingProduct.price,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } else {
      // If product not found, add with default price
      addToCart({
        product: `featured-${productName.toLowerCase().replace(/\s+/g, '-')}`,
        name: productName,
        image: image,
        price: minPrice,
        quantity: 1,
      });
      toast.success('Added to cart!');
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter (if not already filtered by API)
    if (searchQuery && !searchQuery.includes('search=')) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Sort products
    if (sortBy === 'popularity') {
      filtered = filtered.sort((a, b) => 0); // Default order
    } else if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, sortBy, products, searchQuery]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">SHOP – MUSCLE BUILDING SUPPLEMENTS</h1>
          </div>

          <div className="flex gap-6">
            {/* Left Sidebar - Category Filter */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Category</h3>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {categories.map((category) => {
                    const count = getCategoryCount(category);
                    if (count === 0) return null;
                    return (
                      <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 flex-1">{category}</span>
                        <span className="text-sm text-gray-500">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                {searchQuery ? (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-700">
                      Search results for "<span className="font-semibold">{searchQuery}</span>": {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                    <Link
                      href="/shop"
                      className="text-primary hover:text-primary-dark text-sm underline"
                    >
                      Clear search
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    Showing all {filteredProducts.length} results
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="popularity">Sort by popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center text-gray-600 py-20">Loading products...</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center text-gray-600 py-20">
                  No products found. Try adjusting your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </div>
              )}

              {/* Featured Products Section */}
              <div className="mt-16 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Mass Gainer */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/massgainer.jpg"
                        alt="Mass Gainer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Protein
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Mass Gainer</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Weight & muscle gain</p>
                      <p className="text-sm text-gray-700 mb-4">
                        High-calorie blend for hard gainers to increase size and mass.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Prices:</span>
                          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                            <li>3kg: KES 7,500 – 9,500</li>
                            <li>5kg: KES 11,000 – 14,500</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Protein
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Mass Gainer', '/massgainer.jpg', 7500, 'Protein')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Creatine */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/creating.webp"
                        alt="Creatine Monohydrate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Strength
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Creatine Monohydrate</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Strength & power</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Improves strength, power, and workout performance.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Prices:</span>
                          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                            <li>300g: KES 3,000 – 4,000</li>
                            <li>500g: KES 4,500 – 6,000</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Strength
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Creatine Monohydrate', '/creating.webp', 3000, 'Strength')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* BCAA */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/BCAA.jpg"
                        alt="BCAA"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Recovery
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">BCAA</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Muscle recovery</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Reduces muscle breakdown and soreness.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>300g: KES 3,500 – 5,000</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Recovery
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('BCAA', '/BCAA.jpg', 3500, 'Recovery')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Pre-Workout */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/pre-workout.webp"
                        alt="Pre-Workout"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Strength
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Workout</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Energy & focus</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Boosts energy, endurance, and focus.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>300g: KES 4,000 – 6,500</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Strength
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Pre-Workout', '/pre-workout.webp', 4000, 'Strength')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Post-Workout Recovery */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/post-workout.jpg"
                        alt="Post-Workout Recovery"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Recovery
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Post-Workout Recovery</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Muscle recovery</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Protein, carbs, and electrolytes for fast recovery.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>1kg: KES 5,500 – 7,500</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Recovery
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Post-Workout Recovery', '/post-workout.jpg', 5500, 'Recovery')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Casein Protein */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/casein.png"
                        alt="Casein Protein"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Protein
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Casein Protein</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Night-time recovery</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Slow-digesting protein for overnight muscle repair.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>1kg: KES 7,000 – 9,000</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Protein
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Casein Protein', '/casein.png', 7000, 'Protein')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Testosterone Support */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/testtosteronw.webp"
                        alt="Testosterone Support"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Strength
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Testosterone Support</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Hormone support</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Supports natural testosterone and strength.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>60 capsules: KES 3,500 – 5,500</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Strength
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Testosterone Support', '/testtosteronw.webp', 3500, 'Strength')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Omega-3 Fish Oil */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/omega.webp"
                        alt="Omega-3 Fish Oil"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Vitamins
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Omega-3 Fish Oil</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Recovery & joint health</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Supports joints, reduces inflammation.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>120 capsules: KES 2,500 – 4,000</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Vitamins
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Omega-3 Fish Oil', '/omega.webp', 2500, 'Vitamins')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Multivitamins */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative aspect-square bg-gray-50 p-6">
                      <img
                        src="/multivitamins.webp"
                        alt="Multivitamins"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Vitamins
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Multivitamins</h3>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Purpose: Overall performance</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Supports immunity, metabolism, and muscle function.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span>
                          <ul className="list-disc list-inside ml-2 mt-1">
                            <li>90 tablets: KES 2,500 – 4,000</li>
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Category:</span> Vitamins
                        </div>
                      </div>
                      <button
                        onClick={() => handleFeaturedAddToCart('Multivitamins', '/multivitamins.webp', 2500, 'Vitamins')}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded transition-all text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
