"use client";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp ,  FaInstagram} from "react-icons/fa";
// Sustituye estos EJEMPLOS por tus boletos. Conserva numero como texto.
// true = vendido y habilitado; false = no participa.
// Puedes agregar teléfono, comprador u otros campos.
const imagen = "https://res.cloudinary.com/dvy9qircy/image/upload/v1792797066/forex/forex_academy_professional_logoAGUILAS.jpg"
// const BOLETOS_INICIALES = [
//   { numero: "007", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "008", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "012", juega: true, nombre: "Participante de ejemplo B" },
//   { numero: "013", juega: true, nombre: "Participante de ejemplo A" },
//   { numero: "019", juega: false, nombre: "No vendido" },
//   { numero: "125", juega: true, nombre: "Participante de ejemplo C" },
//   { numero: "128", juega: true, nombre: "Participante de ejemplo D" },
//   { numero: "247", juega: true, nombre: "Participante de ejemplo E" },
//   { numero: "249", juega: false, nombre: "No vendido" },
//   { numero: "580", juega: true, nombre: "Participante de ejemplo F" },
//   { numero: "999", juega: true, nombre: "Participante de ejemplo G" },
// ];
//El número 060 aparece dos veces: para Jacquelin de Araujo y Liz Narvaez. Lo mantuve como lo enviaste; revisa cuál corresponde antes de cargarlo.
//pagina 12 los numeros de Vanessa estan vacios solo nombres
//356 lo tienen ARELLA  JOHANA
//El 447 aparece para Mariana Peñaloza y Mariana Moreno Bolaño.
//El 531 aparece para Cristian Parinango y Tany Minaya.

// const BOLETOS_INICIALES = [
//   { numero: "321", juega: true, nombre: "Adriana Diaz" , responsable:"Jenny Franco"},
//   { numero: "329", juega: true, nombre: "Adriana Diaz", responsable:"Jenny Franco" },
//   { numero: "322", juega: true, nombre: "Jonny Franco", responsable:"Jenny Franco" },
//   { numero: "345", juega: true, nombre: "Jonny Franco", responsable:"Jenny Franco" },
//   { numero: "333", juega: true, nombre: "Genexis Zambrano", responsable:"Jenny Franco" },
//   { numero: "356", juega: true, nombre: "Arella Franco",responsable:"Jenny Franco" },
//   { numero: "346", juega: true, nombre: "Jenny Franco",responsable:"Jenny Franco" },
//   { numero: "358", juega: true, nombre: "Lisbhet Romero",responsable:"Jenny Franco" },
//   { numero: "323", juega: true, nombre: "Benja Carigaris",responsable:"Jenny Franco" },
//   { numero: "337", juega: true, nombre: "Benja Carigaris",responsable:"Jenny Franco" },
//   { numero: "357", juega: true, nombre: "Emiliano Franco",responsable:"Jenny Franco" },
//   { numero: "334", juega: true, nombre: "Gustavo Salva",responsable:"Jenny Franco" }, 
//   { numero: "355", juega: true, nombre: "Gustavo Salva",responsable:"Jenny Franco" },
//   { numero: "343", juega: true, nombre: "Sofia Luna",responsable:"Jenny Franco" },
//   { numero: "331", juega: true, nombre: "Mica Acevedo",responsable:"Jenny Franco" },
//   { numero: "344", juega: true, nombre: "Mica Acevedo",responsable:"Jenny Franco" }, 
//   { numero: "327", juega: true, nombre: "Arella Franco",responsable:"Jenny Franco" },
//   { numero: "352", juega: true, nombre: "Marcelo Bertone",responsable:"Jenny Franco" },
//   { numero: "353", juega: true, nombre: "Angeles Moscaro",responsable:"Jenny Franco" },
//   { numero: "354", juega: true, nombre: "Daniel Martinez",responsable:"Jenny Franco" },
//   { numero: "324", juega: true, nombre: "Alejandro Diaz",responsable:"Jenny Franco" },
//   { numero: "003", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "018", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "036", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "026", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "017", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "025", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "006", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "012", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "021", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "030", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "020", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "008", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "040", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "016", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "013", juega: true, nombre: "Juan Amigo Onil", responsable: "Mychell" },
//   { numero: "022", juega: true, nombre: "Juan Amigo Onil", responsable: "Mychell" },
//   { numero: "001", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "002", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "004", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "011", juega: true, nombre: "Janeth Valbuena", responsable: "Mychell" },
//   { numero: "005", juega: true, nombre: "Juli Marques", responsable: "Mychell" },
//   { numero: "028", juega: true, nombre: "Cecilia Castro", responsable: "Mychell" },
//   { numero: "035", juega: true, nombre: "Enzo Feldman", responsable: "Mychell" },
//   { numero: "024", juega: true, nombre: "María José Nieto", responsable: "Mychell" },
//   { numero: "031", juega: true, nombre: "María Terán", responsable: "Mychell" },
//   { numero: "033", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
//   { numero: "034", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
//   { numero: "037", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "038", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "039", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "070", juega: true, nombre: "Levi Narvaez", responsable: "Nelsy" },
//   { numero: "080", juega: true, nombre: "Karly Narvaez", responsable: "Nelsy" },
//   { numero: "051", juega: true, nombre: "Adriana Narvaez", responsable: "Nelsy" },
//   { numero: "060", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
//   { numero: "076", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
//   { numero: "056", juega: true, nombre: "Orany Cermeño", responsable: "Nelsy" },
//   { numero: "077", juega: true, nombre: "Deysi Narvaez", responsable: "Nelsy" },
//   { numero: "049", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
//   { numero: "043", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
//   { numero: "062", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
//   { numero: "066", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
//   { numero: "053", juega: true, nombre: "Diego Cermeño", responsable: "Nelsy" },
//   { numero: "064", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
//   { numero: "042", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
//   { numero: "078", juega: true, nombre: "Gricelda Narvaez", responsable: "Nelsy" },
//   { numero: "058", juega: true, nombre: "Cristian Montenegro", responsable: "Nelsy" },
//   { numero: "075", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
//   { numero: "079", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
//   { numero: "055", juega: true, nombre: "Nelson José Narvaez", responsable: "Nelsy" },
//   { numero: "045", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "052", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "073", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "041", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "057", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "065", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "067", juega: true, nombre: "Patricia Narvaez", responsable: "Nelsy" },
//   { numero: "059", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "069", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "074", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "063", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
//   { numero: "071", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
//   { numero: "048", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   //{ numero: "060", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "068", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "044", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "072", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "054", juega: true, nombre: "Yamilet Narvaez", responsable: "Nelsy" },
//   { numero: "087", juega: true, nombre: "Marta Cordova", responsable: "Kimberly" },
//   { numero: "094", juega: true, nombre: "Kimberly Cordova", responsable: "Kimberly" },
//   { numero: "095", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "100", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "110", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "097", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
//   { numero: "120", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
//   { numero: "101", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "104", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "112", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "107", juega: true, nombre: "Williams Cordova", responsable: "Kimberly" },
//   { numero: "109", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
//   { numero: "116", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
//   { numero: "111", juega: true, nombre: "Édison Cordova", responsable: "Kimberly" },
//   { numero: "114", juega: true, nombre: "Edgardo Cordova", responsable: "Kimberly" },
//   { numero: "118", juega: true, nombre: "Iris Cordova", responsable: "Kimberly" },
//   { numero: "089", juega: true, nombre: "Belen Cordova", responsable: "Kimberly" },
//   { numero: "121", juega: true, nombre: "Beatriz Salcedo", responsable: "Beatriz" },
//   { numero: "122", juega: true, nombre: "Margarita Salcedo", responsable: "Beatriz" },
//   { numero: "123", juega: true, nombre: "Eliezer Salcedo", responsable: "Beatriz" },
//   { numero: "140", juega: true, nombre: "Zoé Salcedo", responsable: "Beatriz" },
//   { numero: "130", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
//   { numero: "133", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
//   { numero: "124", juega: true, nombre: "Lisbeth Salcedo", responsable: "Beatriz" },
//   { numero: "136", juega: true, nombre: "Orany Salcedo", responsable: "Beatriz" },
//   { numero: "132", juega: true, nombre: "Brenda Salcedo", responsable: "Beatriz" },
//   { numero: "145", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
//   { numero: "126", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
//   { numero: "163", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "172", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "180", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "167", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
//   { numero: "188", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
//   { numero: "179", juega: true, nombre: "Eliana Barrera", responsable: "Daro" },
//   { numero: "183", juega: true, nombre: "Alberto", responsable: "Daro" },
//   { numero: "168", juega: true, nombre: "Alberto", responsable: "Daro" },
//   { numero: "198", juega: true, nombre: "Alberto", responsable: "Daro" },
//   { numero: "187", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
//   { numero: "195", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
//   { numero: "199", juega: true, nombre: "Ismael", responsable: "Daro" },
//   { numero: "200", juega: true, nombre: "Ismael", responsable: "Daro" },
//   { numero: "164", juega: true, nombre: "Orlando", responsable: "Daro" },
//   { numero: "194", juega: true, nombre: "Orlando", responsable: "Daro" },
//   { numero: "161", juega: true, nombre: "Emanuel Gregorat", responsable: "Daro" },
//   { numero: "165", juega: true, nombre: "Alan Clemente", responsable: "Daro" },
//   { numero: "169", juega: true, nombre: "Sandra Clienta", responsable: "Daro" },
//   { numero: "171", juega: true, nombre: "Ros Goya", responsable: "Daro" },
//   { numero: "178", juega: true, nombre: "Ros Goya", responsable: "Daro" },
//   { numero: "173", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
//   { numero: "174", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
//   { numero: "175", juega: true, nombre: "Alba Gutiérrez", responsable: "Daro" },
//   { numero: "177", juega: true, nombre: "Federico Torres", responsable: "Daro" },
//   { numero: "170", juega: true, nombre: "Federico Torres", responsable: "Daro" },
//   { numero: "181", juega: true, nombre: "Sandra Heinz", responsable: "Daro" },
//   { numero: "185", juega: true, nombre: "Alejandro Moll", responsable: "Daro" },
//   { numero: "189", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
//   { numero: "192", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
//   { numero: "191", juega: true, nombre: "Leandro García", responsable: "Daro" },
//   { numero: "193", juega: true, nombre: "Karyna Sosa", responsable: "Daro" },
//   { numero: "197", juega: true, nombre: "Karen Rosales", responsable: "Daro" },
//   { numero: "162", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
//   { numero: "190", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
//   { numero: "166", juega: true, nombre: "Damián Molina", responsable: "Daro" },
//   { numero: "176", juega: true, nombre: "Damián Molina", responsable: "Daro" },
//   { numero: "182", juega: true, nombre: "Elena Goya", responsable: "Daro" },
//   { numero: "184", juega: true, nombre: "Favio Rozek", responsable: "Daro" },
//   { numero: "186", juega: true, nombre: "Cristian Magagna", responsable: "Daro" },
//   { numero: "196", juega: true, nombre: "Esteban Ocaño", responsable: "Daro" },
//   { numero: "225", juega: true, nombre: "Tomas Escaramuza", responsable: "Diana" },
//   { numero: "205", juega: true, nombre: "Micaela Pitre", responsable: "Diana" },
//   { numero: "240", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "208", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "222", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "219", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "212", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "223", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "236", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "241", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "259", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "268", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "271", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "242", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
//   { numero: "274", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
//   { numero: "243", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
//   { numero: "253", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
//   { numero: "244", juega: true, nombre: "Alejandra Cabrera", responsable: "Diocelis" },
//   { numero: "245", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
//   { numero: "270", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
//   { numero: "246", juega: true, nombre: "Luis Figuera", responsable: "Diocelis" },
//   { numero: "247", juega: true, nombre: "Francisco Figuera", responsable: "Diocelis" },
//   { numero: "254", juega: true, nombre: "Ana Karina Rondón", responsable: "Diocelis" },
//   { numero: "261", juega: true, nombre: "Belén Esquivel", responsable: "Diocelis" },
//   { numero: "275", juega: true, nombre: "Santiago Slythe", responsable: "Diocelis" },
//   { numero: "277", juega: true, nombre: "Morela Gómez", responsable: "Diocelis" },
//   { numero: "278", juega: true, nombre: "Heidi Medero", responsable: "Diocelis" },
//   { numero: "281", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "282", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "283", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "284", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "285", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "286", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "287", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "288", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "289", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "290", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
//   { numero: "291", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "292", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "293", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "294", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "295", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "296", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "297", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "298", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "299", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "300", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "301", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "302", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "303", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "304", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "305", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "306", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "307", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "308", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "309", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "310", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "311", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "312", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "313", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
//   { numero: "314", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "315", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "316", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "317", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "318", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "319", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "320", juega: true, nombre: "Elida Barrios", responsable: "Eliana" },
//   { numero: "361", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
//   { numero: "371", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
//   { numero: "395", juega: true, nombre: "Antony Espitia", responsable: "Johana" },
//   { numero: "384", juega: true, nombre: "Yhonatan Espitia", responsable: "Johana" },
//   { numero: "372", juega: true, nombre: "Franberly Cerrando", responsable: "Johana" },
//   { numero: "390", juega: true, nombre: "Eddy Johana Pérez", responsable: "Johana" },
//   //{ numero: "356", juega: true, nombre: "Orany Cermeño", responsable: "Johana" },
//   { numero: "378", juega: true, nombre: "Maira Maramara", responsable: "Johana" },
//   { numero: "379", juega: true, nombre: "Emily Pérez", responsable: "Johana" },
//   { numero: "365", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "368", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "370", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "376", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "382", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "385", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "388", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "391", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "393", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "400", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "380", juega: true, nombre: "Lisbe Pérez", responsable: "Johana" },
//   { numero: "460", juega: true, nombre: "Mayra Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "471", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
//   { numero: "472", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
//   { numero: "455", juega: true, nombre: "Lautaro Romero", responsable: "Mariana y Krisbel" },
//   { numero: "456", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "462", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "458", juega: true, nombre: "Reynoso Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "473", juega: true, nombre: "Fonseca Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "468", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "452", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "444", juega: true, nombre: "Verónica Bustos", responsable: "Mariana y Krisbel" },
//   { numero: "477", juega: true, nombre: "Yoni Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "469", juega: true, nombre: "Ivana Peñaloza", responsable: "Mariana y Krisbel" },
//   //{ numero: "447", juega: true, nombre: "Mariana Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "447", juega: true, nombre: "Mariana Moreno Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "457", juega: true, nombre: "Carmen Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "475", juega: true, nombre: "Inés Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "445", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "478", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "449", juega: true, nombre: "Gabriel Santillán", responsable: "Mariana y Krisbel" },
//   { numero: "474", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
//   { numero: "480", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
//   { numero: "520", juega: true, nombre: "Laura Carrizo", responsable: "Marie" },
//   { numero: "481", juega: true, nombre: "Carlos Oviedo", responsable: "Marie" },
//   { numero: "482", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
//   { numero: "496", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
//   { numero: "519", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
//   { numero: "489", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
//   { numero: "483", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
//   { numero: "484", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
//   { numero: "491", juega: true, nombre: "Nohe Carmona", responsable: "Marie" },
//   { numero: "493", juega: true, nombre: "Elisa Villanueva", responsable: "Marie" },
//   { numero: "500", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "501", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "502", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "510", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
//   { numero: "511", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
//   { numero: "513", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "514", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "515", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "521", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
//   { numero: "538", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
//   { numero: "522", juega: true, nombre: "Joselito Rodríguez", responsable: "Melissa" },
//   { numero: "523", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "534", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "537", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "542", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "545", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "548", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "552", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "553", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "554", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "557", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "524", juega: true, nombre: "Pilar Coronado", responsable: "Melissa" },
//   { numero: "525", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
//   { numero: "526", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
//   { numero: "527", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
//   { numero: "539", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
//   { numero: "528", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
//   //{ numero: "531", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
//   { numero: "549", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
//   { numero: "531", juega: true, nombre: "Tany Minaya", responsable: "Melissa" },
//   { numero: "532", juega: true, nombre: "Kendry Moreno", responsable: "Melissa" },
//   { numero: "533", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
//   { numero: "555", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
//   { numero: "536", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "560", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "551", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "540", juega: true, nombre: "Nelly Rosales", responsable: "Melissa" },
//   { numero: "544", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
//   { numero: "547", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
//   { numero: "550", juega: true, nombre: "Julisa Risco", responsable: "Melissa" },
//   { numero: "556", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
//   { numero: "558", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
//   { numero: "559", juega: true, nombre: "Stuard Cerna", responsable: "Melissa" },
//   { numero: "615", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
//   { numero: "620", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
//   { numero: "628", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
//   { numero: "616", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
//   { numero: "603", juega: true, nombre: "Juan Velasquez", responsable: "Valentina" },
//   { numero: "612", juega: true, nombre: "José Zorrilla", responsable: "Valentina" },
//   { numero: "613", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
//   { numero: "614", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
//   { numero: "608", juega: true, nombre: "Rosiris Lozada", responsable: "Valentina" },
//   { numero: "611", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "605", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "604", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "621", juega: true, nombre: "David Liscano", responsable: "Valentina" },
//   { numero: "636", juega: true, nombre: "Daniela Reverol", responsable: "Valentina" },
//   { numero: "631", juega: true, nombre: "Lautaro Reverol", responsable: "Valentina" },
//   { numero: "606", juega: true, nombre: "Jesús Bellorin", responsable: "Valentina" },
//   { numero: "618", juega: true, nombre: "Soledad Reverol", responsable: "Valentina" },
//   { numero: "627", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
//   { numero: "619", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
//   { numero: "630", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
//   { numero: "609", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
//   { numero: "607", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
//   { numero: "610", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
//   { numero: "601", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "640", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "629", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "637", juega: true, nombre: "Maycol Salas", responsable: "Valentina" },
//   { numero: "623", juega: true, nombre: "Allison Pajuelo", responsable: "Valentina" },
//   { numero: "602", juega: true, nombre: "Solana Torres", responsable: "Valentina" },
//   { numero: "639", juega: true, nombre: "Brenda Godoy", responsable: "Valentina" },
//   { numero: "622", juega: true, nombre: "Milagros Moreira", responsable: "Valentina" },
//   { numero: "617", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
//   { numero: "624", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
//   { numero: "625", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "633", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "626", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "634", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "635", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "000", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  
// ];

