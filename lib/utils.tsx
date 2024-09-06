import { Cloud, CloudDrizzle, CloudRain, Sun } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      <div className="h-8 sm:h-12 w-3/4 bg-white/20 rounded-md mx-auto"></div>
      <div className="flex justify-between items-center">
        <div className="h-16 w-16 sm:h-24 sm:w-24 bg-white/20 rounded-full"></div>
        <div className="h-16 w-16 sm:h-24 sm:w-24 bg-white/20 rounded-full"></div>
      </div>
      <div className="h-6 sm:h-8 w-1/2 bg-white/20 rounded-md mx-auto"></div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2 sm:space-x-3">
            <div className="h-4 w-4 sm:h-6 sm:w-6 bg-white/20 rounded-full"></div>
            <div>
              <div className="h-3 sm:h-4 w-16 sm:w-20 bg-white/20 rounded-md"></div>
              <div className="h-4 sm:h-6 w-12 sm:w-16 bg-white/20 rounded-md mt-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {icon}
      <div>
        <p className="text-xs sm:text-sm text-white/70">{label}</p>
        <p className="text-sm sm:text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

export const weatherIcons: Record<string, JSX.Element> = {
  "Light rain": <CloudDrizzle className="h-16 w-16 sm:h-24 sm:w-24" />,
  "Heavy rain": <CloudRain className="h-16 w-16 sm:h-24 sm:w-24" />,
  Mist: <Cloud className="h-16 w-16 sm:h-24 sm:w-24" />,
  Fog: <Cloud className="h-16 w-16 sm:h-24 sm:w-24" />,
  Sunny: <Sun className="h-16 w-16 sm:h-24 sm:w-24" />,
  Clear: <Sun className="h-16 w-16 sm:h-24 sm:w-24" />,
};

export const getWindDirection = (deg: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
};
