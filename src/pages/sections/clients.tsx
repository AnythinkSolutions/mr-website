import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import LogoImage, { clientToImageProps, IImageProps } from "../../components/logo-image/logo-image";
import EntryMotion from "../../components/entry-motion/entry-motion";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/clients.module.scss";

function ClientsSection({data}: {data: IClient[]}){
  const [ref, inView] = useInView({triggerOnce: true, threshold: 0.25});

  const magazineClients = useMemo<IImageProps[]>(() => data?.filter(c => !c.isHidden && c.category === "magazine").slice(0, 14).map(c => clientToImageProps(c)) as IImageProps[], [data]);
  const contentClients = useMemo<IImageProps[]>(() => data?.filter(c => !c.isHidden && c.category === "content").slice(0, 14).map(c => clientToImageProps(c)) as IImageProps[], [data]);
  
  return (
    <div className="flex flex-col w-full">
      <EntryMotion>
        <div className="flex flex-col items-center my-8 p-4 py-0" ref={ref}>

          <div>
            <div className=" flex items-center mt-4 section-header" >
              <h1 className="cinzel">You&apos;ve seen my work in</h1>
              <span />
            </div>
            <div className="flex flex-wrap p-4 gap-x-6 gap-y-6">
              {magazineClients?.map((client, index) => 
                // <div key={index} className={styles.clientDiv}>
                  <EntryMotion key={index} delay={index * 0.1} immediate={inView}>
                    <LogoImage {...client} hoverAnimation={true}/>
                  </EntryMotion>
                // </div>
              )}
            </div>
          </div>

          <div>
            <div className=" flex items-center mt-4 section-header header-right">
              <span />
              <h1 className="cinzel">And I work with</h1>
            </div>
            <div className="flex flex-wrap p-4 gap-x-6 gap-y-6">
              {contentClients?.map((client, index) => 
                  <EntryMotion key={index} delay={index * 0.1}>
                    <LogoImage {...client} hoverAnimation={true}/>
                  </EntryMotion>
                )}
            </div>
          </div>

        </div>
      </EntryMotion>  
    </div>    
  );
}

export default ClientsSection;