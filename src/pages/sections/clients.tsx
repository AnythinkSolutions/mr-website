import React from "react";
import Image from "next/image";
import styles from "../../styles/clients.module.scss";

interface IClient {
  type: "magazine" | "content",
  src: string;
  height?: number;
  width?: number;
  alt: string;
  url?: string;
}

const clientList : IClient[] = [
  {
    type: "magazine",
    src: "/assets/images/clients/wh-logo.png",
    alt: "Women's Health",
    url: "https://www.womenshealthmag.com/author/4061/meghan-rabbitt/",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/oprah-logo.png",
    alt: "Oprah Daily",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/mh-logo.png",
    alt: "Men's Health",
    url: "https://www.menshealth.com/author/4061/meghan-rabbitt/",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/yj-logo.png",
    alt: "Yoga Journal",
    url: "https://www.yogajournal.com/byline/meghan-rabbitt/",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/health-logo-transparent.png",
    alt: "Health",
    url: "https://www.health.com/author/meghan-rabbitt",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/prevention-logo.png",
    alt: "Prevention",
    width: 148,
    url: "https://www.prevention.com/author/4061/meghan-rabbitt/",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/bazaar-logo.png",
    alt: "Harper's Baazar",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/good-housekeeping-logo.png",
    alt: "Good Housekeeping",
  },
  {
    type: "content",
    src: "/assets/images/clients/peloton-logo.png",
    alt: "Peloton",
  },
  {
    type: "content",
    src: "/assets/images/clients/jandj-logo.png",
    alt: "Johnson & Johnson",
  },
  {
    type: "content",
    src: "/assets/images/clients/under-armour-logo.png",
    alt: "Under Armour",
    height: 48,
  },
  {
    type: "content",
    src: "/assets/images/clients/pandg-logo.png",
    alt: "Proctor & Gamble",
    height: 48,
  },
]

function ClientsSection(){
  let cli = 0;
  let cli2 = 0;

  return (
    <div id="clients" className="container flex flex-col mt-8">
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header" >
          <h1>You&apos;ve seen my work in</h1>
          <span />
        </div>
        <div id="clients" className="container flex flex-wrap p-4 gap-x-6 gap-y-6">
          {clientList.filter(c => c.type === "magazine").map(client => <ClientLogo key={cli} index={cli++} client={client} />)}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header header-right">
          <span />
          <h1>And I work with</h1>
        </div>
        <div id="clients" className="container flex p-4 gap-x-6">
          {clientList.filter(c => c.type === "content").map(client => <ClientLogo key={cli2} index={cli2++} client={client} />)}
        </div>
      </div>
    </div>    
  );
}

export default ClientsSection;

function ClientLogo({client, index} : {client: IClient, index: number}){

  return (
    <div className={styles.logoBox} data-aos="fade-in" data-aos-duration="900" data-aos-delay={index * 200}>
      {client.url && 
        <a href={client.url} target="_blank" rel="noreferrer">
          <Image className={styles.clientLogo} src={client.src} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
        </a>
      }
      {!client.url && 
        <Image className={styles.clientLogo} src={client.src} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
      }
      
    </div>
  )
}