'use client'
import React, { useState } from 'react'

export default function Input({ setCity}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setCity(inputValue);
    setInputValue('')
  }

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={submitHandler} className='flex gap-2 items-center'>
        <input
          type='text'
          placeholder='search'
          value={inputValue}
          onChange={handleInputChange}
          className='md:w-[400px]  dark:bg-gray-700 dark:border-none'
        />
        <button className='btn dark:bg-gray-700' type='submit' >Search</button>
      </form>
    </div>
  )
}
