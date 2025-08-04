import Layout1 from '@/components/Layout1';
import Whatssapp from '@/components/Whatssapp';
import PARTI from '@/components/PARTI';
import CARD3 from '@/components/Card3';
import CardSlider from '@/components/CardSlider';
import CardSliderV2 from '@/components/CardSliderV2';
// import Navbar from '@/components/Navbar'; // Descomentá si lo usás
// import Footer from '@/components/Footer'; // Descomentá si lo usás
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import React,{ useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home(): React.JSX.Element {
  const [powerOn, setPowerOn] = useState<boolean>(false);

  return (
    <div className="bg-gray-300">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout1>
        {/* <Navbar /> */}

        <div
          id="Inicio"
          className={`${geistSans.className} ${geistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20`}
        >
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Whatssapp />
            <div id="Inicio" className="pr-6">
              <div className="pt-16" />
              <CardSliderV2 />
              <PARTI />
              <CARD3 />

              {/* <button
                onClick={() => setPowerOn(!powerOn)}
                className="mb-4 px-4 py-2 bg-yellowPrimary text-white rounded-xl hover:bg-yellowThirth transition"
              >
                {powerOn ? "Ocultar Slider" : "Mostrar Slider"}
              </button> */}

              {powerOn && <CardSlider />}
              {/* El siguiente condicional no tiene efecto y puede eliminarse */}
              {/* {<CardSlider /> && powerOn} */}

              {/* Mapa */}
              <div className="w-full h-[300px] pt-10 rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3952.9284522880566!2d-72.2047!3d7.7974!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e666d5efe6f8003%3A0x7e7b6655169dd639!2sLa%20casa%20del%20Twingo!5e0!3m2!1sen!2sar!4v1748896390716!5m2!1sen!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>

              <div className="bg-yellowPrimary rounded-xl">
                {/* <Footer /> */}
              </div>
            </div>
          </main>
        </div>
      </Layout1>
    </div>
  );
}
