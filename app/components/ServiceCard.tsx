import { Link } from "@remix-run/react";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function ServiceCard({ title, icon, description }: ServiceCardProps) {
  return (
    <Link to={`/services/${title.toLowerCase()}`} className="block group">
      <div className="card hover:shadow-lg transition-shadow h-full">
        <div className="p-6 flex flex-col items-center text-center">
          {/* Updated Icon Styling */}
          <div className="bg-black p-4 rounded-full mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
            <span className="text-yellow">{icon}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
