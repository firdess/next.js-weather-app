import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Provider from './providers/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Provider attribute="class" >
          <Header />
          <main className=' pt-5 pb-5 min-w-[375px] dark:bg-gray-800 min-h-screen'>{children}</main>
        </Provider>
      </body>
    </html>
  )
}
