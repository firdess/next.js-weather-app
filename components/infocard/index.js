import React from 'react'

export default function InfoCard({icon,label,value}) {
  return (
    <div className='flex items-center gap-1 text-sm'>
      {icon}
      <span>
        {label}: 
         {value}
      </span>
    </div>
  )
}
