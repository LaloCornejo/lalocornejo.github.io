
import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { url } from 'inspector'
import { ThemeProvider } from '@/components/providers/theme'
import { ConvexClientProvider } from '@/components/providers/convex-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LÆLÖ Notes',
  description: 'The conected workspace where better, faster work happens',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='LÆLÖ-theme'
        >
          <Toaster position='bottom-center'/>
          {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}