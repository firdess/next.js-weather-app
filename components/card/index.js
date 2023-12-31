import InfoCard from "../infocard";
import { TbWind } from 'react-icons/tb';
import { FaDroplet } from 'react-icons/fa6';
import { CgArrowsMergeAltV } from 'react-icons/cg';
import { AiFillEye } from 'react-icons/ai';
import { timestampToLocaleString } from "@/utils/helper";

const ICON = 'http://openweathermap.org/img/w'

export default function Card({ name, country, dt, temp, tempUnit, weatherDesc, windSpeed, humidity, pressure, visibility, icon }) {

  return (
    <div className='bg-slate-100 p-5  dark:bg-gray-700 dark:text-white'>
      <div className='flex flex-col md:flex-row  gap-3'>
        <div className="w-[100px] h-[100px] object-cover">
          <img className='w-[100px] h-[100px] object-cover' alt="weather-icon" src={`${ICON}/${icon}.png`} />
        </div>
        <div className='w-full'>
          <h2 className='font-bold text-base md:text-xl'>
            {name},{country}
          </h2>
          <span>{timestampToLocaleString(dt)}</span>
          <div className='flex flex-col md:flex-row justify-between md:items-center border-b dark:border-b-gray-300 border-b-black pr-7'>
            <div className='flex items-center gap-3'>
              <span ><span className='text-[36px] xl:text-[56px] font-medium'>{temp}</span> <span className='text-[30px] xl:text-[44px]'> {tempUnit}</span></span>
              <span className='capitalize'>{weatherDesc}</span>
            </div>
            <div className='flex items-center gap-1'>
              <TbWind className='w-[36px] h-[36px]' />
              <div className='flex flex-col '>
                Rüzgar:
                <span>{windSpeed} Km/h</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2 mt-2 md:items-center'>
            <InfoCard icon={<FaDroplet />} label='Nem' value={humidity} />
            <span className="hidden md:block">|</span>
            <InfoCard icon={<CgArrowsMergeAltV />} label='Basınç' value={pressure} />
            <span className="hidden md:block">|</span>
            <InfoCard icon={<AiFillEye />} label='Görüş mesafesi' value={visibility} />
          </div>
        </div>
      </div>
    </div>
  )
}
