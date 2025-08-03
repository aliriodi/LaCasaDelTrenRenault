import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Layout1 from '../Layout1'
import Footer from '../Footer';
import Head from "next/head";
import data from './card.json';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

function Card() {
    function Qty(brand){
        const matching = data.cards.filter(p => p.brand == brand);
   return matching.length+' '
    }

    return (
        
        <Layout1>
        
            {/* <Navbar /> */}
            <div
                className={`${geistSans.className} ${geistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20`}
            >
        
                    <div className='pt-12 mx-auto text-black'>
                    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 w-full ">

                            {data.brands.map((card, index) => (
                                <div key={index} className="  rounded-xl p-4 shadow-md transition duration-300 hover:border-yellowPrimary hover:bg-yellowPrimary mx-auto">
                                    <a
                                        href={'/products/' + card.text}
                                        className="inline-block mt-2 hover:underline"
                                    >
                                        <img src={card.image} alt={card.text}  className="w-auto h-40 object-contain rounded mx-auto" />
                                        <h2 className="text-xl font-bold mt-2">{Qty(card.text)}Productos</h2>
                                        {/* <h2 className="text-xl font-bold mt-2">{card.text}</h2> */}

                                        {/* <p className="text-gray-700">{card.description}</p> */}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
        
            </div>
        
        </Layout1>
    )
}

export default Card