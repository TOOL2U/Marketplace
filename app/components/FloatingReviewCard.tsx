import { FaStar } from "react-icons/fa";

interface FloatingReviewCardProps {
  name: string;
  rating: number;
  image: string;
}

export default function FloatingReviewCard({ name, rating, image }: FloatingReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 w-48 text-black">
      <div className="flex items-center space-x-2">
        <img 
          src={image} 
          alt={name} 
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="text-xs font-semibold truncate">{name}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`text-xs ${i < rating ? "text-yellow" : "text-gray-300"}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
