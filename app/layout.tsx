import { Urbanist } from 'next/font/google'

import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Lazy Bones',
  description: 'The place for all your purchases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}