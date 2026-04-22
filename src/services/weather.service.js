import { env } from "../config/env.js";
import axios from "axios";
import { setValue, getValue } from "../config/redis.js";

export const fetchWeatherData = async (location) => {
  const apiUrl = `${env.WEATHER_API_URL}${location}?unitGroup=metric&key=${env.WEATHER_API_KEY}&contentType=json`;

  const cachedData = await getValue(`weather:${location}`);
  if (cachedData) {
    return { data: JSON.parse(cachedData), source: "cache" };
  }

  const response = await axios.get(apiUrl);
  if (response.data) {
    await setValue(`weather:${location}`, JSON.stringify(response.data));
    return { data: response.data, source: "api" };
  }
};