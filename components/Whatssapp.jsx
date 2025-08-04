import React from 'react'

function Whatssapp() {

//Definicion de evento para google Analytics
function handleWhatsappClick() {
  //console.log("WhatsApp button clicked"); // para verificar en consola

  if (typeof window.gtag !== 'undefined') {
    //console.log("gtag definifodo");
    window.gtag('event', 'page_view', {
      page_title: 'WhatsApp Click',
      page_path: '/whatsapp',
    });

      window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'Botón WhatsApp',
      value: 1
    });
  } else {
    console.warn("gtag no está definido");
  }
}

  return (
    <div className="fixed bottom-10 lg:right-20 md:right-10 z-50">
          <a
  href="https://wa.me/584145617175"
  target="_blank"
  onClick={handleWhatsappClick}
  rel="noopener noreferrer"
> 


  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    width="80"
    height="80"
  />
</a>
{/* <div className=' text-green-800'>contáctanos</div> */}
        </div>
        
  )
}

export default Whatssapp