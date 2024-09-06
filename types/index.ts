export type WeatherData = {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_degree: number;
    feelslike_c: number;
    vis_km: number;
    humidity: number;
    precip_mm: number;
    uv: number;
  };
};
