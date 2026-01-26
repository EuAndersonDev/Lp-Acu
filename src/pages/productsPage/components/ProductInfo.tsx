import { PlatformBadge } from './PlatformBadge';
import { Platform } from './mockData';

interface ProductInfoProps {
  title: string;
  rating: number;
  reviews: number;
  soldCount: number;
  platform: Platform;
  description: string;
}

export const ProductInfo = ({ title, rating, reviews, soldCount, platform, description }: ProductInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">{title}</h1>
        <PlatformBadge platform={platform} />
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-600">{rating.toFixed(1)} ({reviews} avaliações)</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">+{soldCount} vendidos</span>
      </div>

      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};
