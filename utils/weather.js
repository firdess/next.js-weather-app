const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city) {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&lang=tr&appid=0c88346c223ea803edd6076425288375&units=metric`);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    throw error;
  }
}