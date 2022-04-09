import Image from "next/image";
import { useMemo } from "react";
import FlipCard from "../../components/flip-card/flip-card";
import { IService } from "../../utilities/app-types";

export interface IServicesProps {
  serviceData: IService[],
}

const ServicesSection: React.FC<IServicesProps> = ({serviceData}) => {
  const imgHeight = 260;
  const imgWidth = 380;
  
  const services = useMemo<IService[]>(() => {
    if(!serviceData) return [];
    const fallbackImage = "/assets/images/services/service-fallback.jpg";
    return serviceData.map(svc => svc.image ? svc : {...svc, image: fallbackImage});
  }, [serviceData]);

  return (
    <div id="services" className="flex flex-col w-full">
      <div className="container flex items-center mt-4 section-header header">
        <h1>Services</h1>
        <span />
      </div>

      <div className="flex flex-row flex-wrap gap-8 mt-6 justify-center">
        {services.map(svc => (
          <div key={svc.key}>
            <FlipCard title={svc.title} description={svc.description} backColor="sky-200">
              <Image src={svc.image} alt={svc.title} height={imgHeight} width={imgWidth} objectFit="cover"/>
            </FlipCard>  
            </div>
          ))}
      </div>
    </div>
  );
}

export default ServicesSection;