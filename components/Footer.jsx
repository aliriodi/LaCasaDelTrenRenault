import React from "react";
import Image from "next/image";
//import emailImg from "../../public/email-icon.png";
//import locationImg from "../../public/location-icon.png";
//import movileImg from "../../public/movile-icon.png";
import Link from "next/link";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineWhatsApp,
} from "react-icons/ai";

export default function Footer() {
  const emailImg = 'null';
  const locationImg = 'null';
  const movileImg = 'null';

  return (
    <footer id="row-1" className=" ">
      {/* Nosotros */}
      <div className="footer-data ">
        <h3 className="text-gray-100 font-extrabold"> Nosotros </h3>
        <div className="footer-data_item">
          <p>
            En <strong>La Casa del Tren Renaul</strong> nos especializamos en ofrecer repuestos y accesorios de calidad para el tren delantero de cualquier Renault.
          </p>
        </div>
      </div>

      {/* Contacto */}
      <div className="footer-data">
        <h3 className="text-gray-100 font-extrabold"> Contacto </h3>
        <div className="footer-data_item">
          {/* <Image src={emailImg} alt="Email" /> */}
          <Link href={"mailto: lacasadeltrenrenault@gmail.com"} legacyBehavior>
            <a >lacasadeltrenrenault@gmail.com</a>
          </Link>
        </div>
        <div className="footer-data_item">
          {/* <Image src={movileImg} alt="Movil" /> */}
          <a >+584145617175</a>
        </div>
        <div className="footer-data_item">
          {/* <Image src={locationImg} alt="Ubicacion" /> */}
          <p>
            Venezuela - San Cristóbal
            <br />
            Calle 6 San Cristóbal Táchira
          </p>
        </div>
      </div>

      {/* Redes Sociales */}
      <div id='Contacto' className="footer-data">
        <h3 className="text-gray-100 font-extrabold"> Redes sociales </h3>
        <div id='facebook' className="">
          <a href=''
             target="_blank"
             rel="noopener noreferrer"
           className="flex items-center space-x-2">

            <AiFillFacebook />
            <span> Facebook</span>

          </a>
        </div>
        <div className="">
          <a href='' 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2">

            <AiFillInstagram />
            <span> Instagram</span>

          </a>
        </div>
        <div className="">
          <a href="https://wa.me/584145617175"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2">

            <AiOutlineWhatsApp />
            <span>Whatsapp</span>

          </a>
        </div>
        {/* <div className="">
        <a  href='#facebook' className="flex items-center space-x-2">
         
            <AiFillLinkedin />
            <span>Linkedin</span>
         
          </a>
        </div> */}
        {/* <div className="">
          <a href='#facebook' className="flex items-center space-x-2">

            <AiFillTwitterCircle />
            <span> Twitter</span>

          </a>
        </div> */}
      </div>

      {/* Copyright */}
      <span className="copyright">

        © Copyright - ArquicomAJ 2025 | All Right Reserverd
      </span>
    </footer>
  );
}