import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans, Outfit, Baloo_Paaji_2 } from 'next/font/google'
import { ServiceWorkerRegister } from '@/components/sw-register'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hand',
  display: 'swap',
})

const balooPaaji = Baloo_Paaji_2({
  subsets: ['gurmukhi', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-punjabi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'A Little Something — Happy Birthday',
  description: 'A handmade birthday experience: a song, a memory lane, letters, and a few surprises.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Happy Birthday',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1B1023',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${jakarta.variable} ${outfit.variable} ${balooPaaji.variable}`}>
      <body className="antialiased font-sans">
        <ServiceWorkerRegister />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

