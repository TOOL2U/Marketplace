import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  service: string;
  rating: number;
  comment: string;
  image: string;
}

export default function TestimonialCard({ name, service, rating, comment, image }: TestimonialCardProps) {
  return (
    <div className="card h-full">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{service} Service</p>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < rating ? "text-yellow" : "text-gray-300"} 
            />
          ))}
        </div>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
}
