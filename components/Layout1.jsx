import React from 'react'
import Navbar from './Navbar';
//import NavbarHours from './NavHours'
import Footer from './Footer';
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

function Layout1({ children }) {
    return (
        <div className={`${geistSans.className} ${geistMono.className} bg-gradient-to-r bg-white to-yellow-300`} >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                  {/* SEO básico */}
                {/*Esta linea es para que el resposive se vea bien tambien */ }
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta name="description" content="Repuestos y accesorios para Renault Twingo, Clio, Logan, Symbol, Megane y más. Atención personalizada, envío rápido y confianza garantizada." />
                <meta name="keywords" content="repuestos Renault, Renault Twingo, Clio, Logan, Symbol, Megane, accesorios, La Casa del Twiingo, repuestos originales" />
                <meta name="author" content="La Casa del Tren Renault" />
                <meta name="robots" content="index, follow" />
                  {/* Open Graph para redes sociales */}
                <meta property="og:title" content="La Casa del tren Renault - Repuestos Renault" />
                <meta property="og:description" content="Más que repuestos, una comunidad Renault. Atención personalizada y stock confiable." />
                <meta property="og:image" content="https://la-casa-del-tren-renault.vercel.app/logo.jpg" />
                <meta property="og:url" content="https://la-casa-del-tren-renault.vercel.app/" />
                <meta property="og:type" content="website" />

            </Head>
            {/* <NavbarHours /> */}
            <Navbar />
            <div
                className={`${geistSans.className} ${geistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20`}
            >
                <main className="flex flex-col  items-center sm:items-start">

                    <div className='pt-12 pb-8 text-black'>


                        {children}

                    </div>
                    <div className="bg-yellowPrimary ">
                        </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout1