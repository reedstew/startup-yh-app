import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import KeyboardNavigation from '@/components/KeyboardNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '@YoungHumanitarians',
    description: 'Proxy website for young humanitarians startup',
}

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <KeyboardNavigation />
        {children}
        </body>
        </html>
    )
}