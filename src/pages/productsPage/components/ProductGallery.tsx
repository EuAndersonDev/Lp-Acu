import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square bg-white rounded-xl overflow-hidden shadow-sm relative">
        <img 
          src={activeImage} 
          alt="Product Main" 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button 
            key={index}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
              activeImage === img ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
