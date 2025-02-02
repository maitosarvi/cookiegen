'use client';
import { useState } from 'react';

export default function Home() {
  const [fortune, setFortune] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const getFortune = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/random', {
        // Add cache: 'no-store' to prevent caching
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch fortune');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setFortune(data.message);
    } catch (error) {
      console.error('Error fetching fortune:', error);
      setFortune(error instanceof Error ? error.message : 'Failed to get fortune');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8">CookieGen 🥠</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <button
          onClick={getFortune}
          disabled={isLoading}
          className={`px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Opening Cookie...' : 'Open Fortune Cookie'}
        </button>

        {fortune && (
          <div className="mt-6 p-4 bg-yellow-50 rounded border-l-4 border-red-500">
            <p className="text-gray-800 italic">{fortune}</p>
          </div>
        )}
      </div>
      
      {/* Footer added here */}
      <footer className="absolute bottom-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Tuomas Viertamo
      </footer>
    </div>
  );
}