import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { RegisterSW } from '@/components/register-sw'
import { AdScripts } from '@/components/ad-scripts'

import './globals.css'

const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LynxFlix - Filmes, Series e Animes',
  description: 'Assista filmes, series e animes online gratuitamente no LynxFlix.',
}

export const viewport: Viewport = {
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <RegisterSW />
        <AdScripts />
        {children}
      </body>
    </html>
  )
}
