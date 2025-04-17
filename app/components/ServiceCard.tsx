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
          <div className="bg-black p-4 rounded-full mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110 p-6 btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-black text-yellow gap-2 shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300">
            <span className="text-yellow">{icon}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </Link>
  );
}
