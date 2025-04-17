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
    <div className="h-full w-full">
      <div className="h-full p-6 rounded-xl bg-black text-yellow shadow-[0_0_15px_rgba(255,255,0,0.6)] hover:bg-black/80 transition-all duration-300 animate-pulse">
        <div className="flex items-center mb-4 text-white">
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4 text-white"
          />
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-sm text-white">{service} Service</p>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < rating ? "text-yellow" : "text-white"} 
            />
          ))}
        </div>
        <p className="text-white font-rational-display font-light">{comment}</p>
      </div>
    </div>
  );
}
