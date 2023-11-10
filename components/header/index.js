'use client'
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BsMoonFill, BsSun } from 'react-icons/bs';

export default function Header() {
  const {theme, setTheme} = useTheme();
  const [darkMode, setDarkMode] = useState(theme === 'light');

  const switchTheme = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? 'dark' : 'light');
  }
  useEffect(() => {
    setDarkMode(theme === 'light')
  }, [theme])

  return (
    <div className='w-full  py-6 border-b border-b-slate-400 dark:bg-gray-700 bg-slate-100'>
      <div className='max-w-[1280px] px-10 mx-auto flex justify-between'>
        <Link href={`/`} className='font-bold text-3xl'>
          Weather App
        </Link>
        <button onClick={switchTheme}
          className='flex items-center gap-2'>
          {darkMode ? <BsMoonFill /> : <BsSun />}
          <span>{darkMode ? 'Dark' : 'Ligth'} Mode</span>
        </button>
      </div>
    </div>
  )
}
