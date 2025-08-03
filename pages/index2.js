import Image from "next/image";
import Navbar from "@/components/Navbar";
import Whatssapp from "@/components/Whatssapp";
import PARTI from "@/components/PARTI";
import CARD3 from "@/components/Card3";
import CardSlider from "@/components/CardSlider";
import CardSliderV2 from "@/components/CardSliderV2";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const [powerOn, setPowerOn] = useState(false);

  return (
    <div className="bg-gray-300">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div id='Inicio'
        className={`${geistSans.className} ${geistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20`}
      >

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Whatssapp />
          <div id='Inicio' className="pr-6">
          <div className="pt-16"></div>
            <CardSliderV2 />
            <PARTI />
            <CARD3 />

            <button
              onClick={() => setPowerOn(!powerOn)}
              className="mb-4 px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
            >
              {powerOn ? "Ocultar Slider" : "Mostrar Slider"}
            </button>

            {powerOn && <CardSlider />}


            {<CardSlider /> && powerOn}

          {/* Ubicacion en MAPA */}
            {/* <div className="w-full h-[300px]">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.717032206241!2d-64.175946!3d-31.366786899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943299b4c08c9733%3A0xfa8f91ef0a352843!2sTruck%20Parts!5e0!3m2!1ses-419!2sar!4v1748730324322!5m2!1ses-419!2sar"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div> */}

            <div className="bg-green-800">
            
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
