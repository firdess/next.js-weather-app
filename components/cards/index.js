'use client'
import React, { useEffect, useState } from 'react'
import Card from '../card'
import { getWeatherData } from '@/utils/weather';
import Link from 'next/link';
import Loading from '../loading';

export default function Cards() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardList = ['İstanbul', 'İzmir', 'Bursa', 'Ankara', 'Mersin', 'Antalya', 'Eskişehir', 'Ordu'];

  useEffect(() => {
    setLoading(true)
    Promise.all(
      cardList.map(async (city) => {
        try {
          const weatherData = await getWeatherData(city);
          // Hava durumu verilerini state'e ekleyin.
          setWeatherData((prevData) => [...prevData, weatherData])
        } catch (error) {
          setError(error.message)
          console.error(`Hava durumu verileri alınırken hata oluştu: ${error.message}`);
        }
      }))
      .then(() => setLoading(false))
      .catch((error) => console.error(`Hava durumu verileri alınırken hata oluştu: ${error.message}`));
  }, [])

  return (
    <>
      {loading ? <Loading />
        : (<div className='grid grid-cols-1 gap-2 lg:grid-cols-2 '>
          {
            cardList.map((cityName, index) => {
              const cityWeatherData = weatherData.find(data => data.name === cityName);

              if (cityWeatherData) {
                // eslint-disable-next-line react/jsx-key
                return <Link href={`/weather/[name]`} as={`/weather/${cityWeatherData.name}`} >
                  <Card key={index}
                    name={cityWeatherData.name}
                    country={cityWeatherData.sys.country}
                    dt={cityWeatherData.dt}
                    temp={cityWeatherData.main.temp.toFixed(0)}
                    tempUnit="°C"
                    weatherDesc={cityWeatherData.weather[0].description}
                    windSpeed={(cityWeatherData.wind.speed * 3.6).toFixed(0)}
                    humidity={`${cityWeatherData.main.humidity}%`}
                    pressure={`${cityWeatherData.main.pressure}mb`}
                    visibility={`>${cityWeatherData.visibility}m`}
                    icon={cityWeatherData.weather[0].icon} />
                </Link>
              }
            })
          }
          {
            error && (
              <div className='w-full flex items-center justify-center'>
                <div className="flex  items-center dark:bg-gray-700 dark:text-white p-4 mb-4 text-sm capitalize text-blue-800 border  mt-4 border-blue-300 rounded-lg bg-blue-50 " role="alert">
                  {error}!
                </div>
              </div>
            )
          }
        </div>)
      }
    </>
  )
}
