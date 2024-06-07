import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

const getWeatherByName = async (name: string) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${name}`,
  );
  return response.data;
};

export const useWeather = (cityName: string) => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeatherByName(cityName),
    enabled: !!cityName,
  });
};
