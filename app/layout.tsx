'use client'

import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>
                    Eurovegas | Online Casino
                </title>

                <meta name="description" content="Eurovegas is an online casino with a wide variety of games." />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
            </head>

            <body className={ `bg-slate-950 flex flex-col w-screen h-screen overflow-y-scroll overflow-x-hidden ${ inter.className }` }>
                { children }
            </body>
        </html>
    )
}
