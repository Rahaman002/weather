import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const getWeatherByName = async (name: string) => {
  const response = await axios.get(`${BASE_URL}${name}/?key=${API_KEY}`);
  return response.data;
};

export const useWeather = (cityName: string) => {
  localStorage.setItem("city", cityName);
  return useQuery({
    queryKey: ["weather", cityName],
    queryFn: () => getWeatherByName(cityName),
    enabled: !!cityName,
  });
};
