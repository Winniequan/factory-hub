import { useState, useEffect } from 'react'
import FactoryCard from '../components/FactoryCard'
import factoriesData from '../data/factories.json'

interface Factory {
  id: string;
  name: string;
  location: {
    city: string;
    province: string;
    country: string;
  };
  products: {
    name: string;
    description: string;
    min_order_quantity: number;
    lead_time_days: number;
  }[];
  established_year: number;
  introduction: string;
  certifications: string[];
  media: {
    images: string[];
  };
}

const Home = () => {
  const [factories, setFactories] = useState<Factory[]>([])

  useEffect(() => {
    // Get all available factories from the dummy data (currently 2 factories)
    const shuffled = [...factoriesData].sort(() => 0.5 - Math.random())
    setFactories(shuffled)
  }, [])

  return (
    <>
      <div>
        <h2 className='flex justify-center items-center text-2xl text-black mt-6 px-4'>Find manufacturers, compare products, and start production with confidence</h2>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2 py-6 px-6">
        <input
          type="text"
          placeholder="Search factories or products..."
          className="w-[28rem] px-6 py-4 text-lg rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
        />
        <button
          className="px-6 py-4 text-lg bg-blue-500 text-white rounded-r-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          Search
        </button>
      </div>
      <div className="container mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Card 1: How It Works */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-extrabold mb-2 text-blue-600 dark:text-blue-400">How It Works</h3>
          <ul className="space-y-4 text-xl text-gray-700 dark:text-gray-300">
            <li>🔍 <span className="font-semibold">Search</span> factories/products</li>
            <li>📄 <span className="font-semibold">View</span> detailed profiles</li>
            <li>✉️ <span className="font-semibold">Contact</span> and verify</li>
            <li>🏭 <span className="font-semibold">Start</span> production</li>
          </ul>
        </div>

        {/* Card 2: Benefits */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-extrabold mb-2 text-green-600 dark:text-green-400">Benefits</h3>
          <ul className="space-y-4 text-xl text-gray-700 dark:text-gray-300">
            <li>✅ <span className="font-semibold">Verified</span> factories</li>
            <li>💎 <span className="font-semibold">High-quality</span> products</li>
            <li>🔒 <span className="font-semibold">Secure</span> transactions</li>
            <li>⚡ <span className="font-semibold">Fast</span> communication</li>
          </ul>
        </div>

        {/* Card 3: Testimonials */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-extrabold mb-2 text-purple-600 dark:text-purple-400">Testimonials</h3>
          <p className="text-xl italic text-gray-700 dark:text-gray-300">"Factory Hub helped us find reliable factories quickly and efficiently!"</p>
          <p className="text-lg mt-6 font-semibold text-gray-500 dark:text-gray-400">- NorthStar Home Goods Ltd.</p>
        </div>

        {/* Card 4: Latest News */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-extrabold mb-2 text-red-600 dark:text-red-400">Latest News</h3>
          <ul className="space-y-4 text-xl text-gray-700 dark:text-gray-300">
            <li>🆕 New factories joined</li>
            <li>📊 Industry insights: Smart Home Devices</li>
            <li>🛠️ Platform updates: Faster search</li>
          </ul>
        </div>

      </div>

      {/* Featured Factories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Featured Factories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {factories.map((factory) => (
            <FactoryCard
              key={factory.id}
              id={factory.id}
              name={factory.name}
              location={factory.location}
              products={factory.products}
              established_year={factory.established_year}
              introduction={factory.introduction}
              certifications={factory.certifications}
              media={factory.media}
            />
          ))}
        </div>
      </div>


    </>

  )
}

export default Home