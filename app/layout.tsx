"use client"
import { RecoilRoot } from 'recoil'
import './globals.css'
import Navbar from '@/components/header/Navbar'
import Modal from '@/components/modals/Modal'
import { useEffect } from 'react'
import AuthProvider from '@/lib/auth'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`h-screen bg-bodybg dark:bg-neutral-950 w-screen dark:text-neutral-200`}>
        <AuthProvider>
          <RecoilRoot>
            <Navbar></Navbar>
            <Modal></Modal>
            {children}
          </RecoilRoot>
        </AuthProvider>  
      </body>
    </html>
  )
}