import React from "react";
import Image from "next/image";
import styles from "../../styles/clients.module.scss";

interface IClient {
  type: "magazine" | "content",
  src: string;
  height?: number;
  width?: number;
  alt: string;
}

const clientList : IClient[] = [
  {
    type: "magazine",
    src: "/assets/images/clients/wh-logo.png",
    alt: "Women's Health",
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
  },
  {
    type: "magazine",
    src: "/assets/images/clients/yj-logo.png",
    alt: "Yoga Journal",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/health-logo-transparent.png",
    alt: "Health",
  },
  {
    type: "magazine",
    src: "/assets/images/clients/prevention-logo.png",
    alt: "Prevention",
    width: 148,
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

  return (
    <div id="clients" className="container flex flex-col">
      <div className="container flex items-center mt-4">
        <h1 className={styles.sectionHeader}>You&apos;ve seen my work in</h1>
        <span className={styles.sectionHeaderLine} />
      </div>
      <div id="clients" className="container flex flex-wrap p-4 gap-x-6 gap-y-6">
        {clientList.filter(c => c.type === "magazine").map(client => {
            return(
              <div key={cli++} className={styles.logoBox}>
                <Image className={styles.clientLogo} src={client.src} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
              </div>
            );
          })}
      </div>
      <div className="container flex items-center mt-4">
        <span className={styles.sectionHeaderLineRight} />
        <h1 className={styles.sectionHeaderRight}>And I&apos;ve worked with</h1>
      </div>
      <div id="clients" className="container flex p-4 gap-x-6">
        {clientList.filter(c => c.type === "content").map(client => {
            return(
              <div key={cli++} className={styles.logoBox}>
                <Image className={styles.clientLogo} src={client.src} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
              </div>
            );
          })}
      </div>
    </div>    
  );
}

export default ClientsSection;