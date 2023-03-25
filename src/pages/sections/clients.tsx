import { useMemo } from "react";
import { IClient } from "../../utilities/app-types";
import LogoImage, { clientToImageProps, IImageProps } from "../../components/logo-image/logo-image";
import EntryMotion from "../../components/entry-motion/entry-motion";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "../../utilities/app-hooks";
import { SCREEN_WIDTHS } from "../../utilities/app-utilities";

const mobileCount = 10; //number of items to show on mobile
const defaultCount = 14;  //number of items to show normally

function ClientsSection({data}: {data: IClient[]}){
  const [ref, inView] = useInView({triggerOnce: true, threshold: 0.25});
  const { width } = useWindowSize();
  const itemCount = useMemo(() => width <= SCREEN_WIDTHS.mobile ? mobileCount : defaultCount, [width]);
  
  const magazineClients = useMemo<IImageProps[]>(() => {
    const logos = data?.filter(c => !c.isHidden && c.category === "magazine")
      .slice(0, itemCount)
      .map(c => clientToImageProps(c)) as IImageProps[];
    return logos;
  }, [data, itemCount]);

  const contentClients = useMemo<IImageProps[]>(() => {
    const logos = data?.filter(c => !c.isHidden && c.category === "content")
      .slice(0, itemCount)
      .map(c => clientToImageProps(c)) as IImageProps[];
    return logos;
  }, [data, itemCount]);
  
  return (
    <div className="flex flex-col w-full">
      <EntryMotion>
        <div className="flex flex-col items-start my-8 p-4 py-0" ref={ref}>

          <div>
            <div className="flex justify-center md:justify-start items-center mt-4 section-header" >
              <h1>You&apos;ve seen my work in</h1>
              <span className="hidden md:inline-block" />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start p-2 pt-4 md:p-4 gap-4 md:gap-6">
              {magazineClients?.map((client, index) => 
                <EntryMotion key={index} delay={index * 0.1} immediate={inView}>
                  <div className="h-10 w-28">
                    <LogoImage {...client} hoverAnimation={true} size="auto"/>
                  </div>
                </EntryMotion>
              )}
            </div>
          </div>

          <div>
            <div className=" flex justify-center md:justify-start items-center mt-4 section-header header-right">
              <span className="hidden md:inline-block" />
              <h1>And I work with</h1>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start p-2 pt-4 md:p-4 gap-4 md:gap-6">
              {contentClients?.map((client, index) => 
                  <EntryMotion key={index} delay={index * 0.1} immediate={inView}>
                    <div className="h-10 w-28 relative">
                      <LogoImage {...client} hoverAnimation={true} size="auto"/>
                    </div>
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