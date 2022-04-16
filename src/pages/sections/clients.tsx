import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import LogoImage, { clientToImageProps, IImageProps } from "../../components/logo-image/logo-image";

function ClientsSection({data}: {data: IClient[]}){
  let index1 = 0;
  let index2 = 0;

  const magazineClients = useMemo<IImageProps[]>(() => data?.filter(c => !c.isHidden && c.category === "magazine").slice(0, 14).map(c => clientToImageProps(c)) as IImageProps[], [data]);
  const contentClients = useMemo<IImageProps[]>(() => data?.filter(c => !c.isHidden && c.category === "content").slice(0, 14).map(c => clientToImageProps(c)) as IImageProps[], [data]);
  
  return (
    <div id="clients" className="flex flex-col">
      <div className="flex flex-col items-center my-8 p-4 py-o">

        <div className="" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
          <div className=" flex items-center mt-4 section-header" >
            <h1 className="cinzel">You&apos;ve seen my work in</h1>
            <span />
          </div>
          <div id="clients" className="flex flex-wrap p-4 gap-x-6 gap-y-6">
            {magazineClients?.map(client => <LogoImage key={index1} index={index1++} {...client} hoverAnimation={true}/>)}
          </div>
        </div>

        <div className="" data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
          <div className=" flex items-center mt-4 section-header header-right">
            <span />
            <h1 className="cinzel">And I work with</h1>
          </div>
          <div id="clients" className=" flex p-4 gap-x-6">
            {contentClients?.map(client => <LogoImage key={index2} index={index2++} {...client} hoverAnimation={true}/>)}
          </div>
        </div>

      </div>
      
    </div>    
  );
}

export default ClientsSection;