// const BOLETOS_INICIALES = [
//   { numero: "001", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "002", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "003", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "004", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
//   { numero: "005", juega: true, nombre: "Juli Marques", responsable: "Mychell" },
//   { numero: "006", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "008", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "011", juega: true, nombre: "Janeth Valbuena", responsable: "Mychell" },
//   { numero: "012", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "013", juega: true, nombre: "Juan Duque", responsable: "Mychell" },
//   { numero: "016", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "017", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "018", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "020", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "021", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "022", juega: true, nombre: "Juan Duque", responsable: "Mychell" },
//   { numero: "024", juega: true, nombre: "María José Nieto", responsable: "Mychell" },
//   { numero: "025", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "026", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
//   { numero: "028", juega: true, nombre: "Cecilia Castro", responsable: "Mychell" },
//   { numero: "030", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
//   { numero: "031", juega: true, nombre: "María Terán", responsable: "Mychell" },
//   { numero: "033", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
//   { numero: "034", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
//   { numero: "035", juega: true, nombre: "Enzo Feldman", responsable: "Mychell" },
//   { numero: "036", juega: true, nombre: "Kendri", responsable: "Mychell" },
//   { numero: "037", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "038", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "039", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
//   { numero: "040", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
//   { numero: "041", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "042", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
//   { numero: "043", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
//   { numero: "044", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "045", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "048", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "049", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
//   { numero: "050", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
//   { numero: "051", juega: true, nombre: "Adriana Narvaez", responsable: "Nelsy" },
//   { numero: "052", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "053", juega: true, nombre: "Diego Cermeño", responsable: "Nelsy" },
//   { numero: "054", juega: true, nombre: "Yamilet Narvaez", responsable: "Nelsy" },
//   { numero: "055", juega: true, nombre: "Nelson José Narvaez", responsable: "Nelsy" },
//   { numero: "056", juega: true, nombre: "Orany Cermeño", responsable: "Nelsy" },
//   { numero: "057", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "058", juega: true, nombre: "Cristian Montenegro", responsable: "Nelsy" },
//   { numero: "059", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "060", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "062", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
//   { numero: "063", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
//   { numero: "064", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
//   { numero: "065", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
//   { numero: "066", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
//   { numero: "067", juega: true, nombre: "Patricia Narvaez", responsable: "Nelsy" },
//   { numero: "068", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "069", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "071", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
//   { numero: "072", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
//   { numero: "073", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
//   { numero: "074", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
//   { numero: "075", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
//   { numero: "076", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
//   { numero: "077", juega: true, nombre: "Deysi Narvaez", responsable: "Nelsy" },
//   { numero: "078", juega: true, nombre: "Gricelda Narvaez", responsable: "Nelsy" },
//   { numero: "079", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
//   { numero: "080", juega: true, nombre: "Karly Narvaez", responsable: "Nelsy" },
//   { numero: "087", juega: true, nombre: "Marta Cordova", responsable: "Kimberly" },
//   { numero: "089", juega: true, nombre: "Belen Cordova", responsable: "Kimberly" },
//   { numero: "094", juega: true, nombre: "Kimberly Cordova", responsable: "Kimberly" },
//   { numero: "095", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "097", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
//   { numero: "100", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "101", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "104", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "107", juega: true, nombre: "Williams Cordova", responsable: "Kimberly" },
//   { numero: "109", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
//   { numero: "110", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
//   { numero: "111", juega: true, nombre: "Édison Cordova", responsable: "Kimberly" },
//   { numero: "112", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
//   { numero: "114", juega: true, nombre: "Edgardo Cordova", responsable: "Kimberly" },
//   { numero: "116", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
//   { numero: "118", juega: true, nombre: "Iris Cordova", responsable: "Kimberly" },
//   { numero: "120", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
//   { numero: "121", juega: true, nombre: "Beatriz Salcedo", responsable: "Beatriz" },
//   { numero: "122", juega: true, nombre: "Margarita Salcedo", responsable: "Beatriz" },
//   { numero: "123", juega: true, nombre: "Eliezer Salcedo", responsable: "Beatriz" },
//   { numero: "124", juega: true, nombre: "Lisbeth Salcedo", responsable: "Beatriz" },
//   { numero: "126", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
//   { numero: "130", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
//   { numero: "132", juega: true, nombre: "Brenda Salcedo", responsable: "Beatriz" },
//   { numero: "133", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
//   { numero: "136", juega: true, nombre: "Orany Salcedo", responsable: "Beatriz" },
//   { numero: "140", juega: true, nombre: "Zoé Salcedo", responsable: "Beatriz" },
//   { numero: "145", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
//   { numero: "161", juega: true, nombre: "Emanuel Gregorat", responsable: "Daro" },
//   { numero: "162", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
//   { numero: "163", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "164", juega: true, nombre: "Orlando", responsable: "Daro" },
//   { numero: "165", juega: true, nombre: "Alan Clemente", responsable: "Daro" },
//   { numero: "166", juega: true, nombre: "Damián Molina", responsable: "Daro" },
//   { numero: "167", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
//   { numero: "168", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
//   { numero: "169", juega: true, nombre: "Sandra Clienta", responsable: "Daro" },
//   { numero: "170", juega: true, nombre: "Federico Torres", responsable: "Daro" },
//   { numero: "171", juega: true, nombre: "Ros Goya", responsable: "Daro" },
//   { numero: "172", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "173", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
//   { numero: "174", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
//   { numero: "175", juega: true, nombre: "Alba Gutiérrez", responsable: "Daro" },
//   { numero: "176", juega: true, nombre: "Damián Molina", responsable: "Daro" },
//   { numero: "177", juega: true, nombre: "Federico Torres", responsable: "Daro" },
//   { numero: "178", juega: true, nombre: "Ros Goya", responsable: "Daro" },
//   { numero: "179", juega: true, nombre: "Eliana Barrera", responsable: "Daro" },
//   { numero: "180", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
//   { numero: "181", juega: true, nombre: "Sandra Heinz", responsable: "Daro" },
//   { numero: "182", juega: true, nombre: "Elena Goya", responsable: "Daro" },
//   { numero: "183", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
//   { numero: "184", juega: true, nombre: "Favio Rozek", responsable: "Daro" },
//   { numero: "185", juega: true, nombre: "Alejandro Moll", responsable: "Daro" },
//   { numero: "186", juega: true, nombre: "Cristian Magagna", responsable: "Daro" },
//   { numero: "187", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
//   { numero: "188", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
//   { numero: "189", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
//   { numero: "190", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
//   { numero: "191", juega: true, nombre: "Leandro García", responsable: "Daro" },
//   { numero: "192", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
//   { numero: "193", juega: true, nombre: "Karyna Sosa", responsable: "Daro" },
//   { numero: "194", juega: true, nombre: "Orlando", responsable: "Daro" },
//   { numero: "195", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
//   { numero: "196", juega: true, nombre: "Esteban Ocaño", responsable: "Daro" },
//   { numero: "197", juega: true, nombre: "Karen Rosales", responsable: "Daro" },
//   { numero: "198", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
//   { numero: "199", juega: true, nombre: "Ismael", responsable: "Daro" },
//   { numero: "200", juega: true, nombre: "Ismael", responsable: "Daro" },
//   { numero: "205", juega: true, nombre: "Micaela Pitre", responsable: "Diana" },
//   { numero: "208", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "212", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "219", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "222", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "223", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "225", juega: true, nombre: "Tomas Escaramuza", responsable: "Diana" },
//   { numero: "236", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "240", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
//   { numero: "241", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "242", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
//   { numero: "243", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
//   { numero: "244", juega: true, nombre: "Alejandra Cabrera", responsable: "Diocelis" },
//   { numero: "245", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
//   { numero: "246", juega: true, nombre: "Luis Figuera", responsable: "Diocelis" },
//   { numero: "247", juega: true, nombre: "Francisco Figuera", responsable: "Diocelis" },
//   { numero: "253", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
//   { numero: "254", juega: true, nombre: "Ana Karina Rondón", responsable: "Diocelis" },
//   { numero: "259", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "261", juega: true, nombre: "Belén Esquivel", responsable: "Diocelis" },
//   { numero: "268", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "270", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
//   { numero: "271", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
//   { numero: "274", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
//   { numero: "275", juega: true, nombre: "Santiago Slythe", responsable: "Diocelis" },
//   { numero: "277", juega: true, nombre: "Morela Gómez", responsable: "Diocelis" },
//   { numero: "278", juega: true, nombre: "Heidi Medero", responsable: "Diocelis" },
//   { numero: "281", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "282", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "283", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "284", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "285", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "286", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "287", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "288", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "289", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "290", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
//   { numero: "291", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "292", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "293", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "294", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "295", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "296", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "297", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "298", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "299", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "300", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "301", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "302", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "303", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "304", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "305", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "306", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "307", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "308", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "309", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "310", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "311", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "312", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "313", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
//   { numero: "314", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "315", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
//   { numero: "316", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "317", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "318", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "319", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
//   { numero: "320", juega: true, nombre: "Elida Barrio", responsable: "Eliana" },
//   { numero: "321", juega: true, nombre: "Adriana Diaz", responsable: "Jenny Franco" },
//   { numero: "322", juega: true, nombre: "Jonny Franco", responsable: "Jenny Franco" },
//   { numero: "323", juega: true, nombre: "Benja Carigaris", responsable: "Jenny Franco" },
//   { numero: "324", juega: true, nombre: "Alejandro Diaz", responsable: "Jenny Franco" },
//   { numero: "327", juega: true, nombre: "Arella Franco", responsable: "Jenny Franco" },
//   { numero: "329", juega: true, nombre: "Adriana Diaz", responsable: "Jenny Franco" },
//   { numero: "331", juega: true, nombre: "Mica Acevedo", responsable: "Jenny Franco" },
//   { numero: "333", juega: true, nombre: "Genexis Zambrano", responsable: "Jenny Franco" },
//   { numero: "334", juega: true, nombre: "Gustavo Salva", responsable: "Jenny Franco" },
//   { numero: "337", juega: true, nombre: "Benja Carigaris", responsable: "Jenny Franco" },
//   { numero: "343", juega: true, nombre: "Sofia Luna", responsable: "Jenny Franco" },
//   { numero: "344", juega: true, nombre: "Mica Acevedo", responsable: "Jenny Franco" },
//   { numero: "345", juega: true, nombre: "Jonny Franco", responsable: "Jenny Franco" },
//   { numero: "346", juega: true, nombre: "Jenny Franco", responsable: "Jenny Franco" },
//   { numero: "352", juega: true, nombre: "Marcelo Bertone", responsable: "Jenny Franco" },
//   { numero: "353", juega: true, nombre: "Angeles Moscaro", responsable: "Jenny Franco" },
//   { numero: "354", juega: true, nombre: "Daniel Martinez", responsable: "Jenny Franco" },
//   { numero: "355", juega: true, nombre: "Gustavo Salva", responsable: "Jenny Franco" },
//   { numero: "356", juega: true, nombre: "Arella Franco", responsable: "Jenny Franco" },
//   { numero: "357", juega: true, nombre: "Emiliano Franco", responsable: "Jenny Franco" },
//   { numero: "358", juega: true, nombre: "Lisbhet Romero", responsable: "Jenny Franco" },
//   { numero: "361", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
//   { numero: "365", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "368", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "370", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "371", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
//   { numero: "372", juega: true, nombre: "Franberly Cerrando", responsable: "Johana" },
//   { numero: "376", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "378", juega: true, nombre: "Maira Maramara", responsable: "Johana" },
//   { numero: "379", juega: true, nombre: "Emily Pérez", responsable: "Johana" },
//   { numero: "380", juega: true, nombre: "Lisbe Pérez", responsable: "Johana" },
//   { numero: "382", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "384", juega: true, nombre: "Yhonatan Espitia", responsable: "Johana" },
//   { numero: "385", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "388", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "390", juega: true, nombre: "Eddy Johana Pérez", responsable: "Johana" },
//   { numero: "391", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "393", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "395", juega: true, nombre: "Antony Espitia", responsable: "Johana" },
//   { numero: "400", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
//   { numero: "444", juega: true, nombre: "Verónica Bustos", responsable: "Mariana y Krisbel" },
//   { numero: "445", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "447", juega: true, nombre: "Mariana Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "448", juega: true, nombre: "Mariano Calza", responsable: "Mariana y Krisbel" },
//   { numero: "449", juega: true, nombre: "Gabriel Santillán", responsable: "Mariana y Krisbel" },
//   { numero: "452", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "455", juega: true, nombre: "Lautaro Romero", responsable: "Mariana y Krisbel" },
//   { numero: "456", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "457", juega: true, nombre: "Carmen Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "458", juega: true, nombre: "Reynoso Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "460", juega: true, nombre: "Mayra Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "462", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "468", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
//   { numero: "469", juega: true, nombre: "Ivana Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "471", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
//   { numero: "472", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
//   { numero: "473", juega: true, nombre: "Fonseca Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "474", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
//   { numero: "475", juega: true, nombre: "Inés Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "477", juega: true, nombre: "Yoni Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "478", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
//   { numero: "480", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
//   { numero: "481", juega: true, nombre: "Carlos Oviedo", responsable: "Marie" },
//   { numero: "482", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
//   { numero: "483", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
//   { numero: "484", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
//   { numero: "489", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
//   { numero: "491", juega: true, nombre: "Nohe Carmona", responsable: "Marie" },
//   { numero: "493", juega: true, nombre: "Elisa Villanueva", responsable: "Marie" },
//   { numero: "496", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
//   { numero: "500", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "501", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "502", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
//   { numero: "510", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
//   { numero: "511", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
//   { numero: "513", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "514", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "515", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
//   { numero: "519", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
//   { numero: "520", juega: true, nombre: "Laura Carrizo", responsable: "Marie" },
//   { numero: "521", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
//   { numero: "522", juega: true, nombre: "Joselito Rodríguez", responsable: "Melissa" },
//   { numero: "523", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "524", juega: true, nombre: "Pilar Coronado", responsable: "Melissa" },
//   { numero: "525", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
//   { numero: "526", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
//   { numero: "527", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
//   { numero: "528", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
//   { numero: "531", juega: true, nombre: "Tany Minaya", responsable: "Melissa" },
//   { numero: "532", juega: true, nombre: "Kendry Moreno", responsable: "Melissa" },
//   { numero: "533", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
//   { numero: "534", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "535", juega: true, nombre: "Cristian parinango", responsable: "Melissa" },
//   { numero: "536", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "537", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "538", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
//   { numero: "539", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
//   { numero: "540", juega: true, nombre: "Nelly Rosales", responsable: "Melissa" },
//   { numero: "542", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "544", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
//   { numero: "545", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "547", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
//   { numero: "548", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "549", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
//   { numero: "550", juega: true, nombre: "Julisa Risco", responsable: "Melissa" },
//   { numero: "551", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "552", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "553", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "554", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "555", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
//   { numero: "556", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
//   { numero: "557", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
//   { numero: "558", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
//   { numero: "559", juega: true, nombre: "Stuard Cerna", responsable: "Melissa" },
//   { numero: "560", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
//   { numero: "567", juega: true, nombre: "David liscano", responsable: "Lhismar" },
//   { numero: "588", juega: true, nombre: "Belen Dahy", responsable: "Lhismar" },
//   { numero: "601", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "602", juega: true, nombre: "Solana Torres", responsable: "Valentina" },
//   { numero: "603", juega: true, nombre: "Juan Velasquez", responsable: "Valentina" },
//   { numero: "604", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "605", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "606", juega: true, nombre: "Jesús Bellorin", responsable: "Valentina" },
//   { numero: "607", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
//   { numero: "608", juega: true, nombre: "Rosiris Lozada", responsable: "Valentina" },
//   { numero: "609", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
//   { numero: "610", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
//   { numero: "611", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
//   { numero: "612", juega: true, nombre: "José Zorrilla", responsable: "Valentina" },
//   { numero: "613", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
//   { numero: "614", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
//   { numero: "615", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
//   { numero: "616", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
//   { numero: "617", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
//   { numero: "618", juega: true, nombre: "Soledad Reverol", responsable: "Valentina" },
//   { numero: "619", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
//   { numero: "620", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
//   { numero: "621", juega: true, nombre: "David Liscano", responsable: "Valentina" },
//   { numero: "622", juega: true, nombre: "Milagros Moreira", responsable: "Valentina" },
//   { numero: "623", juega: true, nombre: "Allison Pajuelo", responsable: "Valentina" },
//   { numero: "624", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
//   { numero: "625", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "626", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "627", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
//   { numero: "628", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
//   { numero: "629", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "630", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
//   { numero: "631", juega: true, nombre: "Lautaro Nahir", responsable: "Valentina" },
//   { numero: "633", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "634", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "635", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "636", juega: true, nombre: "Daniela Reverol", responsable: "Valentina" },
//   { numero: "637", juega: true, nombre: "Maycol Salas", responsable: "Valentina" },
//   { numero: "638", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
//   { numero: "639", juega: true, nombre: "Brenda Godoy", responsable: "Valentina" },
//   { numero: "640", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
//   { numero: "641", juega: true, nombre: "Davis mejias", responsable: "Megri" },
//   { numero: "642", juega: true, nombre: "Gailor mejias", responsable: "Megri" },
//   { numero: "644", juega: true, nombre: "anthony mejias", responsable: "Megri" },
//   { numero: "645", juega: true, nombre: "Sabrina mejias", responsable: "Megri" },
//   { numero: "646", juega: true, nombre: "laura mejias", responsable: "Megri" },
//   { numero: "647", juega: true, nombre: "nico mejias", responsable: "Megri" },
//   { numero: "649", juega: true, nombre: "victor mejias", responsable: "Megri" },
//   { numero: "650", juega: true, nombre: "Megri mejias", responsable: "Megri" },
//   { numero: "651", juega: true, nombre: "victor mejias", responsable: "Megri" },
//   { numero: "652", juega: true, nombre: "lucila mejias", responsable: "Megri" },
//   { numero: "653", juega: true, nombre: "anthony mejias", responsable: "Megri" },
//   { numero: "654", juega: true, nombre: "Jhonatan mejias", responsable: "Megri" },
//   { numero: "655", juega: true, nombre: "Davis mejias", responsable: "Megri" },
//   { numero: "656", juega: true, nombre: "gaby mejias", responsable: "Megri" },
//   { numero: "658", juega: true, nombre: "anthony mejias", responsable: "Megri" },
//   { numero: "659", juega: true, nombre: "Mirlay mejias", responsable: "Megri" },
//   { numero: "660", juega: true, nombre: "Heidy mejias", responsable: "Megri" },
//   { numero: "661", juega: true, nombre: "fabricio mejias", responsable: "Megri" },
//   { numero: "662", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
//   { numero: "663", juega: true, nombre: "frnkilm mejias", responsable: "Megri" },
//   { numero: "664", juega: true, nombre: "manuel mejias", responsable: "Megri" },
//   { numero: "665", juega: true, nombre: "Gailor mejias", responsable: "Megri" },
//   { numero: "666", juega: true, nombre: "Lisbeth mejias", responsable: "Megri" },
//   { numero: "667", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
//   { numero: "668", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
//   { numero: "669", juega: true, nombre: "Megri mejias", responsable: "Megri" },
//   { numero: "670", juega: true, nombre: "Megri mejias", responsable: "Megri" },
//   { numero: "671", juega: true, nombre: "Heidy mejias", responsable: "Megri" },
//   { numero: "672", juega: true, nombre: "amilcar mejias", responsable: "Megri" },
//   { numero: "673", juega: true, nombre: "gaby mejias", responsable: "Megri" },
//   { numero: "674", juega: true, nombre: "victor mejias", responsable: "Megri" },
//   { numero: "675", juega: true, nombre: "frnkilm mejias", responsable: "Megri" },
//   { numero: "676", juega: true, nombre: "Davis mejias", responsable: "Megri" },
//   { numero: "677", juega: true, nombre: "yrmay mejias", responsable: "Megri" },
//   { numero: "678", juega: true, nombre: "tonga mejias", responsable: "Megri" },
//   { numero: "679", juega: true, nombre: "Andry mejias", responsable: "Megri" },
//   { numero: "680", juega: true, nombre: "Davis mejias", responsable: "Megri" },
//   { numero: "721", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
//   { numero: "722", juega: true, nombre: "franco sica", responsable: "Kenimar" },
//   { numero: "723", juega: true, nombre: "lucia sala", responsable: "Kenimar" },
//   { numero: "725", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
//   { numero: "727", juega: true, nombre: "jael grantcheff", responsable: "Kenimar" },
//   { numero: "731", juega: true, nombre: "Camila Diaz", responsable: "Kenimar" },
//   { numero: "737", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
//   { numero: "744", juega: true, nombre: "franco sica", responsable: "Kenimar" },
//   { numero: "747", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
//   { numero: "751", juega: true, nombre: "Jeremías toloza", responsable: "Kenimar" },
//   { numero: "753", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
//   { numero: "757", juega: true, nombre: "Alma gaitan", responsable: "Kenimar" },
//   { numero: "758", juega: true, nombre: "felipe torres", responsable: "Kenimar" },
//   { numero: "760", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
//   { numero: "761", juega: true, nombre: "Lucrecia Baez", responsable: "Vaoska" },
//   { numero: "762", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
//   { numero: "763", juega: true, nombre: "Enrique Fernández", responsable: "Vaoska" },
//   { numero: "764", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
//   { numero: "765", juega: true, nombre: "Fabiana Cavalie", responsable: "Vaoska" },
//   { numero: "766", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
//   { numero: "767", juega: true, nombre: "Camila S", responsable: "Vaoska" },
//   { numero: "768", juega: true, nombre: "Jesus Grimaldi", responsable: "Vaoska" },
//   { numero: "769", juega: true, nombre: "Luciano Ligorria", responsable: "Vaoska" },
//   { numero: "770", juega: true, nombre: "Melania Ojeda", responsable: "Vaoska" },
//   { numero: "771", juega: true, nombre: "Cristian Barrera", responsable: "Vaoska" },
//   { numero: "772", juega: true, nombre: "Rebeca Bontuhis", responsable: "Vaoska" },
//   { numero: "773", juega: true, nombre: "Patricia Del Castillo", responsable: "Vaoska" },
//   { numero: "774", juega: true, nombre: "Paulo Díaz", responsable: "Vaoska" },
//   { numero: "775", juega: true, nombre: "Lucrecia Baez", responsable: "Vaoska" },
//   { numero: "776", juega: true, nombre: "Josue Gordillo", responsable: "Vaoska" },
//   { numero: "777", juega: true, nombre: "Hernan Benetti", responsable: "Vaoska" },
//   { numero: "778", juega: true, nombre: "Guido Nanini", responsable: "Vaoska" },
//   { numero: "779", juega: true, nombre: "Romina Perez", responsable: "Vaoska" },
//   { numero: "780", juega: true, nombre: "Gabriel Rutilli", responsable: "Vaoska" },
//   { numero: "781", juega: true, nombre: "Mario García", responsable: "Vaoska" },
//   { numero: "782", juega: true, nombre: "Pablo Rodríguez", responsable: "Vaoska" },
//   { numero: "783", juega: true, nombre: "Fernando Acuña", responsable: "Vaoska" },
//   { numero: "784", juega: true, nombre: "Patricia Del Castillo", responsable: "Vaoska" },
//   { numero: "785", juega: true, nombre: "Guadalupe Peralta", responsable: "Vaoska" },
//   { numero: "786", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
//   { numero: "787", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
//   { numero: "788", juega: true, nombre: "Hernan Pomazan", responsable: "Vaoska" },
//   { numero: "789", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
//   { numero: "790", juega: true, nombre: "Luciano Ligorria", responsable: "Vaoska" },
//   { numero: "791", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
//   { numero: "792", juega: true, nombre: "Luciano Iturria", responsable: "Vaoska" },
//   { numero: "793", juega: true, nombre: "Rebeca Bontuhis", responsable: "Vaoska" },
//   { numero: "794", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
//   { numero: "795", juega: true, nombre: "Mario García", responsable: "Vaoska" },
//   { numero: "796", juega: true, nombre: "Jeronimo Cabrera", responsable: "Vaoska" },
//   { numero: "797", juega: true, nombre: "Cristian Barrera", responsable: "Vaoska" },
//   { numero: "798", juega: true, nombre: "Jesus Grimaldi", responsable: "Vaoska" },
//   { numero: "799", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
//   { numero: "800", juega: true, nombre: "Mario García", responsable: "Vaoska" },
//   { numero: "801", juega: true, nombre: "Saúl Pitre", responsable: "Dayner" },
//   { numero: "802", juega: true, nombre: "Saúl Pitre", responsable: "Dayner" },
//   { numero: "803", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
//   { numero: "807", juega: true, nombre: "Nohemí Pitre", responsable: "Dayner" },
//   { numero: "809", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
//   { numero: "810", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
//   { numero: "812", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
//   { numero: "813", juega: true, nombre: "rios juan", responsable: "Dayner" },
//   { numero: "814", juega: true, nombre: "luciana Pitre", responsable: "Dayner" },
//   { numero: "815", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
//   { numero: "819", juega: true, nombre: "julio Pitre", responsable: "Dayner" },
//   { numero: "820", juega: true, nombre: "juan Pitre", responsable: "Dayner" },
//   { numero: "824", juega: true, nombre: "lore Pitre", responsable: "Dayner" },
//   { numero: "825", juega: true, nombre: "rios juan", responsable: "Dayner" },
//   { numero: "831", juega: true, nombre: "luciana Pitre", responsable: "Dayner" },
//   { numero: "832", juega: true, nombre: "Nohemí Pitre", responsable: "Dayner" },
//   { numero: "834", juega: true, nombre: "Vera daniel", responsable: "Dayner" },
//   { numero: "835", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
//   { numero: "836", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
//   { numero: "837", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
//   { numero: "840", juega: true, nombre: "gustavo Pitre", responsable: "Dayner" },
//   { numero: "845", juega: true, nombre: "SALVADOR TOVAR", responsable: "Génesis" },
//   { numero: "846", juega: true, nombre: "RICARDO MIGUEL", responsable: "Génesis" },
//   { numero: "852", juega: true, nombre: "JESUS COELLO", responsable: "Génesis" },
//   { numero: "860", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
//   { numero: "862", juega: true, nombre: "SALVADOR TOVAR", responsable: "Génesis" },
//   { numero: "864", juega: true, nombre: "GIO GRAFE", responsable: "Génesis" },
//   { numero: "867", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
//   { numero: "868", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
//   { numero: "870", juega: true, nombre: "BELEN MAMA DANI", responsable: "Génesis" },
//   { numero: "872", juega: true, nombre: "GIO GRAFE", responsable: "Génesis" },
//   { numero: "874", juega: true, nombre: "FELIX VALDIVIESZO", responsable: "Génesis" },
//   { numero: "877", juega: true, nombre: "BELEN MAMA DANI", responsable: "Génesis" },
//   { numero: "878", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
//   { numero: "879", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
//   { numero: "880", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
// ];
export const BOLETOS_INICIALES = [
  { numero: "001", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
  { numero: "002", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
  { numero: "003", juega: true, nombre: "Kendri", responsable: "Mychell" },
  { numero: "004", juega: true, nombre: "Richard Reverol", responsable: "Mychell" },
  { numero: "005", juega: true, nombre: "Juli Marques", responsable: "Mychell" },
  { numero: "006", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
  { numero: "008", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
  { numero: "011", juega: true, nombre: "Janeth Valbuena", responsable: "Mychell" },
  { numero: "012", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
  { numero: "013", juega: true, nombre: "Juan Duque", responsable: "Mychell" },
  { numero: "016", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
  { numero: "017", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
  { numero: "018", juega: true, nombre: "Kendri", responsable: "Mychell" },
  { numero: "020", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
  { numero: "021", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
  { numero: "022", juega: true, nombre: "Juan Duque", responsable: "Mychell" },
  { numero: "024", juega: true, nombre: "María José Nieto", responsable: "Mychell" },
  { numero: "025", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
  { numero: "026", juega: true, nombre: "Alex Villca", responsable: "Mychell" },
  { numero: "028", juega: true, nombre: "Cecilia Castro", responsable: "Mychell" },
  { numero: "030", juega: true, nombre: "Mychell Duque", responsable: "Mychell" },
  { numero: "031", juega: true, nombre: "María Terán", responsable: "Mychell" },
  { numero: "033", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
  { numero: "034", juega: true, nombre: "Nereida Espinoza", responsable: "Mychell" },
  { numero: "035", juega: true, nombre: "Enzo Feldman", responsable: "Mychell" },
  { numero: "036", juega: true, nombre: "Kendri", responsable: "Mychell" },
  { numero: "037", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
  { numero: "038", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
  { numero: "039", juega: true, nombre: "Gerardo Reverol", responsable: "Mychell" },
  { numero: "040", juega: true, nombre: "Mariana Ramírez", responsable: "Mychell" },
  { numero: "041", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
  { numero: "042", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
  { numero: "043", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
  { numero: "044", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
  { numero: "045", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
  { numero: "048", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
  { numero: "049", juega: true, nombre: "Nelson Narvaez Araujo", responsable: "Nelsy" },
  { numero: "050", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
  { numero: "051", juega: true, nombre: "Adriana Narvaez", responsable: "Nelsy" },
  { numero: "052", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
  { numero: "053", juega: true, nombre: "Diego Cermeño", responsable: "Nelsy" },
  { numero: "054", juega: true, nombre: "Yamilet Narvaez", responsable: "Nelsy" },
  { numero: "055", juega: true, nombre: "Nelson José Narvaez", responsable: "Nelsy" },
  { numero: "056", juega: true, nombre: "Orany Cermeño", responsable: "Nelsy" },
  { numero: "057", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
  { numero: "058", juega: true, nombre: "Cristian Montenegro", responsable: "Nelsy" },
  { numero: "059", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
  { numero: "060", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
  { numero: "062", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
  { numero: "063", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
  { numero: "064", juega: true, nombre: "Melani Narvaez", responsable: "Nelsy" },
  { numero: "065", juega: true, nombre: "Onil Cermeño", responsable: "Nelsy" },
  { numero: "066", juega: true, nombre: "Neri Araujo", responsable: "Nelsy" },
  { numero: "067", juega: true, nombre: "Patricia Narvaez", responsable: "Nelsy" },
  { numero: "068", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
  { numero: "069", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
  { numero: "071", juega: true, nombre: "Cristian Narvaez", responsable: "Nelsy" },
  { numero: "072", juega: true, nombre: "Liz Narvaez", responsable: "Nelsy" },
  { numero: "073", juega: true, nombre: "George Narvaez", responsable: "Nelsy" },
  { numero: "074", juega: true, nombre: "Nelsy Narvaez", responsable: "Nelsy" },
  { numero: "075", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
  { numero: "076", juega: true, nombre: "Jacquelin de Araujo", responsable: "Nelsy" },
  { numero: "077", juega: true, nombre: "Deysi Narvaez", responsable: "Nelsy" },
  { numero: "078", juega: true, nombre: "Gricelda Narvaez", responsable: "Nelsy" },
  { numero: "079", juega: true, nombre: "Ismael Araujo", responsable: "Nelsy" },
  { numero: "080", juega: true, nombre: "Karly Narvaez", responsable: "Nelsy" },
  { numero: "087", juega: true, nombre: "Marta Cordova", responsable: "Kimberly" },
  { numero: "089", juega: true, nombre: "Belen Cordova", responsable: "Kimberly" },
  { numero: "094", juega: true, nombre: "Kimberly Cordova", responsable: "Kimberly" },
  { numero: "095", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
  { numero: "097", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
  { numero: "100", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
  { numero: "101", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
  { numero: "104", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
  { numero: "107", juega: true, nombre: "Williams Cordova", responsable: "Kimberly" },
  { numero: "109", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
  { numero: "110", juega: true, nombre: "Kailly Cordova", responsable: "Kimberly" },
  { numero: "111", juega: true, nombre: "Édison Cordova", responsable: "Kimberly" },
  { numero: "112", juega: true, nombre: "Ismael Cordova", responsable: "Kimberly" },
  { numero: "114", juega: true, nombre: "Edgardo Cordova", responsable: "Kimberly" },
  { numero: "116", juega: true, nombre: "Naye Cordova", responsable: "Kimberly" },
  { numero: "118", juega: true, nombre: "Iris Cordova", responsable: "Kimberly" },
  { numero: "120", juega: true, nombre: "Carolina Cordova", responsable: "Kimberly" },
  { numero: "121", juega: true, nombre: "Beatriz Salcedo", responsable: "Beatriz" },
  { numero: "122", juega: true, nombre: "Margarita Salcedo", responsable: "Beatriz" },
  { numero: "123", juega: true, nombre: "Eliezer Salcedo", responsable: "Beatriz" },
  { numero: "124", juega: true, nombre: "Lisbeth Salcedo", responsable: "Beatriz" },
  { numero: "126", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
  { numero: "130", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
  { numero: "132", juega: true, nombre: "Brenda Salcedo", responsable: "Beatriz" },
  { numero: "133", juega: true, nombre: "Jaki Salcedo", responsable: "Beatriz" },
  { numero: "136", juega: true, nombre: "Orany Salcedo", responsable: "Beatriz" },
  { numero: "140", juega: true, nombre: "Zoé Salcedo", responsable: "Beatriz" },
  { numero: "145", juega: true, nombre: "Oscar Salcedo", responsable: "Beatriz" },
  { numero: "161", juega: true, nombre: "Emanuel Gregorat", responsable: "Daro" },
  { numero: "162", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
  { numero: "163", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
  { numero: "164", juega: true, nombre: "Orlando", responsable: "Daro" },
  { numero: "165", juega: true, nombre: "Alan Clemente", responsable: "Daro" },
  { numero: "166", juega: true, nombre: "Damián Molina", responsable: "Daro" },
  { numero: "167", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
  { numero: "168", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
  { numero: "169", juega: true, nombre: "Sandra Clienta", responsable: "Daro" },
  { numero: "170", juega: true, nombre: "Federico Torres", responsable: "Daro" },
  { numero: "171", juega: true, nombre: "Ros Goya", responsable: "Daro" },
  { numero: "172", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
  { numero: "173", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
  { numero: "174", juega: true, nombre: "Ricardo Zelarayan", responsable: "Daro" },
  { numero: "175", juega: true, nombre: "Alba Gutiérrez", responsable: "Daro" },
  { numero: "176", juega: true, nombre: "Damián Molina", responsable: "Daro" },
  { numero: "177", juega: true, nombre: "Federico Torres", responsable: "Daro" },
  { numero: "178", juega: true, nombre: "Ros Goya", responsable: "Daro" },
  { numero: "179", juega: true, nombre: "Eliana Barrera", responsable: "Daro" },
  { numero: "180", juega: true, nombre: "Darobelis Goya", responsable: "Daro" },
  { numero: "181", juega: true, nombre: "Sandra Heinz", responsable: "Daro" },
  { numero: "182", juega: true, nombre: "Elena Goya", responsable: "Daro" },
  { numero: "183", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
  { numero: "184", juega: true, nombre: "Favio Rozek", responsable: "Daro" },
  { numero: "185", juega: true, nombre: "Alejandro Moll", responsable: "Daro" },
  { numero: "186", juega: true, nombre: "Cristian Magagna", responsable: "Daro" },
  { numero: "187", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
  { numero: "188", juega: true, nombre: "Emanuel Garay", responsable: "Daro" },
  { numero: "189", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
  { numero: "190", juega: true, nombre: "Victoria Aguirre", responsable: "Daro" },
  { numero: "191", juega: true, nombre: "Leandro García", responsable: "Daro" },
  { numero: "192", juega: true, nombre: "Laura Ramos", responsable: "Daro" },
  { numero: "193", juega: true, nombre: "Karyna Sosa", responsable: "Daro" },
  { numero: "194", juega: true, nombre: "Orlando", responsable: "Daro" },
  { numero: "195", juega: true, nombre: "Juan Ochoa", responsable: "Daro" },
  { numero: "196", juega: true, nombre: "Esteban Ocaño", responsable: "Daro" },
  { numero: "197", juega: true, nombre: "Karen Rosales", responsable: "Daro" },
  { numero: "198", juega: true, nombre: "Alberto Goya", responsable: "Daro" },
  { numero: "199", juega: true, nombre: "Ismael", responsable: "Daro" },
  { numero: "200", juega: true, nombre: "Ismael", responsable: "Daro" },
  { numero: "205", juega: true, nombre: "Micaela Pitre", responsable: "Diana" },
  { numero: "208", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "212", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "219", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "222", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "223", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "225", juega: true, nombre: "Tomas Escaramuza", responsable: "Diana" },
  { numero: "236", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "240", juega: true, nombre: "Solangel Mora", responsable: "Diana" },
  { numero: "241", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
  { numero: "242", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
  { numero: "243", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
  { numero: "244", juega: true, nombre: "Alejandra Cabrera", responsable: "Diocelis" },
  { numero: "245", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
  { numero: "246", juega: true, nombre: "Luis Figuera", responsable: "Diocelis" },
  { numero: "247", juega: true, nombre: "Francisco Figuera", responsable: "Diocelis" },
  { numero: "253", juega: true, nombre: "Hugo Willer", responsable: "Diocelis" },
  { numero: "254", juega: true, nombre: "Ana Karina Rondón", responsable: "Diocelis" },
  { numero: "259", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
  { numero: "261", juega: true, nombre: "Belén Esquivel", responsable: "Diocelis" },
  { numero: "268", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
  { numero: "270", juega: true, nombre: "David Alazraki", responsable: "Diocelis" },
  { numero: "271", juega: true, nombre: "Valeria Veloz", responsable: "Diocelis" },
  { numero: "274", juega: true, nombre: "Aneida Ortiz", responsable: "Diocelis" },
  { numero: "275", juega: true, nombre: "Santiago Slythe", responsable: "Diocelis" },
  { numero: "277", juega: true, nombre: "Morela Gómez", responsable: "Diocelis" },
  { numero: "278", juega: true, nombre: "Heidi Medero", responsable: "Diocelis" },
  { numero: "281", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "282", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "283", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "284", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "285", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "286", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "287", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
  { numero: "288", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "289", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "290", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
  { numero: "291", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "292", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "293", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "294", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "295", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "296", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "297", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "298", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "299", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "300", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "301", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "302", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "303", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "304", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "305", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "306", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
  { numero: "307", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
  { numero: "308", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "309", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "310", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "311", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "312", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "313", juega: true, nombre: "Henry Parra", responsable: "Eliana" },
  { numero: "314", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "315", juega: true, nombre: "Benjamín Toro", responsable: "Eliana" },
  { numero: "316", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "317", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "318", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "319", juega: true, nombre: "Eliana Uzcátegui", responsable: "Eliana" },
  { numero: "320", juega: true, nombre: "Elida Barrio", responsable: "Eliana" },
  { numero: "321", juega: true, nombre: "Adriana Diaz", responsable: "Jenny Franco" },
  { numero: "322", juega: true, nombre: "Jonny Franco", responsable: "Jenny Franco" },
  { numero: "323", juega: true, nombre: "Benja Carigaris", responsable: "Jenny Franco" },
  { numero: "324", juega: true, nombre: "Alejandro Diaz", responsable: "Jenny Franco" },
  { numero: "327", juega: true, nombre: "Arella Franco", responsable: "Jenny Franco" },
  { numero: "329", juega: true, nombre: "Adriana Diaz", responsable: "Jenny Franco" },
  { numero: "331", juega: true, nombre: "Mica Acevedo", responsable: "Jenny Franco" },
  { numero: "333", juega: true, nombre: "Genexis Zambrano", responsable: "Jenny Franco" },
  { numero: "334", juega: true, nombre: "Gustavo Salva", responsable: "Jenny Franco" },
  { numero: "337", juega: true, nombre: "Benja Carigaris", responsable: "Jenny Franco" },
  { numero: "343", juega: true, nombre: "Sofia Luna", responsable: "Jenny Franco" },
  { numero: "344", juega: true, nombre: "Mica Acevedo", responsable: "Jenny Franco" },
  { numero: "345", juega: true, nombre: "Jonny Franco", responsable: "Jenny Franco" },
  { numero: "346", juega: true, nombre: "Jenny Franco", responsable: "Jenny Franco" },
  { numero: "352", juega: true, nombre: "Marcelo Bertone", responsable: "Jenny Franco" },
  { numero: "353", juega: true, nombre: "Angeles Moscaro", responsable: "Jenny Franco" },
  { numero: "354", juega: true, nombre: "Daniel Martinez", responsable: "Jenny Franco" },
  { numero: "355", juega: true, nombre: "Gustavo Salva", responsable: "Jenny Franco" },
  { numero: "356", juega: true, nombre: "Arella Franco", responsable: "Jenny Franco" },
  { numero: "357", juega: true, nombre: "Emiliano Franco", responsable: "Jenny Franco" },
  { numero: "358", juega: true, nombre: "Lisbhet Romero", responsable: "Jenny Franco" },
  { numero: "361", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
  { numero: "365", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "368", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "370", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "371", juega: true, nombre: "Oscar Machado", responsable: "Johana" },
  { numero: "372", juega: true, nombre: "Franberly Cerrando", responsable: "Johana" },
  { numero: "376", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "378", juega: true, nombre: "Maira Maramara", responsable: "Johana" },
  { numero: "379", juega: true, nombre: "Emily Pérez", responsable: "Johana" },
  { numero: "380", juega: true, nombre: "Lisbe Pérez", responsable: "Johana" },
  { numero: "382", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "384", juega: true, nombre: "Yhonatan Espitia", responsable: "Johana" },
  { numero: "385", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "387", juega: true, nombre: "Orany Cermeño", responsable: "Johana" },
  { numero: "388", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "390", juega: true, nombre: "Eddy Johana Pérez", responsable: "Johana" },
  { numero: "391", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "393", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "395", juega: true, nombre: "Antony Espitia", responsable: "Johana" },
  { numero: "400", juega: true, nombre: "Omar Cermeño", responsable: "Johana" },
  { numero: "401", juega: true, nombre: "Mauricio Maurera", responsable: "Vanessa" },
  { numero: "404", juega: true, nombre: "Eyde Silva", responsable: "Vanessa" },
  { numero: "407", juega: true, nombre: "Liseli Araujo", responsable: "Vanessa" },
  { numero: "410", juega: true, nombre: "Carolina Maurera", responsable: "Vanessa" },
  { numero: "412", juega: true, nombre: "Lucas Maurera", responsable: "Vanessa" },
  { numero: "417", juega: true, nombre: "Lucas Maurera", responsable: "Vanessa" },
  { numero: "418", juega: true, nombre: "Yilson Segovia", responsable: "Vanessa" },
  { numero: "420", juega: true, nombre: "Carolina Maurera", responsable: "Vanessa" },
  { numero: "421", juega: true, nombre: "Jacob Maurera", responsable: "Vanessa" },
  { numero: "422", juega: true, nombre: "Margarita Araujo", responsable: "Vanessa" },
  { numero: "423", juega: true, nombre: "Eyde Silva", responsable: "Vanessa" },
  { numero: "426", juega: true, nombre: "Jacob Maurera", responsable: "Vanessa" },
  { numero: "427", juega: true, nombre: "Onil Cermeño", responsable: "Vanessa" },
  { numero: "429", juega: true, nombre: "Annellys Medina", responsable: "Vanessa" },
  { numero: "432", juega: true, nombre: "Framberlyn Maurera", responsable: "Vanessa" },
  { numero: "433", juega: true, nombre: "Omar Cermeño", responsable: "Vanessa" },
  { numero: "436", juega: true, nombre: "Claudia Flores", responsable: "Vanessa" },
  { numero: "438", juega: true, nombre: "Yonathan Espitia", responsable: "Vanessa" },
  { numero: "440", juega: true, nombre: "Omar Cermeño", responsable: "Vanessa" },
  { numero: "444", juega: true, nombre: "Verónica Bustos", responsable: "Mariana y Krisbel" },
  { numero: "445", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "447", juega: true, nombre: "Mariana Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "448", juega: true, nombre: "Mariano Calza", responsable: "Mariana y Krisbel" },
  { numero: "449", juega: true, nombre: "Gabriel Santillán", responsable: "Mariana y Krisbel" },
  { numero: "452", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
  { numero: "455", juega: true, nombre: "Lautaro Romero", responsable: "Mariana y Krisbel" },
  { numero: "456", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "457", juega: true, nombre: "Carmen Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "458", juega: true, nombre: "Reynoso Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "460", juega: true, nombre: "Mayra Bolaño", responsable: "Mariana y Krisbel" },
  { numero: "462", juega: true, nombre: "Juan Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "468", juega: true, nombre: "Ana Bolaño", responsable: "Mariana y Krisbel" },
  { numero: "469", juega: true, nombre: "Ivana Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "471", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
  { numero: "472", juega: true, nombre: "Natalia Pajon", responsable: "Mariana y Krisbel" },
  { numero: "473", juega: true, nombre: "Fonseca Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "474", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
  { numero: "475", juega: true, nombre: "Inés Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "477", juega: true, nombre: "Yoni Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "478", juega: true, nombre: "Luis Peñaloza", responsable: "Mariana y Krisbel" },
  { numero: "480", juega: true, nombre: "Cesar Brandan Díaz", responsable: "Mariana y Krisbel" },
  { numero: "481", juega: true, nombre: "Carlos Oviedo", responsable: "Marie" },
  { numero: "482", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
  { numero: "483", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
  { numero: "484", juega: true, nombre: "David Gutiérrez", responsable: "Marie" },
  { numero: "489", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
  { numero: "491", juega: true, nombre: "Nohe Carmona", responsable: "Marie" },
  { numero: "493", juega: true, nombre: "Elisa Villanueva", responsable: "Marie" },
  { numero: "496", juega: true, nombre: "Marielbys Villanueva", responsable: "Marie" },
  { numero: "500", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
  { numero: "501", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
  { numero: "502", juega: true, nombre: "Fede Villanueva", responsable: "Marie" },
  { numero: "510", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
  { numero: "511", juega: true, nombre: "Cristian Ibañez", responsable: "Marie" },
  { numero: "513", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
  { numero: "514", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
  { numero: "515", juega: true, nombre: "Pedro Gutiérrez", responsable: "Marie" },
  { numero: "519", juega: true, nombre: "Celeste Esquivel", responsable: "Marie" },
  { numero: "520", juega: true, nombre: "Laura Carrizo", responsable: "Marie" },
  { numero: "521", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
  { numero: "522", juega: true, nombre: "Joselito Rodríguez", responsable: "Melissa" },
  { numero: "523", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "524", juega: true, nombre: "Pilar Coronado", responsable: "Melissa" },
  { numero: "525", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
  { numero: "526", juega: true, nombre: "Catalina Gonzales", responsable: "Melissa" },
  { numero: "527", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
  { numero: "528", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
  { numero: "531", juega: true, nombre: "Tany Minaya", responsable: "Melissa" },
  { numero: "532", juega: true, nombre: "Kendry Moreno", responsable: "Melissa" },
  { numero: "533", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
  { numero: "534", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "535", juega: true, nombre: "Cristian parinango", responsable: "Melissa" },
  { numero: "536", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
  { numero: "537", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "538", juega: true, nombre: "Daniel Rivas", responsable: "Melissa" },
  { numero: "539", juega: true, nombre: "Micaela Ceballos", responsable: "Melissa" },
  { numero: "540", juega: true, nombre: "Nelly Rosales", responsable: "Melissa" },
  { numero: "542", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "544", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
  { numero: "545", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "547", juega: true, nombre: "Nimia Quiroz", responsable: "Melissa" },
  { numero: "548", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "549", juega: true, nombre: "Cristian Parinango", responsable: "Melissa" },
  { numero: "550", juega: true, nombre: "Julisa Risco", responsable: "Melissa" },
  { numero: "551", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
  { numero: "552", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "553", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "554", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "555", juega: true, nombre: "Nagely Juarez", responsable: "Melissa" },
  { numero: "556", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
  { numero: "557", juega: true, nombre: "Yilson Segovia", responsable: "Melissa" },
  { numero: "558", juega: true, nombre: "Sheyla Giron", responsable: "Melissa" },
  { numero: "559", juega: true, nombre: "Stuard Cerna", responsable: "Melissa" },
  { numero: "560", juega: true, nombre: "Elvert Briceño", responsable: "Melissa" },
  { numero: "567", juega: true, nombre: "David liscano", responsable: "Lhismar" },
  { numero: "588", juega: true, nombre: "Belen Dahy", responsable: "Lhismar" },
  { numero: "601", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
  { numero: "602", juega: true, nombre: "Solana Torres", responsable: "Valentina" },
  { numero: "603", juega: true, nombre: "Juan Velasquez", responsable: "Valentina" },
  { numero: "604", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
  { numero: "605", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
  { numero: "606", juega: true, nombre: "Jesús Bellorin", responsable: "Valentina" },
  { numero: "607", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
  { numero: "608", juega: true, nombre: "Rosiris Lozada", responsable: "Valentina" },
  { numero: "609", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
  { numero: "610", juega: true, nombre: "Gloris Reverol", responsable: "Valentina" },
  { numero: "611", juega: true, nombre: "Karla Alcila", responsable: "Valentina" },
  { numero: "612", juega: true, nombre: "José Zorrilla", responsable: "Valentina" },
  { numero: "613", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
  { numero: "614", juega: true, nombre: "Constanza Hernández", responsable: "Valentina" },
  { numero: "615", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
  { numero: "616", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
  { numero: "617", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
  { numero: "618", juega: true, nombre: "Soledad Reverol", responsable: "Valentina" },
  { numero: "619", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
  { numero: "620", juega: true, nombre: "Carlos Martínez", responsable: "Valentina" },
  { numero: "621", juega: true, nombre: "David Liscano", responsable: "Valentina" },
  { numero: "622", juega: true, nombre: "Milagros Moreira", responsable: "Valentina" },
  { numero: "623", juega: true, nombre: "Allison Pajuelo", responsable: "Valentina" },
  { numero: "624", juega: true, nombre: "Milena Reynaldo", responsable: "Valentina" },
  { numero: "625", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "626", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "627", juega: true, nombre: "Angy Larez", responsable: "Valentina" },
  { numero: "628", juega: true, nombre: "Lila Parra", responsable: "Valentina" },
  { numero: "629", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
  { numero: "630", juega: true, nombre: "Patricia Arvelaez", responsable: "Valentina" },
  { numero: "631", juega: true, nombre: "Lautaro Nahir", responsable: "Valentina" },
  { numero: "633", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "634", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "635", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "636", juega: true, nombre: "Daniela Reverol", responsable: "Valentina" },
  { numero: "637", juega: true, nombre: "Maycol Salas", responsable: "Valentina" },
  { numero: "638", juega: true, nombre: "Richard Reverol", responsable: "Valentina" },
  { numero: "639", juega: true, nombre: "Brenda Godoy", responsable: "Valentina" },
  { numero: "640", juega: true, nombre: "Edgar Reverol", responsable: "Valentina" },
  { numero: "641", juega: true, nombre: "Davis mejias", responsable: "Megri" },
 // { numero: "642", juega: true, nombre: "Gailor mejias", responsable: "Megri" },
  { numero: "644", juega: true, nombre: "anthony mejias", responsable: "Megri" },
  { numero: "645", juega: true, nombre: "Sabrina mejias", responsable: "Megri" },
 // { numero: "646", juega: true, nombre: "laura mejias", responsable: "Megri" },
  { numero: "647", juega: true, nombre: "nico mejias", responsable: "Megri" },
  { numero: "649", juega: true, nombre: "victor mejias", responsable: "Megri" },
  { numero: "650", juega: true, nombre: "Megri mejias", responsable: "Megri" },
  { numero: "651", juega: true, nombre: "victor mejias", responsable: "Megri" },
  { numero: "652", juega: true, nombre: "lucila mejias", responsable: "Megri" },
  { numero: "653", juega: true, nombre: "anthony mejias", responsable: "Megri" },
  { numero: "654", juega: true, nombre: "Jhonatan mejias", responsable: "Megri" },
  { numero: "655", juega: true, nombre: "Davis mejias", responsable: "Megri" },
  { numero: "656", juega: true, nombre: "gaby mejias", responsable: "Megri" },
  { numero: "658", juega: true, nombre: "anthony mejias", responsable: "Megri" },
  { numero: "659", juega: true, nombre: "Mirlay mejias", responsable: "Megri" },
  { numero: "660", juega: true, nombre: "Heidy mejias", responsable: "Megri" },
  { numero: "661", juega: true, nombre: "fabricio mejias", responsable: "Megri" },
  { numero: "662", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
 // { numero: "663", juega: true, nombre: "frnkilm mejias", responsable: "Megri" },
  { numero: "664", juega: true, nombre: "juan mejias", responsable: "Megri" },
 // { numero: "665", juega: true, nombre: "Gailor mejias", responsable: "Megri" },
  { numero: "666", juega: true, nombre: "Lisbeth mejias", responsable: "Megri" },
 // { numero: "667", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
 // { numero: "668", juega: true, nombre: "Adrian mejias", responsable: "Megri" },
  { numero: "669", juega: true, nombre: "Megri mejias", responsable: "Megri" },
  { numero: "670", juega: true, nombre: "Megri mejias", responsable: "Megri" },
  { numero: "671", juega: true, nombre: "Heidy mejias", responsable: "Megri" },
//  { numero: "672", juega: true, nombre: "amilcar mejias", responsable: "Megri" },
  { numero: "673", juega: true, nombre: "gaby mejias", responsable: "Megri" },
  { numero: "674", juega: true, nombre: "victor mejias", responsable: "Megri" },
 // { numero: "675", juega: true, nombre: "frnkilm mejias", responsable: "Megri" },
  { numero: "676", juega: true, nombre: "Davis mejias", responsable: "Megri" },
  { numero: "677", juega: true, nombre: "yrmay mejias", responsable: "Megri" },
  { numero: "678", juega: true, nombre: "tonga mejias", responsable: "Megri" },
 // { numero: "679", juega: true, nombre: "Andry mejias", responsable: "Megri" },
  { numero: "680", juega: true, nombre: "Davis mejias", responsable: "Megri" },
  { numero: "681", juega: true, nombre: "Rosa loret", responsable: "Carolina" },
  { numero: "682", juega: true, nombre: "carmenleoonett", responsable: "Carolina" },
  { numero: "683", juega: true, nombre: "Alfredo Odreman", responsable: "Carolina" },
  { numero: "684", juega: true, nombre: "marylianys silva", responsable: "Carolina" },
  { numero: "686", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "687", juega: true, nombre: "Alfredo Odreman", responsable: "Carolina" },
  { numero: "688", juega: true, nombre: "romer matute", responsable: "Carolina" },
  { numero: "689", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "690", juega: true, nombre: "romer matute", responsable: "Carolina" },
  { numero: "691", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "693", juega: true, nombre: "Rosa loret", responsable: "Carolina" },
  { numero: "695", juega: true, nombre: "carmenleoonett", responsable: "Carolina" },
  { numero: "696", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "697", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "700", juega: true, nombre: "carmenleoonett", responsable: "Carolina" },
  { numero: "701", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "702", juega: true, nombre: "soledad soledad", responsable: "Carolina" },
  { numero: "705", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "706", juega: true, nombre: "soledad soledad", responsable: "Carolina" },
  { numero: "707", juega: true, nombre: "geiny lorat", responsable: "Carolina" },
  { numero: "710", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "711", juega: true, nombre: "soledad soledad", responsable: "Carolina" },
  { numero: "712", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "713", juega: true, nombre: "Rosa loret", responsable: "Carolina" },
  { numero: "715", juega: true, nombre: "carmenleoonett", responsable: "Carolina" },
  { numero: "716", juega: true, nombre: "gustavo romero", responsable: "Carolina" },
  { numero: "717", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "718", juega: true, nombre: "Rosa loret", responsable: "Carolina" },
  { numero: "719", juega: true, nombre: "marcos sanchez", responsable: "Carolina" },
  { numero: "720", juega: true, nombre: "carmenleoonett", responsable: "Carolina" },
  { numero: "721", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
  { numero: "722", juega: true, nombre: "franco sica", responsable: "Kenimar" },
  { numero: "723", juega: true, nombre: "lucia sala", responsable: "Kenimar" },
  { numero: "725", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
  { numero: "727", juega: true, nombre: "jael grantcheff", responsable: "Kenimar" },
  { numero: "731", juega: true, nombre: "Camila Diaz", responsable: "Kenimar" },
  { numero: "737", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
  { numero: "744", juega: true, nombre: "franco sica", responsable: "Kenimar" },
  { numero: "747", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
  { numero: "751", juega: true, nombre: "Jeremías toloza", responsable: "Kenimar" },
  { numero: "753", juega: true, nombre: "julieta carbelo", responsable: "Kenimar" },
  { numero: "757", juega: true, nombre: "Alma gaitan", responsable: "Kenimar" },
  { numero: "758", juega: true, nombre: "felipe torres", responsable: "Kenimar" },
  { numero: "760", juega: true, nombre: "ramon Pinto", responsable: "Kenimar" },
  { numero: "761", juega: true, nombre: "Lucrecia Baez", responsable: "Vaoska" },
  { numero: "762", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
  { numero: "763", juega: true, nombre: "Enrique Fernández", responsable: "Vaoska" },
  { numero: "764", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
  { numero: "765", juega: true, nombre: "Fabiana Cavalie", responsable: "Vaoska" },
  { numero: "766", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
  { numero: "767", juega: true, nombre: "Camila S", responsable: "Vaoska" },
  { numero: "768", juega: true, nombre: "Jesus Grimaldi", responsable: "Vaoska" },
  { numero: "769", juega: true, nombre: "Luciano Ligorria", responsable: "Vaoska" },
  { numero: "770", juega: true, nombre: "Melania Ojeda", responsable: "Vaoska" },
  { numero: "771", juega: true, nombre: "Cristian Barrera", responsable: "Vaoska" },
  { numero: "772", juega: true, nombre: "Rebeca Bontuhis", responsable: "Vaoska" },
  { numero: "773", juega: true, nombre: "Patricia Del Castillo", responsable: "Vaoska" },
  { numero: "774", juega: true, nombre: "Paulo Díaz", responsable: "Vaoska" },
  { numero: "775", juega: true, nombre: "Lucrecia Baez", responsable: "Vaoska" },
  { numero: "776", juega: true, nombre: "Josue Gordillo", responsable: "Vaoska" },
  { numero: "777", juega: true, nombre: "Hernan Benetti", responsable: "Vaoska" },
  { numero: "778", juega: true, nombre: "Guido Nanini", responsable: "Vaoska" },
  { numero: "779", juega: true, nombre: "Romina Perez", responsable: "Vaoska" },
  { numero: "780", juega: true, nombre: "Gabriel Rutilli", responsable: "Vaoska" },
  { numero: "781", juega: true, nombre: "Mario García", responsable: "Vaoska" },
  { numero: "782", juega: true, nombre: "Pablo Rodríguez", responsable: "Vaoska" },
  { numero: "783", juega: true, nombre: "Fernando Acuña", responsable: "Vaoska" },
  { numero: "784", juega: true, nombre: "Patricia Del Castillo", responsable: "Vaoska" },
  { numero: "785", juega: true, nombre: "Guadalupe Peralta", responsable: "Vaoska" },
  { numero: "786", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
  { numero: "787", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
  { numero: "788", juega: true, nombre: "Hernan Pomazan", responsable: "Vaoska" },
  { numero: "789", juega: true, nombre: "Mariana Rivero", responsable: "Vaoska" },
  { numero: "790", juega: true, nombre: "Luciano Ligorria", responsable: "Vaoska" },
  { numero: "791", juega: true, nombre: "Ricardo Lauro", responsable: "Vaoska" },
  { numero: "792", juega: true, nombre: "Luciano Iturria", responsable: "Vaoska" },
  { numero: "793", juega: true, nombre: "Rebeca Bontuhis", responsable: "Vaoska" },
  { numero: "794", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
  { numero: "795", juega: true, nombre: "Mario García", responsable: "Vaoska" },
  { numero: "796", juega: true, nombre: "Jeronimo Cabrera", responsable: "Vaoska" },
  { numero: "797", juega: true, nombre: "Cristian Barrera", responsable: "Vaoska" },
  { numero: "798", juega: true, nombre: "Jesus Grimaldi", responsable: "Vaoska" },
  { numero: "799", juega: true, nombre: "Vaoska Peñaloza", responsable: "Vaoska" },
  { numero: "800", juega: true, nombre: "Mario García", responsable: "Vaoska" },
  { numero: "801", juega: true, nombre: "Saúl Pitre", responsable: "Dayner" },
  { numero: "802", juega: true, nombre: "Saúl Pitre", responsable: "Dayner" },
  { numero: "803", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
  { numero: "807", juega: true, nombre: "Nohemí Pitre", responsable: "Dayner" },
  { numero: "809", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
  { numero: "810", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
  { numero: "812", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
  { numero: "813", juega: true, nombre: "rios juan", responsable: "Dayner" },
  { numero: "814", juega: true, nombre: "luciana Pitre", responsable: "Dayner" },
  { numero: "815", juega: true, nombre: "solagen Pitre", responsable: "Dayner" },
  { numero: "819", juega: true, nombre: "julio Pitre", responsable: "Dayner" },
  { numero: "820", juega: true, nombre: "juan Pitre", responsable: "Dayner" },
  { numero: "824", juega: true, nombre: "lore Pitre", responsable: "Dayner" },
  { numero: "825", juega: true, nombre: "rios juan", responsable: "Dayner" },
  { numero: "831", juega: true, nombre: "luciana Pitre", responsable: "Dayner" },
  { numero: "832", juega: true, nombre: "Nohemí Pitre", responsable: "Dayner" },
  { numero: "834", juega: true, nombre: "Vera daniel", responsable: "Dayner" },
  { numero: "835", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
  { numero: "836", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
  { numero: "837", juega: true, nombre: "Claudio Pitre", responsable: "Dayner" },
  { numero: "840", juega: true, nombre: "gustavo Pitre", responsable: "Dayner" },
  { numero: "845", juega: true, nombre: "SALVADOR TOVAR", responsable: "Génesis" },
  { numero: "846", juega: true, nombre: "RICARDO MIGUEL", responsable: "Génesis" },
  { numero: "852", juega: true, nombre: "JESUS COELLO", responsable: "Génesis" },
  { numero: "860", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
  { numero: "862", juega: true, nombre: "SALVADOR TOVAR", responsable: "Génesis" },
  { numero: "864", juega: true, nombre: "GIO GRAFE", responsable: "Génesis" },
  { numero: "867", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
  { numero: "868", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
  { numero: "870", juega: true, nombre: "BELEN MAMA DANI", responsable: "Génesis" },
  { numero: "872", juega: true, nombre: "GIO GRAFE", responsable: "Génesis" },
  { numero: "874", juega: true, nombre: "FELIX VALDIVIESZO", responsable: "Génesis" },
  { numero: "877", juega: true, nombre: "BELEN MAMA DANI", responsable: "Génesis" },
  { numero: "878", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
  { numero: "879", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
  { numero: "880", juega: true, nombre: "GERALDIN MARIN", responsable: "Génesis" },
];

// Cambia este identificador al comenzar una rifa DIFERENTE.
const RIFA_ID = "mi-rifa-001";
const STORAGE_KEY = `rifa-tres-digitos:${RIFA_ID}`;

type Boleto = { numero: string; juega: boolean; nombre?: string; responsable?: string;[campo: string]: unknown };
type Ganador = { numero: string; fecha: string };
type Estado = { boletos: Boleto[]; historial: Ganador[] };

export function validarBoletos(entrada: unknown): Boleto[] {
  if (!Array.isArray(entrada)) throw new Error("La lista debe ser un array.");
  const vistos = new Set<string>();
  return entrada.map((item, index) => {
    if (!item || typeof item !== "object") throw new Error(`Boleto ${index + 1} inválido.`);
    const numero = typeof item.numero === "number" && Number.isInteger(item.numero)
      ? String(item.numero).padStart(3, "0") : item.numero;
    if (typeof numero !== "string" || !/^\d{3}$/.test(numero))
      throw new Error(`Número inválido en boleto ${index + 1}: usa 000–999.`);
    if (typeof item.juega !== "boolean") throw new Error(`juega debe ser true o false en ${numero}.`);
    if (vistos.has(numero)) throw new Error(`Número duplicado: ${numero}.`);
    vistos.add(numero);
    return { ...item, numero };
  });
}

export function digitosValidos(boletos: Boleto[], prefijo: string, posicion: number): string[] {
  return [...new Set(boletos.filter(b => b.juega && b.numero.startsWith(prefijo))
    .map(b => b.numero[posicion]))].sort();
}

// Rechazo del excedente para evitar sesgo por módulo.
export function indiceAleatorio(total: number): number {
  if (!Number.isInteger(total) || total < 1 || total > 1000) throw new Error("Cantidad inválida.");
  const limite = Math.floor(4294967296 / total) * total;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= limite);
  return buffer[0] % total;
}

const firmaInicial = JSON.stringify(BOLETOS_INICIALES);

export default function RifaTresDigitos() {
  const [estado, setEstado] = useState<Estado>({ boletos: [], historial: [] });
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");
  const [girando, setGirando] = useState(false);
  const [digitos, setDigitos] = useState(["0", "0", "0"]);
  const [posicion, setPosicion] = useState(-1);
  const [prefijo, setPrefijo] = useState("");
  const [ganador, setGanador] = useState<Boleto | null>(null);
  const ocupado = useRef(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalGuardado = useRef<string | null>(null);

  const reiniciarRifa = () => {
    if (ocupado.current) return;
  
    if (!window.confirm("¿Reiniciar la rifa? Se borrarán los ganadores.")) return;
  
    try {
      localStorage.removeItem(STORAGE_KEY);
      originalGuardado.current = null;
  
      setEstado({
        boletos: validarBoletos(BOLETOS_INICIALES),
        historial: [],
      });
  
      setGanador(null);
      setDigitos(["0", "0", "0"]);
      setPrefijo("");
      setPosicion(-1);
      setGirando(false);
      setError("");
      setListo(true);
    } catch {
      setError("No se pudo reiniciar la rifa.");
    }
  };

  useEffect(() => {
    try {
      const iniciales = validarBoletos(BOLETOS_INICIALES);
      const raw = localStorage.getItem(STORAGE_KEY);
      originalGuardado.current = raw;
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.firma !== firmaInicial)
          throw new Error("Cambió la lista inicial. Usa otro RIFA_ID para la nueva lista o restaura la anterior.");
        const boletos = validarBoletos(saved.boletos);
        if (!Array.isArray(saved.historial)) throw new Error("Historial guardado inválido.");
        const numeros = new Set<string>();
        for (const h of saved.historial) {
          if (!h || typeof h.numero !== "string" || typeof h.fecha !== "string" || numeros.has(h.numero)
            || !boletos.some(b => b.numero === h.numero && !b.juega))
            throw new Error("Historial guardado inconsistente.");
          numeros.add(h.numero);
        }
        if (boletos.length !== iniciales.length || boletos.some(b => {
          const base = iniciales.find(i => i.numero === b.numero);
          return !base || b.juega !== (base.juega && !numeros.has(b.numero));
        })) throw new Error("Los boletos guardados no coinciden con la lista inicial.");
        setEstado({ boletos, historial: saved.historial });
      } else setEstado({ boletos: iniciales, historial: [] });
      setListo(true);
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo cargar la rifa."); }
    return () => {
      if (temporizador.current !== null) clearTimeout(temporizador.current);
      ocupado.current = false;
    };
  }, []);

  const activos = estado.boletos.filter(b => b.juega);
  const candidatos = activos.filter(b => b.numero.startsWith(prefijo));

  const sortear = () => {
    if (ocupado.current || !listo || activos.length === 0) return;
    ocupado.current = true;
    setGirando(true); setGanador(null); setError(""); setPrefijo(""); setPosicion(0);
    const copia = activos.map(b => ({ ...b }));
    let grupo = copia;
    let p = 0;
    let fijo = "";
    let termina = Date.now() + 2200;
    let pasos = 0;

    const fallar = (e: unknown) => {
      ocupado.current = false; setGirando(false); setPosicion(-1);
      setError(e instanceof Error ? e.message : "No se pudo completar el sorteo.");
    };
    try {
      if (localStorage.getItem(STORAGE_KEY) !== originalGuardado.current)
        throw new Error("La rifa cambió en otra pestaña. Recarga antes de continuar.");
      // Comprobar que se puede guardar ANTES de comenzar.
      const prueba = JSON.stringify({ firma: firmaInicial, ...estado });
      localStorage.setItem(STORAGE_KEY, prueba);
      originalGuardado.current = prueba;
    } catch (e) { fallar(e); return; }

    const tick = () => {
      try {
        pasos++;
        if (Date.now() >= termina) {
          // Elegir un BOLETO del grupo, no un dígito equiprobable.
          // Así cada boleto conserva probabilidad 1 / total de participantes.
          const elegido = grupo[indiceAleatorio(grupo.length)];
          fijo += elegido.numero[p];
          grupo = grupo.filter(b => b.numero.startsWith(fijo));
          setPrefijo(fijo);
          if (p === 2) {
            const win = grupo[0];
            const siguiente: Estado = {
              boletos: estado.boletos.map(b => b.numero === win.numero ? { ...b, juega: false } : b),
              historial: [{ numero: win.numero, fecha: new Date().toISOString() }, ...estado.historial],
            };
            if (localStorage.getItem(STORAGE_KEY) !== originalGuardado.current)
              throw new Error("La rifa cambió en otra pestaña durante el giro. Recarga para continuar.");
            const raw = JSON.stringify({ firma: firmaInicial, ...siguiente });
            // Persistir antes de anunciar al ganador.
            localStorage.setItem(STORAGE_KEY, raw);
            originalGuardado.current = raw;
            setEstado(siguiente); setDigitos(win.numero.split("")); setGanador(win);
            setGirando(false); setPosicion(-1); ocupado.current = false;
            temporizador.current = null;
            return;
          }
          p++; setPosicion(p); termina = Date.now() + 2200;
        }
        // Cada tambor pendiente muestra solo dígitos de boletos aún posibles.
        setDigitos([0, 1, 2].map(i => {
          if (i < fijo.length) return fijo[i];
          const opciones = [...new Set(grupo.map(b => b.numero[i]))].sort();
          return opciones[(pasos + i) % opciones.length];
        }));
        temporizador.current = setTimeout(tick, 75);
      } catch (e) { fallar(e); }
    };
    tick();
  };

  return (
   
    <main
      className="rifa"
      // style={{ backgroundImage: `linear-gradient(rgba(11,18,32,0.35), rgba(11,18,32,0.35)), url("${imagen}")` }}
    >
      <section 
      style={{
        backgroundImage: `linear-gradient(rgba(11,18,32,0.55),rgba(11,18,32,0.75)),url("${imagen}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", }}
      
        className="panel"
      >
        <header><span className="etiqueta"><b>SORTEO</b> </span><h1>AGUILAS DE CORDOBA</h1>
          <p><b> Solo participan boletos habilitados.</b></p></header>
        <div className="resumen"><span><b>{activos.length}</b> participando</span>
          <span><b>{estado.historial.length}</b> premiados</span></div>
        <div className="tambores" aria-hidden="true">{digitos.map((d, i) => (
          <div key={i} className={`tambor ${girando && i >= posicion ? "gira" : "fijo"}`}>
            <small>{["CENTENAS", "DECENAS", "UNIDADES"][i]}</small>
            <div className="ventana"><span key={girando && i >= posicion ? `${d}-${i}` : `fijo-${d}`}>{d}</span></div>
            <em>{girando ? i < posicion ? "Confirmado" : "Girando…" : ""}</em>
          </div>
        ))}</div>
        <p className="estado" role="status" aria-live="polite">{girando
          ? `Prefijo: ${prefijo || "—"} · ${candidatos.length} boletos posibles · Deteniendo ${["centenas", "decenas", "unidades"][posicion]}`
          : <b>{ganador ? `¡Ganó el ${ganador.numero}!` : "Listo para el próximo premio"}</b>}</p>
        {error && <p className="error" role="alert">{error}</p>}
        <br/><button onClick={sortear} disabled={!listo || girando || !activos.length}>
          {girando ? "Sorteando…" : listo && !activos.length ? "No quedan boletos" : "Sortear premio"}</button>
         
        {ganador && <div className="ganador"><small>BOLETO GANADOR</small><strong>{ganador.numero}</strong>
          <span>{typeof ganador.nombre === "string" ? ganador.nombre : "¡Felicitaciones!"}</span>
          {/* <p>Ya quedó excluido del próximo sorteo.</p> */}
          </div>}
        {/* <p className="nota">Datos de ejemplo: reemplaza BOLETOS_INICIALES antes de tu rifa. */}
          {/* El progreso se guarda en este navegador. Usa una sola pestaña para realizar el sorteo.</p> */}
      </section>
      <aside className="panel">
  
<div className="credito">
  <span>Elaborado por</span>

  <div className="credito-fila">
    <img
      src="https://res.cloudinary.com/dvy9qircy/image/upload/v1792861676/forex/forex_academy_professional_logorquicomaj.png"
      alt="Arquicom AJ"
      className="logo-arquicom"
    />

    <div className="credito-contactos">
      <a
        className="contacto-instagram"
        href="https://www.instagram.com/arquicom_aj/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={20} />
        <span>@arquicom_aj</span>
      </a>

      <a
        className="contacto-whatsapp"
        href="https://wa.me/5493516132710"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={20} />
        <span>3516132710</span>
      </a>
    </div>
  </div>
</div>
<br/>
        
        <h2>Boletos</h2><div className="lista">
      
        {estado.boletos.map(b => (
        <div className="boleto" key={b.numero}><b>{b.numero}</b>
          <span>{b.juega ? "Participa" : estado.historial.some(h => h.numero === b.numero) ? "Premiado" : "No participa"}</span></div>
      ))}</div><h2>Ganadores</h2>{estado.historial.length === 0 ? <p>Aún no hay ganadores.</p>
        : <ol>{estado.historial.map(h => {
          const boleto = estado.boletos.find(b => b.numero === h.numero);
    
          return (
            <li key={h.numero}>
              <b>{h.numero}</b> · {boleto?.nombre ?? "Sin nombre"}  / Responsable:  {boleto?.responsable ?? "Sin responsable"}
            </li>
          );
        })}</ol>}</aside>
      <style jsx global>{`
        html, body { margin: 0; padding: 0; min-height: 100%; }
      `}</style>
      <style jsx>{`
        .rifa{min-height:100vh;min-height:100dvh;background-color:#0b1220;background-size:cover;background-position:center;background-repeat:no-repeat;color:#e8eef9;padding:32px 16px;display:grid;grid-template-columns:minmax(0,760px) minmax(240px,340px);gap:24px;justify-content:center;align-items:start;font-family:system-ui,sans-serif;box-sizing:border-box}
        .panel{background:rgba(19,31,51,0.25);border:1px solid #2c3c56;border-radius:24px;padding:28px;min-width:0}header{text-align:center}.etiqueta{color:#f8ce66;font-size:11px;letter-spacing:3px}h1{font-size:clamp(25px,4vw,38px);margin:16px 0}p{color:#acbdd6;line-height:1.6}h2{font-size:19px;margin:4px 0 18px}.resumen{display:flex;justify-content:center;gap:28px;margin:28px 0;color:#acbdd6}.resumen b{color:white}.tambores{display:flex;gap:12px;justify-content:center}.tambor{flex:1;max-width:180px;min-width:0;text-align:center}small{font-size:10px;letter-spacing:1px;color:#b8c9e2}.ventana{height:clamp(110px,22vw,170px);margin:12px 0;background:linear-gradient(#060c16,#22344f 50%,#060c16);border:2px solid #41526e;border-radius:18px;overflow:hidden;display:grid;place-items:center}.ventana span{display:block;font-size:clamp(60px,12vw,110px);font-weight:800;font-variant-numeric:tabular-nums;color:#f8ce66}.gira .ventana span{animation:rodar 75ms linear infinite}.fijo .ventana{border-color:#f8ce66}em{display:block;min-height:20px;color:#aac7a8;font-size:12px;font-style:normal}.estado{text-align:center;min-height:26px}button{width:100%;background:#f8ce66;color:#142039;font-size:18px;font-weight:750;border:0;border-radius:14px;padding:17px;cursor:pointer}button:disabled{opacity:.45;cursor:not-allowed}.ganador{text-align:center;border:1px solid #4b9d82;background:#143b35;border-radius:18px;margin-top:24px;padding:22px}.ganador strong{display:block;font-size:70px;letter-spacing:10px;color:#f8ce66}.ganador span{display:block}.ganador p{margin-bottom:0}.nota{font-size:12px;margin-top:24px}.lista{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:28px;max-height:400px;overflow:auto}.boleto{border:1px solid #33435d;padding:10px;border-radius:10px}.boleto b{font-size:22px;letter-spacing:2px}.boleto span{display:block;font-size:11px;color:#acbdd6}li{padding:8px 0;font-size:13px;line-height:1.5}.error{background:#522736;color:#ffe1e1;border-radius:10px;padding:12px}@keyframes rodar{from{transform:translateY(-16px);filter:blur(1px)}to{transform:translateY(16px);filter:blur(1px)}}@media(max-width:800px){.rifa{grid-template-columns:minmax(0,620px)}.panel{padding:20px}}@media(prefers-reduced-motion:reduce){.gira .ventana span{animation:none}}
        .ganador {background: rgba(20, 59, 53, 0.35);}
        .ventana {background: rgba(11, 18, 32, 0.4);}
        button {
          background: rgba(248, 206, 102, 0.55);
          color: #fff;
          border: 1px solid #f8ce66;
          text-shadow: 0 1px 3px #000;
        }
        
        button:hover:not(:disabled) {
          background: rgba(248, 206, 102, 0.75);
        }
        .credito {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid #33435d;
          color: #acbdd6;
          font-size: 13px;
        }
        
        .credito-fila {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        
        .logo-arquicom {
          display: block;
          width: 80px;
          height: auto;
          border-radius: 10px;
          flex-shrink: 0;
        }
        
        .credito-contactos {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        
        .credito-contactos a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
        }
        
        .credito-contactos .contacto-instagram {
          color: #e1306c;
        }
        
        .credito-contactos .contacto-whatsapp {
          color: #25d366;
        }
        
        .credito-contactos a:hover {
          text-decoration: underline;
        }
      `}</style>
       <button
  type="button"
  onClick={reiniciarRifa}
  disabled={girando}
  style={{ marginTop: 12, background: "#ef4444", color: "white" }}
>
  Reiniciar rifa
</button>
    </main>
    
  );
}
