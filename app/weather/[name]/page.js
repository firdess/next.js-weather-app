'use client'
import InfoCard from '@/components/infocard';
import Loading from '@/components/loading';
import { getTimeFromTimestamp, timestampToLocaleString } from '@/utils/helper';
import { getWeatherData } from '@/utils/weather';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BsArrowLeftShort, BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs'
import { CgArrowsMergeAltV } from 'react-icons/cg';
import { FaDroplet } from 'react-icons/fa6';
import { TbWind } from 'react-icons/tb';
const URL = 'https://api.openweathermap.org/data/2.5/forecast'
const ICON = 'http://openweathermap.org/img/w'

export default function WeatherDetailPage({ params }) {

  const [details, setDetails] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const hourlyData = async () => {
    try {
      const res = await fetch(`${URL}?q=${params.name}&appid=0c88346c223ea803edd6076425288375&units=metric&lang=tr`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message)
      }
      setHourly(data.list)
    } catch (error) {
      console.error(error.message);
    }

  }

  const degreeTurn = (deg) => {
    if (deg >= 337.5 || deg < 22.5) {
      return 'Kuzey';
    } else if (deg >= 22.5 && deg < 67.5) {
      return 'Kuzeydoğu';
    } else if (deg >= 67.5 && deg < 112.5) {
      return 'Doğu';
    } else if (deg >= 112.5 && deg < 157.5) {
      return 'Güneydoğu';
    } else if (deg >= 157.5 && deg < 202.5) {
      return 'Güney';
    } else if (deg >= 202.5 && deg < 247.5) {
      return 'Güneybatı';
    } else if (deg >= 247.5 && deg < 292.5) {
      return 'Batı';
    } else if (deg >= 292.5 && deg < 337.5) {
      return 'Kuzeybatı';
    } else {
      return 'Geçersiz Derece';
    }
  }


  useEffect(() => {
    setLoading(true)
    if (params) {
      getWeatherData(params.name)
        .then(data => {
          setDetails(data);
          setLoading(false)
        })
        .catch(error => {
          console.error(error.message);
          setError(error.message);
          setLoading(false)
        })
    }
    hourlyData();
  }, [params])

  useEffect(() => {

  }, [hourly]);

  return (
    <div className='max-w-[1280px] mx-auto '>
      <Link href={`/`} >
        <div className='flex dark:bg-gray-700 ml-5  rounded-md items-center gap-1 border px-3 py-1 w-[100px] bg-slate-100'>
          <BsArrowLeftShort />
          Back
        </div>
      </Link>
      {
        loading ? <Loading />
          : error ? <div className="flex  items-center dark:bg-gray-700 dark:text-white p-4 mb-4 text-sm capitalize text-blue-800 border w-1/2 mt-4 border-blue-300 rounded-lg bg-blue-50 " role="alert">{error}</div>
            : (
              <>
                {details && (
                  <div className='px-7 flex flex-col lg:flex-row  gap-5 w-full'>
                    <div>
                      <img className='w-[300px] object-cover' alt="weather-icon" src={`${ICON}/${details?.weather[0].icon}.png`} />
                    </div>
                    <div className='w-full '>
                      <h2 className='text-2xl underline'>{details?.name},{details?.sys?.country}</h2>
                      <div>Güncelleme:<span>{timestampToLocaleString(details?.dt)}</span></div>
                      <div className='flex gap-10 dark:bg-gray-700 mt-3 items-start w-full lg:w-2/3 bg-slate-100 p-3 rounded-md '>
                        <div className=' flex flex-col  gap-2 '>
                          <div className='flex flex-col gap-1'>
                            <div>
                              <span> Sıcaklık: {details?.main.temp.toFixed(0)}°C</span> |
                              <span className='capitalize'> {details?.weather[0].description}</span>
                            </div>
                            <div>
                              Hissedilen sıcaklık: {details?.main.feels_like.toFixed(0)}°C
                            </div>
                            <div>
                              Maximum sıcaklık: {details?.main.temp_max.toFixed(0)}°C
                            </div>
                            <div>
                              Minimum sıcaklık: {details?.main.temp_min.toFixed(0)}°C
                            </div>
                          </div>
                          <div>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                          <InfoCard icon={<FaDroplet />} label='Nem' value={`${details?.main.humidity}%`} />
                          <InfoCard icon={<CgArrowsMergeAltV />} label='Basınç' value={`${details?.main.pressure}mb`} />
                          <InfoCard icon={<AiFillEye />} label='Görüş mesafesi' value={` >${details?.visibility}m`} />
                          <InfoCard icon={<TbWind />} label='Rüzgar' value={`${(details?.wind.speed * 3.6).toFixed(0)}Km/h`} />
                        </div>
                      </div>
                      <div className='bg-slate-100 dark:bg-gray-700 mt-4 w-full lg:w-2/3 p-3 rounded-md'>
                        <h4 className='mb-2 border-b border-b-slate-200'>GünDoğumu / GünBatımı</h4>
                        <div className='flex flex-col gap-2'>
                          <InfoCard icon={<BsFillSunriseFill />} label='GünDoğumu' value={getTimeFromTimestamp(details?.sys.sunrise)} />
                          <InfoCard icon={<BsFillSunsetFill />} label='GünBatımı' value={getTimeFromTimestamp(details?.sys.sunset)} />
                        </div>
                      </div>
                    </div>
                  </div>)}
                <div className='mt-5 px-7'>
                  <h2 className='font-bold text-xl'>Saatlik Tahmin</h2>
                  <table className='w-full border-collapse bg-slate-100 dark:bg-gray-700 mt-5'>
                    <thead>
                      <tr>
                        <th >Saat</th>
                        <th>Beklenen hadise</th>
                        <th >Sıcaklık (°C)</th>
                        <th>Hissedilen Sıcaklık (°C)</th>
                        <th className='hidden md:table-cell'>Nem(%)</th>
                        <th className='hidden md:table-cell'>Rüzgar (Km/s)</th>
                        <th className='hidden md:table-cell'>Rüzgar Yönü</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hourly.map((hour) => (
                        <tr key={hour.dt}>

                          <td>
                            <span>{new Date(hour.dt_txt).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className='block'>{new Date(hour.dt_txt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: 'numeric' })}</span>
                          </td>
                          <td>
                            <div className='flex items-center justify-center'>
                              <img className='text-center' src={`${ICON}/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
                            </div>
                            <span className='block'>{hour.weather[0].description}</span>
                          </td>
                          <td><span>{hour.main.temp.toFixed(0)}</span></td>
                          <td><span>{hour.main.feels_like.toFixed(0)}</span></td>
                          <td className='hidden md:table-cell'><span>{hour.main.humidity}</span></td>
                          <td className='hidden md:table-cell'><span>{Math.round(hour.wind.speed * 3.6)}</span></td>
                          <td className='hidden md:table-cell'><span>{degreeTurn((hour.wind.deg))}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
      }
    </div>
  )

}
