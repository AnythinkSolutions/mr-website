import { useMemo } from "react";
import Image from "next/image";
import styles from "../../styles/clients.module.scss";
import clients from "../content/clients.content.json";
interface IClient {
  type: "magazine" | "content",
  src: string;
  height?: number;
  width?: number;
  alt: string;
  url?: string;
}

const basePath = "/assets/images/clients";

function ClientsSection(){
  let index1 = 0;
  let index2 = 0;

  const magazineClients = useMemo<IClient[]>(() => clients.filter(c => c.type === "magazine") as IClient[], []);
  const contentClients = useMemo<IClient[]>(() => clients.filter(c => c.type === "content") as IClient[], []);

  return (
    <div id="clients" className="container flex flex-col mt-8">
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header" >
          <h1>You&apos;ve seen my work in</h1>
          <span />
        </div>
        <div id="clients" className="container flex flex-wrap p-4 gap-x-6 gap-y-6">
          {magazineClients.map(client => <ClientLogo key={index1} index={index1++} client={client} />)}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header header-right">
          <span />
          <h1>And I work with</h1>
        </div>
        <div id="clients" className="container flex p-4 gap-x-6">
          {contentClients.map(client => <ClientLogo key={index2} index={index2++} client={client} />)}
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
          <Image className={styles.clientLogo} src={`${basePath}/${client.src}`} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
        </a>
      }
      {!client.url && 
        <Image className={styles.clientLogo} src={`${basePath}/${client.src}`} alt={client.alt} height={client.height ?? 32} width={client.width ?? 108}/>
      }
      
    </div>
  )
}