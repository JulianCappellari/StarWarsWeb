import Link from 'next/link'
import React from 'react'

interface Props {
    title: string
    link: string
}

const Button: React.FC<Props> = ({title, link}: Props) => {
  return (
    <div className='flex justify-center items-center h-10'>
      <Link href={link} className='w-40 md:w-auto flex items-center justify-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-110 transition-all duration-300'>
          {title}
      </Link>
    </div>
  )
}

export default Button
