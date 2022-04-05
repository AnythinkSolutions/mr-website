import { useEffect, useMemo } from "react";
import styles from "../../styles/clients.module.scss";
import { IClient } from "../../utilities/portfolio-utilties";
import ClientLogo from "../../components/client-logo";


// const basePath = "/assets/images/clients";

function ClientsSection({data}: {data: IClient[]}){
  let index1 = 0;
  let index2 = 0;

  useEffect(() => {
    console.log("Clients:", data);
  }, []);

  const magazineClients = useMemo<IClient[]>(() => data?.filter(c => c.category === "magazine").slice(0, 14) as IClient[], [data]);
  const contentClients = useMemo<IClient[]>(() => data?.filter(c => c.category === "content").slice(0, 14) as IClient[], [data]);

  return (
    <div id="clients" className="container flex flex-col my-12">
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header" >
          <h1>You&apos;ve seen my work in</h1>
          <span />
        </div>
        <div id="clients" className="container flex flex-wrap p-4 gap-x-6 gap-y-6">
          {magazineClients?.map(client => <ClientLogo key={index1} index={index1++} client={client} styles={styles} />)}
        </div>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <div className="container flex items-center mt-4 section-header header-right">
          <span />
          <h1>And I work with</h1>
        </div>
        <div id="clients" className="container flex p-4 gap-x-6">
          {contentClients?.map(client => <ClientLogo key={index2} index={index2++} client={client} styles={styles}/>)}
        </div>
      </div>
    </div>    
  );
}

export default ClientsSection;