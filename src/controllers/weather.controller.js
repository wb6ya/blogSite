import { fetchWeatherData } from "../services/weather.service.js";

export const getWeather = async (req, res) => {
  const { location } = req.params;

  try {
    const result = await fetchWeatherData(location);

    return res.json({
      status: "success",
      data: result.data,
      source: result.source 
    });

  } catch (error) {
    if (error.response && error.response.status === 400) {
      return res.status(400).json({
        status: "error",
        message: "Invalid location specified",
        details: error.response.data || error.message
      });
    }
    
    return res.status(500).json({
      status: "error",
      message: "Error fetching weather data"
    });
  }
};