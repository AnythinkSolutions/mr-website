import Image from "next/image";
import { useMemo } from "react";
import EntryMotion from "../../components/entry-motion/entry-motion";
import FlipCard from "../../components/flip-card/flip-card";
import { IService } from "../../utilities/app-types";

export interface IServicesProps {
  serviceData: IService[],
}

const ServicesSection = ({serviceData}: IServicesProps) => {
  const minHeight = 270;
  const minWidth = 325;
  
  const services = useMemo<IService[]>(() => {
    if(!serviceData) return [];
    const fallbackImage = "/assets/images/service-fallback.jpg";
    return serviceData.map(svc => svc.image ? svc : {...svc, image: fallbackImage});
  }, [serviceData]);

  return (
    <div className="flex flex-col w-full">
      <EntryMotion duration={0.9} eventLabel="services">
        <div className="flex flex-col items-center my-8 p-4 py-0">

            <div className="w-full flex flex-col items-center justify-center my-4 ml-4 section-header">
              <h2>Services</h2>
              <div className="gradient_line" />
            </div>

            <div className="flex flex-wrap gap-8 mt-6 justify-center">
              {services.map((svc, index) => (
                <EntryMotion key={svc.key} delay={index * 0.2}>
                  <div className="h-full w-full" style={{minHeight, minWidth}}>
                    <FlipCard title={svc.title} description={svc.description} backColor="sky-200">
                      <Image src={svc.image} alt={svc.title} layout="fill" objectFit="cover"/>
                    </FlipCard>  
                  </div>
                  </EntryMotion>
                ))}
            </div>
            
        </div>
      </EntryMotion>
    </div>
  );
}

export default ServicesSection;