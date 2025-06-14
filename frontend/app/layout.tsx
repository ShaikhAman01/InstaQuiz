// frontend/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SessionWrapper from './components/SessionWrapper';

export const metadata: Metadata = {
  title: 'BrainBuzz',
  description: 'Real-time multiplayer quiz app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
