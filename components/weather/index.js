'use client'
import React, { useEffect, useState } from 'react';
import Input from '../input';
import { getWeatherData } from '@/utils/weather';
import Loading from '../loading';
import Card from '../card';
import Link from 'next/link';
import Cards from '../cards';


export default function Weather() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (city) {
      setLoading(true)
      getWeatherData(city)
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
          setError(null)
        }
        )
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          setWeatherData(null);
        })
    }
  }, [city])

  return (
    <div className='container py-5  mx-auto h-full dark:bg-gray-800'>
      <Input city={city} setCity={setCity} />
      <div>
        {loading ? <Loading />
          : weatherData && (
            <div className='min-w-[375px] px-7 flex items-center justify-center' >
              <Link href={`/weather/[name]`} as={`/weather/${weatherData.name}`}  className='w-full lg:w-1/2' >
                <Card
                  name={weatherData.name}
                  country={weatherData.sys.country}
                  dt={weatherData.dt}
                  temp={weatherData.main.temp.toFixed(0)}
                  tempUnit="°C"
                  weatherDesc={weatherData.weather[0].description}
                  windSpeed={(weatherData.wind.speed * 3.6).toFixed(0)}
                  humidity={`${weatherData.main.humidity}%`}
                  pressure={`${weatherData.main.pressure}mb`}
                  visibility={`>${weatherData.visibility}m`}
                  icon={weatherData.weather[0].icon} />
              </Link>
            </div>
          )
        }
      </div>
      {
        error && (
          <div className='w-full flex items-center justify-center'>
            <div className="flex  items-center dark:bg-gray-700 dark:text-white p-4 mb-4 text-sm capitalize text-blue-800 border w-1/2 mt-4 border-blue-300 rounded-lg bg-blue-50 " role="alert">
              {error}!
            </div>
          </div>
        )
      }
      <div className='pt-8 px-7'>
        <h2 className='font-bold text-xl'>Bazı İllerde Hava Durumu</h2>
        <Cards />
      </div>
    </div>
  )
}
