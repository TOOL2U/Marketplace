import { Link } from "@remix-run/react";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function ServiceCard({ title, icon, description }: ServiceCardProps) {
  return (
    <Link to={`/services/${title.toLowerCase()}`} className="block">
      <div className="card hover:shadow-lg transition-shadow h-full">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="icon-container">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
