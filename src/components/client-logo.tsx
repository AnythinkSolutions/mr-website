import Image from "next/image";
import { IClient } from "../utilities/app-types";


function ClientLogo({client, index, styles, noAnimation} : {client: IClient, index: number, styles: any, noAnimation?: boolean}){
  const animation = noAnimation ? null : "fade-in";
  const logoStyle = noAnimation ? styles.logoBoxNoAnimate : styles.logoBox;

  return (
    <div className={logoStyle} data-aos={animation} data-aos-duration="900" data-aos-delay={index * 200}>
      {client.url && 
        <a href={client.url} target="_blank" rel="noreferrer">
          <Image className={styles.clientLogo} src={client.logo} alt={client.name} height={client.height ?? 32} width={client.width ?? 108}/>
        </a>
      }
      {!client.url && 
        <Image className={styles.clientLogo} src={client.logo} alt={client.name} height={client.height ?? 32} width={client.width ?? 108}/>
      }
      
    </div>
  )
}

export default ClientLogo;